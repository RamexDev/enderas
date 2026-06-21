/**
 * @fileoverview HomePagePreview — visual preview of the public homepage.
 *
 * Layout mirrors the public frontend (hero, intro, auction banner, featured
 * services, featured gallery, stats, testimonials, FAQ, latest blog, CTA),
 * but every CMS-driven region is wrapped in <EditOverlay> so the user can
 * click to edit.
 *
 * Data comes from /public/home (the same payload the public site uses),
 * mapped through mapHomePageData so the shapes match exactly. Blog cards
 * come from /public/posts?limit=3.
 *
 * After the EditDrawer saves, the editor store bumps a reload token; this
 * page refetches on token change.
 */
import { useCallback, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import EditOverlay from '@/components/preview/EditOverlay'
import PreviewPage from '@/components/preview/PreviewPage'
import {
  Container,
  SectionHeading,
  ServiceCard,
  PropertyCard,
  StatCard,
  BlogCard,
  TestimonialCard,
  FaqItem,
  CtaBand,
} from '@/components/preview/PreviewAtoms'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useEditorStore } from '@/store/useEditorStore'
import { homepageApi, servicesApi, galleryApi, testimonialsApi, faqsApi, blogApi } from '@/services/cmsApi'
import { mapHomePageData, mapBlogPost, INTRO_PILLARS, INTRO_IMAGES } from '@/utils/mappers'
import { EDITABLE_SECTIONS } from '@/constants/editableSections'
import { cn } from '@/utils/cn'

const SECTIONS = EDITABLE_SECTIONS.home
const byId = (id) => SECTIONS.find((s) => s.id === id)

export default function HomePagePreview() {
  const pageKey = 'home'
  const reloadToken = useEditorStore((s) => s.getReloadToken(pageKey))

  const fetcher = useCallback(async () => {
    const [homePage, heroSlides, statistics, servicesResult, galleryResult, testimonialsResult, faqsResult, blogResult] = await Promise.all([
      homepageApi.get(),
      homepageApi.listHeroSlides(),
      homepageApi.listStatistics(),
      servicesApi.list({ limit: 100 }),
      galleryApi.list({ limit: 100 }),
      testimonialsApi.list({ limit: 100 }),
      faqsApi.list({ limit: 100 }),
      blogApi.list({ limit: 3 }),
    ])
    const payload = {
      homePage,
      heroSlides,
      statistics,
      services: servicesResult.data,
      galleryItems: galleryResult.data,
      teamMembers: [],
      testimonials: testimonialsResult.data,
      faqs: faqsResult.data,
    }
    return {
      home: mapHomePageData(payload),
      latestPosts: blogResult.data.map(mapBlogPost),
    }
  }, [])

  const { data, loading, refreshing, error, reload } = useAsyncData(fetcher, [reloadToken])

  // Look up section defs once so each EditOverlay gets a stable reference.
  const heroSlidesSection = useMemo(() => byId('hero-slides'), [])
  const introSection = useMemo(() => byId('homepage-intro'), [])
  const auctionSection = useMemo(() => byId('homepage-auction'), [])
  const statsSection = useMemo(() => byId('statistics'), [])
  const featuredServicesSection = useMemo(() => byId('featured-services'), [])
  const featuredGallerySection = useMemo(() => byId('featured-gallery'), [])
  const testimonialsSection = useMemo(() => byId('testimonials'), [])
  const faqsSection = useMemo(() => byId('faqs'), [])
  const visibilitySection = useMemo(() => byId('homepage-visibility'), [])
  const ctaSection = useMemo(() => byId('homepage-cta'), [])
  const seoSection = useMemo(() => byId('homepage-seo'), [])
  const blogPostsSection = useMemo(() => EDITABLE_SECTIONS.blog.find((s) => s.id === 'blog-posts'), [])

  return (
    <PreviewPage
      title="Home"
      subtitle="The public landing page — hero, intro, featured content, testimonials, FAQ, and CTA."
      livePath="/"
      loading={loading}
      refreshing={refreshing}
      error={error}
      onRetry={reload}
      reloadToken={reloadToken}
      onReloadTokenChange={reload}
    >
      {data && (
        <HomePageBody
          data={data}
          pageKey={pageKey}
          sections={{
            heroSlidesSection,
            introSection,
            auctionSection,
            statsSection,
            featuredServicesSection,
            featuredGallerySection,
            testimonialsSection,
            faqsSection,
            visibilitySection,
            ctaSection,
            seoSection,
            blogPostsSection,
          }}
        />
      )}
    </PreviewPage>
  )
}

function HomePageBody({ data, pageKey, sections }) {
  const openEdit = useEditorStore((s) => s.openEdit)
  const [activeSlide, setActiveSlide] = useState(0)
  const {
    slides,
    intro,
    auctionHighlight,
    featuredServicesTitle,
    featuredProjectsTitle,
    blogSectionTitle,
    testimonialsTitle,
    faqTitle,
    services,
    gallery,
    stats,
    testimonials,
    faqs,
    visibility,
    cta,
    homePage,
  } = data.home
  const latestPosts = data.latestPosts

  const prevSlide = () => setActiveSlide((i) => (i - 1 + slides.length) % slides.length)
  const nextSlide = () => setActiveSlide((i) => (i + 1) % slides.length)

  return (
    <div className="bg-sand-50 dark:bg-primary-950">
      {/* Hero slider — one overlay per slide so each is individually editable */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-primary-900 sm:h-[70vh] sm:min-h-[520px]">
        {slides.length === 0 ? (
          <EmptyHero />
        ) : (
          <>
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none',
                )}
              >
                <EditOverlay
                  section={sections.heroSlidesSection}
                  record={{ id: slide.id }}
                  pageKey={pageKey}
                  className="h-full"
                >
                  <HeroSlide slide={slide} />
                </EditOverlay>
              </div>
            ))}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-primary-950/50 p-2 text-white backdrop-blur-sm hover:bg-primary-950/70 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-primary-950/50 p-2 text-white backdrop-blur-sm hover:bg-primary-950/70 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveSlide(idx)}
                      className={cn(
                        'h-2 rounded-full transition-all',
                        idx === activeSlide
                          ? 'w-6 bg-gold-500'
                          : 'w-2 bg-white/50 hover:bg-white/80',
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      {/* Intro */}
      <section className="section-padding">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <EditOverlay section={sections.introSection} pageKey={pageKey} className="lg:col-span-6">
              <SectionHeading eyebrow={intro.eyebrow} title={intro.title} intro={intro.intro} />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {INTRO_PILLARS.map((f) => (
                  <div key={f.title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600 dark:text-gold-400">
                      <PillarIcon name={f.icon} />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-primary-900 dark:text-white">{f.title}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-primary-700/90 dark:text-primary-300">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              {intro.cta?.label && (
                <span className="mt-8 inline-flex items-center gap-2 rounded-lg border border-primary-300 px-5 py-2.5 text-sm font-medium text-primary-900 dark:border-primary-600 dark:text-primary-100">
                  {intro.cta.label}
                </span>
              )}
            </EditOverlay>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                    <img src={INTRO_IMAGES[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                    <img src={INTRO_IMAGES[1]} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-3 pt-6 sm:space-y-4 sm:pt-8">
                  <div className="aspect-square overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                    <img src={INTRO_IMAGES[2]} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                    <img src={INTRO_IMAGES[3]} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Auction banner */}
      <EditOverlay section={sections.auctionSection} pageKey={pageKey}>
        <AuctionBanner highlight={auctionHighlight} />
      </EditOverlay>

      {/* Featured services */}
      <section className="section-padding">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={featuredServicesTitle.eyebrow}
              title={featuredServicesTitle.title}
              intro={featuredServicesTitle.intro}
            />
          </div>
          {services.length === 0 ? (
            <EmptyBlock message="No active services. Add some in the Services page or activate existing ones." />
          ) : (
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((s) => (
                <EditOverlay
                  key={s.id}
                  section={sections.featuredServicesSection}
                  record={{ id: s.id }}
                  pageKey={pageKey}
                >
                  <ServiceCard service={s} />
                </EditOverlay>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Featured gallery */}
      <section className="border-y border-primary-100 bg-white py-16 sm:py-20 lg:py-28 dark:border-primary-800 dark:bg-primary-900">
        <Container>
          <SectionHeading
            eyebrow={featuredProjectsTitle.eyebrow}
            title={featuredProjectsTitle.title}
            intro={featuredProjectsTitle.intro}
          />
          {gallery.length === 0 ? (
            <EmptyBlock message="No gallery items yet." />
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {gallery.slice(0, 6).map((item) => (
                <EditOverlay
                  key={item.id}
                  section={sections.featuredGallerySection}
                  record={{ id: item.id }}
                  pageKey={pageKey}
                >
                  <PropertyCard item={item} />
                </EditOverlay>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <Container>
          {stats.length === 0 ? (
            <EmptyBlock message="No statistics yet." />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
              {stats.map((stat) => (
                <EditOverlay
                  key={stat.id}
                  section={sections.statsSection}
                  record={{ id: stat.id }}
                  pageKey={pageKey}
                >
                  <StatCard stat={stat} />
                </EditOverlay>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Testimonials (visible only when show_testimonials is on) */}
      {visibility.showTestimonials ? (
        <section className="section-padding bg-sand-100/60 dark:bg-primary-900/60">
          <Container>
            <div className="mb-8 flex items-center justify-between gap-4">
              <SectionHeading
                eyebrow={testimonialsTitle.eyebrow}
                title={testimonialsTitle.title}
                intro={testimonialsTitle.intro}
              />
              <button
                type="button"
                onClick={() => openEdit(sections.visibilitySection, null, pageKey)}
                className="rounded-md border border-primary-200 bg-white px-3 py-1.5 text-xs text-primary-500 hover:bg-primary-50 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-400 dark:hover:bg-primary-800"
              >
                Visibility settings
              </button>
            </div>
            {testimonials.length === 0 ? (
              <EmptyBlock message="No testimonials yet." />
            ) : (
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                  <EditOverlay
                    key={t.id}
                    section={sections.testimonialsSection}
                    record={{ id: t.id }}
                    pageKey={pageKey}
                  >
                    <TestimonialCard item={t} />
                  </EditOverlay>
                ))}
              </div>
            )}
          </Container>
        </section>
      ) : (
        <section className="section-padding">
          <Container>
            <button
              type="button"
              onClick={() => openEdit(sections.visibilitySection, null, pageKey)}
              className="w-full rounded-xl border border-dashed border-primary-200 bg-white px-5 py-4 text-center text-sm text-primary-500 hover:border-primary-300 hover:text-primary-700 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-400 dark:hover:border-primary-600 dark:hover:text-primary-200"
            >
              Testimonials section is currently hidden. Click to manage visibility.
            </button>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {visibility.showFaq ? (
        <section className="section-padding">
          <Container>
            <SectionHeading
              eyebrow={faqTitle.eyebrow}
              title={faqTitle.title}
              intro={faqTitle.intro}
              align="center"
            />
            <div className="mx-auto mt-8 max-w-3xl space-y-3">
              {faqs.length === 0 ? (
                <EmptyBlock message="No FAQ items yet." />
              ) : (
                faqs.map((item, idx) => (
                  <EditOverlay
                    key={item.id}
                    section={sections.faqsSection}
                    record={{ id: item.id }}
                    pageKey={pageKey}
                  >
                    <FaqItem item={item} defaultOpen={idx === 0} />
                  </EditOverlay>
                ))
              )}
            </div>
          </Container>
        </section>
      ) : (
        <section className="section-padding">
          <Container>
            <button
              type="button"
              onClick={() => openEdit(sections.visibilitySection, null, pageKey)}
              className="w-full rounded-xl border border-dashed border-primary-200 bg-white px-5 py-4 text-center text-sm text-primary-500 hover:border-primary-300 hover:text-primary-700 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-400 dark:hover:border-primary-600 dark:hover:text-primary-200"
            >
              FAQ section is currently hidden. Click to manage visibility.
            </button>
          </Container>
        </section>
      )}

      {/* Latest blog */}
      <section className="border-y border-primary-100 bg-white py-16 sm:py-20 lg:py-28 dark:border-primary-800 dark:bg-primary-900">
        <Container>
          <SectionHeading
            eyebrow={blogSectionTitle.eyebrow}
            title={blogSectionTitle.title}
            intro={blogSectionTitle.intro}
          />
          {latestPosts.length === 0 ? (
            <EmptyBlock message="No published posts yet." />
          ) : (
            <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((p) => (
                <EditOverlay
                  key={p.id}
                  section={sections.blogPostsSection}
                  record={{ id: p.id }}
                  pageKey={pageKey}
                >
                  <BlogCard post={p} />
                </EditOverlay>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <EditOverlay section={sections.ctaSection} pageKey={pageKey}>
        <CtaBand cta={cta} />
      </EditOverlay>

      {/* SEO — surfaced as a small footer chip so it's still editable from the page */}
      <Container className="py-6">
        <EditOverlay section={sections.seoSection} pageKey={pageKey}>
          <div className="flex items-center gap-2 rounded-lg border border-primary-100 bg-white px-4 py-2.5 text-xs text-primary-500 dark:border-primary-800 dark:bg-primary-900 dark:text-primary-400">
            <span className="font-medium text-primary-700 dark:text-primary-200">SEO:</span>
            <span className="truncate">{homePage?.meta_title || '— no meta title set —'}</span>
          </div>
        </EditOverlay>
      </Container>
    </div>
  )
}

function HeroSlide({ slide }) {
  return (
    <div className="h-full">
      <img
        src={slide.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950/85 via-primary-950/65 to-primary-900/45" />
      <Container className="relative flex h-full flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            {slide.eyebrow}
          </div>
          {slide.title && (
            <h1 className="font-heading text-[clamp(1.875rem,5vw,3.75rem)] font-semibold leading-[1.05] text-white">
              {slide.title}
            </h1>
          )}
          {slide.subtitle && (
            <p className="max-w-xl text-base leading-relaxed text-primary-100/85 sm:text-lg">
              {slide.subtitle}
            </p>
          )}
          {slide.cta?.label && (
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-primary-950">
                {slide.cta.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white">
                {slide.cta2?.label || 'Contact us'}
              </span>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

function EmptyHero() {
  return (
    <Container className="relative flex h-full flex-col items-center justify-center text-center text-primary-200 dark:text-primary-400">
      <p className="text-sm">No hero slides yet.</p>
      <p className="mt-1 text-xs text-primary-300 dark:text-primary-500">Click the 'Hero slides' button to add the first one.</p>
    </Container>
  )
}

function AuctionBanner({ highlight }) {
  return (
    <section className="relative overflow-hidden bg-primary-950 py-14 text-white lg:py-20">
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
              Featured opportunity
            </div>
            <h2 className="mt-4 font-heading text-[clamp(1.5rem,4vw,2.25rem)] font-semibold leading-tight">
              {highlight.title}
            </h2>
            {highlight.blurb && (
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-200/80">{highlight.blurb}</p>
            )}
            {highlight.cta?.label && (
              <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-primary-950">
                {highlight.cta.label}
              </span>
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              {highlight.image ? (
                <img src={highlight.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-primary-400">No image</div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function EmptyBlock({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-10 text-center text-sm text-primary-500 dark:border-primary-700 dark:bg-primary-900/50 dark:text-primary-400">
      {message}
    </div>
  )
}

function PillarIcon({ name }) {
  // Lightweight inline SVGs for the four pillar icons. Avoids pulling lucide
  // into the preview markup (keeps the public-site look without depending on
  // the frontend's icon registry).
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
          <path d="m6.34 6.34 2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" />
        </svg>
      )
    case 'user':
      return (
        <svg {...common}>
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    default:
      return null
  }
}
