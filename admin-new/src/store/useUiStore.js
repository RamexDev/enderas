import { create } from 'zustand'

export const useUiStore = create((set) => ({
  mobileNavOpen: false,
  scrolled: false,
  theme: (() => {
    try {
      return localStorage.getItem('enderas-theme') || 'light'
    } catch {
      return 'light'
    }
  })(),

  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),

  setTheme: (theme) => {
    try {
      localStorage.setItem('enderas-theme', theme)
    } catch {
      // ignore
    }
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    set({ theme })
  },

  toggleTheme: () => {
    const next = useUiStore.getState().theme === 'dark' ? 'light' : 'dark'
    useUiStore.getState().setTheme(next)
  },
}))

// Apply theme on load
if (typeof document !== 'undefined') {
  const theme = useUiStore.getState().theme
  if (theme === 'dark') document.documentElement.classList.add('dark')
}
