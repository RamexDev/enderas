/**
 * @fileoverview MediaPage — image library. Upload, browse, copy URL, delete.
 * Reuses the existing /media endpoints.
 */
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'
import ManagePage from '@/components/preview/ManagePage'
import Button from '@/components/ui/Button'
import { PageLoader, EmptyState } from '@/components/ui/Loading'
import { mediaApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { mediaUrl, normalizeMediaPath, formatDate, formatFileSize } from '@/utils/helpers'

export default function MediaPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const copyUrl = (item) => {
    const path = normalizeMediaPath(item.path)
    navigator.clipboard.writeText(path).then(() => toast.success('URL copied'))
  }

  return (
    <ManagePage
      title="Media library"
      subtitle="Images uploaded through the editor. Stored paths can be pasted into any image field."
    >
      {loading ? (
        <PageLoader label="Loading media…" />
      ) : error ? (
        <EmptyState title="Unable to load media" description={error} action={<Button onClick={load}>Retry</Button>} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={Copy}
          title="No media yet"
          description="Images uploaded through the editor will appear here."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl border border-primary-100 bg-white shadow-sm dark:border-primary-800 dark:bg-primary-900"
            >
              <div className="relative aspect-square bg-primary-50 dark:bg-primary-800">
                <img
                  src={mediaUrl(item.path)}
                  alt={item.original_name || item.filename}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => copyUrl(item)}
                  title="Copy URL"
                  className="absolute right-2 top-2 rounded-md bg-primary-950/70 p-2 text-white backdrop-blur-sm transition-colors hover:bg-primary-950/90"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
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
    </ManagePage>
  )
}
