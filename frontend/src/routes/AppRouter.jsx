import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoutes from '@/routes/PublicRoutes'
import AdminRoutes from '@/routes/AdminRoutes'
import ErrorBoundary from '@/components/organisms/ErrorBoundary'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
