import { motion } from 'framer-motion'
import { Download, MapPin } from 'lucide-react'
import personalData from '../../data/personal.json'

const roleTags = personalData.subtitle
  .split('|')
  .map((role) => role.trim())
  .filter(Boolean)

export default function PersonalStory() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      {/* Portrait */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5 lg:sticky lg:top-28"
      >
        <div className="relative w-full max-w-sm mx-auto lg:max-w-none aspect-[4/5] rounded-[1.25rem] overflow-hidden bg-surface-highest border border-line shadow-lift">
          <img
            src={personalData.avatar}
            alt={`Portrait of ${personalData.name}`}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 frosted rounded-full px-4 py-2.5 shadow-float">
            <span className="kicker text-ink truncate">
              {personalData.stats.yearsExperience}+ years building products
            </span>
            <span className="flex items-center gap-1 text-ink-muted shrink-0">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span className="text-note text-ink font-medium">{personalData.location}</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Narrative — every paragraph of the bio, in full */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7 space-y-6"
      >
        <div className="space-y-3">
          <h2 className="font-display text-headline-sm md:text-headline text-ink">
            {personalData.name}
          </h2>
          <p className="font-display italic text-lead md:text-quote text-moss">
            {personalData.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {roleTags.map((role) => (
            <span key={role} className="px-3 py-1 rounded-full bg-surface-high text-ink-muted kicker">
              {role}
            </span>
          ))}
        </div>

        <div className="hairline" />

        <div className="space-y-4">
          {personalData.bio.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
              className={index === 0 ? 'text-lead text-ink' : 'text-body text-ink-muted'}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="pt-1">
          <a
            href={personalData.resumeUrl}
            download="Hansen Japri CV Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-note font-medium shadow-float hover:bg-ink-muted transition-colors duration-300"
          >
            <Download className="w-4 h-4" strokeWidth={1.75} />
            Download CV
          </a>
        </div>
      </motion.div>
    </div>
  )
}
