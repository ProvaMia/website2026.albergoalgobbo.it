import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { CookieConsentProvider } from '@/contexts/CookieConsentContext'
import { CookieConsent } from '@/components/CookieConsent'
import { LanguageRouter } from '@/components/LanguageRouter'
import { ScrollToTop } from '@/components/ScrollToTop'
import { BackToTop } from '@/components/ui/BackToTop'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookieConsentProvider>
          <ScrollToTop />
          <LanguageRouter />
          <BackToTop />
          <CookieConsent />
        </CookieConsentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
