/**
 * @fileoverview Router. /login is a guest route; everything else is wrapped
 * in <ProtectedRoute> + <VisualLayout>. The visual preview pages are the
 * default surface; management pages (messages, media, settings, users) live
 * alongside them.
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ProtectedRoute, GuestRoute } from './ProtectedRoute'
import VisualLayout from '@/components/layout/VisualLayout'
import { ROUTES } from '@/constants/routes'

import LoginPage from '@/pages/LoginPage'
import HomePagePreview from '@/pages/HomePagePreview'
import AboutPagePreview from '@/pages/AboutPagePreview'
import ServicesPagePreview from '@/pages/ServicesPagePreview'
import GalleryPagePreview from '@/pages/GalleryPagePreview'
import BlogPagePreview from '@/pages/BlogPagePreview'
import ContactPagePreview from '@/pages/ContactPagePreview'
import DashboardPage from '@/pages/DashboardPage'
import MessagesPage from '@/pages/MessagesPage'
import MediaPage from '@/pages/MediaPage'
import SettingsPage from '@/pages/SettingsPage'
import ProfilePage from '@/pages/ProfilePage'
import UsersPage from '@/pages/UsersPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <VisualLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path={ROUTES.HOME} element={<HomePagePreview />} />
          <Route path={ROUTES.ABOUT} element={<AboutPagePreview />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPagePreview />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPagePreview />} />
          <Route path={ROUTES.BLOG} element={<BlogPagePreview />} />
          <Route path={ROUTES.CONTACT} element={<ContactPagePreview />} />
          <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
          <Route path={ROUTES.MEDIA} element={<MediaPage />} />
          <Route path={ROUTES.PROFILE} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route
            path={ROUTES.SETTINGS}
            element={
              <ProtectedRoute superAdminOnly>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.USERS}
            element={
              <ProtectedRoute superAdminOnly>
                <UsersPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
