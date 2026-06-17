import { Helmet } from 'react-helmet-async'
import { useContentStore } from '@/store/useContentStore'

export default function SeoHead({
  title,
  description,
  image,
  type = 'website',
  jsonLd,
  noIndex = false,
}) {
  const settings = useContentStore((s) => s.settings)
  const seo = settings.seo
  const pageTitle = title ? `${title} | ${settings.appName}` : seo.defaultTitle
  const pageDescription = description || seo.defaultDescription
  const pageImage = image || seo.ogImage
  const canonical = `${seo.siteUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={settings.appName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
