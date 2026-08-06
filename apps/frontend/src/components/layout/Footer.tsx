import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail } from 'lucide-react'
import { LocalizedLink } from '@/components/LocalizedLink'
import { type RouteKey } from '@/i18n/routes'

const footerNavItems: { key: RouteKey; labelKey: string }[] = [
  { key: 'home', labelKey: 'nav.home' },
  { key: 'booking', labelKey: 'nav.booking' },
  { key: 'about', labelKey: 'nav.about' },
  { key: 'gallery', labelKey: 'nav.gallery' },
  { key: 'contacts', labelKey: 'nav.contacts' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <img
              src="/media/logos/logo-al-gobbo-BIANCO.png"
              alt="Albergo Al Gobbo"
              className="h-8 w-auto"
              loading="lazy"
            />
            <p className="mt-4 max-w-sm font-sans text-sm font-light leading-relaxed text-white/70">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-normal text-gold">{t('footer.navigation')}</h3>
            <ul className="mt-4 space-y-2">
              {footerNavItems.map(({ key, labelKey }) => (
                <li key={key}>
                  <LocalizedLink
                    to={key}
                    className="inline-block font-sans text-sm font-light text-white/80 transition-colors hover:text-gold"
                  >
                    {t(labelKey)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-normal text-gold">{t('footer.contacts')}</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                <span className="font-sans text-sm font-light text-white/80">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:${t('footer.phone').replace(/\s/g, '')}`}
                  className="font-sans text-sm font-light text-white/80 transition-colors hover:text-gold"
                >
                  {t('footer.phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`mailto:${t('footer.email')}`}
                  className="font-sans text-sm font-light text-white/80 transition-colors hover:text-gold"
                >
                  {t('footer.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-sans text-xs font-light text-white/50">
            © {year} Albergo Al Gobbo — {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-4">
            <LocalizedLink
              to="privacy"
              className="font-sans text-xs font-light text-white/50 transition-colors hover:text-gold"
            >
              {t('footer.privacy')}
            </LocalizedLink>
            <span className="text-white/30" aria-hidden="true">|</span>
            <LocalizedLink
              to="privacy"
              className="font-sans text-xs font-light text-white/50 transition-colors hover:text-gold"
            >
              {t('footer.cookiePolicy')}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
