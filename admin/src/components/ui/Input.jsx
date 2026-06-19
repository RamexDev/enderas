import { cloneElement, useId } from 'react'
import { cn } from '@/utils/cn'

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm',
        'placeholder:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
        error ? 'border-red-500' : 'border-primary-200',
        className,
      )}
      {...props}
    />
  )
}

export function Textarea({ className, error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        'flex w-full rounded-lg border bg-white px-3 py-2 text-sm',
        'placeholder:text-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
        error ? 'border-red-500' : 'border-primary-200',
        className,
      )}
      {...props}
    />
  )
}

export function Label({ className, children, ...props }) {
  return (
    <label className={cn('mb-1.5 block text-sm font-medium text-primary-800', className)} {...props}>
      {children}
    </label>
  )
}

export function FormField({ label, error, children, required, id, errorClassName, labelClassName }) {
  const generatedId = useId()
  const fieldId = id || generatedId
  const control = children && typeof children === 'object'
    ? cloneElement(children, { id: children.props.id || fieldId })
    : children

  return (
    <div className="space-y-1">
      {label && (
        <Label htmlFor={fieldId} className={labelClassName}>
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </Label>
      )}
      {control}
      {error && <p className={errorClassName || 'text-xs text-red-600'}>{error}</p>}
    </div>
  )
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(
        'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
        error ? 'border-red-500' : 'border-primary-200',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function Checkbox({ className, label, ...props }) {
  return (
    <label className={cn('flex cursor-pointer items-center gap-2 text-sm text-primary-800', className)}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-primary-300 text-gold-500 focus:ring-gold-500/40"
        {...props}
      />
      {label}
    </label>
  )
}
