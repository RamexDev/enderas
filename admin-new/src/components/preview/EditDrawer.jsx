/**
 * @fileoverview EditDrawer — right-side slide-over panel that hosts the editor
 * for whichever section the user clicked on the preview.
 *
 * Two modes (driven by the active section's `kind`):
 *
 * 1. singleton — immediately renders the form, pre-populated from the latest
 *    fetched record. Save calls `resource.<resource>.update(null, payload)`.
 *
 * 2. collection — first shows a list of all records in the collection, with a
 *    "+ Add new" button at the top and per-row Edit / Delete (and Toggle /
 *    Publish where supported). Clicking a row swaps the drawer to the form
 *    view; a "Back" button returns to the list. Save calls create() or
 *    update() based on whether the record has an `id`.
 *
 * After every successful save/delete/toggle, the drawer calls
 * `useEditorStore.bumpReload(pageKey)` so the preview page refetches and shows
 * the new content.
 */
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  X,
  Power,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { resourceApi } from '@/services/cmsApi'
import { useEditorStore } from '@/store/useEditorStore'
import { getErrorMessage } from '@/utils/errors'
import { mediaUrl } from '@/utils/helpers'
import { emptyRecordFor, titleFieldFor } from '@/constants/editableSections'
import { cn } from '@/utils/cn'
import Button from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/Modal'
import { Badge, EmptyState } from '@/components/ui/Loading'
import FieldRenderer from './FieldRenderer'

export default function EditDrawer() {
  const activeEdit = useEditorStore((s) => s.activeEdit)
  const closeEdit = useEditorStore((s) => s.closeEdit)
  const bumpReload = useEditorStore((s) => s.bumpReload)

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (activeEdit) {
      document.body.classList.add('drawer-open')
    } else {
      document.body.classList.remove('drawer-open')
    }
    return () => document.body.classList.remove('drawer-open')
  }, [activeEdit])

  // Esc to close.
  useEffect(() => {
    if (!activeEdit) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeEdit()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [activeEdit, closeEdit])

  if (!activeEdit) return null

  const { section, pageKey } = activeEdit

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-primary-950/40 backdrop-blur-sm transition-opacity"
        onClick={closeEdit}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-xl flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`Edit ${section.label}`}
      >
        <DrawerHeader section={section} onClose={closeEdit} />
        <div className="flex-1 overflow-y-auto scroll-area">
          {section.kind === 'singleton' ? (
            <SingletonEditor
              key={section.id}
              section={section}
              pageKey={pageKey}
              onSaved={() => bumpReload(pageKey)}
            />
          ) : (
            <CollectionEditor
              key={section.id}
              section={section}
              pageKey={pageKey}
              preselectedRecord={activeEdit.record}
              onSaved={() => bumpReload(pageKey)}
            />
          )}
        </div>
      </aside>
    </>
  )
}

function DrawerHeader({ section, onClose }) {
  return (
    <header className="flex items-center justify-between border-b border-primary-100 bg-primary-900 px-5 py-4 text-white">
      <div className="min-w-0">
        <h2 className="truncate font-heading text-base font-semibold">{section.label}</h2>
        {section.description && (
          <p className="mt-0.5 truncate text-xs text-primary-300">{section.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close editor"
        className="rounded-md p-1.5 text-primary-200 hover:bg-primary-800 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </header>
  )
}

// ─── Singleton editor ─────────────────────────────────────────────────────

function SingletonEditor({ section, pageKey, onSaved }) {
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await resourceApi[section.resource].get()
      setRecord(data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [section.resource])

  useEffect(() => {
    load()
  }, [load])

  const updateField = (key, value) => {
    setRecord((curr) => (curr ? { ...curr, [key]: value } : curr))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Send only the keys this section declares — prevents stale fields from
      // being written back when multiple singletons share a row (homepage has
      // four singletons all PUTting to /home-page).
      const payload = {}
      for (const field of section.fields) {
        payload[field.key] = record[field.key]
      }
      await resourceApi[section.resource].update(null, payload)
      toast.success(`${section.label} updated`)
      onSaved()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-primary-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-5">
        <EmptyState
          icon={AlertCircle}
          title="Unable to load content"
          description={error}
          action={<Button onClick={load}>Retry</Button>}
        />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-5">
        <FormGrid section={section} record={record} onChange={updateField} />
      </div>
      <DrawerFooter
        onCancel={undefined}
        onSave={handleSave}
        saving={saving}
        saveLabel="Save changes"
      />
    </div>
  )
}

// ─── Collection editor ────────────────────────────────────────────────────

function CollectionEditor({ section, pageKey, preselectedRecord, onSaved }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [view, setView] = useState('list') // 'list' | 'form'
  const [editing, setEditing] = useState(null) // record being edited, or null for "new"
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const list = await resourceApi[section.resource].list({ limit: 100, page: 1 })
      setItems(Array.isArray(list) ? list : [])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [section.resource])

  useEffect(() => {
    load()
  }, [load])

  // If the overlay was opened on a specific record (e.g. user clicked the
  // second hero slide), jump straight to its form.
  useEffect(() => {
    if (preselectedRecord?.id && items.length > 0) {
      const found = items.find((it) => it.id === preselectedRecord.id)
      if (found) {
        setEditing(found)
        setView('form')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, preselectedRecord])

  const updateField = (key, value) => {
    setEditing((curr) => (curr ? { ...curr, [key]: value } : curr))
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      if (editing.id) {
        await resourceApi[section.resource].update(editing.id, editing)
        toast.success('Changes saved')
      } else {
        await resourceApi[section.resource].create(editing)
        toast.success('Created')
      }
      onSaved()
      await load()
      setView('list')
      setEditing(null)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await resourceApi[section.resource].delete(id)
      toast.success('Deleted')
      onSaved()
      await load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeletingId(null)
      setConfirmDeleteId(null)
    }
  }

  const handleToggle = async (id) => {
    try {
      await resourceApi[section.resource].toggle(id)
      onSaved()
      await load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handlePublishToggle = async (item) => {
    try {
      if (item.status === 'published') {
        await resourceApi[section.resource].unpublish(item.id)
        toast.success('Post unpublished')
      } else {
        await resourceApi[section.resource].publish(item.id)
        toast.success('Post published')
      }
      onSaved()
      await load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleAddNew = () => {
    setEditing(emptyRecordFor(section))
    setView('form')
  }

  const handleEdit = (item) => {
    setEditing(item)
    setView('form')
  }

  const handleBack = () => {
    setView('list')
    setEditing(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-primary-500">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-5">
        <EmptyState
          icon={AlertCircle}
          title="Unable to load collection"
          description={error}
          action={<Button onClick={load}>Retry</Button>}
        />
      </div>
    )
  }

  if (view === 'form' && editing) {
    return (
      <div className="flex h-full flex-col">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-1.5 px-5 py-3 text-sm font-medium text-primary-600 hover:bg-primary-50 hover:text-primary-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to list
        </button>
        <div className="flex-1 p-5 pt-0">
          <FormGrid section={section} record={editing} onChange={updateField} />
        </div>
        <DrawerFooter
          onCancel={handleBack}
          onSave={handleSave}
          saving={saving}
          saveLabel={editing.id ? 'Save changes' : 'Create'}
        />
      </div>
    )
  }

  // List view
  const titleKey = titleFieldFor(section)

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-primary-500">
            {items.length} record{items.length === 1 ? '' : 's'}
          </p>
          <Button size="sm" onClick={handleAddNew}>
            <Plus className="h-4 w-4" /> Add new
          </Button>
        </div>

        {items.length === 0 ? (
          <EmptyState
            title="No records yet"
            description="Click 'Add new' to create the first one."
            action={
              <Button size="sm" onClick={handleAddNew}>
                <Plus className="h-4 w-4" /> Add new
              </Button>
            }
          />
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-primary-100 bg-white p-3 hover:border-primary-200"
              >
                {item.image ? (
                  <img
                    src={mediaUrl(item.image)}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded object-cover"
                  />
                ) : item.profile_image ? (
                  <img
                    src={mediaUrl(item.profile_image)}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                ) : item.logo ? (
                  <img
                    src={mediaUrl(item.logo)}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded object-contain bg-primary-50 p-1"
                  />
                ) : item.featured_image ? (
                  <img
                    src={mediaUrl(item.featured_image)}
                    alt=""
                    className="h-12 w-16 shrink-0 rounded object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-primary-100 text-primary-400">
                    <Pencil className="h-4 w-4" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-primary-900">
                    {item[titleKey] || <span className="italic text-primary-400">(untitled)</span>}
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    {section.supportsToggle && 'is_active' in item && (
                      <Badge variant={item.is_active ? 'success' : 'default'}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    )}
                    {section.supportsPublish && (
                      <Badge variant={item.status === 'published' ? 'success' : 'warning'}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {section.supportsToggle && (
                    <IconAction
                      title={item.is_active ? 'Deactivate' : 'Activate'}
                      onClick={() => handleToggle(item.id)}
                    >
                      <Power className="h-3.5 w-3.5" />
                    </IconAction>
                  )}
                  {section.supportsPublish && (
                    <IconAction
                      title={item.status === 'published' ? 'Unpublish' : 'Publish'}
                      onClick={() => handlePublishToggle(item)}
                    >
                      {item.status === 'published' ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </IconAction>
                  )}
                  <IconAction title="Edit" onClick={() => handleEdit(item)} variant="primary">
                    <Pencil className="h-3.5 w-3.5" />
                  </IconAction>
                  <IconAction
                    title="Delete"
                    onClick={() => setConfirmDeleteId(item.id)}
                    variant="danger"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </IconAction>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={confirmDeleteId !== null}
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => confirmDeleteId && handleDelete(confirmDeleteId)}
        title="Delete record"
        message="This will permanently remove the record. This action cannot be undone."
        confirmLabel="Delete"
        loading={deletingId !== null}
      />
    </div>
  )
}

function IconAction({ children, onClick, title, variant = 'ghost' }) {
  const styles = {
    ghost: 'text-primary-500 hover:bg-primary-100 hover:text-primary-900',
    primary: 'text-primary-700 hover:bg-gold-100 hover:text-gold-700',
    danger: 'text-red-500 hover:bg-red-50 hover:text-red-700',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={cn('rounded p-1.5 transition-colors', styles[variant])}
    >
      {children}
    </button>
  )
}

function FormGrid({ section, record, onChange }) {
  if (!record) return null
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {section.fields.map((field) => (
        <FieldRenderer
          key={field.key}
          field={field}
          value={record[field.key]}
          onChange={(v) => onChange(field.key, v)}
        />
      ))}
    </div>
  )
}

function DrawerFooter({ onCancel, onSave, saving, saveLabel }) {
  return (
    <footer className="border-t border-primary-100 bg-primary-50/50 px-5 py-4">
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        )}
        <Button variant="primary" onClick={onSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            saveLabel
          )}
        </Button>
      </div>
    </footer>
  )
}
