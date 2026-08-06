import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-night/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className={cn(
          'relative max-h-[90vh] w-full max-w-lg overflow-y-scroll border border-stone/50 bg-white p-6 md:p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
          className
        )}
      >
        {title ? (
          <div className="flex items-start justify-between gap-4">
            <h3
              id="modal-title"
              className="font-serif text-2xl font-light text-ink"
            >
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 -mt-2 p-2 text-ink-soft transition-colors hover:text-brick"
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-ink-soft transition-colors hover:text-brick"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <div className={title ? 'mt-6' : undefined}>{children}</div>
      </div>
    </div>
  )
}
