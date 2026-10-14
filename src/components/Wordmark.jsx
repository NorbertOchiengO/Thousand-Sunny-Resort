export default function Wordmark({ light = false }) {
  const c = light ? 'text-ivory' : 'text-ocean'
  return (
    <span className={`inline-flex items-center gap-3 ${c}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="16" cy="12" r="5.5" />
        <path d="M3 21c4-3 8-3 13 0s9 3 13 0M3 27c4-3 8-3 13 0s9 3 13 0" />
      </svg>
      <span className="leading-none">
        <span className="block font-serif text-2xl font-semibold tracking-wide">Thousand Sunny</span>
        <span className="mt-1 block text-[0.65rem] font-semibold uppercase tracking-[0.3em] opacity-90">Resort</span>
      </span>
    </span>
  )
}
