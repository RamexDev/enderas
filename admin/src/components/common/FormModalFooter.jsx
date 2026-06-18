import Button from '@/components/ui/Button'

/**
 * Consistent Cancel / Save footer used inside form modals.
 *
 * @param {object} props
 * @param {() => void} props.onCancel - Closes the modal without saving.
 * @param {() => void} props.onSave - Submits the form payload.
 * @param {string} [props.saveLabel='Save'] - Primary button label.
 * @param {boolean} [props.saving=false] - Disables buttons while a request is in flight.
 */
export function FormModalFooter({ onCancel, onSave, saveLabel = 'Save', saving = false }) {
  return (
    <div className="flex justify-end gap-3">
      <Button variant="secondary" onClick={onCancel} disabled={saving}>
        Cancel
      </Button>
      <Button onClick={onSave} disabled={saving}>
        {saving ? 'Saving…' : saveLabel}
      </Button>
    </div>
  )
}
