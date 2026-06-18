/**
 * @fileoverview Axios HTTP client for the public website.
 * All API traffic should flow through domain services — never call Axios directly from components.
 */

import axios from 'axios'

/** Configured Axios instance — base URL comes from VITE_API_BASE_URL. */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

/** Attaches admin token when present (legacy in-app admin only). */
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('enderas-admin-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred'
    return Promise.reject(new Error(message))
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
