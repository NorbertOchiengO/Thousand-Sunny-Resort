const styles = {
  primary: 'bg-ocean text-ivory border border-ocean hover:bg-ocean-deep',
  sand: 'bg-sand text-ocean-deep border border-sand hover:bg-ivory hover:border-ivory',
  ghost: 'bg-transparent text-ivory border border-ivory/80 hover:bg-ivory/10',
  outline: 'bg-transparent text-ocean border border-ocean hover:bg-ocean hover:text-ivory',
}

export default function Button({ href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition-colors ${styles[variant]} ${className}`
  return href ? (
    <a href={href} className={cls} {...rest}>{children}</a>
  ) : (
    <button type="button" className={cls} {...rest}>{children}</button>
  )
}
