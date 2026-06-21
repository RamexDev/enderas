import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { ROUTES } from '@/constants/routes'
import { getErrorMessage } from '@/utils/errors'
import Button from '@/components/ui/Button'
import { Input, FormField, Label } from '@/components/ui/Input'

const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const appName = import.meta.env.VITE_APP_NAME || 'Enderas CMS'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await login(data.email, data.password)
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
        <h1 className="text-2xl font-semibold text-gold-400">{appName}</h1>
        <p className="mt-2 text-sm text-primary-300">Sign in to manage website content.</p>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <FormField label="Email" error={errors.email?.message} required errorClassName="text-xs text-red-400" labelClassName="text-primary-300">
            <Input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="border-primary-700 bg-primary-800 text-white placeholder:text-primary-300"
              {...register('email')}
            />
          </FormField>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-primary-300">
              Password<span className="ml-0.5 text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="border-primary-700 bg-primary-800 pr-10 text-white placeholder:text-primary-300"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-300 hover:text-primary-100"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password?.message && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
