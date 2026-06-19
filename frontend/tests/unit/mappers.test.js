import { describe, it, expect } from 'vitest'
import {
  mapStatistic,
  mapHeroSlide,
  mapService,
  mapGalleryItem,
  mapBlogPost,
  mapTestimonial,
  mapFaq,
  mapSettings,
  mapHomePageData,
  mapAboutPageData,
} from '@/utils/mappers'

describe('mapStatistic', () => {
  it('parses numeric suffix values like "12+"', () => {
    const result = mapStatistic({ id: '1', label: 'Years', value: '12+', icon: 'calendar' })
    expect(result).toMatchObject({ value: 12, suffix: '+', label: 'Years' })
  })

  it('parses prefixed currency values', () => {
    const result = mapStatistic({ id: '2', label: 'AUM', value: '$4.2B', icon: 'chart' })
    expect(result).toMatchObject({ prefix: '$', value: 4.2, suffix: 'B' })
  })
})

describe('mapHeroSlide', () => {
  it('maps backend slide fields to carousel shape', () => {
    const slide = {
      id: 'slide-1',
      title: 'Welcome',
      subtitle: 'Subtitle text',
      image: 'https://example.com/hero.jpg',
      button_text: 'Learn More',
      button_link: '/about',
    }
    const result = mapHeroSlide(slide, 0)
    expect(result.title).toBe('Welcome')
    expect(result.cta).toEqual({ label: 'Learn More', to: '/about' })
    expect(result.cta2.to).toBe('/contact')
    expect(result.eyebrow).toBe('Welcome')
  })
})

describe('mapService', () => {
  it('maps snake_case service to UI card shape', () => {
    const result = mapService({
      id: 'svc-1',
      slug: 'asset-management',
      title: 'Asset Management',
      short_description: 'Short copy',
      description: 'Long copy',
      image: 'https://example.com/svc.jpg',
      is_active: true,
    })
    expect(result).toMatchObject({
      title: 'Asset Management',
      excerpt: 'Short copy',
      icon: 'layers',
      active: true,
    })
  })
})

describe('mapGalleryItem', () => {
  it('uses category name when association is present', () => {
    const result = mapGalleryItem({
      id: 'g-1',
      title: 'Office',
      image: 'https://example.com/g.jpg',
      description: 'Addis Ababa.',
      category: { name: 'Properties', slug: 'properties' },
    })
    expect(result.category).toBe('Properties')
  })
})

describe('mapBlogPost', () => {
  it('derives author and category from nested relations', () => {
    const result = mapBlogPost({
      id: 'p-1',
      slug: 'test-post',
      title: 'Test',
      excerpt: 'Excerpt',
      content: '<p>Hello world</p>',
      featured_image: 'https://example.com/p.jpg',
      status: 'published',
      published_at: '2024-01-15T00:00:00.000Z',
      author: { name: 'Jane Doe' },
      categories: [{ name: 'Strategy', slug: 'strategy' }],
    })
    expect(result.author).toBe('Jane Doe')
    expect(result.category).toBe('Strategy')
    expect(result.readTime).toBeGreaterThanOrEqual(3)
  })
})

describe('mapTestimonial', () => {
  it('maps client fields to testimonial card shape', () => {
    const result = mapTestimonial({
      id: 't-1',
      client_name: 'Alemayehu',
      company: 'Acme',
      content: 'Great service.',
      client_image: 'https://example.com/t.jpg',
    })
    expect(result).toEqual({
      id: 't-1',
      name: 'Alemayehu',
      company: 'Acme',
      content: 'Great service.',
      image: 'https://example.com/t.jpg',
    })
  })
})

describe('mapFaq', () => {
  it('maps question and answer', () => {
    expect(mapFaq({ id: 'f-1', question: 'Q?', answer: 'A.' })).toEqual({
      id: 'f-1',
      question: 'Q?',
      answer: 'A.',
    })
  })
})

describe('mapSettings', () => {
  it('merges site settings with static defaults and builds social links', () => {
    const result = mapSettings(
      {
        site_name: 'Enderas Asset Management',
        site_description: 'Tagline',
        footer_text: 'Footer copy',
        linkedin_url: 'https://linkedin.com/enderas',
      },
      {
        address: 'NB Business Center',
        phone: '+251 111, +251 222',
        email: 'info@enderas.org',
        google_map_embed: 'https://maps.example/embed',
      },
    )
    expect(result.appName).toBe('Enderas')
    expect(result.phone).toBe('+251 111')
    expect(result.phoneAlt).toBe('+251 222')
    expect(result.social).toHaveLength(1)
    expect(result.mapEmbedUrl).toBe('https://maps.example/embed')
    expect(result.hours).toBeTruthy()
  })

  it('falls back to defaults when API settings are empty', () => {
    const result = mapSettings({})
    expect(result.email).toBe('info@enderas.org')
    expect(result.mapEmbedUrl).toContain('maps')
  })
})

describe('mapHomePageData', () => {
  it('respects CMS visibility flags and maps nested collections', () => {
    const result = mapHomePageData({
      homePage: {
        company_intro_title: 'Welcome',
        company_intro_description: 'Intro body',
        show_team: true,
        show_testimonials: false,
        show_faq: true,
        auction_title: 'Auction promo',
        contact_cta_title: 'Contact us',
      },
      heroSlides: [{ id: 'h1', title: 'Hero', subtitle: 'Sub', image: 'https://example.com/h.jpg' }],
      statistics: [{ id: 's1', label: 'Clients', value: '100+', icon: 'users' }],
      services: [],
      galleryItems: [],
      teamMembers: [],
      testimonials: [{ id: 't1', client_name: 'X', content: 'Y' }],
      faqs: [{ id: 'f1', question: 'Q', answer: 'A' }],
    })

    expect(result.visibility).toEqual({
      showTeam: true,
      showTestimonials: false,
      showFaq: true,
    })
    expect(result.slides).toHaveLength(1)
    expect(result.stats).toHaveLength(1)
    expect(result.testimonials).toHaveLength(1)
    expect(result.faqs).toHaveLength(1)
    expect(result.intro.title).toBe('Welcome')
    expect(result.auctionHighlight.title).toBe('Auction promo')
  })
})

describe('mapAboutPageData', () => {
  it('maps core values, partner names, team members, and cta', () => {
    const result = mapAboutPageData({
      about: {
        history: 'Founded in 2007',
        mission: 'Mission text',
        vision: 'Vision text',
        meta_title: 'About — Enderas',
        meta_description: 'About intro',
      },
      coreValues: [{ id: 'v1', title: 'Integrity', description: 'We act with integrity.' }],
      partners: [{ name: 'Partner A', logo: 'https://example.com/a.png' }, { name: 'Partner B', logo: null }],
      teamMembers: [{ id: 'tm1', full_name: 'John Doe', position: 'CEO', profile_image: 'https://example.com/john.jpg', biography: 'Bio', email: 'john@enderas.org' }],
      show_team: true,
      cta: { title: 'Contact us today', body: 'Reach out now', primary_label: 'Contact', primary_link: '/contact' },
    })
    expect(result.history).toBe('Founded in 2007')
    expect(result.heroTitle).toBe('Your partner in success.')
    expect(result.values[0].title).toBe('Integrity')
    expect(result.partners).toEqual([{ name: 'Partner A', logo: 'https://example.com/a.png' }, { name: 'Partner B', logo: null }])
    expect(result.team).toHaveLength(1)
    expect(result.team[0].name).toBe('John Doe')
    expect(result.cta).not.toBeNull()
    expect(result.cta.title).toBe('Contact us today')
    expect(result.cta.primary.label).toBe('Contact')
    expect(result.cta.primary.to).toBe('/contact')
  })
})


