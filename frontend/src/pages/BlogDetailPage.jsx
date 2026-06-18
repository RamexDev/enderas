/**
 * @fileoverview Single blog article with related posts and structured data.
 */

import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import SeoHead from '@/components/organisms/SeoHead'
import EmptyState from '@/components/organisms/EmptyState'
import SectionHeading from '@/components/molecules/SectionHeading'
import { BlogCard } from '@/components/molecules/Cards'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Icon from '@/components/atoms/Icon'
import { PageLoader } from '@/components/atoms/Loader'
import { useAsyncData } from '@/hooks/useAsyncData'
import { getBlogPostBySlug, getBlogPosts } from '@/services/blogService'
import { useSiteStore } from '@/store/useSiteStore'
import { formatDateLong } from '@/utils/formatDate'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

/**
 * Renders a single blog post fetched by URL slug.
 */
export default function BlogDetailPage() {
  const { slug } = useParams()
  const social = useSiteStore((s) => s.settings?.social) || []

  const fetchPost = useCallback(async () => {
    const [post, allPosts] = await Promise.all([
      getBlogPostBySlug(slug),
      getBlogPosts({ limit: 20 }),
    ])
    return { post, allPosts: allPosts.data }
  }, [slug])

  const { data, loading, error } = useAsyncData(fetchPost, [slug])

  if (loading) return <PageLoader />

  if (error || !data?.post) {
    return (
      <>
        <SeoHead title="Article not found" noIndex />
        <section className="pb-20 pt-32">
          <Container>
            <EmptyState
              icon="search"
              title="Article not found"
              message="The article you're looking for doesn't exist or may have been removed."
              action={
                <Button to="/blog" variant="primary" icon="arrowRight">
                  Back to insights
                </Button>
              }
            />
          </Container>
        </section>
      </>
    )
  }

  const { post, allPosts } = data
  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
  const fallbackRelated = allPosts.filter((p) => p.id !== post.id).slice(0, 3)
  const finalRelated = related.length >= 3 ? related : fallbackRelated
  const isHtml = post.content?.includes('<')

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
  }

  return (
    <>
      <SeoHead
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        image={post.image}
        type="article"
        jsonLd={articleJsonLd}
      />
      <article>
        <header className="relative overflow-hidden bg-primary-950 pb-10 pt-24 text-white sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-36">
          <img src={post.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-950/85 to-primary-900/70" />
          <Container className="relative">
            <div className="max-w-3xl">
              <Link
                to="/blog"
                className="mb-5 inline-flex items-center gap-1.5 text-sm text-gold-300 hover:text-gold-200"
              >
                <Icon name="chevronLeft" className="w-4 h-4" /> All insights
              </Link>
              <Badge variant="gold" className="!mb-4 !bg-gold-500/15 !text-gold-300 !ring-gold-400/30">
                {post.category}
              </Badge>
              <h1 className="font-heading text-[clamp(1.75rem,5vw,3rem)] font-semibold leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-primary-100/70">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-700 text-gold-300">
                    <Icon name="user" className="w-4 h-4" />
                  </span>
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="calendar" className="w-4 h-4" />
                  {formatDateLong(post.date)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="clock" className="w-4 h-4" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </Container>
        </header>

        <Container className="relative -mt-6 sm:-mt-8 lg:-mt-12">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-primary-100 shadow-xl dark:bg-primary-800">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>
        </Container>

        <Container className="py-12 sm:py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-8 lg:col-start-3">
              <div className="max-w-none">
                <p className="mb-6 text-lg font-medium leading-relaxed text-primary-800 sm:mb-8 sm:text-xl dark:text-primary-100">
                  {post.excerpt}
                </p>
                {isHtml ? (
                  <div
                    className="prose prose-primary dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                  />
                ) : (
                  post.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-5 text-base leading-relaxed text-primary-800/80 dark:text-primary-200/75">
                      {para}
                    </p>
                  ))
                )}
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-primary-100 pt-6 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pt-8 dark:border-primary-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary-600 dark:text-primary-300">Share:</span>
                  {social.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={`Share on ${s.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 transition-colors hover:bg-gold-500 hover:text-primary-950 dark:bg-primary-800"
                    >
                      <Icon name={s.icon} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <Badge variant="gold">{post.category}</Badge>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-primary-100 bg-sand-50 p-5 dark:border-primary-800 dark:bg-primary-900 sm:mt-10 sm:gap-4 sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-primary-200 sm:h-14 sm:w-14">
                  <Icon name="user" className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <div>
                  <p className="mb-1 text-xs uppercase tracking-wider text-primary-600/70 dark:text-primary-300/60">
                    Written by
                  </p>
                  <h3 className="font-heading text-lg font-semibold text-primary-900 dark:text-white">{post.author}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-primary-700/80 dark:text-primary-200/70">
                    Contributor at Enderas Asset Management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {finalRelated.length > 0 && (
          <section className="border-t border-primary-100/70 bg-white py-12 dark:border-primary-800/70 dark:bg-primary-900/40 sm:py-16 lg:py-24">
            <Container>
              <SectionHeading eyebrow="Keep reading" title="Related articles" />
              <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {finalRelated.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>
    </>
  )
}
