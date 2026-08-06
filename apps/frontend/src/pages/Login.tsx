import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { HeroCornerDecoration } from '@/components/ui/HeroCornerDecoration'

export function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { lang } = useParams<{ lang: string }>()
  const { login, error: authError, isAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'robots'
      document.head.appendChild(meta)
    }
    meta.content = 'noindex, nofollow'
    return () => {
      meta?.remove()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${lang ?? 'it'}/admin`, { replace: true })
    }
  }, [isAuthenticated, navigate, lang])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) return

    setIsSubmitting(true)
    setError(null)

    try {
      await login(username, password)
    } catch {
      setError(authError ?? t('login.error.invalidCredentials'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ivory py-24 md:min-h-screen md:py-32">
      <HeroCornerDecoration
        variant="elaborate"
        position="left"
        className="absolute top-3 left-3 z-10 md:top-6 md:left-6"
      />
      <HeroCornerDecoration
        variant="elaborate"
        position="right"
        className="absolute top-3 right-3 z-10 md:top-6 md:right-6"
      />

      <div className="relative z-10 mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-light text-ink md:text-5xl">
            {t('login.hero.title')}
          </h1>
          {t('login.hero.subtitle') && (
            <p className="mx-auto mt-4 max-w-sm font-sans text-base font-light text-ink-soft md:text-lg">
              {t('login.hero.subtitle')}
            </p>
          )}
        </div>

        <div className="mt-10 border border-stone/50 bg-cream p-8 md:p-10">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center border border-gold/40 text-gold">
              <LockKeyhole className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="username"
                className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
              >
                {t('login.form.username')}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isSubmitting}
                className="w-full border border-stone/60 bg-white px-4 py-3 font-sans text-base font-light text-ink placeholder:text-stone focus:border-gold focus:outline-none disabled:opacity-50"
                placeholder={t('login.form.username')}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
              >
                {t('login.form.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full border border-stone/60 bg-white px-4 py-3 font-sans text-base font-light text-ink placeholder:text-stone focus:border-gold focus:outline-none disabled:opacity-50"
                placeholder={t('login.form.password')}
              />
            </div>

            {error && (
              <p className="font-sans text-sm text-brick" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'inline-flex w-full items-center justify-center border px-8 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors',
                'border-brick bg-brick hover:bg-brick-deep disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              {isSubmitting ? t('login.form.submitting') : t('login.form.submit')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
