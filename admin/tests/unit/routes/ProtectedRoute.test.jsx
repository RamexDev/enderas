import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { ROLES } from '@/constants/roles'

vi.mock('@/store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}))

function renderProtected(initialPath = '/settings', superAdminOnly = true) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/settings"
          element={
            <ProtectedRoute superAdminOnly={superAdminOnly}>
              <div>Settings content</div>
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<div>Login page</div>} />
        <Route path={ROUTES.DASHBOARD} element={<div>Dashboard</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.mocked(useAuthStore).mockReset()
  })

  it('redirects unauthenticated users to login', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      user: null,
    })

    renderProtected()
    expect(screen.getByText('Login page')).toBeInTheDocument()
  })

  it('renders children for authenticated users', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { role: ROLES.SUPER_ADMIN },
    })

    renderProtected()
    expect(screen.getByText('Settings content')).toBeInTheDocument()
  })

  it('redirects editors away from super-admin-only routes', () => {
    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      user: { role: ROLES.EDITOR },
    })

    renderProtected('/settings', true)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
