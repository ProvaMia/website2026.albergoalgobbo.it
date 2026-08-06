import { cn } from '@/lib/utils'
import { HeroCornerDecoration } from './HeroCornerDecoration'

interface HeroProps {
  variant?: 'home' | 'page'
  title?: string
  subtitle?: string
  microcopy?: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  backgroundImage?: {
    mobile: string
    desktop: string
    mobileSrcSet?: string
    desktopSrcSet?: string
  }
  className?: string
}

export function Hero({
  variant = 'home',
  title,
  subtitle,
  microcopy,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  className,
}: HeroProps) {
  const isHome = variant === 'home'
  const isLightPage = !isHome && !backgroundImage

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaSecondary?.href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(ctaSecondary.href)
      target?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Home hero: full-screen image, anchored at the bottom. If the image is
  // taller than the viewport, only the top is cropped.
  if (isHome && backgroundImage) {
    return (
      <section
        className={cn(
          'relative h-dvh w-full overflow-hidden bg-ivory',
          className
        )}
      >
        <picture className="absolute inset-0">
          <source
            media="(max-width: 768px)"
            srcSet={backgroundImage.mobileSrcSet || backgroundImage.mobile}
            sizes="100vw"
          />
          <source
            media="(min-width: 769px)"
            srcSet={backgroundImage.desktopSrcSet || backgroundImage.desktop}
            sizes="100vw"
          />
          <img
            src={backgroundImage.desktop}
            alt=""
            className="h-full w-full object-cover object-bottom"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* Corner ornaments */}
        <HeroCornerDecoration
          position="left"
          className="absolute top-2 left-2 z-[60] md:top-4 md:left-4"
        />
        <HeroCornerDecoration
          position="right"
          className="absolute top-2 right-2 z-[60] md:top-4 md:right-4"
        />
      </section>
    )
  }

  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        isHome ? 'min-h-screen' : 'min-h-[40vh] md:min-h-[50vh]',
        isLightPage ? 'bg-ivory' : 'bg-night',
        className
      )}
    >
      {backgroundImage && (
        <>
          <picture className="absolute inset-0">
            <source media="(max-width: 768px)" srcSet={backgroundImage.mobile} />
            <source media="(min-width: 769px)" srcSet={backgroundImage.desktop} />
            <img
              src={backgroundImage.desktop}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-0 bg-night/40" aria-hidden="true" />
        </>
      )}

      {/* Elaborate corner ornaments for internal pages */}
      {isLightPage && (
        <>
          <HeroCornerDecoration
            variant="elaborate"
            position="left"
            className="absolute top-3 left-3 z-10 md:top-6 md:left-6"
          />
          <HeroCornerDecoration
            variant="elaborate"
            position="right"
            className="absolute top-3 right-3 z-10 md:top-6 md:right-6"
          />
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 text-center sm:px-6 md:py-32 lg:px-8">
        <div className="flex flex-col items-center">
          {microcopy && (
            <span className="mb-4 inline-block font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {microcopy}
            </span>
          )}
          <h1
            className={cn(
              'font-serif font-light text-balance',
              isLightPage ? 'text-ink' : 'text-white',
              isHome
                ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
                : 'text-4xl md:text-5xl lg:text-6xl'
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                'mt-6 max-w-2xl font-sans font-light text-balance',
                isLightPage ? 'text-ink-soft' : 'text-white/90',
                isHome ? 'text-lg md:text-xl lg:text-2xl' : 'text-base md:text-lg'
              )}
            >
              {subtitle}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className="inline-flex items-center justify-center border border-brick bg-brick px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep"
                >
                  {ctaPrimary.label}
                </a>
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  onClick={handleScrollClick}
                  className={cn(
                    'inline-flex items-center justify-center border px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm transition-colors',
                    isLightPage
                      ? 'border-ink/20 text-ink hover:bg-ink/5'
                      : 'border-white/40 text-white hover:bg-white/10'
                  )}
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
