import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { localizedRoutes, type RouteKey } from '@/i18n/routes'
import type { SupportedLanguage } from '@/i18n'

export function useLocalizedNavigate() {
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  return (to: RouteKey | string, options?: { replace?: boolean }) => {
    const currentLang = (i18n.language || 'it') as SupportedLanguage

    let path: string
    if (to in localizedRoutes) {
      const routeKey = to as RouteKey
      const localizedPath = localizedRoutes[routeKey][currentLang]
      path = localizedPath ? `/${currentLang}/${localizedPath}` : `/${currentLang}`
    } else if (to.startsWith('/')) {
      path = `/${currentLang}${to}`
    } else {
      path = `/${currentLang}/${to}`
    }

    navigate(path, options)
  }
}
