import { describe, expect, it } from 'vitest'
import { formatDate, formatFileSize, mediaUrl, normalizeMediaPath, slugify } from '@/utils/helpers'

describe('normalizeMediaPath', () => {
  it('returns empty string for falsy input', () => {
    expect(normalizeMediaPath('')).toBe('')
    expect(normalizeMediaPath(null)).toBe('')
  })

  it('passes through absolute http(s) URLs unchanged', () => {
    const url = 'https://cdn.example.com/logo.png'
    expect(normalizeMediaPath(url)).toBe(url)
  })

  it('extracts uploads segment from absolute filesystem paths', () => {
    expect(normalizeMediaPath('/var/app/src/uploads/general/abc.jpg')).toBe('/uploads/general/abc.jpg')
  })

  it('normalizes relative upload paths', () => {
    expect(normalizeMediaPath('uploads/general/abc.jpg')).toBe('/uploads/general/abc.jpg')
  })
})

describe('mediaUrl', () => {
  it('builds a full URL from a stored upload path', () => {
    expect(mediaUrl('/uploads/general/photo.jpg')).toBe('http://localhost:5000/uploads/general/photo.jpg')
  })

  it('returns external URLs unchanged', () => {
    const external = 'https://enderas.org/image.jpg'
    expect(mediaUrl(external)).toBe(external)
  })
})

describe('formatDate', () => {
  it('formats ISO strings', () => {
    const formatted = formatDate('2024-06-15T10:00:00.000Z')
    expect(formatted).toMatch(/Jun/)
    expect(formatted).toMatch(/2024/)
  })

  it('returns em dash for missing values', () => {
    expect(formatDate(null)).toBe('—')
  })
})

describe('formatFileSize', () => {
  it('formats bytes and kilobytes', () => {
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(2048)).toBe('2.0 KB')
  })

  it('returns em dash for missing values', () => {
    expect(formatFileSize(null)).toBe('—')
  })
})

describe('slugify', () => {
  it('converts titles to URL-safe slugs', () => {
    expect(slugify('Hello World!')).toBe('hello-world')
    expect(slugify('  Asset   Management  ')).toBe('asset-management')
  })
})
