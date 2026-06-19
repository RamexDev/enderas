/**
 * @fileoverview Primary sidebar navigation for the admin shell.
 * Navigation items are defined in `@/constants/navigation` and filtered by role.
 */

import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { getVisibleNavGroups } from '@/constants/navigation'
import { useAuthStore } from '@/store/useAuthStore'

/**
 * Single sidebar link with active-state styling.
 * @param {{ to: string, label: string, icon: import('lucide-react').LucideIcon, onNavigate?: () => void }} props
 */
function NavLink({ to, label, icon: Icon, onNavigate }) {
  const location = useLocation()
  const active = location.pathname === to || location.pathname.startsWith(`${to}/`)

  return (
    <Link
      to={to}
      onClick={onNavigate}
        className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50',
        active
          ? 'bg-gold-500/15 text-gold-400'
          : 'text-primary-300 hover:bg-primary-800 hover:text-white',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  )
}

/**
 * Fixed sidebar with grouped navigation links.
 * Collapses off-screen on mobile; controlled by `open` / `onClose` from the layout.
 * @param {{ open: boolean, onClose: () => void }} props
 */
export default function Sidebar({ open, onClose }) {
  const user = useAuthStore((s) => s.user)
  const appName = import.meta.env.VITE_APP_NAME || 'Enderas CMS'
  const navGroups = getVisibleNavGroups(user?.role)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-primary-950/60 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary-900 text-white transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-primary-800 px-4">
          <div>
            <p className="text-sm font-semibold text-gold-400">{appName}</p>
            <p className="text-xs text-primary-300">Content Management</p>
          </div>
          <button type="button" className="rounded-lg p-1 text-primary-300 hover:bg-primary-800 lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-primary-300">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.to} {...item} onNavigate={onClose} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

/**
 * Mobile hamburger control shown in the top header.
 * @param {{ onClick: () => void }} props
 */
export function SidebarToggle({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-primary-200 p-2 text-primary-700 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 lg:hidden"
      aria-label="Toggle menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
