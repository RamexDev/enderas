import { cn } from '@/utils/cn'

export function Card({ className, children }) {
  return (
    <div className={cn('rounded-xl border border-primary-200 bg-white shadow-sm', className)}>
      {children}
    </div>
  )
}

export function CardHeader({ className, title, description, action }) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-3 border-b border-primary-100 px-5 py-4', className)}>
      <div>
        {title && <h3 className="text-base font-semibold text-primary-900">{title}</h3>}
        {description && <p className="mt-1 text-sm text-primary-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function CardBody({ className, children }) {
  return <div className={cn('p-5', className)}>{children}</div>
}
