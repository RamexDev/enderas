import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/routes/ProtectedRoute'
import { PageLoader } from '@/components/atoms/Loader'
import { useAuthStore } from '@/store/useAuthStore'

const LoginPage = lazy(() => import('@/pages/admin/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'))
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'))
const HomepageEditorPage = lazy(() => import('@/pages/admin/HomepageEditorPage'))
const AboutEditorPage = lazy(() => import('@/pages/admin/AboutEditorPage'))
const ServicesEditorPage = lazy(() => import('@/pages/admin/ServicesEditorPage'))
const GalleryEditorPage = lazy(() => import('@/pages/admin/GalleryEditorPage'))
const BlogEditorPage = lazy(() => import('@/pages/admin/BlogEditorPage'))
const MessagesPage = lazy(() => import('@/pages/admin/MessagesPage'))

function AdminIndexRedirect() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  return <Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} replace />
}

export default function AdminRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="homepage" element={<HomepageEditorPage />} />
            <Route path="about" element={<AboutEditorPage />} />
            <Route path="services" element={<ServicesEditorPage />} />
            <Route path="gallery" element={<GalleryEditorPage />} />
            <Route path="blog" element={<BlogEditorPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Route>
        <Route index element={<AdminIndexRedirect />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}
