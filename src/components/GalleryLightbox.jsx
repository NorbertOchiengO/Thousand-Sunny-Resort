import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Img from './Img.jsx'
import useFocusTrap from '../hooks/useFocusTrap.js'

export default function GalleryLightbox({ items, index, onClose, onChange }) {
  const ref = useRef(null)
  useFocusTrap(ref, true, onClose)
  const item = items[index]
  const go = (d) => onChange((index + d + items.length) % items.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  const btn = 'inline-flex h-12 w-12 items-center justify-center border border-ivory/50 text-ivory hover:bg-ivory/15'
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}: ${item.caption}`}
      tabIndex={-1}
      className="on-dark fixed inset-0 z-50 flex flex-col bg-ocean-deep/95 p-4 focus:outline-none sm:p-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between text-ivory">
        <p className="text-sm font-semibold" aria-live="polite">{index + 1} / {items.length}</p>
        <button type="button" onClick={onClose} aria-label="Close gallery" className={btn}><X className="h-6 w-6" aria-hidden="true" /></button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${btn} shrink-0`}><ChevronLeft className="h-6 w-6" aria-hidden="true" /></button>
        <figure className="m-0 flex min-h-0 min-w-0 max-w-4xl flex-1 flex-col items-center">
          <Img name={item.image} alt={item.caption} loading="eager" className="max-h-[70svh] w-full" />
          <figcaption className="mt-3 text-center text-ivory">{item.caption}</figcaption>
        </figure>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${btn} shrink-0`}><ChevronRight className="h-6 w-6" aria-hidden="true" /></button>
      </div>
    </div>
  )
}
