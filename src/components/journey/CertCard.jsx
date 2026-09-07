import { motion } from 'framer-motion'
import { Award, ExternalLink, ShieldCheck, Trophy, Code2, Landmark, Layers } from 'lucide-react'

/* Certificates carry a category; each gets its own glyph so the list
   reads as a credential wall rather than a stack of identical rows. */
const categoryIcons = {
  Achievement: Trophy,
  Development: Code2,
  Cybersecurity: ShieldCheck,
  Finance: Landmark,
  Architecture: Layers,
}

export default function CertCard({ cert, index = 0 }) {
  const Icon = categoryIcons[cert.category] || Award

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index, 5) * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-start gap-4 p-5 rounded-xl bg-canvas border border-line transition-shadow duration-500 hover:shadow-float"
    >
      <span className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-moss-soft">
        <Icon className="w-5 h-5 text-moss-ink" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="kicker text-moss">{cert.category}</span>
          <span className="kicker text-ink-faint">{cert.date}</span>
        </div>

        <h4 className="text-body font-semibold text-ink">{cert.name}</h4>
        <p className="text-note text-ink-muted">{cert.issuer}</p>

        {cert.verificationUrl && (
          <a
            href={cert.verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 pt-1 kicker text-ink hover:text-moss transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
            View Certificate
          </a>
        )}
      </div>
    </motion.div>
  )
}
