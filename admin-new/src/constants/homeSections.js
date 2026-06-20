/**
 * @fileoverview Fixed section headings and layout scaffolding for the homepage.
 * Per project spec, section order and layout are developer-controlled; CMS drives body copy.
 */

/** Default pillars shown in the company introduction grid (structural layout). */
export const INTRO_PILLARS = [
  { icon: 'shield', title: 'Independence', body: 'Privately held since founding. No conflicts of interest.' },
  { icon: 'check', title: 'Rigor', body: 'Every report and model is peer-reviewed before delivery.' },
  { icon: 'sparkles', title: 'Alignment', body: 'We succeed only when our clients do.' },
  { icon: 'user', title: 'Discretion', body: 'Many of our most significant engagements are never public.' },
]

/** Default collage images for the company introduction section. */
export const INTRO_IMAGES = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
]

/** Fixed headings for homepage subsections (layout-controlled). */
export const HOME_SECTIONS = {
  intro: {
    eyebrow: 'Who we are',
  },
  featuredServices: {
    eyebrow: 'What we do',
    title: 'A full-service platform for real-asset capital.',
    intro:
      'From independent valuation to operational stewardship to monetization — Enderas covers the full lifecycle of institutional real-asset ownership.',
  },
  featuredProjects: {
    eyebrow: 'Selected work',
    title: 'Properties and portfolios we steward.',
    intro: 'A cross-section of assets that have moved through our valuation, management and auction desks.',
  },
  blog: {
    eyebrow: 'Insights',
    title: 'Latest from our research desk.',
    intro: 'Market outlooks, sector deep-dives and practical strategy guidance for real-asset capital.',
  },
  testimonials: {
    eyebrow: 'Client voices',
    title: 'What our clients say.',
    intro: 'Organizations across Ethiopia and beyond trust Enderas for asset management, valuation, and advisory.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions.',
    intro: 'Answers to common questions about our services, process, and how to get started.',
  },
}

/** Auction & valuation promo block on the services page (fixed layout). */
export const SERVICES_PROMO = {
  eyebrow: 'Auction & Valuation',
  title: 'Considering selling? Start with an independent valuation.',
  body: 'Before any auction or marketed sale, our certified appraisers deliver a defensible valuation that anchors your reserve price and negotiation strategy.',
  features: [
    'Independent appraisal reports',
    'Internal peer review on every deliverable',
    'Litigation-ready expert testimony available',
    'Timely turnaround',
  ],
  image:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80',
}
