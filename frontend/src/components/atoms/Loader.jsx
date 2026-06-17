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

export function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-primary-100 dark:bg-primary-800 ${className}`}
      aria-hidden="true"
    />
  )
}
