/**
 * @fileoverview EditOverlay — wraps a region of the preview with hover/click
 * affordances that open the EditDrawer for the bound section/record.
 *
 * Behaviour:
 *  - Always renders its children (the preview markup) inside a `relative`
 *    container.
 *  - When `editMode` is on (the default), hovering the region shows a dashed
 *    gold ring and a floating "Edit" button in the top-right corner.
 *  - Clicking the button (or pressing Enter while focused) opens the drawer
 *    via `useEditorStore.openEdit`.
 *  - When `editMode` is off, the overlay is invisible and non-interactive —
 *    the preview looks exactly like the public site.
 *
 * For "collection" sections the parent passes a `record` so the drawer opens
 * on the specific item (e.g. a single hero slide). For "singleton" sections
 * `record` is null and the drawer loads the singleton itself.
 */
import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useEditorStore } from '@/store/useEditorStore'

export default function EditOverlay({ section, record = null, pageKey, children, className }) {
  const editMode = useEditorStore((s) => s.editMode)
  const openEdit = useEditorStore((s) => s.openEdit)
  const [hovered, setHovered] = useState(false)

  if (!editMode) return <div className={className}>{children}</div>

  const handleOpen = () => openEdit(section, record, pageKey)

  return (
    <div
      className={cn('relative transition-shadow', hovered && 'edit-ring rounded-md', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      {children}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          handleOpen()
        }}
        onFocus={(e) => e.stopPropagation()}
        className={cn(
          'absolute right-2 top-2 z-30 inline-flex items-center gap-1.5 rounded-md bg-gold-500 px-2.5 py-1.5 text-xs font-semibold text-primary-950 shadow-lg ring-1 ring-white/40 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
        aria-label={`Edit ${section.label}`}
      >
        <Pencil className="h-3 w-3" />
        Edit
      </button>
      <div
        className={cn(
          'pointer-events-none absolute left-2 top-2 z-20 rounded-md bg-primary-950/85 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold-300 transition-opacity',
          hovered ? 'opacity-100' : 'opacity-0',
        )}
      >
        {section.label}
      </div>
    </div>
  )
}
