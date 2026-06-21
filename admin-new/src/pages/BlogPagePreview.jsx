/**
 * @fileoverview BlogPagePreview — visual preview of /blog.
 *
 * Shows published posts as cards. Draft posts are also surfaced (dimmed) so
 * the editor can see what's queued up — but the public site only shows
 * published. Each card is editable. Categories are managed via a separate
 * EditOverlay above the list.
 *
 * Data comes from /public/posts (published only) + /posts (admin, for drafts
 * visibility). The post editor supports draft/published toggle.
 */
import { useCallback, useMemo } from 'react'
import EditOverlay from '@/components/preview/EditOverlay'
import PreviewPage from '@/components/preview/PreviewPage'
import { Container, PageHero, BlogCard } from '@/components/preview/PreviewAtoms'
import { Badge, EmptyState } from '@/components/ui/Loading'
import { useAsyncData } from '@/hooks/useAsyncData'
import { useEditorStore } from '@/store/useEditorStore'
import { blogApi } from '@/services/cmsApi'
import { mapBlogPost } from '@/utils/mappers'
import { EDITABLE_SECTIONS } from '@/constants/editableSections'
import { formatDate } from '@/utils/helpers'

const SECTIONS = EDITABLE_SECTIONS.blog
const byId = (id) => SECTIONS.find((s) => s.id === id)

export default function BlogPagePreview() {
  const pageKey = 'blog'
  const reloadToken = useEditorStore((s) => s.getReloadToken(pageKey))

  const fetcher = useCallback(async () => {
    const [published, allPosts] = await Promise.all([
      blogApi.list({ limit: 100, status: 'published' }),
      blogApi.list({ limit: 100 }).catch(() => ({ data: [], meta: {} })),
    ])
    return {
      published: published.data.map(mapBlogPost),
      drafts: allPosts.data
        .filter((p) => p.status !== 'published')
        .map(mapBlogPost),
    }
  }, [])

  const { data, loading, error, reload } = useAsyncData(fetcher, [reloadToken])

  const categoriesSection = useMemo(() => byId('blog-categories'), [])
  const postsSection = useMemo(() => byId('blog-posts'), [])

  return (
    <PreviewPage
      title="Blog"
      subtitle="Published posts appear on the public site; drafts are shown here for editing."
      livePath="/blog"
      loading={loading}
      error={error}
      onRetry={reload}
      reloadToken={reloadToken}
      onReloadTokenChange={reload}
    >
      {data && (
        <BlogBody
          published={data.published}
          drafts={data.drafts}
          pageKey={pageKey}
          sections={{ categoriesSection, postsSection }}
        />
      )}
    </PreviewPage>
  )
}

function BlogBody({ published, drafts, pageKey, sections }) {
  const openEdit = useEditorStore((s) => s.openEdit)
  const openNewRecord = useEditorStore((s) => s.openNewRecord)

  return (
    <div className="bg-sand-50">
      <PageHero
        eyebrow="Insights"
        title="Research, strategy and market intelligence."
        intro="Our research desk publishes market outlooks, sector deep-dives, and notes from the field."
      />

      <section className="section-padding">
        <Container>
          {/* Top toolbar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-heading text-xl font-semibold text-primary-900">All posts</h2>
              <p className="mt-1 text-sm text-primary-500">
                {published.length} published · {drafts.length} draft{drafts.length === 1 ? '' : 's'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEdit(sections.categoriesSection, null, pageKey)}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-4 py-2 text-xs font-medium text-primary-700 hover:bg-primary-50"
            >
              Manage categories
            </button>
          </div>

          {/* Drafts first — they need attention */}
          {drafts.length > 0 && (
            <div className="mb-12">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="warning">Drafts</Badge>
                <span className="text-xs text-primary-500">Not visible to the public</span>
              </div>
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {drafts.map((p) => (
                  <EditOverlay
                    key={p.id}
                    section={sections.postsSection}
                    record={{ id: p.id }}
                    pageKey={pageKey}
                  >
                    <div className="relative">
                      <BlogCard post={p} />
                      <div className="absolute right-3 top-3">
                        <Badge variant="warning">Draft</Badge>
                      </div>
                    </div>
                  </EditOverlay>
                ))}
              </div>
            </div>
          )}

          {/* Published */}
          {published.length === 0 && drafts.length === 0 ? (
            <EmptyState
              title="No posts yet"
              description="Click the button below to create the first blog post."
            />
          ) : published.length === 0 ? (
            <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-10 text-center text-sm text-primary-500">
              No published posts yet. Publish a draft to make it visible to the public.
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="success">Published</Badge>
                <span className="text-xs text-primary-500">Visible on /blog</span>
              </div>
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {published.map((p) => (
                  <EditOverlay
                    key={p.id}
                    section={sections.postsSection}
                    record={{ id: p.id }}
                    pageKey={pageKey}
                  >
                    <BlogCard post={p} />
                  </EditOverlay>
                ))}
              </div>
            </div>
          )}

          {/* "Add new" affordance */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => openNewRecord(sections.postsSection, pageKey)}
              className="inline-flex items-center gap-2 rounded-lg border border-dashed border-primary-300 bg-white px-5 py-2.5 text-sm text-primary-600 hover:border-primary-400 hover:text-primary-800"
            >
              + Write a new post
            </button>
          </div>
        </Container>
      </section>

      {/* Recent posts metadata footer */}
      {published.length > 0 && (
        <Container className="pb-12">
          <div className="rounded-xl border border-primary-100 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-primary-900">Most recent posts</h3>
            <ul className="space-y-2 text-xs">
              {published.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 text-primary-600">
                  <span className="truncate">{p.title}</span>
                  <span className="shrink-0 text-primary-400">{formatDate(p.date)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      )}
    </div>
  )
}
