import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import Reveal from './Reveal.jsx'
import { faqs } from '../data/faqs.js'

export default function FAQSection() {
  const base = useId()
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-sage-soft py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeader id="faq-title" eyebrow="Good to know" title="Frequently asked questions." text="Policies shown here are placeholders for the concept, not binding terms." />
        </Reveal>
        <div className="divide-y divide-line border border-line bg-white">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <h3 className="font-sans text-base">
                  <button
                    id={`${base}-b${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${base}-p${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ocean hover:bg-sage-soft/60"
                  >
                    <span>{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
