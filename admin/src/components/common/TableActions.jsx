import Button from '@/components/ui/Button'
import { Pencil, Trash2, Power } from 'lucide-react'

/**
 * Standard row action buttons for CMS data tables.
 * Renders edit, optional status toggle, and delete controls in a consistent layout.
 *
 * @param {object} props
 * @param {() => void} props.onEdit - Opens the edit modal for the row.
 * @param {() => void} [props.onToggle] - Toggles active/published status.
 * @param {() => void} props.onDelete - Opens the delete confirmation dialog.
 * @param {boolean} [props.showToggle=true] - Whether to show the toggle button.
 */
export default function TableActions({ onEdit, onToggle, onDelete, showToggle = true }) {
  return (
    <div className="flex gap-1">
      <Button size="sm" variant="ghost" onClick={onEdit} aria-label="Edit">
        <Pencil className="h-4 w-4" />
      </Button>
      {showToggle && onToggle && (
        <Button size="sm" variant="ghost" onClick={onToggle} aria-label="Toggle status">
          <Power className="h-4 w-4" />
        </Button>
      )}
      <Button size="sm" variant="ghost" onClick={onDelete} aria-label="Delete">
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  )
}
