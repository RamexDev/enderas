/**
 * @fileoverview Full-viewport hero carousel with auto-rotation and CMS-driven slides.
 */

import { useEffect, useState } from 'react'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Badge from '@/components/atoms/Badge'

/**
 * Renders the homepage hero slider from CMS slide data passed by the parent page.
 * @param {{ slides: Array }} props
 * @param {Array} props.slides - Mapped hero slide objects
 */
export default function HeroSlider({ slides = [] }) {
  const [active, setActive] = useState(0)
  const count = slides.length
  const slide = slides[active] || slides[0]
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!slides[0]?.image) return undefined
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = slides[0].image
    document.head.appendChild(link)
    return () => link.remove()
  }, [slides])

  useEffect(() => {
    if (reducedMotion || count <= 1) return undefined
    const id = setInterval(() => setActive((a) => (a + 1) % count), 7000)
    return () => clearInterval(id)
  }, [count, reducedMotion])

  if (!slide) return null

  /** Wraps to a valid slide index. */
  const go = (i) => setActive((i + count) % count)

  return (
    <section
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-primary-950 sm:min-h-[600px] lg:min-h-[640px]"
      aria-label="Hero carousel"
    >
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${
            i === active ? 'z-10 opacity-100' : 'z-0 opacity-0'
          }`}
          aria-hidden={i !== active}
        >
          <img
            src={s.image}
            alt=""
            width={1920}
            height={1080}
            decoding="async"
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
            className={`absolute inset-0 h-full w-full object-cover ${!reducedMotion ? 'animate-ken-burns' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950/88 via-primary-950/65 to-primary-900/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-primary-950/35" />
        </div>
      ))}

      <Container className="relative z-20 flex h-full flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <div className="relative max-w-3xl min-h-[16.5rem] text-white sm:min-h-[18rem] lg:min-h-[19.5rem]">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`transition-opacity duration-500 ease-out ${
                i === active
                  ? 'relative z-10 opacity-100'
                  : 'pointer-events-none absolute inset-0 z-0 opacity-0'
              }`}
              aria-hidden={i !== active}
            >
              <Badge variant="gold" className="!bg-gold-500/15 !text-gold-300 !ring-gold-400/30">
                <Icon name="sparkles" className="h-3 w-3" /> {s.eyebrow}
              </Badge>
              <h1 className="mt-4 font-heading text-[clamp(1.875rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight sm:mt-5">
                {s.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-100/85 sm:mt-6 sm:text-base lg:text-lg">
                {s.subtitle}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <Button to={s.cta.to} variant="primary" size="lg" iconRight="arrowRight" className="w-full sm:w-auto">
                  {s.cta.label}
                </Button>
                <Button
                  to={s.cta2.to}
                  variant="outline"
                  size="lg"
                  className="w-full !border-white/40 !text-white hover:!border-gold-400 hover:!text-gold-300 sm:w-auto"
                >
                  {s.cta2.label}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 right-4 flex items-center gap-2 sm:bottom-8 sm:right-6 lg:right-8">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-primary-950 lg:h-11 lg:w-11"
          >
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-primary-950 lg:h-11 lg:w-11"
          >
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-3 sm:bottom-8 sm:left-6 sm:right-auto sm:justify-start lg:left-8" role="tablist" aria-label="Slide indicators">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === active ? 'w-10 bg-gold-500' : 'w-5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
