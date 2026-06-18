/**
 * @fileoverview Axios HTTP client with JWT auth, token refresh, and response helpers.
 * All API traffic from the admin app should flow through this module.
 */

import axios from 'axios'
import { ApiError } from '@/utils/errors'

/** Configured Axios instance — base URL comes from VITE_API_BASE_URL. */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

/** Shared in-flight refresh promise to avoid duplicate refresh requests. */
let refreshPromise = null

/**
 * Returns the browser storage object for the current remember-me preference.
 * @param {boolean} remember - Whether tokens persist in localStorage.
 * @returns {Storage}
 */
function getStorage(remember) {
  return remember ? localStorage : sessionStorage
}

/**
 * Reads access/refresh tokens from the active storage bucket.
 * @returns {{ accessToken: string|null, refreshToken: string|null, remember: boolean }}
 */
export function getStoredTokens() {
  const remember = localStorage.getItem('enderas_remember') === 'true'
  const storage = getStorage(remember)
  return {
    accessToken: storage.getItem('enderas_access_token'),
    refreshToken: storage.getItem('enderas_refresh_token'),
    remember,
  }
}

/**
 * Persists tokens to the correct storage and clears the other bucket.
 * @param {{ accessToken?: string, refreshToken?: string, remember: boolean }} tokens
 */
export function setStoredTokens({ accessToken, refreshToken, remember }) {
  localStorage.setItem('enderas_remember', remember ? 'true' : 'false')
  localStorage.removeItem('enderas_access_token')
  localStorage.removeItem('enderas_refresh_token')
  sessionStorage.removeItem('enderas_access_token')
  sessionStorage.removeItem('enderas_refresh_token')

  const storage = getStorage(remember)
  if (accessToken) storage.setItem('enderas_access_token', accessToken)
  if (refreshToken) storage.setItem('enderas_refresh_token', refreshToken)
}

/** Removes all auth tokens from both storage buckets. */
export function clearStoredTokens() {
  localStorage.removeItem('enderas_remember')
  localStorage.removeItem('enderas_access_token')
  localStorage.removeItem('enderas_refresh_token')
  sessionStorage.removeItem('enderas_access_token')
  sessionStorage.removeItem('enderas_refresh_token')
}

/** Attaches the Bearer token to every outgoing request when available. */
api.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

/**
 * Exchanges a refresh token for a new access/refresh pair.
 * @returns {Promise<string>} New access token.
 */
async function refreshAccessToken() {
  const { refreshToken, remember } = getStoredTokens()
  if (!refreshToken) throw new ApiError('Session expired', 401)

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    { refresh_token: refreshToken },
  )

  const payload = data.data
  setStoredTokens({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    remember,
  })
  return payload.accessToken
}

/**
 * On 401, attempts a silent token refresh and retries the original request once.
 * Redirects to /login when refresh fails.
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    if (status === 401 && original && !original._retry && !original.url?.includes('/auth/login')) {
      original._retry = true
      try {
        refreshPromise = refreshPromise || refreshAccessToken()
        const token = await refreshPromise
        refreshPromise = null
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      } catch {
        refreshPromise = null
        clearStoredTokens()
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login'
        }
      }
    }

    const message = error.response?.data?.message || error.message || 'Request failed'
    const errors = error.response?.data?.errors || []
    return Promise.reject(new ApiError(message, status, errors))
  },
)

/**
 * Extracts the `data` payload from a standard success response.
 * @param {import('axios').AxiosResponse} response
 * @returns {*}
 */
export function unwrap(response) {
  return response.data.data
}

/**
 * Extracts paginated rows and meta from a standard list response.
 * @param {import('axios').AxiosResponse} response
 * @returns {{ data: Array, meta: object }}
 */
export function unwrapPaginated(response) {
  return { data: response.data.data, meta: response.data.meta }
}

export default api
