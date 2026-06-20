/**
 * @fileoverview Route constants for the visual editor.
 * Centralised so navigation + sidebar + guards all reference the same paths.
 */
export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  GALLERY: '/gallery',
  BLOG: '/blog',
  CONTACT: '/contact',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  MEDIA: '/media',
  USERS: '/users',
  PROFILE: '/profile',
}

/** Pages that render a visual preview of the public site. */
export const PREVIEW_PAGES = [
  ROUTES.HOME,
  ROUTES.ABOUT,
  ROUTES.SERVICES,
  ROUTES.GALLERY,
  ROUTES.BLOG,
  ROUTES.CONTACT,
]
