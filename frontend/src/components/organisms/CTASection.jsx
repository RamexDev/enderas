import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import { MotionDiv, MotionSection } from '@/components/motion'
import { useContentStore } from '@/store/useContentStore'

export function CTASection() {
  const cta = useContentStore((s) => s.cta)

  return (
    <MotionSection className="relative overflow-hidden bg-primary-950 py-16 text-white sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-primary-700/30 blur-3xl" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <MotionDiv>
            <h2 className="font-heading text-[clamp(1.75rem,4vw,2.25rem)] font-semibold leading-tight">{cta.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-primary-100/80 sm:text-base">{cta.body}</p>
          </MotionDiv>
          <MotionDiv className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center" delay={0.1}>
            <Button to={cta.primary.to} variant="primary" size="lg" iconRight="arrowRight" className="w-full sm:w-auto">
              {cta.primary.label}
            </Button>
            <Button
              to={cta.secondary.to}
              variant="outline"
              size="lg"
              className="w-full !border-white/40 !text-white hover:!border-gold-400 hover:!text-gold-300 sm:w-auto"
            >
              {cta.secondary.label}
            </Button>
          </MotionDiv>
        </div>
      </Container>
    </MotionSection>
  )
}

export function PageHero({ eyebrow, title, intro, image }) {
  return (
    <section className="relative overflow-hidden bg-primary-900 pb-12 pt-24 text-white sm:pb-14 sm:pt-28 lg:pb-20 lg:pt-36">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-950/92 to-primary-900/85" />
        </>
      )}
      <Container className="relative">
        <MotionDiv className="max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">{eyebrow}</p>
          )}
          <h1 className="font-heading text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.1] tracking-tight">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-100/80 sm:mt-5 sm:text-base lg:text-lg">
              {intro}
            </p>
          )}
        </MotionDiv>
      </Container>
    </section>
  )
}
