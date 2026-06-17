import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import SeoHead from '@/components/organisms/SeoHead'
import HeroSlider from '@/components/organisms/HeroSlider'
import AuctionBanner from '@/components/organisms/AuctionBanner'
import { CTASection } from '@/components/organisms/CTASection'
import SectionHeading from '@/components/molecules/SectionHeading'
import { ServiceCard, PropertyCard, StatCard, BlogCard } from '@/components/molecules/Cards'
import Icon from '@/components/atoms/Icon'
import { MotionDiv, MotionSection, MotionStagger, MotionItem } from '@/components/motion'
import { useContentStore } from '@/store/useContentStore'

export default function HomePage() {
  const settings = useContentStore((s) => s.settings)
  const slides = useContentStore((s) => s.slides)
  const services = useContentStore((s) => s.services)
  const gallery = useContentStore((s) => s.gallery)
  const blog = useContentStore((s) => s.blog)
  const stats = useContentStore((s) => s.stats)
  const homepage = useContentStore((s) => s.homepage)

  const featuredServices = services.filter((s) => s.active !== false).slice(0, 3)
  const featuredProperties = gallery.slice(0, 6)
  const latestPosts = blog.filter((p) => p.status !== 'draft').slice(0, 3)

  const orgJsonLd = {
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

  return (
    <>
      <SeoHead
        description={settings.seo.defaultDescription}
        image={slides[0]?.image}
        jsonLd={orgJsonLd}
      />
      <HeroSlider />

      <MotionSection className="section-padding">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow={homepage.intro.eyebrow}
                title={homepage.intro.title}
                intro={homepage.intro.intro}
              />
              <MotionStagger className="mt-8 grid gap-5 sm:grid-cols-2">
                {homepage.intro.pillars.map((f) => (
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
                <Button to="/about" variant="outline" iconRight="arrowRight">
                  More about Enderas
                </Button>
              </MotionDiv>
            </div>
            <MotionDiv className="lg:col-span-6" delay={0.08}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={homepage.intro.images[0]} alt="Enderas office" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="aspect-square overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={homepage.intro.images[1]} alt="Valuation work" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                  <div className="space-y-3 pt-6 sm:space-y-4 sm:pt-8">
                    <div className="aspect-square overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={homepage.intro.images[2]} alt="Commercial property" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-primary-100 dark:bg-primary-800">
                      <img src={homepage.intro.images[3]} alt="Advisory" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-0 sm:-bottom-6 sm:-left-6 md:block">
                  <div className="glass rounded-2xl p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400 sm:h-12 sm:w-12">
                        <Icon name="chart" className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <div className="font-heading text-xl font-semibold text-primary-900 dark:text-white sm:text-2xl">
                          {homepage.intro.statHighlight.value}
                        </div>
                        <div className="text-xs text-primary-600 dark:text-primary-300">
                          {homepage.intro.statHighlight.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </Container>
      </MotionSection>

      <AuctionBanner />

      <MotionSection className="section-padding">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-6 lg:mb-12 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={homepage.featuredServicesTitle.eyebrow}
              title={homepage.featuredServicesTitle.title}
              intro={homepage.featuredServicesTitle.intro}
            />
            <MotionDiv className="shrink-0" delay={0.1}>
              <Button to="/services" variant="outline" iconRight="arrowRight">
                All services
              </Button>
            </MotionDiv>
          </div>
          <MotionStagger className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((s) => (
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
            eyebrow={homepage.featuredProjectsTitle.eyebrow}
            title={homepage.featuredProjectsTitle.title}
            intro={homepage.featuredProjectsTitle.intro}
          />
          <MotionStagger className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {featuredProperties.map((item) => (
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

      <MotionSection className="border-y border-primary-100/70 bg-white py-16 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow={homepage.blogSectionTitle.eyebrow}
            title={homepage.blogSectionTitle.title}
            intro={homepage.blogSectionTitle.intro}
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

      <CTASection />
    </>
  )
}
