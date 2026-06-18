import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { blogApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { slugify } from '@/utils/helpers'
import { ROUTES } from '@/constants/routes'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import { Input, Textarea, FormField, Select } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'

export default function PostEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id || id === 'new'
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', featured_image: '',
    status: 'draft', meta_title: '', meta_description: '', categories: [],
  })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const cats = await blogApi.listCategories()
        setCategories(cats)
        if (!isNew) {
          const post = await blogApi.get(id)
          setForm({
            title: post.title || '',
            slug: post.slug || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            featured_image: post.featured_image || '',
            status: post.status || 'draft',
            meta_title: post.meta_title || '',
            meta_description: post.meta_description || '',
            categories: post.categories?.map((c) => c.id) || [],
          })
        }
      } catch (err) {
        toast.error(getErrorMessage(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, isNew])

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setSaving(true)
    try {
      if (isNew) {
        await blogApi.create(form)
        toast.success('Post created')
      } else {
        await blogApi.update(id, form)
        toast.success('Post saved')
      }
      navigate(ROUTES.POSTS)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const toggleCategory = (catId) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(catId)
        ? f.categories.filter((c) => c !== catId)
        : [...f.categories, catId],
    }))
  }

  if (loading) return <PageLoader />

  return (
    <div className="space-y-6">
      <PageHeader
        title={isNew ? 'New blog post' : 'Edit blog post'}
        action={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate(ROUTES.POSTS)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardBody className="space-y-4">
              <FormField label="Title" required>
                <Input
                  value={form.title}
                  onChange={(e) => {
                    set('title', e.target.value)
                    if (isNew || !form.slug) set('slug', slugify(e.target.value))
                  }}
                />
              </FormField>
              <FormField label="Slug">
                <Input value={form.slug} onChange={(e) => set('slug', e.target.value)} />
              </FormField>
              <FormField label="Excerpt">
                <Textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
              </FormField>
              <FormField label="Content">
                <Textarea value={form.content} onChange={(e) => set('content', e.target.value)} rows={12} />
              </FormField>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="SEO" />
            <CardBody className="space-y-4">
              <FormField label="Meta title"><Input value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} /></FormField>
              <FormField label="Meta description"><Textarea value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} /></FormField>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader title="Publish" />
            <CardBody className="space-y-4">
              <FormField label="Status">
                <Select value={form.status} onChange={(e) => set('status', e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </Select>
              </FormField>
              <ImageField label="Featured image" value={form.featured_image} onChange={(v) => set('featured_image', v)} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Categories" />
            <CardBody className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.categories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="rounded border-primary-300"
                  />
                  {cat.name}
                </label>
              ))}
              {!categories.length && <p className="text-sm text-primary-500">No categories yet</p>}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
