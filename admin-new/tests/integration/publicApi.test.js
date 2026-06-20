/**
 * Integration tests against a running backend API.
 * Skipped automatically when the API is unreachable.
 */

import { describe, it, expect, beforeAll } from 'vitest'
import { mapHomePageData } from '@/utils/mappers'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'

async function apiReachable() {
  try {
    const res = await fetch(`${API_BASE}/public/settings`, { signal: AbortSignal.timeout(3000) })
    return res.ok
  } catch {
    return false
  }
}

async function getJson(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (res.status === 429) {
    const err = new Error(`${path} rate limited (429)`)
    err.rateLimited = true
    throw err
  }
  if (!res.ok) throw new Error(`${path} returned ${res.status}`)
  const body = await res.json()
  if (!body.success) throw new Error(body.message || 'API error')
  return body
}

describe('Public API integration', () => {
  let online = false

  beforeAll(async () => {
    online = await apiReachable()
    if (!online) {
      console.warn(`Skipping integration tests — API not reachable at ${API_BASE}`)
    }
  })

  it('GET /public/settings returns site settings', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/settings')
    expect(body.data).toBeDefined()
    expect(body.data.site_name || body.data.site_description).toBeTruthy()
  })

  it('GET /public/home returns homepage aggregate', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/home')
    expect(body.data.homePage).toBeDefined()
    expect(Array.isArray(body.data.heroSlides)).toBe(true)
    expect(Array.isArray(body.data.statistics)).toBe(true)
  })

  it('homepage payload maps to a valid view model', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/home')
    const viewModel = mapHomePageData(body.data)
    expect(viewModel.slides.length).toBeGreaterThan(0)
    expect(viewModel.intro.title).toBeTruthy()
    expect(typeof viewModel.visibility.showFaq).toBe('boolean')
  })

  it('GET /public/services returns paginated active services', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/services?page=1&limit=10')
    expect(Array.isArray(body.data)).toBe(true)
    expect(body.meta).toMatchObject({ page: 1 })
    if (body.data.length > 0) {
      expect(body.data[0].is_active).not.toBe(false)
    }
  })

  it('GET /public/gallery returns gallery items', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/gallery?page=1&limit=12')
    expect(Array.isArray(body.data)).toBe(true)
  })

  it('GET /public/posts returns published posts', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/posts?page=1&limit=10')
    expect(Array.isArray(body.data)).toBe(true)
    body.data.forEach((post) => expect(post.status).toBe('published'))
  })

  it('GET /public/about returns about page content', async ({ skip }) => {
    if (!online) skip()
    const body = await getJson('/public/about')
    expect(body.data.about).toBeDefined()
    expect(Array.isArray(body.data.coreValues)).toBe(true)
  })

  it('GET /public/contact returns contact page info', async ({ skip }) => {
    if (!online) skip()
    try {
      const body = await getJson('/public/contact')
      expect(body.data.email || body.data.address).toBeTruthy()
    } catch (err) {
      if (err.rateLimited) skip()
      throw err
    }
  })

  it('POST /public/contact rejects invalid payloads or is rate-limited', async ({ skip }) => {
    if (!online) skip()
    const res = await fetch(`${API_BASE}/public/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test only' }),
    })
    if (res.status === 429) skip()
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.success).toBe(false)
  })
})
