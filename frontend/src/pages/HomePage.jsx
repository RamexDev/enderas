/**
 * @fileoverview Homepage — hero, intro, auction banner, featured content, stats, blog, FAQ, testimonials, CTA.
 * All business content is fetched from the CMS via homeService; optional sections respect visibility flags.
 */

import { useCallback } from 'react'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import SeoHead from '@/components/organisms/SeoHead'
import HeroSlider from '@/components/organisms/HeroSlider'
import AuctionBanner from '@/components/organisms/AuctionBanner'
import TestimonialsSection from '@/components/organisms/TestimonialsSection'
import FaqSection from '@/components/organisms/FaqSection'
import { CTASection } from '@/components/organisms/CTASection'
import SectionHeading from '@/components/molecules/SectionHeading'
import { ServiceCard, PropertyCard, StatCard, BlogCard, TeamCard } from '@/components/molecules/Cards'
import Icon from '@/components/atoms/Icon'
import { PageLoader } from '@/components/atoms/Loader'
import EmptyState from '@/components/organisms/EmptyState'
import { MotionDiv, MotionSection, MotionStagger, MotionItem } from '@/components/motion'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getHomePage } from '@/services/homeService'
import { getBlogPosts } from '@/services/blogService'
import { useSiteStore } from '@/store/useSiteStore'

/**
 * Landing page with CMS-driven sections. FAQ and testimonials render only when enabled in the CMS.
 */
export default function HomePage() {
  const settings = useSiteStore((s) => s.settings)

  const fetchHome = useCallback(async () => {
    const [home, blogResult] = await Promise.all([
      getHomePage(),
      getBlogPosts({ limit: 3 }),
    ])
    return { ...home, latestPosts: blogResult.data }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetchHome)

  if (loading) return <PageLoader />
  if (error || !data) {
    return (
      <Container className="section-padding">
        <EmptyState icon="info" title="Unable to load homepage" message={error || 'Please try again.'} action={<Button onClick={reload}>Retry</Button>} />
      </Container>
    )
  }

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
    latestPosts,
    team,
    testimonials,
    faqs,
    visibility,
    cta,
    seo,
  } = data

  const orgJsonLd = settings
    ? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: settings.appName,
        url: settings.seo.siteUrl,
        logo: settings.seo.ogImage,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: settings.phone,
          contactType: 'customer service',
          email: settings.email,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.address,
        },
      }
    : undefined

  return (
    <>
      <SeoHead
        title={seo?.title}
        description={seo?.description || settings?.seo?.defaultDescription}
        image={slides[0]?.image}
        jsonLd={orgJsonLd}
      />
      <HeroSlider slides={slides} />

      <MotionSection className="section-padding">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading eyebrow={intro.eyebrow} title={intro.title} intro={intro.intro} />
              <MotionStagger className="mt-8 grid gap-5 sm:grid-cols-2">
                {intro.pillars.map((f) => (
                  <MotionItem key={f.title}>
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600 dark:text-gold-400">
                        <Icon name={f.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-primary-900 dark:text-white">{f.title}</h3>
                        <p className="mt-0.5 text-xs leading-relaxed text-primary-700/70 dark:text-primary-200/60">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </MotionItem>
                ))}
              </MotionStagger>
              <MotionDiv className="mt-8" delay={0.15}>
                <Button to={intro.cta.to} variant="outline" iconRight="arrowRight">
                  {intro.cta.label}
                </Button>
              </MotionDiv>
            </div>
            <MotionDiv className="lg:col-span-6" delay={0.08}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={intro.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="aspect-square overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={intro.images[1]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className="space-y-3 pt-6 sm:space-y-4 sm:pt-8">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={intro.images[2]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={intro.images[3]} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>
                {intro.statHighlight?.value && (
                  <div className="relative mt-4 sm:absolute sm:-bottom-6 sm:left-0 sm:right-auto sm:mt-0 lg:-left-6">
                    <div className="glass rounded-2xl p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 sm:h-12 sm:w-12">
                          <Icon name="chart" className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <div>
                          <div className="font-heading text-xl font-semibold text-primary-900 dark:text-white sm:text-2xl">
                            {intro.statHighlight.value}
                          </div>
                          <div className="text-xs text-primary-600 dark:text-primary-300">
                            {intro.statHighlight.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </MotionDiv>
          </div>
        </Container>
      </MotionSection>

      <AuctionBanner highlight={auctionHighlight} />

      <MotionSection className="section-padding">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={featuredServicesTitle.eyebrow}
              title={featuredServicesTitle.title}
              intro={featuredServicesTitle.intro}
            />
            <MotionDiv className="shrink-0" delay={0.1}>
              <Button to="/services" variant="outline" iconRight="arrowRight">
                All services
              </Button>
            </MotionDiv>
          </div>
          <MotionStagger className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s) => (
              <MotionItem key={s.id}>
                <ServiceCard service={s} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </MotionSection>

      <MotionSection className="border-y border-primary-100/70 bg-white py-16 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow={featuredProjectsTitle.eyebrow}
            title={featuredProjectsTitle.title}
            intro={featuredProjectsTitle.intro}
          />
          <MotionStagger className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {gallery.slice(0, 6).map((item) => (
              <MotionItem key={item.id}>
                <PropertyCard item={item} onOpen={() => {}} />
              </MotionItem>
            ))}
          </MotionStagger>
          <MotionDiv className="mt-10 text-center" delay={0.1}>
            <Button to="/gallery" variant="outline" iconRight="arrowRight">
              View full gallery
            </Button>
          </MotionDiv>
        </Container>
      </MotionSection>

      <MotionSection className="section-padding">
        <Container>
          <MotionStagger className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <MotionItem key={stat.id}>
                <StatCard stat={stat} />
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </MotionSection>

      {/* {visibility.showTeam && team.length > 0 && (
        <MotionSection className="border-y border-primary-100/70 bg-white py-16 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-20 lg:py-28">
          <Container>
            <SectionHeading eyebrow="Leadership" title="Meet our team." align="center" />
            <MotionStagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, i) => (
                <MotionItem key={member.id}>
                  <TeamCard member={member} index={i} />
                </MotionItem>
              ))}
            </MotionStagger>
          </Container>
        </MotionSection>
      )} */}

      {visibility.showTestimonials && (
        <TestimonialsSection title={testimonialsTitle} items={testimonials} />
      )}

      {visibility.showFaq && <FaqSection title={faqTitle} items={faqs} />}

      <MotionSection className="border-y border-primary-100/70 bg-white py-16 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow={blogSectionTitle.eyebrow}
            title={blogSectionTitle.title}
            intro={blogSectionTitle.intro}
          />
          <MotionStagger className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((p) => (
              <MotionItem key={p.id}>
                <BlogCard post={p} />
              </MotionItem>
            ))}
          </MotionStagger>
          <MotionDiv className="mt-10 text-center" delay={0.1}>
            <Button to="/blog" variant="outline" iconRight="arrowRight">
              All insights
            </Button>
          </MotionDiv>
        </Container>
      </MotionSection>

      <CTASection cta={cta} />
    </>
  )
}
