import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Power } from 'lucide-react'
import { homepageApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { mediaUrl } from '@/utils/helpers'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { DataTable } from '@/components/ui/DataTable'
import { StatusBadge } from '@/components/ui/Badge'
import Modal, { ConfirmDialog } from '@/components/ui/Modal'
import { Input, Textarea, FormField } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    try {
      const data = await homepageApi.listHeroSlides()
      setSlides(data)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSave = async (form) => {
    try {
      if (modal?.id) {
        await homepageApi.updateHeroSlide(modal.id, form)
        toast.success('Slide updated')
      } else {
        await homepageApi.createHeroSlide(form)
        toast.success('Slide created')
      }
      setModal(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleToggle = async (id) => {
    try {
      await homepageApi.toggleHeroSlide(id)
      toast.success('Status updated')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await homepageApi.deleteHeroSlide(deleteId)
      toast.success('Slide deleted')
      setDeleteId(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  if (loading) return <PageLoader />

  return (
    <div>
      <PageHeader
        title="Hero Slides"
        description="Manage homepage hero slider content."
        action={
          <Button onClick={() => setModal({ title: '', subtitle: '', image: '', button_text: '', button_link: '' })}>
            <Plus className="h-4 w-4" /> Add slide
          </Button>
        }
      />

      <DataTable
        data={slides}
        columns={[
          {
            key: 'image',
            label: 'Preview',
            render: (row) => row.image ? (
              <img src={mediaUrl(row.image)} alt="" className="h-12 w-20 rounded object-cover" />
            ) : '—',
          },
          { key: 'title', label: 'Title' },
          { key: 'subtitle', label: 'Subtitle' },
          {
            key: 'status',
            label: 'Status',
            render: (row) => <StatusBadge active={row.is_active} />,
          },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setModal(row)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleToggle(row.id)}><Power className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ),
          },
        ]}
      />

      <SlideModal open={!!modal} data={modal} onClose={() => setModal(null)} onSave={handleSave} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete slide" message="This action cannot be undone." loading={deleting} />
    </div>
  )
}

function SlideModal({ open, data, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', button_text: '', button_link: '' })

  useEffect(() => {
    if (data) setForm({
      title: data.title || '',
      subtitle: data.subtitle || '',
      image: data.image || '',
      button_text: data.button_text || '',
      button_link: data.button_link || '',
    })
  }, [data])

  return (
    <Modal open={open} onClose={onClose} title={data?.id ? 'Edit slide' : 'Add slide'} size="lg">
      <div className="space-y-4">
        <FormField label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
        <FormField label="Subtitle"><Textarea value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></FormField>
        <ImageField label="Background image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} required />
        <FormField label="Button text"><Input value={form.button_text} onChange={(e) => setForm({ ...form, button_text: e.target.value })} /></FormField>
        <FormField label="Button link"><Input value={form.button_link} onChange={(e) => setForm({ ...form, button_link: e.target.value })} /></FormField>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}
