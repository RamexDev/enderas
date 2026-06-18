import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Spinner({ className }) {
  return <Loader2 className={cn('h-5 w-5 animate-spin text-gold-500', className)} />
}

export function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-16 text-center">
      <h3 className="text-base font-medium text-primary-900">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-primary-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
