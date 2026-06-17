import { useState } from 'react'
import { toast } from 'sonner'
import { useContentStore } from '@/store/useContentStore'
import { slugify, generateId } from '@/utils/formatDate'
import AdminInput, { AdminTextArea, AdminCard, DataTable } from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'
import { ConfirmDialog } from '@/components/organisms/Lightbox'

const emptyPost = {
  slug: '',
  title: '',
  excerpt: '',
  category: '',
  author: '',
  date: new Date().toISOString().slice(0, 10),
  readTime: 5,
  image: '',
  content: '',
  status: 'published',
}

export default function BlogEditorPage() {
  const blog = useContentStore((s) => s.blog)
  const addBlogPost = useContentStore((s) => s.addBlogPost)
  const updateBlogPost = useContentStore((s) => s.updateBlogPost)
  const deleteBlogPost = useContentStore((s) => s.deleteBlogPost)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyPost)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openCreate = () => {
    setEditing('new')
    setForm(emptyPost)
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
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      readTime: Number(form.readTime),
    }
    if (editing === 'new') {
      addBlogPost({ ...payload, id: generateId(blog) })
      toast.success('Post created')
    } else {
      updateBlogPost(editing, payload)
      toast.success('Post updated')
    }
    setEditing(null)
    setForm(emptyPost)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-semibold text-primary-900 dark:text-white">Blog Posts</h1>
        <Button variant="primary" onClick={openCreate}>
          Add post
        </Button>
      </div>

      <AdminCard>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'status', label: 'Status' },
          ]}
          data={blog}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
        />
      </AdminCard>

      {editing && (
        <AdminCard title={editing === 'new' ? 'Create post' : 'Edit post'}>
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <AdminInput label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <AdminInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <AdminInput label="Author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <AdminInput label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <AdminInput label="Read time (min)" type="number" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })} />
            <AdminInput label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="md:col-span-2" />
          </div>
          <div className="mt-4 grid gap-4">
            <AdminTextArea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <AdminTextArea label="Content (paragraphs separated by blank lines)" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.status === 'published'}
                onChange={(e) => setForm({ ...form, status: e.target.checked ? 'published' : 'draft' })}
              />
              Published
            </label>
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
          deleteBlogPost(deleteTarget.id)
          toast.success('Post deleted')
          setDeleteTarget(null)
        }}
        title="Delete post"
        message={`Delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
      />
    </div>
  )
}
