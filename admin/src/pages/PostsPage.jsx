import { useEffect, useState } from 'react'
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

export default function PostsPage() {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async (page = 1, q = search) => {
    setLoading(true)
    try {
      const result = await blogApi.list({ page, limit: 10, search: q || undefined })
      setItems(result.data)
      setMeta(result.meta)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handlePublishToggle = async (row) => {
    try {
      if (row.status === 'published') {
        await blogApi.unpublish(row.id)
        toast.success('Post unpublished')
      } else {
        await blogApi.publish(row.id)
        toast.success('Post published')
      }
      load(meta.page)
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
      load(meta.page)
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

      <div className="mb-4 max-w-sm">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts…"
        />
        <Button size="sm" variant="secondary" className="mt-2" onClick={() => load(1, search)}>Search</Button>
      </div>

      <DataTable
        data={items}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'status', label: 'Status', render: (r) => <PublishBadge status={r.status} /> },
          { key: 'created_at', label: 'Created', render: (r) => formatDate(r.created_at) },
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
      <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={(p) => load(p)} />

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete post" message="This action cannot be undone." loading={deleting} />
    </div>
  )
}
