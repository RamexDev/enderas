/**
 * @fileoverview Root application component.
 * Restores auth session on mount, then renders the router.
 */

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import AppRoutes from '@/routes/AppRoutes'
import { PageLoader } from '@/components/ui/Loading'

/**
 * Application root — initializes auth before rendering routes.
 */
export default function App() {
  const { initialize, isLoading } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PageLoader />
      </div>
    )
  }

  return <AppRoutes />
}
