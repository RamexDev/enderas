import DOMPurify from 'dompurify'

export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h2', 'h3', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
}

export function contentToHtml(content) {
  if (!content) return ''
  if (content.includes('<')) return sanitizeHtml(content)
  return content
    .split('\n\n')
    .map((p) => `<p>${sanitizeHtml(p)}</p>`)
    .join('')
}
