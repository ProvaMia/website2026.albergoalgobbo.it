import { MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface PlaceCardProps {
  title: string
  description: string
  onClick: () => void
  className?: string
}

export function PlaceCard({ title, description, onClick, className }: PlaceCardProps) {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex w-full flex-col items-start border border-stone/50 bg-cream p-6 text-left transition-all duration-300 hover:border-ink/20 hover:bg-white md:p-8',
        className
      )}
    >
      <div className="mb-5 inline-flex text-ink/70 transition-colors group-hover:text-brick">
        <MapPin className="h-6 w-6 stroke-[1.25]" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl font-normal text-ink md:text-2xl">{title}</h3>
      <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">
        {description}
      </p>
      <span className="mt-5 inline-flex items-center font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft transition-colors group-hover:text-ink">
        {t('buttons.learnMore')}
      </span>
    </button>
  )
}
