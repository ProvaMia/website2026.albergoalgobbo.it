import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group border border-stone/50 bg-cream p-6 transition-all duration-300 hover:border-ink/20 md:p-8',
        className
      )}
    >
      <div className="mb-5 inline-flex text-ink/70">
        <Icon className="h-6 w-6 stroke-[1.25]" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl font-normal text-ink md:text-2xl">{title}</h3>
      <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{description}</p>
    </div>
  )
}
