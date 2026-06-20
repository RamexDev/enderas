/**
 * @fileoverview Axios HTTP client with JWT auth, token refresh, and response
 * helpers. Verbatim copy of the legacy admin's client so token storage keys
 * and interceptor behaviour match the existing app exactly.
 */

import axios from 'axios'
import { ApiError } from '@/utils/errors'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

let refreshPromise = null

export function getStoredTokens() {
  return {
    accessToken: sessionStorage.getItem('enderas_access_token'),
    refreshToken: sessionStorage.getItem('enderas_refresh_token'),
  }
}

export function setStoredTokens({ accessToken, refreshToken }) {
  sessionStorage.removeItem('enderas_access_token')
  sessionStorage.removeItem('enderas_refresh_token')
  if (accessToken) sessionStorage.setItem('enderas_access_token', accessToken)
  if (refreshToken) sessionStorage.setItem('enderas_refresh_token', refreshToken)
}

export function clearStoredTokens() {
  sessionStorage.removeItem('enderas_access_token')
  sessionStorage.removeItem('enderas_refresh_token')
}

api.interceptors.request.use((config) => {
  const { accessToken } = getStoredTokens()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

async function refreshAccessToken() {
  const { refreshToken } = getStoredTokens()
  if (!refreshToken) throw new ApiError('Session expired', 401)

  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
    { refresh_token: refreshToken },
  )

  const payload = data.data
  setStoredTokens({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
  })
  return payload.accessToken
}

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
        window.dispatchEvent(new CustomEvent('auth:session-expired'))
      }
    }

    const message = error.response?.data?.message || error.message || 'Request failed'
    const errors = error.response?.data?.errors || []
    return Promise.reject(new ApiError(message, status, errors))
  },
)

export function unwrap(response) {
  return response.data.data
}

export function unwrapPaginated(response) {
  return { data: response.data.data, meta: response.data.meta }
}

export default api
