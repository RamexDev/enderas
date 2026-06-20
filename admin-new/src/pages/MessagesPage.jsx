/**
 * @fileoverview MessagesPage — list + view inbound contact messages.
 * Mirrors the legacy admin's Messages page but with the visual editor's
 * styling.
 */
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Archive, ArchiveRestore, Eye, Mail, MailOpen, Trash2 } from 'lucide-react'
import ManagePage from '@/components/preview/ManagePage'
import Button from '@/components/ui/Button'
import { Badge, PageLoader, EmptyState } from '@/components/ui/Loading'
import Modal from '@/components/ui/Modal'
import { contactApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { formatDateTime } from '@/utils/helpers'

export default function MessagesPage() {
  const [view, setView] = useState('inbox') // 'inbox' | 'archived'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [active, setActive] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await contactApi.listMessages({ page: 1, limit: 50, archived: view === 'archived' })
      setItems(result.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [view])

  useEffect(() => {
    load()
  }, [load])

  const openMessage = async (msg) => {
    setActive({ ...msg, _loading: true })
    try {
      if (!msg.is_read) {
        await contactApi.markRead(msg.id)
        setItems((curr) => curr.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m)))
        load() // refresh unread count in the bell
      }
      const fresh = await contactApi.getMessage(msg.id)
      setActive(fresh)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleArchive = async (id, archived) => {
    try {
      if (archived) {
        await contactApi.unarchive(id)
        toast.success('Restored to inbox')
      } else {
        await contactApi.archive(id)
        toast.success('Archived')
      }
      setActive(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleMarkUnread = async (id) => {
    try {
      await contactApi.markUnread(id)
      setActive(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleDelete = async (id) => {
    try {
      await contactApi.destroy(id)
      toast.success('Deleted')
      setActive(null)
      setConfirmDelete(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  return (
    <ManagePage
      title="Messages"
      subtitle="Inquiries submitted through the public contact form."
      action={
        <div className="inline-flex rounded-lg border border-primary-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setView('inbox')}
            className={
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors ' +
              (view === 'inbox' ? 'bg-primary-900 text-white' : 'text-primary-600 hover:bg-primary-50')
            }
          >
            Inbox
          </button>
          <button
            type="button"
            onClick={() => setView('archived')}
            className={
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors ' +
              (view === 'archived' ? 'bg-primary-900 text-white' : 'text-primary-600 hover:bg-primary-50')
            }
          >
            Archived
          </button>
        </div>
      }
    >
      {loading ? (
        <PageLoader label="Loading messages…" />
      ) : error ? (
        <EmptyState title="Unable to load messages" description={error} action={<Button onClick={load}>Retry</Button>} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Mail}
          title={view === 'archived' ? 'No archived messages' : 'No messages yet'}
          description={view === 'archived' ? 'Archived messages will appear here.' : 'New inquiries from the contact form will appear here.'}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-primary-200 bg-white">
          <ul className="divide-y divide-primary-100">
            {items.map((msg) => (
              <li
                key={msg.id}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-primary-50/50"
                onClick={() => openMessage(msg)}
              >
                <span className="shrink-0">
                  {msg.is_read ? (
                    <MailOpen className="h-4 w-4 text-primary-400" />
                  ) : (
                    <Mail className="h-4 w-4 text-gold-500" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={'truncate text-sm ' + (msg.is_read ? 'font-medium text-primary-700' : 'font-semibold text-primary-900')}>
                      {msg.name}
                    </span>
                    {!msg.is_read && <Badge variant="info">New</Badge>}
                  </div>
                  <div className="mt-0.5 truncate text-xs text-primary-500">
                    <span className="font-medium text-primary-700">{msg.subject}</span>
                    <span className="mx-1.5">·</span>
                    <span className="truncate">{msg.message}</span>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-primary-400">{formatDateTime(msg.created_at)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Message detail modal */}
      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active?.subject || 'Message'}
        size="lg"
      >
        {active && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-400">From</div>
                <div className="font-medium text-primary-900">{active.name}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-400">Email</div>
                <a href={`mailto:${active.email}`} className="font-medium text-gold-600 hover:underline">
                  {active.email}
                </a>
              </div>
              {active.phone && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-primary-400">Phone</div>
                  <div className="font-medium text-primary-900">{active.phone}</div>
                </div>
              )}
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-400">Received</div>
                <div className="font-medium text-primary-900">{formatDateTime(active.created_at)}</div>
              </div>
            </div>
            <div className="rounded-lg border border-primary-100 bg-primary-50/50 p-4">
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-primary-800">
                {active.message}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => handleMarkUnread(active.id)}>
                <MailOpen className="h-4 w-4" /> Mark unread
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleArchive(active.id, active.is_archived)}
              >
                {active.is_archived ? (
                  <>
                    <ArchiveRestore className="h-4 w-4" /> Restore
                  </>
                ) : (
                  <>
                    <Archive className="h-4 w-4" /> Archive
                  </>
                )}
              </Button>
              <Button variant="danger" size="sm" onClick={() => setConfirmDelete(active)}>
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={confirmDelete !== null} onClose={() => setConfirmDelete(null)} title="Delete message" size="sm">
        <p className="text-sm text-primary-600">This will permanently delete the message. This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(confirmDelete.id)}>
            Delete
          </Button>
        </div>
      </Modal>
    </ManagePage>
  )
}
