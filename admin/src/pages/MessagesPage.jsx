import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Archive, Eye } from 'lucide-react'
import { contactApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { formatDate } from '@/utils/helpers'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'

export default function MessagesPage() {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [viewMsg, setViewMsg] = useState(null)
  const [showArchived, setShowArchived] = useState(false)

  const load = async (page = 1) => {
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
  }

  useEffect(() => { load() }, [showArchived])

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

  if (loading && !items.length) return <PageLoader />

  return (
    <div>
      <PageHeader
        title="Contact Messages"
        description="View and manage contact form submissions."
        action={
          <Button variant="secondary" size="sm" onClick={() => setShowArchived((v) => !v)}>
            {showArchived ? 'Show active' : 'Show archived'}
          </Button>
        }
      />

      <DataTable
        data={items}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'created_at', label: 'Date', render: (r) => formatDate(r.created_at) },
          {
            key: 'status',
            label: 'Status',
            render: (r) => (
              <div className="flex gap-1">
                {!r.is_read && <Badge variant="info">Unread</Badge>}
                {r.is_archived && <Badge variant="default">Archived</Badge>}
              </div>
            ),
          },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => openMessage(row.id)}><Eye className="h-4 w-4" /></Button>
                {!row.is_archived && (
                  <Button size="sm" variant="ghost" onClick={() => handleArchive(row.id)}><Archive className="h-4 w-4" /></Button>
                )}
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
              <div><p className="text-primary-500">Date</p><p className="font-medium">{formatDate(viewMsg.created_at)}</p></div>
            </div>
            <div><p className="text-primary-500">Subject</p><p className="font-medium">{viewMsg.subject}</p></div>
            <div><p className="text-primary-500">Message</p><p className="whitespace-pre-wrap">{viewMsg.message}</p></div>
            {!viewMsg.is_archived && (
              <div className="flex justify-end">
                <Button variant="secondary" onClick={() => handleArchive(viewMsg.id)}>
                  <Archive className="h-4 w-4" /> Archive
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
