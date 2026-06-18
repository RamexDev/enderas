/**
 * @fileoverview Application route definitions.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import AdminLayout from '@/components/layout/AdminLayout'
import { ProtectedRoute, GuestRoute } from '@/routes/ProtectedRoute'
import { ROUTES } from '@/constants/routes'

import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import HomepagePage from '@/pages/HomepagePage'
import HeroSlidesPage from '@/pages/HeroSlidesPage'
import ServicesPage from '@/pages/ServicesPage'
import GalleryPage from '@/pages/GalleryPage'
import PostsPage from '@/pages/PostsPage'
import PostEditorPage from '@/pages/PostEditorPage'
import CategoriesPage from '@/pages/CategoriesPage'
import TeamPage from '@/pages/TeamPage'
import TestimonialsPage from '@/pages/TestimonialsPage'
import FaqsPage from '@/pages/FaqsPage'
import AboutPage from '@/pages/AboutPage'
import CoreValuesPage from '@/pages/CoreValuesPage'
import PartnersPage from '@/pages/PartnersPage'
import ContactInfoPage from '@/pages/ContactInfoPage'
import MessagesPage from '@/pages/MessagesPage'
import MediaPage from '@/pages/MediaPage'
import SettingsPage from '@/pages/SettingsPage'
import UsersPage from '@/pages/UsersPage'
import ProfilePage from '@/pages/ProfilePage'

/**
 * Top-level router wiring all CMS pages to their URL paths.
 */
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={<GuestRoute><LoginPage /></GuestRoute>}
        />

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.HOMEPAGE} element={<HomepagePage />} />
          <Route path={ROUTES.HERO_SLIDES} element={<HeroSlidesPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
          <Route path={ROUTES.POSTS} element={<PostsPage />} />
          <Route path={`${ROUTES.POSTS}/new`} element={<PostEditorPage />} />
          <Route path={`${ROUTES.POSTS}/:id/edit`} element={<PostEditorPage />} />
          <Route path={ROUTES.POST_CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.TEAM} element={<TeamPage />} />
          <Route path={ROUTES.TESTIMONIALS} element={<TestimonialsPage />} />
          <Route path={ROUTES.FAQS} element={<FaqsPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CORE_VALUES} element={<CoreValuesPage />} />
          <Route path={ROUTES.PARTNERS} element={<PartnersPage />} />
          <Route path={ROUTES.CONTACT_INFO} element={<ContactInfoPage />} />
          <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
          <Route path={ROUTES.MEDIA} element={<MediaPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.SETTINGS} element={<ProtectedRoute superAdminOnly><SettingsPage /></ProtectedRoute>} />
          <Route path={ROUTES.USERS} element={<ProtectedRoute superAdminOnly><UsersPage /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
