import { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'
import { Upload, Trash2 } from 'lucide-react'
import { mediaApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { mediaUrl, formatDate, formatFileSize } from '@/utils/helpers'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader, EmptyState } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import { ConfirmDialog } from '@/components/ui/Modal'
import SearchInput from '@/components/ui/SearchInput'

export default function MediaPage() {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ page: 1, totalPages: 1 })
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const fileRef = useRef(null)

  const load = async (page = 1) => {
    setLoading(true)
    try {
      const result = await mediaApi.list({ page, limit: 12 })
      setItems(result.data)
      setMeta(result.meta)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await mediaApi.upload(file)
      toast.success('File uploaded')
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await mediaApi.delete(deleteId)
      toast.success('File deleted')
      setDeleteId(null)
      load(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  const filtered = search
    ? items.filter((m) =>
        (m.original_name || m.filename || '').toLowerCase().includes(search.toLowerCase()),
      )
    : items

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Upload and manage images used across the website."
        action={
          <>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} />
            <Button onClick={() => fileRef.current?.click()} disabled={uploading}>
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading…' : 'Upload image'}
            </Button>
          </>
        }
      />

      <div className="mb-4 max-w-sm">
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by filename…" />
      </div>

      {loading && !items.length ? (
        <PageLoader />
      ) : filtered.length === 0 ? (
        <EmptyState title="No media files" description="Upload images to get started." />
      ) : (
        <>
          <DataTable
            data={filtered}
            columns={[
              {
                key: 'preview',
                label: 'Preview',
                render: (r) => (
                  <img src={mediaUrl(r.path)} alt="" className="h-12 w-16 rounded object-cover" />
                ),
              },
              { key: 'original_name', label: 'File name', render: (r) => r.original_name || r.filename },
              { key: 'file_size', label: 'Size', render: (r) => formatFileSize(r.file_size) },
              { key: 'created_at', label: 'Uploaded', render: (r) => formatDate(r.created_at) },
              {
                key: 'actions',
                label: 'Actions',
                render: (row) => (
                  <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                ),
              },
            ]}
          />
          <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={load} />
        </>
      )}

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete file" message="This file may be used on the website. This action cannot be undone." loading={deleting} />
    </div>
  )
}
