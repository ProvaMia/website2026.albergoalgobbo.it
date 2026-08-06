import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { CalendarDays, Mail, Phone, Trash2, User, X } from 'lucide-react'
import { STATUS_OPTIONS, type Booking, type BookingStatus } from '@/data/bookings'

interface OutletContext {
  bookings: Booking[]
  setBookings: (value: Booking[] | ((prev: Booking[]) => Booking[])) => void
}

export function AdminBookings() {
  const { t } = useTranslation()
  const { bookings, setBookings } = useOutletContext<OutletContext>()

  const [committedBookings, setCommittedBookings] = useState<Booking[]>(bookings)
  const [draftBookings, setDraftBookings] = useState<Booking[]>(bookings)
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all')
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null)

  useEffect(() => {
    setCommittedBookings(bookings)
    setDraftBookings(bookings)
  }, [bookings])

  const filteredBookings = useMemo(() => {
    if (filter === 'all') return draftBookings
    return draftBookings.filter((b) => b.status === filter)
  }, [draftBookings, filter])

  const hasChanges = useMemo(
    () => JSON.stringify(committedBookings) !== JSON.stringify(draftBookings),
    [committedBookings, draftBookings]
  )

  const updateStatus = (id: number, status: BookingStatus) => {
    setDraftBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    )
  }

  const saveChanges = () => {
    setCommittedBookings(draftBookings)
    setBookings(draftBookings)
    // TODO: invocare API backend quando sarà implementato
  }

  const discardChanges = () => {
    setDraftBookings(committedBookings)
  }

  const confirmDeleteBooking = (booking: Booking) => {
    setBookingToDelete(booking)
  }

  const cancelDeleteBooking = () => {
    setBookingToDelete(null)
  }

  const deleteBooking = () => {
    if (!bookingToDelete) return
    setDraftBookings((prev) => prev.filter((b) => b.id !== bookingToDelete.id))
    setBookingToDelete(null)
  }

  const statusClass = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed':
        return 'bg-gold/15 text-ink'
      case 'pending':
        return 'bg-cream text-ink border border-stone/40'
      case 'cancelled':
        return 'bg-stone/20 text-ink-soft'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-light text-ink">
            {t('admin.bookings.title')}
          </h2>
          <p className="font-sans text-sm font-light text-muted">
            {t('admin.bookings.subtitle')}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {hasChanges && (
            <span className="font-sans text-xs font-medium text-brick">
              {t('admin.bookings.unsavedChanges')}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={discardChanges}
                disabled={!hasChanges}
                className="inline-flex items-center justify-center border border-ink/20 bg-white px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('admin.bookings.discardChanges')}
              </button>
              <button
                type="button"
                onClick={saveChanges}
                disabled={!hasChanges}
                className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t('admin.bookings.saveChanges')}
              </button>
            </div>

            <label htmlFor="status-filter" className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.bookings.filter')}
            </label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as BookingStatus | 'all')}
              className="border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
            >
              <option value="all">{t('admin.bookings.status.all')}</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {t(`admin.bookings.status.${status}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="border border-stone/50 bg-white p-8 text-center">
          <p className="font-sans text-base font-light text-muted">
            {t('admin.bookings.empty')}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => (
            <article
              key={booking.id}
              className="border border-stone/50 bg-white p-5 transition-shadow hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-lg font-light text-ink">
                      {booking.roomName}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider ${statusClass(booking.status)}`}
                    >
                      {t(`admin.bookings.status.${booking.status}`)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm font-light text-ink-soft">
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-gold" aria-hidden="true" />
                      <span>{booking.guestName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-gold" aria-hidden="true" />
                      <a href={`mailto:${booking.guestEmail}`} className="hover:text-brick">
                        {booking.guestEmail}
                      </a>
                    </div>
                    {booking.guestPhone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                        <a href={`tel:${booking.guestPhone.replace(/\s/g, '')}`} className="hover:text-brick">
                          {booking.guestPhone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 font-sans text-sm font-light text-ink-soft">
                    <CalendarDays className="h-4 w-4 text-gold" aria-hidden="true" />
                    <span>
                      {booking.checkIn} → {booking.checkOut}
                    </span>
                  </div>

                  {booking.notes && (
                    <p className="max-w-xl font-sans text-sm font-light italic text-muted">
                      {booking.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label htmlFor={`status-${booking.id}`} className="sr-only">
                    {t('admin.bookings.changeStatus')}
                  </label>
                  <select
                    id={`status-${booking.id}`}
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value as BookingStatus)}
                    className="border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {t(`admin.bookings.status.${status}`)}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => confirmDeleteBooking(booking)}
                    className="inline-flex items-center justify-center p-2 text-brick transition-colors hover:bg-brick/10"
                    aria-label={t('admin.bookings.delete')}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {bookingToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-booking-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelDeleteBooking()
          }}
        >
          <div className="relative w-full max-w-md border border-stone/50 bg-white p-6 md:p-8">
            <button
              type="button"
              onClick={cancelDeleteBooking}
              className="absolute top-4 right-4 p-2 text-ink-soft transition-colors hover:text-brick"
              aria-label={t('aria.close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h3
              id="delete-booking-modal-title"
              className="font-serif text-2xl font-light text-ink"
            >
              {t('admin.bookings.deleteTitle')}
            </h3>

            <p className="mt-4 font-sans text-base font-light text-muted">
              {t('admin.bookings.deleteConfirm', {
                name: bookingToDelete.guestName,
                room: bookingToDelete.roomName,
              })}
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelDeleteBooking}
                className="inline-flex items-center justify-center border border-ink/20 px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5"
              >
                {t('admin.bookings.deleteCancel')}
              </button>
              <button
                type="button"
                onClick={deleteBooking}
                className="inline-flex items-center justify-center gap-2 border border-brick bg-brick px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t('admin.bookings.deleteConfirmButton')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
