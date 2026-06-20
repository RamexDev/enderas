/**
 * @fileoverview Resolves a stored image path to a browser-loadable URL.
 *
 * Same logic as the public frontend's `imageUrl` helper. Image paths that come
 * back from the public API are relative (e.g. `/uploads/foo.webp` or
 * `/seed-assets/team/team-1.webp`) — this prepends the backend origin so the
 * preview can <img src=...> them.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'
const ORIGIN = API_BASE.replace(/\/api\/v1\/?$/, '')

/**
 * @param {string} path
 * @returns {string}
 */
export function imageUrl(path) {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${ORIGIN}${path}`
}
