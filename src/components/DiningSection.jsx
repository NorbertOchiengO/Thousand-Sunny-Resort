import Img from './Img.jsx'
import Button from './Button.jsx'
import Reveal from './Reveal.jsx'
import SectionHeader from './SectionHeader.jsx'
import { diningMenu } from '../data/dining.js'

export default function DiningSection({ onEnquire }) {
  return (
    <section id="dining" aria-labelledby="dining-title" className="on-dark bg-ocean py-20 text-ivory sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeader
            id="dining-title"
            light
            eyebrow="Dining"
            title="Tables set for slow evenings."
            text="Imagine open-air dining with the sea close by: simple, seasonal food, warm light and no sense of hurry."
          />
          <div className="mt-8 border border-ivory/20 p-5 sm:p-6">
            <h3 className="text-2xl text-sand">Sample menu</h3>
            <p className="mt-1 text-sm text-ivory/80">Illustrative only. These dishes are invented for the concept.</p>
            <dl className="mt-5 space-y-4">
              {diningMenu.map((m) => (
                <div key={m.course} className="grid gap-1 border-t border-ivory/15 pt-4 sm:grid-cols-[7rem_1fr]">
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">{m.course}</dt>
                  <dd>
                    <span className="block font-serif text-xl">{m.dish}</span>
                    <span className="text-sm text-ivory/80">{m.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <Button variant="sand" onClick={() => onEnquire({ topic: 'Dining enquiry' })} className="mt-8">Make a Dining Enquiry</Button>
        </Reveal>
        <Reveal delay={0.1}>
          <Img name="wine" className="aspect-[4/5] w-full" />
        </Reveal>
      </div>
    </section>
  )
}
