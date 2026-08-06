import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LightboxProps {
  images: { src: string; alt: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const { t } = useTranslation()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    },
    [isOpen, onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/95"
      role="dialog"
      aria-modal="true"
      aria-label={t('gallery.lightbox.title')}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/80 transition-colors hover:text-white"
        aria-label={t('aria.close')}
      >
        <X className="h-7 w-7" aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
            aria-label={t('gallery.lightbox.prev')}
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 text-white/80 transition-colors hover:text-white"
            aria-label={t('gallery.lightbox.next')}
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </button>
        </>
      )}

      <div className="flex max-h-screen w-full flex-col items-center justify-center px-16 py-20">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[80vh] max-w-full object-contain"
        />
        {currentImage.alt && (
          <p className="mt-4 max-w-2xl text-center font-sans text-sm font-light text-white/80">
            {currentImage.alt}
          </p>
        )}
        <p className="mt-2 font-sans text-xs font-light text-white/60">
          {currentIndex + 1} {t('gallery.lightbox.of')} {images.length}
        </p>
      </div>
    </div>
  )
}
