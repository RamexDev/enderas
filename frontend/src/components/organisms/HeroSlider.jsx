import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Badge from '@/components/atoms/Badge'
import { easeOut } from '@/components/motion/variants'
import { useContentStore } from '@/store/useContentStore'

const contentVariants = {
  enter: { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}

export default function HeroSlider() {
  const slides = useContentStore((s) => s.slides)
  const [active, setActive] = useState(0)
  const count = slides.length
  const slide = slides[active]
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reducedMotion || count <= 1) return undefined
    const id = setInterval(() => setActive((a) => (a + 1) % count), 7000)
    return () => clearInterval(id)
  }, [count, reducedMotion])

  const go = (i) => setActive((i + count) % count)

  return (
    <section className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-primary-950 sm:min-h-[600px] lg:min-h-[640px]" aria-label="Hero carousel">
      <AnimatePresence mode="sync">
        {slides.map((s, i) =>
          i === active ? (
            <motion.div
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 1, ease: easeOut }}
              className="absolute inset-0"
              aria-hidden={i !== active}
            >
              <img
                src={s.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${!reducedMotion ? 'animate-ken-burns' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-950/88 via-primary-950/65 to-primary-900/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-primary-950/35" />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>

      <Container className="relative flex h-full flex-col justify-end pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-3xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={reducedMotion ? undefined : contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <Badge variant="gold" className="!bg-gold-500/15 !text-gold-300 !ring-gold-400/30">
                <Icon name="sparkles" className="h-3 w-3" /> {slide.eyebrow}
              </Badge>
              <h1 className="mt-4 font-heading text-[clamp(1.875rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight sm:mt-5">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-100/85 sm:mt-6 sm:text-base lg:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                <Button to={slide.cta.to} variant="primary" size="lg" iconRight="arrowRight" className="w-full sm:w-auto">
                  {slide.cta.label}
                </Button>
                <Button
                  to={slide.cta2.to}
                  variant="outline"
                  size="lg"
                  className="w-full !border-white/40 !text-white hover:!border-gold-400 hover:!text-gold-300 sm:w-auto"
                >
                  {slide.cta2.label}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 right-4 hidden items-center gap-2 sm:bottom-8 sm:right-6 sm:flex lg:right-8">
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

        <div className="absolute bottom-8 left-4 flex items-center gap-2 sm:left-6 lg:left-8" role="tablist" aria-label="Slide indicators">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className="group relative h-1 overflow-hidden rounded-full bg-white/30"
              style={{ width: i === active ? 40 : 20 }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-gold-500"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  )
}
