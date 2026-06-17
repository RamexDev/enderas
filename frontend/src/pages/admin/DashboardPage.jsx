import { Link } from 'react-router-dom'
import { useContentStore } from '@/store/useContentStore'
import { AdminCard } from '@/components/admin/AdminForm'

function StatCard({ label, value, to }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-primary-100 bg-white p-6 transition-shadow hover:shadow-md dark:border-primary-800 dark:bg-primary-900"
    >
      <p className="text-sm text-primary-600 dark:text-primary-300">{label}</p>
      <p className="mt-2 font-heading text-3xl font-semibold text-primary-900 dark:text-white">{value}</p>
    </Link>
  )
}

export default function DashboardPage() {
  const blog = useContentStore((s) => s.blog)
  const gallery = useContentStore((s) => s.gallery)
  const services = useContentStore((s) => s.services)
  const messages = useContentStore((s) => s.messages)

  const unread = messages.filter((m) => !m.read).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-primary-600 dark:text-primary-300">
          Overview of your website content and recent activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Blog posts" value={blog.length} to="/admin/blog" />
        <StatCard label="Gallery items" value={gallery.length} to="/admin/gallery" />
        <StatCard label="Services" value={services.length} to="/admin/services" />
        <StatCard label="Unread messages" value={unread} to="/admin/messages" />
      </div>

      <AdminCard title="Quick actions">
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/blog" className="rounded-lg bg-gold-500 px-4 py-2 text-sm font-medium text-primary-950">
            Manage blog
          </Link>
          <Link to="/admin/gallery" className="rounded-lg border border-primary-200 px-4 py-2 text-sm dark:border-primary-700">
            Manage gallery
          </Link>
          <Link to="/admin/homepage" className="rounded-lg border border-primary-200 px-4 py-2 text-sm dark:border-primary-700">
            Edit homepage
          </Link>
          <Link to="/admin/settings" className="rounded-lg border border-primary-200 px-4 py-2 text-sm dark:border-primary-700">
            Site settings
          </Link>
        </div>
      </AdminCard>

      {messages.length > 0 && (
        <AdminCard title="Recent messages">
          <ul className="space-y-3">
            {messages.slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-primary-900 dark:text-white">{m.subject}</span>
                <span className="text-primary-600 dark:text-primary-300">{m.name}</span>
              </li>
            ))}
          </ul>
        </AdminCard>
      )}
    </div>
  )
}
