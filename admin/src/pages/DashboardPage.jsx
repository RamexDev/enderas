/**
 * @fileoverview Dashboard home — aggregate stats, quick actions, recent messages.
 */

import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { dashboardApi, contactApi } from '@/services/cmsApi'
import { ROUTES } from '@/constants/routes'
import { formatDate } from '@/utils/helpers'
import { useAsyncData } from '@/hooks'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import StatCard from '@/components/common/StatCard'
import Button from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

/** Loads dashboard stats and the five most recent contact messages in parallel. */
function useDashboardData() {
  const fetcher = useCallback(async () => {
    const [stats, messagesData] = await Promise.all([
      dashboardApi.getStats(),
      contactApi.listMessages({ page: 1, limit: 5 }),
    ])
    return { stats, messages: messagesData.data }
  }, [])

  return useAsyncData(fetcher)
}

/** Main dashboard view shown after login. */
export default function DashboardPage() {
  const { data, loading } = useDashboardData()

  if (loading || !data) return <PageLoader />

  const { stats, messages } = data

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your website content and recent activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Blog Posts" value={stats.posts} to={ROUTES.POSTS} />
        <StatCard label="Services" value={stats.services} to={ROUTES.SERVICES} />
        <StatCard label="Gallery Items" value={stats.gallery} to={ROUTES.GALLERY} />
        <StatCard label="Team Members" value={stats.team} to={ROUTES.TEAM} />
        <StatCard label="Testimonials" value={stats.testimonials} to={ROUTES.TESTIMONIALS} />
        <StatCard label="Contact Messages" value={stats.messages} to={ROUTES.MESSAGES} />
      </div>

      <Card>
        <CardBody>
          <h3 className="mb-4 font-semibold text-primary-900">Quick actions</h3>
          <div className="flex flex-wrap gap-3">
            <Link to={`${ROUTES.POSTS}/new`}><Button size="sm">Create blog post</Button></Link>
            <Link to={ROUTES.MEDIA}><Button size="sm" variant="secondary">Upload media</Button></Link>
            <Link to={ROUTES.SERVICES}><Button size="sm" variant="secondary">Manage services</Button></Link>
            <Link to={ROUTES.GALLERY}><Button size="sm" variant="secondary">Add gallery item</Button></Link>
          </div>
        </CardBody>
      </Card>

      {messages.length > 0 && (
        <Card>
          <CardBody>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-primary-900">Recent messages</h3>
              {stats.unreadMessages > 0 && (
                <span className="text-sm text-amber-700">{stats.unreadMessages} unread</span>
              )}
            </div>
            <ul className="divide-y divide-primary-100">
              {messages.map((message) => (
                <li key={message.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <div>
                    <p className="font-medium text-primary-900">{message.subject}</p>
                    <p className="text-primary-500">{message.name} · {message.email}</p>
                  </div>
                  <span className="text-primary-400">{formatDate(message.createdAt)}</span>
                </li>
              ))}
            </ul>
            <Link to={ROUTES.MESSAGES} className="mt-4 inline-block text-sm text-gold-700 hover:underline">
              View all messages →
            </Link>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
