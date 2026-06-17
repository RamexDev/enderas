export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  GALLERY: '/gallery',
  BLOG: '/blog',
  CONTACT: '/contact',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
}

export const PUBLIC_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Insights', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export const ADMIN_NAV = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Settings', to: '/admin/settings' },
  { label: 'Homepage', to: '/admin/homepage' },
  { label: 'About', to: '/admin/about' },
  { label: 'Services', to: '/admin/services' },
  { label: 'Gallery', to: '/admin/gallery' },
  { label: 'Blog', to: '/admin/blog' },
  { label: 'Messages', to: '/admin/messages' },
]

export const STORAGE_KEY = 'enderas-cms-v1'
export const AUTH_KEY = 'enderas-admin-session'
