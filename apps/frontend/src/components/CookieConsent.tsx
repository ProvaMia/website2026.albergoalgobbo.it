import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Settings, X } from 'lucide-react'
import { useCookieConsent, type CookiePreferences } from '@/contexts/CookieConsentContext'
import { LocalizedLink } from './LocalizedLink'

export function CookieConsent() {
  const { t } = useTranslation()
  const { showBanner, acceptAll, rejectAll, savePreferences } = useCookieConsent()
  const [showPreferences, setShowPreferences] = useState(false)
  const [tempPrefs, setTempPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  if (!showBanner) return null

  return (
    <>
      {/* Banner */}
      {!showPreferences && (
        <div
          className="fixed bottom-6 left-1/2 z-[9999] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 border border-ink/10 bg-cream p-5 shadow-sm animate-in slide-in-from-bottom-5 fade-in duration-300"
          role="dialog"
          aria-label={t('cookie.title', 'Cookie consent')}
        >
          <p className="mb-4 pr-6 font-sans text-sm font-light leading-relaxed text-ink-soft">
            {t('cookie.message')}{' '}
            <LocalizedLink
              to="privacy"
              className="font-medium text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-brick"
            >
              {t('cookie.learnMore')}
            </LocalizedLink>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <button
                onClick={acceptAll}
                className="inline-flex items-center justify-center border border-ink bg-ink px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink-soft"
              >
                {t('cookie.acceptAll', 'Accetta tutti')}
              </button>
              <button
                onClick={rejectAll}
                className="inline-flex items-center justify-center border border-ink/30 bg-transparent px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                {t('cookie.rejectAll', 'Rifiuta')}
              </button>
            </div>

            <button
              onClick={() => setShowPreferences(true)}
              className="inline-flex items-center justify-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink"
            >
              <Settings className="h-3.5 w-3.5" />
              {t('cookie.customize', 'Personalizza')}
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-night/40 p-4 animate-in fade-in duration-200"
          onClick={() => setShowPreferences(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto border border-ink/10 bg-cream shadow-sm animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-serif text-xl font-normal text-ink">
                  {t('cookie.preferencesTitle', 'Preferenze Cookie')}
                </h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-1 text-ink-soft transition-colors hover:text-ink"
                  aria-label={t('aria.close', 'Chiudi')}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mb-6 font-sans text-sm font-light leading-relaxed text-muted">
                {t('cookie.preferencesDescription', 'Gestisci le tue preferenze sui cookie. I cookie necessari sono sempre attivi.')}
              </p>

              <div className="space-y-3">
                {/* Necessary */}
                <div className="flex items-center justify-between border border-ink/10 bg-ivory p-4">
                  <div>
                    <p className="font-sans text-sm font-medium text-ink">{t('cookie.necessary', 'Necessari')}</p>
                    <p className="font-sans text-xs font-light text-muted">{t('cookie.necessaryDesc', 'Essenziali per il funzionamento del sito.')}</p>
                  </div>
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-ink-soft">{t('cookie.alwaysOn', 'Sempre attivi')}</span>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between border border-ink/10 bg-ivory p-4">
                  <div className="pr-3">
                    <p className="font-sans text-sm font-medium text-ink">{t('cookie.analytics', 'Analitici')}</p>
                    <p className="font-sans text-xs font-light text-muted">{t('cookie.analyticsDesc', 'Ci aiutano a capire come usi il sito.')}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={tempPrefs.analytics}
                    aria-label={t('cookie.analytics', 'Analitici')}
                    onClick={() => setTempPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${
                      tempPrefs.analytics ? 'border-ink bg-ink' : 'border-ink/30 bg-transparent'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-transform ${
                        tempPrefs.analytics
                          ? 'translate-x-5 bg-white'
                          : 'translate-x-0.5 bg-ink'
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between border border-ink/10 bg-ivory p-4">
                  <div className="pr-3">
                    <p className="font-sans text-sm font-medium text-ink">{t('cookie.marketing', 'Marketing')}</p>
                    <p className="font-sans text-xs font-light text-muted">{t('cookie.marketingDesc', 'Per contenuti e pubblicità personalizzati.')}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={tempPrefs.marketing}
                    aria-label={t('cookie.marketing', 'Marketing')}
                    onClick={() => setTempPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                    className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${
                      tempPrefs.marketing ? 'border-ink bg-ink' : 'border-ink/30 bg-transparent'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 rounded-full transition-transform ${
                        tempPrefs.marketing
                          ? 'translate-x-5 bg-white'
                          : 'translate-x-0.5 bg-ink'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-ink"
                >
                  {t('cookie.cancel', 'Annulla')}
                </button>
                <button
                  onClick={() => {
                    savePreferences(tempPrefs)
                    setShowPreferences(false)
                  }}
                  className="inline-flex items-center justify-center border border-ink bg-ink px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink-soft"
                >
                  {t('cookie.savePreferences', 'Salva preferenze')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
