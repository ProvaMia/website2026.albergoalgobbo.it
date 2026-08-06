import type { SupportedLanguage } from './index'

/**
 * Define localized routes here.
 * Each key maps to a route name, with translations for each language.
 *
 * Example:
 *   about: { it: 'chi-siamo', en: 'about-us' }
 *   → /it/chi-siamo, /en/about-us
 */
export const localizedRoutes = {
  home: {
    it: '',
    en: '',
  },
  booking: {
    it: 'prenota',
    en: 'book',
  },
  about: {
    it: 'chi-siamo',
    en: 'about',
  },
  gallery: {
    it: 'galleria',
    en: 'gallery',
  },
  contacts: {
    it: 'contatti',
    en: 'contacts',
  },
  privacy: {
    it: 'privacy',
    en: 'privacy',
  },
  login: {
    it: 'login',
    en: 'login',
  },
  admin: {
    it: 'admin',
    en: 'admin',
  },
} as const

export type RouteKey = keyof typeof localizedRoutes

/**
 * Get the localized path for a route
 */
export function getLocalizedPath(
  routeKey: RouteKey,
  lang: SupportedLanguage
): string {
  const path = localizedRoutes[routeKey][lang]
  return path ? `/${lang}/${path}` : `/${lang}`
}

/**
 * Find route key from a path segment
 */
export function findRouteKeyFromPath(
  pathSegment: string,
  lang: SupportedLanguage
): RouteKey | null {
  for (const [key, routes] of Object.entries(localizedRoutes)) {
    if (routes[lang] === pathSegment) {
      return key as RouteKey
    }
  }
  return null
}
