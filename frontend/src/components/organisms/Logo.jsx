import { useNavigate } from 'react-router-dom'
import { DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'
import { useSiteStore } from '@/store/useSiteStore'

export default function Logo({ onClick, light = false }) {
  const storeSettings = useSiteStore((s) => s.settings)
  const settings = storeSettings || DEFAULT_SITE_SETTINGS
  const navigate = useNavigate()

  const handleClick = () => {
    if (onClick) onClick()
    else navigate('/')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex min-w-0 max-w-full items-center gap-2 sm:gap-2.5"
      aria-label={`${settings.appName} home`}
    >
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gold-500 font-heading text-lg font-bold text-primary-950 shadow-sm transition-colors group-hover:bg-gold-400 sm:h-10 sm:w-10 sm:text-xl">
        E
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary-900 ring-2 ring-gold-500 dark:bg-primary-950 sm:h-3 sm:w-3" />
      </span>
      <span
        className={`min-w-0 truncate text-left font-heading text-base font-semibold tracking-tight sm:text-lg lg:text-xl ${light ? 'text-white' : 'text-primary-900 dark:text-white'}`}
      >
        <span className="block truncate">{settings.appName}</span>
        <span className="-mt-0.5 hidden truncate font-body text-[10px] font-normal uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 sm:block">
          {settings.tagline}
        </span>
      </span>
    </button>
  )
}
