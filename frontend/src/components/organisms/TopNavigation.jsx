/**
 * @fileoverview Fixed top navigation with mobile drawer and theme toggle.
 * Navigation links are static; site settings supply social links in the mobile drawer.
 */

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Logo from '@/components/organisms/Logo'
import { PUBLIC_NAV } from '@/constants/navigation'
import { useSiteStore } from '@/store/useSiteStore'
import { useUiStore } from '@/store/useUiStore'

/**
 * Primary site header with responsive navigation and assets-for-sale CTA placeholder.
 */
export default function TopNavigation() {
  const social = useSiteStore((s) => s.settings?.social) || []
  const location = useLocation()
  const navigate = useNavigate()
  const { mobileNavOpen, setMobileNavOpen, theme, toggleTheme } = useUiStore()
  const path = location.pathname
  const isHome = path === '/'
  const scrolled = useScrollScrolled()

  const regularNav = PUBLIC_NAV.filter((item) => !item.highlight)
  const highlightNav = PUBLIC_NAV.find((item) => item.highlight)

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname, setMobileNavOpen])

  /** Returns whether a nav item matches the current route. */
  const isActive = (to) => to !== '#' && (path === to || (to !== '/' && path.startsWith(to)))

  /** Navigates and closes the mobile drawer. */
  const go = (to) => {
    if (to === '#') return
    setMobileNavOpen(false)
    navigate(to)
  }

  const navTransparent = isHome && !scrolled && !mobileNavOpen
  const headerSolid = scrolled || mobileNavOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-16 transition-colors duration-200 lg:h-[4.5rem] xl:h-20 ${
          headerSolid
            ? 'border-b border-primary-100/60 bg-sand-50 shadow-sm dark:border-primary-800/60 dark:bg-primary-950'
            : 'bg-transparent'
        }`}
      >
        <Container className="flex h-full min-w-0 items-center justify-between gap-2 sm:gap-3">
          <div className="min-w-0 shrink">
            <Logo onClick={() => go('/')} light={navTransparent} />
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0 lg:flex lg:gap-0.5 xl:gap-1" aria-label="Primary">
            {regularNav.map((item) => {
              const active = isActive(item.to)
              return (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => go(item.to)}
                  className={`relative shrink-0 cursor-pointer rounded-md px-2 py-2 text-xs font-medium transition-colors xl:px-3 xl:text-sm ${
                    active
                      ? 'text-gold-600 dark:text-gold-400'
                      : navTransparent
                        ? 'text-white/90 hover:text-gold-300'
                        : 'text-primary-500 hover:text-gold-600 dark:text-primary-100 dark:hover:text-gold-400'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-gold-500 xl:left-3 xl:right-3"
                    />
                  )}
                </button>
              )
            })}
            {highlightNav && (
              <Button
                to={highlightNav.to}
                size="sm"
                variant="primary"
                icon="gavel"
                aria-label={highlightNav.label}
                className="ml-1 shrink-0 shadow-md shadow-gold-500/25 xl:ml-2"
              >
                <span className="hidden xl:inline">{highlightNav.label}</span>
                <span className="hidden lg:inline xl:hidden">Auctions</span>
              </Button>
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors bg-transparent ${
                navTransparent
                  ? 'text-white'
                  : 'text-primary-500 dark:text-primary-100'
              }`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" />
            </button>

            <span className="hidden lg:inline-flex">
              <Button
                to="/contact"
                size="sm"
                variant={headerSolid ? 'secondary' : navTransparent ? 'white' : 'secondary'}
              >
                Request Valuation
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
              className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors bg-transparent lg:hidden ${
                navTransparent
                  ? 'text-white'
                  : 'text-primary-500 dark:text-primary-100'
              }`}
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileNavOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        inert={!mobileNavOpen ? true : undefined}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={mobileNavOpen ? 0 : -1}
          onClick={() => setMobileNavOpen(false)}
          className={`absolute inset-0 cursor-pointer bg-primary-950/70 transition-opacity duration-200 ${
            mobileNavOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`absolute bottom-0 right-0 top-0 flex w-[min(100%,22rem)] flex-col bg-sand-50 shadow-2xl transition-transform duration-200 ease-out dark:bg-primary-950 ${
            mobileNavOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-primary-100 px-4 dark:border-primary-800 sm:px-5">
            <Logo onClick={() => go('/')} />
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-primary-500 bg-transparent dark:text-primary-100"
            >
              <Icon name="close" className="h-6 w-6" />
            </button>
          </div>

          <div className="no-scrollbar flex-1 overflow-y-auto p-4 sm:p-5">
            {highlightNav && (
              <Button
                to={highlightNav.to}
                variant="primary"
                icon="gavel"
                className="mb-4 w-full shadow-md shadow-gold-500/25"
                onClick={() => setMobileNavOpen(false)}
              >
                {highlightNav.label}
              </Button>
            )}

            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {regularNav.map((item) => (
                <button
                  key={item.to + item.label}
                  type="button"
                  onClick={() => (item.to === '#' ? setMobileNavOpen(false) : go(item.to))}
                  className={`rounded-lg px-4 py-3 text-left text-base font-medium transition-colors cursor-pointer ${
                    isActive(item.to)
                      ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300'
                      : 'text-primary-900 hover:bg-primary-100 dark:text-primary-100 dark:hover:bg-primary-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-3 border-t border-primary-100 p-4 dark:border-primary-800 sm:p-5">
            <Button to="/contact" variant="secondary" className="w-full" onClick={() => setMobileNavOpen(false)}>
              Request Valuation
            </Button>
            <div className="flex items-center justify-center gap-4 text-primary-500 dark:text-primary-200">
              {social.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="cursor-pointer hover:text-gold-600 dark:hover:text-gold-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/** Tracks whether the user has scrolled past the header threshold. */
function useScrollScrolled() {
  const scrolled = useUiStore((s) => s.scrolled)
  useEffect(() => {
    const onScroll = () => useUiStore.setState({ scrolled: window.scrollY > 24 })
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
}
