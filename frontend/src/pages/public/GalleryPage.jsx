import { useMemo, useState } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import Lightbox from '@/components/organisms/Lightbox'
import EmptyState from '@/components/organisms/EmptyState'
import Container from '@/components/atoms/Container'
import Badge from '@/components/atoms/Badge'
import Icon from '@/components/atoms/Icon'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useContentStore } from '@/store/useContentStore'

export default function GalleryPage() {
  useScrollReveal()
  const gallery = useContentStore((s) => s.gallery)
  const [filter, setFilter] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const categories = useMemo(() => ['All', ...Array.from(new Set(gallery.map((g) => g.category)))], [gallery])
  const filtered = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter, gallery],
  )
  const openItem = openIndex !== null ? filtered[openIndex] : null
  const aspectMap = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[5/6]']

  const next = () => setOpenIndex((i) => (i + 1) % filtered.length)
  const prev = () => setOpenIndex((i) => (i - 1 + filtered.length) % filtered.length)

  return (
    <>
      <SeoHead
        title="Gallery"
        description="A selection of commercial, residential, industrial, retail and hospitality assets valued, managed and brokered by Enderas across North America."
        image={gallery[0]?.image}
      />
      <PageHero
        eyebrow="Selected engagements"
        title="Assets we value, manage and broker."
        intro="A cross-section of the properties and portfolios that have moved through our valuation, management and auction desks. Click any tile to expand."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="reveal mb-10 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setFilter(c)
                  setOpenIndex(null)
                }}
                aria-pressed={filter === c}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  filter === c
                    ? 'border-primary-900 bg-primary-900 text-white dark:border-primary-700 dark:bg-primary-700'
                    : 'border-primary-200 bg-white text-primary-800 hover:border-gold-400 hover:text-gold-600 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-100 dark:hover:text-gold-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon="search" title="No assets in this category" message="Try selecting a different category filter." />
          ) : (
            <div className="masonry">
              {filtered.map((item, i) => (
                <article
                  key={item.id}
                  className={`reveal group relative ${aspectMap[i % aspectMap.length]} cursor-pointer overflow-hidden rounded-xl bg-primary-900`}
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
                      {item.value && <span className="text-xs font-medium text-primary-100/70">{item.value}</span>}
                    </div>
                    <h3 className="font-heading text-lg font-semibold leading-tight">{item.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-primary-100/70">
                      <Icon name="mapPin" className="w-3.5 h-3.5" /> {item.location}
                    </p>
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
      <CTASection />
    </>
  )
}
