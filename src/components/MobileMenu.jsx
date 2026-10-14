import { useRef } from 'react'
import { X } from 'lucide-react'
import useFocusTrap from '../hooks/useFocusTrap.js'
import Button from './Button.jsx'

export default function MobileMenu({ open, onClose, links, active }) {
  const ref = useRef(null)
  useFocusTrap(ref, open, onClose)
  if (!open) return null
  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      tabIndex={-1}
      className="on-dark fixed inset-0 z-50 flex flex-col bg-ocean px-6 pb-8 pt-5 text-ivory focus:outline-none lg:hidden"
    >
      <div className="flex items-center justify-between">
        <span className="font-serif text-2xl">Thousand Sunny</span>
        <button type="button" onClick={onClose} aria-label="Close menu" className="inline-flex h-12 w-12 items-center justify-center border border-ivory/40 hover:bg-ivory/10">
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-10 flex-1">
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={onClose}
                aria-current={active === l.href.slice(1) ? 'true' : undefined}
                className="block border-b border-ivory/15 py-4 font-serif text-3xl hover:text-sand aria-[current=true]:text-sand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <Button href="#enquire" variant="sand" onClick={onClose} className="w-full">Plan Your Stay</Button>
    </div>
  )
}
