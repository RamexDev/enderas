import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ADMIN_NAV } from '@/constants/routes'
import { useAuthStore } from '@/store/useAuthStore'
import { useUiStore } from '@/store/useUiStore'
import Icon from '@/components/atoms/Icon'
import Button from '@/components/atoms/Button'

export default function AdminLayout() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const { mobileNavOpen, setMobileNavOpen } = useUiStore()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-sand-50 dark:bg-primary-950">
      <Toaster position="top-right" richColors closeButton />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-primary-100 bg-white transition-transform dark:border-primary-800 dark:bg-primary-900 lg:static lg:translate-x-0 ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Admin sidebar"
      >
        <div className="flex h-16 items-center border-b border-primary-100 px-5 dark:border-primary-800">
          <span className="font-heading text-lg font-semibold text-primary-900 dark:text-white">
            Enderas CMS
          </span>
        </div>
        <nav className="space-y-1 p-4">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileNavOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300'
                    : 'text-primary-700 hover:bg-primary-50 dark:text-primary-200 dark:hover:bg-primary-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-primary-100 p-4 dark:border-primary-800">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </aside>

      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-primary-950/50 lg:hidden"
          aria-label="Close sidebar"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-primary-100 bg-white px-5 dark:border-primary-800 dark:bg-primary-900">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-primary-800 lg:hidden dark:text-primary-100"
            aria-label="Open sidebar"
            onClick={() => setMobileNavOpen(true)}
          >
            <Icon name="menu" className="w-5 h-5" />
          </button>
          <p className="text-sm text-primary-600 dark:text-primary-300">Content Management</p>
          <Button variant="ghost" size="sm" to="/" className="hidden sm:inline-flex">
            View site
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
