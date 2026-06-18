import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/services/publicApi', () => ({
  homeApi: { get: vi.fn() },
  blogApi: { list: vi.fn() },
  contactApi: { submit: vi.fn() },
}))

import { homeApi, blogApi, contactApi } from '@/services/publicApi'
import { getHomePage } from '@/services/homeService'
import { getBlogPosts } from '@/services/blogService'
import { submitInquiry } from '@/services/contactService'

describe('domain services', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('getHomePage maps API payload through mapHomePageData', async () => {
    homeApi.get.mockResolvedValue({
      homePage: { company_intro_title: 'Hello', show_faq: true, show_testimonials: true, show_team: false },
      heroSlides: [{ id: '1', title: 'Slide', subtitle: 'Sub', image: 'https://example.com/a.jpg' }],
      statistics: [],
      services: [],
      galleryItems: [],
      teamMembers: [],
      testimonials: [],
      faqs: [],
    })

    const result = await getHomePage()
    expect(homeApi.get).toHaveBeenCalledOnce()
    expect(result.intro.title).toBe('Hello')
    expect(result.slides).toHaveLength(1)
  })

  it('getBlogPosts unwraps and maps paginated posts', async () => {
    blogApi.list.mockResolvedValue({
      data: [
        {
          id: 'p1',
          slug: 'post-one',
          title: 'Post',
          excerpt: 'Excerpt',
          content: 'Body',
          status: 'published',
          published_at: '2024-06-01',
          categories: [],
        },
      ],
      meta: { page: 1, total: 1 },
    })

    const result = await getBlogPosts({ limit: 3 })
    expect(blogApi.list).toHaveBeenCalledWith({ limit: 3 })
    expect(result.data[0].slug).toBe('post-one')
    expect(result.meta.page).toBe(1)
  })

  it('submitInquiry delegates to contactApi.submit', async () => {
    contactApi.submit.mockResolvedValue({ id: 'msg-1' })
    const payload = {
      name: 'Jane',
      email: 'jane@example.com',
      phone: '+251911',
      subject: 'Hello',
      message: 'Test message',
    }
    const result = await submitInquiry(payload)
    expect(contactApi.submit).toHaveBeenCalledWith(payload)
    expect(result.id).toBe('msg-1')
  })
})
