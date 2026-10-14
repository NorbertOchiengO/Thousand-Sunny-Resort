import { useState } from 'react'
import { Expand } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import Img from './Img.jsx'
import GalleryLightbox from './GalleryLightbox.jsx'
import Reveal from './Reveal.jsx'
import { gallery } from '../data/gallery.js'

export default function GallerySection() {
  const [open, setOpen] = useState(null)
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader id="gallery-title" eyebrow="Gallery" title="A glimpse of the days ahead." text="Select any image to view it larger. Use the arrow keys to move between photographs." />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
          {gallery.map((g, i) => (
            <li key={g.id}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`Open image: ${g.caption}`} className="group relative block w-full overflow-hidden text-left">
                <Img name={g.image} className="aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-ocean-deep/80 px-3 py-2 text-xs font-medium text-ivory sm:translate-y-full sm:transition-transform sm:group-hover:translate-y-0 sm:group-focus-visible:translate-y-0">
                  <span>{g.caption}</span>
                  <Expand className="h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {open !== null && <GalleryLightbox items={gallery} index={open} onClose={() => setOpen(null)} onChange={setOpen} />}
    </section>
  )
}
