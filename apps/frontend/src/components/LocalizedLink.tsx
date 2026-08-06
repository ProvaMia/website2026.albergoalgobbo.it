import { Link, type LinkProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { localizedRoutes, type RouteKey } from '@/i18n/routes'
import type { SupportedLanguage } from '@/i18n'

interface LocalizedLinkProps extends Omit<LinkProps, 'to'> {
  to: RouteKey | string
}

export function LocalizedLink({ to, children, ...props }: LocalizedLinkProps) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language as SupportedLanguage

  let path: string

  if (to in localizedRoutes) {
    const routeKey = to as RouteKey
    const localizedPath = localizedRoutes[routeKey][currentLang]
    path = localizedPath ? `/${currentLang}/${localizedPath}` : `/${currentLang}`
  } else if (to.startsWith('/')) {
    // Absolute path - add language prefix
    path = `/${currentLang}${to}`
  } else if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
    // External link - pass through
    path = to
  } else {
    // Relative path - add language prefix
    path = `/${currentLang}/${to}`
  }

  return (
    <Link to={path} {...props}>
      {children}
    </Link>
  )
}
