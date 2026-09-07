import { motion } from 'framer-motion'
import { Check, GraduationCap, Briefcase, Trophy } from 'lucide-react'

const typeConfig = {
  education: { icon: GraduationCap, label: 'Education' },
  work: { icon: Briefcase, label: 'Experience' },
  achievement: { icon: Trophy, label: 'Achievement' },
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

/* Dates arrive as "2024-01", "2026-07-24" or the literal "Present". */
function formatDate(value) {
  if (!value) return ''
  if (!/^\d{4}-\d{2}/.test(value)) return value
  const [year, month] = value.split('-')
  return `${MONTHS[Number(month) - 1]} ${year}`
}

export default function TimelineItem({ item, index = 0 }) {
  const config = typeConfig[item.type] || typeConfig.work
  const Icon = config.icon
  const isOngoing = item.endDate === 'Present'
  const range = `${formatDate(item.startDate)} — ${formatDate(item.endDate)}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: Math.min(index, 4) * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl bg-surface-low border border-line p-5 sm:p-8 transition-shadow duration-500 hover:shadow-float"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-10">
        {/* Meta rail */}
        <div className="md:w-1/3 md:shrink-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full kicker ${
                isOngoing ? 'bg-moss-soft text-moss-ink' : 'bg-surface-high text-ink-muted'
              }`}
            >
              {isOngoing && <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />}
              {range}
            </span>
            <span className="inline-flex items-center gap-1.5 kicker text-ink-faint">
              <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
              {config.label}
            </span>
          </div>

          <h3 className="font-display text-title text-ink pt-1">{item.title}</h3>
          <p className="text-body text-moss font-medium">{item.organization}</p>
        </div>

        {/* Narrative */}
        <div className="md:w-2/3 space-y-4">
          <p className="text-body text-ink-muted">{item.description}</p>

          {item.highlights?.length > 0 && (
            <ul className="space-y-2">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex items-center justify-center w-4 h-4 shrink-0 rounded-full bg-moss-soft">
                    <Check className="w-2.5 h-2.5 text-moss-ink" strokeWidth={2.5} />
                  </span>
                  <span className="text-note text-ink-muted">{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.article>
  )
}
