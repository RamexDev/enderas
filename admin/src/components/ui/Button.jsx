import { cn } from '@/utils/cn'

const variants = {
  primary: 'bg-gold-500 text-primary-950 hover:bg-gold-400',
  secondary: 'border border-primary-200 bg-white text-primary-900 hover:bg-primary-50',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  ghost: 'text-primary-700 hover:bg-primary-100',
  outline: 'border border-primary-300 text-primary-800 hover:bg-primary-50',
}

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
