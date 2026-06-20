/**
 * @fileoverview Transforms backend API payloads (snake_case) into UI-friendly
 * shapes. Verbatim copy of the public frontend's mappers so the visual preview
 * matches the production site's data structure exactly.
 */

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

const INTRO_PILLARS = [
  { icon: 'shield', title: 'Independence', body: 'Privately held since founding. No conflicts of interest.' },
  { icon: 'check', title: 'Rigor', body: 'Every report and model is peer-reviewed before delivery.' },
  { icon: 'sparkles', title: 'Alignment', body: 'We succeed only when our clients do.' },
  { icon: 'user', title: 'Discretion', body: 'Many of our most significant engagements are never public.' },
]

const INTRO_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
]

const HOME_SECTIONS = {
  intro: { eyebrow: 'Who we are' },
  featuredServices: {
    eyebrow: 'What we do',
    title: 'A full-service platform for real-asset capital.',
    intro: 'Valuation, monetization, advisory, and stewardship under one roof.',
  },
  featuredProjects: {
    eyebrow: 'Selected work',
    title: 'Properties and portfolios we steward.',
    intro: 'A cross-section of recent engagements across commercial, residential, and institutional assets.',
  },
  blog: {
    eyebrow: 'Insights',
    title: 'Latest from our research desk.',
    intro: 'Market outlooks, sector deep-dives, and notes from the field.',
  },
  testimonials: {
    eyebrow: 'Client voices',
    title: 'What our clients say.',
    intro: 'Selected feedback from asset owners, institutions, and counterparties.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions.',
    intro: 'Short answers to the most common questions we hear.',
  },
}

const DEFAULT_SITE_SETTINGS = {
  appName: 'Enderas',
  tagline: 'Asset Management',
  logo: '',
  favicon: '',
  phone: '+251 935 401 131',
  phoneAlt: '+251 116 180 843',
  email: 'info@enderas.org',
  address: 'NB Business Center, 6th Floor, Office 605, Addis Ababa, Ethiopia',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  poBox: '60215',
  hours: 'Mon–Fri, 8:30 AM – 5:30 PM EAT',
  footerDescription: 'Enderas is a dedicated private limited company delivering asset management, appraisal, investment advisory, and consultancy services across Ethiopia.',
  mapEmbedUrl: 'https://maps.google.com/maps?q=NB%20Business%20Center&t=m&z=15&output=embed&iwloc=near',
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=NB+Business+Center%2C+Addis+Ababa%2C+Ethiopia',
  mapCoordinates: { lat: 8.994, lng: 38.79 },
  seo: {
    defaultTitle: 'Enderas Asset Management',
    defaultDescription: 'Enderas Asset Management — valuation, advisory, and stewardship for real-asset capital across Ethiopia.',
    siteUrl: 'https://www.enderas.org',
    ogImage: '',
  },
  sellLink: '/contact',
  requestValuationLink: '/contact',
  social: [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/enderas', icon: 'linkedin' },
    { name: 'Twitter', href: 'https://twitter.com/enderas', icon: 'twitter' },
    { name: 'Instagram', href: 'https://instagram.com/enderas', icon: 'instagram' },
  ],
}

function parseStatValue(raw) {
  const str = String(raw ?? '')
  const match = str.match(/^([^\d]*)([\d.]+)(.*)$/)
  if (!match) return { value: 0, prefix: '', suffix: str }
  return { value: parseFloat(match[2]), prefix: match[1], suffix: match[3] }
}

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

export function mapTestimonial(item) {
  return {
    id: item.id,
    name: item.client_name,
    company: item.company,
    content: item.content,
    image: imageUrl(item.client_image),
  }
}

export function mapFaq(item) {
  return {
    id: item.id,
    question: item.question,
    answer: item.answer,
  }
}

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
      id: p.id,
      name: p.name,
      logo: imageUrl(p.logo),
      website: p.website_url,
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

export { DEFAULT_SITE_SETTINGS, HOME_SECTIONS, INTRO_PILLARS, INTRO_IMAGES, SERVICE_ICONS }
