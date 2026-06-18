/**
 * @fileoverview Static primary navigation links.
 * Navigation structure is developer-controlled per project specification — not CMS-managed.
 */

/** Placeholder href for Assets for Sale until the auction platform is ready. */
export const AUCTION_LINK = '#'

/** Primary navigation items rendered in the header and footer. */
export const PUBLIC_NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Insights', to: '/blog' },
  { label: 'Assets for Sale', to: AUCTION_LINK, highlight: true },
  { label: 'Contact', to: '/contact' },
]
