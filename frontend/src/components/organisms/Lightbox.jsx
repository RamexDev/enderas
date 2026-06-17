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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-primary-950/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${item.title}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-primary-900 shadow-2xl"
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
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-primary-950"
          aria-label="Previous image"
        >
          <Icon name="chevronLeft" className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white hover:bg-white hover:text-primary-950"
          aria-label="Next image"
        >
          <Icon name="chevronRight" className="w-5 h-5" />
        </button>
        <img src={item.image} alt={item.title} className="max-h-[70vh] w-full object-contain" />
        <div className="p-6 text-white">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="gold" className="!bg-gold-500/20 !text-gold-200 !ring-gold-400/30">
              {item.category}
            </Badge>
            {item.value && <span className="text-sm text-primary-100/70">{item.value}</span>}
          </div>
          <h3 className="font-heading text-2xl font-semibold">{item.title}</h3>
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
      className="fixed inset-0 z-[80] flex items-center justify-center bg-primary-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-primary-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="font-heading text-xl font-semibold text-primary-900 dark:text-white">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-primary-700 hover:bg-primary-100 dark:text-primary-200 dark:hover:bg-primary-800"
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
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
