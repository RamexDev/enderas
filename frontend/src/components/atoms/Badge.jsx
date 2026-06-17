const variants = {
  gold: 'bg-gold-50 text-gold-700 ring-gold-200 dark:bg-gold-900/30 dark:text-gold-300 dark:ring-gold-700/40',
  navy: 'bg-primary-50 text-primary-700 ring-primary-200 dark:bg-primary-800/50 dark:text-primary-200 dark:ring-primary-700',
  neutral:
    'bg-primary-100/70 text-primary-700 ring-primary-200 dark:bg-primary-800 dark:text-primary-200 dark:ring-primary-700',
}

export default function Badge({ children, variant = 'gold', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ring-1 ring-inset ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
