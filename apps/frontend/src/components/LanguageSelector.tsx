import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { supportedLanguages, type SupportedLanguage } from '@/i18n'
import { localizedRoutes } from '@/i18n/routes'
import { cn } from '@/lib/utils'

/**
 * Metadata for every language this selector knows how to render.
 * At runtime the dropdown is filtered down to the project's `supportedLanguages`,
 * so you can enable a new language simply by adding its code to
 * `src/i18n/index.ts` — as long as the metadata exists here the UI picks it up.
 */
interface LanguageMeta {
  code: string
  flag: string
  name: string
  short: string
}

const languagesMeta: LanguageMeta[] = [
  { code: 'it', flag: '🇮🇹', name: 'Italiano', short: 'IT' },
  { code: 'en', flag: '🇬🇧', name: 'English', short: 'EN' },
  { code: 'fr', flag: '🇫🇷', name: 'Français', short: 'FR' },
  { code: 'es', flag: '🇪🇸', name: 'Español', short: 'ES' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch', short: 'DE' },
  { code: 'pt', flag: '🇵🇹', name: 'Português', short: 'PT' },
  { code: 'pl', flag: '🇵🇱', name: 'Polski', short: 'PL' },
  { code: 'ja', flag: '🇯🇵', name: '日本語', short: 'JA' },
]

const languages = languagesMeta.filter(
  (l): l is LanguageMeta & { code: SupportedLanguage } =>
    (supportedLanguages as readonly string[]).includes(l.code)
)

interface LanguageSelectorProps {
  variant?: 'desktop' | 'mobile'
  isScrolled?: boolean
}

export function LanguageSelector({
  variant = 'desktop',
  isScrolled = false,
}: LanguageSelectorProps) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const currentLang = (i18n.language || supportedLanguages[0]) as SupportedLanguage
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage =
    languages.find((l) => l.code === currentLang) || languages[0]

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const switchLanguage = (newLang: SupportedLanguage) => {
    if (newLang === currentLang) {
      setIsOpen(false)
      return
    }

    // Translate the current path to the target language via localizedRoutes
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const currentPath = pathSegments.slice(1).join('/')

    let newPath = ''
    for (const [, routes] of Object.entries(localizedRoutes)) {
      if (routes[currentLang] === currentPath) {
        newPath = routes[newLang]
        break
      }
    }

    if (!newPath && currentPath) {
      newPath = currentPath
    }

    i18n.changeLanguage(newLang)
    navigate(`/${newLang}${newPath ? `/${newPath}` : ''}`)
    setIsOpen(false)
  }

  if (variant === 'mobile') {
    return (
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              lang.code === currentLang
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <span className="text-base">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
          isScrolled
            ? 'text-gray-900 hover:bg-gray-100'
            : 'text-ink hover:bg-ink/5'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none">{currentLanguage.flag}</span>
        <span>{currentLanguage.short}</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
          role="listbox"
          aria-activedescendant={`lang-${currentLang}`}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              id={`lang-${lang.code}`}
              role="option"
              aria-selected={lang.code === currentLang}
              onClick={() => switchLanguage(lang.code)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left',
                lang.code === currentLang
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
