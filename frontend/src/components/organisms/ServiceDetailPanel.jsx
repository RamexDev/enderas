/**
 * @fileoverview Active service detail panel for the services page.
 */

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

/**
 * @param {object} props
 * @param {object} props.service
 */
export default function ServiceDetailPanel({ service }) {
  if (!service) return null

  return (
    <div className="lg:col-span-8">
      <article className="reveal overflow-hidden rounded-2xl border border-primary-100/80 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-900">
        <div className="aspect-[21/9] overflow-hidden bg-primary-100 dark:bg-primary-800">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-7 lg:p-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 dark:text-gold-400">
            <Icon name={service.icon} className="h-6 w-6" />
          </div>
          <h2 className="font-heading text-2xl font-semibold text-primary-900 dark:text-white lg:text-3xl">
            {service.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-primary-800/80 dark:text-primary-200/75">
            {service.description}
          </p>
          {service.features?.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-primary-800 dark:text-primary-100">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/contact" variant="primary" iconRight="arrowRight">
              Engage Enderas
            </Button>
            <Button to="/services#auctions" variant="outline">
              Auction & valuation services
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
