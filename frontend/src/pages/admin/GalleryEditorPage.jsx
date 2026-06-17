import { useState } from 'react'
import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import { generateId } from '@/utils/formatDate'
import AdminInput, { AdminCard, DataTable } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'
import { ConfirmDialog } from '@/components/organisms/Lightbox'

const emptyItem = { title: '', category: '', image: '', location: '', value: '' }

export default function GalleryEditorPage() {
  const gallery = useContentStore((s) => s.gallery)
  const addGalleryItem = useContentStore((s) => s.addGalleryItem)
  const updateGalleryItem = useContentStore((s) => s.updateGalleryItem)
  const deleteGalleryItem = useContentStore((s) => s.deleteGalleryItem)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyItem)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openCreate = () => {
    setEditing('new')
    setForm(emptyItem)
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm(row)
  }

  const save = () => {
    if (!form.title) {
      toast.error('Title is required')
      return
    }
    if (editing === 'new') {
      addGalleryItem({ ...form, id: generateId(gallery) })
      toast.success('Gallery item created')
    } else {
      updateGalleryItem(editing, form)
      toast.success('Gallery item updated')
    }
    setEditing(null)
    setForm(emptyItem)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Gallery</h1>
        <Button variant="primary" onClick={openCreate}>
          Add item
        </Button>
      </div>

      <AdminCard>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'location', label: 'Location' },
          ]}
          data={gallery}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />
      </AdminCard>

      {editing && (
        <AdminCard title={editing === 'new' ? 'Create gallery item' : 'Edit gallery item'}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <AdminInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <AdminInput label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <AdminInput label="Value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
            <AdminInput label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="md:col-span-2" />
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="primary" onClick={save}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </AdminCard>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          deleteGalleryItem(deleteTarget.id)
          toast.success('Gallery item deleted')
          setDeleteTarget(null)
        }}
        title="Delete gallery item"
        message={`Delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
      />
    </div>
  )
}
