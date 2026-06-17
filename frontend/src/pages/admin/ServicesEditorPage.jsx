import { useState } from 'react'
import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import { slugify, generateId } from '@/utils/formatDate'
import AdminInput, { AdminTextArea, AdminCard, DataTable } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'
import { ConfirmDialog } from '@/components/organisms/Lightbox'

const emptyService = {
  id: '',
  slug: '',
  title: '',
  excerpt: '',
  description: '',
  icon: 'building',
  image: '',
  features: [''],
  displayOrder: 1,
  active: true,
}

export default function ServicesEditorPage() {
  const services = useContentStore((s) => s.services)
  const addService = useContentStore((s) => s.addService)
  const updateService = useContentStore((s) => s.updateService)
  const deleteService = useContentStore((s) => s.deleteService)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyService)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openCreate = () => {
    setEditing('new')
    setForm({ ...emptyService, id: `service-${Date.now()}` })
  }

  const openEdit = (row) => {
    setEditing(row.id)
    setForm({ ...row, features: [...row.features] })
  }

  const save = () => {
    if (!form.title || !form.slug) {
      toast.error('Title and slug are required')
      return
    }
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      features: form.features.filter(Boolean),
    }
    if (editing === 'new') {
      addService({ ...payload, id: payload.id || `service-${generateId(services)}` })
      toast.success('Service created')
    } else {
      updateService(editing, payload)
      toast.success('Service updated')
    }
    setEditing(null)
    setForm(emptyService)
  }

  const confirmDelete = () => {
    deleteService(deleteTarget.id)
    toast.success('Service deleted')
    setDeleteTarget(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Services</h1>
        <Button variant="primary" onClick={openCreate}>
          Add service
        </Button>
      </div>

      <AdminCard>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'slug', label: 'Slug' },
            {
              key: 'active',
              label: 'Status',
              render: (row) => (row.active !== false ? 'Active' : 'Inactive'),
            },
          ]}
          data={services}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />
      </AdminCard>

      {editing && (
        <AdminCard title={editing === 'new' ? 'Create service' : 'Edit service'}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <AdminInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <AdminInput label="Icon" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            <AdminInput label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>
          <div className="mt-4 grid gap-4">
            <AdminTextArea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <AdminTextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <AdminTextArea
              label="Features (one per line)"
              value={form.features.join('\n')}
              onChange={(e) => setForm({ ...form, features: e.target.value.split('\n') })}
            />
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
        onConfirm={confirmDelete}
        title="Delete service"
        message={`Delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
      />
    </div>
  )
}
