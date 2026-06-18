/**
 * @fileoverview About page content editor (history, mission, vision, SEO).
 */

import { aboutApi } from '@/services/cmsApi'
import { useRecordEditor } from '@/hooks'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input, Textarea, FormField } from '@/components/ui/Input'

/** Singleton editor for the public About page. */
export default function AboutPage() {
  const { data, loading, saving, updateField, save } = useRecordEditor(
    aboutApi.get,
    aboutApi.update,
    'About page updated',
  )

  if (loading || !data) return <PageLoader />

  return (
    <div className="space-y-6">
      <PageHeader
        title="About Page"
        description="Edit company history, mission, and vision."
        action={
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        }
      />

      <Card>
        <CardHeader title="Company content" />
        <CardBody className="space-y-4">
          <FormField label="Company history">
            <Textarea value={data.history || ''} onChange={(e) => updateField('history', e.target.value)} rows={6} />
          </FormField>
          <FormField label="Mission">
            <Textarea value={data.mission || ''} onChange={(e) => updateField('mission', e.target.value)} rows={4} />
          </FormField>
          <FormField label="Vision">
            <Textarea value={data.vision || ''} onChange={(e) => updateField('vision', e.target.value)} rows={4} />
          </FormField>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="About page SEO" />
        <CardBody className="space-y-4">
          <FormField label="Meta title">
            <Input value={data.meta_title || ''} onChange={(e) => updateField('meta_title', e.target.value)} />
          </FormField>
          <FormField label="Meta description">
            <Textarea value={data.meta_description || ''} onChange={(e) => updateField('meta_description', e.target.value)} rows={3} />
          </FormField>
        </CardBody>
      </Card>
    </div>
  )
}
