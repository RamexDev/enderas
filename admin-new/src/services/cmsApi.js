/**
 * @fileoverview Centralized CMS API layer — same endpoint surface as the
 * existing admin's cmsApi. The editor's EditDrawer routes save calls through
 * this module by `resource` key (see editableSections.js).
 */

import api, { unwrap, unwrapPaginated } from './api'

export const authApi = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then(unwrap),
  logout: (refreshToken) =>
    api.post('/auth/logout', { refresh_token: refreshToken }).then(unwrap),
  me: () => api.get('/auth/me').then(unwrap),
  changePassword: (old_password, new_password) =>
    api.post('/auth/change-password', { old_password, new_password }).then(unwrap),
}

export const dashboardApi = {
  getStats: () => api.get('/dashboard').then(unwrap),
}

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

export const servicesApi = {
  list: (params) => api.get('/services', { params }).then(unwrapPaginated),
  get: (id) => api.get(`/services/${id}`).then(unwrap),
  create: (data) => api.post('/services', data).then(unwrap),
  update: (id, data) => api.put(`/services/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/services/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/services/${id}/status`).then(unwrap),
}

export const galleryApi = {
  listCategories: () => api.get('/gallery-categories').then(unwrap),
  createCategory: (data) => api.post('/gallery-categories', data).then(unwrap),
  updateCategory: (id, data) => api.put(`/gallery-categories/${id}`, data).then(unwrap),
  deleteCategory: (id) => api.delete(`/gallery-categories/${id}`).then(unwrap),
  list: (params) => api.get('/gallery', { params }).then(unwrapPaginated),
  get: (id) => api.get(`/gallery/${id}`).then(unwrap),
  create: (data) => api.post('/gallery', data).then(unwrap),
  update: (id, data) => api.put(`/gallery/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/gallery/${id}`).then(unwrap),
}

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

export const teamApi = {
  list: (params) => api.get('/team-members', { params }).then(unwrapPaginated),
  create: (data) => api.post('/team-members', data).then(unwrap),
  update: (id, data) => api.put(`/team-members/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/team-members/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/team-members/${id}/status`).then(unwrap),
}

export const testimonialsApi = {
  list: (params) => api.get('/testimonials', { params }).then(unwrapPaginated),
  create: (data) => api.post('/testimonials', data).then(unwrap),
  update: (id, data) => api.put(`/testimonials/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/testimonials/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/testimonials/${id}/status`).then(unwrap),
}

export const faqsApi = {
  list: (params) => api.get('/faqs', { params }).then(unwrapPaginated),
  create: (data) => api.post('/faqs', data).then(unwrap),
  update: (id, data) => api.put(`/faqs/${id}`, data).then(unwrap),
  delete: (id) => api.delete(`/faqs/${id}`).then(unwrap),
  toggleStatus: (id) => api.patch(`/faqs/${id}/status`).then(unwrap),
}

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

export const contactApi = {
  getPage: () => api.get('/contact-page').then(unwrap),
  updatePage: (data) => api.put('/contact-page', data).then(unwrap),
  getUnread: () => api.get('/contact-messages/unread').then(unwrap),
  listMessages: (params) => api.get('/contact-messages', { params }).then(unwrapPaginated),
  getMessage: (id) => api.get(`/contact-messages/${id}`).then(unwrap),
  markRead: (id) => api.patch(`/contact-messages/${id}/read`).then(unwrap),
  markUnread: (id) => api.patch(`/contact-messages/${id}/unread`).then(unwrap),
  archive: (id) => api.patch(`/contact-messages/${id}/archive`).then(unwrap),
  unarchive: (id) => api.patch(`/contact-messages/${id}/unarchive`).then(unwrap),
  destroy: (id) => api.delete(`/contact-messages/${id}`).then(unwrap),
}

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

export const settingsApi = {
  get: () => api.get('/settings').then(unwrap),
  update: (data) => api.put('/settings', data).then(unwrap),
}

export const usersApi = {
  list: (params) => api.get('/users', { params }).then(unwrapPaginated),
  get: (id) => api.get(`/users/${id}`).then(unwrap),
  create: (data) => api.post('/users', data).then(unwrap),
  update: (id, data) => api.put(`/users/${id}`, data).then(unwrap),
  toggleStatus: (id) => api.patch(`/users/${id}/status`).then(unwrap),
  delete: (id) => api.delete(`/users/${id}`).then(unwrap),
}

/**
 * Maps a `resource` key (from editableSections.js) to the right API object +
 * CRUD methods. The EditDrawer uses this to save/delete without knowing the
 * specific resource name.
 */
export const resourceApi = {
  homepage: {
    get: () => homepageApi.get(),
    update: (_id, data) => homepageApi.update(data),
  },
  heroSlides: {
    list: () => homepageApi.listHeroSlides(),
    create: (data) => homepageApi.createHeroSlide(data),
    update: (id, data) => homepageApi.updateHeroSlide(id, data),
    delete: (id) => homepageApi.deleteHeroSlide(id),
    toggle: (id) => homepageApi.toggleHeroSlide(id),
  },
  statistics: {
    list: () => homepageApi.listStatistics(),
    create: (data) => homepageApi.createStatistic(data),
    update: (id, data) => homepageApi.updateStatistic(id, data),
    delete: (id) => homepageApi.deleteStatistic(id),
  },
  services: {
    list: (params) => servicesApi.list(params).then((r) => r.data),
    create: (data) => servicesApi.create(data),
    update: (id, data) => servicesApi.update(id, data),
    delete: (id) => servicesApi.delete(id),
    toggle: (id) => servicesApi.toggleStatus(id),
  },
  galleryItems: {
    list: (params) => galleryApi.list(params).then((r) => r.data),
    create: (data) => galleryApi.create(data),
    update: (id, data) => galleryApi.update(id, data),
    delete: (id) => galleryApi.delete(id),
  },
  galleryCategories: {
    list: () => galleryApi.listCategories(),
    create: (data) => galleryApi.createCategory(data),
    update: (id, data) => galleryApi.updateCategory(id, data),
    delete: (id) => galleryApi.deleteCategory(id),
  },
  posts: {
    list: (params) => blogApi.list(params).then((r) => r.data),
    create: (data) => blogApi.create(data),
    update: (id, data) => blogApi.update(id, data),
    delete: (id) => blogApi.delete(id),
    publish: (id) => blogApi.publish(id),
    unpublish: (id) => blogApi.unpublish(id),
  },
  blogCategories: {
    list: () => blogApi.listCategories(),
    create: (data) => blogApi.createCategory(data),
    update: (id, data) => blogApi.updateCategory(id, data),
    delete: (id) => blogApi.deleteCategory(id),
  },
  teamMembers: {
    list: (params) => teamApi.list(params).then((r) => r.data),
    create: (data) => teamApi.create(data),
    update: (id, data) => teamApi.update(id, data),
    delete: (id) => teamApi.delete(id),
    toggle: (id) => teamApi.toggleStatus(id),
  },
  testimonials: {
    list: (params) => testimonialsApi.list(params).then((r) => r.data),
    create: (data) => testimonialsApi.create(data),
    update: (id, data) => testimonialsApi.update(id, data),
    delete: (id) => testimonialsApi.delete(id),
    toggle: (id) => testimonialsApi.toggleStatus(id),
  },
  faqs: {
    list: (params) => faqsApi.list(params).then((r) => r.data),
    create: (data) => faqsApi.create(data),
    update: (id, data) => faqsApi.update(id, data),
    delete: (id) => faqsApi.delete(id),
    toggle: (id) => faqsApi.toggleStatus(id),
  },
  aboutPage: {
    get: () => aboutApi.get(),
    update: (_id, data) => aboutApi.update(data),
  },
  coreValues: {
    list: () => aboutApi.listCoreValues(),
    create: (data) => aboutApi.createCoreValue(data),
    update: (id, data) => aboutApi.updateCoreValue(id, data),
    delete: (id) => aboutApi.deleteCoreValue(id),
  },
  partners: {
    list: () => aboutApi.listPartners(),
    create: (data) => aboutApi.createPartner(data),
    update: (id, data) => aboutApi.updatePartner(id, data),
    delete: (id) => aboutApi.deletePartner(id),
    toggle: (id) => aboutApi.togglePartner(id),
  },
  contactPage: {
    get: () => contactApi.getPage(),
    update: (_id, data) => contactApi.updatePage(data),
  },
  settings: {
    get: () => settingsApi.get(),
    update: (_id, data) => settingsApi.update(data),
  },
}
