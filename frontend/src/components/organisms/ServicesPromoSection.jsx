/**
 * @fileoverview Auction & valuation promo block on the services page.
 */

import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Icon from '@/components/atoms/Icon'

/**
 * @param {object} props
 * @param {object} props.promo
 */
export default function ServicesPromoSection({ promo }) {
  return (
    <section id="auctions" className="scroll-mt-28 bg-primary-950 py-20 text-white lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="gold" className="!mb-4 !bg-gold-500/15 !text-gold-300 !ring-gold-400/30">
              <Icon name="scale" className="h-3 w-3" /> {promo.eyebrow}
            </Badge>
            <h2 className="font-heading text-3xl font-semibold leading-tight lg:text-4xl">{promo.title}</h2>
            <p className="mt-4 leading-relaxed text-primary-100/80">{promo.body}</p>
            <ul className="mb-8 mt-6 space-y-2.5">
              {promo.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-primary-100/90">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                    <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {feature}
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
  )
}
