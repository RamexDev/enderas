import { useMemo, useState } from 'react'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import SeoHead from '@/components/organisms/SeoHead'
import { CTASection, PageHero } from '@/components/organisms/CTASection'
import SectionHeading from '@/components/molecules/SectionHeading'
import { AuctionAssetCard } from '@/components/molecules/Cards'
import { MotionDiv, MotionSection, MotionStagger, MotionItem } from '@/components/motion'
import { useContentStore } from '@/store/useContentStore'

const FILTERS = ['All', 'Live', 'Upcoming', 'Closed']

export default function AuctionsPage() {
  const auctionsPage = useContentStore((s) => s.auctionsPage)
  const assets = useContentStore((s) => s.auctionAssets)
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    if (filter === 'All') return assets
    return assets.filter((a) => a.status === filter)
  }, [assets, filter])

  const liveCount = assets.filter((a) => a.status === 'Live').length

  return (
    <>
      <SeoHead
        title="Assets for Sale"
        description={auctionsPage.heroIntro}
        image={auctionsPage.heroImage}
      />
      <PageHero
        eyebrow={auctionsPage.heroEyebrow}
        title={auctionsPage.heroTitle}
        intro={auctionsPage.heroIntro}
        image={auctionsPage.heroImage}
      />

      <MotionSection className="section-padding">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Current listings"
              title={`${liveCount} live opportunit${liveCount === 1 ? 'y' : 'ies'} on the desk.`}
              intro="Filter by status or browse the full pipeline. Each asset is marketed to our qualified buyer network."
            />
            <MotionDiv className="flex flex-wrap gap-2" delay={0.1}>
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filter === f
                      ? 'bg-gold-500 text-primary-950 shadow-md shadow-gold-500/20'
                      : 'border border-primary-200/80 bg-white text-primary-800 hover:border-gold-400 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </MotionDiv>
          </div>

          <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((asset) => (
              <MotionItem key={asset.id}>
                <AuctionAssetCard asset={asset} />
              </MotionItem>
            ))}
          </MotionStagger>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-primary-200 bg-white/60 p-10 text-center dark:border-primary-700 dark:bg-primary-900/40">
              <Icon name="gavel" className="mx-auto mb-3 h-8 w-8 text-gold-500" />
              <p className="text-primary-700 dark:text-primary-200">No listings match this filter.</p>
            </div>
          )}

          <MotionDiv
            className="glass mt-12 rounded-2xl p-6 sm:p-8"
            delay={0.15}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                <Icon name="info" className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-primary-900 dark:text-white">
                  How Enderas auctions work
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-700/85 dark:text-primary-200/75">
                  {auctionsPage.disclaimer}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button to="/contact" variant="primary" icon="gavel">
                    Register interest
                  </Button>
                  <Button to="/services#auctions" variant="outline" iconRight="arrowRight">
                    Auction services
                  </Button>
                </div>
              </div>
            </div>
          </MotionDiv>
        </Container>
      </MotionSection>

      <section className="border-y border-primary-100/70 bg-white py-14 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-16 lg:py-20">
        <Container>
          <MotionStagger className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: 'scale',
                title: 'Independent valuation',
                body: 'Every reserve is anchored by a USPAP-compliant appraisal from our in-house desk.',
              },
              {
                icon: 'users',
                title: 'Qualified buyers',
                body: 'We market to pre-vetted institutional and private capital with proof-of-funds requirements.',
              },
              {
                icon: 'shield',
                title: 'Transparent process',
                body: 'Clear timelines, documented due diligence and dedicated auction counsel throughout.',
              },
            ].map((item) => (
              <MotionItem key={item.title}>
                <article className="glass h-full rounded-2xl p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-primary-900 dark:text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">{item.body}</p>
                </article>
              </MotionItem>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
