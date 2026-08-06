import { cn } from '@/lib/utils'

interface HeroCornerDecorationProps {
  position: 'left' | 'right'
  variant?: 'simple' | 'elaborate'
  className?: string
}

export function HeroCornerDecoration({
  position,
  variant = 'simple',
  className,
}: HeroCornerDecorationProps) {
  const isRight = position === 'right'
  const isElaborate = variant === 'elaborate'

  return (
    <svg
      viewBox={isElaborate ? '0 0 140 140' : '0 0 80 80'}
      className={cn(
        'pointer-events-none hidden h-auto md:block',
        isElaborate ? 'w-20 text-ink/35 lg:w-28' : 'w-16 text-ink/25 lg:w-20',
        isRight && 'scale-x-[-1]',
        className
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {isElaborate ? (
        <>
          {/* Double outer corner frame */}
          <path d="M 10 0 H 130" />
          <path d="M 0 10 V 130" />
          <path d="M 16 0 H 124" />
          <path d="M 0 16 V 124" />

          {/* Stepped inner frames */}
          <path d="M 38 0 V 38 H 0" />
          <path d="M 58 0 V 22 H 0" />
          <path d="M 74 0 V 10 H 0" />

          {/* Large decorative star at the corner */}
          <path
            d="M 28 28 L 30 34 L 36 36 L 30 38 L 28 44 L 26 38 L 20 36 L 26 34 Z"
            className="fill-gold stroke-none"
          />

          {/* Small secondary star */}
          <path
            d="M 48 48 L 49 51 L 52 52 L 49 53 L 48 56 L 47 53 L 44 52 L 47 51 Z"
            className="fill-gold stroke-none"
          />

          {/* Accent dots along the vertical arm */}
          <circle cx="14" cy="44" r="1.5" className="fill-ink/40 stroke-none" />
          <circle cx="14" cy="60" r="1.5" className="fill-ink/40 stroke-none" />
          <circle cx="14" cy="76" r="1.5" className="fill-ink/40 stroke-none" />
          <circle cx="14" cy="92" r="1.5" className="fill-ink/40 stroke-none" />
          <circle cx="14" cy="108" r="1.5" className="fill-ink/40 stroke-none" />

          {/* Tiny cross accents */}
          <path d="M 44 44 L 48 44" />
          <path d="M 46 42 L 46 46" />
          <path d="M 44 76 L 48 76" />
          <path d="M 46 74 L 46 78" />

          {/* Small square outlines */}
          <rect x="36" y="58" width="8" height="8" />
          <rect x="36" y="90" width="8" height="8" />
        </>
      ) : (
        <>
          {/* Outer corner frame */}
          <path d="M 8 0 H 68" />
          <path d="M 0 8 V 68" />

          {/* Inner stepped corner */}
          <path d="M 18 0 V 18 H 0" />
          <path d="M 28 0 V 10 H 0" />

          {/* Decorative star at the corner */}
          <path
            d="M 14 14 L 15.5 18 L 20 19.5 L 15.5 21 L 14 25.5 L 12.5 21 L 8 19.5 L 12.5 18 Z"
            className="fill-gold stroke-none"
          />

          {/* Tiny accent dots */}
          <circle cx="6" cy="36" r="1.5" className="fill-ink/30 stroke-none" />
          <circle cx="6" cy="48" r="1.5" className="fill-ink/30 stroke-none" />
        </>
      )}
    </svg>
  )
}
