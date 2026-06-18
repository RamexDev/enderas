/**
 * @fileoverview Gallery page with category filtering and lightbox preview.
 */

import { useCallback, useMemo, useState } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import Lightbox from '@/components/organisms/Lightbox'
import EmptyState from '@/components/organisms/EmptyState'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Icon from '@/components/atoms/Icon'
import { motion, AnimatePresence } from 'framer-motion'
import { CardSkeleton, Skeleton, GoldSpinner } from '@/components/atoms/Loader'
import { MotionDiv } from '@/components/motion'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getGalleryItems } from '@/services/galleryService'
import { ctaApi } from '@/services/publicApi'
import { mapCtaData } from '@/utils/mappers'

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
  const [filterIntent, setFilterIntent] = useState(ALL_FILTER)
  const [openIndex, setOpenIndex] = useState(null)

  const fetchGallery = useCallback(async () => {
    const [galleryResult, cta] = await Promise.all([
      getGalleryItems({ limit: 100 }),
      ctaApi.get(),
    ])
    return { gallery: galleryResult.data, cta: mapCtaData(cta) }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetchGallery)

  const galleryItems = data?.gallery ?? []
  const categories = useMemo(() => buildCategoryFilters(galleryItems), [galleryItems])
  const activeFilter = categories.includes(filterIntent) ? filterIntent : ALL_FILTER
  const filteredItems = useMemo(
    () => filterGalleryItems(galleryItems, activeFilter),
    [activeFilter, galleryItems],
  )

  const openItem = openIndex !== null ? filteredItems[openIndex] : null

  const selectFilter = (category) => {
    setFilterIntent(category)
    setOpenIndex(null)
  }

  const next = () => setOpenIndex((i) => (i + 1) % filteredItems.length)
  const prev = () => setOpenIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length)

  if (loading) return (
    <div>
      <div className="relative overflow-hidden bg-primary-900 pb-12 pt-24 text-white sm:pb-14 sm:pt-28 lg:pb-20 lg:pt-36">
        <Skeleton className="absolute inset-0 !rounded-none !bg-primary-800" />
        <Container className="relative">
          <GoldSpinner className="mb-6" />
          <div className="max-w-3xl space-y-4">
            <Skeleton gold className="h-5 w-24" />
            <Skeleton gold className="h-12 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Container>
      </div>
      <div className="section-padding">
        <Container>
          <div className="mb-8 flex gap-2">
            {[1,2,3,4].map(i => (
              <CardSkeleton key={i} className="h-10 w-20 rounded-full" />
            ))}
          </div>
          <div className="masonry">
            {[1,2,3,4,5,6].map(i => (
              <CardSkeleton key={i} className="aspect-[4/5] rounded-xl" />
            ))}
          </div>
        </Container>
      </div>
    </div>
  )
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

      <section className="py-14 sm:py-16 lg:py-24">
        <Container>
          <MotionDiv
            className="no-scrollbar -mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1 sm:mb-10 sm:flex-wrap sm:overflow-visible"
            role="group"
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => selectFilter(category)}
                aria-pressed={activeFilter === category}
                className={`shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${
                  activeFilter === category
                    ? 'border-primary-900 bg-primary-900 text-white dark:border-primary-700 dark:bg-primary-700'
                    : 'border-primary-200 bg-white text-primary-800 hover:border-gold-400 hover:text-gold-600 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-100 dark:hover:text-gold-400'
                }`}
              >
                {category}
              </button>
            ))}
          </MotionDiv>

          {filteredItems.length === 0 ? (
            <EmptyState icon="search" title="No assets in this category" message="Try selecting a different category filter." />
          ) : (
            <div className="masonry">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <article
                      className={`group relative ${ASPECT_CLASSES[i % ASPECT_CLASSES.length]} cursor-pointer overflow-hidden rounded-xl bg-primary-900`}
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
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/20 to-transparent opacity-90" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                        <div className="mb-1.5 flex items-center gap-2">
                          <Badge variant="gold" className="!bg-gold-500/20 !text-gold-200 !ring-gold-400/30">
                            {item.category}
                          </Badge>
                        </div>
                        <h3 className="font-heading text-base font-semibold leading-tight sm:text-lg">{item.title}</h3>
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </Container>
      </section>

      {openItem && <Lightbox item={openItem} onClose={() => setOpenIndex(null)} onPrev={prev} onNext={next} />}
      <CTASection cta={data.cta} />
    </>
  )
}
