/**
 * @fileoverview Centralized CMS API layer.
 * Every backend endpoint used by the admin app is defined here.
 * Pages and hooks should import from this module — never call Axios directly.
 */

import api, { unwrap, unwrapPaginated } from './api'

// ─── Authentication ───────────────────────────────────────────────────────────

/** Login, session, and password endpoints (`/auth/*`). */
export const authApi = {
  /** @param {string} email @param {string} password */
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then(unwrap),
  /** @param {string} refreshToken */
  logout: (refreshToken) =>
    api.post('/auth/logout', { refresh_token: refreshToken }).then(unwrap),
  me: () => api.get('/auth/me').then(unwrap),
  changePassword: (old_password, new_password) =>
    api.post('/auth/change-password', { old_password, new_password }).then(unwrap),
}

// ─── Dashboard ──────────────────────────────────────────────────────────────

/** Aggregate statistics for the dashboard home screen. */
export const dashboardApi = {
  getStats: () => api.get('/dashboard').then(unwrap),
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

/** Homepage content, statistics, and hero slides. */
export const homepageApi = {
  get: () => api.get('/home-page').then(unwrap),
  update: (data) => api.put('/home-page', data).then(unwrap),
  listStatistics: () => api.get('/statistics').then(unwrap),
  createStatistic: (data) => api.post('/statistics', data).then(unwrap),
  updateStatistic: (id, data) => api.put(`/statistics/${id}`, data).then(unwrap),
  deleteStatistic: (id) => api.delete(`/statistics/${id}`).then(unwrap),
  listHeroSlides: () => api.get('/hero-slides').then(unwrap),
  createHeroSlide: (data) => api.post('/hero-slides', data).then(unwrap),
  updateHeroSlide: (id, data) => api.put(`/hero-slides/${id}`, data).then(unwrap),
  deleteHeroSlide: (id) => api.delete(`/hero-slides/${id}`).then(unwrap),
  toggleHeroSlide: (id) => api.patch(`/hero-slides/${id}/status`).then(unwrap),
}

// ─── Services ─────────────────────────────────────────────────────────────────

/** Service CRUD with pagination and status toggle. */
export const servicesApi = {
  list: (params) => api.get('/services', { params }).then(unwrapPaginated),
  get: (id) => api.get(`/services/${id}`).then(unwrap),
  create: (data) => api.post('/services', data).then(unwrap),
  update: (id, data) => api.put(`/services/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/services/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/services/${id}/status`).then(unwrap),
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

/** Gallery items and categories. */
export const galleryApi = {
  listCategories: () => api.get('/gallery-categories').then(unwrap),
  createCategory: (data) => api.post('/gallery-categories', data).then(unwrap),
  updateCategory: (id, data) => api.put(`/gallery-categories/${id}`, data).then(unwrap),
  deleteCategory: (id) => api.delete(`/gallery-categories/${id}`).then(unwrap),
  list: (params) => api.get('/gallery', { params }).then(unwrapPaginated),
  create: (data) => api.post('/gallery', data).then(unwrap),
  update: (id, data) => api.put(`/gallery/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/gallery/${id}`).then(unwrap),
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

/** Blog posts and categories with publish workflow. */
export const blogApi = {
  listCategories: () => api.get('/categories').then(unwrap),
  createCategory: (data) => api.post('/categories', data).then(unwrap),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data).then(unwrap),
  deleteCategory: (id) => api.delete(`/categories/${id}`).then(unwrap),
  list: (params) => api.get('/posts', { params }).then(unwrapPaginated),
  get: (id) => api.get(`/posts/${id}`).then(unwrap),
  create: (data) => api.post('/posts', data).then(unwrap),
  update: (id, data) => api.put(`/posts/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/posts/${id}`).then(unwrap),
  publish: (id) => api.patch(`/posts/${id}/publish`).then(unwrap),
  unpublish: (id) => api.patch(`/posts/${id}/unpublish`).then(unwrap),
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export const teamApi = {
  list: () => api.get('/team-members').then(unwrap),
  create: (data) => api.post('/team-members', data).then(unwrap),
  update: (id, data) => api.put(`/team-members/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/team-members/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/team-members/${id}/status`).then(unwrap),
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonialsApi = {
  list: () => api.get('/testimonials').then(unwrap),
  create: (data) => api.post('/testimonials', data).then(unwrap),
  update: (id, data) => api.put(`/testimonials/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/testimonials/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/testimonials/${id}/status`).then(unwrap),
}

// ─── FAQs ───────────────────────────────────────────────────────────────────

export const faqsApi = {
  list: () => api.get('/faqs').then(unwrap),
  create: (data) => api.post('/faqs', data).then(unwrap),
  update: (id, data) => api.put(`/faqs/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/faqs/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/faqs/${id}/status`).then(unwrap),
}

// ─── About page ───────────────────────────────────────────────────────────────

/** About page content, core values, and partners. */
export const aboutApi = {
  get: () => api.get('/about-page').then(unwrap),
  update: (data) => api.put('/about-page', data).then(unwrap),
  listCoreValues: () => api.get('/core-values').then(unwrap),
  createCoreValue: (data) => api.post('/core-values', data).then(unwrap),
  updateCoreValue: (id, data) => api.put(`/core-values/${id}`, data).then(unwrap),
  deleteCoreValue: (id) => api.delete(`/core-values/${id}`).then(unwrap),
  listPartners: () => api.get('/partners').then(unwrap),
  createPartner: (data) => api.post('/partners', data).then(unwrap),
  updatePartner: (id, data) => api.put(`/partners/${id}`, data).then(unwrap),
  deletePartner: (id) => api.delete(`/partners/${id}`).then(unwrap),
  togglePartner: (id) => api.patch(`/partners/${id}/status`).then(unwrap),
}

// ─── Contact ──────────────────────────────────────────────────────────────────

/** Contact page settings and inbound messages. */
export const contactApi = {
  getPage: () => api.get('/contact-page').then(unwrap),
  updatePage: (data) => api.put('/contact-page', data).then(unwrap),
  listMessages: (params) => api.get('/contact-messages', { params }).then(unwrapPaginated),
  getMessage: (id) => api.get(`/contact-messages/${id}`).then(unwrap),
  markRead: (id) => api.patch(`/contact-messages/${id}/read`).then(unwrap),
  archive: (id) => api.patch(`/contact-messages/${id}/archive`).then(unwrap),
}

// ─── Media ────────────────────────────────────────────────────────────────────

/** Media library upload and management. */
export const mediaApi = {
  list: (params) => api.get('/media', { params }).then(unwrapPaginated),
  upload: (file) => {
    const form = new FormData()
    form.append('file', file)
    return api.post('/media/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(unwrap)
  },
  delete: (id) => api.delete(`/media/${id}`).then(unwrap),
}

// ─── Site settings ────────────────────────────────────────────────────────────

export const settingsApi = {
  get: () => api.get('/settings').then(unwrap),
  update: (data) => api.put('/settings', data).then(unwrap),
}

// ─── Users (super admin) ──────────────────────────────────────────────────────

export const usersApi = {
  list: () => api.get('/users').then(unwrap),
  get: (id) => api.get(`/users/${id}`).then(unwrap),
  create: (data) => api.post('/users', data).then(unwrap),
  update: (id, data) => api.put(`/users/${id}`, data).then(unwrap),
  toggleStatus: (id) => api.patch(`/users/${id}/status`).then(unwrap),
  delete: (id) => api.delete(`/users/${id}`).then(unwrap),
}
