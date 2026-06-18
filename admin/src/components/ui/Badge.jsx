import { cn } from '@/utils/cn'

const variants = {
  default: 'bg-primary-100 text-primary-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-sky-100 text-sky-800',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ active }) {
  return (
    <Badge variant={active ? 'success' : 'default'}>
      {active ? 'Active' : 'Inactive'}
    </Badge>
  )
}

export function PublishBadge({ status }) {
  return (
    <Badge variant={status === 'published' ? 'success' : 'warning'}>
      {status === 'published' ? 'Published' : 'Draft'}
    </Badge>
  )
}
