import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { loginSchema } from '@/constants/validationSchemas'
import { useAuthStore } from '@/store/useAuthStore'
import AdminInput from '@/components/admin/AdminForm'
import Button from '@/components/atoms/Button'
import SeoHead from '@/components/organisms/SeoHead'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: '' },
  })

  const onSubmit = ({ password }) => {
    const ok = login(password)
    if (ok) {
      toast.success('Welcome back')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid password')
    }
  }

  return (
    <>
      <SeoHead title="Admin Login" noIndex />
      <div className="flex min-h-screen items-center justify-center bg-primary-950 px-4">
        <div className="w-full max-w-md rounded-2xl border border-primary-800 bg-primary-900 p-8 text-white shadow-2xl">
          <h1 className="font-heading text-2xl font-semibold">Enderas CMS</h1>
          <p className="mt-2 text-sm text-primary-200/70">Sign in to manage website content.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <AdminInput
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message || error}
              {...register('password')}
            />
            <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
