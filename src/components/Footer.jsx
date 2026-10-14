import Wordmark from './Wordmark.jsx'
import { navLinks, contactPlaceholders } from '../data/navigation.js'

export default function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="on-dark bg-ocean-deep text-ivory">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <Wordmark light />
          <p className="mt-4 text-ivory/85">A fictional boutique resort concept designed and built by ARCLUME LABS.</p>
        </div>
        <nav aria-label="Footer">
          <h2 id="contact-title" className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-sand">Explore</h2>
          <ul className="mt-4">
            {navLinks.slice(0, 4).map((l) => (
              <li key={l.href}><a href={l.href} className="inline-flex min-h-10 items-center text-ivory/90 hover:text-sand">{l.label}</a></li>
            ))}
            <li><a href="#enquire" className="inline-flex min-h-10 items-center text-ivory/90 hover:text-sand">Plan Your Stay</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-sand">Contact (demo placeholders)</h2>
          <dl className="mt-4 space-y-2">
            {contactPlaceholders.items.map((c) => (
              <div key={c.label}>
                <dt className="text-sm text-ivory/70">{c.label}</dt>
                <dd>{c.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm text-ivory/75">{contactPlaceholders.note}</p>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <p className="mx-auto w-full max-w-7xl px-5 py-6 text-sm text-ivory/80 sm:px-8">© 2026 Thousand Sunny Resort. Concept project by ARCLUME LABS. Not a real hospitality business.</p>
      </div>
    </footer>
  )
}
