/**
 * @fileoverview Form controls — Input, Textarea, Select, Checkbox, Label, FormField.
 * Mirror the legacy admin's Input.jsx API.
 */
import { useId, cloneElement, isValidElement } from 'react'
import { cn } from '@/utils/cn'

const baseControl =
  'w-full rounded-lg border bg-white px-3 py-2 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 disabled:bg-primary-50 disabled:text-primary-500'

export function Input({ className, error, ...props }) {
  return (
    <input
      className={cn(baseControl, 'h-10', error ? 'border-red-400' : 'border-primary-200', className)}
      {...props}
    />
  )
}

export function Textarea({ className, error, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(baseControl, 'resize-y', error ? 'border-red-400' : 'border-primary-200', className)}
      {...props}
    />
  )
}

export function Select({ className, error, children, ...props }) {
  return (
    <select
      className={cn(baseControl, 'h-10 pr-8', error ? 'border-red-400' : 'border-primary-200', className)}
      {...props}
    >
      {children}
    </select>
  )
}

export function Label({ className, children, ...props }) {
  return (
    <label className={cn('mb-1.5 block text-sm font-medium text-primary-800', className)} {...props}>
      {children}
    </label>
  )
}

export function FormField({ label, error, children, required, id, help, className }) {
  const generatedId = useId()
  const fieldId = id || generatedId
  const childWithId = isValidElement(children)
    ? cloneElement(children, { id: fieldId })
    : children

  return (
    <div className={className}>
      {label && (
        <Label htmlFor={fieldId}>
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </Label>
      )}
      {childWithId}
      {help && <p className="mt-1 text-xs text-primary-500">{help}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

export function Checkbox({ label, checked, onChange, className, ...props }) {
  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-primary-300 text-gold-500 focus:ring-gold-500/40"
        {...props}
      />
      {label && <span className="text-sm text-primary-800">{label}</span>}
    </label>
  )
}

export function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-primary-200 bg-white px-3 py-2.5">
      <div>
        {label && <div className="text-sm font-medium text-primary-800">{label}</div>}
        {description && <div className="mt-0.5 text-xs text-primary-500">{description}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40',
          checked ? 'bg-gold-500' : 'bg-primary-200',
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          )}
        />
      </button>
    </div>
  )
}
