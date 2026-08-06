export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
  id: number
  roomName: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  notes: string
  status: BookingStatus
}

export const STATUS_OPTIONS: BookingStatus[] = ['pending', 'confirmed', 'cancelled']

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 1,
    roomName: 'Comfort AC',
    guestName: 'Mario Rossi',
    guestEmail: 'mario.rossi@example.com',
    guestPhone: '+39 333 1234567',
    checkIn: '2026-08-15',
    checkOut: '2026-08-18',
    notes: 'Arrivo tardi, dopo le 20:00',
    status: 'confirmed',
  },
  {
    id: 2,
    roomName: 'Standard Doppia',
    guestName: 'Anna Bianchi',
    guestEmail: 'anna.bianchi@example.com',
    guestPhone: '+39 347 7654321',
    checkIn: '2026-09-02',
    checkOut: '2026-09-05',
    notes: '',
    status: 'pending',
  },
  {
    id: 3,
    roomName: 'Economy Singola',
    guestName: 'Luca Verdi',
    guestEmail: 'luca.verdi@example.com',
    guestPhone: '',
    checkIn: '2026-08-22',
    checkOut: '2026-08-23',
    notes: 'Preferenza piano alto',
    status: 'cancelled',
  },
]
