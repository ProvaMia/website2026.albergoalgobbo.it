import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { CookieConsentProvider } from '@/contexts/CookieConsentContext'
import { CookieConsent } from '@/components/CookieConsent'
import { LanguageRouter } from '@/components/LanguageRouter'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookieConsentProvider>
          <LanguageRouter />
          <CookieConsent />
        </CookieConsentProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
