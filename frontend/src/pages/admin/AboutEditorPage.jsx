import { useState } from 'react'
import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import AdminInput, { AdminTextArea, AdminCard } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'

export default function AboutEditorPage() {
  const about = useContentStore((s) => s.about)
  const setAbout = useContentStore((s) => s.setAbout)
  const [form, setForm] = useState(about)
  const [valuesJson, setValuesJson] = useState(JSON.stringify(about.values, null, 2))
  const [teamJson, setTeamJson] = useState(JSON.stringify(about.team, null, 2))
  const [partnersJson, setPartnersJson] = useState(JSON.stringify(about.partners, null, 2))

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const save = () => {
    try {
      setAbout({
        ...form,
        values: JSON.parse(valuesJson),
        team: JSON.parse(teamJson),
        partners: JSON.parse(partnersJson),
      })
      toast.success('About page saved')
    } catch {
      toast.error('Invalid JSON in values, team, or partners')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">About Page Editor</h1>

      <AdminCard title="Hero">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput label="Eyebrow" value={form.heroEyebrow} onChange={(e) => update('heroEyebrow', e.target.value)} />
          <AdminInput label="Hero image URL" value={form.heroImage} onChange={(e) => update('heroImage', e.target.value)} />
          <AdminInput label="Title" value={form.heroTitle} onChange={(e) => update('heroTitle', e.target.value)} className="md:col-span-2" />
          <AdminTextArea label="Intro" value={form.heroIntro} onChange={(e) => update('heroIntro', e.target.value)} className="md:col-span-2" />
        </div>
      </AdminCard>

      <AdminCard title="History & mission">
        <AdminTextArea label="History" value={form.history} onChange={(e) => update('history', e.target.value)} />
        <div className="mt-4">
          <AdminTextArea label="Extended history" value={form.historyExtended} onChange={(e) => update('historyExtended', e.target.value)} />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <AdminTextArea label="Mission" value={form.mission} onChange={(e) => update('mission', e.target.value)} />
          <AdminTextArea label="Vision" value={form.vision} onChange={(e) => update('vision', e.target.value)} />
        </div>
      </AdminCard>

      <AdminCard title="Values (JSON)">
        <AdminTextArea rows={8} value={valuesJson} onChange={(e) => setValuesJson(e.target.value)} />
      </AdminCard>

      <AdminCard title="Team (JSON)">
        <AdminTextArea rows={10} value={teamJson} onChange={(e) => setTeamJson(e.target.value)} />
      </AdminCard>

      <AdminCard title="Partners (JSON array)">
        <AdminTextArea rows={4} value={partnersJson} onChange={(e) => setPartnersJson(e.target.value)} />
      </AdminCard>

      <Button variant="primary" onClick={save}>
        Save about page
      </Button>
    </div>
  )
}
