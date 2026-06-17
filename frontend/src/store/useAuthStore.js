import { create } from 'zustand'
import { AUTH_KEY } from '@/constants/routes'

export const useAuthStore = create((set) => ({
  isAuthenticated: sessionStorage.getItem(AUTH_KEY) === 'true',

  login: (password) => {
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || 'enderas-admin'
    if (password === expected) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      set({ isAuthenticated: true })
      return true
    }
    return false
  },

  logout: () => {
    sessionStorage.removeItem(AUTH_KEY)
    set({ isAuthenticated: false })
  },
}))
