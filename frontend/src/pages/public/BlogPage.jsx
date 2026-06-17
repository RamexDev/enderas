import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SeoHead from '@/components/organisms/SeoHead'
import { PageHero } from '@/components/organisms/CTASection'
import EmptyState from '@/components/organisms/EmptyState'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { BlogCard } from '@/components/molecules/Cards'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useContentStore } from '@/store/useContentStore'
import { formatDate } from '@/utils/formatDate'

const POSTS_PER_PAGE = 4

export default function BlogPage() {
  useScrollReveal()
  const navigate = useNavigate()
  const blog = useContentStore((s) => s.blog).filter((p) => p.status !== 'draft')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const categories = useMemo(() => ['All', ...Array.from(new Set(blog.map((p) => p.category)))], [blog])

  const filtered = useMemo(
    () =>
      blog.filter((p) => {
        const matchesCat = category === 'All' || p.category === category
        const q = search.trim().toLowerCase()
        const matchesQ =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q)
        return matchesCat && matchesQ
      }),
    [search, category, blog],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
  const featured = paginated[0]
  const rest = paginated.slice(1)
  const popular = [...blog].sort((a, b) => b.readTime - a.readTime).slice(0, 4)
  const recent = blog.slice(0, 4)

  return (
    <>
      <SeoHead
        title="Insights"
        description="Market outlooks, sector deep-dives and practical strategy guidance for owners, lenders and allocators of real-asset capital."
      />
      <PageHero
        eyebrow="Insights"
        title="Research, strategy and market intelligence."
        intro="Our research desk publishes quarterly briefings, sector deep-dives and practical guidance for owners, lenders and allocators of real-asset capital."
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="reveal mb-10 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-400">
                    <Icon name="search" className="w-4 h-4" />
                  </span>
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setPage(1)
                    }}
                    placeholder="Search articles, authors…"
                    className="w-full rounded-lg border border-primary-200 bg-white py-3 pl-10 pr-4 text-sm text-primary-900 placeholder-primary-400/60 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:border-primary-700 dark:bg-primary-950 dark:text-white"
                    aria-label="Search articles"
                  />
                </div>
                <div className="scrollx no-scrollbar flex items-center gap-2 overflow-x-auto pb-1">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCategory(c)
                        setPage(1)
                      }}
                      aria-pressed={category === c}
                      className={`whitespace-nowrap rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
                        category === c
                          ? 'border-primary-900 bg-primary-900 text-white dark:border-primary-700 dark:bg-primary-700'
                          : 'border-primary-200 bg-white text-primary-700 hover:border-gold-400 dark:border-primary-700 dark:bg-primary-900 dark:text-primary-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {filtered.length === 0 ? (
                <EmptyState
                  icon="search"
                  title="No articles found"
                  message="Try a different search term or category filter."
                  action={
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearch('')
                        setCategory('All')
                        setPage(1)
                      }}
                    >
                      Clear filters
                    </Button>
                  }
                />
              ) : (
                <>
                  <div className="space-y-8">
                    {featured && <BlogCard post={featured} featured />}
                    <div className="grid gap-6 sm:grid-cols-2">{rest.map((p) => <BlogCard key={p.id} post={p} />)}</div>
                  </div>
                  {totalPages > 1 && (
                    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
                      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                        Previous
                      </Button>
                      <span className="text-sm text-primary-600 dark:text-primary-300">
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                      >
                        Next
                      </Button>
                    </nav>
                  )}
                </>
              )}
            </div>

            <aside className="space-y-8 lg:col-span-4">
              <div className="reveal space-y-8 lg:sticky lg:top-28">
                <div className="rounded-2xl border border-primary-100 bg-white p-6 dark:border-primary-800 dark:bg-primary-900">
                  <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold text-primary-900 dark:text-white">
                    <Icon name="clock" className="w-5 h-5 text-gold-500" /> Recent posts
                  </h3>
                  <ul className="space-y-4">
                    {recent.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => navigate(`/blog/${p.slug}`)}
                          className="group flex w-full items-start gap-3 text-left"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-primary-100 dark:bg-primary-800">
                            <img src={p.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium leading-snug text-primary-900 transition-colors group-hover:text-gold-600 dark:text-white dark:group-hover:text-gold-400">
                              {p.title}
                            </h4>
                            <p className="mt-1 text-xs text-primary-600/70 dark:text-primary-300/60">
                              {formatDate(p.date)}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-primary-900 p-6 text-white">
                  <h3 className="mb-4 flex items-center gap-2 font-heading text-lg font-semibold">
                    <Icon name="sparkles" className="w-5 h-5 text-gold-400" /> Popular reads
                  </h3>
                  <ul className="space-y-3">
                    {popular.map((p, i) => (
                      <li key={p.id} className="flex items-center gap-3">
                        <span className="w-7 font-heading text-2xl font-semibold tabular-nums text-gold-400/50">
                          {i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => navigate(`/blog/${p.slug}`)}
                          className="text-left text-sm text-primary-100/80 transition-colors hover:text-gold-300"
                        >
                          {p.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-500/15 to-primary-100 p-6 dark:border-gold-700/40 dark:from-gold-900/30 dark:to-primary-900">
                  <h3 className="mb-2 font-heading text-lg font-semibold text-primary-900 dark:text-white">
                    Quarterly market briefing
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">
                    Get our flagship research report delivered to your inbox each quarter.
                  </p>
                  <Button to="/contact" variant="primary" size="sm" iconRight="arrowRight">
                    Subscribe
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
