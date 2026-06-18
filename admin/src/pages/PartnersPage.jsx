/**
 * @fileoverview Partners management page.
 */

import { Plus } from 'lucide-react'
import { aboutApi } from '@/services/cmsApi'
import { mediaUrl } from '@/utils/helpers'
import { useAsyncData, useCrudList, useFormState, recordToForm } from '@/hooks'
import CrudPageLayout from '@/components/common/CrudPageLayout'
import TableActions from '@/components/common/TableActions'
import FormModal from '@/components/common/FormModal'
import { FormModalFooter } from '@/components/common/FormModalFooter'
import Button from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { StatusBadge } from '@/components/ui/Badge'
import { Input, FormField } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'

const EMPTY_PARTNER = { name: '', logo: '', website_url: '' }

/** Trusted partners / client logos CMS page. */
export default function PartnersPage() {
  const { data: items, loading, reload } = useAsyncData(aboutApi.listPartners)

  const crud = useCrudList({
    createFn: aboutApi.createPartner,
    updateFn: aboutApi.updatePartner,
    deleteFn: aboutApi.deletePartner,
    toggleFn: aboutApi.togglePartner,
    reload,
    emptyRecord: EMPTY_PARTNER,
    messages: { create: 'Partner created', update: 'Partner updated', delete: 'Partner deleted' },
  })

  return (
    <CrudPageLayout
      title="Partners"
      description="Manage trusted partners and client logos."
      loading={loading}
      action={<Button onClick={crud.openCreate}><Plus className="h-4 w-4" /> Add partner</Button>}
      deleteDialog={crud}
      deleteTitle="Delete partner"
    >
      <DataTable
        data={items ?? []}
        columns={[
          {
            key: 'logo',
            label: 'Logo',
            render: (row) =>
              row.logo ? <img src={mediaUrl(row.logo)} alt="" className="h-10 w-20 object-contain" /> : '—',
          },
          { key: 'name', label: 'Name' },
          { key: 'website_url', label: 'Website' },
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

      <PartnerFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen}
        record={crud.editingRecord}
        onClose={crud.closeModal}
        onSave={crud.save}
      />
    </CrudPageLayout>
  )
}

/** Modal form for a single partner. */
function PartnerFormModal({ open, record, onClose, onSave }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_PARTNER))

  return (
    <FormModal open={open} record={record} entityName="partner" onClose={onClose} onSave={() => onSave(form)}>
      <div className="space-y-4">
        <FormField label="Partner name" required>
          <Input value={form.name} onChange={(e) => setField('name', e.target.value)} />
        </FormField>
        <ImageField label="Logo" value={form.logo} onChange={(v) => setField('logo', v)} />
        <FormField label="Website URL">
          <Input value={form.website_url} onChange={(e) => setField('website_url', e.target.value)} />
        </FormField>
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} />
      </div>
    </FormModal>
  )
}
