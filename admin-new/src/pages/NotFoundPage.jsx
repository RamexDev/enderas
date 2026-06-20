/**
 * @fileoverview NotFoundPage — 404 surface. Stays inside the visual editor
 * chrome so the user can still navigate via the sidebar.
 */
import { Link } from 'react-router-dom'
import { Container } from '@/components/preview/PreviewAtoms'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-sand-50 px-4">
      <div className="text-center">
        <div className="font-heading text-6xl font-semibold text-gold-500">404</div>
        <h1 className="mt-4 font-heading text-2xl font-semibold text-primary-900">Page not found</h1>
        <p className="mt-2 text-sm text-primary-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold-500 px-5 py-2.5 text-sm font-semibold text-primary-950 hover:bg-gold-400"
        >
          Back to the homepage editor
        </Link>
      </div>
    </div>
  )
}
