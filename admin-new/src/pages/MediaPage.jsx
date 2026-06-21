/**
 * @fileoverview MediaPage — image library. Upload, browse, copy URL, delete.
 * Reuses the existing /media endpoints.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Upload, Trash2, Copy, Loader2 } from 'lucide-react'
import ManagePage from '@/components/preview/ManagePage'
import Button from '@/components/ui/Button'
import { PageLoader, EmptyState } from '@/components/ui/Loading'
import Modal from '@/components/ui/Modal'
import { mediaApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { mediaUrl, formatDate, formatFileSize } from '@/utils/helpers'

export default function MediaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const fileInput = useRef(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await mediaApi.list({ page: 1, limit: 60 })
      setItems(result.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setUploading(true)
    try {
      for (const file of files) {
        await mediaApi.upload(file)
      }
      toast.success(`${files.length} file${files.length === 1 ? '' : 's'} uploaded`)
      await load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try {
      await mediaApi.delete(confirmDelete.id)
      toast.success('Deleted')
      setConfirmDelete(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  const copyUrl = (item) => {
    const url = mediaUrl(item.path)
    navigator.clipboard.writeText(url).then(() => toast.success('URL copied'))
  }

  return (
    <ManagePage
      title="Media library"
      subtitle="Images uploaded through the editor. Stored paths can be pasted into any image field."
      action={
        <>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <Button onClick={() => fileInput.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading…' : 'Upload'}
          </Button>
        </>
      }
    >
      {loading ? (
        <PageLoader label="Loading media…" />
      ) : error ? (
        <EmptyState title="Unable to load media" description={error} action={<Button onClick={load}>Retry</Button>} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Upload}
          title="No media yet"
          description="Click Upload to add images. JPG, PNG, and WEBP are supported."
          action={<Button onClick={() => fileInput.current?.click()}>Upload first image</Button>}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border border-primary-100 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-900"
            >
              <div className="relative aspect-square bg-primary-50 dark:bg-primary-800">
                <img
                  src={mediaUrl(item.path)}
                  alt={item.original_name || item.filename}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-primary-950/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => copyUrl(item)}
                    title="Copy URL"
                    className="rounded-md bg-white/95 p-2 text-primary-700 hover:bg-white"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(item)}
                    title="Delete"
                    className="rounded-md bg-white/95 p-2 text-red-600 hover:bg-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="truncate text-xs font-medium text-primary-800 dark:text-primary-200" title={item.original_name || item.filename}>
                  {item.original_name || item.filename}
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[10px] text-primary-400 dark:text-primary-500">
                  <span>{formatFileSize(item.file_size)}</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={confirmDelete !== null} onClose={() => setConfirmDelete(null)} title="Delete media" size="sm">
        <p className="text-sm text-primary-600 dark:text-primary-300">
          This file may be used by content on the website. Deleting it will leave any references pointing at a missing image. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setConfirmDelete(null)} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Delete
          </Button>
        </div>
      </Modal>
    </ManagePage>
  )
}
