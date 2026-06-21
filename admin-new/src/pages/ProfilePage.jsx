import { useState } from 'react'
import { toast } from 'sonner'
import { authApi } from '@/services/cmsApi'
import { useAuthStore } from '@/store/useAuthStore'
import { getErrorMessage } from '@/utils/errors'
import ManagePage from '@/components/preview/ManagePage'
import Button from '@/components/ui/Button'
import { FormField, Input } from '@/components/ui/Input'

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
    <ManagePage title="Profile" subtitle="View your account and change your password.">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl border border-primary-200 bg-white dark:border-primary-800 dark:bg-primary-900">
          <div className="border-b border-primary-100 px-5 py-4 dark:border-primary-800">
            <h3 className="text-sm font-semibold text-primary-900 dark:text-white">Account information</h3>
          </div>
          <div className="space-y-3 p-5 text-sm">
            <div className="flex justify-between border-b border-primary-100 pb-2 dark:border-primary-800">
              <span className="text-primary-500 dark:text-primary-400">Name</span>
              <span className="font-medium text-primary-900 dark:text-white">{user?.name}</span>
            </div>
            <div className="flex justify-between border-b border-primary-100 pb-2 dark:border-primary-800">
              <span className="text-primary-500 dark:text-primary-400">Email</span>
              <span className="font-medium text-primary-900 dark:text-white">{user?.email}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-primary-500 dark:text-primary-400">Role</span>
              <span className="font-medium capitalize text-primary-900 dark:text-white">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-primary-200 bg-white dark:border-primary-800 dark:bg-primary-900">
          <div className="border-b border-primary-100 px-5 py-4 dark:border-primary-800">
            <h3 className="text-sm font-semibold text-primary-900 dark:text-white">Change password</h3>
          </div>
          <div className="p-5">
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
              <Button type="submit" disabled={saving}>
                {saving ? 'Updating\u2026' : 'Update password'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ManagePage>
  )
}
