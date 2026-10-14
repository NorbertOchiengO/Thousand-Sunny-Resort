import { motion } from 'motion/react'
import { Users } from 'lucide-react'
import Img from './Img.jsx'
import Button from './Button.jsx'

export default function RoomCard({ room, onExplore, onEnquire }) {
  return (
    <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group flex flex-col border border-line bg-white">
      <div className="overflow-hidden">
        <Img name={room.image} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-3xl text-ocean">{room.name}</h3>
        <p className="mt-1 font-serif text-lg italic text-sand-deep">{room.tagline}</p>
        <p className="mt-3 text-muted">{room.description}</p>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-charcoal">
          <Users className="h-4 w-4 text-ocean" aria-hidden="true" />
          Sleeps up to {room.capacity}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((a) => (
            <li key={a} className="bg-sage-soft px-2.5 py-1 text-xs font-medium text-ocean">{a}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          From <span className="font-serif text-2xl font-semibold text-ocean">${room.from}</span> per night
          <span className="block text-xs">Sample pricing, illustrative only</span>
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button variant="outline" onClick={() => onExplore(room)} aria-label={`Explore Room, ${room.name}`} className="flex-1">Explore Room</Button>
          <Button variant="primary" onClick={() => onEnquire(room)} aria-label={`Enquire, ${room.name}`} className="flex-1">Enquire</Button>
        </div>
      </div>
    </motion.article>
  )
}
