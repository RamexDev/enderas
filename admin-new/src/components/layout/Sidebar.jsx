/**
 * @fileoverview Sidebar — page navigation. First group = the six public-site
 * pages (each opens a visual preview). Second group = manage surfaces
 * (messages, media, settings, users).
 *
 * Active state: exact match for "/", starts-with for everything else.
 */
import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, X, UserCircle } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'
import { useEditorStore } from '@/store/useEditorStore'
import { useSiteStore } from '@/store/useSiteStore'
import { getVisibleNavGroups } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'

export default function Sidebar({ open, onClose }) {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const setEditMode = useEditorStore((s) => s.setEditMode)
  const logo = useSiteStore((s) => s.logo)
  const navigate = useNavigate()
  const navGroups = getVisibleNavGroups(user?.role)

  const handleLogout = async () => {
    await logout()
    toast.success('Signed out')
    navigate(ROUTES.LOGIN, { replace: true })
  }

  const appName = import.meta.env.VITE_APP_NAME || 'Enderas Visual Editor'

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-primary-950/60 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-primary-950 text-primary-200 transition-transform lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-primary-800/70 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg">
              {logo ? (
                <img src={logo} alt="" className="h-full w-full object-contain p-1" />
              ) : (
                <span className="font-heading text-base font-semibold text-primary-950">E</span>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-white">{appName}</h1>
              <p className="truncate text-[11px] text-gold-400">Visual editor</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-md p-1.5 text-primary-300 hover:bg-primary-800 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="scroll-area flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary-400">
                {group.label}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => {
                          // Reset to edit mode when navigating to a new page.
                          setEditMode(true)
                          onClose?.()
                        }}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                            isActive
                              ? 'bg-gold-500/15 text-gold-300'
                              : 'text-primary-200 hover:bg-primary-800/60 hover:text-white',
                          )
                        }
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-primary-800/70 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-md bg-primary-900/60 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
              <UserCircle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-white">{user?.name || 'Signed in'}</div>
              <div className="truncate text-[11px] text-primary-400">
                {user?.email}
                {user?.role === 'super_admin' && (
                  <span className="ml-1 rounded bg-gold-500/20 px-1 py-0.5 text-[9px] uppercase tracking-wider text-gold-300">
                    Super admin
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full text-primary-200 hover:bg-primary-800 hover:text-white" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>
    </>
  )
}
