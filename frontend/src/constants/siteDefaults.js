/**
 * @fileoverview Static site defaults for layout-owned content (contact info, map, footer).
 * Used as fallbacks when the API is unavailable and for the contact page display
 * (contact UI + map are fixed in the frontend; only form submission hits the API).
 */

/** Default contact and footer values — aligned with seeded CMS / enderas.org. */
export const DEFAULT_SITE_SETTINGS = {
  appName: 'Enderas',
  tagline: 'Asset Management',
  phone: '+251 935 401 131',
  phoneAlt: '+251 116 180 843',
  email: 'info@enderas.org',
  address: 'NB Business Center, 6th Floor, Office 605, Addis Ababa, Ethiopia',
  city: 'Addis Ababa',
  country: 'Ethiopia',
  poBox: '60215',
  hours: 'Mon–Fri, 8:30 AM – 5:30 PM EAT',
  footerDescription:
    'Enderas is a dedicated private limited company in Addis Ababa, delivering asset management, property appraisal and liquidation, investment advisory, and business consultancy tailored to your needs.',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=NB%20Business%20Center&t=m&z=15&output=embed&iwloc=near',
  mapDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=NB+Business+Center%2C+Addis+Ababa%2C+Ethiopia',
  mapCoordinates: { lat: 8.994, lng: 38.79 },
  seo: {
    defaultTitle: 'Enderas Asset Management',
    defaultDescription:
      'Enderas Asset Management in Addis Ababa, Ethiopia — asset management, property appraisal and liquidation, investment advisory, and business consultancy.',
    siteUrl: 'https://www.enderas.org',
    ogImage: 'https://enderas.org/wp-content/uploads/2023/07/Blue-600x.png',
  },
  social: [
    { name: 'LinkedIn', href: 'https://linkedin.com/company/enderas', icon: 'linkedin' },
    { name: 'Twitter', href: 'https://twitter.com/enderas', icon: 'twitter' },
    { name: 'Instagram', href: 'https://instagram.com/enderas', icon: 'instagram' },
  ],
}

/** Fixed contact page hero copy (layout-controlled, not CMS). */
export const CONTACT_PAGE_COPY = {
  eyebrow: 'Get in touch',
  title: 'Speak with an Enderas partner.',
  intro:
    'Our team is based in Addis Ababa, Ethiopia. Whether you need asset management, a property valuation, or investment advisory, we would welcome a confidential conversation.',
}
