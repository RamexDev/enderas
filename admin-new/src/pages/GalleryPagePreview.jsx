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
import { publicGalleryApi, publicCtaApi } from '@/services/publicApi'
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
    const [galleryResult, ctaResult] = await Promise.all([
      publicGalleryApi.list({ limit: 100 }),
      publicCtaApi.get().catch(() => null),
    ])
    return {
      items: galleryResult.data.map(mapGalleryItem),
      cta: ctaResult ? mapCtaData(ctaResult) : null,
    }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetcher, [reloadToken])

  const categoriesSection = useMemo(() => byId('gallery-categories'), [])
  const itemsSection = useMemo(() => byId('gallery-items'), [])

  return (
    <PreviewPage
      title="Gallery"
      subtitle="All gallery items. Categories and items can be edited in place."
      livePath="/gallery"
      loading={loading}
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
  return (
    <div className="bg-sand-50">
      <PageHero
        eyebrow="Selected engagements"
        title="Assets we value, manage and broker."
        intro="A cross-section of recent engagements across commercial, residential, and institutional assets."
      />

      <section className="section-padding">
        <Container>
          {/* Categories chip — opens the categories editor */}
          <div className="mb-8 flex justify-end">
            <EditOverlay section={sections.categoriesSection} pageKey={pageKey}>
              <span className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-4 py-2 text-xs font-medium text-primary-700">
                Manage categories
              </span>
            </EditOverlay>
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-12 text-center text-sm text-primary-500">
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
              <EditOverlay section={sections.itemsSection} pageKey={pageKey}>
                <span className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary-300 bg-white px-5 py-2.5 text-sm text-primary-600">
                  + Add a new gallery item
                </span>
              </EditOverlay>
            </div>
          )}
        </Container>
      </section>

      <CtaBand cta={cta} />
    </div>
  )
}
