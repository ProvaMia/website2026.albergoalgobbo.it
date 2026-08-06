import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Trophy } from 'lucide-react'
import { Hero } from '@/components/ui/Hero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PlaceCard } from '@/components/ui/PlaceCard'
import { Modal } from '@/components/ui/Modal'
import { LocalizedLink } from '@/components/LocalizedLink'
import { attractions, type Attraction } from '@/data/attractions'

const timeline = [
  { key: 'milestone1' },
  { key: 'milestone2' },
  { key: 'milestone3' },
] as const

export function About() {
  const { t, i18n } = useTranslation()
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null)

  const lang = i18n.language as 'it' | 'en'

  return (
    <>
      <Hero
        variant="page"
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
      />

      <section id="storia" className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                title={t('about.story.title')}
              />
              <p className="mt-6 font-sans text-base font-light leading-relaxed text-muted md:text-lg">
                {t('about.story.text')}
              </p>
            </div>
            <div className="overflow-hidden border border-ink/10">
              <img
                src="/media/images/hall-algobbo.jpg"
                alt={t('about.story.imageAlt')}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('about.timeline.title')}
            subtitle={t('about.timeline.subtitle')}
          />

          <div className="relative mt-16">
            {/* Horizontal line — desktop */}
            <div
              className="absolute top-8 left-0 hidden h-px w-full bg-stone md:block"
              aria-hidden="true"
            />

            <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {timeline.map((milestone) => (
                <div key={milestone.key} className="relative flex gap-6 md:block md:text-center">
                  {/* Year medallion */}
                  <div className="flex flex-none flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-cream">
                      <span className="font-serif text-lg font-medium text-ink">
                        {t(`about.timeline.${milestone.key}.year`)}
                      </span>
                    </div>
                    <div className="mt-2 h-full w-px bg-stone md:hidden" aria-hidden="true" />
                  </div>

                  <div className="pb-8 md:pt-10">
                    <h3 className="font-serif text-2xl font-normal text-ink">
                      {t(`about.timeline.${milestone.key}.title`)}
                    </h3>
                    <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">
                      {t(`about.timeline.${milestone.key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('about.attractions.title')}
            subtitle={t('about.attractions.subtitle')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction) => (
              <PlaceCard
                key={attraction.id}
                title={attraction.name[lang] || attraction.name.it}
                description={attraction.shortDescription[lang] || attraction.shortDescription.it}
                onClick={() => setSelectedAttraction(attraction)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-serif text-3xl font-light text-ink md:text-4xl">
              {t('about.award.title')}
            </h2>
            <p className="mt-4 font-sans text-base font-light leading-relaxed text-muted">
              {t('about.award.text')}
            </p>
            <div className="mt-6">
              <LocalizedLink
                to="booking"
                className="inline-flex items-center justify-center border border-ink px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {t('about.award.cta')}
              </LocalizedLink>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 bg-cream">
              <Trophy className="h-12 w-12 text-gold" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={selectedAttraction !== null}
        onClose={() => setSelectedAttraction(null)}
        title={selectedAttraction?.name[lang] || selectedAttraction?.name.it}
      >
        {selectedAttraction && (
          <>
            <div className="-mx-6 mt-4 mb-6 aspect-video overflow-hidden md:-mx-8 md:mt-6 md:mb-8">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name[lang] || selectedAttraction.name.it}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="font-sans text-base font-light leading-relaxed text-muted">
              {selectedAttraction.fullText[lang] || selectedAttraction.fullText.it}
            </p>
          </>
        )}
      </Modal>
    </>
  )
}
