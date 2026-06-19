const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'
const ORIGIN = API_BASE.replace(/\/api\/v1\/?$/, '')

export function imageUrl(path) {
  if (!path) return path
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${ORIGIN}${path}`
}
