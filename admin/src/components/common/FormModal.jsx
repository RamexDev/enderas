import Modal from '@/components/ui/Modal'
import { FormModalFooter } from './FormModalFooter'

/**
 * Reusable modal shell for create/edit forms.
 * Uses `recordKey` to remount children when switching between create and edit,
 * which resets internal form state without an extra `useEffect`.
 *
 * @param {object} props
 * @param {boolean} props.open - Whether the modal is visible.
 * @param {object | null} props.record - Current row being edited, or defaults for create.
 * @param {string} props.entityName - Singular entity label used in the title (e.g. "member").
 * @param {() => void} props.onClose - Closes the modal.
 * @param {(formData: object) => void} props.onSave - Persists the form.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Modal width variant.
 * @param {React.ReactNode} props.children - Form fields; receive form state from parent or inner hook.
 * @param {string} [props.saveLabel='Save'] - Primary action label.
 */
export default function FormModal({
  open,
  record,
  entityName,
  onClose,
  size = 'md',
  children,
}) {
  const isEdit = Boolean(record?.id)
  const title = isEdit ? `Edit ${entityName}` : `Add ${entityName}`
  const recordKey = record?.id ?? 'new'

  return (
    <Modal open={open} onClose={onClose} title={title} size={size}>
      <div key={recordKey}>{children}</div>
    </Modal>
  )
}

/**
 * Renders only the modal footer — use inside `FormModal` when the form
 * component manages its own submit handler.
 */
export { FormModalFooter }
