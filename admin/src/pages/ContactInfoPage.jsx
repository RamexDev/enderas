/**
 * @fileoverview Contact information editor for the public contact page.
 */

import { contactApi } from '@/services/cmsApi'
import { useRecordEditor } from '@/hooks'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input, Textarea, FormField } from '@/components/ui/Input'

/** Singleton editor for contact details and contact-page SEO. */
export default function ContactInfoPage() {
  const { data, loading, saving, updateField, save } = useRecordEditor(
    contactApi.getPage,
    contactApi.updatePage,
    'Contact information updated',
  )

  if (loading || !data) return <PageLoader />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contact Information"
        description="Manage contact details shown on the website."
        action={
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        }
      />

      <Card>
        <CardHeader title="Contact details" />
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField label="Address">
              <Textarea value={data.address || ''} onChange={(e) => updateField('address', e.target.value)} rows={3} />
            </FormField>
          </div>
          <FormField label="Phone number">
            <Input value={data.phone || ''} onChange={(e) => updateField('phone', e.target.value)} />
          </FormField>
          <FormField label="Email address">
            <Input type="email" value={data.email || ''} onChange={(e) => updateField('email', e.target.value)} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Google Maps embed URL">
              <Textarea
                value={data.google_map_embed || ''}
                onChange={(e) => updateField('google_map_embed', e.target.value)}
                rows={3}
                placeholder="Paste embed URL or iframe HTML"
              />
            </FormField>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Contact page SEO" />
        <CardBody className="space-y-4">
          <FormField label="Meta title">
            <Input value={data.meta_title || ''} onChange={(e) => updateField('meta_title', e.target.value)} />
          </FormField>
          <FormField label="Meta description">
            <Textarea value={data.meta_description || ''} onChange={(e) => updateField('meta_description', e.target.value)} />
          </FormField>
        </CardBody>
      </Card>
    </div>
  )
}
