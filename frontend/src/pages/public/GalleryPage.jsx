/**
 * @fileoverview Gallery page with category filtering and lightbox preview.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import Lightbox from '@/components/organisms/Lightbox'
import EmptyState from '@/components/organisms/EmptyState'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Icon from '@/components/atoms/Icon'
import { PageLoader } from '@/components/atoms/Loader'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getGalleryItems } from '@/services/galleryService'
import { getHomePage } from '@/services/homeService'

const ALL_FILTER = 'All'
const ASPECT_CLASSES = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[5/6]']

/**
 * @param {Array<{ category?: string }>} items
 * @returns {string[]}
 */
function buildCategoryFilters(items) {
  const unique = [...new Set(items.map((item) => item.category).filter(Boolean))]
  unique.sort((a, b) => a.localeCompare(b))
  return [ALL_FILTER, ...unique]
}

/**
 * @param {Array} items
 * @param {string} activeFilter
 * @returns {Array}
 */
function filterGalleryItems(items, activeFilter) {
  if (activeFilter === ALL_FILTER) return items
  return items.filter((item) => item.category === activeFilter)
}

/**
 * Masonry gallery grid with category filters and expandable lightbox.
 */
export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER)
  const [openIndex, setOpenIndex] = useState(null)

  const fetchGallery = useCallback(async () => {
    const [galleryResult, home] = await Promise.all([
      getGalleryItems({ limit: 100 }),
      getHomePage(),
    ])
    return { gallery: galleryResult.data, cta: home.cta }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetchGallery)

  const galleryItems = data?.gallery ?? []
  const categories = useMemo(() => buildCategoryFilters(galleryItems), [galleryItems])
  const filteredItems = useMemo(
    () => filterGalleryItems(galleryItems, activeFilter),
    [activeFilter, galleryItems],
  )

  useEffect(() => {
    if (activeFilter !== ALL_FILTER && !categories.includes(activeFilter)) {
      setActiveFilter(ALL_FILTER)
      setOpenIndex(null)
    }
  }, [activeFilter, categories])

  useScrollReveal([data, activeFilter, filteredItems.length])

  const openItem = openIndex !== null ? filteredItems[openIndex] : null

  const selectFilter = (category) => {
    setActiveFilter(category)
    setOpenIndex(null)
  }

  const next = () => setOpenIndex((i) => (i + 1) % filteredItems.length)
  const prev = () => setOpenIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length)

  if (loading) return <PageLoader />
  if (error || !data) {
    return (
      <Container className="section-padding">
        <EmptyState icon="info" title="Unable to load gallery" message={error} action={<Button onClick={reload}>Retry</Button>} />
      </Container>
    )
  }

  return (
    <>
      <SeoHead
        title="Gallery"
        description="A selection of commercial, residential, and institutional assets valued and managed by Enderas."
        image={galleryItems[0]?.image}
      />
      <PageHero
        eyebrow="Selected engagements"
        title="Assets we value, manage and broker."
        intro="A cross-section of the properties and portfolios that have moved through our valuation, management and auction desks. Click any tile to expand."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="reveal mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectFilter(category)}
                aria-pressed={activeFilter === category}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === category
                    ? 'border-primary-900 bg-primary-900 text-white dark:border-primary-700 dark:bg-primary-700'
                    : 'border-primary-200 bg-white text-primary-800 hover:border-gold-400 hover:text-gold-600 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-100 dark:hover:text-gold-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredItems.length === 0 ? (
            <EmptyState icon="search" title="No assets in this category" message="Try selecting a different category filter." />
          ) : (
            <div className="masonry" key={activeFilter}>
              {filteredItems.map((item, i) => (
                <article
                  key={item.id}
                  className={`reveal group relative ${ASPECT_CLASSES[i % ASPECT_CLASSES.length]} cursor-pointer overflow-hidden rounded-xl bg-primary-900`}
                  style={{ transitionDelay: `${(i % 6) * 50}ms` }}
                  onClick={() => setOpenIndex(i)}
                  onKeyDown={(e) => e.key === 'Enter' && setOpenIndex(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/20 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="mb-1.5 flex items-center gap-2">
                      <Badge variant="gold" className="!bg-gold-500/20 !text-gold-200 !ring-gold-400/30">
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="font-heading text-lg font-semibold leading-tight">{item.title}</h3>
                    {item.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-primary-100/70">
                        <Icon name="mapPin" className="w-3.5 h-3.5" /> {item.location}
                      </p>
                    )}
                  </div>
                  <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-primary-900 opacity-0 transition-opacity group-hover:opacity-100">
                    <Icon name="eye" className="w-4 h-4" />
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      {openItem && <Lightbox item={openItem} onClose={() => setOpenIndex(null)} onPrev={prev} onNext={next} />}
      <CTASection cta={data.cta} />
    </>
  )
}
