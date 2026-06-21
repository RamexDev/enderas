/**
 * @fileoverview Declarative registry of every editable region on every page.
 *
 * Each entry tells the visual editor:
 *   - which API resource to call on save
 *   - which fields the edit form should expose
 *   - whether the region is a singleton (one record) or a collection (many)
 *
 * The editor uses this metadata to render the right form inside the EditDrawer,
 * pre-populate it from the latest preview data, and PUT/POST to the existing
 * admin API surface (cmsApi). Field keys are the snake_case names the backend
 * accepts — same as the existing admin app.
 */

/**
 * @typedef {'text'|'textarea'|'email'|'toggle'|'image'|'select'|'galleryCategorySelect'|'blogCategoryMultiSelect'} FieldType
 *
 * @typedef FieldDef
 * @property {string} key          Backend field name (snake_case).
 * @property {string} label        Human-readable label shown in the form.
 * @property {FieldType} type      Editor control to render.
 * @property {boolean} [required]  Marks the field as required (UI only).
 * @property {number} [rows]       Rows for textarea fields.
 * @property {string} [placeholder]
 * @property {Array<{value:string,label:string}>} [options]  For select fields.
 * @property {boolean} [full]      Render full-width inside the form grid.
 * @property {string} [help]       Help text rendered under the field.
 *
 * @typedef SectionDef
 * @property {string} id                Unique within the page (e.g. "homepage-intro").
 * @property {string} label             Shown as the drawer title.
 * @property {string} [description]     Optional subtitle.
 * @property {'singleton'|'collection'} kind
 * @property {string} resource          Key into cmsApi (e.g. "homepage", "heroSlides").
 * @property {FieldDef[]} fields
 * @property {boolean} [supportsToggle] Collections with an `is_active` toggle.
 * @property {boolean} [supportsPublish] Blog posts use publish/unpublish.
 * @property {string} [emptyRecord]     JSON string of the empty record for "Add new".
 */

/** Helper to keep the field defs terse. */
const f = (key, label, type, extra = {}) => ({ key, label, type, ...extra })

// ─── Home page ─────────────────────────────────────────────────────────────

const HOMEPAGE_INTRO_FIELDS = [
  f('company_intro_title', 'Section title', 'text', { full: true, placeholder: 'A full-service platform for real-asset capital.' }),
  f('company_intro_description', 'Section description', 'textarea', { full: true, rows: 4 }),
  f('company_intro_cta_text', 'CTA button text', 'text'),
  f('company_intro_cta_link', 'CTA button link', 'text', { placeholder: '/about' }),
]

const HOMEPAGE_AUCTION_FIELDS = [
  f('auction_title', 'Section title', 'text', { full: true }),
  f('auction_description', 'Section description', 'textarea', { full: true, rows: 4 }),
  f('auction_cta_text', 'CTA button text', 'text'),
  f('auction_cta_link', 'CTA button link', 'text', { placeholder: '/gallery' }),
]

const HOMEPAGE_CTA_FIELDS = [
  f('contact_cta_title', 'Section title', 'text', { full: true }),
  f('contact_cta_description', 'Section description', 'textarea', { full: true, rows: 4 }),
  f('contact_cta_button_text', 'CTA button text', 'text'),
  f('contact_cta_button_link', 'CTA button link', 'text', { placeholder: '/contact' }),
]

const HOMEPAGE_SEO_FIELDS = [
  f('meta_title', 'Meta title', 'text', { full: true }),
  f('meta_description', 'Meta description', 'textarea', { full: true, rows: 3 }),
]

const HOMEPAGE_VISIBILITY_FIELDS = [
  f('show_testimonials', 'Show testimonials section', 'toggle', { full: true }),
  f('show_faq', 'Show FAQ section', 'toggle', { full: true }),
  f('show_team', 'Show team section', 'toggle', { full: true, help: 'Reserved for future use — currently no team JSX renders on the homepage.' }),
]

const HERO_SLIDE_FIELDS = [
  f('title', 'Title', 'text', { full: true }),
  f('subtitle', 'Subtitle', 'textarea', { full: true, rows: 2 }),
  f('image', 'Background image', 'image', { required: true, full: true }),
  f('button_text', 'Button text', 'text'),
  f('button_link', 'Button link', 'text', { placeholder: '/about' }),
  f('is_active', 'Active', 'toggle', { full: true }),
]

const STATISTIC_FIELDS = [
  f('label', 'Label', 'text', { required: true, full: true, placeholder: 'Assets under management' }),
  f('value', 'Value', 'text', { required: true, full: true, placeholder: '$4.2B or 12+ — text is fine, the UI parses the number out.' }),
]

const SERVICE_FIELDS = [
  f('title', 'Title', 'text', { required: true, full: true }),
  f('short_description', 'Short description', 'textarea', { full: true, rows: 2 }),
  f('description', 'Full description', 'textarea', { full: true, rows: 6 }),
  f('image', 'Image', 'image', { full: true }),
  f('cta_text', 'CTA button text', 'text'),
  f('cta_link', 'CTA button link', 'text', { placeholder: '/contact' }),
  f('is_active', 'Active', 'toggle', { full: true }),
  f('meta_title', 'SEO title', 'text', { full: true }),
  f('meta_description', 'SEO description', 'textarea', { full: true, rows: 2 }),
]

const GALLERY_ITEM_FIELDS = [
  f('title', 'Title', 'text', { full: true }),
  f('description', 'Description', 'textarea', { full: true, rows: 3 }),
  f('image', 'Image', 'image', { required: true, full: true }),
  f('category_id', 'Category', 'galleryCategorySelect', { full: true }),
]

const TESTIMONIAL_FIELDS = [
  f('client_name', 'Client name', 'text', { required: true }),
  f('company', 'Company', 'text'),
  f('content', 'Testimonial', 'textarea', { full: true, rows: 4, required: true }),
  f('client_image', 'Client photo', 'image', { full: true }),
  f('is_active', 'Active', 'toggle', { full: true }),
]

const FAQ_FIELDS = [
  f('question', 'Question', 'text', { required: true, full: true }),
  f('answer', 'Answer', 'textarea', { full: true, rows: 3, required: true }),
  f('is_active', 'Active', 'toggle', { full: true }),
]

// ─── About page ────────────────────────────────────────────────────────────

const ABOUT_PAGE_FIELDS = [
  f('history', 'Company history', 'textarea', { full: true, rows: 6 }),
  f('mission', 'Mission', 'textarea', { full: true, rows: 4 }),
  f('vision', 'Vision', 'textarea', { full: true, rows: 4 }),
  f('meta_title', 'SEO title', 'text', { full: true }),
  f('meta_description', 'SEO description', 'textarea', { full: true, rows: 3 }),
]

const CORE_VALUE_FIELDS = [
  f('title', 'Title', 'text', { required: true, full: true }),
  f('description', 'Description', 'textarea', { full: true, rows: 3 }),
]

const TEAM_MEMBER_FIELDS = [
  f('full_name', 'Full name', 'text', { required: true, full: true }),
  f('position', 'Position', 'text', { full: true }),
  f('email', 'Email', 'email', { full: true }),
  f('biography', 'Biography', 'textarea', { full: true, rows: 4 }),
  f('profile_image', 'Profile image', 'image', { full: true }),
  f('is_active', 'Active', 'toggle', { full: true }),
]

const PARTNER_FIELDS = [
  f('name', 'Name', 'text', { required: true, full: true }),
  f('logo', 'Logo', 'image', { full: true }),
  f('website_url', 'Website URL', 'text', { full: true, placeholder: 'https://' }),
  f('is_active', 'Active', 'toggle', { full: true }),
]

// ─── Gallery page ──────────────────────────────────────────────────────────

const GALLERY_CATEGORY_FIELDS = [
  f('name', 'Category name', 'text', { required: true, full: true }),
]

// ─── Blog page ─────────────────────────────────────────────────────────────

const BLOG_CATEGORY_FIELDS = [
  f('name', 'Category name', 'text', { required: true, full: true }),
]

const POST_FIELDS = [
  f('title', 'Title', 'text', { required: true, full: true }),
  f('slug', 'Slug', 'text', { full: true, placeholder: 'auto-generated from title' }),
  f('excerpt', 'Excerpt', 'textarea', { full: true, rows: 2 }),
  f('content', 'Content', 'textarea', { full: true, rows: 12, help: 'Plain text or HTML. The public site sanitises HTML and renders paragraphs from line breaks.' }),
  f('featured_image', 'Featured image', 'image', { full: true }),
  f('status', 'Status', 'select', { full: true, options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] }),
  f('categories', 'Category', 'blogCategorySelect', { full: true }),
  f('meta_title', 'SEO title', 'text', { full: true }),
  f('meta_description', 'SEO description', 'textarea', { full: true, rows: 2 }),
]

// ─── Contact page ──────────────────────────────────────────────────────────

const CONTACT_PAGE_FIELDS = [
  f('address', 'Address', 'textarea', { full: true, rows: 3 }),
  f('phone', 'Phone', 'text', { full: true, help: 'Comma-separated for an alternate number, e.g. "+251 935 401 131, +251 116 180 843".' }),
  f('email', 'Email', 'email', { full: true }),
  f('google_map_embed', 'Google Map embed', 'textarea', { full: true, rows: 3, help: 'Paste the embed URL or the full iframe HTML.' }),
  f('meta_title', 'SEO title', 'text', { full: true }),
  f('meta_description', 'SEO description', 'textarea', { full: true, rows: 2 }),
]

// ─── Site settings ─────────────────────────────────────────────────────────

const SETTINGS_FIELDS = [
  f('site_name', 'Site name', 'text', { full: true }),
  f('site_description', 'Site description', 'textarea', { full: true, rows: 2 }),
  f('logo', 'Logo', 'image', { full: true }),
  f('favicon', 'Favicon', 'image', { full: true }),
  f('footer_text', 'Footer text', 'textarea', { full: true, rows: 3 }),
  f('copyright_text', 'Copyright text', 'text', { full: true }),
  f('sell_link', 'Auctions link', 'text', { full: true, placeholder: '/contact' }),
  f('request_valuation_link', 'Request valuation link', 'text', { full: true, placeholder: '/contact' }),
  f('facebook_url', 'Facebook URL', 'text', { full: true }),
  f('linkedin_url', 'LinkedIn URL', 'text', { full: true }),
  f('instagram_url', 'Instagram URL', 'text', { full: true }),
  f('twitter_url', 'Twitter URL', 'text', { full: true }),
  f('youtube_url', 'YouTube URL', 'text', { full: true }),
]

// ─── Per-page registry ─────────────────────────────────────────────────────

export const EDITABLE_SECTIONS = {
  home: [
    { id: 'hero-slides', label: 'Hero slides', description: 'The full-bleed carousel at the top of the homepage.', kind: 'collection', resource: 'heroSlides', fields: HERO_SLIDE_FIELDS, supportsToggle: true },
    { id: 'homepage-intro', label: 'Company introduction', description: 'The "Who we are" block under the hero.', kind: 'singleton', resource: 'homepage', fields: HOMEPAGE_INTRO_FIELDS },
    { id: 'homepage-auction', label: 'Auction & valuation highlight', description: 'Featured opportunity block.', kind: 'singleton', resource: 'homepage', fields: HOMEPAGE_AUCTION_FIELDS },
    { id: 'homepage-cta', label: 'Contact CTA section', description: 'The closing call-to-action band.', kind: 'singleton', resource: 'homepage', fields: HOMEPAGE_CTA_FIELDS },
    { id: 'statistics', label: 'Statistics', description: 'Business metrics row.', kind: 'collection', resource: 'statistics', fields: STATISTIC_FIELDS },
    { id: 'featured-services', label: 'Featured services', description: 'Pulled from the services collection — first 3 active records.', kind: 'collection', resource: 'services', fields: SERVICE_FIELDS, supportsToggle: true },
    { id: 'featured-gallery', label: 'Featured gallery items', description: 'Latest 6 gallery records.', kind: 'collection', resource: 'galleryItems', fields: GALLERY_ITEM_FIELDS },
    { id: 'testimonials', label: 'Testimonials', description: 'Renders on the homepage only when "Show testimonials" is on.', kind: 'collection', resource: 'testimonials', fields: TESTIMONIAL_FIELDS, supportsToggle: true },
    { id: 'faqs', label: 'FAQ items', description: 'Renders on the homepage only when "Show FAQ" is on.', kind: 'collection', resource: 'faqs', fields: FAQ_FIELDS, supportsToggle: true },
    { id: 'homepage-visibility', label: 'Section visibility', description: 'Toggle which optional sections render on the homepage.', kind: 'singleton', resource: 'homepage', fields: HOMEPAGE_VISIBILITY_FIELDS },
    { id: 'homepage-seo', label: 'Homepage SEO', kind: 'singleton', resource: 'homepage', fields: HOMEPAGE_SEO_FIELDS },
  ],
  about: [
    { id: 'about-content', label: 'About page content', description: 'History, mission, vision.', kind: 'singleton', resource: 'aboutPage', fields: ABOUT_PAGE_FIELDS },
    { id: 'core-values', label: 'Core values', kind: 'collection', resource: 'coreValues', fields: CORE_VALUE_FIELDS },
    { id: 'team-members', label: 'Team members', kind: 'collection', resource: 'teamMembers', fields: TEAM_MEMBER_FIELDS, supportsToggle: true },
    { id: 'partners', label: 'Partners', kind: 'collection', resource: 'partners', fields: PARTNER_FIELDS, supportsToggle: true },
  ],
  services: [
    { id: 'services-list', label: 'Services', description: 'All services. Active ones appear on the homepage and /services.', kind: 'collection', resource: 'services', fields: SERVICE_FIELDS, supportsToggle: true },
  ],
  gallery: [
    { id: 'gallery-categories', label: 'Gallery categories', kind: 'collection', resource: 'galleryCategories', fields: GALLERY_CATEGORY_FIELDS },
    { id: 'gallery-items', label: 'Gallery items', kind: 'collection', resource: 'galleryItems', fields: GALLERY_ITEM_FIELDS },
  ],
  blog: [
    { id: 'blog-categories', label: 'Blog categories', kind: 'collection', resource: 'blogCategories', fields: BLOG_CATEGORY_FIELDS },
    { id: 'blog-posts', label: 'Blog posts', kind: 'collection', resource: 'posts', fields: POST_FIELDS, supportsPublish: true },
  ],
  contact: [
    { id: 'contact-page', label: 'Contact page info', description: 'Address, phone, email, and the Google Map embed shown on /contact.', kind: 'singleton', resource: 'contactPage', fields: CONTACT_PAGE_FIELDS },
    { id: 'site-settings', label: 'Site settings', description: 'Global brand, footer, and social links shown across the site.', kind: 'singleton', resource: 'settings', fields: SETTINGS_FIELDS },
  ],
}

/**
 * Default empty record for a collection section — used by the "Add new" button
 * inside the EditDrawer.
 * @param {SectionDef} section
 * @returns {Record<string, *>}
 */
export function emptyRecordFor(section) {
  const record = {}
  for (const field of section.fields) {
    if (field.type === 'toggle') record[field.key] = true
    else     if (field.type === 'blogCategorySelect') record[field.key] = []
    else record[field.key] = ''
  }
  return record
}

/**
 * Picks the field used as a human-readable title for a record (shown in the
 * collection list inside the drawer).
 * @param {SectionDef} section
 * @returns {string}
 */
export function titleFieldFor(section) {
  const map = {
    heroSlides: 'title',
    statistics: 'label',
    services: 'title',
    galleryItems: 'title',
    galleryCategories: 'name',
    testimonials: 'client_name',
    faqs: 'question',
    coreValues: 'title',
    teamMembers: 'full_name',
    partners: 'name',
    blogCategories: 'name',
    posts: 'title',
  }
  return map[section.resource] || 'name'
}
