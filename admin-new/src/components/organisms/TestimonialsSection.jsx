/**
 * @fileoverview Homepage testimonials carousel/grid — rendered when CMS visibility is enabled.
 */

import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import SectionHeading from '@/components/molecules/SectionHeading'
import { MotionSection, MotionStagger, MotionItem } from '@/components/motion'

/**
 * Displays client testimonials from the CMS.
 * @param {{ title: object, items: Array }} props
 * @param {object} props.title - Section heading fields (`eyebrow`, `title`, `intro`)
 * @param {Array} props.items - Mapped testimonial objects
 */
export default function TestimonialsSection({ title, items = [] }) {
  if (!items.length) return null

  return (
    <MotionSection className="section-padding bg-sand-100/60 dark:bg-primary-900/30">
      <Container>
        <SectionHeading
          eyebrow={title.eyebrow}
          title={title.title}
          intro={title.intro}
          align="center"
        />
        <MotionStagger className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MotionItem key={item.id}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-primary-100/80 bg-white p-6 shadow-sm dark:border-primary-800 dark:bg-primary-900 sm:p-7">
                <Icon name="quote" className="mb-4 h-8 w-8 text-gold-500/40" />
                <p className="flex-1 text-sm leading-relaxed text-primary-800/90 dark:text-primary-100/90">
                  &ldquo;{item.content}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3 border-t border-primary-100 pt-5 dark:border-primary-800">
                  {item.image && (
                    <img
                      src={item.image}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <cite className="not-italic font-semibold text-primary-900 dark:text-white">{item.name}</cite>
                    {item.company && (
                      <p className="text-xs text-primary-500 dark:text-primary-200">{item.company}</p>
                    )}
                  </div>
                </footer>
              </blockquote>
            </MotionItem>
          ))}
        </MotionStagger>
      </Container>
    </MotionSection>
  )
}
