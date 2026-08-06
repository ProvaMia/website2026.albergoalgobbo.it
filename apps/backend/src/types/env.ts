export interface BackendEnv {
  CONTACT_EMAIL?: string
  FROM_EMAIL?: string
  RESEND_API_KEY?: string
}

export interface BackendVariables {
  env: Required<Pick<BackendEnv, 'CONTACT_EMAIL' | 'FROM_EMAIL'>> &
    Pick<BackendEnv, 'RESEND_API_KEY'>
}
