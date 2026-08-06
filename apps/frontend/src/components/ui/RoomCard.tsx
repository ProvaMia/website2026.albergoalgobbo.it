import { Users, Wifi, Wind, Droplets, Flame, PawPrint, Coffee } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface RoomCardProps {
  name: string
  description: string
  image: string
  capacity: string
  priceFrom: number
  services?: string[]
  serviceLabels?: Record<string, string>
  href?: string
  onBook?: () => void
  disabled?: boolean
  buttonLabel?: string
  className?: string
}

const serviceIconMap: Record<string, typeof Wifi> = {
  wifi: Wifi,
  ac: Wind,
  bathroom: Droplets,
  heating: Flame,
  pets: PawPrint,
  breakfast: Coffee,
}

export function RoomCard({
  name,
  description,
  image,
  capacity,
  priceFrom,
  services = [],
  serviceLabels,
  href = '#',
  onBook,
  disabled = false,
  buttonLabel,
  className,
}: RoomCardProps) {
  const { t } = useTranslation()
  const label = buttonLabel || t('buttons.bookNow')

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden border border-stone/50 bg-cream transition-all duration-300 hover:border-ink/20',
        disabled && 'opacity-90',
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
        <span className="absolute right-3 top-3 border border-white/50 bg-night/80 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-white">
          da €{priceFrom}/notte
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-serif text-xl font-normal text-ink md:text-2xl">{name}</h3>
        <p className="mt-2 line-clamp-2 font-sans text-sm font-light leading-relaxed text-muted">{description}</p>

        <div className="mt-4 flex items-center gap-2 font-sans text-sm font-light text-ink-soft">
          <Users className="h-4 w-4 text-gold" aria-hidden="true" />
          <span>{capacity}</span>
        </div>

        {services.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {services.map((service) => {
              const Icon = serviceIconMap[service] || Wifi
              const serviceLabel = serviceLabels?.[service] || service
              return (
                <li
                  key={service}
                  className="inline-flex items-center gap-1 border border-stone/60 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wider text-ink-soft"
                >
                  <Icon className="h-3 w-3 text-gold" aria-hidden="true" />
                  <span className="capitalize">{serviceLabel}</span>
                </li>
              )
            })}
          </ul>
        )}

        {disabled ? (
          <button
            type="button"
            disabled
            className="mt-6 inline-flex w-full items-center justify-center border border-ink/30 bg-transparent px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/40 opacity-60 cursor-not-allowed"
          >
            {label}
          </button>
        ) : onBook ? (
          <button
            type="button"
            onClick={onBook}
            className="mt-6 inline-flex w-full items-center justify-center border border-ink px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {label}
          </button>
        ) : (
          <a
            href={href}
            className="mt-6 inline-flex w-full items-center justify-center border border-ink px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {label}
          </a>
        )}
      </div>
    </article>
  )
}
