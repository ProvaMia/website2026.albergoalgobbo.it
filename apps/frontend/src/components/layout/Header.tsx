import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LocalizedLink } from '@/components/LocalizedLink'
import { LanguageSelector } from '@/components/LanguageSelector'
import { localizedRoutes, type RouteKey } from '@/i18n/routes'

const desktopNavItems: { key: RouteKey; labelKey: string }[] = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'about', labelKey: 'nav.about' },
  { key: 'gallery', labelKey: 'nav.gallery' },
  { key: 'contacts', labelKey: 'nav.contacts' },
]

const mobileNavItems: { key: RouteKey; labelKey: string }[] = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'booking', labelKey: 'nav.booking' },
  { key: 'about', labelKey: 'nav.about' },
  { key: 'gallery', labelKey: 'nav.gallery' },
  { key: 'contacts', labelKey: 'nav.contacts' },
]

export function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const pathSegments = location.pathname.split('/').filter(Boolean)
  const currentSlug = pathSegments[1] || ''

  useEffect(() => {
    setIsMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-ink/10 bg-cream/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav
        aria-label={t('aria.mainNavigation')}
        className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8 md:h-20"
      >
        {/* Left: logo */}
        <div className="flex flex-1 items-center justify-start">
          <LocalizedLink to="home" className="flex-shrink-0">
            <img
              src="/media/logos/logo-al-gobbo-soloimg.png"
              alt="Albergo Al Gobbo"
              className="h-8 w-auto md:h-10"
            />
          </LocalizedLink>
        </div>

        {/* Center: page links */}
        <div className="hidden flex-none items-center gap-1 lg:flex">
          {desktopNavItems.map(({ key, labelKey }) => {
            const routePath = localizedRoutes[key]
            const isActive =
              routePath.it === currentSlug ||
              routePath.en === currentSlug ||
              (key === 'home' && currentSlug === '')

            return (
              <LocalizedLink
                key={key}
                to={key}
                className={cn(
                  'group relative px-4 py-2 text-sm font-light text-ink transition-colors hover:text-brick',
                  isActive && 'font-medium'
                )}
              >
                {t(labelKey)}
                <span
                  className={cn(
                    'absolute bottom-0 left-4 right-4 h-px bg-ink transition-all',
                    isActive
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                  )}
                />
              </LocalizedLink>
            )
          })}
        </div>

        {/* Right: booking button + language / mobile menu */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <LocalizedLink
              to="booking"
              className="inline-flex items-center justify-center border border-ink bg-transparent px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {t('nav.booking')}
            </LocalizedLink>
            <LanguageSelector variant="desktop" isScrolled={isScrolled} />
          </div>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-ink transition-colors hover:text-brick lg:hidden"
            aria-label={isMobileOpen ? t('aria.closeMenu') : t('aria.openMenu')}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 overflow-y-auto border-b border-ink/10 bg-cream md:top-20 lg:hidden"
          >
            <nav
              className="flex flex-col py-4"
              aria-label={t('aria.mobileNavigation')}
            >
              {mobileNavItems.map(({ key, labelKey }) => {
                const routePath = localizedRoutes[key]
                const isActive =
                  routePath.it === currentSlug ||
                  routePath.en === currentSlug ||
                  (key === 'home' && currentSlug === '')

                return (
                  <LocalizedLink
                    key={key}
                    to={key}
                    className={cn(
                      'px-6 py-3 text-lg font-light transition-colors',
                      isActive
                        ? 'border-l border-ink bg-ivory text-ink'
                        : 'text-ink hover:bg-ivory'
                    )}
                  >
                    {t(labelKey)}
                  </LocalizedLink>
                )
              })}
              <div className="mt-4 border-t border-ink/10 px-6 pt-4">
                <LanguageSelector variant="mobile" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
