import { useState } from 'react'
import SectionHeader from './SectionHeader.jsx'
import RoomCard from './RoomCard.jsx'
import RoomDetails from './RoomDetails.jsx'
import Reveal from './Reveal.jsx'
import { rooms } from '../data/rooms.js'

export default function AccommodationSection({ onEnquire }) {
  const [selected, setSelected] = useState(null)
  const enquire = (room) => {
    setSelected(null)
    onEnquire({ accommodation: room.id, topic: `Accommodation: ${room.name}` })
  }
  return (
    <section id="stay" aria-labelledby="stay-title" className="bg-sage-soft py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader id="stay-title" eyebrow="Stay" title="Rooms with room to breathe." text="Three fictional ways to stay, each designed around light, space and privacy. All details and prices are sample content for this concept." />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} onExplore={setSelected} onEnquire={enquire} />
          ))}
        </div>
      </div>
      {selected && <RoomDetails room={selected} onClose={() => setSelected(null)} onEnquire={enquire} />}
    </section>
  )
}
