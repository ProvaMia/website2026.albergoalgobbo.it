import { useEffect } from 'react'
import { Routes, Route, Navigate, useParams, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  supportedLanguages,
  defaultLanguage,
  type SupportedLanguage,
} from '@/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SkipLink } from '@/components/ui/SkipLink'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Booking } from '@/pages/Booking'
import { Gallery } from '@/pages/Gallery'
import { Contacts } from '@/pages/Contacts'
import { Privacy } from '@/pages/Privacy'
import { Login } from '@/pages/Login'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { AdminLayout } from '@/pages/admin/AdminLayout'
import { AdminRooms } from '@/pages/admin/AdminRooms'
import { AdminBookings } from '@/pages/admin/AdminBookings'

function LanguageWrapper() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()
  const location = useLocation()
  const isLogin = location.pathname.endsWith('/login')
  const isAdmin = location.pathname.includes('/admin')
  const hideFooter = isLogin || isAdmin
  const hideHeader = isAdmin

  useEffect(() => {
    if (lang && supportedLanguages.includes(lang as SupportedLanguage)) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang)
      }
    }
  }, [lang, i18n])

  if (!lang || !supportedLanguages.includes(lang as SupportedLanguage)) {
    return <Navigate to={`/${defaultLanguage}`} replace />
  }

  return (
    <>
      <SkipLink />
      {!hideHeader && <Header />}
      <main id="main-content">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </>
  )
}

export function LanguageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${defaultLanguage}`} replace />} />

      <Route path="/:lang" element={<LanguageWrapper />}>
        <Route index element={<Home />} />
        <Route path="prenota" element={<Booking />} />
        <Route path="book" element={<Booking />} />
        <Route path="chi-siamo" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="galleria" element={<Gallery />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contatti" element={<Contacts />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="login" element={<Login />} />
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="rooms" replace />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="bookings" element={<AdminBookings />} />
        </Route>
      </Route>
    </Routes>
  )
}
