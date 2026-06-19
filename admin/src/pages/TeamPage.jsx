import { useCallback } from 'react'
import { Plus } from 'lucide-react'
import { teamApi } from '@/services/cmsApi'
import { mediaUrl } from '@/utils/helpers'
import { usePaginatedList, useCrudList, useFormState, recordToForm } from '@/hooks'
import CrudPageLayout from '@/components/common/CrudPageLayout'
import TableActions from '@/components/common/TableActions'
import FormModal from '@/components/common/FormModal'
import { FormModalFooter } from '@/components/common/FormModalFooter'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import { StatusBadge } from '@/components/ui/Badge'
import { Input, Textarea, FormField } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'

const EMPTY_MEMBER = {
  full_name: '',
  email: '',
  position: '',
  biography: '',
  profile_image: '',
}

export default function TeamPage() {
  const listFn = useCallback((params) => teamApi.list(params), [])
  const { items, meta, loading, loadPage } = usePaginatedList(listFn, { limit: 10 })

  const crud = useCrudList({
    createFn: teamApi.create,
    updateFn: teamApi.update,
    deleteFn: teamApi.delete,
    toggleFn: teamApi.toggleStatus,
    reload: () => loadPage(meta.page),
    emptyRecord: EMPTY_MEMBER,
    messages: {
      create: 'Member created',
      update: 'Member updated',
      delete: 'Member deleted',
    },
  })

  return (
    <CrudPageLayout
      title="Team Members"
      description="Manage team members displayed on the website."
      loading={loading && !items.length}
      action={
        <Button onClick={crud.openCreate}>
          <Plus className="h-4 w-4" /> Add member
        </Button>
      }
      deleteDialog={crud}
      deleteTitle="Delete team member"
    >
      <DataTable
        data={items}
        columns={[
          {
            key: 'photo',
            label: 'Photo',
            render: (row) =>
              row.profile_image ? (
                <img src={mediaUrl(row.profile_image)} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : '—',
          },
          { key: 'full_name', label: 'Name' },
          { key: 'position', label: 'Position' },
          { key: 'email', label: 'Email' },
          { key: 'status', label: 'Status', render: (row) => <StatusBadge active={row.is_active} /> },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <TableActions
                onEdit={() => crud.openEdit(row)}
                onToggle={() => crud.toggle(row.id)}
                onDelete={() => crud.setDeleteId(row.id)}
              />
            ),
          },
        ]}
      />

      <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={loadPage} />

      <MemberFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen}
        record={crud.editingRecord}
        onClose={crud.closeModal}
        onSave={crud.save}
        saving={crud.saving}
      />
    </CrudPageLayout>
  )
}

/**
 * Create/edit modal for a single team member.
 * @param {{ open: boolean, record: object|null, onClose: Function, onSave: Function }} props
 */
function MemberFormModal({ open, record, onClose, onSave, saving }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_MEMBER))

  return (
    <FormModal open={open} record={record} entityName="member" onClose={onClose} onSave={() => onSave(form)} size="lg">
      <div className="space-y-4">
        <FormField label="Full name" required>
          <Input value={form.full_name} onChange={(e) => setField('full_name', e.target.value)} />
        </FormField>
        <FormField label="Email">
          <Input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
        </FormField>
        <FormField label="Position">
          <Input value={form.position} onChange={(e) => setField('position', e.target.value)} />
        </FormField>
        <FormField label="Biography">
          <Textarea value={form.biography} onChange={(e) => setField('biography', e.target.value)} rows={4} />
        </FormField>
        <ImageField label="Profile image" value={form.profile_image} onChange={(v) => setField('profile_image', v)} />
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} saving={saving} />
      </div>
    </FormModal>
  )
}
