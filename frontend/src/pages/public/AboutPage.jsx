import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import SectionHeading from '@/components/molecules/SectionHeading'
import { TeamCard } from '@/components/molecules/Cards'
import Icon from '@/components/atoms/Icon'
import Container from '@/components/atoms/Container'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useContentStore } from '@/store/useContentStore'

export default function AboutPage() {
  useScrollReveal()
  const about = useContentStore((s) => s.about)

  return (
    <>
      <SeoHead
        title="About"
        description="Founded in 1998, Enderas is a privately held asset management firm serving institutional and private capital across North America."
        image={about.heroImage}
      />
      <PageHero
        eyebrow={about.heroEyebrow}
        title={about.heroTitle}
        intro={about.heroIntro}
        image={about.heroImage}
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="History" title="Twenty-seven years of independent counsel." />
              <div className="reveal reveal-delay-1 mt-6 space-y-5 text-base leading-relaxed text-primary-800/80 dark:text-primary-200/75">
                <p>{about.history}</p>
                <p>{about.historyExtended}</p>
              </div>
            </div>
            <div className="space-y-6 lg:col-span-5">
              <div className="reveal reveal-delay-1 rounded-2xl border border-primary-100/80 bg-white p-7 dark:border-primary-800 dark:bg-primary-900">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                  <Icon name="sparkles" className="w-5 h-5" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-primary-900 dark:text-white">Mission</h3>
                <p className="text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">{about.mission}</p>
              </div>
              <div className="reveal reveal-delay-2 rounded-2xl bg-primary-900 p-7 text-white dark:bg-primary-800">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/20 text-gold-300">
                  <Icon name="eye" className="w-5 h-5" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold">Vision</h3>
                <p className="text-sm leading-relaxed text-primary-100/80">{about.vision}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-primary-100/70 bg-white py-20 dark:border-primary-800/70 dark:bg-primary-900/40 lg:py-28">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Four values that shape every engagement." align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <div
                key={v.id}
                className="reveal group rounded-2xl border border-primary-100/70 bg-sand-50 p-7 transition-colors hover:border-gold-300 dark:border-primary-800 dark:bg-primary-900 dark:hover:border-gold-700"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div className="mb-3 font-heading text-5xl font-semibold tabular-nums text-gold-500/30">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-primary-900 dark:text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The partners behind the practice."
            intro="Our partners average more than two decades of institutional real-asset experience and have led Enderas through every cycle since founding."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.map((m, i) => (
              <TeamCard key={m.id} member={m} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary-950 py-16 text-white lg:py-20">
        <Container>
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            Trusted by institutional capital
          </p>
          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-12">
              {[...about.partners, ...about.partners].map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="whitespace-nowrap font-heading text-2xl font-semibold text-primary-200/50 lg:text-3xl"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
