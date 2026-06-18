/**
 * @fileoverview Core values management page.
 */

import { Plus } from 'lucide-react'
import { aboutApi } from '@/services/cmsApi'
import { useAsyncData, useCrudList, useFormState, recordToForm } from '@/hooks'
import CrudPageLayout from '@/components/common/CrudPageLayout'
import TableActions from '@/components/common/TableActions'
import FormModal from '@/components/common/FormModal'
import { FormModalFooter } from '@/components/common/FormModalFooter'
import Button from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Input, Textarea, FormField } from '@/components/ui/Input'

const EMPTY_VALUE = { title: '', description: '' }

/** Company core values CMS page (no status toggle). */
export default function CoreValuesPage() {
  const { data: items, loading, reload } = useAsyncData(aboutApi.listCoreValues)

  const crud = useCrudList({
    createFn: aboutApi.createCoreValue,
    updateFn: aboutApi.updateCoreValue,
    deleteFn: aboutApi.deleteCoreValue,
    reload,
    emptyRecord: EMPTY_VALUE,
    messages: { create: 'Core value created', update: 'Core value updated', delete: 'Core value deleted' },
  })

  return (
    <CrudPageLayout
      title="Core Values"
      description="Manage company core values."
      loading={loading}
      action={<Button onClick={crud.openCreate}><Plus className="h-4 w-4" /> Add value</Button>}
      deleteDialog={crud}
      deleteTitle="Delete core value"
    >
      <DataTable
        data={items ?? []}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'description', label: 'Description', render: (row) => <span className="line-clamp-2 max-w-lg">{row.description}</span> },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <TableActions
                showToggle={false}
                onEdit={() => crud.openEdit(row)}
                onDelete={() => crud.setDeleteId(row.id)}
              />
            ),
          },
        ]}
      />

      <ValueFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen} record={crud.editingRecord} onClose={crud.closeModal} onSave={crud.save} />
    </CrudPageLayout>
  )
}

/** Modal form for a single core value. */
function ValueFormModal({ open, record, onClose, onSave }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_VALUE))

  return (
    <FormModal open={open} record={record} entityName="value" onClose={onClose} onSave={() => onSave(form)}>
      <div className="space-y-4">
        <FormField label="Title" required>
          <Input value={form.title} onChange={(e) => setField('title', e.target.value)} />
        </FormField>
        <FormField label="Description">
          <Textarea value={form.description} onChange={(e) => setField('description', e.target.value)} />
        </FormField>
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} />
      </div>
    </FormModal>
  )
}
