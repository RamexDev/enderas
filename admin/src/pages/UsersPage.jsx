import { useState } from 'react'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Power } from 'lucide-react'
import { usersApi } from '@/services/cmsApi'
import { getErrorMessage } from '@/utils/errors'
import { ROLES } from '@/constants/roles'
import { usePaginatedList } from '@/hooks'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'
import Button from '@/components/ui/Button'
import Pagination, { DataTable } from '@/components/ui/DataTable'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import Modal, { ConfirmDialog } from '@/components/ui/Modal'
import { Input, FormField, Select } from '@/components/ui/Input'

export default function UsersPage() {
  const { items, meta, loading, loadPage } = usePaginatedList(
    (params) => usersApi.list(params),
    { limit: 10 },
  )
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleSave = async (form) => {
    try {
      if (modal?.id) {
        await usersApi.update(modal.id, { name: form.name, email: form.email, role: form.role })
        toast.success('User updated')
      } else {
        await usersApi.create(form)
        toast.success('User created')
      }
      setModal(null)
      loadPage(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleToggle = async (id) => {
    try {
      await usersApi.toggleStatus(id)
      toast.success('User status updated')
      loadPage(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await usersApi.delete(deleteId)
      toast.success('User deleted')
      setDeleteId(null)
      loadPage(meta.page)
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setDeleting(false)
    }
  }

  if (loading && !items.length) return <PageLoader />

  return (
    <div>
      <PageHeader
        title="Users"
        description="Manage admin users and roles. Super admin only."
        action={<Button onClick={() => setModal({ name: '', email: '', password: '', role: ROLES.EDITOR })}><Plus className="h-4 w-4" /> Add user</Button>}
      />
      <DataTable
        data={items}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          {
            key: 'role',
            label: 'Role',
            render: (r) => (
              <Badge variant={r.role === ROLES.SUPER_ADMIN ? 'info' : 'default'}>
                {r.role === ROLES.SUPER_ADMIN ? 'Super Admin' : 'Editor'}
              </Badge>
            ),
          },
          { key: 'status', label: 'Status', render: (r) => <StatusBadge active={r.is_active} /> },
          {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => setModal(row)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleToggle(row.id)}><Power className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
              </div>
            ),
          },
        ]}
      />
      <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={loadPage} />
      <UserModal open={!!modal} data={modal} onClose={() => setModal(null)} onSave={handleSave} />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete user" message="This action cannot be undone." loading={deleting} />
    </div>
  )
}

function UserModal({ open, data, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: ROLES.EDITOR })
  useEffect(() => {
    if (data) setForm({
      name: data.name || '',
      email: data.email || '',
      password: '',
      role: data.role || ROLES.EDITOR,
    })
  }, [data])

  return (
    <Modal open={open} onClose={onClose} title={data?.id ? 'Edit user' : 'Add user'}>
      <div className="space-y-4">
        <FormField label="Name" required><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></FormField>
        <FormField label="Email" required><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></FormField>
        {!data?.id && (
          <FormField label="Password" required>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <p className="mt-1 text-xs text-primary-500">Min 12 chars with upper, lower, number, and special character.</p>
          </FormField>
        )}
        <FormField label="Role">
          <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value={ROLES.EDITOR}>Editor</option>
            <option value={ROLES.SUPER_ADMIN}>Super Admin</option>
          </Select>
        </FormField>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSave(form)}>Save</Button>
        </div>
      </div>
    </Modal>
  )
}
