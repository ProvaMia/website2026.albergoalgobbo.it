import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  dark?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'mb-3 inline-block text-[11px] font-medium uppercase tracking-[0.25em]',
            dark ? 'text-gold' : 'text-gold'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-3xl font-light md:text-4xl lg:text-5xl',
          dark ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 font-sans text-base font-light leading-relaxed md:text-lg',
            dark ? 'text-white/80' : 'text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
