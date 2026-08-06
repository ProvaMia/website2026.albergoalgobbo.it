import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Loader2, Send } from 'lucide-react'
import { API_ROUTES, type ContactRequest } from '@brochure/shared'
import { cn } from '@/lib/utils'
import { LocalizedLink } from '@/components/LocalizedLink'

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className }: ContactFormProps) {
  const { t } = useTranslation()
  const [formState, setFormState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactRequest, string>>>(
    {},
  )
  const [touched, setTouched] = useState<Partial<Record<keyof ContactRequest, boolean>>>(
    {},
  )

  const validate = (data: FormData) => {
    const nextErrors: Partial<Record<keyof ContactRequest, string>> = {}
    const name = data.get('name')?.toString().trim() || ''
    const email = data.get('email')?.toString().trim() || ''
    const message = data.get('message')?.toString().trim() || ''
    const privacy = data.get('privacy') === 'true'

    if (name.length < 2) {
      nextErrors.name = t('contacts.form.validation.name')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      nextErrors.email = t('contacts.form.validation.email')
    }

    if (message.length < 10) {
      nextErrors.message = t('contacts.form.validation.message')
    }

    if (!privacy) {
      nextErrors.privacy = t('contacts.form.validation.privacy')
    }

    return nextErrors
  }

  const handleBlur = (field: keyof ContactRequest) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const validationErrors = validate(data)
    setErrors(validationErrors)
    setTouched({
      name: true,
      email: true,
      message: true,
      privacy: true,
    })

    if (Object.keys(validationErrors).length > 0) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]') as HTMLElement | null
      firstInvalid?.focus()
      return
    }

    setFormState('submitting')

    const payload: ContactRequest = {
      name: data.get('name')?.toString().trim() || '',
      email: data.get('email')?.toString().trim() || '',
      phone: data.get('phone')?.toString().trim() || undefined,
      message: data.get('message')?.toString().trim() || '',
      privacy: true,
      website: data.get('website')?.toString().trim() || undefined,
    }

    const apiUrl = `${import.meta.env.VITE_API_URL || ''}${API_ROUTES.contact}`

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      setFormState('success')
      form.reset()
    } catch (err) {
      console.error('Contact form error:', err)
      setFormState('error')
    }
  }

  if (formState === 'success') {
    return (
      <div
        className={cn('flex items-start gap-4', className)}
        role="status"
        aria-live="polite"
      >
        <div className="flex h-12 w-12 flex-none items-center justify-center border border-gold text-gold">
          <Check className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-serif text-2xl font-light text-ink">{t('contacts.form.successTitle')}</h3>
          <p className="mt-2 font-sans text-base font-light leading-relaxed text-muted">
            {t('contacts.form.successMessage')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      noValidate
      aria-label={t('contacts.form.title')}
    >
      <fieldset disabled={formState === 'submitting'} className="space-y-8">
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">{` `}</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
            >
              {t('contacts.form.name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              onBlur={() => handleBlur('name')}
              className={cn(
                'w-full border-b bg-transparent py-3 font-sans text-base font-light text-ink placeholder:text-stone/70 focus:outline-none transition-colors',
                touched.name && errors.name
                  ? 'border-brick focus:border-brick'
                  : 'border-stone focus:border-gold',
              )}
            />
            {touched.name && errors.name && (
              <p id="name-error" className="font-sans text-sm text-brick">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
            >
              {t('contacts.form.email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              onBlur={() => handleBlur('email')}
              className={cn(
                'w-full border-b bg-transparent py-3 font-sans text-base font-light text-ink placeholder:text-stone/70 focus:outline-none transition-colors',
                touched.email && errors.email
                  ? 'border-brick focus:border-brick'
                  : 'border-stone focus:border-gold',
              )}
            />
            {touched.email && errors.email && (
              <p id="email-error" className="font-sans text-sm text-brick">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
          >
            {t('contacts.form.phone')}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full border-b border-stone bg-transparent py-3 font-sans text-base font-light text-ink placeholder:text-stone/70 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft"
          >
            {t('contacts.form.message')}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            onBlur={() => handleBlur('message')}
            className={cn(
              'w-full resize-none border-b bg-transparent py-3 font-sans text-base font-light text-ink placeholder:text-stone/70 focus:outline-none transition-colors',
              touched.message && errors.message
                ? 'border-brick focus:border-brick'
                : 'border-stone focus:border-gold',
            )}
          />
          {touched.message && errors.message && (
            <p id="message-error" className="font-sans text-sm text-brick">{errors.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="group flex cursor-pointer items-start gap-3">
            <input
              name="privacy"
              type="checkbox"
              value="true"
              required
              aria-invalid={Boolean(touched.privacy && errors.privacy)}
              aria-describedby={errors.privacy ? 'privacy-error' : undefined}
              onBlur={() => handleBlur('privacy')}
              className="mt-1 h-5 w-5 rounded border-stone text-brick focus:ring-gold"
            />
            <span className="font-sans text-sm font-light leading-relaxed text-muted">
              {t('contacts.form.privacy')}{' '}
              <LocalizedLink
                to="privacy"
                className="underline underline-offset-2 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {t('contacts.form.privacyLink')}
              </LocalizedLink>
              .
            </span>
          </label>
          {touched.privacy && errors.privacy && (
            <p id="privacy-error" className="font-sans text-sm text-brick">{errors.privacy}</p>
          )}
        </div>

        {formState === 'error' && (
          <div
            className="border-l-2 border-brick pl-4 font-sans text-sm text-brick"
            role="alert"
            aria-live="assertive"
          >
            <p className="mb-1 font-semibold">{t('contacts.form.errorTitle')}</p>
            <p>{t('contacts.form.errorMessage')}</p>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 border border-brick bg-brick px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:cursor-not-allowed disabled:opacity-70"
        >
          {formState === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('contacts.form.sending')}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t('contacts.form.submit')}
            </>
          )}
        </button>
      </fieldset>
    </form>
  )
}
