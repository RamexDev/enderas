/**
 * @fileoverview Utility helpers for formatting and media URL resolution.
 */

const uploadBase = import.meta.env.VITE_UPLOAD_BASE_URL || ''

/**
 * Converts a stored file path to a web-accessible `/uploads/...` segment.
 * @param {string} path - Absolute path, relative path, or full URL.
 * @returns {string}
 */
export function normalizeMediaPath(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const match = path.match(/uploads[/\\](.+)$/)
  if (match) return `/uploads/${match[1].replace(/\\/g, '/')}`
  return path.startsWith('/') ? path : `/uploads/${path.replace(/^\//, '')}`
}

/**
 * Resolves a media path or external URL to a full browser-loadable URL.
 * @param {string} path
 * @returns {string}
 */
export function mediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  const normalized = normalizeMediaPath(path).replace(/^\/?uploads\//, '')
  return `${uploadBase}/${normalized}`.replace(/([^:]\/)\/+/g, '$1')
}

/**
 * Formats an ISO date string for display in tables.
 * @param {string|Date|null} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '—'
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Human-readable file size from bytes.
 * @param {number|null} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (!bytes) return '—'
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let i = 0
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024
    i += 1
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

/**
 * Generates a URL-safe slug from arbitrary text.
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
