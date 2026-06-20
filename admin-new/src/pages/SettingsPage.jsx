/**
 * @fileoverview SettingsPage — full-page editor for site settings (brand,
 * footer, social, navigation). Super-admin only (guarded at the route).
 *
 * This is a non-preview manage surface because site settings don't have a
 * single "page" they belong to — they appear in the header/footer of every
 * page. The visual editor surfaces a quick-edit chip on the contact page
 * preview; this page is the full editor.
 */
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import ManagePage from '@/components/preview/ManagePage'
import Button from '@/components/ui/Button'
import { PageLoader, EmptyState } from '@/components/ui/Loading'
import ImageField from '@/components/ui/ImageField'
import { FormField, Input, Textarea } from '@/components/ui/Input'
import { settingsApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'

const FIELD_GROUPS = [
  {
    label: 'Brand',
    fields: [
      { key: 'site_name', label: 'Site name', type: 'text' },
      { key: 'site_description', label: 'Site description', type: 'textarea', rows: 2 },
      { key: 'logo', label: 'Logo', type: 'image' },
      { key: 'favicon', label: 'Favicon', type: 'image' },
    ],
  },
  {
    label: 'Footer',
    fields: [
      { key: 'footer_text', label: 'Footer text', type: 'textarea', rows: 3 },
      { key: 'copyright_text', label: 'Copyright text', type: 'text' },
    ],
  },
  {
    label: 'Navigation',
    fields: [
      { key: 'sell_link', label: 'Auctions link', type: 'text', placeholder: '/contact' },
      { key: 'request_valuation_link', label: 'Request valuation link', type: 'text', placeholder: '/contact' },
    ],
  },
  {
    label: 'Social media',
    fields: [
      { key: 'facebook_url', label: 'Facebook URL', type: 'text' },
      { key: 'linkedin_url', label: 'LinkedIn URL', type: 'text' },
      { key: 'instagram_url', label: 'Instagram URL', type: 'text' },
      { key: 'twitter_url', label: 'Twitter URL', type: 'text' },
      { key: 'youtube_url', label: 'YouTube URL', type: 'text' },
    ],
  },
]

export default function SettingsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await settingsApi.get()
      setData(result)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  // Load on mount
  useEffect(() => {
    load()
  }, [load])

  const updateField = (key, value) => {
    setData((curr) => (curr ? { ...curr, [key]: value } : curr))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await settingsApi.update(data)
      toast.success('Settings saved')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <ManagePage
      title="Site settings"
      subtitle="Brand identity, footer copy, social media links, and navigation shortcuts."
      action={
        <Button onClick={handleSave} disabled={saving || !data}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      }
    >
      {loading ? (
        <PageLoader label="Loading settings…" />
      ) : error ? (
        <EmptyState title="Unable to load settings" description={error} action={<Button onClick={load}>Retry</Button>} />
      ) : (
        <div className="space-y-6">
          {FIELD_GROUPS.map((group) => (
            <div key={group.label} className="rounded-xl border border-primary-200 bg-white">
              <div className="border-b border-primary-100 px-5 py-4">
                <h3 className="text-sm font-semibold text-primary-900">{group.label}</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                {group.fields.map((field) => {
                  if (field.type === 'image') {
                    return (
                      <div key={field.key} className="sm:col-span-2">
                        <ImageField
                          label={field.label}
                          value={data[field.key]}
                          onChange={(v) => updateField(field.key, v)}
                        />
                      </div>
                    )
                  }
                  if (field.type === 'textarea') {
                    return (
                      <FormField key={field.key} label={field.label} className="sm:col-span-2">
                        <Textarea
                          rows={field.rows || 4}
                          value={data[field.key] || ''}
                          placeholder={field.placeholder}
                          onChange={(e) => updateField(field.key, e.target.value)}
                        />
                      </FormField>
                    )
                  }
                  return (
                    <FormField key={field.key} label={field.label}>
                      <Input
                        type={field.type === 'email' ? 'email' : 'text'}
                        value={data[field.key] || ''}
                        placeholder={field.placeholder}
                        onChange={(e) => updateField(field.key, e.target.value)}
                      />
                    </FormField>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </ManagePage>
  )
}
