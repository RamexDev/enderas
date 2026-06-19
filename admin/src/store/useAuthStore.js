/**
 * @fileoverview Zustand auth store — session state, login/logout, role checks.
 */

import { create } from 'zustand'
import { authApi } from '@/services/cmsApi'
import { clearStoredTokens, getStoredTokens, setStoredTokens } from '@/services/api'

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  /**
   * Restores session from stored tokens on app boot.
   * Called once from `App.jsx` on mount.
   */
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

  /**
   * Authenticates the user and persists tokens to sessionStorage.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} Authenticated user object.
   */
  login: async (email, password) => {
    const result = await authApi.login(email, password)
    setStoredTokens({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    })
    set({ user: result.user, isAuthenticated: true })
    return result.user
  },

  /** Invalidates refresh token on the server and clears local session. */
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

  /** Merges partial user data after profile updates. */
  updateUser: (user) => set({ user }),

  /**
   * Checks whether the current user has one of the given roles.
   * @param {...string} roles
   * @returns {boolean}
   */
  hasRole: (...roles) => {
    const { user } = get()
    return user && roles.includes(user.role)
  },
}))
