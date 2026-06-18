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
    <div className="min-w-0 lg:col-span-8">
      <article className="reveal overflow-hidden rounded-2xl border border-primary-100/80 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-900">
        <div className="aspect-[16/10] overflow-hidden bg-primary-100 sm:aspect-[21/9] dark:bg-primary-800">
          <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-5 sm:p-7 lg:p-10">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 sm:mb-4 sm:h-12 sm:w-12 dark:text-gold-400">
            <Icon name={service.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h2 className="font-heading text-xl font-semibold text-primary-900 sm:text-2xl dark:text-white lg:text-3xl">
            {service.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-800/90 sm:mt-4 sm:text-base dark:text-primary-200/85">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <Button to="/contact" variant="primary" iconRight="arrowRight" className="w-full sm:w-auto">
              Engage Enderas
            </Button>
            <Button to="/services#auctions" variant="outline" className="w-full sm:w-auto">
              <span className="sm:hidden">Auctions & valuation</span>
              <span className="hidden sm:inline">Auction & valuation services</span>
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
