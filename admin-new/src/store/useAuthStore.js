/**
 * @fileoverview Zustand auth store — session state, login/logout, role checks.
 * Verbatim copy of the existing admin's auth store.
 */

import { create } from 'zustand'
import { authApi } from '@/services/cmsApi'
import { clearStoredTokens, getStoredTokens, setStoredTokens } from '@/services/api'

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: async () => {
    const { accessToken } = getStoredTokens()
    if (!accessToken) {
      set({ isLoading: false, isAuthenticated: false, user: null })
      return
    }
    try {
      const user = await authApi.me()
      set({ user, isAuthenticated: true, isLoading: false })
    } catch {
      clearStoredTokens()
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  login: async (email, password) => {
    const result = await authApi.login(email, password)
    setStoredTokens({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    })
    set({ user: result.user, isAuthenticated: true })
    return result.user
  },

  logout: async () => {
    const { refreshToken } = getStoredTokens()
    try {
      if (refreshToken) await authApi.logout(refreshToken)
    } catch {
      // Backend logout is idempotent — always clear local state.
    }
    clearStoredTokens()
    set({ user: null, isAuthenticated: false })
  },

  updateUser: (user) => set({ user }),

  hasRole: (...roles) => {
    const { user } = get()
    return Boolean(user) && roles.includes(user.role)
  },
}))
