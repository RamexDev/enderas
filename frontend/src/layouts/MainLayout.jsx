import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import TopNavigation from '@/components/organisms/TopNavigation'
import Footer from '@/components/organisms/Footer'
import { PageTransition } from '@/components/motion'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-sand-50 dark:bg-primary-950">
      <a href="#main-content" className="sr-only">
        Skip to content
      </a>
      <TopNavigation />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
