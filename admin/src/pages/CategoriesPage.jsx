/**
 * @fileoverview Blog categories management page.
 */

import { Plus } from 'lucide-react'
import { blogApi } from '@/services/cmsApi'
import { useAsyncData, useCrudList, useFormState, recordToForm } from '@/hooks'
import CrudPageLayout from '@/components/common/CrudPageLayout'
import TableActions from '@/components/common/TableActions'
import FormModal from '@/components/common/FormModal'
import { FormModalFooter } from '@/components/common/FormModalFooter'
import Button from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { Input, FormField } from '@/components/ui/Input'

const EMPTY_CATEGORY = { name: '', slug: '' }

/** Blog post categories CMS page. */
export default function CategoriesPage() {
  const { data: items, loading, reload } = useAsyncData(blogApi.listCategories)

  const crud = useCrudList({
    createFn: blogApi.createCategory,
    updateFn: blogApi.updateCategory,
    deleteFn: blogApi.deleteCategory,
    reload,
    emptyRecord: EMPTY_CATEGORY,
    messages: { create: 'Category created', update: 'Category updated', delete: 'Category deleted' },
  })

  return (
    <CrudPageLayout
      title="Blog Categories"
      description="Organize blog posts into categories."
      loading={loading}
      action={<Button onClick={crud.openCreate}><Plus className="h-4 w-4" /> Add category</Button>}
      deleteDialog={crud}
      deleteTitle="Delete category"
    >
      <DataTable
        data={items ?? []}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'slug', label: 'Slug' },
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

      <CategoryFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen} record={crud.editingRecord} onClose={crud.closeModal} onSave={crud.save} />
    </CrudPageLayout>
  )
}

/** Modal form for a blog category. */
function CategoryFormModal({ open, record, onClose, onSave }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_CATEGORY))

  return (
    <FormModal open={open} record={record} entityName="category" onClose={onClose} onSave={() => onSave(form)}>
      <div className="space-y-4">
        <FormField label="Name" required>
          <Input value={form.name} onChange={(e) => setField('name', e.target.value)} />
        </FormField>
        <FormField label="Slug">
          <Input value={form.slug} onChange={(e) => setField('slug', e.target.value)} />
        </FormField>
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} />
      </div>
    </FormModal>
  )
}
