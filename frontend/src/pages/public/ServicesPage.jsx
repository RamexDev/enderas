import { useState } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Icon from '@/components/atoms/Icon'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useContentStore } from '@/store/useContentStore'

export default function ServicesPage() {
  useScrollReveal()
  const services = useContentStore((s) => s.services).filter((s) => s.active !== false)
  const promo = useContentStore((s) => s.servicesPromo)
  const [active, setActive] = useState(services[0]?.id)
  const current = services.find((s) => s.id === active) || services[0]

  return (
    <>
      <SeoHead
        title="Services"
        description="Independent property valuation, asset auctions, property management, investment advisory, business consultancy and construction consulting."
      />
      <PageHero
        eyebrow="Our services"
        title="One platform. The full real-asset lifecycle."
        intro="Enderas covers valuation, monetization, operational stewardship, advisory, research and diligence — so owners, lenders and allocators can work with a single trusted counterparty across every stage."
      />

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <aside className="lg:col-span-4">
              <div className="space-y-2 lg:sticky lg:top-28">
                {services.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(s.id)}
                    className={`reveal flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                      active === s.id
                        ? 'border-primary-900 bg-primary-900 text-white shadow-md dark:border-primary-700 dark:bg-primary-800'
                        : 'border-primary-100 bg-white text-primary-900 hover:border-gold-300 dark:border-primary-800 dark:bg-primary-900 dark:text-white dark:hover:border-gold-700'
                    }`}
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        active === s.id
                          ? 'bg-gold-500 text-primary-950'
                          : 'bg-gold-500/15 text-gold-600 dark:text-gold-400'
                      }`}
                    >
                      <Icon name={s.icon} className="w-5 h-5" />
                    </span>
                    <span>
                      <span className="block font-heading text-base font-semibold">{s.title}</span>
                      <span
                        className={`mt-0.5 block text-xs ${active === s.id ? 'text-primary-100/70' : 'text-primary-600/70 dark:text-primary-300/60'}`}
                      >
                        {s.excerpt}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {current && (
              <div className="lg:col-span-8">
                <div
                  key={current.id}
                  className="overflow-hidden rounded-3xl border border-primary-100/80 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-900"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-primary-100 dark:bg-primary-800">
                    <img src={current.image} alt={current.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500 text-primary-950 shadow-md">
                        <Icon name={current.icon} className="w-6 h-6" />
                      </span>
                      <Badge variant="gold" className="!bg-white/95 !text-gold-700 !ring-white/40">
                        Service
                      </Badge>
                    </div>
                  </div>
                  <div className="p-7 lg:p-10">
                    <h2 className="mb-3 font-heading text-3xl font-semibold text-primary-900 dark:text-white">
                      {current.title}
                    </h2>
                    <p className="text-base leading-relaxed text-primary-700/80 dark:text-primary-200/70">
                      {current.description}
                    </p>
                    <div className="mt-8">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
                        What&apos;s included
                      </h3>
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {current.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-primary-800 dark:text-primary-100">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                              <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.5} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-3">
                      <Button to="/contact" variant="primary" iconRight="arrowRight">
                        Engage Enderas
                      </Button>
                      <Button to="/services#auctions" variant="outline">
                        Auction & valuation services
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section id="auctions" className="scroll-mt-28 bg-primary-950 py-20 text-white lg:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge variant="gold" className="!mb-4 !bg-gold-500/15 !text-gold-300 !ring-gold-400/30">
                <Icon name="scale" className="w-3 h-3" /> {promo.eyebrow}
              </Badge>
              <h2 className="font-heading text-3xl font-semibold leading-tight lg:text-4xl">{promo.title}</h2>
              <p className="mt-4 leading-relaxed text-primary-100/80">{promo.body}</p>
              <ul className="mb-8 mt-6 space-y-2.5">
                {promo.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-primary-100/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                      <Icon name="check" className="w-3 h-3" strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button to="/contact" variant="primary" size="lg" iconRight="arrowRight">
                Request a valuation
              </Button>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <img src={promo.image} alt="Property valuation" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  )
}
