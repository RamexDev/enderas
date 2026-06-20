/**
 * @fileoverview Homepage FAQ accordion — rendered when CMS visibility is enabled.
 */

import { useState } from 'react'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import SectionHeading from '@/components/molecules/SectionHeading'
import { MotionDiv, MotionSection } from '@/components/motion'

/**
 * Single expandable FAQ item with keyboard support.
 * @param {{ item: object, isOpen: boolean, onToggle: () => void }} props
 */
function FaqItem({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`

  return (
    <div className="border-b border-primary-100/80 dark:border-primary-800/80">
      <button
        type="button"
        id={`faq-trigger-${item.id}`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-primary-900 dark:text-white sm:text-lg">
          {item.question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-transform dark:bg-primary-800 dark:text-primary-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <Icon name="chevronDown" className="h-4 w-4" />
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
        hidden={!isOpen}
        className="pb-5 text-sm leading-relaxed text-primary-700/95 dark:text-primary-200/85"
      >
        {item.answer}
      </div>
    </div>
  )
}

/**
 * Displays frequently asked questions from the CMS in an accordion layout.
 * @param {{ title: object, items: Array }} props
 */
export default function FaqSection({ title, items = [] }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)

  if (!items.length) return null

  return (
    <MotionSection className="section-padding">
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow={title.eyebrow}
            title={title.title}
            intro={title.intro}
            align="center"
          />
          <MotionDiv className="mt-10 rounded-2xl border border-primary-100/80 bg-white px-5 dark:border-primary-800 dark:bg-primary-900 sm:px-8">
            {items.map((item) => (
              <FaqItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </MotionDiv>
        </div>
      </Container>
    </MotionSection>
  )
}
