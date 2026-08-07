import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CalendarDays, Users, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BookingSearchParams {
  checkIn: string
  checkOut: string
  adults: number
}

interface BookingFormProps {
  onSearch: (params: BookingSearchParams) => void
  className?: string
}

function formatDateInput(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function BookingForm({ onSearch, className }: BookingFormProps) {
  const { t } = useTranslation()

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const dayAfterTomorrow = new Date(tomorrow)
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1)

  const [checkIn, setCheckIn] = useState(formatDateInput(tomorrow))
  const [checkOut, setCheckOut] = useState(formatDateInput(dayAfterTomorrow))
  const [adults, setAdults] = useState(2)
  const [error, setError] = useState<string | null>(null)

  const validate = (): boolean => {
    if (!checkIn || !checkOut) {
      setError(t('booking.form.errors.required'))
      return false
    }

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const todayDate = new Date(formatDateInput(today))

    if (checkInDate < todayDate) {
      setError(t('booking.form.errors.pastDate'))
      return false
    }

    if (checkOutDate <= checkInDate) {
      setError(t('booking.form.errors.invalidDates'))
      return false
    }

    if (adults < 1) {
      setError(t('booking.form.errors.guests'))
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSearch({ checkIn, checkOut, adults })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative min-w-0 overflow-hidden border border-stone/50 bg-white p-6 shadow-sm md:p-8',
        className
      )}
    >
      <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <div className="min-w-0">
          <label htmlFor="check-in" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            {t('booking.form.checkIn')}
          </label>
          <div className="relative flex min-w-0 overflow-hidden">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
            <input
              id="check-in"
              type="date"
              value={checkIn}
              min={formatDateInput(today)}
              onChange={(e) => setCheckIn(e.target.value)}
              className="min-w-0 flex-1 max-w-full appearance-none border border-stone/60 bg-cream py-3 pl-10 pr-3 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
              style={{ minWidth: 0 }}
              required
            />
          </div>
        </div>

        <div className="min-w-0">
          <label htmlFor="check-out" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            {t('booking.form.checkOut')}
          </label>
          <div className="relative flex min-w-0 overflow-hidden">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
            <input
              id="check-out"
              type="date"
              value={checkOut}
              min={checkIn || formatDateInput(today)}
              onChange={(e) => setCheckOut(e.target.value)}
              className="min-w-0 flex-1 max-w-full appearance-none border border-stone/60 bg-cream py-3 pl-10 pr-3 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
              style={{ minWidth: 0 }}
              required
            />
          </div>
        </div>

        <div className="min-w-0">
          <label htmlFor="adults" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
            {t('booking.form.adults')}
          </label>
          <div className="relative flex min-w-0 overflow-hidden">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden="true" />
            <select
              id="adults"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="min-w-0 flex-1 max-w-full appearance-none border border-stone/60 bg-cream py-3 pl-10 pr-8 font-sans text-sm font-light text-ink outline-none transition-colors focus:border-gold"
              style={{ minWidth: 0 }}
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="min-w-0">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 border border-brick bg-brick px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            {t('buttons.checkAvailability')}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 font-sans text-sm font-light text-brick" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
