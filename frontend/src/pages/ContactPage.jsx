/**
 * @fileoverview Contact page — static info/map; only the inquiry form posts to the API.
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import SeoHead from '@/components/organisms/SeoHead'
import ContactMap from '@/components/organisms/ContactMap'
import { PageHero } from '@/components/organisms/CTASection'
import FormField from '@/components/molecules/FormField'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { contactSchema } from '@/constants/validationSchemas'
import { CONTACT_PAGE_COPY, DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'
import { submitInquiry } from '@/services/contactService'
import { useSiteStore } from '@/store/useSiteStore'

/** Builds a tel: href from a display phone string. */
function telHref(phone) {
  return `tel:${phone.replace(/\s/g, '')}`
}

/**
 * Contact form and office information page.
 * Address, phone, email, and map are static (layout-owned). Only form submission uses the API.
 */
export default function ContactPage() {
  const storeSettings = useSiteStore((s) => s.settings)
  const settings = storeSettings || DEFAULT_SITE_SETTINGS

  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', phone: '', subject: '', message: '' },
  })

  /** Submits the contact form to the backend API. */
  const onSubmit = async (formData) => {
    setSubmitting(true)
    setSubmitError('')
    try {
      await submitInquiry(formData)
      setSubmittedName(formData.name.split(' ')[0])
      setSubmitted(true)
    } catch {
      setSubmitError('Unable to send your message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${settings.appName} Asset Management`,
    url: settings.seo.siteUrl,
    email: settings.email,
    telephone: settings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressCountry: settings.country,
      postOfficeBoxNumber: settings.poBox,
    },
    geo: settings.mapCoordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: settings.mapCoordinates.lat,
          longitude: settings.mapCoordinates.lng,
        }
      : undefined,
  }

  return (
    <>
      <SeoHead
        title="Contact"
        description={`Reach Enderas in ${settings.city}, ${settings.country} — ${settings.address}. Call ${settings.phone} or email ${settings.email}.`}
        jsonLd={contactJsonLd}
      />
      <PageHero
        eyebrow={CONTACT_PAGE_COPY.eyebrow}
        title={CONTACT_PAGE_COPY.title}
        intro={CONTACT_PAGE_COPY.intro}
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <div className="rounded-3xl border border-primary-100/80 bg-white p-5 shadow-sm dark:border-primary-800 dark:bg-primary-900 sm:p-8 lg:p-10">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-gold-600 dark:text-gold-400">
                      <Icon name="check" className="h-8 w-8" strokeWidth={2.5} />
                    </div>
                    <h2 className="font-heading text-2xl font-semibold text-primary-900 dark:text-white">
                      Thank you, {submittedName}.
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary-700/95 dark:text-primary-200/85">
                      Your inquiry has been received. An Enderas partner will reach out within one business day.
                    </p>
                    <div className="mt-8">
                      <Button
                        variant="outline"
                        onClick={() => {
                          reset()
                          setSubmitted(false)
                        }}
                      >
                        Send another message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-2 font-heading text-2xl font-semibold text-primary-900 dark:text-white">
                      Send us a message
                    </h2>
                    <p className="mb-7 text-sm text-primary-700/90 dark:text-primary-200/80">
                      All fields marked with * are required.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                          label="Full name"
                          required
                          placeholder="Jane Doe"
                          autoComplete="name"
                          error={errors.name?.message}
                          touched={!!touchedFields.name}
                          {...register('name')}
                        />
                        <FormField
                          label="Email"
                          type="email"
                          required
                          placeholder="jane@company.com"
                          autoComplete="email"
                          error={errors.email?.message}
                          touched={!!touchedFields.email}
                          {...register('email')}
                        />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <FormField
                          label="Phone"
                          type="tel"
                          required
                          placeholder="+251 911 234 567"
                          autoComplete="tel"
                          error={errors.phone?.message}
                          touched={!!touchedFields.phone}
                          {...register('phone')}
                        />
                        <FormField
                          label="Subject"
                          required
                          placeholder="Property valuation inquiry"
                          error={errors.subject?.message}
                          touched={!!touchedFields.subject}
                          {...register('subject')}
                        />
                      </div>
                      <FormField
                        label="Message"
                        required
                        textarea
                        rows={6}
                        placeholder="Tell us a bit about your asset, your timeline and what you're hoping to accomplish."
                        error={errors.message?.message}
                        touched={!!touchedFields.message}
                        {...register('message')}
                      />
                      {submitError && (
                        <p className="text-sm text-error-600 dark:text-error-500" role="alert">
                          {submitError}
                        </p>
                      )}
                      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
                        <Button type="submit" variant="primary" size="lg" disabled={submitting} iconRight="arrowRight" className="w-full sm:w-auto">
                          {submitting ? 'Sending…' : 'Send message'}
                        </Button>
                        <p className="text-center text-xs text-primary-500/80 sm:text-left dark:text-primary-300/60">
                          We typically respond within one business day.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            <aside className="min-w-0 space-y-5 sm:space-y-6 lg:col-span-5">
              <div className="rounded-2xl bg-primary-900 p-5 text-white sm:p-7">
                <h3 className="mb-5 font-heading text-lg font-semibold">Contact information</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                      <Icon name="mapPin" className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wider text-primary-200/80">Office</div>
                      <div className="text-primary-100/90">{settings.address}</div>
                      <div className="mt-1 text-xs text-primary-200/85">
                        {settings.city}, {settings.country}
                        {settings.poBox ? ` · P.O. Box ${settings.poBox}` : ''}
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                      <Icon name="phone" className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wider text-primary-200/80">Phone</div>
                      <a href={telHref(settings.phone)} className="block text-primary-100/90 hover:text-gold-300">
                        {settings.phone}
                      </a>
                      {settings.phoneAlt && (
                        <a href={telHref(settings.phoneAlt)} className="mt-1 block text-primary-100/90 hover:text-gold-300">
                          {settings.phoneAlt}
                        </a>
                      )}
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                      <Icon name="mail" className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wider text-primary-200/80">Email</div>
                      <a href={`mailto:${settings.email}`} className="text-primary-100/90 hover:text-gold-300">
                        {settings.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-500/15 text-gold-300">
                      <Icon name="clock" className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="mb-0.5 text-xs uppercase tracking-wider text-primary-200/80">Hours</div>
                      <div className="text-primary-100/90">{settings.hours}</div>
                    </div>
                  </li>
                </ul>
              </div>

            </aside>
          </div>
        </Container>
      </section>

      <ContactMap settings={settings} />
    </>
  )
}
