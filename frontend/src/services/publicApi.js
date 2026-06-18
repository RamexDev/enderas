/**
 * @fileoverview Centralized public API layer.
 * Every backend `/public/*` endpoint used by the website is defined here.
 * Domain services should import from this module — never call Axios directly.
 */

import api, { unwrap, unwrapPaginated } from './api'

// ─── Homepage ─────────────────────────────────────────────────────────────────

/** Homepage aggregate: content, hero slides, stats, featured services/gallery, team, testimonials, FAQs. */
export const homeApi = {
  get: () => api.get('/public/home').then(unwrap),
}

// ─── About ────────────────────────────────────────────────────────────────────

/** About page content, core values, and active partners. */
export const aboutApi = {
  get: () => api.get('/public/about').then(unwrap),
}

// ─── Services ─────────────────────────────────────────────────────────────────

/** Active services listing and detail by slug. */
export const servicesApi = {
  list: (params) => api.get('/public/services', { params }).then(unwrapPaginated),
  getBySlug: (slug) => api.get(`/public/services/${slug}`).then(unwrap),
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

/** Gallery items with optional category filter and pagination. */
export const galleryApi = {
  list: (params) => api.get('/public/gallery', { params }).then(unwrapPaginated),
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

/** Published blog posts with search, category filter, and pagination. */
export const blogApi = {
  list: (params) => api.get('/public/posts', { params }).then(unwrapPaginated),
  getBySlug: (slug) => api.get(`/public/posts/${slug}`).then(unwrap),
}

// ─── Contact ──────────────────────────────────────────────────────────────────

/** Contact page info and inquiry submission. */
export const contactApi = {
  getPage: () => api.get('/public/contact').then(unwrap),
  submit: (data) => api.post('/public/contact', data).then(unwrap),
}

// ─── Site settings ────────────────────────────────────────────────────────────

/** Global site settings (footer, social links, SEO defaults). */
export const settingsApi = {
  get: () => api.get('/public/settings').then(unwrap),
}
