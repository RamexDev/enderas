/**
 * @fileoverview PreviewPage — shared shell for every visual preview page.
 * Renders the PreviewToolbar above the page content and listens for the
 * per-page reload token so saves in the EditDrawer trigger a refetch.
 */
import { useEffect } from 'react'
import { useEditorStore } from '@/store/useEditorStore'
import PreviewToolbar from '@/components/preview/PreviewToolbar'
import { PageLoader, EmptyState } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'

/**
 * @param {{
 *   title: string,
 *   subtitle?: string,
 *   livePath?: string,
 *   loading: boolean,
 *   error: Error|null,
 *   onRetry: () => void,
 *   reloadToken: number,
 *   onReloadTokenChange: () => void,
 *   children: React.ReactNode
 * }} props
 */
export default function PreviewPage({
  title,
  subtitle,
  livePath,
  loading,
  error,
  onRetry,
  reloadToken,
  onReloadTokenChange,
  children,
}) {
  // When the EditDrawer bumps our reload token, fire the refetch callback.
  useEffect(() => {
    if (reloadToken > 0) onReloadTokenChange()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadToken])

  return (
    <div className="flex min-h-screen flex-col">
      <PreviewToolbar title={title} subtitle={subtitle} livePath={livePath} onRefresh={onRetry} refreshing={loading} />
      <div className="flex-1">
        {loading ? (
          <PageLoader label="Loading preview…" />
        ) : error ? (
          <div className="section-padding">
            <EmptyState
              title="Unable to load preview"
              description={error?.message || 'Please try again.'}
              action={<Button onClick={onRetry}>Retry</Button>}
            />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
