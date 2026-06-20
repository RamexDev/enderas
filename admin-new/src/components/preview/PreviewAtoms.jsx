/**
 * @fileoverview Shared presentational helpers used by every preview page.
 * These are simplified, animation-free versions of the public frontend's
 * molecules/atoms — they keep the same Tailwind classes and design language
 * so the preview reads as "the real site with edit affordances".
 */
import { cn } from '@/utils/cn'

export function Container({ children, className, as: Tag = 'div' }) {
  return (
    <Tag className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ''}`}>
      {children}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light = false }) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <div
          className={cn(
            'mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em]',
            align === 'center' && 'justify-center',
            light ? 'text-gold-400' : 'text-gold-600',
          )}
        >
          <span className="block h-px w-8 bg-gold-500" />
          {eyebrow}
        </div>
      )}
      {title && (
        <h2
          className={cn(
            'font-heading text-[clamp(1.625rem,4vw,2.75rem)] font-semibold leading-[1.1]',
            light ? 'text-white' : 'text-primary-900',
          )}
        >
          {title}
        </h2>
      )}
      {intro && (
        <p
          className={cn(
            'mt-3 text-base leading-relaxed',
            light ? 'text-primary-200/80' : 'text-primary-700/90',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}

export function Eyebrow({ children, light = false }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em]',
        light ? 'text-gold-400' : 'text-gold-600',
      )}
    >
      <span className="block h-px w-8 bg-gold-500" />
      {children}
    </div>
  )
}

export function PageHero({ eyebrow, title, intro, image }) {
  return (
    <section className="relative overflow-hidden bg-primary-900 pb-12 pt-24 text-white sm:pb-14 sm:pt-28 lg:pb-20 lg:pt-36">
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-950/92 to-primary-900/85" />
        </div>
      )}
      <Container className="relative">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-tight">
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-200/85">{intro}</p>}
      </Container>
    </section>
  )
}

export function CtaBand({ cta }) {
  if (!cta) return null
  return (
    <section className="relative overflow-hidden bg-primary-950 py-16 text-white lg:py-28">
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary-700/30 blur-3xl" />
      <Container className="relative text-center">
        <h2 className="mx-auto max-w-2xl font-heading text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-[1.2]">
          {cta.title}
        </h2>
        {cta.body && <p className="mx-auto mt-4 max-w-xl text-primary-200/80">{cta.body}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {cta.primary?.label && (
            <a
              href={cta.primary.to}
              className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-primary-950 shadow-sm transition-colors hover:bg-gold-400"
            >
              {cta.primary.label}
            </a>
          )}
          {cta.secondary?.label && (
            <a
              href={cta.secondary.to}
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {cta.secondary.label}
            </a>
          )}
        </div>
      </Container>
    </section>
  )
}

export function ServiceCard({ service }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-primary-100">
        {service.image ? (
          <img src={service.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-300">No image</div>
        )}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-heading text-lg font-semibold text-primary-900">{service.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-primary-600">{service.excerpt}</p>
      </div>
    </article>
  )
}

export function PropertyCard({ item }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl bg-primary-900 shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        {item.image ? (
          <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-400">No image</div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="mb-1.5 inline-flex rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-950">
          {item.category}
        </div>
        <h3 className="font-heading text-base font-semibold text-white">{item.title}</h3>
        {item.location && (
          <p className="mt-0.5 text-xs text-primary-200/70">{item.location}</p>
        )}
      </div>
    </article>
  )
}

export function StatCard({ stat }) {
  return (
    <div className="text-center">
      <div className="font-heading text-4xl font-semibold text-gold-600 sm:text-5xl">
        {stat.prefix}
        {stat.value}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm text-primary-700">{stat.label}</div>
    </div>
  )
}

export function BlogCard({ post }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
      <div className="relative aspect-[16/9] overflow-hidden bg-primary-100">
        {post.image ? (
          <img src={post.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-300">No image</div>
        )}
        <div className="absolute left-3 top-3">
          <span className="inline-flex rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary-800">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-primary-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
        <h3 className="mt-2 font-heading text-lg font-semibold text-primary-900">{post.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-primary-600">{post.excerpt}</p>
      </div>
    </article>
  )
}

export function TeamCard({ member }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
      <div className="relative aspect-[3/4] overflow-hidden bg-primary-100">
        {member.image ? (
          <img src={member.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-primary-300">No photo</div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-950/85 to-transparent p-4">
          <h3 className="font-heading text-base font-semibold text-white">{member.name}</h3>
          <p className="text-xs text-gold-300">{member.role}</p>
        </div>
      </div>
      {member.bio && (
        <p className="line-clamp-3 p-4 text-xs leading-relaxed text-primary-600">{member.bio}</p>
      )}
    </article>
  )
}

export function TestimonialCard({ item }) {
  return (
    <blockquote className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
      <p className="text-sm leading-relaxed text-primary-800">"{item.content}"</p>
      <footer className="mt-4 flex items-center gap-3">
        {item.image ? (
          <img src={item.image} alt="" className="h-11 w-11 rounded-full object-cover" />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/15 text-gold-600">
            <span className="font-heading text-sm font-semibold">{(item.name || '?')[0]}</span>
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-primary-900">{item.name}</div>
          {item.company && <div className="text-xs text-primary-500">{item.company}</div>}
        </div>
      </footer>
    </blockquote>
  )
}

export function FaqItem({ item, defaultOpen }) {
  // Plain controlled-by-default accordion item — single open per page section.
  return (
    <details className="group rounded-xl border border-primary-100 bg-white p-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-primary-900">
        {item.question}
        <span className="ml-auto shrink-0 text-primary-400 transition-transform group-open:rotate-180">▾</span>
      </summary>
      <p className="mt-2 text-sm leading-relaxed text-primary-600">{item.answer}</p>
    </details>
  )
}
