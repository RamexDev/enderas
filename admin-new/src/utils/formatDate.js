export function formatDate(dateStr, options = {}) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export function formatDateLong(dateStr) {
  return formatDate(dateStr, { month: 'long', day: 'numeric', year: 'numeric' })
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateId(items) {
  return items.reduce((max, i) => Math.max(max, i.id || 0), 0) + 1
}
