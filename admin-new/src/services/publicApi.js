/**
 * @fileoverview Public API layer — used by the visual preview to fetch exactly
 * what a visitor would see. After the EditDrawer saves through cmsApi, the
 * preview refetches through here so the rendered content updates immediately.
 */

import api, { unwrap, unwrapPaginated } from './api'

export const publicHomeApi = {
  get: () => api.get('/public/home').then(unwrap),
}

export const publicAboutApi = {
  get: () => api.get('/public/about').then(unwrap),
}

export const publicServicesApi = {
  list: (params) => api.get('/public/services', { params }).then(unwrapPaginated),
  getBySlug: (slug) => api.get(`/public/services/${slug}`).then(unwrap),
}

export const publicGalleryApi = {
  list: (params) => api.get('/public/gallery', { params }).then(unwrapPaginated),
}

export const publicBlogApi = {
  list: (params) => api.get('/public/posts', { params }).then(unwrapPaginated),
  getBySlug: (slug) => api.get(`/public/posts/${slug}`).then(unwrap),
}

export const publicCtaApi = {
  get: () => api.get('/public/cta').then(unwrap),
}

export const publicContactApi = {
  getPage: () => api.get('/public/contact').then(unwrap),
}

export const publicSettingsApi = {
  get: () => api.get('/public/settings').then(unwrap),
}
