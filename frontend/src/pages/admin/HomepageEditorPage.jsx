import { useState } from 'react'
import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import AdminInput, { AdminTextArea, AdminCard } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'

export default function HomepageEditorPage() {
  const slides = useContentStore((s) => s.slides)
  const stats = useContentStore((s) => s.stats)
  const homepage = useContentStore((s) => s.homepage)
  const auctionHighlight = useContentStore((s) => s.auctionHighlight)
  const cta = useContentStore((s) => s.cta)
  const setSlides = useContentStore((s) => s.setSlides)
  const setStats = useContentStore((s) => s.setStats)
  const setHomepage = useContentStore((s) => s.setHomepage)
  const setAuctionHighlight = useContentStore((s) => s.setAuctionHighlight)
  const setCta = useContentStore((s) => s.setCta)

  const [slidesJson, setSlidesJson] = useState(JSON.stringify(slides, null, 2))
  const [statsJson, setStatsJson] = useState(JSON.stringify(stats, null, 2))
  const [intro, setIntro] = useState(homepage.intro)
  const [auction, setAuction] = useState(auctionHighlight)
  const [ctaForm, setCtaForm] = useState(cta)

  const save = () => {
    try {
      setSlides(JSON.parse(slidesJson))
      setStats(JSON.parse(statsJson))
      setHomepage({ ...homepage, intro })
      setAuctionHighlight(auction)
      setCta(ctaForm)
      toast.success('Homepage content saved')
    } catch {
      toast.error('Invalid JSON in slides or stats')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Homepage Editor</h1>

      <AdminCard title="Hero slides (JSON)">
        <AdminTextArea rows={12} value={slidesJson} onChange={(e) => setSlidesJson(e.target.value)} />
      </AdminCard>

      <AdminCard title="Statistics (JSON)">
        <AdminTextArea rows={8} value={statsJson} onChange={(e) => setStatsJson(e.target.value)} />
      </AdminCard>

      <AdminCard title="Company introduction">
        <div className="grid gap-4">
          <AdminInput label="Eyebrow" value={intro.eyebrow} onChange={(e) => setIntro({ ...intro, eyebrow: e.target.value })} />
          <AdminInput label="Title" value={intro.title} onChange={(e) => setIntro({ ...intro, title: e.target.value })} />
          <AdminTextArea label="Intro" value={intro.intro} onChange={(e) => setIntro({ ...intro, intro: e.target.value })} />
        </div>
      </AdminCard>

      <AdminCard title="Auction highlight">
        <div className="grid gap-4 md:grid-cols-2">
          <AdminInput label="Title" value={auction.title} onChange={(e) => setAuction({ ...auction, title: e.target.value })} />
          <AdminInput label="Type" value={auction.type} onChange={(e) => setAuction({ ...auction, type: e.target.value })} />
          <AdminInput label="Location" value={auction.location} onChange={(e) => setAuction({ ...auction, location: e.target.value })} />
          <AdminInput label="Reserve" value={auction.reserve} onChange={(e) => setAuction({ ...auction, reserve: e.target.value })} />
          <AdminInput label="Close date (ISO)" value={auction.closeDate} onChange={(e) => setAuction({ ...auction, closeDate: e.target.value })} />
          <AdminInput label="Image URL" value={auction.image} onChange={(e) => setAuction({ ...auction, image: e.target.value })} />
        </div>
        <div className="mt-4">
          <AdminTextArea label="Blurb" value={auction.blurb} onChange={(e) => setAuction({ ...auction, blurb: e.target.value })} />
        </div>
      </AdminCard>

      <AdminCard title="CTA section">
        <div className="grid gap-4">
          <AdminInput label="Title" value={ctaForm.title} onChange={(e) => setCtaForm({ ...ctaForm, title: e.target.value })} />
          <AdminTextArea label="Body" value={ctaForm.body} onChange={(e) => setCtaForm({ ...ctaForm, body: e.target.value })} />
          <AdminInput label="Primary label" value={ctaForm.primary.label} onChange={(e) => setCtaForm({ ...ctaForm, primary: { ...ctaForm.primary, label: e.target.value } })} />
          <AdminInput label="Primary link" value={ctaForm.primary.to} onChange={(e) => setCtaForm({ ...ctaForm, primary: { ...ctaForm.primary, to: e.target.value } })} />
        </div>
      </AdminCard>

      <Button variant="primary" onClick={save}>
        Save homepage
      </Button>
    </div>
  )
}
