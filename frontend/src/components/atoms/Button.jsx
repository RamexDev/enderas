import { Link } from 'react-router-dom'
import Icon from './Icon'

const sizes = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-7 py-3.5',
}

const variants = {
  primary:
    'bg-gold-500 hover:bg-gold-400 text-primary-950 shadow-sm hover:shadow-md hover:-translate-y-0.5',
  secondary:
    'bg-primary-900 hover:bg-primary-800 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 dark:bg-primary-700 dark:hover:bg-primary-600',
  outline:
    'border border-primary-300 text-primary-900 hover:border-gold-500 hover:text-gold-600 dark:border-primary-600 dark:text-primary-100 dark:hover:border-gold-400',
  ghost:
    'text-primary-900 hover:bg-primary-50 dark:text-primary-100 dark:hover:bg-primary-800',
  white:
    'bg-white text-primary-900 hover:bg-sand-100 shadow-sm hover:shadow-md hover:-translate-y-0.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  type,
  children,
  className = '',
  icon,
  iconRight,
  disabled,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60'
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const content = (
    <>
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
      {iconRight && <Icon name={iconRight} className="w-4 h-4" />}
    </>
  )

  if (to) {
    // Placeholder links (e.g. auction platform not yet built) use href instead of router navigation.
    if (to === '#') {
      return (
        <a href="#" className={cls} onClick={onClick} {...rest}>
          {content}
        </a>
      )
    }
    return (
      <Link to={to} className={cls} onClick={onClick} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type={type || 'button'} onClick={onClick} className={cls} disabled={disabled} {...rest}>
      {content}
    </button>
  )
}
