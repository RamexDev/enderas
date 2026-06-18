/**
 * @fileoverview Main public site layout — navigation, page outlet, footer.
 * Initializes global site settings on mount for shared layout components.
 */

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import TopNavigation from '@/components/organisms/TopNavigation'
import Footer from '@/components/organisms/Footer'
import { useSiteStore } from '@/store/useSiteStore'

/**
 * Wraps all public routes with persistent header/footer and page transitions.
 */
export default function MainLayout() {
  const { pathname } = useLocation()
  const initialize = useSiteStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const settings = useSiteStore((s) => s.settings)

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-sand-50 dark:bg-primary-950">
      {settings.favicon && (
        <Helmet>
          <link rel="icon" type="image/svg+xml" href={settings.favicon} />
        </Helmet>
      )}
      <a href="#main-content" className="sr-only">
        Skip to content
      </a>
      <TopNavigation />
      <main id="main-content" className="flex-1">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
