import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import personalData from '../../data/personal.json'

const stats = [
  { value: personalData.stats.projectCount, suffix: '+', label: 'Projects Completed' },
  { value: personalData.stats.yearsExperience, suffix: '+', label: 'Years Experience' },
  { value: personalData.stats.certifications, suffix: '', label: 'Certifications' },
  { value: personalData.stats.techMastered, suffix: '+', label: 'Technologies Mastered' },
]

function useCountUp(target, duration = 1600) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasStarted(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasStarted) return
    let frame
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo — settles like a printed figure, no linear crawl
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [hasStarted, target, duration])

  return { count, ref }
}

/* Hairlines are placed per cell rather than with `divide-*`, because in a
   2-column grid `> * + *` would rule between cells 1 and 2 of the same row. */
const cellBorders = [
  '',
  'border-l border-line',
  'border-t border-line md:border-t-0 md:border-l',
  'border-t border-l border-line md:border-t-0',
]

/* One cell per metric — a component so the count-up hook is never
   called from inside a loop body. */
function StatCell({ value, suffix, label, index }) {
  const { count, ref } = useCountUp(value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col px-4 sm:px-6 py-4 ${cellBorders[index] ?? ''}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="font-display text-numeric text-ink tabular-nums">{count}</span>
        {suffix && <span className="font-display text-numeric text-moss font-light">{suffix}</span>}
      </div>
      <span className="kicker text-ink-muted mt-1.5">{label}</span>
    </motion.div>
  )
}

export default function QuickStats() {
  return (
    <section className="section-container pb-12 md:pb-18">
      <div className="rounded-2xl bg-surface border border-line px-2 py-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCell key={stat.label} {...stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
