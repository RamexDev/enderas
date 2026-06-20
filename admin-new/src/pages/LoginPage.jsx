/**
 * @fileoverview LoginPage — full-screen login surface.
 */
import { Toaster } from 'sonner'
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <LoginForm />
    </>
  )
}
