import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom'
import { BedDouble, CalendarDays, LogOut } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supportedLanguages, type SupportedLanguage } from '@/i18n'
import { INITIAL_BOOKINGS, type Booking } from '@/data/bookings'

export function AdminLayout() {
  const { t, i18n } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const changeLanguage = (newLang: string) => {
    if (newLang === lang || !supportedLanguages.includes(newLang as SupportedLanguage)) return
    i18n.changeLanguage(newLang)
    const newPath = location.pathname.replace(`/${lang}/`, `/${newLang}/`)
    navigate(newPath, { replace: true })
  }

  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS)

  const navItems = [
    { to: `/${lang ?? 'it'}/admin/rooms`, label: t('admin.nav.rooms'), icon: BedDouble },
    { to: `/${lang ?? 'it'}/admin/bookings`, label: t('admin.nav.bookings'), icon: CalendarDays },
  ]

  return (
    <div className="min-h-screen bg-ivory">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/media/logos/logo-al-gobbo-soloimg.png"
              alt="Albergo Al Gobbo"
              className="h-10 w-auto md:h-12"
              loading="lazy"
            />
            <h1 className="font-serif text-xl font-light text-ink md:text-2xl">
              {t('admin.title')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={lang}
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-stone/60 bg-white px-2 py-1.5 font-sans text-sm font-light uppercase tracking-wider text-ink focus:border-gold focus:outline-none"
              aria-label={t('aria.languageSwitcher')}
            >
              {supportedLanguages.map((l) => (
                <option key={l} value={l}>
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft transition-colors hover:text-brick"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">{t('admin.logout')}</span>
            </button>
          </div>
        </div>

        <nav aria-label={t('aria.adminNavigation')} className="mb-8 flex gap-2 border-b border-stone/50">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to.endsWith('/rooms')}
              className={({ isActive }) =>
                `inline-flex items-center gap-2 border-b-2 px-4 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                  isActive
                    ? 'border-ink text-ink'
                    : 'border-transparent text-ink-soft hover:text-ink'
                }`
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <Outlet context={{ bookings, setBookings }} />
      </main>
    </div>
  )
}
