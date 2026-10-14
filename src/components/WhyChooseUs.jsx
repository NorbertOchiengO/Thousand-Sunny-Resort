import { BedDouble, Compass, HeartHandshake, Trees } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'

const points = [
  { icon: BedDouble, title: 'Thoughtfully designed stays', text: 'Natural materials, soft light and layouts that put rest first.' },
  { icon: Compass, title: 'Memorable experiences', text: 'A short, curated list of things worth doing, rather than a long list of things to tick off.' },
  { icon: HeartHandshake, title: 'Personalised hospitality', text: 'Hosts who listen, remember and adjust to how you like to travel.' },
  { icon: Trees, title: 'A connection with nature', text: 'Open grounds, sea air and spaces designed to bring the outdoors in.' },
]

const moments = [
  { name: 'Arrive', text: 'A cool drink, a quiet welcome and a room already feeling like yours.' },
  { name: 'Unwind', text: 'Pool, spa or a shaded corner of the garden. Nothing is scheduled unless you want it to be.' },
  { name: 'Linger', text: 'Dinner that stretches into the evening, and a sky worth staying up for.' },
]

export default function WhyChooseUs() {
  return (
    <>
      <section aria-labelledby="why-title" className="bg-sage-soft py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeader id="why-title" eyebrow="Why Thousand Sunny" title="Quietly considered, in every detail." center />
          </Reveal>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {points.map((p) => (
              <li key={p.title} className="text-center sm:text-left">
                <span className="mx-auto flex h-14 w-14 items-center justify-center border border-ocean/30 text-ocean sm:mx-0">
                  <p.icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl text-ocean">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="exp-moments-title" className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeader id="exp-moments-title" eyebrow="The Experience" title="The Thousand Sunny experience." text="The intended guest experience for this concept, in three unhurried moments." />
          </Reveal>
          <ol className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {moments.map((m, i) => (
              <li key={m.name} className="bg-ivory p-8">
                <span className="font-serif text-5xl text-sand-deep" aria-hidden="true">0{i + 1}</span>
                <h3 className="mt-3 text-3xl text-ocean">{m.name}</h3>
                <p className="mt-2 text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
