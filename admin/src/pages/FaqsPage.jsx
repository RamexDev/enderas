/**
 * @fileoverview FAQ management page.
 */

import { Plus } from 'lucide-react'
import { faqsApi } from '@/services/cmsApi'
import { useAsyncData, useCrudList, useFormState, recordToForm } from '@/hooks'
import CrudPageLayout from '@/components/common/CrudPageLayout'
import TableActions from '@/components/common/TableActions'
import FormModal from '@/components/common/FormModal'
import { FormModalFooter } from '@/components/common/FormModalFooter'
import Button from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { StatusBadge } from '@/components/ui/Badge'
import { Textarea, FormField } from '@/components/ui/Input'

const EMPTY_FAQ = { question: '', answer: '' }

/** FAQs CMS page with CRUD and enable/disable toggle. */
export default function FaqsPage() {
  const { data: items, loading, reload } = useAsyncData(faqsApi.list)

  const crud = useCrudList({
    createFn: faqsApi.create,
    updateFn: faqsApi.update,
    deleteFn: faqsApi.delete,
    toggleFn: faqsApi.toggleStatus,
    reload,
    emptyRecord: EMPTY_FAQ,
    messages: { create: 'FAQ created', update: 'FAQ updated', delete: 'FAQ deleted' },
  })

  return (
    <CrudPageLayout
      title="FAQs"
      description="Manage frequently asked questions."
      loading={loading}
      action={<Button onClick={crud.openCreate}><Plus className="h-4 w-4" /> Add FAQ</Button>}
      deleteDialog={crud}
      deleteTitle="Delete FAQ"
    >
      <DataTable
        data={items ?? []}
        columns={[
          { key: 'question', label: 'Question', render: (row) => <span className="line-clamp-2 max-w-md">{row.question}</span> },
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

      <FaqFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen} record={crud.editingRecord} onClose={crud.closeModal} onSave={crud.save} />
    </CrudPageLayout>
  )
}

/** Modal form for creating or editing an FAQ entry. */
function FaqFormModal({ open, record, onClose, onSave }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_FAQ))

  return (
    <FormModal open={open} record={record} entityName="FAQ" onClose={onClose} onSave={() => onSave(form)} size="lg">
      <div className="space-y-4">
        <FormField label="Question" required>
          <Textarea value={form.question} onChange={(e) => setField('question', e.target.value)} />
        </FormField>
        <FormField label="Answer" required>
          <Textarea value={form.answer} onChange={(e) => setField('answer', e.target.value)} rows={5} />
        </FormField>
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} />
      </div>
    </FormModal>
  )
}
