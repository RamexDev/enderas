/**
 * @fileoverview Modal + ConfirmDialog. Same behaviour as the legacy admin's
 * Modal: Esc to close, body scroll lock, backdrop click to close.
 */
import { useEffect } from 'react'
import { Loader2, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import Button from './Button'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary-950/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          'relative z-10 w-full rounded-xl border border-primary-200 bg-white shadow-xl dark:border-primary-800 dark:bg-primary-900',
          sizes[size],
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-primary-100 px-5 py-4 dark:border-primary-800">
          <h2 className="text-lg font-semibold text-primary-900 dark:text-white">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', loading, danger = true }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-primary-600 dark:text-primary-300">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-1.5 inline h-4 w-4 animate-spin" /> Processing…
            </>
          ) : (
            confirmLabel
          )}
        </Button>
      </div>
    </Modal>
  )
}
