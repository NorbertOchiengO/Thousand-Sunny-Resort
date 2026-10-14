import { useRef } from 'react'
import { X, Users, Check } from 'lucide-react'
import Img from './Img.jsx'
import Button from './Button.jsx'
import useFocusTrap from '../hooks/useFocusTrap.js'
import { priceNote } from '../data/rooms.js'

export default function RoomDetails({ room, onClose, onEnquire }) {
  const ref = useRef(null)
  useFocusTrap(ref, true, onClose)
  const titleId = `room-${room.id}-title`
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ocean-deep/70 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={ref} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="max-h-[94svh] w-full max-w-4xl overflow-y-auto bg-ivory focus:outline-none sm:max-h-[90svh]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ivory px-5 py-3 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-deep">Concept room</p>
          <button type="button" onClick={onClose} aria-label="Close room details" className="inline-flex h-11 w-11 items-center justify-center border border-ocean/30 text-ocean hover:bg-sage-soft">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {room.gallery.map((g, i) => (
            <Img key={g} name={g} alt={i === 0 ? `${room.name}` : `Additional imagery for ${room.name}`} loading="eager" className="aspect-[4/3] w-full" />
          ))}
        </div>
        <div className="p-5 sm:p-8">
          <h2 id={titleId} className="text-4xl text-ocean sm:text-5xl">{room.name}</h2>
          <p className="mt-4 max-w-2xl text-muted">{room.longDescription}</p>
          <p className="mt-5 flex items-center gap-2 font-semibold"><Users className="h-5 w-5 text-ocean" aria-hidden="true" />Sleeps up to {room.capacity} guests</p>
          <h3 className="mt-6 text-2xl text-ocean">Amenities</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {room.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-ocean" aria-hidden="true" />{a}</li>
            ))}
          </ul>
          <p className="mt-6 text-muted">From <strong className="font-serif text-2xl text-ocean">${room.from}</strong> per night. <span className="text-sm">{priceNote}</span></p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => onEnquire(room)}>Enquire About This Room</Button>
            <Button variant="outline" onClick={onClose}>Back to rooms</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
