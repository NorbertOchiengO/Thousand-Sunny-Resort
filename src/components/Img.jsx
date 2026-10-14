import { useState } from 'react'
import { images, REMOTE_BASE } from '../data/images.js'

const tones = {
  ocean: 'from-ocean to-ocean-deep text-sand',
  sage: 'from-sage to-sage-soft text-ocean',
  sand: 'from-sand to-ivory text-ocean',
  dusk: 'from-ocean-deep to-charcoal text-sand',
}

// Local file -> existing deployment -> designed fallback. Never shows a broken image.
export default function Img({ name, alt, className = '', loading = 'lazy', fetchPriority, sizes }) {
  const meta = images[name]
  const [stage, setStage] = useState(0)
  const text = alt ?? meta?.alt ?? ''

  if (!meta || stage >= 2) {
    return (
      <div
        role="img"
        aria-label={text}
        className={`flex items-center justify-center bg-gradient-to-br ${tones[meta?.tone] || tones.ocean} ${className}`}
      >
        <svg viewBox="0 0 64 64" className="h-12 w-12 opacity-70" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="32" cy="24" r="9" />
          <path d="M6 44c8-6 14-6 20 0s14 6 20 0 10-4 12-2" />
          <path d="M6 54c8-6 14-6 20 0s14 6 20 0 10-4 12-2" />
        </svg>
      </div>
    )
  }

  const src = stage === 0 ? `/images/${meta.file}` : `${REMOTE_BASE}/${meta.file}`
  return (
    <img
      key={stage}
      src={src}
      alt={text}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      onError={() => setStage((s) => s + 1)}
      className={`object-cover ${className}`}
    />
  )
}
