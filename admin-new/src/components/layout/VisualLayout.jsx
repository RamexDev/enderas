/**
 * @fileoverview VisualLayout — the persistent shell for authenticated routes.
 *
 * Layout:
 *   ┌────────────┬──────────────────────────────────────┐
 *   │            │ PreviewToolbar                        │
 *   │  Sidebar   ├──────────────────────────────────────┤
 *   │            │                                       │
 *   │            │  <Outlet/> — visual preview page      │
 *   │            │                                       │
 *   └────────────┴──────────────────────────────────────┘
 *
 * The EditDrawer is mounted here so any preview page can open it by calling
 * `useEditorStore.openEdit`.
 *
 * Also handles the `auth:session-expired` event dispatched by the API client
 * when a silent token refresh fails — same pattern as the legacy admin.
 */
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { Menu, Moon, Sun } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useThemeStore } from '@/store/useThemeStore'
import { useSessionTimeout } from '@/hooks/useSessionTimeout'
import Sidebar from './Sidebar'
import NotificationBell from '@/components/common/NotificationBell'
import EditDrawer from '@/components/preview/EditDrawer'
import { useSiteStore } from '@/store/useSiteStore'

export default function VisualLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const logout = useAuthStore((s) => s.logout)
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  useSessionTimeout()

  useEffect(() => {
    const onSessionExpired = async () => {
      toast.error('Your session has expired. Please sign in again.')
      await logout()
    }
    window.addEventListener('auth:session-expired', onSessionExpired)
    return () => window.removeEventListener('auth:session-expired', onSessionExpired)
  }, [logout])

  // Load site settings (logo, favicon) on mount.
  const loadSiteSettings = useSiteStore((s) => s.load)
  useEffect(() => {
    loadSiteSettings()
  }, [loadSiteSettings])

  // Close the mobile sidebar whenever the route changes.
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-sand-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        {/* Top bar — notification bell always visible; hamburger only on mobile */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-primary-200 bg-white px-4 py-2.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-md p-1.5 text-primary-700 hover:bg-primary-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-primary-900">Enderas Visual Editor</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-primary-700 transition-colors hover:bg-primary-100"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <NotificationBell />
          </div>
        </div>

        <Outlet />
      </div>

      <EditDrawer />
    </div>
  )
}
