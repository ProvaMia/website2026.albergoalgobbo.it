import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { CookieConsentProvider } from '@/contexts/CookieConsentContext'
import { CookieConsent } from '@/components/CookieConsent'
import { LanguageRouter } from '@/components/LanguageRouter'
import { BackToTop } from '@/components/ui/BackToTop'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookieConsentProvider>
          <LanguageRouter />
          <BackToTop />
          <CookieConsent />
        </CookieConsentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
