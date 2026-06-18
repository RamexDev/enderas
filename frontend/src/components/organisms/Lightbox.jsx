import { useEffect, useRef } from 'react'
import Icon from '@/components/atoms/Icon'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'

export default function Lightbox({ item, onClose, onPrev, onNext }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-primary-950/90 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${item.title}`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl bg-primary-900 shadow-2xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-primary-900 hover:bg-gold-500"
          aria-label="Close preview"
        >
          <Icon name="close" className="w-5 h-5" />
        </button>
        <div className="relative min-h-0 flex-1">
          <img src={item.image} alt={item.title} className="max-h-[55vh] w-full object-contain sm:max-h-[70vh]" />
          <button
            type="button"
            onClick={onPrev}
            className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-primary-950/50 text-white backdrop-blur-sm hover:bg-white hover:text-primary-950 sm:bottom-auto sm:left-3 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2"
            aria-label="Previous image"
          >
            <Icon name="chevronLeft" className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-primary-950/50 text-white backdrop-blur-sm hover:bg-white hover:text-primary-950 sm:bottom-auto sm:right-3 sm:top-1/2 sm:h-11 sm:w-11 sm:-translate-y-1/2"
            aria-label="Next image"
          >
            <Icon name="chevronRight" className="w-5 h-5" />
          </button>
        </div>
        <div className="shrink-0 p-4 text-white sm:p-6">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge variant="gold" className="!bg-gold-500/20 !text-gold-200 !ring-gold-400/30">
              {item.category}
            </Badge>
            {item.value && <span className="text-sm text-primary-100/70">{item.value}</span>}
          </div>
          <h3 className="font-heading text-xl font-semibold sm:text-2xl">{item.title}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-primary-100/70">
            <Icon name="mapPin" className="w-4 h-4" /> {item.location}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Modal({ open, onClose, title, children }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-primary-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl dark:bg-primary-900 sm:max-h-none sm:max-w-lg sm:rounded-2xl sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="modal-title" className="font-heading text-lg font-semibold text-primary-900 dark:text-white sm:text-xl">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-primary-700 hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
            aria-label="Close dialog"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm' }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="mb-6 text-sm text-primary-700 dark:text-primary-200">{message}</p>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm} className="w-full sm:w-auto">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
