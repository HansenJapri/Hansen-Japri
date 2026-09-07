import { motion } from 'framer-motion'

/**
 * Editorial chapter header — Playfair title, optional standfirst/action on
 * the right, baseline-aligned on desktop and stacked on mobile.
 */
export default function SectionHeading({
  title,
  description,
  action,
  className = '',
  titleClassName = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8 md:mb-12 ${className}`}
    >
      <h2 className={`font-display text-headline-sm md:text-headline text-ink md:max-w-2xl ${titleClassName}`}>
        {title}
      </h2>

      {(description || action) && (
        <div className="shrink-0 md:mb-1.5 md:max-w-sm md:text-right">
          {description && <p className="text-body text-ink-muted">{description}</p>}
          {action && <div className="mt-4 md:mt-3 flex md:justify-end">{action}</div>}
        </div>
      )}
    </motion.div>
  )
}
