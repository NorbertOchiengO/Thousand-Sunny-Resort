import { ArrowRight } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import Img from './Img.jsx'
import Reveal from './Reveal.jsx'
import { experiences } from '../data/experiences.js'

export default function ExperiencesSection({ onEnquire }) {
  return (
    <section id="experiences" aria-labelledby="exp-title" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader id="exp-title" eyebrow="Experiences" title="Days shaped by you." text="A curated set of fictional experiences, from doing nothing beautifully to gathering the people you love." />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((x) => (
            <li key={x.id} className={`group flex flex-col border border-line bg-white ${x.span}`}>
              <div className="min-h-56 flex-1 overflow-hidden">
                <Img name={x.image} className="h-full min-h-56 w-full transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl text-ocean">{x.title}</h3>
                <p className="mt-2 text-muted">{x.text}</p>
                <button
                  type="button"
                  onClick={() => onEnquire({ topic: `Experience: ${x.title}` })}
                  aria-label={`Enquire about ${x.title}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-ocean hover:text-sand-deep"
                >
                  Enquire <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
