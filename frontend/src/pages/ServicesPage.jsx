/**
 * @fileoverview Services listing with detail panel and auction/valuation promo block.
 */

import { useCallback, useMemo, useState } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero, CTASection } from '@/components/organisms/CTASection'
import ServiceNav from '@/components/organisms/ServiceNav'
import ServiceDetailPanel from '@/components/organisms/ServiceDetailPanel'
import ServicesPromoSection from '@/components/organisms/ServicesPromoSection'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import EmptyState from '@/components/organisms/EmptyState'
import { PageLoader } from '@/components/atoms/Loader'
import { SERVICES_PROMO } from '@/constants/homeSections'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getServices } from '@/services/serviceService'
import { getHomePage } from '@/services/homeService'

/**
 * Displays all active services with an interactive detail panel.
 */
export default function ServicesPage() {
  const fetchServices = useCallback(async () => {
    const [servicesResult, home] = await Promise.all([getServices({ limit: 50 }), getHomePage()])
    return { services: servicesResult.data, cta: home.cta }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetchServices)
  const [activeId, setActiveId] = useState(null)

  const services = data?.services ?? []
  const resolvedActiveId = activeId ?? services[0]?.id ?? null
  const currentService = useMemo(
    () => services.find((service) => service.id === resolvedActiveId) ?? services[0] ?? null,
    [resolvedActiveId, services],
  )

  useScrollReveal([data])

  if (loading) return <PageLoader />
  if (error || !data) {
    return (
      <Container className="section-padding">
        <EmptyState icon="info" title="Unable to load services" message={error} action={<Button onClick={reload}>Retry</Button>} />
      </Container>
    )
  }

  if (services.length === 0) {
    return (
      <Container className="section-padding">
        <EmptyState icon="info" title="No services available" message="Please check back later." />
      </Container>
    )
  }

  return (
    <>
      <SeoHead
        title="Services"
        description="Asset management, property appraisal and liquidation, investment advisory, business consultancy and construction consulting."
      />
      <PageHero
        eyebrow="Our services"
        title="One platform. The full real-asset lifecycle."
        intro="Enderas covers valuation, monetization, operational stewardship, advisory, research and diligence — so owners, lenders and allocators can work with a single trusted counterparty across every stage."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-14">
            <ServiceNav services={services} activeId={resolvedActiveId} onSelect={setActiveId} />
            <ServiceDetailPanel service={currentService} />
          </div>
        </Container>
      </section>

      <ServicesPromoSection promo={SERVICES_PROMO} />
      <CTASection cta={data.cta} />
    </>
  )
}
