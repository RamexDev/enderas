import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import { formatDateLong } from '@/utils/formatDate'
import { AdminCard, DataTable } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'
import { ConfirmDialog } from '@/components/organisms/Lightbox'
import { useState } from 'react'

export default function MessagesPage() {
  const messages = useContentStore((s) => s.messages)
  const deleteMessage = useContentStore((s) => s.deleteMessage)
  const markMessageRead = useContentStore((s) => s.markMessageRead)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [selected, setSelected] = useState(null)

  const openMessage = (row) => {
    markMessageRead(row.id)
    setSelected(row)
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Contact Messages</h1>

      <AdminCard>
        <DataTable
          columns={[
            { key: 'subject', label: 'Subject' },
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            {
              key: 'createdAt',
              label: 'Date',
              render: (row) => formatDateLong(row.createdAt?.slice(0, 10) || row.date),
            },
            {
              key: 'read',
              label: 'Status',
              render: (row) => (row.read ? 'Read' : 'Unread'),
            },
          ]}
          data={messages}
          onEdit={openMessage}
          onDelete={setDeleteTarget}
        />
      </AdminCard>

      {selected && (
        <AdminCard
          title={selected.subject}
          actions={
            <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
              Close
            </Button>
          }
        >
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-medium text-primary-700 dark:text-primary-200">From</dt>
              <dd>
                {selected.name} — {selected.email} — {selected.phone}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-primary-700 dark:text-primary-200">Message</dt>
              <dd className="mt-1 whitespace-pre-wrap text-primary-800 dark:text-primary-100">{selected.message}</dd>
            </div>
          </dl>
        </AdminCard>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteMessage(deleteTarget.id)
          toast.success('Message deleted')
          if (selected?.id === deleteTarget.id) setSelected(null)
          setDeleteTarget(null)
        }}
        title="Delete message"
        message={`Delete message from "${deleteTarget?.name}"?`}
        confirmLabel="Delete"
      />
    </div>
  )
}
