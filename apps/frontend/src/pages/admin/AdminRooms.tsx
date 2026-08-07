import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { BedDouble, ImageIcon, Plus, Trash2, Upload, X, ZoomIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { rooms as staticRooms } from '@/data/rooms'
import { type Booking } from '@/data/bookings'

interface AdminRoom {
  id: string
  slug: string
  name: { it: string; en: string }
  capacity: { total: number }
  priceFrom: number
  image: string
}

type UnavailabilityType = 'booking' | 'other'

interface Unavailability {
  id: string
  roomId: string
  type: UnavailabilityType
  startDate: string
  endDate: string | null
  note: string
}

interface OutletContext {
  bookings: Booking[]
  setBookings: (value: Booking[] | ((prev: Booking[]) => Booking[])) => void
}

function toAdminRoom(room: (typeof staticRooms)[number]): AdminRoom {
  return {
    id: room.id,
    slug: room.slug,
    name: room.name,
    capacity: { total: room.capacity.total },
    priceFrom: room.priceFrom,
    image: room.images[0] ?? '',
  }
}

function readImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const seedRooms = staticRooms.map(toAdminRoom)

export function AdminRooms() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'it' | 'en'
  const { bookings, setBookings } = useOutletContext<OutletContext>()

  const [committedRooms, setCommittedRooms] = useState<AdminRoom[]>(seedRooms)
  const [draftRooms, setDraftRooms] = useState<AdminRoom[]>(seedRooms)

  const [committedUnavailabilities, setCommittedUnavailabilities] = useState<Unavailability[]>([])
  const [draftUnavailabilities, setDraftUnavailabilities] = useState<Unavailability[]>([])

  const [newName, setNewName] = useState('')
  const [newCapacity, setNewCapacity] = useState(2)
  const [newPrice, setNewPrice] = useState(0)
  const [newImage, setNewImage] = useState('')

  const [unavailabilityRoomId, setUnavailabilityRoomId] = useState('')
  const [unavailabilityType, setUnavailabilityType] = useState<UnavailabilityType>('other')
  const [unavailabilityIndeterminate, setUnavailabilityIndeterminate] = useState(false)
  const [unavailabilityStart, setUnavailabilityStart] = useState('')
  const [unavailabilityEnd, setUnavailabilityEnd] = useState('')
  const [unavailabilityGuestName, setUnavailabilityGuestName] = useState('')
  const [unavailabilityGuestEmail, setUnavailabilityGuestEmail] = useState('')
  const [unavailabilityGuestPhone, setUnavailabilityGuestPhone] = useState('')
  const [unavailabilityNote, setUnavailabilityNote] = useState('')

  const [roomToDelete, setRoomToDelete] = useState<AdminRoom | null>(null)
  const [unavailabilityToDelete, setUnavailabilityToDelete] = useState<Unavailability | null>(null)
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null)

  const hasChanges = useMemo(
    () =>
      JSON.stringify(committedRooms) !== JSON.stringify(draftRooms) ||
      JSON.stringify(committedUnavailabilities) !== JSON.stringify(draftUnavailabilities),
    [committedRooms, draftRooms, committedUnavailabilities, draftUnavailabilities]
  )

  const roomById = useMemo(() => {
    const map = new Map<string, AdminRoom>()
    draftRooms.forEach((room) => map.set(room.id, room))
    return map
  }, [draftRooms])

  const otherUnavailabilities = useMemo(
    () => draftUnavailabilities.filter((u) => u.type === 'other'),
    [draftUnavailabilities]
  )

  const updatePrice = (id: string, price: number) => {
    setDraftRooms((prev) =>
      prev.map((room) =>
        room.id === id ? { ...room, priceFrom: Math.max(0, price) } : room
      )
    )
  }

  const updateImage = (id: string, image: string) => {
    setDraftRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, image } : room))
    )
  }

  const removeImage = (id: string) => {
    setDraftRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, image: '' } : room))
    )
  }

  const handleRoomImageChange = async (id: string, file: File | undefined) => {
    if (!file) return
    const dataUrl = await readImageFile(file)
    updateImage(id, dataUrl)
  }

  const confirmDeleteRoom = (room: AdminRoom) => {
    setRoomToDelete(room)
  }

  const deleteRoom = () => {
    if (!roomToDelete) return
    setDraftRooms((prev) => prev.filter((room) => room.id !== roomToDelete.id))
    setDraftUnavailabilities((prev) => prev.filter((u) => u.roomId !== roomToDelete.id))
    setRoomToDelete(null)
  }

  const cancelDeleteRoom = () => {
    setRoomToDelete(null)
  }

  const addRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim() || newPrice <= 0) return

    const slug = newName.toLowerCase().replace(/\s+/g, '-')
    const name = { it: newName.trim(), en: newName.trim() }

    setDraftRooms((prev) => [
      ...prev,
      {
        id: slug,
        slug,
        name,
        capacity: { total: newCapacity },
        priceFrom: newPrice,
        image: newImage,
      },
    ])

    setNewName('')
    setNewCapacity(2)
    setNewPrice(0)
    setNewImage('')
  }

  const addUnavailability = (e: React.FormEvent) => {
    e.preventDefault()
    if (!unavailabilityRoomId || !unavailabilityStart) return

    const isBooking = unavailabilityType === 'booking'

    if (isBooking) {
      if (!unavailabilityEnd || unavailabilityStart > unavailabilityEnd) return
      if (!unavailabilityGuestName.trim()) return
    } else {
      if (!unavailabilityIndeterminate && (!unavailabilityEnd || unavailabilityStart > unavailabilityEnd)) return
    }

    const room = roomById.get(unavailabilityRoomId)
    if (!room) return

    if (isBooking) {
      const nextId = Math.max(0, ...bookings.map((b) => b.id)) + 1
      const newBooking: Booking = {
        id: nextId,
        roomName: room.name[lang] || room.name.en,
        guestName: unavailabilityGuestName.trim(),
        guestEmail: unavailabilityGuestEmail.trim(),
        guestPhone: unavailabilityGuestPhone.trim(),
        checkIn: unavailabilityStart,
        checkOut: unavailabilityEnd,
        notes: unavailabilityNote.trim(),
        status: 'confirmed',
      }
      setBookings((prev) => [...prev, newBooking])
    } else {
      setDraftUnavailabilities((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          roomId: unavailabilityRoomId,
          type: 'other',
          startDate: unavailabilityStart,
          endDate: unavailabilityIndeterminate ? null : unavailabilityEnd,
          note: unavailabilityNote.trim(),
        },
      ])
    }

    setUnavailabilityRoomId('')
    setUnavailabilityType('other')
    setUnavailabilityIndeterminate(false)
    setUnavailabilityStart('')
    setUnavailabilityEnd('')
    setUnavailabilityGuestName('')
    setUnavailabilityGuestEmail('')
    setUnavailabilityGuestPhone('')
    setUnavailabilityNote('')
  }

  const confirmDeleteUnavailability = (unavailability: Unavailability) => {
    setUnavailabilityToDelete(unavailability)
  }

  const deleteUnavailability = () => {
    if (!unavailabilityToDelete) return
    setDraftUnavailabilities((prev) => prev.filter((u) => u.id !== unavailabilityToDelete.id))
    setUnavailabilityToDelete(null)
  }

  const cancelDeleteUnavailability = () => {
    setUnavailabilityToDelete(null)
  }

  const openPreview = (src: string, alt: string) => {
    setPreviewImage({ src, alt })
  }

  const closePreview = () => {
    setPreviewImage(null)
  }

  const saveChanges = () => {
    setCommittedRooms(draftRooms)
    setCommittedUnavailabilities(draftUnavailabilities)
  }

  const discardChanges = () => {
    setDraftRooms(committedRooms)
    setDraftUnavailabilities(committedUnavailabilities)
    setNewName('')
    setNewCapacity(2)
    setNewPrice(0)
    setNewImage('')
    setUnavailabilityRoomId('')
    setUnavailabilityType('other')
    setUnavailabilityIndeterminate(false)
    setUnavailabilityStart('')
    setUnavailabilityEnd('')
    setUnavailabilityGuestName('')
    setUnavailabilityGuestEmail('')
    setUnavailabilityGuestPhone('')
    setUnavailabilityNote('')
  }

  const ImagePreview = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
    if (!src) {
      return (
        <div
          className={cn(
            'flex h-16 w-24 flex-col items-center justify-center gap-1 border border-stone/30 bg-cream p-1 text-center text-ink-soft',
            className
          )}
        >
          <ImageIcon className="h-4 w-4 text-stone" aria-hidden="true" />
          <span className="font-sans text-[8px] font-light uppercase leading-tight tracking-wider text-stone">
            {t('rooms.noImage')}
          </span>
        </div>
      )
    }
    return (
      <button
        type="button"
        onClick={() => openPreview(src, alt)}
        className={cn(
          'group relative h-10 w-14 overflow-hidden border border-stone/30',
          className
        )}
        aria-label={t('admin.rooms.zoomImage')}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-night/40 opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
      </button>
    )
  }

  const unavailabilityFormValid = (() => {
    if (!unavailabilityRoomId || !unavailabilityStart) return false
    if (unavailabilityType === 'booking') {
      return (
        !!unavailabilityEnd &&
        unavailabilityStart <= unavailabilityEnd &&
        unavailabilityGuestName.trim().length > 0
      )
    }
    return unavailabilityIndeterminate || (!!unavailabilityEnd && unavailabilityStart <= unavailabilityEnd)
  })()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl font-light text-ink">
            {t('admin.rooms.title')}
          </h2>
          <p className="font-sans text-sm font-light text-muted">
            {t('admin.rooms.subtitle')}
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {hasChanges && (
            <span className="font-sans text-xs font-medium text-brick">
              {t('admin.rooms.unsavedChanges')}
            </span>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={discardChanges}
              disabled={!hasChanges}
              className="inline-flex items-center justify-center border border-ink/20 bg-white px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('admin.rooms.discardChanges')}
            </button>
            <button
              type="button"
              onClick={saveChanges}
              disabled={!hasChanges}
              className="inline-flex items-center justify-center gap-2 border border-ink bg-ink px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t('admin.rooms.saveChanges')}
            </button>
          </div>
        </div>
      </div>

      <form
        onSubmit={addRoom}
        className="border border-stone/50 bg-cream p-5"
      >
        <h3 className="mb-4 font-serif text-lg font-light text-ink">
          {t('admin.rooms.addRoom')}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 lg:col-span-2">
            <label htmlFor="new-name" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.newName')}
            </label>
            <input
              id="new-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t('admin.rooms.newName')}
              className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink placeholder:text-stone focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="new-capacity" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.newCapacity')}
            </label>
            <input
              id="new-capacity"
              type="number"
              min={1}
              value={newCapacity}
              onChange={(e) => setNewCapacity(Math.max(1, Number(e.target.value)))}
              className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="new-price" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.newPrice')}
            </label>
            <input
              id="new-price"
              type="number"
              min={0}
              value={newPrice || ''}
              onChange={(e) => setNewPrice(Number(e.target.value))}
              placeholder="€"
              className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink placeholder:text-stone focus:border-gold focus:outline-none"
            />
          </div>

          <div className="min-w-0 lg:col-span-2">
            <span className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.image')}
            </span>
            <div className="flex items-center gap-3">
              <ImagePreview src={newImage} alt={t('admin.rooms.image')} />
              <label className="inline-flex cursor-pointer items-center gap-2 border border-ink/20 px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5">
                <Upload className="h-4 w-4" aria-hidden="true" />
                <span>{newImage ? t('admin.rooms.changeImage') : t('admin.rooms.uploadImage')}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const dataUrl = await readImageFile(file)
                      setNewImage(dataUrl)
                    }
                  }}
                />
              </label>
              {newImage && (
                <button
                  type="button"
                  onClick={() => setNewImage('')}
                  className="inline-flex items-center justify-center p-2 text-ink-soft transition-colors hover:text-brick"
                  aria-label={t('admin.rooms.removeImage')}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!newName.trim() || newPrice <= 0}
          className="mt-4 inline-flex items-center gap-2 border border-ink bg-ink px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t('admin.rooms.add')}
        </button>
      </form>

      <div className="overflow-x-auto border border-stone/50 bg-white">
        <table className="w-full table-fixed">
          <thead className="bg-cream">
            <tr className="border-b border-stone/50">
              <th className="w-[25%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                {t('admin.rooms.name')}
              </th>
              <th className="w-[15%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                {t('admin.rooms.capacity')}
              </th>
              <th className="w-[17%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                {t('admin.rooms.price')}
              </th>
              <th className="w-[32%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                {t('admin.rooms.image')}
              </th>
              <th className="w-[11%] px-2 py-2 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                {t('admin.rooms.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {draftRooms.map((room) => (
              <tr key={room.slug} className="border-b border-stone/30 last:border-b-0">
                <td className="px-2 py-3 md:px-4 md:py-4">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 flex-shrink-0 text-gold sm:h-5 sm:w-5" aria-hidden="true" />
                    <span className="break-words font-sans text-sm font-medium leading-tight text-ink">
                      {room.name[lang] || room.name.en}
                    </span>
                  </div>
                </td>
                <td className="px-2 py-3 font-sans text-sm font-light leading-tight text-ink-soft md:px-4 md:py-4">
                  {room.capacity.total} {t('admin.rooms.guests')}
                </td>
                <td className="px-2 py-3 md:px-4 md:py-4">
                  <div className="flex items-center gap-1">
                    <span className="font-sans text-sm text-ink-soft">€</span>
                    <input
                      type="number"
                      min={0}
                      value={room.priceFrom}
                      onChange={(e) => updatePrice(room.id, Number(e.target.value))}
                      className="w-14 border border-stone/60 bg-white px-1 py-1 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none sm:w-20 sm:px-2"
                    />
                  </div>
                </td>
                <td className="px-2 py-3 md:px-4 md:py-4">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <ImagePreview
                      src={room.image}
                      alt={room.name[lang] || room.name.en}
                      className="h-8 w-12 sm:h-10 sm:w-14"
                    />
                    <label className="inline-flex cursor-pointer items-center gap-1 border border-ink/20 px-2 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5 sm:gap-2 sm:px-3 sm:py-1.5">
                      <Upload className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{room.image ? t('admin.rooms.changeImage') : t('admin.rooms.uploadImage')}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={async (e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            await handleRoomImageChange(room.id, file)
                          }
                        }}
                      />
                    </label>
                    {room.image && (
                      <button
                        type="button"
                        onClick={() => removeImage(room.id)}
                        className="inline-flex items-center justify-center p-1.5 text-ink-soft transition-colors hover:text-brick sm:p-2"
                        aria-label={t('admin.rooms.removeImage')}
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-2 py-3 text-center md:px-4 md:py-4">
                  <button
                    type="button"
                    onClick={() => confirmDeleteRoom(room)}
                    className="inline-flex items-center justify-center p-1.5 text-brick transition-colors hover:bg-brick/10 sm:p-2"
                    aria-label={t('admin.rooms.delete')}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border border-stone/50 bg-cream p-5">
        <div className="mb-4">
          <h3 className="font-serif text-lg font-light text-ink">
            {t('admin.rooms.unavailabilityTitle')}
          </h3>
          <p className="font-sans text-sm font-light text-muted">
            {t('admin.rooms.unavailabilitySubtitle')}
          </p>
        </div>

        <form onSubmit={addUnavailability} className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0 lg:col-span-2">
            <label htmlFor="unavailability-room" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.unavailabilityRoom')}
            </label>
            <select
              id="unavailability-room"
              value={unavailabilityRoomId}
              onChange={(e) => setUnavailabilityRoomId(e.target.value)}
              className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
            >
              <option value="">{t('admin.rooms.unavailabilitySelectRoom')}</option>
              {draftRooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name[lang] || room.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="unavailability-type" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.unavailabilityType')}
            </label>
            <select
              id="unavailability-type"
              value={unavailabilityType}
              onChange={(e) => {
                const value = e.target.value as UnavailabilityType
                setUnavailabilityType(value)
                if (value === 'booking') setUnavailabilityIndeterminate(false)
              }}
              className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
            >
              <option value="other">{t('admin.rooms.unavailabilityTypeOther')}</option>
              <option value="booking">{t('admin.rooms.unavailabilityTypeBooking')}</option>
            </select>
          </div>

          <div className="min-w-0">
            <label htmlFor="unavailability-start" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.unavailabilityFrom')}
            </label>
            <div className="relative flex min-w-0 overflow-hidden">
              <input
                id="unavailability-start"
                type="date"
                value={unavailabilityStart}
                onChange={(e) => setUnavailabilityStart(e.target.value)}
                className="min-w-0 flex-1 max-w-full appearance-none border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
                style={{ minWidth: 0 }}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label htmlFor="unavailability-end" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.unavailabilityTo')}
            </label>
            <div className="relative flex min-w-0 overflow-hidden">
              <input
                id="unavailability-end"
                type="date"
                value={unavailabilityEnd}
                min={unavailabilityStart}
                disabled={unavailabilityIndeterminate}
                onChange={(e) => setUnavailabilityEnd(e.target.value)}
                className="min-w-0 flex-1 max-w-full appearance-none border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none disabled:cursor-not-allowed disabled:bg-stone/10 disabled:text-stone"
                style={{ minWidth: 0 }}
              />
            </div>
          </div>

          {unavailabilityType === 'other' && (
            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-4">
              <input
                id="unavailability-indeterminate"
                type="checkbox"
                checked={unavailabilityIndeterminate}
                onChange={(e) => {
                  setUnavailabilityIndeterminate(e.target.checked)
                  if (e.target.checked) setUnavailabilityEnd('')
                }}
                className="h-4 w-4 border-stone/60 text-gold focus:ring-gold"
              />
              <label htmlFor="unavailability-indeterminate" className="font-sans text-sm font-light text-ink-soft">
                {t('admin.rooms.unavailabilityIndeterminate')}
              </label>
            </div>
          )}

          {unavailabilityType === 'booking' && (
            <>
              <div className="min-w-0 lg:col-span-2">
                <label htmlFor="unavailability-guest-name" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                  {t('admin.rooms.unavailabilityGuestName')}
                </label>
                <input
                  id="unavailability-guest-name"
                  type="text"
                  value={unavailabilityGuestName}
                  onChange={(e) => setUnavailabilityGuestName(e.target.value)}
                  className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
                />
              </div>
              <div className="min-w-0">
                <label htmlFor="unavailability-guest-email" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                  {t('admin.rooms.unavailabilityGuestEmail')}
                </label>
                <input
                  id="unavailability-guest-email"
                  type="email"
                  value={unavailabilityGuestEmail}
                  onChange={(e) => setUnavailabilityGuestEmail(e.target.value)}
                  className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
                />
              </div>
              <div className="min-w-0">
                <label htmlFor="unavailability-guest-phone" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
                  {t('admin.rooms.unavailabilityGuestPhone')}
                </label>
                <input
                  id="unavailability-guest-phone"
                  type="tel"
                  value={unavailabilityGuestPhone}
                  onChange={(e) => setUnavailabilityGuestPhone(e.target.value)}
                  className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="min-w-0 sm:col-span-2 lg:col-span-4">
            <label htmlFor="unavailability-note" className="mb-1 block font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft">
              {t('admin.rooms.unavailabilityNote')}
            </label>
            <textarea
              id="unavailability-note"
              rows={2}
              value={unavailabilityNote}
              onChange={(e) => setUnavailabilityNote(e.target.value)}
              className="w-full min-w-0 max-w-full border border-stone/60 bg-white px-3 py-2 font-sans text-sm font-light text-ink focus:border-gold focus:outline-none"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={addUnavailability}
          disabled={!unavailabilityFormValid}
          className="mt-4 inline-flex items-center gap-2 border border-ink bg-ink px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {t('admin.rooms.unavailabilityAdd')}
        </button>

        {otherUnavailabilities.length > 0 && (
          <div className="mt-6 overflow-x-auto border border-stone/50 bg-white">
            <table className="w-full table-fixed">
              <thead className="bg-cream">
                <tr className="border-b border-stone/50">
                  <th className="w-[25%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                    {t('admin.rooms.unavailabilityRoom')}
                  </th>
                  <th className="w-[18%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                    {t('admin.rooms.unavailabilityFrom')}
                  </th>
                  <th className="w-[18%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                    {t('admin.rooms.unavailabilityTo')}
                  </th>
                  <th className="w-[29%] px-2 py-2 text-left font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                    {t('admin.rooms.unavailabilityNote')}
                  </th>
                  <th className="w-[10%] px-2 py-2 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink-soft md:px-4 md:py-3">
                    {t('admin.rooms.actions')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {otherUnavailabilities.map((unavailability) => {
                  const room = roomById.get(unavailability.roomId)
                  return (
                    <tr key={unavailability.id} className="border-b border-stone/30 last:border-b-0">
                      <td className="px-2 py-3 font-sans text-sm font-medium leading-tight text-ink md:px-4 md:py-4">
                        {room ? room.name[lang] || room.name.en : unavailability.roomId}
                      </td>
                      <td className="px-2 py-3 font-sans text-sm font-light leading-tight text-ink-soft md:px-4 md:py-4">
                        {unavailability.startDate}
                      </td>
                      <td className="px-2 py-3 font-sans text-sm font-light leading-tight text-ink-soft md:px-4 md:py-4">
                        {unavailability.endDate ?? t('admin.rooms.unavailabilityIndeterminate')}
                      </td>
                      <td className="break-words px-2 py-3 font-sans text-sm font-light leading-tight text-ink-soft md:px-4 md:py-4">
                        {unavailability.note || '-'}
                      </td>
                      <td className="px-2 py-3 text-center md:px-4 md:py-4">
                        <button
                          type="button"
                          onClick={() => confirmDeleteUnavailability(unavailability)}
                          className="inline-flex items-center justify-center p-1.5 text-brick transition-colors hover:bg-brick/10 sm:p-2"
                          aria-label={t('admin.rooms.unavailabilityDelete')}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {otherUnavailabilities.length === 0 && (
          <p className="mt-6 font-sans text-sm font-light text-muted">
            {t('admin.rooms.unavailabilityEmpty')}
          </p>
        )}
      </div>

      {roomToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-room-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelDeleteRoom()
          }}
        >
          <div className="relative w-full max-w-md border border-stone/50 bg-white p-6 md:p-8">
            <button
              type="button"
              onClick={cancelDeleteRoom}
              className="absolute top-4 right-4 p-2 text-ink-soft transition-colors hover:text-brick"
              aria-label={t('aria.close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h3
              id="delete-room-modal-title"
              className="font-serif text-2xl font-light text-ink"
            >
              {t('admin.rooms.deleteTitle')}
            </h3>

            <p className="mt-4 font-sans text-base font-light text-muted">
              {t('admin.rooms.deleteConfirm', { name: roomToDelete.name[lang] || roomToDelete.name.en })}
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelDeleteRoom}
                className="inline-flex items-center justify-center border border-ink/20 px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5"
              >
                {t('admin.rooms.deleteCancel')}
              </button>
              <button
                type="button"
                onClick={deleteRoom}
                className="inline-flex items-center justify-center gap-2 border border-brick bg-brick px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t('admin.rooms.deleteConfirmButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {unavailabilityToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-unavailability-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelDeleteUnavailability()
          }}
        >
          <div className="relative w-full max-w-md border border-stone/50 bg-white p-6 md:p-8">
            <button
              type="button"
              onClick={cancelDeleteUnavailability}
              className="absolute top-4 right-4 p-2 text-ink-soft transition-colors hover:text-brick"
              aria-label={t('aria.close')}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h3
              id="delete-unavailability-modal-title"
              className="font-serif text-2xl font-light text-ink"
            >
              {t('admin.rooms.unavailabilityDeleteTitle')}
            </h3>

            <p className="mt-4 font-sans text-base font-light text-muted">
              {t('admin.rooms.unavailabilityDeleteConfirm', {
                name: roomById.get(unavailabilityToDelete.roomId)?.name[lang] ||
                  roomById.get(unavailabilityToDelete.roomId)?.name.en ||
                  unavailabilityToDelete.roomId,
                start: unavailabilityToDelete.startDate,
                end: unavailabilityToDelete.endDate ?? t('admin.rooms.unavailabilityIndeterminate'),
              })}
            </p>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelDeleteUnavailability}
                className="inline-flex items-center justify-center border border-ink/20 px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:bg-ink/5"
              >
                {t('admin.rooms.unavailabilityDeleteCancel')}
              </button>
              <button
                type="button"
                onClick={deleteUnavailability}
                className="inline-flex items-center justify-center gap-2 border border-brick bg-brick px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-brick-deep"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                {t('admin.rooms.unavailabilityDeleteConfirmButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-preview-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePreview()
          }}
        >
          <div className="relative max-h-[90vh] max-w-5xl">
            <button
              type="button"
              onClick={closePreview}
              className="absolute -top-10 right-0 p-2 text-white transition-colors hover:text-gold"
              aria-label={t('aria.close')}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <img
              src={previewImage.src}
              alt={previewImage.alt}
              className="max-h-[85vh] max-w-full border border-stone/30 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  )
}
