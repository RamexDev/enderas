import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Archive, ArchiveRestore, Eye, EyeOff, Trash2 } from 'lucide-react'
import { contactApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { formatDate } from '@/utils/helpers'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import Badge from '@/components/ui/Badge'
import Modal, { ConfirmDialog } from '@/components/ui/Modal'

export default function MessagesPage() {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [viewMsg, setViewMsg] = useState(null)
  const [showArchived, setShowArchived] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const result = await contactApi.listMessages({ page, limit: 10, archived: showArchived })
      setItems(result.data)
      setMeta(result.meta)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [showArchived])

  useEffect(() => { load() }, [load])

  const openMessage = async (id) => {
    try {
      const msg = await contactApi.getMessage(id)
      setViewMsg(msg)
      if (!msg.is_read) {
        await contactApi.markRead(id)
        load(meta.page)
      }
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleArchive = async (id) => {
    try {
      await contactApi.archive(id)
      toast.success('Message archived')
      setViewMsg(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleUnarchive = async (id) => {
    try {
      await contactApi.unarchive(id)
      toast.success('Message restored')
      setViewMsg(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleMarkUnread = async (id) => {
    try {
      await contactApi.markUnread(id)
      toast.success('Message marked as unread')
      setViewMsg(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await contactApi.destroy(deleteId)
      toast.success('Message deleted')
      setDeleteId(null)
      setViewMsg(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  if (loading && !items.length) return <PageLoader />

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description={showArchived ? 'Viewing archived messages.' : 'View and manage contact form submissions.'}
        action={
          <div className="flex items-center gap-2">
            <Badge variant="warning">{showArchived ? 'Archived' : 'Active'}</Badge>
            <Button variant="secondary" size="sm" onClick={() => setShowArchived((v) => !v)}>
              {showArchived ? 'Show active' : 'Show archived'}
            </Button>
          </div>
        }
      />

      <DataTable
        data={items}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
          {
            key: 'status',
            label: 'Status',
            render: (r) => (
              <div className="flex gap-1">
                {!r.is_read && <Badge variant="info">Unread</Badge>}
                {r.is_read && <Badge variant="default">Read</Badge>}
                {r.is_archived && <Badge variant="warning">Archived</Badge>}
              </div>
            ),
          },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => openMessage(row.id)}><Eye className="h-4 w-4" /></Button>
                {row.is_archived ? (
                  <Button size="sm" variant="ghost" onClick={() => handleUnarchive(row.id)}><ArchiveRestore className="h-4 w-4" /></Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => handleArchive(row.id)}><Archive className="h-4 w-4" /></Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ),
          },
        ]}
      />
      <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={load} />

      <Modal open={!!viewMsg} onClose={() => setViewMsg(null)} title="Message details" size="lg">
        {viewMsg && (
          <div className="space-y-4 text-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><p className="text-primary-500">Name</p><p className="font-medium">{viewMsg.name}</p></div>
              <div><p className="text-primary-500">Email</p><p className="font-medium">{viewMsg.email}</p></div>
              <div><p className="text-primary-500">Phone</p><p className="font-medium">{viewMsg.phone || '—'}</p></div>
              <div><p className="text-primary-500">Date</p><p className="font-medium">{formatDate(viewMsg.createdAt)}</p></div>
            </div>
            <div><p className="text-primary-500">Subject</p><p className="font-medium">{viewMsg.subject}</p></div>
            <div><p className="text-primary-500">Message</p><p className="whitespace-pre-wrap">{viewMsg.message}</p></div>
            <div className="flex justify-end gap-2">
              {viewMsg.is_archived ? (
                <Button variant="secondary" onClick={() => handleUnarchive(viewMsg.id)}>
                  <ArchiveRestore className="h-4 w-4" /> Restore
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => handleArchive(viewMsg.id)}>
                  <Archive className="h-4 w-4" /> Archive
                </Button>
              )}
              <Button variant="secondary" onClick={() => handleMarkUnread(viewMsg.id)}>
                <EyeOff className="h-4 w-4" /> Mark unread
              </Button>
              <Button variant="secondary" onClick={() => { setDeleteId(viewMsg.id); setViewMsg(null) }}>
                <Trash2 className="h-4 w-4 text-red-500" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete message"
        message="This action cannot be undone."
        loading={deleting}
      />
    </div>
  )
}
