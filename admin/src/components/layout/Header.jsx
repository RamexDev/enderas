import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { SidebarToggle } from './Sidebar'

export default function Header({ title, breadcrumbs = [], onMenuClick }) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out')
    navigate(ROUTES.LOGIN)
  }

  return (
    <header className="sticky top-0 z-30 border-b border-primary-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarToggle onClick={onMenuClick} />
          <div className="min-w-0">
            {breadcrumbs.length > 0 && (
              <nav className="mb-0.5 flex flex-wrap items-center gap-1 text-xs text-primary-500">
                {breadcrumbs.map((crumb, i) => (
                  <span key={crumb.label} className="flex items-center gap-1">
                    {i > 0 && <span>/</span>}
                    {crumb.to ? (
                      <Link to={crumb.to} className="hover:text-primary-800">{crumb.label}</Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
            <h1 className="truncate text-lg font-semibold text-primary-900">{title}</h1>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm hover:bg-primary-50"
          >
            <span className="hidden max-w-[140px] truncate sm:inline">{user?.name}</span>
            <ChevronDown className="h-4 w-4 text-primary-500" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-primary-200 bg-white py-1 shadow-lg">
                <Link
                  to={ROUTES.PROFILE}
                  className="block px-4 py-2 text-sm text-primary-800 hover:bg-primary-50"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-primary-900">{title}</h2>
        {description && <p className="mt-1 text-sm text-primary-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}
