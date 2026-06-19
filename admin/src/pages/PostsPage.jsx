import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { blogApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { ROUTES } from '@/constants/routes'
import { formatDate } from '@/utils/helpers'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import { PublishBadge } from '@/components/ui/Badge'
import { ConfirmDialog } from '@/components/ui/Modal'
import SearchInput from '@/components/ui/SearchInput'
import { FormField, Select } from '@/components/ui/Input'

export default function PostsPage() {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const debounceRef = useRef(null)

  const load = useCallback(async (page = 1, q = '', catId = '') => {
    setLoading(true)
    try {
      const result = await blogApi.list({ page, limit: 10, search: q || undefined, category: catId || undefined })
      setItems(result.data)
      setMeta(result.meta)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(1, search, categoryId) }, [load, search, categoryId])

  useEffect(() => {
    blogApi.listCategories().then(setCategories).catch(() => {})
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      load(1, value, categoryId)
    }, 300)
  }

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  const handlePublishToggle = async (row) => {
    try {
      if (row.status === 'published') {
        await blogApi.unpublish(row.id)
        toast.success('Post unpublished')
      } else {
        await blogApi.publish(row.id)
        toast.success('Post published')
      }
      load(meta.page, search, categoryId)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await blogApi.delete(deleteId)
      toast.success('Post deleted')
      setDeleteId(null)
      load(meta.page, search, categoryId)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  if (loading && !items.length) return <PageLoader />

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        description="Create and manage blog content."
        action={
          <Link to={`${ROUTES.POSTS}/new`}>
            <Button><Plus className="h-4 w-4" /> New post</Button>
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div className="max-w-sm flex-1">
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            placeholder="Search posts…"
          />
        </div>
        <div className="w-48">
          <FormField label="Category">
            <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">All categories</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </FormField>
        </div>
      </div>

      <DataTable
        data={items}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'status', label: 'Status', render: (r) => <PublishBadge status={r.status} /> },
          { key: 'createdAt', label: 'Created', render: (r) => formatDate(r.createdAt) },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="flex gap-1">
                <Link to={`${ROUTES.POSTS}/${row.id}/edit`}>
                  <Button size="sm" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                </Link>
                <Button size="sm" variant="ghost" onClick={() => handlePublishToggle(row)}>
                  {row.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ),
          },
        ]}
      />
      <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={(p) => load(p, search, categoryId)} />

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete post" message="This action cannot be undone." loading={deleting} />
    </div>
  )
}
