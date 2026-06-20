/**
 * @fileoverview ServicesPagePreview — visual preview of /services.
 *
 * Lists all services with click-to-edit per card. Active services are
 * highlighted; inactive ones are dimmed so the editor can see at a glance
 * what the public will and won't see.
 */
import { useCallback, useMemo, useState } from 'react'
import EditOverlay from '@/components/preview/EditOverlay'
import PreviewPage from '@/components/preview/PreviewPage'
import { Container, PageHero, CtaBand } from '@/components/preview/PreviewAtoms'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useEditorStore } from '@/store/useEditorStore'
import { publicServicesApi, publicCtaApi } from '@/services/publicApi'
import { mapService, mapCtaData } from '@/utils/mappers'
import { EDITABLE_SECTIONS } from '@/constants/editableSections'

const SECTIONS = EDITABLE_SECTIONS.services
const servicesSection = SECTIONS.find((s) => s.id === 'services-list')

export default function ServicesPagePreview() {
  const pageKey = 'services'
  const reloadToken = useEditorStore((s) => s.getReloadToken(pageKey))

  const fetcher = useCallback(async () => {
    const [servicesResult, ctaResult] = await Promise.all([
      publicServicesApi.list({ limit: 100 }),
      publicCtaApi.get().catch(() => null),
    ])
    return {
      services: servicesResult.data.map(mapService),
      cta: ctaResult ? mapCtaData(ctaResult) : null,
    }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetcher, [reloadToken])
  const [activeId, setActiveId] = useState(null)

  return (
    <PreviewPage
      title="Services"
      subtitle="All services. Active ones appear on the public site and the homepage."
      livePath="/services"
      loading={loading}
      error={error}
      onRetry={reload}
      reloadToken={reloadToken}
      onReloadTokenChange={reload}
    >
      {data && (
        <ServicesBody
          services={data.services}
          cta={data.cta}
          activeId={activeId}
          setActiveId={setActiveId}
          pageKey={pageKey}
        />
      )}
    </PreviewPage>
  )
}

function ServicesBody({ services, cta, activeId, setActiveId, pageKey }) {
  const current = services.find((s) => s.id === activeId) || services[0] || null

  return (
    <div className="bg-sand-50">
      <PageHero
        eyebrow="Our services"
        title="One platform. The full real-asset lifecycle."
        intro="Enderas covers valuation, monetization, advisory, and stewardship under one roof."
      />

      <section className="section-padding">
        <Container>
          {services.length === 0 ? (
            <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-12 text-center text-sm text-primary-500">
              No services yet. Use the button below to add the first one.
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Service nav (left column) */}
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28 space-y-2">
                  {services.map((s) => (
                    <EditOverlay
                      key={s.id}
                      section={servicesSection}
                      record={{ id: s.id }}
                      pageKey={pageKey}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(s.id)}
                        className={
                          'flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ' +
                          (current?.id === s.id
                            ? 'border-gold-400 bg-gold-50'
                            : 'border-primary-100 bg-white hover:border-primary-200') +
                          (s.active === false ? ' opacity-60' : '')
                        }
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600">
                          <ServiceIcon name={s.icon} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-primary-900">{s.title}</h3>
                          <p className="mt-0.5 line-clamp-2 text-xs text-primary-600">{s.excerpt}</p>
                          {s.active === false && (
                            <span className="mt-1 inline-block rounded-full bg-primary-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-600">
                              Inactive
                            </span>
                          )}
                        </div>
                      </button>
                    </EditOverlay>
                  ))}
                </div>
              </div>

              {/* Service detail panel (right column) */}
              <div className="lg:col-span-8">
                {current && (
                  <EditOverlay
                    section={servicesSection}
                    record={{ id: current.id }}
                    pageKey={pageKey}
                  >
                    <div className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
                      <div className="relative aspect-[16/10] overflow-hidden bg-primary-100 sm:aspect-[21/9]">
                        {current.image ? (
                          <img src={current.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-primary-300">No image</div>
                        )}
                      </div>
                      <div className="p-6 sm:p-8">
                        <h2 className="font-heading text-2xl font-semibold text-primary-900">{current.title}</h2>
                        <p className="mt-3 text-base leading-relaxed text-primary-700">
                          {current.description || current.excerpt || 'No description set.'}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <span className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-primary-950">
                            {current.cta?.label || 'Engage Enderas'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </EditOverlay>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>

      <CtaBand cta={cta} />
    </div>
  )
}

function ServiceIcon({ name }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'layers':
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5 9-5z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      )
    case 'scale':
      return (
        <svg {...common}>
          <path d="M12 3v18M7 7h10l-3 7H10L7 7zM5 21h14" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="m7 14 3-3 3 3 5-5" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      )
    case 'building':
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
        </svg>
      )
    case 'gavel':
      return (
        <svg {...common}>
          <path d="m14 14-7.5 7.5a2.12 2.12 0 0 1-3-3L11 11" />
          <path d="m16 16 6-6M14 4l6 6-3 3-6-6 3-3z" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}
