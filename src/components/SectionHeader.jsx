export default function SectionHeader({ id, eyebrow, title, text, light = false, center = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.22em] ${light ? 'text-sand' : 'text-sand-deep'}`}>{eyebrow}</p>
      <h2 id={id} className={`text-4xl sm:text-5xl ${light ? 'text-ivory' : 'text-ocean'}`}>{title}</h2>
      {text && <p className={`mt-4 text-base sm:text-lg ${light ? 'text-ivory/85' : 'text-muted'}`}>{text}</p>}
    </div>
  )
}
