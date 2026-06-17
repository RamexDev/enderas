import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Container from '@/components/atoms/Container'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Logo from '@/components/organisms/Logo'
import { easeOut } from '@/components/motion/variants'
import { useContentStore } from '@/store/useContentStore'
import { useUiStore } from '@/store/useUiStore'

export default function TopNavigation() {
  const nav = useContentStore((s) => s.nav)
  const social = useContentStore((s) => s.settings.social)
  const location = useLocation()
  const navigate = useNavigate()
  const { mobileNavOpen, setMobileNavOpen, theme, toggleTheme } = useUiStore()
  const path = location.pathname
  const isHome = path === '/'
  const scrolled = useScrollScrolled()

  const regularNav = nav.filter((item) => !item.highlight)
  const highlightNav = nav.find((item) => item.highlight)

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname, setMobileNavOpen])

  const isActive = (to) => path === to || (to !== '/' && path.startsWith(to))
  const go = (to) => {
    setMobileNavOpen(false)
    navigate(to)
  }

  const navTransparent = isHome && !scrolled && !mobileNavOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileNavOpen
            ? 'border-b border-primary-100/60 bg-sand-50/95 shadow-sm backdrop-blur-md dark:border-primary-800/60 dark:bg-primary-950/95'
            : 'bg-transparent'
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-3 lg:h-[4.5rem] xl:h-20">
          <Logo onClick={() => go('/')} light={navTransparent} />

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
            {regularNav.map((item) => {
              const active = isActive(item.to)
              return (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => go(item.to)}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'text-gold-600 dark:text-gold-400'
                      : navTransparent
                        ? 'text-white/90 hover:text-gold-300'
                        : 'text-primary-800 hover:text-gold-600 dark:text-primary-100 dark:hover:text-gold-400'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gold-500"
                      transition={{ duration: 0.3, ease: easeOut }}
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
                className="ml-2 shadow-md shadow-gold-500/25"
              >
                {highlightNav.label}
              </Button>
            )}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                navTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-primary-800 hover:bg-primary-100 dark:text-primary-100 dark:hover:bg-primary-800'
              }`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" />
            </button>

            {highlightNav && (
              <Button
                to={highlightNav.to}
                size="sm"
                variant="primary"
                icon="gavel"
                className="hidden shadow-md shadow-gold-500/25 md:inline-flex xl:hidden"
              >
                <span className="hidden sm:inline">{highlightNav.label}</span>
                <span className="sm:hidden">Auctions</span>
              </Button>
            )}

            <Button
              to="/contact"
              size="sm"
              variant={scrolled || mobileNavOpen ? 'secondary' : navTransparent ? 'white' : 'secondary'}
              className="hidden lg:inline-flex"
            >
              Request a Valuation
            </Button>

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors xl:hidden ${
                navTransparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-primary-900 hover:bg-primary-100 dark:text-white dark:hover:bg-primary-800'
              }`}
            >
              <Icon name="menu" className="h-6 w-6" />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {mobileNavOpen && (
          <div className="fixed inset-0 z-[60] xl:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="absolute bottom-0 right-0 top-0 flex w-[min(100%,22rem)] flex-col bg-sand-50 shadow-2xl dark:bg-primary-950"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-16 items-center justify-between border-b border-primary-100 px-4 dark:border-primary-800 sm:px-5">
                <Logo onClick={() => go('/')} />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary-900 hover:bg-primary-100 dark:text-white dark:hover:bg-primary-800"
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
                  {nav.map((item) => (
                    <button
                      key={item.to}
                      type="button"
                      onClick={() => go(item.to)}
                      className={`rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${
                        isActive(item.to)
                          ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300'
                          : 'text-primary-900 hover:bg-primary-100 dark:text-primary-100 dark:hover:bg-primary-900'
                      } ${item.highlight ? 'font-semibold' : ''}`}
                    >
                      <span className="flex items-center gap-2">
                        {item.highlight && <Icon name="gavel" className="h-4 w-4 text-gold-600 dark:text-gold-400" />}
                        {item.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              <div className="space-y-3 border-t border-primary-100 p-4 dark:border-primary-800 sm:p-5">
                <Button to="/contact" variant="secondary" className="w-full" onClick={() => setMobileNavOpen(false)}>
                  Request a Valuation
                </Button>
                <div className="flex items-center justify-center gap-4 text-primary-600 dark:text-primary-300">
                  {social.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      className="hover:text-gold-600 dark:hover:text-gold-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={s.icon} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

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
