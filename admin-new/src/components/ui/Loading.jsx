/**
 * @fileoverview Loading + empty state primitives.
 */
import { Loader2, Inbox } from 'lucide-react'
import { cn } from '@/utils/cn'

export function Spinner({ className }) {
  return <Loader2 className={cn('h-5 w-5 animate-spin text-gold-500', className)} />
}

export function PageLoader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-primary-500">
      <Spinner className="h-8 w-8" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function EmptyState({ title, description, action, icon: Icon = Inbox }) {
  return (
    <div className="rounded-xl border border-dashed border-primary-200 bg-primary-50/50 px-6 py-16 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-500">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-primary-900">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-md text-sm text-primary-600">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}

export function Badge({ children, variant = 'default' }) {
  const variants = {
    default: 'bg-primary-100 text-primary-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-sky-100 text-sky-800',
    gold: 'bg-gold-100 text-gold-700 ring-1 ring-inset ring-gold-200',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ active }) {
  return active ? <Badge variant="success">Active</Badge> : <Badge>Inactive</Badge>
}
