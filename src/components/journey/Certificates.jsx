import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { formatDate } from './TimelineItem'
import certifications from '../../data/certifications.json'

const FILTERS = ['All', 'Achievement', 'Software & AI', 'Security', 'Business', 'Language']
const LABELS = { Achievement: 'Achievements' }

const sorted = [...certifications].sort((a, b) => String(b.date).localeCompare(String(a.date)))

function CertRow({ cert }) {
  const achievement = cert.category === 'Achievement'
  const Wrapper = cert.file ? 'a' : 'div'
  const linkProps = cert.file ? { href: cert.file, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.25 }}
    >
      <Wrapper
        {...linkProps}
        className={`group grid grid-cols-[1fr_auto] items-start gap-4 border-t border-line py-5 ${
          cert.file ? 'cursor-pointer' : ''
        }`}
      >
        <span>
          <span className="flex items-start gap-2.5">
            {achievement && <Trophy className="mt-1 size-4 shrink-0 text-accent" strokeWidth={1.5} aria-label="Achievement" />}
            <span className={`text-lg leading-snug font-medium ${cert.file ? 'group-hover:text-accent transition-colors duration-200' : ''}`}>
              {cert.name}
            </span>
          </span>
          <span className="mt-1 block text-fg-muted">{cert.issuer}</span>
        </span>
        <span className="flex items-center gap-2 pt-1 font-mono text-[0.8125rem] text-fg-faint whitespace-nowrap">
          {formatDate(cert.date)}
          {cert.file && (
            <ArrowUpRight
              className="size-4 text-fg-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
              aria-label="Opens certificate"
            />
          )}
        </span>
      </Wrapper>
    </motion.li>
  )
}

export default function Certificates() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? sorted : sorted.filter((c) => c.category === filter)),
    [filter]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certificates">
        {FILTERS.map((f) => {
          const active = filter === f
          const count = f === 'All' ? sorted.length : sorted.filter((c) => c.category === f).length
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`press relative h-9 rounded-full px-4 text-sm ${
                active ? 'text-on-accent' : 'border border-line-strong text-fg-muted hover:text-fg'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="cert-filter"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', duration: 0.4, bounce: 0.12 }}
                />
              )}
              <span className="relative">
                {LABELS[f] ?? f} <span className={active ? 'opacity-70' : 'text-fg-faint'}>{count}</span>
              </span>
            </button>
          )
        })}
      </div>

      <ul className="mt-8 grid border-b border-line md:grid-cols-2 md:gap-x-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((cert) => (
            <CertRow key={cert.id} cert={cert} />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
