/**
 * @fileoverview PreviewToolbar — slim bar that sits above the preview area.
 * Shows the current page label, an "edit mode" toggle (turn off hover rings to
 * inspect the preview as a visitor would see it), a refresh button, and a
 * "View live" link that opens the configured public site URL.
 */
import { ExternalLink, RefreshCw, PencilRuler, Eye } from 'lucide-react'
import { useEditorStore } from '@/store/useEditorStore'
import { cn } from '@/utils/cn'

const FRONTEND_URL =
  import.meta.env.VITE_FRONTEND_URL ||
  (import.meta.env.VITE_API_BASE_URL || '').replace(/\/api\/v1\/?$/, '') ||
  'http://localhost:5174'

/**
 * @param {{ title: string, subtitle?: string, onRefresh?: () => void, refreshing?: boolean, livePath?: string }} props
 */
export default function PreviewToolbar({ title, subtitle, onRefresh, refreshing, livePath = '/' }) {
  const editMode = useEditorStore((s) => s.editMode)
  const setEditMode = useEditorStore((s) => s.setEditMode)

  const liveUrl = `${FRONTEND_URL.replace(/\/$/, '')}${livePath}`

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary-200 bg-white px-4 py-2.5">
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold text-primary-900">{title}</h2>
        {subtitle && <p className="truncate text-xs text-primary-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setEditMode(!editMode)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
            editMode
              ? 'bg-gold-100 text-gold-700 ring-1 ring-inset ring-gold-200'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200',
          )}
          title="Toggle hover-to-edit affordances"
        >
          {editMode ? <PencilRuler className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {editMode ? 'Edit mode' : 'Preview mode'}
        </button>
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary-100 px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-200 disabled:opacity-50"
            title="Refresh preview"
          >
            <RefreshCw className={cn('h-3.5 w-3.5', refreshing && 'animate-spin')} />
            Refresh
          </button>
        )}
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary-900 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-primary-800"
          title="Open the live public site in a new tab"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View live
        </a>
      </div>
    </div>
  )
}
