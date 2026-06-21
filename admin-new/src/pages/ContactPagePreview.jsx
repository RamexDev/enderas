/**
 * @fileoverview ContactPagePreview — visual preview of /contact.
 *
 * Shows the contact info card (address, phone, email, hours) and the Google
 * Maps embed. The contact info is editable; the contact form itself is not
 * (it's a form visitors fill in — not CMS content). Site settings (logo,
 * footer text, social links) are also editable from here since they appear
 * in the footer.
 */
import { useCallback, useMemo } from 'react'
import EditOverlay from '@/components/preview/EditOverlay'
import PreviewPage from '@/components/preview/PreviewPage'
import { Container, PageHero } from '@/components/preview/PreviewAtoms'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useEditorStore } from '@/store/useEditorStore'
import { contactApi, settingsApi } from '@/services/cmsApi'
import { mapSettings, DEFAULT_SITE_SETTINGS } from '@/utils/mappers'
import { EDITABLE_SECTIONS } from '@/constants/editableSections'
import { extractMapEmbedUrl } from '@/utils/helpers'

const SECTIONS = EDITABLE_SECTIONS.contact
const byId = (id) => SECTIONS.find((s) => s.id === id)

export default function ContactPagePreview() {
  const pageKey = 'contact'
  const reloadToken = useEditorStore((s) => s.getReloadToken(pageKey))

  const fetcher = useCallback(async () => {
    const [contactPage, settingsResult] = await Promise.allSettled([
      contactApi.getPage(),
      settingsApi.get(),
    ])
    const contact = contactPage.status === 'fulfilled' ? contactPage.value : {}
    const apiSettings = settingsResult.status === 'fulfilled' ? settingsResult.value : {}
    return {
      contact,
      settings: mapSettings(apiSettings, contact),
    }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetcher, [reloadToken])

  const contactSection = useMemo(() => byId('contact-page'), [])
  const settingsSection = useMemo(() => byId('site-settings'), [])

  return (
    <PreviewPage
      title="Contact"
      subtitle="Address, phone, email, and the Google Map embed shown on /contact."
      livePath="/contact"
      loading={loading}
      error={error}
      onRetry={reload}
      reloadToken={reloadToken}
      onReloadTokenChange={reload}
    >
      {data && (
        <ContactBody
          contact={data.contact}
          settings={data.settings}
          pageKey={pageKey}
          sections={{ contactSection, settingsSection }}
        />
      )}
    </PreviewPage>
  )
}

function ContactBody({ contact, settings, pageKey, sections }) {
  const mapUrl = extractMapEmbedUrl(contact.google_map_embed || settings.mapEmbedUrl)

  return (
    <div className="bg-sand-50">
      <PageHero
        eyebrow="Get in touch"
        title="Speak with an Enderas partner."
        intro="Our team is based in Addis Ababa, Ethiopia. Whether you need asset management, an independent appraisal, or strategic advice, we'd be glad to hear from you."
      />

      <section className="section-padding">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Contact form preview (not editable — it's a visitor-facing form) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8">
                <h3 className="font-heading text-xl font-semibold text-primary-900">Send us a message</h3>
                <p className="mt-1 text-sm text-primary-500">
                  This form is filled in by visitors — its fields are not CMS-managed.
                </p>
                <div className="mt-6 space-y-4">
                  <FakeField label="Your name" placeholder="Jane Doe" />
                  <FakeField label="Email" placeholder="jane@example.com" type="email" />
                  <FakeField label="Phone" placeholder="+251 …" />
                  <FakeField label="Subject" placeholder="What's this about?" />
                  <FakeField label="Message" placeholder="Tell us a bit more…" textarea />
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-lg bg-gold-500 px-5 py-3 text-sm font-semibold text-primary-950"
                  disabled
                >
                  Send message (preview only)
                </button>
              </div>
            </div>

            {/* Contact info card — editable */}
            <div className="lg:col-span-5">
              <EditOverlay section={sections.contactSection} pageKey={pageKey}>
                <div className="rounded-2xl bg-primary-900 p-6 text-white shadow-sm sm:p-8">
                  <h3 className="font-heading text-xl font-semibold text-white">Contact information</h3>
                  <ul className="mt-6 space-y-4 text-sm">
                    <InfoRow icon="mapPin" label="Address">
                      {contact.address || settings.address}
                    </InfoRow>
                    <InfoRow icon="phone" label="Phone">
                      {[settings.phone, settings.phoneAlt].filter(Boolean).join('  ·  ') || '—'}
                    </InfoRow>
                    <InfoRow icon="mail" label="Email">
                      {contact.email || settings.email}
                    </InfoRow>
                    <InfoRow icon="clock" label="Hours">
                      {settings.hours}
                    </InfoRow>
                  </ul>
                </div>
              </EditOverlay>
            </div>
          </div>
        </Container>
      </section>

      {/* Map embed */}
      <section className="pb-16 lg:pb-28">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-primary-100 shadow-sm">
            <div className="aspect-[16/10] sm:aspect-[21/9]">
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  title="Office location"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-100 text-sm text-primary-500">
                  No Google Map embed configured.
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Footer preview + site settings editor */}
      <section className="border-t border-primary-100 bg-primary-950 py-12 text-white">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 font-heading text-base font-semibold text-primary-950">
                  E
                </div>
                <div>
                  <div className="text-sm font-semibold">{settings.appName}</div>
                  <div className="text-[11px] text-gold-400">{settings.tagline}</div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-xs leading-relaxed text-primary-200/70">
                {settings.footerDescription}
              </p>
              <div className="mt-4 flex gap-2">
                {settings.social.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-primary-200"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <EditOverlay section={sections.settingsSection} pageKey={pageKey}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-400">
                    Site settings
                  </div>
                  <p className="mt-1 text-sm text-primary-200/70">
                    Brand identity, footer text, social links, and navigation shortcuts.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-primary-200">
                    <SettingPreview label="Site name" value={settings.appName} />
                    <SettingPreview label="Phone" value={settings.phone} />
                    <SettingPreview label="Email" value={settings.email} />
                    <SettingPreview label="Auctions link" value={settings.sellLink} />
                  </div>
                </div>
              </EditOverlay>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

function FakeField({ label, placeholder, type = 'text', textarea = false }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-primary-700">{label}</label>
      {textarea ? (
        <div className="h-24 rounded-lg border border-primary-200 bg-primary-50/40 px-3 py-2 text-xs text-primary-400">
          {placeholder}
        </div>
      ) : (
        <div className="h-10 rounded-lg border border-primary-200 bg-primary-50/40 px-3 py-2 text-xs text-primary-400">
          {placeholder}
        </div>
      )}
    </div>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-400">
        <InfoIcon name={icon} />
      </span>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-primary-300">{label}</div>
        <div className="mt-0.5 text-sm text-white">{children}</div>
      </div>
    </li>
  )
}

function SettingPreview({ label, value }) {
  return (
    <div className="rounded-lg bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-primary-300">{label}</div>
      <div className="mt-0.5 truncate text-white">{value || '—'}</div>
    </div>
  )
}

function InfoIcon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'mapPin':
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.27a2 2 0 0 1 2.11-.45c.74.34 1.53.57 2.34.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    default:
      return null
  }
}
