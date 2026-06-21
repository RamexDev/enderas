/**
 * @fileoverview GalleryPagePreview — visual preview of /gallery.
 *
 * Shows all gallery items as a masonry grid. Each tile is individually
 * editable. Categories are listed in a separate EditOverlay above the grid
 * so the user can manage category names without leaving the page.
 */
import { useCallback, useMemo } from 'react'
import EditOverlay from '@/components/preview/EditOverlay'
import PreviewPage from '@/components/preview/PreviewPage'
import { Container, PageHero, CtaBand, PropertyCard } from '@/components/preview/PreviewAtoms'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useEditorStore } from '@/store/useEditorStore'
import { galleryApi, homepageApi } from '@/services/cmsApi'
import { mapGalleryItem, mapCtaData } from '@/utils/mappers'
import { EDITABLE_SECTIONS } from '@/constants/editableSections'

const SECTIONS = EDITABLE_SECTIONS.gallery
const byId = (id) => SECTIONS.find((s) => s.id === id)

const ASPECT_CLASSES = [
  'aspect-[4/5]',
  'aspect-[4/3]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[5/6]',
]

export default function GalleryPagePreview() {
  const pageKey = 'gallery'
  const reloadToken = useEditorStore((s) => s.getReloadToken(pageKey))

  const fetcher = useCallback(async () => {
    const [galleryResult, homePage] = await Promise.all([
      galleryApi.list({ limit: 100 }),
      homepageApi.get().catch(() => null),
    ])
    const cta = homePage ? {
      title: homePage.contact_cta_title,
      body: homePage.contact_cta_description,
      primary_label: homePage.contact_cta_button_text,
      primary_link: homePage.contact_cta_button_link,
    } : null
    return {
      items: galleryResult.data.map(mapGalleryItem),
      cta: cta ? mapCtaData(cta) : null,
    }
  }, [])

  const { data, loading, refreshing, error, reload } = useAsyncData(fetcher, [reloadToken])

  const categoriesSection = useMemo(() => byId('gallery-categories'), [])
  const itemsSection = useMemo(() => byId('gallery-items'), [])

  return (
    <PreviewPage
      title="Gallery"
      subtitle="All gallery items. Categories and items can be edited in place."
      livePath="/gallery"
      loading={loading}
      refreshing={refreshing}
      error={error}
      onRetry={reload}
      reloadToken={reloadToken}
      onReloadTokenChange={reload}
    >
      {data && (
        <GalleryBody
          items={data.items}
          cta={data.cta}
          pageKey={pageKey}
          sections={{ categoriesSection, itemsSection }}
        />
      )}
    </PreviewPage>
  )
}

function GalleryBody({ items, cta, pageKey, sections }) {
  const openEdit = useEditorStore((s) => s.openEdit)
  const openNewRecord = useEditorStore((s) => s.openNewRecord)

  return (
    <div className="bg-sand-50 dark:bg-primary-950">
      <PageHero
        eyebrow="Selected engagements"
        title="Assets we value, manage and broker."
        intro="A cross-section of recent engagements across commercial, residential, and institutional assets."
      />

      <section className="section-padding">
        <Container>
          {/* Categories chip — opens the categories editor */}
          <div className="mb-8 flex justify-end">
            <button
              type="button"
              onClick={() => openEdit(sections.categoriesSection, null, pageKey)}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-4 py-2 text-xs font-medium text-primary-700 hover:bg-primary-50 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200 dark:hover:bg-primary-800"
            >
              Manage categories
            </button>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-12 text-center text-sm text-primary-500 dark:border-primary-700 dark:bg-primary-900/50 dark:text-primary-400">
              No gallery items yet. Click any tile placeholder to add the first one — or use the "Gallery items" button below.
            </div>
          ) : (
            <div className="masonry">
              {items.map((item, i) => (
                <EditOverlay
                  key={item.id}
                  section={sections.itemsSection}
                  record={{ id: item.id }}
                  pageKey={pageKey}
                >
                  <div className={ASPECT_CLASSES[i % ASPECT_CLASSES.length]}>
                    <PropertyCard item={item} />
                  </div>
                </EditOverlay>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => openNewRecord(sections.itemsSection, pageKey)}
                className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary-300 bg-white px-5 py-2.5 text-sm text-primary-600 hover:border-primary-400 hover:text-primary-800 dark:border-primary-600 dark:bg-primary-900 dark:text-primary-300 dark:hover:border-primary-500 dark:hover:text-white"
              >
                + Add a new gallery item
              </button>
            </div>
          )}
        </Container>
      </section>

      <CtaBand cta={cta} />
    </div>
  )
}
