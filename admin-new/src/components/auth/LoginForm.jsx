/**
 * @fileoverview Login form — email + password, show/hide password toggle.
 * Mirrors the legacy admin's LoginPage pattern but styled for the editor.
 */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { getErrorMessage } from '@/utils/errors'
import Button from '@/components/ui/Button'
import { Input, FormField } from '@/components/ui/Input'

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
})

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await login(values.email, values.password)
      toast.success('Welcome back')
      const from = location.state?.from?.pathname || ROUTES.HOME
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-primary-800 bg-primary-900 p-8 text-white shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 font-heading text-lg font-semibold text-primary-950">
            E
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold">Enderas</h1>
            <p className="text-xs text-primary-300">Visual editor · sign in</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Email" required error={errors.email?.message}>
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@enderas.org"
              className="border-primary-700 bg-primary-800 text-white placeholder:text-primary-400"
              {...register('email')}
            />
          </FormField>

          <FormField label="Password" required error={errors.password?.message}>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                className="border-primary-700 bg-primary-800 text-white placeholder:text-primary-400 pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-primary-300 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </FormField>

          <Button type="submit" disabled={submitting} className="w-full" size="lg">
            {submitting ? 'Signing in…' : (
              <>
                <LogIn className="h-4 w-4" /> Sign in
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-primary-400">
          The visual editor uses the same admin accounts as the legacy CMS.
        </p>
      </div>
    </div>
  )
}
