export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
      <span className="text-sm text-primary-600 dark:text-primary-300">{label}</span>
    </div>
  )
}

export function PageLoader() {
  return <Loader label="Loading page…" />
}

export function GoldSpinner({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-200/60 border-t-gold-500 dark:border-primary-700/60 dark:border-t-gold-500" />
    </div>
  )
}

export function Skeleton({ className = '', gold = false }) {
  return (
    <div
      className={`relative isolate overflow-hidden rounded-xl ${
        gold
          ? 'bg-gradient-to-br from-primary-100 via-gold-100/20 to-primary-100 dark:from-primary-800 dark:via-gold-900/15 dark:to-primary-800'
          : 'bg-primary-100/80 dark:bg-primary-800/80'
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent ${
          gold
            ? 'via-gold-300/40 to-transparent dark:via-gold-600/20'
            : 'via-primary-200/40 to-transparent dark:via-primary-700/30'
        }`}
      />
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '', gold = false }) {
  return (
    <div className={`space-y-2.5 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          gold={gold}
          className={`h-3.5 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ className = '', gold = false }) {
  return <Skeleton gold={gold} className={`rounded-2xl ${className}`} />
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-primary-900 pb-12 pt-24 sm:pb-14 sm:pt-28 lg:pb-20 lg:pt-36">
        <Skeleton className="absolute inset-0 !rounded-none !bg-primary-800" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GoldSpinner className="mb-6" />
          <div className="max-w-3xl space-y-4">
            <Skeleton gold className="h-5 w-32" />
            <Skeleton gold className="h-12 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}
