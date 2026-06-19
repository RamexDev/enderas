import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('@/store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

describe('LoginPage', () => {
  const login = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuthStore).mockImplementation((selector) =>
      selector({ login }),
    )
  })

  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /enderas cms/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('submits credentials and navigates to the dashboard on success', async () => {
    const user = userEvent.setup()
    login.mockResolvedValue({ id: 1, role: 'super_admin' })

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/email/i), 'admin@enderas.com')
    await user.type(screen.getByLabelText(/^password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('admin@enderas.com', 'password123')
    })
    expect(toast.success).toHaveBeenCalledWith('Welcome back')
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true })
  })

  it('shows validation error for invalid email', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/^password/i), 'secret')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/valid email is required/i)).toBeInTheDocument()
    expect(login).not.toHaveBeenCalled()
  })

  it('shows an error toast when login fails', async () => {
    const user = userEvent.setup()
    login.mockRejectedValue(new Error('Invalid email or password'))

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/email/i), 'admin@enderas.com')
    await user.type(screen.getByLabelText(/^password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid email or password')
    })
  })
})
