import { useState } from 'react'
import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import { resetContent } from '@/services/contentService'
import AdminInput, { AdminTextArea, AdminCard } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'

export default function SettingsPage() {
  const settings = useContentStore((s) => s.settings)
  const nav = useContentStore((s) => s.nav)
  const setSettings = useContentStore((s) => s.setSettings)
  const setNav = useContentStore((s) => s.setNav)
  const [form, setForm] = useState({ ...settings, navJson: JSON.stringify(nav, null, 2) })

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const save = () => {
    try {
      const parsedNav = JSON.parse(form.navJson)
      const {
        appName,
        tagline,
        phone,
        phoneAlt,
        email,
        address,
        city,
        country,
        poBox,
        hours,
        footerDescription,
        mapEmbedUrl,
        mapDirectionsUrl,
        mapCoordinates,
        seo,
        social,
      } = form
      setSettings({
        appName,
        tagline,
        phone,
        phoneAlt,
        email,
        address,
        city,
        country,
        poBox,
        hours,
        footerDescription,
        mapEmbedUrl,
        mapDirectionsUrl,
        mapCoordinates,
        seo,
        social,
      })
      setNav(parsedNav)
      toast.success('Settings saved')
    } catch {
      toast.error('Navigation JSON is invalid')
    }
  }

  const handleReset = async () => {
    if (!window.confirm('Reset all content to seed data? This cannot be undone.')) return
    await resetContent()
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Site Settings</h1>
        <Button variant="outline" onClick={handleReset}>
          Reset to seed
        </Button>
      </div>

      <AdminCard title="General">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput label="App name" value={form.appName} onChange={(e) => update('appName', e.target.value)} />
          <AdminInput label="Tagline" value={form.tagline} onChange={(e) => update('tagline', e.target.value)} />
          <AdminInput label="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          <AdminInput label="Alt phone" value={form.phoneAlt || ''} onChange={(e) => update('phoneAlt', e.target.value)} />
          <AdminInput label="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <AdminInput label="Address" value={form.address} onChange={(e) => update('address', e.target.value)} />
          <AdminInput label="City" value={form.city || ''} onChange={(e) => update('city', e.target.value)} />
          <AdminInput label="Country" value={form.country || ''} onChange={(e) => update('country', e.target.value)} />
          <AdminInput label="P.O. Box" value={form.poBox || ''} onChange={(e) => update('poBox', e.target.value)} />
          <AdminInput label="Hours" value={form.hours} onChange={(e) => update('hours', e.target.value)} />
        </div>
        <div className="mt-4">
          <AdminTextArea
            label="Footer description"
            value={form.footerDescription}
            onChange={(e) => update('footerDescription', e.target.value)}
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Map embed URL"
            value={form.mapEmbedUrl}
            onChange={(e) => update('mapEmbedUrl', e.target.value)}
          />
          <AdminInput
            label="Directions URL"
            value={form.mapDirectionsUrl || ''}
            onChange={(e) => update('mapDirectionsUrl', e.target.value)}
          />
        </div>
      </AdminCard>

      <AdminCard title="SEO defaults">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput
            label="Default title"
            value={form.seo.defaultTitle}
            onChange={(e) => update('seo', { ...form.seo, defaultTitle: e.target.value })}
          />
          <AdminInput
            label="Site URL"
            value={form.seo.siteUrl}
            onChange={(e) => update('seo', { ...form.seo, siteUrl: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <AdminTextArea
            label="Default description"
            value={form.seo.defaultDescription}
            onChange={(e) => update('seo', { ...form.seo, defaultDescription: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <AdminInput
            label="OG image URL"
            value={form.seo.ogImage}
            onChange={(e) => update('seo', { ...form.seo, ogImage: e.target.value })}
          />
        </div>
      </AdminCard>

      <AdminCard title="Navigation (JSON)">
        <AdminTextArea
          label="Nav links"
          rows={10}
          value={form.navJson}
          onChange={(e) => update('navJson', e.target.value)}
        />
      </AdminCard>

      <Button variant="primary" onClick={save}>
        Save settings
      </Button>
    </div>
  )
}
