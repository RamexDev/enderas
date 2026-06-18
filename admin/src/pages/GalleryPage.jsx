import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { galleryApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { mediaUrl } from '@/utils/helpers'
import { PageHeader } from '@/components/layout/Header'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import Modal, { ConfirmDialog } from '@/components/ui/Modal'
import { Input, Textarea, FormField, Select } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [catModal, setCatModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteCatId, setDeleteCatId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async (page = 1) => {
    setLoading(true)
    try {
      const [gallery, cats] = await Promise.all([
        galleryApi.list({ page, limit: 12 }),
        galleryApi.listCategories(),
      ])
      setItems(gallery.data)
      setMeta(gallery.meta)
      setCategories(cats)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleSave = async (form) => {
    try {
      const payload = { ...form, category_id: form.category_id || null }
      if (modal?.id) {
        await galleryApi.update(modal.id, payload)
        toast.success('Gallery item updated')
      } else {
        await galleryApi.create(payload)
        toast.success('Gallery item created')
      }
      setModal(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const saveCategory = async (form) => {
    try {
      if (catModal?.id) {
        await galleryApi.updateCategory(catModal.id, form)
        toast.success('Category updated')
      } else {
        await galleryApi.createCategory(form)
        toast.success('Category created')
      }
      setCatModal(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await galleryApi.delete(deleteId)
      toast.success('Item deleted')
      setDeleteId(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteCat = async () => {
    setDeleting(true)
    try {
      await galleryApi.deleteCategory(deleteCatId)
      toast.success('Category deleted')
      setDeleteCatId(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  if (loading && !items.length) return <PageLoader />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gallery"
        description="Manage gallery images and categories."
        action={
          <Button onClick={() => setModal({ title: '', description: '', image: '', category_id: '' })}>
            <Plus className="h-4 w-4" /> Add item
          </Button>
        }
      />

      <Card>
        <CardHeader
          title="Categories"
          action={<Button size="sm" variant="secondary" onClick={() => setCatModal({ name: '', slug: '' })}>Add category</Button>}
        />
        <CardBody>
          <DataTable
            data={categories}
            emptyMessage="No categories yet"
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'slug', label: 'Slug' },
              {
                key: 'actions',
                label: 'Actions',
                render: (row) => (
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setCatModal(row)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => setDeleteCatId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                ),
              },
            ]}
          />
        </CardBody>
      </Card>

      <DataTable
        data={items}
        columns={[
          { key: 'image', label: 'Preview', render: (r) => <img src={mediaUrl(r.image)} alt="" className="h-12 w-16 rounded object-cover" /> },
          { key: 'title', label: 'Title' },
          { key: 'category', label: 'Category', render: (r) => r.category?.name || '—' },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setModal({ ...row, category_id: row.category_id || '' })}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ),
          },
        ]}
      />
      <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={load} />

      <GalleryModal open={!!modal} data={modal} categories={categories} onClose={() => setModal(null)} onSave={handleSave} />
      <CategoryModal open={!!catModal} data={catModal} onClose={() => setCatModal(null)} onSave={saveCategory} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete item" message="This action cannot be undone." loading={deleting} />
      <ConfirmDialog open={!!deleteCatId} onClose={() => setDeleteCatId(null)} onConfirm={handleDeleteCat} title="Delete category" message="This action cannot be undone." loading={deleting} />
    </div>
  )
}

function GalleryModal({ open, data, categories, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', description: '', image: '', category_id: '' })
  useEffect(() => {
    if (data) setForm({ title: data.title || '', description: data.description || '', image: data.image || '', category_id: data.category_id || '' })
  }, [data])

  return (
    <Modal open={open} onClose={onClose} title={data?.id ? 'Edit item' : 'Add item'} size="lg">
      <div className="space-y-4">
        <FormField label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
        <FormField label="Description"><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></FormField>
        <ImageField label="Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} required />
        <FormField label="Category">
          <Select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
            <option value="">None</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </FormField>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}

function CategoryModal({ open, data, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', slug: '' })
  useEffect(() => {
    if (data) setForm({ name: data.name || '', slug: data.slug || '' })
  }, [data])

  return (
    <Modal open={open} onClose={onClose} title={data?.id ? 'Edit category' : 'Add category'}>
      <div className="space-y-4">
        <FormField label="Name" required><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
        <FormField label="Slug"><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></FormField>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}
