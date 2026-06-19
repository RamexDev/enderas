/**
 * @fileoverview Site-wide settings editor (super admin only).
 */

import { settingsApi } from '@/services/cmsApi'
import { useRecordEditor } from '@/hooks'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input, Textarea, FormField } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'

/** Singleton editor for branding, footer text, and social links. */
export default function SettingsPage() {
  const { data, loading, saving, updateField, save } = useRecordEditor(
    settingsApi.get,
    settingsApi.update,
    'Settings updated',
  )

  if (loading || !data) return <PageLoader />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Settings"
        description="Manage general site configuration and branding."
        action={
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        }
      />

      <Card>
        <CardHeader title="General" />
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <FormField label="Company name">
            <Input value={data.site_name || ''} onChange={(e) => updateField('site_name', e.target.value)} />
          </FormField>
          <FormField label="Site description">
            <Input value={data.site_description || ''} onChange={(e) => updateField('site_description', e.target.value)} />
          </FormField>
          <div className="sm:col-span-2">
            <ImageField label="Company logo" value={data.logo} onChange={(v) => updateField('logo', v)} />
          </div>
          <div className="sm:col-span-2">
            <ImageField label="Favicon" value={data.favicon} onChange={(v) => updateField('favicon', v)} />
          </div>
          <FormField label="Footer text">
            <Textarea value={data.footer_text || ''} onChange={(e) => updateField('footer_text', e.target.value)} />
          </FormField>
          <FormField label="Copyright text">
            <Input value={data.copyright_text || ''} onChange={(e) => updateField('copyright_text', e.target.value)} />
          </FormField>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Social media links" />
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <FormField label="Facebook"><Input value={data.facebook_url || ''} onChange={(e) => updateField('facebook_url', e.target.value)} /></FormField>
          <FormField label="LinkedIn"><Input value={data.linkedin_url || ''} onChange={(e) => updateField('linkedin_url', e.target.value)} /></FormField>
          <FormField label="Instagram"><Input value={data.instagram_url || ''} onChange={(e) => updateField('instagram_url', e.target.value)} /></FormField>
          <FormField label="Twitter / X"><Input value={data.twitter_url || ''} onChange={(e) => updateField('twitter_url', e.target.value)} /></FormField>
          <FormField label="YouTube"><Input value={data.youtube_url || ''} onChange={(e) => updateField('youtube_url', e.target.value)} /></FormField>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Navigation Links" />
        <CardBody className="grid gap-4 sm:grid-cols-2">
          <FormField label="Sell page link">
            <Input value={data.sell_link || ''} onChange={(e) => updateField('sell_link', e.target.value)} placeholder="/contact" />
          </FormField>
          <FormField label="Request Valuation link">
            <Input value={data.request_valuation_link || ''} onChange={(e) => updateField('request_valuation_link', e.target.value)} placeholder="/contact" />
          </FormField>
        </CardBody>
      </Card>
    </div>
  )
}
