export default function SectionHeading({ eyebrow, title, intro, align = 'left', light = false }) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <div className={`mb-3 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="block h-px w-8 bg-gold-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600 dark:text-gold-400">
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`font-heading text-[clamp(1.625rem,4vw,2.75rem)] font-semibold leading-[1.1] ${light ? 'text-white' : 'text-primary-900 dark:text-white'}`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed ${light ? 'text-primary-100/80' : 'text-primary-700/95 dark:text-primary-200/85'}`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
