import { useNavigate } from 'react-router-dom'
import { useContentStore } from '@/store/useContentStore'

export default function Logo({ onClick, light = false }) {
  const settings = useContentStore((s) => s.settings)
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    else navigate('/')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex items-center gap-2.5"
      aria-label={`${settings.appName} home`}
    >
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-md bg-gold-500 font-heading text-xl font-bold text-primary-950 shadow-sm transition-colors group-hover:bg-gold-400">
        E
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary-900 ring-2 ring-gold-500 dark:bg-primary-950" />
      </span>
      <span
        className={`font-heading text-xl font-semibold tracking-tight ${light ? 'text-white' : 'text-primary-900 dark:text-white'}`}
      >
        {settings.appName}
        <span className="-mt-0.5 block font-body text-[10px] font-normal uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400">
          {settings.tagline}
        </span>
      </span>
    </button>
  )
}
