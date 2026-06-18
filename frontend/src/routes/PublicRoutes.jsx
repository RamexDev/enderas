import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import { PageLoader } from '@/components/atoms/Loader'

const HomePage = lazy(() => import('@/pages/public/HomePage'))
const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const ServicesPage = lazy(() => import('@/pages/public/ServicesPage'))
const GalleryPage = lazy(() => import('@/pages/public/GalleryPage'))
const BlogPage = lazy(() => import('@/pages/public/BlogPage'))
const BlogDetailPage = lazy(() => import('@/pages/public/BlogDetailPage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'))

/**
 * Public website route definitions with lazy-loaded pages.
 * Assets-for-sale has no dedicated route — the nav CTA points to # until the auction site is ready.
 */
export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route
          path="services"
          element={
            <Suspense fallback={<PageLoader />}>
              <ServicesPage />
            </Suspense>
          }
        />
        <Route
          path="gallery"
          element={
            <Suspense fallback={<PageLoader />}>
              <GalleryPage />
            </Suspense>
          }
        />
        <Route
          path="blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="blog/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogDetailPage />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
