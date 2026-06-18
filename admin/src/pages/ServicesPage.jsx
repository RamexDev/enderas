/**
 * @fileoverview Services management page with pagination.
 */

import { useCallback } from 'react'
import { Plus } from 'lucide-react'
import { servicesApi } from '@/services/cmsApi'
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

const EMPTY_SERVICE = {
  title: '',
  short_description: '',
  description: '',
  image: '',
  cta_text: '',
  cta_link: '',
  meta_title: '',
  meta_description: '',
}

/** Services CMS page with paginated table. */
export default function ServicesPage() {
  const listFn = useCallback((params) => servicesApi.list(params), [])
  const { items, meta, loading, loadPage } = usePaginatedList(listFn, { limit: 10 })

  const crud = useCrudList({
    createFn: servicesApi.create,
    updateFn: servicesApi.update,
    deleteFn: servicesApi.delete,
    toggleFn: servicesApi.toggleStatus,
    reload: () => loadPage(meta.page),
    emptyRecord: EMPTY_SERVICE,
    messages: { create: 'Service created', update: 'Service updated', delete: 'Service deleted' },
  })

  return (
    <CrudPageLayout
      title="Services"
      description="Manage services displayed on the website."
      loading={loading && !items.length}
      action={<Button onClick={crud.openCreate}><Plus className="h-4 w-4" /> Add service</Button>}
      deleteDialog={crud}
      deleteTitle="Delete service"
    >
      <DataTable
        data={items}
        columns={[
          {
            key: 'image',
            label: 'Image',
            render: (row) =>
              row.image ? <img src={mediaUrl(row.image)} alt="" className="h-10 w-14 rounded object-cover" /> : '—',
          },
          { key: 'title', label: 'Title' },
          { key: 'short_description', label: 'Short description', render: (row) => <span className="line-clamp-1 max-w-xs">{row.short_description}</span> },
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

      <ServiceFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen}
        record={crud.editingRecord}
        onClose={crud.closeModal}
        onSave={crud.save}
      />
    </CrudPageLayout>
  )
}

/** Modal form for a single service including SEO fields. */
function ServiceFormModal({ open, record, onClose, onSave }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_SERVICE))

  return (
    <FormModal open={open} record={record} entityName="service" onClose={onClose} onSave={() => onSave(form)} size="xl">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <FormField label="Title" required>
            <Input value={form.title} onChange={(e) => setField('title', e.target.value)} />
          </FormField>
        </div>
        <div className="sm:col-span-2">
          <FormField label="Short description">
            <Textarea value={form.short_description} onChange={(e) => setField('short_description', e.target.value)} />
          </FormField>
        </div>
        <div className="sm:col-span-2">
          <FormField label="Full description">
            <Textarea value={form.description} onChange={(e) => setField('description', e.target.value)} rows={6} />
          </FormField>
        </div>
        <div className="sm:col-span-2">
          <ImageField label="Service image" value={form.image} onChange={(v) => setField('image', v)} />
        </div>
        <FormField label="CTA text"><Input value={form.cta_text} onChange={(e) => setField('cta_text', e.target.value)} /></FormField>
        <FormField label="CTA link"><Input value={form.cta_link} onChange={(e) => setField('cta_link', e.target.value)} /></FormField>
        <FormField label="SEO title"><Input value={form.meta_title} onChange={(e) => setField('meta_title', e.target.value)} /></FormField>
        <FormField label="SEO description"><Textarea value={form.meta_description} onChange={(e) => setField('meta_description', e.target.value)} /></FormField>
      </div>
      <div className="mt-6">
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} />
      </div>
    </FormModal>
  )
}
