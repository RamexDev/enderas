/**
 * @fileoverview Sidebar service selector for the services page.
 * Mobile: horizontal icon strip. Tablet: compact pills. Desktop: full sidebar cards.
 */

import { MotionDiv } from '@/components/motion'
import Icon from '@/components/atoms/Icon'

/**
 * @param {object} props
 * @param {Array} props.services
 * @param {string|number} props.activeId
 * @param {(id: string|number) => void} props.onSelect
 */
export default function ServiceNav({ services, activeId, onSelect }) {
  const activeService = services.find((s) => s.id === activeId)

  return (
    <aside className="lg:col-span-4">
      {/* Mobile & tablet: horizontal selector */}
      <nav
        className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden"
        aria-label="Services"
      >
        {services.map((service) => {
          const isActive = activeId === service.id

          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service.id)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={service.title}
              title={service.title}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl border transition-colors ${
                isActive
                  ? 'border-primary-900 bg-primary-900 text-white shadow-md dark:border-primary-700 dark:bg-primary-800'
                  : 'border-primary-100 bg-white text-primary-900 hover:border-gold-300 dark:border-primary-800 dark:bg-primary-900 dark:text-white dark:hover:border-gold-700'
              } h-11 w-11 justify-center p-0 sm:h-auto sm:w-auto sm:justify-start sm:px-3 sm:py-2.5 md:max-w-[220px]`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors sm:h-8 sm:w-8 ${
                  isActive
                    ? 'bg-gold-500 text-primary-950'
                    : 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200'
                }`}
              >
                <Icon name={service.icon} className="h-4 w-4 sm:h-4 sm:w-4" />
              </span>
              <span className="hidden min-w-0 truncate font-heading text-sm font-semibold leading-snug sm:block">
                {service.title}
              </span>
            </button>
          )
        })}
      </nav>

      {activeService && (
        <p className="mt-3 font-heading text-base font-semibold text-primary-900 dark:text-white sm:mt-4 sm:text-lg lg:hidden">
          {activeService.title}
        </p>
      )}

      {/* Desktop: vertical sidebar */}
      <nav className="hidden space-y-2 lg:sticky lg:top-28 lg:block" aria-label="Services">
        {services.map((service, index) => {
          const isActive = activeId === service.id

          return (
            <MotionDiv key={service.id} delay={index * 0.03}>
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
                <span className="min-w-0">
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
            </MotionDiv>
          )
        })}
      </nav>
    </aside>
  )
}
