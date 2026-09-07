/**
 * Pill chip — uppercase label-caps tracking on a tonal sandstone fill.
 */
const variants = {
  default: 'bg-surface-high text-ink-muted',
  ink: 'bg-ink text-canvas',
  moss: 'bg-moss-soft text-moss-ink',
  umber: 'bg-umber/10 text-umber',
  outline: 'bg-transparent text-ink-muted border border-line',
  onDark: 'bg-on-dark/10 text-on-dark',
  frosted: 'frosted text-ink shadow-float',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full kicker whitespace-nowrap ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
