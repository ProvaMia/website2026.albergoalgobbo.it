import { useTranslation } from 'react-i18next'
import { Hero } from '@/components/ui/Hero'

interface LegalSection {
  id: string
  title: string
  paragraphs: string[]
  list?: string[]
}

export function Privacy() {
  const { t } = useTranslation()
  const sections = t('privacy.sections', { returnObjects: true }) as LegalSection[]

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <>
      <Hero variant="page" title={t('privacy.hero.title')} subtitle={t('privacy.hero.subtitle')} />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <nav
              aria-label={t('privacy.tocLabel')}
              className="lg:col-span-4"
            >
              <div className="sticky top-28 border border-stone/40 bg-ivory p-6 md:p-8">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
                  {t('privacy.tocTitle')}
                </p>
                <ul className="mt-6 space-y-3">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => handleNavClick(e, section.id)}
                        className="block font-sans text-sm font-light leading-snug text-ink-soft transition-colors hover:text-brick"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <article className="lg:col-span-8">
              <p className="mb-10 font-sans text-sm font-light text-muted">
                {t('privacy.lastUpdated')}
              </p>

              <div className="space-y-12">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h2 className="font-serif text-2xl font-light text-ink md:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4">
                      {section.paragraphs.map((paragraph, index) => (
                        <p
                          key={index}
                          className="font-sans text-base font-light leading-relaxed text-ink-soft"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.list && section.list.length > 0 && (
                        <ul className="mt-4 space-y-2 border-l-2 border-gold/40 pl-5">
                          {section.list.map((item, index) => (
                            <li
                              key={index}
                              className="font-sans text-base font-light leading-relaxed text-ink-soft"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
