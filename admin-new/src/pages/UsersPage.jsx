/**
 * @fileoverview UsersPage — list, create, edit, deactivate, delete admin
 * users. Super-admin only.
 *
 * Mirrors the legacy admin's user CRUD via /users endpoints.
 */
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, Plus, Power, Trash2, UserPlus } from 'lucide-react'
import ManagePage from '@/components/preview/ManagePage'
import Button from '@/components/ui/Button'
import { Badge, PageLoader, EmptyState, StatusBadge } from '@/components/ui/Loading'
import Modal, { ConfirmDialog } from '@/components/ui/Modal'
import { FormField, Input } from '@/components/ui/Input'
import { usersApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { formatDate } from '@/utils/helpers'

const EMPTY_USER = {
  name: '',
  email: '',
  role: 'editor',
  password: '',
  is_active: true,
}

export default function UsersPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null) // null | { ...record, _isNew: bool }
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await usersApi.list({ page: 1, limit: 100 })
      setItems(result.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleToggle = async (user) => {
    try {
      await usersApi.toggleStatus(user.id)
      toast.success(user.is_active ? 'User deactivated' : 'User activated')
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      const payload = {
        name: editing.name,
        email: editing.email,
        role: 'editor',
      }
      if (editing.password) {
        payload.password = editing.password
      }
      await usersApi.create(payload)
      toast.success('User created')
      setEditing(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirmDelete) return
    setDeleting(true)
    try {
      await usersApi.delete(confirmDelete.id)
      toast.success('User deleted')
      setConfirmDelete(null)
      load()
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  return (
    <ManagePage
      title="Users"
      subtitle="Admin accounts. Editors can manage content; super admins can also manage users and settings."
      action={
        <Button
          onClick={() => setEditing({ ...EMPTY_USER, _isNew: true })}
        >
          <Plus className="h-4 w-4" /> New user
        </Button>
      }
    >
      {loading ? (
        <PageLoader label="Loading users…" />
      ) : error ? (
        <EmptyState title="Unable to load users" description={error} action={<Button onClick={load}>Retry</Button>} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={UserPlus}
          title="No users yet"
          description="Create the first admin user to get started."
          action={<Button onClick={() => setEditing({ ...EMPTY_USER, _isNew: true })}>New user</Button>}
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-primary-200 bg-white dark:border-primary-800 dark:bg-primary-900">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-100 bg-primary-50 text-left text-xs uppercase tracking-wider text-primary-600 dark:border-primary-800 dark:bg-primary-800 dark:text-primary-300">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100 dark:divide-primary-800">
              {items.map((user) => (
                <tr key={user.id} className="hover:bg-primary-50/40 dark:hover:bg-primary-800/40">
                  <td className="px-4 py-3 text-sm font-medium text-primary-900 dark:text-white">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-primary-700 dark:text-primary-300">{user.email}</td>
                  <td className="px-4 py-3">
                    {user.role === 'super_admin' ? (
                      <Badge variant="gold">Super admin</Badge>
                    ) : (
                      <Badge>Editor</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge active={user.is_active} />
                  </td>
                  <td className="px-4 py-3 text-xs text-primary-500 dark:text-primary-400">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {user.role !== 'super_admin' && (
                        <>
                          <button
                            type="button"
                            title={user.is_active ? 'Deactivate' : 'Activate'}
                            onClick={() => handleToggle(user)}
                            className="rounded p-1.5 text-primary-500 hover:bg-primary-100 hover:text-primary-900 dark:text-primary-400 dark:hover:bg-primary-700 dark:hover:text-white"
                          >
                            <Power className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            title="Delete"
                            onClick={() => setConfirmDelete(user)}
                            className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create user modal */}
      <Modal
        open={editing !== null}
        onClose={() => setEditing(null)}
        title="New user"
        size="md"
      >
        {editing && (
          <div className="space-y-4">
            <FormField label="Name" required>
              <Input
                value={editing.name || ''}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              />
            </FormField>
            <FormField label="Email" required>
              <Input
                type="email"
                value={editing.email || ''}
                onChange={(e) => setEditing({ ...editing, email: e.target.value })}
              />
            </FormField>
            <FormField
              label="Password"
              required
              help="At least 12 characters, with uppercase, lowercase, number, and special character."
            >
              <Input
                type="password"
                value={editing.password || ''}
                onChange={(e) => setEditing({ ...editing, password: e.target.value })}
              />
            </FormField>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setEditing(null)} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {saving ? 'Saving…' : 'Create user'}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={confirmDelete !== null}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        title="Delete user"
        message={`Delete ${confirmDelete?.name}? They will no longer be able to sign in.`}
        confirmLabel="Delete"
        loading={deleting}
      />
    </ManagePage>
  )
}
