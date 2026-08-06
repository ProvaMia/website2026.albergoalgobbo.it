import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Hero } from '@/components/ui/Hero'
import { ContactForm } from '@/components/ui/ContactForm'

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

function InfoRow({ icon, label, children }: InfoRowProps) {
  return (
    <li className="flex items-start gap-4 border-t border-stone/40 py-5 first:border-t-0">
      <div className="flex h-11 w-11 flex-none items-center justify-center border border-gold/40 text-gold">
        {icon}
      </div>
      <div className="min-w-0 pt-0.5">
        <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
          {label}
        </p>
        <div className="font-sans text-base font-light leading-relaxed text-ink">{children}</div>
      </div>
    </li>
  )
}

function InfoSection() {
  const { t } = useTranslation()

  return (
    <div>
      <h2 className="font-serif text-2xl font-light text-ink md:text-3xl">
        {t('contacts.info.title')}
      </h2>
      <div className="mt-3 h-px w-16 bg-gold" />

      <ul className="mt-8 space-y-0">
        <InfoRow icon={<MapPin className="h-5 w-5" />} label={t('contacts.info.addressLabel')}>
          <span className="block">{t('contact.address')}</span>
          <span className="block text-muted">{t('contact.city')}</span>
        </InfoRow>

        <InfoRow icon={<Phone className="h-5 w-5" />} label={t('contacts.info.phoneLabel')}>
          <a
            href={`tel:${t('contact.phone').replace(/\s/g, '')}`}
            className="transition-colors hover:text-brick"
          >
            {t('contact.phone')}
          </a>
        </InfoRow>

        <InfoRow icon={<Mail className="h-5 w-5" />} label={t('contacts.info.emailLabel')}>
          <a
            href={`mailto:${t('contact.email')}`}
            className="break-all transition-colors hover:text-brick"
          >
            {t('contact.email')}
          </a>
        </InfoRow>
      </ul>
    </div>
  )
}

function MapSection() {
  const { t } = useTranslation()

  return (
    <section aria-label={t('contacts.map.title')}>
      <iframe
        title={t('contacts.map.title')}
        src="https://www.google.com/maps?q=Campo+San+Geremia+312%2C+Cannaregio%2C+30121+Venezia%2C+Italy&output=embed"
        className="block h-[360px] w-full border-0 md:h-[460px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  )
}

export function Contacts() {
  const { t } = useTranslation()

  return (
    <>
      <Hero variant="page" title={t('contacts.hero.title')} subtitle={t('contacts.hero.subtitle')} />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-0">
            <div className="lg:col-span-4 lg:pr-16">
              <InfoSection />
            </div>

            <div className="lg:col-span-8 lg:border-l lg:border-stone/30 lg:pl-16">
              <div className="mb-10">
                <h2 className="font-serif text-2xl font-light text-ink md:text-3xl">
                  {t('contacts.form.title')}
                </h2>
                <div className="mt-3 h-px w-16 bg-gold" />
                <p className="mt-4 max-w-xl font-sans text-base font-light leading-relaxed text-muted">
                  {t('contacts.form.subtitle')}
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
    </>
  )
}
