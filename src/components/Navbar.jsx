import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import Wordmark from './Wordmark.jsx'
import MobileMenu from './MobileMenu.jsx'
import Button from './Button.jsx'
import useActiveSection from '../hooks/useActiveSection.js'
import { navLinks, sectionIds } from '../data/navigation.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const toggleRef = useRef(null)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const light = !solid // light text over the hero photograph
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'border-b border-line bg-ivory/95 shadow-sm backdrop-blur' : 'bg-gradient-to-b from-ocean-deep/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Thousand Sunny Resort, back to top">
          <Wordmark light={light} />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href.slice(1) ? 'true' : undefined}
                  className={`border-b-2 border-transparent py-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors aria-[current=true]:border-sand-deep ${
                    light ? 'text-ivory hover:text-sand aria-[current=true]:border-sand' : 'text-ocean hover:text-sand-deep'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#enquire" variant={light ? 'sand' : 'primary'} className="hidden !min-h-11 !py-2 lg:inline-flex">
            Plan Your Stay
          </Button>
          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className={`inline-flex h-12 w-12 items-center justify-center border lg:hidden ${
              light ? 'border-ivory/60 text-ivory hover:bg-ivory/10' : 'border-ocean/40 text-ocean hover:bg-sage-soft'
            }`}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} links={navLinks} active={active} />
    </header>
  )
}
