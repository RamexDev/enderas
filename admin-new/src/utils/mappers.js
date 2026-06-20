/**
 * @fileoverview Transforms backend API payloads (snake_case) into UI-friendly shapes.
 * Keeps components decoupled from API response structure.
 */

import { HOME_SECTIONS, INTRO_IMAGES, INTRO_PILLARS } from '@/constants/homeSections'
import { DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'
import { imageUrl } from './imageUrl.js'

const SERVICE_ICONS = {
  'asset-management': 'layers',
  'property-appraisal-and-liquidation': 'scale',
  'property-appraisal-valuation': 'scale',
  'investment-advisory': 'chart',
  'business-consultancy': 'briefcase',
  'building-construction-consulting': 'building',
  'property-liquidation-auction': 'gavel',
}

/**
 * Parses a statistic value string like "12+" or "$4.2B" into count-up parts.
 * @param {string|number} raw
 * @returns {{ value: number, prefix: string, suffix: string }}
 */
function parseStatValue(raw) {
  const str = String(raw ?? '')
  const match = str.match(/^([^\d]*)([\d.]+)(.*)$/)
  if (!match) return { value: 0, prefix: '', suffix: str }
  return { value: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

/**
 * Maps a backend statistic row to the StatCard component shape.
 * @param {object} stat
 * @returns {object}
 */
export function mapStatistic(stat) {
  const { value, prefix, suffix } = parseStatValue(stat.value)
  return {
    id: stat.id,
    label: stat.label,
    value,
    prefix,
    suffix,
    icon: stat.icon,
  }
}

/**
 * Maps a backend hero slide to the HeroSlider component shape.
 * @param {object} slide
 * @param {number} index
 * @returns {object}
 */
export function mapHeroSlide(slide, index = 0) {
  return {
    id: slide.id,
    image: imageUrl(slide.image),
    eyebrow: index === 0 ? 'Welcome' : 'Enderas',
    title: slide.title,
    subtitle: slide.subtitle,
    cta: { label: slide.button_text || 'Learn more', to: slide.button_link || '/about' },
    cta2: { label: 'Contact us', to: '/contact' },
  }
}

/**
 * Maps a backend service row to the ServiceCard / Services page shape.
 * @param {object} service
 * @returns {object}
 */
export function mapService(service) {
  return {
    id: service.id,
    slug: service.slug,
    title: service.title,
    excerpt: service.short_description || service.description || '',
    description: service.description || service.short_description || '',
    image: imageUrl(service.image),
    icon: SERVICE_ICONS[service.slug] || 'briefcase',
    features: [],
    active: service.is_active !== false,
    cta: {
      label: service.cta_text || 'Learn more',
      to: service.cta_link || '/contact',
    },
    metaTitle: service.meta_title,
    metaDescription: service.meta_description,
  }
}

/**
 * Maps a backend gallery item to the PropertyCard shape.
 * @param {object} item
 * @returns {object}
 */
export function mapGalleryItem(item) {
  return {
    id: item.id,
    title: item.title,
    image: imageUrl(item.image),
    description: item.description,
    category: item.category?.name || 'Gallery',
    location: item.description ? item.description.replace(/<[^>]+>/g, '').split(/[.,\n]/)[0]?.trim() || '' : '',
  }
}

/**
 * Maps a backend blog post to the BlogCard shape.
 * @param {object} post
 * @returns {object}
 */
export function mapBlogPost(post) {
  const wordCount = (post.content || post.excerpt || '').replace(/<[^>]+>/g, '').split(/\s+/).length
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || '',
    content: post.content || '',
    image: imageUrl(post.featured_image),
    category: post.categories?.[0]?.name || 'Insights',
    author: post.author?.name || 'Enderas Research',
    date: post.published_at || post.created_at,
    readTime: Math.max(3, Math.round(wordCount / 200)),
    status: post.status,
    metaTitle: post.meta_title,
    metaDescription: post.meta_description,
  }
}

/**
 * Maps a backend team member to the TeamCard shape.
 * @param {object} member
 * @returns {object}
 */
export function mapTeamMember(member) {
  return {
    id: member.id,
    name: member.full_name,
    role: member.position,
    image: imageUrl(member.profile_image),
    bio: member.biography,
    email: member.email,
  }
}

/**
 * Maps a backend testimonial to the TestimonialsSection shape.
 * @param {object} item
 * @returns {object}
 */
export function mapTestimonial(item) {
  return {
    id: item.id,
    name: item.client_name,
    company: item.company,
    content: item.content,
    image: imageUrl(item.client_image),
  }
}

/**
 * Maps a backend FAQ row to the FaqSection shape.
 * @param {object} item
 * @returns {object}
 */
export function mapFaq(item) {
  return {
    id: item.id,
    question: item.question,
    answer: item.answer,
  }
}

/**
 * Maps site settings and optional contact page into the global settings shape.
 * @param {object} apiSettings
 * @param {object} [contactPage]
 * @returns {object}
 */
export function mapSettings(apiSettings = {}, contactPage = {}) {
  const social = [
    apiSettings.facebook_url && { name: 'Facebook', href: apiSettings.facebook_url, icon: 'facebook' },
    apiSettings.linkedin_url && { name: 'LinkedIn', href: apiSettings.linkedin_url, icon: 'linkedin' },
    apiSettings.twitter_url && { name: 'Twitter', href: apiSettings.twitter_url, icon: 'twitter' },
    apiSettings.instagram_url && { name: 'Instagram', href: apiSettings.instagram_url, icon: 'instagram' },
    apiSettings.youtube_url && { name: 'YouTube', href: apiSettings.youtube_url, icon: 'youtube' },
  ].filter(Boolean)

  const siteName =
    apiSettings.site_name || import.meta.env.VITE_APP_NAME || DEFAULT_SITE_SETTINGS.seo.defaultTitle

  const phoneRaw = contactPage.phone || DEFAULT_SITE_SETTINGS.phone
  const address = contactPage.address || DEFAULT_SITE_SETTINGS.address

  const mapped = {
    sellLink: apiSettings.sell_link || '/contact',
    requestValuationLink: apiSettings.request_valuation_link || '/contact',
    appName: siteName.replace(/\s+Asset Management$/i, '') || DEFAULT_SITE_SETTINGS.appName,
    tagline: DEFAULT_SITE_SETTINGS.tagline,
    phone: phoneRaw?.split(',')[0]?.trim() || DEFAULT_SITE_SETTINGS.phone,
    phoneAlt: phoneRaw?.split(',')[1]?.trim() || DEFAULT_SITE_SETTINGS.phoneAlt,
    email: contactPage.email || DEFAULT_SITE_SETTINGS.email,
    address,
    city: DEFAULT_SITE_SETTINGS.city,
    country: DEFAULT_SITE_SETTINGS.country,
    poBox: DEFAULT_SITE_SETTINGS.poBox,
    hours: DEFAULT_SITE_SETTINGS.hours,
    footerDescription:
      apiSettings.footer_text || apiSettings.site_description || DEFAULT_SITE_SETTINGS.footerDescription,
    mapEmbedUrl: contactPage.google_map_embed || DEFAULT_SITE_SETTINGS.mapEmbedUrl,
    mapDirectionsUrl: address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : DEFAULT_SITE_SETTINGS.mapDirectionsUrl,
    mapCoordinates: DEFAULT_SITE_SETTINGS.mapCoordinates,
    seo: {
      defaultTitle: siteName,
      defaultDescription: apiSettings.site_description || DEFAULT_SITE_SETTINGS.seo.defaultDescription,
      siteUrl: DEFAULT_SITE_SETTINGS.seo.siteUrl,
      ogImage: imageUrl(apiSettings.logo) || DEFAULT_SITE_SETTINGS.seo.ogImage,
    },
    social: social.length ? social : DEFAULT_SITE_SETTINGS.social,
    logo: imageUrl(apiSettings.logo),
    favicon: imageUrl(apiSettings.favicon),
    copyright: apiSettings.copyright_text,
  }

  return { ...DEFAULT_SITE_SETTINGS, ...mapped }
}

/**
 * Maps homepage CMS fields and related collections into the HomePage view model.
 * @param {object} payload - Raw `/public/home` response
 * @returns {object}
 */
export function mapHomePageData(payload) {
  const { homePage, heroSlides, statistics, services, galleryItems, teamMembers, testimonials, faqs } = payload
  const firstStat = statistics?.[0]
  const statParts = firstStat ? parseStatValue(firstStat.value) : null

  return {
    homePage,
    slides: (heroSlides || []).map(mapHeroSlide),
    stats: (statistics || []).map(mapStatistic),
    services: (services || []).map(mapService),
    gallery: (galleryItems || []).map(mapGalleryItem),
    team: (teamMembers || []).map(mapTeamMember),
    testimonials: (testimonials || []).map(mapTestimonial),
    faqs: (faqs || []).map(mapFaq),
    visibility: {
      showTeam: Boolean(homePage?.show_team),
      showTestimonials: Boolean(homePage?.show_testimonials),
      showFaq: Boolean(homePage?.show_faq),
    },
    intro: {
      eyebrow: HOME_SECTIONS.intro.eyebrow,
      title: homePage?.company_intro_title || '',
      intro: homePage?.company_intro_description || '',
      pillars: INTRO_PILLARS,
      images: INTRO_IMAGES,
      statHighlight: firstStat
        ? { value: `${firstStat.value}`, label: firstStat.label }
        : { value: statParts ? `${statParts.prefix}${statParts.value}${statParts.suffix}` : '', label: '' },
      cta: {
        label: homePage?.company_intro_cta_text || 'Learn more',
        to: homePage?.company_intro_cta_link || '/about',
      },
    },
    featuredServicesTitle: HOME_SECTIONS.featuredServices,
    featuredProjectsTitle: HOME_SECTIONS.featuredProjects,
    blogSectionTitle: HOME_SECTIONS.blog,
    testimonialsTitle: HOME_SECTIONS.testimonials,
    faqTitle: HOME_SECTIONS.faq,
    auctionHighlight: {
      title: homePage?.auction_title || 'Featured opportunity',
      type: 'Valuation & Auction',
      image: imageUrl(heroSlides?.[0]?.image) || INTRO_IMAGES[0],
      reserve: '',
      closeDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Addis Ababa, Ethiopia',
      blurb: homePage?.auction_description || '',
      cta: {
        label: homePage?.auction_cta_text || 'View gallery',
        to: homePage?.auction_cta_link || '/gallery',
      },
    },
    cta: {
      title: homePage?.contact_cta_title || 'Ready to talk to our team?',
      body: homePage?.contact_cta_description || '',
      primary: {
        label: homePage?.contact_cta_button_text || 'Contact us',
        to: homePage?.contact_cta_button_link || '/contact',
      },
      secondary: { label: 'Explore our services', to: '/services' },
    },
    seo: {
      title: homePage?.meta_title,
      description: homePage?.meta_description,
    },
  }
}

/**
 * Maps the `/public/about` response into the AboutPage view model.
 * @param {object} payload
 * @returns {object}
 */
export function mapAboutPageData(payload) {
  const { about, coreValues, partners, teamMembers, cta } = payload
  return {
    heroEyebrow: 'About Enderas',
    heroTitle: 'Your partner in success.',
    heroIntro:
      about?.meta_description ||
      'Founded in 2007, Enderas delivers asset management, appraisal, investment advisory, and consultancy services across Ethiopia.',
    heroImage: imageUrl('/seed-assets/team/team-1.webp'),
    history: about?.history || '',
    historyExtended: '',
    mission: about?.mission || '',
    vision: about?.vision || '',
    values: (coreValues || []).map((v, i) => ({
      id: v.id,
      title: v.title,
      body: v.description,
      order: i,
    })),
    team: (teamMembers || []).map(mapTeamMember),
    partners: (partners || []).map((p) => ({
      name: p.name,
      logo: imageUrl(p.logo),
    })),
    cta: cta ? {
      title: cta.title || 'Ready to talk to our team?',
      body: cta.body || '',
      primary: {
        label: cta.primary_label || 'Contact us',
        to: cta.primary_link || '/contact',
      },
      secondary: { label: 'Explore our services', to: '/services' },
    } : null,
    seo: {
      title: about?.meta_title,
      description: about?.meta_description,
    },
  }
}

/**
 * Maps the `/public/cta` response into the CTASection component shape.
 * @param {object} cta
 * @returns {object}
 */
export function mapCtaData(cta) {
  return {
    title: cta?.title || 'Ready to talk to our team?',
    body: cta?.body || '',
    primary: {
      label: cta?.primary_label || 'Contact us',
      to: cta?.primary_link || '/contact',
    },
    secondary: { label: 'Explore our services', to: '/services' },
  }
}


