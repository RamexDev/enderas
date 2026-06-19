import { useCallback } from 'react'
import { Plus } from 'lucide-react'
import { testimonialsApi } from '@/services/cmsApi'
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

const EMPTY_TESTIMONIAL = { client_name: '', company: '', content: '', client_image: '' }

export default function TestimonialsPage() {
  const listFn = useCallback((params) => testimonialsApi.list(params), [])
  const { items, meta, loading, loadPage } = usePaginatedList(listFn, { limit: 10 })

  const crud = useCrudList({
    createFn: testimonialsApi.create,
    updateFn: testimonialsApi.update,
    deleteFn: testimonialsApi.delete,
    toggleFn: testimonialsApi.toggleStatus,
    reload: () => loadPage(meta.page),
    emptyRecord: EMPTY_TESTIMONIAL,
    messages: { create: 'Testimonial created', update: 'Testimonial updated', delete: 'Testimonial deleted' },
  })

  return (
    <CrudPageLayout
      title="Testimonials"
      description="Manage customer testimonials."
      loading={loading && !items.length}
      action={<Button onClick={crud.openCreate}><Plus className="h-4 w-4" /> Add testimonial</Button>}
      deleteDialog={crud}
      deleteTitle="Delete testimonial"
    >
      <DataTable
        data={items}
        columns={[
          { key: 'client_name', label: 'Client' },
          { key: 'company', label: 'Company' },
          { key: 'content', label: 'Content', render: (row) => <span className="line-clamp-2 max-w-md">{row.content}</span> },
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

      <TestimonialFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen} record={crud.editingRecord} onClose={crud.closeModal} onSave={crud.save} saving={crud.saving} />
    </CrudPageLayout>
  )
}

/** Modal form for a single testimonial. */
function TestimonialFormModal({ open, record, onClose, onSave, saving }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_TESTIMONIAL))

  return (
    <FormModal open={open} record={record} entityName="testimonial" onClose={onClose} onSave={() => onSave(form)} size="lg">
      <div className="space-y-4">
        <FormField label="Client name" required>
          <Input value={form.client_name} onChange={(e) => setField('client_name', e.target.value)} />
        </FormField>
        <FormField label="Company">
          <Input value={form.company} onChange={(e) => setField('company', e.target.value)} />
        </FormField>
        <FormField label="Testimonial content" required>
          <Textarea value={form.content} onChange={(e) => setField('content', e.target.value)} rows={4} />
        </FormField>
        <ImageField label="Client image" value={form.client_image} onChange={(v) => setField('client_image', v)} />
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} saving={saving} />
      </div>
    </FormModal>
  )
}
