/**
 * @fileoverview About page — history, mission, vision, values, team, partners.
 */

import { useCallback } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import SectionHeading from '@/components/molecules/SectionHeading'
import { TeamCard } from '@/components/molecules/Cards'
import Icon from '@/components/atoms/Icon'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import { CardSkeleton, TextSkeleton, Skeleton, GoldSpinner } from '@/components/atoms/Loader'
import { MotionDiv, MotionSection, MotionStagger, MotionItem } from '@/components/motion'
import EmptyState from '@/components/organisms/EmptyState'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getAboutPage } from '@/services/aboutService'

/**
 * Company overview with CMS-driven copy, team, and CTA.
 */
export default function AboutPage() {
  const fetchAbout = useCallback(async () => {
    return getAboutPage()
  }, [])

  const { data: about, loading, error, reload } = useAsyncData(fetchAbout)

  if (loading) return (
    <div>
      <div className="relative overflow-hidden bg-primary-900 pb-12 pt-24 text-white sm:pb-14 sm:pt-28 lg:pb-20 lg:pt-36">
        <Skeleton className="absolute inset-0 !rounded-none !bg-primary-800" />
        <Container className="relative">
          <GoldSpinner className="mb-6" />
          <div className="max-w-3xl space-y-4">
            <Skeleton gold className="h-5 w-32" />
            <Skeleton gold className="h-12 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Container>
      </div>
      <div className="section-padding">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-5 lg:col-span-7">
              <Skeleton className="h-6 w-24" />
              <TextSkeleton lines={5} />
            </div>
            <div className="space-y-4 lg:col-span-5">
              <CardSkeleton gold className="h-56" />
              <CardSkeleton className="h-56 !bg-primary-900" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
  if (error || !about) {
    return (
      <Container className="section-padding">
        <EmptyState icon="info" title="Unable to load about page" message={error} action={<Button onClick={reload}>Retry</Button>} />
      </Container>
    )
  }

  return (
    <>
      <SeoHead title={about.seo?.title || 'About'} description={about.seo?.description} image={about.heroImage} />
      <PageHero eyebrow={about.heroEyebrow} title={about.heroTitle} intro={about.heroIntro} image={about.heroImage} />

      <MotionSection className="section-padding">
        <Container>
          <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-7">
              <SectionHeading eyebrow="History" title="Our story." />
              <MotionDiv delay={0.05} className="mt-6 space-y-5 text-base leading-relaxed text-primary-800/90 dark:text-primary-200/85">
                <p>{about.history}</p>
                {about.historyExtended && <p>{about.historyExtended}</p>}
              </MotionDiv>
            </div>
            <div className="space-y-4 sm:space-y-6 lg:col-span-5">
              <MotionDiv delay={0.05} className="rounded-2xl border border-primary-100/80 bg-white p-5 dark:border-primary-800 dark:bg-primary-900 sm:p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                  <Icon name="sparkles" className="w-5 h-5" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-primary-900 dark:text-white">Mission</h3>
                <p className="text-sm leading-relaxed text-primary-700/95 dark:text-primary-200/85">{about.mission}</p>
              </MotionDiv>
              <MotionDiv delay={0.1} className="rounded-2xl bg-primary-900 p-5 text-white dark:bg-primary-800 sm:p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/20 text-gold-300">
                  <Icon name="eye" className="w-5 h-5" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold">Vision</h3>
                <p className="text-sm leading-relaxed text-primary-100/90">{about.vision}</p>
              </MotionDiv>
            </div>
          </div>
        </Container>
      </MotionSection>

      <MotionSection className="border-y border-primary-100/70 bg-white py-14 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Core values that shape every engagement." align="center" />
          <MotionStagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <MotionItem
                key={v.id}
                className="group rounded-2xl border border-primary-100/70 bg-sand-50 p-5 transition-all duration-300 hover:border-gold-300 dark:border-primary-800 dark:bg-primary-900 dark:hover:border-gold-700 sm:p-7"
              >
                <div className="mb-3 font-heading text-4xl font-semibold tabular-nums text-gold-500/30 sm:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-primary-900 dark:text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-primary-700/95 dark:text-primary-200/85">{v.body}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </MotionSection>

      {about.team.length > 0 && (
        <MotionSection className="section-padding">
          <Container>
            <SectionHeading
              eyebrow="Leadership"
              title="The team behind the practice."
              intro="Experienced professionals dedicated to delivering exceptional asset management and advisory services."
            />
            <MotionStagger className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {about.team.map((m, i) => (
                <MotionItem key={m.id}>
                  <TeamCard member={m} index={i} />
                </MotionItem>
              ))}
            </MotionStagger>
          </Container>
        </MotionSection>
      )}

      {about.partners.length > 0 && (
        <MotionSection className="bg-primary-950 py-16 text-white lg:py-20">
          <Container>
            <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
              Trusted partners
            </p>
            <div className="relative overflow-hidden">
              <div className="flex w-max animate-marquee gap-16">
                {[...about.partners, ...about.partners].map((p, i) => (
                  <div
                    key={`${p.name}-${i}`}
                    className="flex h-16 w-40 shrink-0 items-center justify-center"
                  >
                    {p.logo ? (
                      <img
                        src={p.logo}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="whitespace-nowrap font-heading text-2xl font-semibold text-primary-200/50">
                        {p.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </MotionSection>
      )}

      <CTASection cta={about.cta} />
    </>
  )
}
