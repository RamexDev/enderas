/**
 * @fileoverview Button — variant + size. Mirrors the legacy admin's Button.
 */
import { cn } from '@/utils/cn'

const VARIANTS = {
  primary: 'bg-gold-500 text-primary-950 hover:bg-gold-400 shadow-sm hover:shadow-md',
  secondary: 'border border-primary-200 bg-white text-primary-900 hover:bg-primary-50',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  ghost: 'text-primary-700 hover:bg-primary-100',
  outline: 'border border-primary-300 text-primary-800 hover:bg-primary-50',
  white: 'bg-white text-primary-900 hover:bg-sand-100 shadow-sm',
  dark: 'bg-primary-900 text-white hover:bg-primary-800',
}

const SIZES = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
  icon: 'h-9 w-9 p-0',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 disabled:opacity-50 disabled:pointer-events-none',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
