import { motion } from 'framer-motion'

/**
 * Editorial button set.
 * Full pill contours, warm espresso fill, trailing glyph translates on hover.
 */
const variants = {
  primary: 'bg-ink text-canvas hover:bg-ink-muted shadow-float',
  secondary: 'bg-transparent text-ink border border-ink/25 hover:bg-surface-high hover:border-ink/40',
  tonal: 'bg-surface-high text-ink border border-line hover:bg-surface-highest',
  accent: 'bg-moss text-on-dark hover:bg-moss-deep shadow-float',
  onDark: 'bg-canvas text-ink hover:bg-surface-high',
  ghost: 'bg-transparent text-ink-muted hover:text-ink',
}

const sizes = {
  sm: 'px-4 py-2 text-note',
  md: 'px-6 py-2.5 text-note',
  lg: 'px-7 py-3 text-body',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className = '',
  href,
  download,
  ...props
}) {
  const baseClasses = [
    'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide',
    'transition-colors duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
      {IconRight && (
        <IconRight
          className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      )}
    </>
  )

  if (href) {
    return (
      <motion.a
        whileTap={{ scale: 0.98 }}
        href={href}
        className={baseClasses}
        download={download}
        target={download ? undefined : '_blank'}
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button whileTap={{ scale: 0.98 }} className={baseClasses} {...props}>
      {content}
    </motion.button>
  )
}
