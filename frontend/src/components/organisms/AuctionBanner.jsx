import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Badge from '@/components/atoms/Badge'
import { MotionDiv, MotionSection } from '@/components/motion'
import { useCountdown } from '@/hooks/useCountUp'
import { useContentStore } from '@/store/useContentStore'

export default function AuctionBanner() {
  const upcoming = useContentStore((s) => s.auctionHighlight)
  const t = useCountdown(upcoming.closeDate)
  const cells = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Minutes', value: t.minutes },
    { label: 'Seconds', value: t.seconds },
  ]

  return (
    <MotionSection
      className="relative overflow-hidden bg-primary-950 py-16 sm:py-20 lg:py-28"
      aria-labelledby="auction-banner-title"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A24B 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-primary-700/40 blur-3xl" />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="text-white lg:col-span-7">
            <MotionDiv className="flex flex-wrap items-center gap-3">
              <Badge variant="gold" className="!bg-gold-500/15 !text-gold-300 !ring-gold-400/30">
                <Icon name="gavel" className="h-3 w-3" /> Auction & Valuation
              </Badge>
              <span className="text-xs uppercase tracking-wider text-primary-200/60">Featured opportunity</span>
            </MotionDiv>
            <MotionDiv delay={0.05}>
              <h2
                id="auction-banner-title"
                className="mt-5 font-heading text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1]"
              >
                The next Enderas auction closes in
              </h2>
            </MotionDiv>
            <MotionDiv className="mt-6 grid max-w-md grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4" delay={0.1} aria-live="polite">
              {cells.map((c) => (
                <div
                  key={c.label}
                  className="glass-dark rounded-xl py-3 text-center sm:py-4"
                >
                  <div className="font-heading text-2xl font-semibold tabular-nums text-gold-400 sm:text-3xl lg:text-4xl">
                    {String(c.value).padStart(2, '0')}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-primary-200/60">{c.label}</div>
                </div>
              ))}
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-100/80 sm:mt-8 sm:text-base">
                <span className="font-semibold text-white">{upcoming.title}</span> — {upcoming.blurb}
              </p>
            </MotionDiv>
            <MotionDiv className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center" delay={0.2}>
              <Button to="/auctions" variant="primary" size="lg" icon="gavel" className="w-full sm:w-auto">
                View Assets for Sale
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="lg"
                className="w-full !border-white/40 !text-white hover:!border-gold-400 hover:!text-gold-300 sm:w-auto"
              >
                Request a Valuation
              </Button>
            </MotionDiv>
          </div>

          <MotionDiv className="lg:col-span-5" delay={0.1}>
            <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl bg-primary-900 shadow-2xl sm:max-h-none">
              <img src={upcoming.image} alt={upcoming.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <Badge variant="gold" className="!mb-3 !bg-gold-500/20 !text-gold-200 !ring-gold-400/40">
                  {upcoming.type}
                </Badge>
                <h3 className="mb-1.5 font-heading text-xl font-semibold leading-tight sm:text-2xl">{upcoming.title}</h3>
                <p className="flex items-center gap-1.5 text-sm text-primary-100/70">
                  <Icon name="mapPin" className="h-3.5 w-3.5" /> {upcoming.location}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-primary-200/60">Reserve</div>
                    <div className="font-heading text-xl text-gold-300">{upcoming.reserve}</div>
                  </div>
                  <Button
                    to="/auctions"
                    variant="ghost"
                    size="sm"
                    className="!text-white hover:!text-gold-300"
                    iconRight="arrowUpRight"
                  >
                    View listing
                  </Button>
                </div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Container>
    </MotionSection>
  )
}
