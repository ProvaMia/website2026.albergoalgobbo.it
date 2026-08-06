import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  X,
  Users,
  CalendarDays,
  Moon,
  Send,
} from 'lucide-react'
import { Hero } from '@/components/ui/Hero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RoomCard } from '@/components/ui/RoomCard'
import { BookingForm, type BookingSearchParams } from '@/components/ui/BookingForm'
import { LocalizedLink } from '@/components/LocalizedLink'
import { rooms, type Room } from '@/data/rooms'

function nightsBetween(start: string, end: string): number {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diff = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  return Math.max(0, diff)
}

function formatCapacity(room: Room, lang: string): string {
  const adults = room.capacity.adults
  const children = room.capacity.children

  if (lang === 'it') {
    const a = adults === 1 ? '1 adulto' : `${adults} adulti`
    const c =
      children > 0
        ? children === 1
          ? '1 bambino'
          : `${children} bambini`
        : ''
    return c ? `${a} + ${c}` : a
  }

  const a = adults === 1 ? '1 adult' : `${adults} adults`
  const c =
    children > 0
      ? children === 1
        ? '1 child'
        : `${children} children`
      : ''
  return c ? `${a} + ${c}` : a
}

export function Booking() {
  const { t, i18n } = useTranslation()

  const [searched, setSearched] = useState(false)
  const [searchParams, setSearchParams] = useState<BookingSearchParams | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const [requestName, setRequestName] = useState('')
  const [requestEmail, setRequestEmail] = useState('')
  const [requestPhone, setRequestPhone] = useState('')
  const [requestMessage, setRequestMessage] = useState('')
  const [requestSubmitted, setRequestSubmitted] = useState(false)

  const lang = i18n.language as 'it' | 'en'

  const serviceLabels = useMemo(
    () => ({
      wifi: t('home.services.wifi.title'),
      ac: t('home.services.ac.title'),
      heating: t('home.services.heating.title'),
      breakfast: t('home.services.breakfast.title'),
      pets: t('home.services.pets.title'),
      bathroom: t('booking.services.bathroom'),
    }),
    [t]
  )

  const handleSearch = (params: BookingSearchParams) => {
    setSearchParams(params)
    setSearched(true)
    setSelectedRoom(null)
  }

  const filteredRooms = useMemo(() => {
    if (!searched || !searchParams) return rooms
    // TODO: replace with backend availability check
    return rooms.filter((room) => room.capacity.adults === searchParams.adults)
  }, [searched, searchParams])

  const selectedNights = selectedRoom
    ? nightsBetween(searchParams?.checkIn || '', searchParams?.checkOut || '')
    : 0
  const selectedTotalPrice = selectedRoom
    ? selectedRoom.priceFrom * Math.max(1, selectedNights)
    : 0

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire to real backend / email service
    setRequestSubmitted(true)
  }

  const closeModal = () => {
    setSelectedRoom(null)
    setRequestSubmitted(false)
    setRequestName('')
    setRequestEmail('')
    setRequestPhone('')
    setRequestMessage('')
  }

  return (
    <>
      <Hero
        variant="page"
        title={t('booking.hero.title')}
        subtitle={t('booking.hero.subtitle')}
      />

      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={t('booking.rooms.title')}
            subtitle={
              searched
                ? t('booking.rooms.subtitleSearched')
                : t('booking.rooms.subtitleInitial')
            }
          />

          {!searched && (
            <p className="mx-auto mt-6 max-w-2xl text-center font-sans text-sm font-light text-muted">
              {t('booking.rooms.hint')}
            </p>
          )}

          <div className="mx-auto mt-10 max-w-5xl">
            <BookingForm onSearch={handleSearch} />
          </div>

          {searched && filteredRooms.length === 0 && (
            <div className="mx-auto mt-12 max-w-2xl border border-stone/50 bg-cream p-6 text-center md:p-8">
              <p className="font-sans text-base font-light text-ink">
                {t('booking.rooms.noResults')}
              </p>
              <div className="mt-4 flex flex-col items-center gap-2 font-sans text-sm font-light text-muted">
                <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className="hover:text-brick">
                  {t('contact.phone')}
                </a>
                <a href={`mailto:${t('contact.email')}`} className="hover:text-brick">
                  {t('contact.email')}
                </a>
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {(searched ? filteredRooms : rooms).map((room) => (
              <RoomCard
                key={room.id}
                name={room.name[lang] || room.name.en}
                description={room.description[lang] || room.description.en}
                image={room.images[0]}
                capacity={formatCapacity(room, lang)}
                priceFrom={
                  searched && searchParams
                    ? room.priceFrom * Math.max(1, nightsBetween(searchParams.checkIn, searchParams.checkOut))
                    : room.priceFrom
                }
                services={room.services}
                serviceLabels={serviceLabels}
                disabled={!searched}
                buttonLabel={t('buttons.bookNow')}
                onBook={() => setSelectedRoom(room)}
              />
            ))}
          </div>

          {searched && filteredRooms.length > 0 && (
            <p className="mx-auto mt-10 max-w-3xl text-center font-sans text-xs font-light leading-relaxed text-muted">
              {t('booking.disclaimer')}
            </p>
          )}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            title={t('booking.help.title')}
            subtitle={t('booking.help.subtitle')}
          />

          <div className="mt-10">
            <LocalizedLink
              to="contacts"
              className="inline-flex items-center justify-center border border-ink px-10 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {t('buttons.contactUs')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      {selectedRoom && searchParams && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-stone/50 bg-white p-6 md:p-8">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-ink-soft transition-colors hover:text-brick"
              aria-label={t('aria.close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {requestSubmitted ? (
              <div className="py-8 text-center">
                <h3
                  id="booking-modal-title"
                  className="font-serif text-2xl font-light text-ink"
                >
                  {t('booking.modal.successTitle')}
                </h3>
                <p className="mt-4 font-sans text-base font-light text-muted">
                  {t('booking.modal.successText')}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-6 inline-flex items-center justify-center border border-ink px-8 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {t('aria.close')}
                </button>
              </div>
            ) : (
              <>
                <h3
                  id="booking-modal-title"
                  className="font-serif text-2xl font-light text-ink"
                >
                  {t('booking.modal.title')}
                </h3>

                <div className="mt-6 space-y-3 border border-stone/50 bg-cream p-4 font-sans text-sm font-light text-ink-soft">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-ink">{selectedRoom.name[lang] || selectedRoom.name.en}</span>
                    <span className="text-stone" aria-hidden="true">·</span>
                    <span>{formatCapacity(selectedRoom, lang)}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span>
                        {searchParams.checkIn} → {searchParams.checkOut}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Moon className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span>
                        {selectedNights} {selectedNights === 1 ? t('booking.modal.nightSingular') : t('booking.modal.nightPlural')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gold" aria-hidden="true" />
                    <span>
                      {searchParams.adults} {t('booking.modal.adults')}
                    </span>
                  </div>
                  <div className="pt-2 text-base font-medium text-ink">
                    {t('booking.modal.total')}: €{selectedTotalPrice}
                  </div>
                </div>

                <form onSubmit={handleRequestSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="request-name" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                      {t('booking.modal.nameLabel')}
                    </label>
                    <input
                      id="request-name"
                      type="text"
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      required
                      className="w-full border border-stone/60 bg-cream px-3 py-2.5 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="request-email" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                        {t('booking.modal.emailLabel')}
                      </label>
                      <input
                        id="request-email"
                        type="email"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        required
                        className="w-full border border-stone/60 bg-cream px-3 py-2.5 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
                      />
                    </div>

                    <div>
                      <label htmlFor="request-phone" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                        {t('booking.modal.phoneLabel')}
                      </label>
                      <input
                        id="request-phone"
                        type="tel"
                        value={requestPhone}
                        onChange={(e) => setRequestPhone(e.target.value)}
                        className="w-full border border-stone/60 bg-cream px-3 py-2.5 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="request-message" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                      {t('booking.modal.messageLabel')}
                    </label>
                    <textarea
                      id="request-message"
                      rows={4}
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      className="w-full resize-none border border-stone/60 bg-cream px-3 py-2.5 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 border border-brick bg-brick px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {t('buttons.send')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
