import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { useUnreadMessages } from '@/hooks/useUnreadMessages'
import { ROUTES } from '@/constants/routes'
import { formatDate } from '@/utils/helpers'

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const { unreadCount, recentMessages } = useUnreadMessages()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-lg border border-primary-200 p-2 text-primary-600 hover:bg-primary-50"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold leading-none text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-primary-200 bg-white shadow-lg">
            <div className="border-b border-primary-100 px-4 py-3">
              <p className="text-sm font-semibold text-primary-900">
                Notifications
              </p>
            </div>

            {recentMessages.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-primary-400">
                No unread messages
              </p>
            ) : (
              <ul className="divide-y divide-primary-100">
                {recentMessages.map((msg) => (
                  <li key={msg.id} className="px-4 py-3">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium text-primary-900">
                        {msg.subject}
                      </p>
                      <span className="shrink-0 text-xs text-primary-400">
                        {formatDate(msg.createdAt)}
                      </span>
                    </div>
                    <p className="truncate text-xs text-primary-500">
                      {msg.name}
                    </p>
                    <Link
                      to={ROUTES.MESSAGES}
                      onClick={() => setOpen(false)}
                      className="mt-1 inline-block text-xs text-gold-700 hover:underline"
                    >
                      Read
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {unreadCount > 0 && (
              <div className="border-t border-primary-100 px-4 py-2.5">
                <Link
                  to={ROUTES.MESSAGES}
                  onClick={() => setOpen(false)}
                  className="text-sm text-gold-700 hover:underline"
                >
                  View all messages →
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
