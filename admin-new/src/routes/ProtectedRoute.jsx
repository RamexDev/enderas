/**
 * @fileoverview Route guards for authenticated and guest-only pages.
 */

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { PageLoader } from '@/components/ui/Loading'
import { isSuperAdmin } from '@/constants/roles'

/**
 * Redirects unauthenticated users to login.
 * Optionally restricts access to super-admin role.
 *
 * @param {{ children?: React.ReactNode, superAdminOnly?: boolean }} props
 */
export function ProtectedRoute({ children, superAdminOnly = false }) {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const location = useLocation()

  if (isLoading) return <PageLoader />

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (superAdminOnly && !isSuperAdmin(user?.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return children || <Outlet />
}

/**
 * Redirects authenticated users away from the login page.
 * @param {{ children: React.ReactNode }} props
 */
export function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) return <PageLoader />

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />
  }

  return children
}
