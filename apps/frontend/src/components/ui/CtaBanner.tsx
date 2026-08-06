import { cn } from '@/lib/utils'

interface CtaBannerProps {
  title: string
  buttonLabel: string
  buttonHref: string
  className?: string
}

export function CtaBanner({ title, buttonLabel, buttonHref, className }: CtaBannerProps) {
  return (
    <section className={cn('border-y border-ink/10 bg-ivory py-16 md:py-24', className)}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-light text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <a
          href={buttonHref}
          className="mt-8 inline-flex items-center justify-center border border-brick bg-brick px-10 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep hover:border-brick-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  )
}
