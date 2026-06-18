import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/errors'

/**
 * Encapsulates the repeated CRUD list pattern used across CMS resource pages.
 * Handles modal open/close, create/update, optional status toggle, and delete confirmation.
 *
 * @param {object} config
 * @param {() => Promise<Array>} config.listFn - Fetches all items for the table.
 * @param {(data: object) => Promise<*>} [config.createFn] - Creates a new record.
 * @param {(id: string|number, data: object) => Promise<*>} [config.updateFn] - Updates an existing record.
 * @param {(id: string|number) => Promise<*>} [config.deleteFn] - Deletes a record.
 * @param {(id: string|number) => Promise<*>} [config.toggleFn] - Toggles active/published status.
 * @param {() => void} config.reload - Refetch function from `useAsyncData` or `usePaginatedList`.
 * @param {object} config.emptyRecord - Default field values when creating a new item.
 * @param {{ create?: string, update?: string, delete?: string, toggle?: string }} [config.messages] - Toast messages.
 */
export function useCrudList({
  createFn,
  updateFn,
  deleteFn,
  toggleFn,
  reload,
  emptyRecord,
  messages = {},
}) {
  const {
    create: createMsg = 'Created successfully',
    update: updateMsg = 'Updated successfully',
    delete: deleteMsg = 'Deleted successfully',
    toggle: toggleMsg = 'Status updated',
  } = messages

  const [editingRecord, setEditingRecord] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const isModalOpen = editingRecord !== null

  /** Opens the form modal for a new record using `emptyRecord` defaults. */
  const openCreate = useCallback(() => {
    setEditingRecord({ ...emptyRecord })
  }, [emptyRecord])

  /** Opens the form modal pre-filled with an existing row. */
  const openEdit = useCallback((record) => {
    setEditingRecord(record)
  }, [])

  /** Closes the form modal without persisting changes. */
  const closeModal = useCallback(() => {
    setEditingRecord(null)
  }, [])

  /**
   * Persists form data — calls create or update based on whether the record has an `id`.
   * @param {object} formData - Validated form payload from the modal.
   */
  const save = useCallback(async (formData) => {
    try {
      if (editingRecord?.id) {
        await updateFn(editingRecord.id, formData)
        toast.success(updateMsg)
      } else {
        await createFn(formData)
        toast.success(createMsg)
      }
      closeModal()
      await reload()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [editingRecord, createFn, updateFn, closeModal, reload, createMsg, updateMsg])

  /** Toggles the active/status flag for a row, then refreshes the list. */
  const toggle = useCallback(async (id) => {
    if (!toggleFn) return
    try {
      await toggleFn(id)
      toast.success(toggleMsg)
      await reload()
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [toggleFn, reload, toggleMsg])

  /** Executes the pending delete after user confirmation. */
  const confirmDelete = useCallback(async () => {
    if (!deleteId || !deleteFn) return
    setDeleting(true)
    try {
      await deleteFn(deleteId)
      toast.success(deleteMsg)
      setDeleteId(null)
      await reload()
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setDeleting(false)
    }
  }, [deleteId, deleteFn, reload, deleteMsg])

  return {
    editingRecord,
    isModalOpen,
    openCreate,
    openEdit,
    closeModal,
    save,
    toggle,
    deleteId,
    setDeleteId,
    deleting,
    confirmDelete,
    isEditing: Boolean(editingRecord?.id),
  }
}
