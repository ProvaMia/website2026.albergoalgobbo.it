import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Hero } from '@/components/ui/Hero'
import { Lightbox } from '@/components/ui/Lightbox'
import { galleryImages, galleryCategories, type GalleryCategory } from '@/data/gallery'

export function Gallery() {
  const { t, i18n } = useTranslation()
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const lang = i18n.language as 'it' | 'en'

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages
    return galleryImages.filter((img) => img.category === activeCategory)
  }, [activeCategory])

  const lightboxImages = useMemo(
    () =>
      filteredImages.map((img) => ({
        src: img.src,
        alt: img.alt[lang] || img.alt.it,
      })),
    [filteredImages, lang]
  )

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goToPrev = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === 0 ? lightboxImages.length - 1 : prev - 1
    })
  }

  const goToNext = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      return prev === lightboxImages.length - 1 ? 0 : prev + 1
    })
  }

  return (
    <>
      <Hero
        variant="page"
        title={t('gallery.hero.title')}
        subtitle={t('gallery.hero.subtitle')}
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {galleryCategories.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setActiveCategory(category.key)}
                className={[
                  'border px-5 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors',
                  activeCategory === category.key
                    ? 'border-ink bg-ink text-white'
                    : 'border-stone/60 bg-transparent text-ink-soft hover:border-ink hover:text-ink',
                ].join(' ')}
                aria-pressed={activeCategory === category.key}
              >
                {category.label[lang] || category.label.it}
              </button>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative aspect-[4/3] overflow-hidden border border-stone/30 bg-cream"
                aria-label={image.alt[lang] || image.alt.it}
              >
                <img
                  src={image.src}
                  alt={image.alt[lang] || image.alt.it}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
                <span className="absolute inset-0 bg-night/0 transition-colors duration-300 group-hover:bg-night/20" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  )
}
