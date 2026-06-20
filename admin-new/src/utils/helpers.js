/**
 * @fileoverview Utility helpers for formatting and media URL resolution.
 * Copied verbatim from the existing admin app so image paths round-trip the
 * same way between admin-new, the legacy admin, and the backend.
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
  const seedMatch = path.match(/seed-assets[/\\](.+)$/)
  if (seedMatch) return `/seed-assets/${seedMatch[1].replace(/\\/g, '/')}`
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

  const normalized = normalizeMediaPath(path)

  if (normalized.startsWith('/seed-assets/')) {
    const origin = uploadBase.replace(/\/uploads\/?$/, '')
    return `${origin}${normalized}`
  }

  return `${uploadBase}/${normalized.replace(/^\/?uploads\//, '')}`.replace(/([^:]\/)\/+/g, '$1')
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
 * Formats an ISO date string with time.
 * @param {string|Date|null} date
 * @returns {string}
 */
export function formatDateTime(date) {
  if (!date) return '—'
  return new Date(date).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
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

/**
 * Extracts just the `src` URL from a Google Maps embed snippet (iframe HTML)
 * or returns the input unchanged if it's already a plain URL.
 * @param {string} input
 * @returns {string}
 */
export function extractMapEmbedUrl(input) {
  if (!input) return ''
  const trimmed = input.trim()
  if (!trimmed.startsWith('<')) return trimmed
  const match = trimmed.match(/src=["']([^"']+)["']/)
  return match ? match[1] : ''
}
