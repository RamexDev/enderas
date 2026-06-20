/**
 * @fileoverview Route guards — ProtectedRoute (auth + optional super-admin),
 * GuestRoute (redirects authenticated users away from /login).
 */
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { PageLoader } from '@/components/ui/Loading'

export function ProtectedRoute({ children, superAdminOnly = false }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  if (isLoading) return <PageLoader label="Restoring session…" />
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }
  if (superAdminOnly && user?.role !== 'super_admin') {
    return <Navigate to={ROUTES.HOME} replace />
  }
  return children || <Outlet />
}

export function GuestRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const isLoading = useAuthStore((s) => s.isLoading)

  if (isLoading) return <PageLoader label="Restoring session…" />
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />
  return children
}
