import { useState } from 'react'
import { toast } from 'sonner'
import { authApi } from '@/services/cmsApi'
import { useAuthStore } from '@/store/useAuthStore'
import { getErrorMessage } from '@/utils/errors'
import { PageHeader } from '@/components/layout/Header'
import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { Input, FormField } from '@/components/ui/Input'

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const [passwords, setPasswords] = useState({ old_password: '', new_password: '', confirm: '' })
  const [saving, setSaving] = useState(false)

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwords.new_password !== passwords.confirm) {
      toast.error('New passwords do not match')
      return
    }
    setSaving(true)
    try {
      await authApi.changePassword(passwords.old_password, passwords.new_password)
      toast.success('Password changed successfully')
      setPasswords({ old_password: '', new_password: '', confirm: '' })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Profile" description="View your account and change your password." />

      <Card>
        <CardHeader title="Account information" />
        <CardBody className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-primary-100 py-2">
            <span className="text-primary-500">Name</span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <div className="flex justify-between border-b border-primary-100 py-2">
            <span className="text-primary-500">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-primary-500">Role</span>
            <span className="font-medium capitalize">{user?.role?.replace('_', ' ')}</span>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Change password" />
        <CardBody>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <FormField label="Current password" required>
              <Input
                type="password"
                value={passwords.old_password}
                onChange={(e) => setPasswords({ ...passwords, old_password: e.target.value })}
                autoComplete="current-password"
              />
            </FormField>
            <FormField label="New password" required>
              <Input
                type="password"
                value={passwords.new_password}
                onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })}
                autoComplete="new-password"
              />
            </FormField>
            <FormField label="Confirm new password" required>
              <Input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                autoComplete="new-password"
              />
            </FormField>
            <Button type="submit" disabled={saving}>{saving ? 'Updating…' : 'Update password'}</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}
