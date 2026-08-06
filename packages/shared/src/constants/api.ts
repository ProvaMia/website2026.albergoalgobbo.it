/**
 * API route paths shared between backend and frontend.
 * Use these constants instead of hardcoding strings.
 */
export const API_ROUTES = {
  health: '/api/health',
  contact: '/api/contact',
} as const

export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES]

/** Default backend port used in development. */
export const DEFAULT_API_PORT = 3001

/** Default frontend port used in development. */
export const DEFAULT_FRONTEND_PORT = 3000
