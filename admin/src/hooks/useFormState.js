import { useCallback, useState } from 'react'

/**
 * Creates a small form state API for modals and editors.
 * `setField` updates a single key; `reset` restores `initialValues`.
 *
 * @param {object} initialValues - Default form shape.
 * @returns {{ form: object, setForm: Function, setField: (key: string, value: unknown) => void, reset: () => void }}
 */
export function useFormState(initialValues) {
  const [form, setForm] = useState(initialValues)

  const setField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  const reset = useCallback(() => {
    setForm(initialValues)
  }, [initialValues])

  return { form, setForm, setField, reset }
}

/**
 * Maps a database record onto form defaults, coercing null/undefined to empty strings.
 *
 * @param {object | null} record - Existing row or null for create mode.
 * @param {object} defaults - Field keys with default empty values.
 * @returns {object} Form-ready object.
 */
export function recordToForm(record, defaults) {
  if (!record) return { ...defaults }
  return Object.keys(defaults).reduce((acc, key) => {
    acc[key] = record[key] ?? defaults[key]
    return acc
  }, {})
}
