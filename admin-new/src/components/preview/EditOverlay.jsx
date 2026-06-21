/**
 * @fileoverview EditOverlay — wraps a region of the preview with an always-
 * visible Edit button (in edit mode) that opens the EditDrawer for the bound
 * section / record.
 *
 * Behaviour:
 *  - Always renders its children (the preview markup) inside a `relative`
 *    container.
 *  - When `editMode` is on, a floating "Edit" button and section label badge
 *    are persistently visible in the top corners. Hovering the region adds a
 *    dashed gold ring as a visual cue.
 *  - Clicking the button opens the drawer via `useEditorStore.openEdit`.
 *  - When `editMode` is off, the overlay is invisible and non-interactive —
 *    the preview looks exactly like the public site.
 *
 * For "collection" sections the parent passes a `record` so the drawer opens
 * on the specific item (e.g. a single hero slide). For "singleton" sections
 * `record` is null and the drawer loads the singleton itself.
 */
import { Pencil } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useEditorStore } from '@/store/useEditorStore'

export default function EditOverlay({ section, record = null, pageKey, children, className }) {
  const editMode = useEditorStore((s) => s.editMode)
  const openEdit = useEditorStore((s) => s.openEdit)

  if (!editMode) return <div className={className}>{children}</div>

  const handleOpen = () => openEdit(section, record, pageKey)

  return (
    <div className={cn('group/edit relative rounded-md transition-shadow hover:edit-ring', className)}>
      {children}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleOpen()
        }}
        onFocus={(e) => e.stopPropagation()}
        className="absolute right-2 top-2 z-30 inline-flex items-center gap-1.5 rounded-md bg-gold-500 px-2.5 py-1.5 text-xs font-semibold text-primary-950 shadow-lg ring-1 ring-white/40 opacity-100 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover/edit:ring-2 group-hover/edit:ring-gold-300"
        aria-label={`Edit ${section.label}`}
      >
        <Pencil className="h-3 w-3" />
        Edit
      </button>
      <div className="pointer-events-none absolute left-2 top-2 z-20 rounded-md bg-primary-950/85 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-300 opacity-100">
        {section.label}
      </div>
    </div>
  )
}
