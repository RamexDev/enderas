/**
 * @fileoverview Sidebar service selector for the services page.
 * Reveal animation lives on a static wrapper so React re-renders do not strip `in-view`.
 */

import Icon from '@/components/atoms/Icon'

/**
 * @param {object} props
 * @param {Array} props.services
 * @param {string|number} props.activeId
 * @param {(id: string|number) => void} props.onSelect
 */
export default function ServiceNav({ services, activeId, onSelect }) {
  return (
    <aside className="lg:col-span-4">
      <nav className="space-y-2 lg:sticky lg:top-28" aria-label="Services">
        {services.map((service, index) => {
          const isActive = activeId === service.id

          return (
            <div key={service.id} className="reveal" style={{ transitionDelay: `${index * 40}ms` }}>
              <button
                type="button"
                onClick={() => onSelect(service.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                  isActive
                    ? 'border-primary-900 bg-primary-900 text-white shadow-md dark:border-primary-700 dark:bg-primary-800'
                    : 'border-primary-100 bg-white text-primary-900 hover:border-gold-300 dark:border-primary-800 dark:bg-primary-900 dark:text-white dark:hover:border-gold-700'
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gold-500 text-primary-950'
                      : 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                  }`}
                >
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-heading text-base font-semibold leading-snug">{service.title}</span>
                  <span
                    className={`mt-0.5 block text-xs leading-relaxed ${
                      isActive ? 'text-primary-100/70' : 'text-primary-600/70 dark:text-primary-300/60'
                    }`}
                  >
                    {service.excerpt}
                  </span>
                </span>
              </button>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
