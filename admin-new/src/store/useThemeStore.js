import { create } from 'zustand'

const STORAGE_KEY = 'enderas-admin-theme'

export const useThemeStore = create((set) => ({
  theme: (() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'light'
    } catch {
      return 'light'
    }
  })(),

  setTheme: (theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    set({ theme })
  },

  toggleTheme: () => {
    const next = useThemeStore.getState().theme === 'dark' ? 'light' : 'dark'
    useThemeStore.getState().setTheme(next)
  },
}))

if (typeof document !== 'undefined') {
  const theme = useThemeStore.getState().theme
  if (theme === 'dark') document.documentElement.classList.add('dark')
}
