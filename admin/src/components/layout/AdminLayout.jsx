import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'
import { useSessionTimeout } from '@/hooks/useSessionTimeout'
import { settingsApi } from '@/services/cmsApi'
import { mediaUrl } from '@/utils/helpers'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const logout = useAuthStore((s) => s.logout)

  useSessionTimeout()

  useEffect(() => {
    settingsApi.get().then((settings) => {
      if (settings?.favicon) {
        const href = mediaUrl(settings.favicon)
        let link = document.querySelector('link[rel="icon"]')
        if (!link) {
          link = document.createElement('link')
          link.rel = 'icon'
          document.head.appendChild(link)
        }
        link.href = href
      }
    }).catch(() => {
      // Static favicon from index.html remains on failure
    })
  }, [])

  useEffect(() => {
    const handler = () => {
      toast.error('Session expired — please sign in again')
      logout()
    }
    window.addEventListener('auth:session-expired', handler)
    return () => window.removeEventListener('auth:session-expired', handler)
  }, [logout])

  return (
    <div className="min-h-screen bg-primary-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} title="Admin" />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
