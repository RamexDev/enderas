/**
 * @fileoverview AboutPagePreview — visual preview of /about.
 *
 * Editable regions: about page content (history/mission/vision/SEO),
 * core values, team members, partners. Plus the CTA band (managed by the
 * homepage's contact_cta_* fields).
 */
import { useCallback, useMemo } from 'react'
import EditOverlay from '@/components/preview/EditOverlay'
import PreviewPage from '@/components/preview/PreviewPage'
import {
  Container,
  SectionHeading,
  PageHero,
  CtaBand,
  TeamCard,
} from '@/components/preview/PreviewAtoms'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useEditorStore } from '@/store/useEditorStore'
import { aboutApi, teamApi, homepageApi } from '@/services/cmsApi'
import { mapAboutPageData } from '@/utils/mappers'
import { EDITABLE_SECTIONS } from '@/constants/editableSections'

const SECTIONS = EDITABLE_SECTIONS.about
const byId = (id) => SECTIONS.find((s) => s.id === id)

export default function AboutPagePreview() {
  const pageKey = 'about'
  const reloadToken = useEditorStore((s) => s.getReloadToken(pageKey))

  const fetcher = useCallback(async () => {
    const [about, coreValues, partners, teamResult, homePage] = await Promise.all([
      aboutApi.get(),
      aboutApi.listCoreValues(),
      aboutApi.listPartners(),
      teamApi.list({ limit: 100 }),
      homepageApi.get().catch(() => null),
    ])
    const cta = homePage ? {
      title: homePage.contact_cta_title,
      body: homePage.contact_cta_description,
      primary_label: homePage.contact_cta_button_text,
      primary_link: homePage.contact_cta_button_link,
    } : null
    return mapAboutPageData({ about, coreValues, partners, teamMembers: teamResult.data, cta })
  }, [])
  const { data, loading, error, reload } = useAsyncData(fetcher, [reloadToken])

  const aboutContentSection = useMemo(() => byId('about-content'), [])
  const coreValuesSection = useMemo(() => byId('core-values'), [])
  const teamMembersSection = useMemo(() => byId('team-members'), [])
  const partnersSection = useMemo(() => byId('partners'), [])

  return (
    <PreviewPage
      title="About"
      subtitle="History, mission, vision, core values, team, and partners."
      livePath="/about"
      loading={loading}
      error={error}
      onRetry={reload}
      reloadToken={reloadToken}
      onReloadTokenChange={reload}
    >
      {data && (
        <AboutBody
          data={data}
          pageKey={pageKey}
          sections={{ aboutContentSection, coreValuesSection, teamMembersSection, partnersSection }}
        />
      )}
    </PreviewPage>
  )
}

function AboutBody({ data, pageKey, sections }) {
  const { heroEyebrow, heroTitle, heroIntro, heroImage, history, mission, vision, values, team, partners, cta } = data

  return (
    <div className="bg-sand-50">
      {/* Hero — copy is hardcoded in the public site; only the intro reflects
          the about page meta_description. The hero image is a static seed
          asset, so we don't wrap it in an EditOverlay. */}
      <PageHero eyebrow={heroEyebrow} title={heroTitle} intro={heroIntro} image={heroImage} />

      {/* History + mission/vision */}
      <section className="section-padding">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <EditOverlay section={sections.aboutContentSection} pageKey={pageKey} className="lg:col-span-7">
              <SectionHeading eyebrow="Our story" title="History" />
              <div className="mt-4 space-y-4 text-base leading-relaxed text-primary-700/90">
                {history ? (
                  history.split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)
                ) : (
                  <p className="italic text-primary-400">No history text set yet. Click to add some.</p>
                )}
              </div>
            </EditOverlay>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-primary-900">Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-700">
                  {mission || <span className="italic text-primary-400">Not set.</span>}
                </p>
              </div>
              <div className="rounded-2xl border border-primary-100 bg-primary-900 p-6 text-white shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-white">Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-200/85">
                  {vision || <span className="italic text-primary-400">Not set.</span>}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core values */}
      <section className="border-y border-primary-100 bg-white py-16 sm:py-20 lg:py-28">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Core values that shape every engagement." align="center" />
          {values.length === 0 ? (
            <div className="mt-10 rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-10 text-center text-sm text-primary-500">
              No core values yet.
            </div>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <EditOverlay
                  key={v.id}
                  section={sections.coreValuesSection}
                  record={{ id: v.id }}
                  pageKey={pageKey}
                >
                  <div className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
                    <div className="font-heading text-3xl font-semibold text-gold-500/30">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-2 font-heading text-base font-semibold text-primary-900">{v.title}</h3>
                    {v.body && <p className="mt-1.5 text-sm leading-relaxed text-primary-600">{v.body}</p>}
                  </div>
                </EditOverlay>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="section-padding">
          <Container>
            <SectionHeading eyebrow="Leadership" title="Meet our team." align="center" />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <EditOverlay
                  key={member.id}
                  section={sections.teamMembersSection}
                  record={{ id: member.id }}
                  pageKey={pageKey}
                >
                  <TeamCard member={member} />
                </EditOverlay>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Partners */}
      {partners.length > 0 && (
        <section className="bg-primary-950 py-16 text-white">
          <Container>
            <SectionHeading eyebrow="Trusted partners" title="Organisations we work with." light align="center" />
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {partners.map((p) => (
                <EditOverlay
                  key={p.id || p.name}
                  section={sections.partnersSection}
                  record={p.id ? { id: p.id } : null}
                  pageKey={pageKey}
                >
                  <div className="flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="max-h-16 max-w-full object-contain opacity-80" />
                    ) : (
                      <span className="text-sm font-semibold text-white/80">{p.name}</span>
                    )}
                  </div>
                </EditOverlay>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA — managed by the homepage's contact_cta_* fields, surfaced here
          for visual continuity. Not wrapped in an EditOverlay since the
          editor lives on the Home page tab. */}
      <CtaBand cta={cta} />
    </div>
  )
}
