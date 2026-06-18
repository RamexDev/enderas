import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/errors'
import { useAsyncData } from './useAsyncData'

/**
 * Manages singleton CMS records (homepage, about page, settings, contact info).
 * Loads once on mount and exposes a `save` helper with toast feedback.
 *
 * @param {() => Promise<object>} getFn - Fetches the current record.
 * @param {(data: object) => Promise<object>} updateFn - Persists updated fields.
 * @param {string} [successMessage='Changes saved'] - Toast shown after a successful save.
 */
export function useRecordEditor(getFn, updateFn, successMessage = 'Changes saved') {
  const { data, setData, loading } = useAsyncData(getFn)
  const [saving, setSaving] = useState(false)

  const updateField = useCallback((key, value) => {
    setData((current) => (current ? { ...current, [key]: value } : current))
  }, [setData])

  const save = useCallback(async () => {
    if (!data) return
    setSaving(true)
    try {
      const updated = await updateFn(data)
      setData(updated)
      toast.success(successMessage)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setSaving(false)
    }
  }, [data, updateFn, setData, successMessage])

  return { data, loading, saving, setData, updateField, save }
}
