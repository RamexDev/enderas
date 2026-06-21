import { useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'

const SESSION_TIMEOUT_MS = 5 * 60 * 1000

export function useSessionTimeout() {
  const timerRef = useRef(null)
  const logout = useAuthStore((s) => s.logout)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      await logout()
      toast.info('Session expired due to inactivity')
      navigate(ROUTES.LOGIN, { replace: true })
    }, SESSION_TIMEOUT_MS)
  }, [logout, navigate])

  useEffect(() => {
    if (!isAuthenticated) return

    const events = ['mousedown', 'keydown', 'touchstart', 'mousemove', 'scroll']
    events.forEach((ev) => window.addEventListener(ev, resetTimer))
    resetTimer()

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isAuthenticated, resetTimer])
}
