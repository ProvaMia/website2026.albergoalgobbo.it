import { useTranslation } from 'react-i18next'
import {
  Wifi,
  Wind,
  Flame,
  Coffee,
  Sparkles,
  PawPrint,
  MapPin,
  Star,
  Phone,
  Mail,
} from 'lucide-react'
import { Hero } from '@/components/ui/Hero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { RoomCard } from '@/components/ui/RoomCard'
import { LocalizedLink } from '@/components/LocalizedLink'

const featuredRooms = [
  {
    id: 'comfort-ac',
    name: 'Comfort AC',
    description:
      'Camera doppia spaziosa con aria condizionata, bagno privato, WiFi gratuito e tutti i comfort per il tuo soggiorno veneziano.',
    image: '/media/images/camera-comfort2-4-algobbo.jpg',
    capacity: '2 adulti',
    priceFrom: 95,
    services: ['wifi', 'ac', 'bathroom'],
  },
  {
    id: 'standard-singola',
    name: 'Standard Singola',
    description:
      'Camera singola con bagno privato, ideale per viaggiatori indipendenti che cercano una sistemazione centrale e confortevole.',
    image: '/media/images/camera-standard-singola-cop.jpg',
    capacity: '1 adulto',
    priceFrom: 65,
    services: ['wifi', 'bathroom'],
  },
  {
    id: 'economy-doppia',
    name: 'Economy Doppia',
    description:
      'Soluzione economica per due persone, perfetta per chi desidera scoprire Venezia spendendo poco senza rinunciare alla pulizia e all\'accoglienza.',
    image: '/media/images/economy-db-9-2.jpg',
    capacity: '2 adulti',
    priceFrom: 55,
    services: ['wifi'],
  },
]

const services = [
  { key: 'wifi', icon: Wifi },
  { key: 'ac', icon: Wind },
  { key: 'heating', icon: Flame },
  { key: 'breakfast', icon: Coffee },
  { key: 'cleaning', icon: Sparkles },
  { key: 'pets', icon: PawPrint },
]

const reviews = [
  {
    text: 'home.reviews.review1',
    author: 'home.reviews.reviewer1',
    image: '/media/images/recensioni-cla-150x150.png',
  },
  {
    text: 'home.reviews.review2',
    author: 'home.reviews.reviewer2',
    image: '/media/images/recensioni-sam-150x150.png',
  },
  {
    text: 'home.reviews.review3',
    author: 'home.reviews.reviewer3',
    image: '/media/images/recensioni-m-150x150.png',
  },
]

export function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Hero
        variant="home"
        backgroundImage={{
          mobile: '/media/heros/mobile/hero-al-gobbo-v-1080.webp',
          mobileSrcSet:
            '/media/heros/mobile/hero-al-gobbo-v-1080.webp 1080w, /media/heros/mobile/hero-al-gobbo-v-1440.webp 1440w, /media/heros/mobile/hero-al-gobbo-v-2160.webp 2160w',
          desktop: '/media/heros/desktop/al_gobbo_3840.webp',
          desktopSrcSet:
            '/media/heros/desktop/al_gobbo_1280.webp 1280w, /media/heros/desktop/al_gobbo_1920.webp 1920w, /media/heros/desktop/al_gobbo_2560.webp 2560w, /media/heros/desktop/al_gobbo_3840.webp 3840w',
        }}
      />

      <section id="benvenuti" className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow={t('home.welcome.eyebrow')}
                title={t('home.welcome.title')}
              />
              <p className="mt-6 font-sans text-base font-light leading-relaxed text-muted md:text-lg">
                {t('home.welcome.text')}
              </p>
            </div>
            <div className="overflow-hidden border border-ink/10">
              <img
                src="/media/images/hall-algobbo2.jpg"
                alt="Hall dell'Albergo Al Gobbo"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('home.rooms.eyebrow')}
            title={t('home.rooms.title')}
            subtitle={t('home.rooms.subtitle')}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredRooms.map((room) => (
              <RoomCard
                key={room.id}
                name={room.name}
                description={room.description}
                image={room.image}
                capacity={room.capacity}
                priceFrom={room.priceFrom}
                services={room.services}
                href="/it/prenota"
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <LocalizedLink
              to="booking"
              className="inline-flex items-center justify-center border border-ink px-10 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {t('home.rooms.cta')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={t('home.services.eyebrow')}
            title={t('home.services.title')}
            subtitle={t('home.services.subtitle')}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <FeatureCard
                key={service.key}
                icon={service.icon}
                title={t(`home.services.${service.key}.title`)}
                description={t(`home.services.${service.key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1 overflow-hidden border border-ink/10">
              <img
                src="/media/images/albergo-al-gobbo-vista-su-campo.jpg"
                alt="Vista dell'Albergo Al Gobbo su Campo San Geremia"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeading
                align="left"
                eyebrow={t('home.location.eyebrow')}
                title={t('home.location.title')}
              />
              <p className="mt-6 font-sans text-base font-light leading-relaxed text-muted md:text-lg">
                {t('home.location.text')}
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="font-sans text-sm font-light text-ink-soft">
                    {t('contact.address')}, {t('contact.city')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-gold" />
                  <a
                    href={`tel:${t('contact.phone').replace(/\s/g, '')}`}
                    className="font-sans text-sm font-light text-ink-soft hover:text-brick"
                  >
                    {t('contact.phone')}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-gold" />
                  <a
                    href={`mailto:${t('contact.email')}`}
                    className="font-sans text-sm font-light text-ink-soft hover:text-brick"
                  >
                    {t('contact.email')}
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <LocalizedLink
                  to="contacts"
                  className="inline-flex items-center justify-center border border-brick bg-brick px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep hover:border-brick-deep"
                >
                  {t('home.location.cta')}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-night py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow={t('home.reviews.eyebrow')}
            title={t('home.reviews.title')}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reviews.map((review) => (
              <div
                key={review.author}
                className="border border-white/10 bg-night-soft p-6 md:p-8"
              >
                <div className="flex gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 font-sans text-base font-light italic leading-relaxed text-white/90">
                  "{t(review.text)}"
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={t(review.author)}
                    className="h-10 w-10 object-cover"
                    loading="lazy"
                  />
                  <span className="font-sans text-sm font-medium text-white">{t(review.author)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
