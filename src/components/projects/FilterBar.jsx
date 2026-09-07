import { motion } from 'framer-motion'

/**
 * Category chips. Options are derived from the project data by the caller,
 * so a filter can never render for a category that has no work behind it.
 */
export default function FilterBar({ categories, activeFilter, onFilterChange }) {
  if (categories.length <= 2) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filter projects by category"
    >
      {categories.map((category) => {
        const isActive = activeFilter === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => onFilterChange(category)}
            aria-pressed={isActive}
            className={`relative px-4 py-1.5 rounded-full kicker transition-colors duration-300 ${
              isActive
                ? 'text-canvas'
                : 'text-ink-muted bg-surface-high hover:bg-surface-highest hover:text-ink'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: 'spring', bounce: 0.18, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </motion.div>
  )
}
