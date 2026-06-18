/**
 * @fileoverview Homepage content editor — sections, statistics, visibility, SEO.
 */

import { useCallback } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { homepageApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { useAsyncData, useCrudList, useFormState, recordToForm } from '@/hooks'
import { PageHeader } from '@/components/layout/Header'
import SectionForm from '@/components/common/SectionForm'
import FormModal from '@/components/common/FormModal'
import { FormModalFooter } from '@/components/common/FormModalFooter'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Checkbox, Input, FormField } from '@/components/ui/Input'
import { DataTable } from '@/components/ui/DataTable'
import { ConfirmDialog } from '@/components/ui/Modal'

/** Field definitions for each editable homepage section. */
const INTRO_FIELDS = [
  { key: 'company_intro_title', label: 'Title' },
  { key: 'company_intro_description', label: 'Description', type: 'textarea', full: true },
  { key: 'company_intro_cta_text', label: 'CTA Text' },
  { key: 'company_intro_cta_link', label: 'CTA Link' },
]

const AUCTION_FIELDS = [
  { key: 'auction_title', label: 'Title' },
  { key: 'auction_description', label: 'Description', type: 'textarea', full: true },
  { key: 'auction_cta_text', label: 'CTA Text' },
  { key: 'auction_cta_link', label: 'CTA Link' },
]

const CTA_FIELDS = [
  { key: 'contact_cta_title', label: 'Title' },
  { key: 'contact_cta_description', label: 'Description', type: 'textarea', full: true },
  { key: 'contact_cta_button_text', label: 'Button Text' },
  { key: 'contact_cta_button_link', label: 'Button Link' },
]

const SEO_FIELDS = [
  { key: 'meta_title', label: 'Meta Title' },
  { key: 'meta_description', label: 'Meta Description', type: 'textarea', full: true },
]

const EMPTY_STAT = { label: '', value: '', icon: '' }

/** Homepage CMS page with nested statistics CRUD. */
export default function HomepagePage() {
  const fetchAll = useCallback(async () => {
    const [home, statistics] = await Promise.all([
      homepageApi.get(),
      homepageApi.listStatistics(),
    ])
    return { home, statistics }
  }, [])

  const { data, loading, setData, reload } = useAsyncData(fetchAll)

  const crud = useCrudList({
    createFn: homepageApi.createStatistic,
    updateFn: homepageApi.updateStatistic,
    deleteFn: homepageApi.deleteStatistic,
    reload,
    emptyRecord: EMPTY_STAT,
    messages: {
      create: 'Statistic created',
      update: 'Statistic updated',
      delete: 'Statistic deleted',
    },
  })

  const updateHomeField = (key, value) => {
    setData((current) => ({
      ...current,
      home: { ...current.home, [key]: value },
    }))
  }

  const saveHomepage = async () => {
    try {
      const updated = await homepageApi.update(data.home)
      setData((current) => ({ ...current, home: updated }))
      toast.success('Homepage updated')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  if (loading || !data) return <PageLoader />

  const { home, statistics } = data

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage"
        description="Edit homepage content sections. Layout and section order are fixed."
        action={<Button onClick={saveHomepage}>Save changes</Button>}
      />

      <SectionForm title="Company Introduction" fields={INTRO_FIELDS} values={home} onChange={updateHomeField} />
      <SectionForm title="Auction & Valuation Highlight" fields={AUCTION_FIELDS} values={home} onChange={updateHomeField} />
      <SectionForm title="Contact CTA" fields={CTA_FIELDS} values={home} onChange={updateHomeField} />
      <SectionForm title="Homepage SEO" fields={SEO_FIELDS} values={home} onChange={updateHomeField} />

      <Card>
        <CardHeader title="Section visibility" description="Enable or disable homepage sections" />
        <CardBody className="flex flex-wrap gap-6">
          <Checkbox label="Show team section" checked={home.show_team} onChange={(e) => updateHomeField('show_team', e.target.checked)} />
          <Checkbox label="Show testimonials section" checked={home.show_testimonials} onChange={(e) => updateHomeField('show_testimonials', e.target.checked)} />
          <Checkbox label="Show FAQ section" checked={home.show_faq} onChange={(e) => updateHomeField('show_faq', e.target.checked)} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Statistics"
          action={
            <Button size="sm" onClick={crud.openCreate}>
              <Plus className="h-4 w-4" /> Add statistic
            </Button>
          }
        />
        <CardBody>
          <DataTable
            data={statistics}
            columns={[
              { key: 'label', label: 'Label' },
              { key: 'value', label: 'Value' },
              { key: 'icon', label: 'Icon' },
              {
                key: 'actions',
                label: 'Actions',
                render: (row) => (
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => crud.openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => crud.setDeleteId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                ),
              },
            ]}
          />
        </CardBody>
      </Card>

      <StatisticFormModal
        key={crud.editingRecord?.id ?? 'new'}
        open={crud.isModalOpen}
        record={crud.editingRecord}
        onClose={crud.closeModal}
        onSave={crud.save}
      />

      <ConfirmDialog
        open={Boolean(crud.deleteId)}
        onClose={() => crud.setDeleteId(null)}
        onConfirm={crud.confirmDelete}
        title="Delete statistic"
        message="This action cannot be undone."
        loading={crud.deleting}
      />
    </div>
  )
}

/** Modal for creating or editing a homepage statistic. */
function StatisticFormModal({ open, record, onClose, onSave }) {
  const { form, setField } = useFormState(recordToForm(record, EMPTY_STAT))

  return (
    <FormModal open={open} record={record} entityName="statistic" onClose={onClose} onSave={() => onSave(form)}>
      <div className="space-y-4">
        <FormField label="Label" required><Input value={form.label} onChange={(e) => setField('label', e.target.value)} /></FormField>
        <FormField label="Value" required><Input value={form.value} onChange={(e) => setField('value', e.target.value)} /></FormField>
        <FormField label="Icon"><Input value={form.icon} onChange={(e) => setField('icon', e.target.value)} placeholder="e.g. years, clients" /></FormField>
        <FormModalFooter onCancel={onClose} onSave={() => onSave(form)} />
      </div>
    </FormModal>
  )
}
