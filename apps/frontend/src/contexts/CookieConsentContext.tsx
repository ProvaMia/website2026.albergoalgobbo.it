import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentContextValue {
  showBanner: boolean
  preferences: CookiePreferences
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (prefs: CookiePreferences) => void
}

const COOKIE_CONSENT_KEY = 'cookies-consent-v1'

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setPreferences({ ...defaultPreferences, ...parsed })
      } catch {
        setShowBanner(true)
      }
    } else {
      setShowBanner(true)
    }
    setIsLoaded(true)
  }, [])

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(allAccepted))
    setPreferences(allAccepted)
    setShowBanner(false)
  }

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(onlyNecessary))
    setPreferences(onlyNecessary)
    setShowBanner(false)
  }

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs))
    setPreferences(prefs)
    setShowBanner(false)
  }

  if (!isLoaded) {
    return null
  }

  return (
    <CookieConsentContext.Provider
      value={{ showBanner, preferences, acceptAll, rejectAll, savePreferences }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
