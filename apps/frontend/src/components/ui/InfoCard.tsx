import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InfoItem {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

interface InfoCardProps {
  items: InfoItem[]
  className?: string
}

export function InfoCard({ items, className }: InfoCardProps) {
  return (
    <div className={cn('border border-stone/50 bg-cream p-6 md:p-8', className)}>
      <dl className="space-y-5">
        {items.map((item, index) => {
          const Icon = item.icon
          const content = (
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-none items-center justify-center border border-gold/30 bg-white">
                <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
              </div>
              <div>
                <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                  {item.label}
                </dt>
                <dd className="mt-1 font-sans text-base font-light text-ink">
                  {item.href ? (
                    <a href={item.href} className="hover:text-brick transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            </div>
          )
          return <div key={index}>{content}</div>
        })}
      </dl>
    </div>
  )
}
