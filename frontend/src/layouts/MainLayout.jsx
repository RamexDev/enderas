/**
 * @fileoverview Main public site layout — navigation, page outlet, footer.
 * Initializes global site settings on mount for shared layout components.
 */

import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import TopNavigation from '@/components/organisms/TopNavigation'
import Footer from '@/components/organisms/Footer'
import { useSiteStore } from '@/store/useSiteStore'

/**
 * Wraps all public routes with persistent header/footer and page transitions.
 */
export default function MainLayout() {
  const initialize = useSiteStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-sand-50 dark:bg-primary-950">
      <a href="#main-content" className="sr-only">
        Skip to content
      </a>
      <TopNavigation />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
