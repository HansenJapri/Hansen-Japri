import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Download, MapPin } from 'lucide-react'
import personalData from '../../data/personal.json'

/* The tagline gets an umber accent underline on its closing phrase. */
const taglineWords = personalData.tagline.split(' ')
const taglineHead = taglineWords.slice(0, -2).join(' ')
const taglineTail = taglineWords.slice(-2).join(' ')

/* "Software Engineer Fullstack | Fullstack Developer | ..." → discrete chips. */
const roleTags = personalData.subtitle
  .split('|')
  .map((role) => role.trim())
  .filter(Boolean)

/* bio[0] opens with "I am an ..." — reflowed so it reads as one
   sentence after the greeting, without dropping a single word. */
const introBody = personalData.bio[0].replace(/^I am an /, 'an ')

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  return (
    <section className="section-container pt-8 pb-12 md:pb-18">
      {/* ── Hero panel ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-low border border-line p-6 md:p-12">
        {/* Ambient daylight bloom, clipped by the panel */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-moss-soft/40 blur-3xl"
          aria-hidden="true"
        />

        {/* Monumental masthead + serif italic standfirst */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 md:pb-10 border-b border-line">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <span className="kicker text-moss">Selected Monograph</span>
              <span className="h-px w-12 bg-moss/35" aria-hidden="true" />
            </div>
            <h1 className="font-display display-caps text-hero-sm md:text-hero text-ink">
              Portfolio
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-lead md:text-quote text-ink lg:max-w-md lg:text-right lg:pb-2"
          >
            {taglineHead} <span className="accent-underline">{taglineTail}</span>.
          </motion.p>
        </div>

        {/* Bio + portrait */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8 md:mt-10">
          {/* Portrait leads on mobile, trails on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-none aspect-[4/5] rounded-[1.25rem] overflow-hidden bg-surface-highest shadow-lift">
              <img
                src={personalData.avatar}
                alt={`Portrait of ${personalData.name}`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
              {/* Ambient status badge — wraps to two lines rather than
                  truncating, so the availability text is always readable. */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1.5 frosted rounded-2xl px-4 py-3 shadow-float">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-moss animate-pulse shrink-0" />
                  <span className="kicker text-ink">{personalData.availability}</span>
                </span>
                <span className="flex items-center gap-1 text-ink-muted pl-3.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="text-note text-ink font-medium">{personalData.location}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Copy column */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 lg:col-span-7 space-y-6"
          >
            <p className="text-lead text-ink-muted">
              Hi, I&rsquo;m <strong className="font-semibold text-ink">{personalData.name}</strong>
              {' — '}
              {introBody}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-note font-medium shadow-float hover:bg-ink-muted transition-colors duration-300"
              >
                Explore Works
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </Link>
              <a
                href={personalData.resumeUrl}
                download="Hansen Japri CV Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-high text-ink border border-line text-note font-medium hover:bg-surface-highest transition-colors duration-300"
              >
                <Download className="w-4 h-4" strokeWidth={1.75} />
                Download CV
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-ink-muted text-note font-medium hover:text-ink transition-colors duration-300"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </Link>
            </div>

            {/* Role tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {roleTags.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full bg-surface-high text-ink-muted kicker"
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="hidden md:flex flex-col items-center gap-2 mt-10"
      >
        <span className="kicker text-ink-faint">Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-ink-faint" strokeWidth={1.75} />
        </motion.span>
      </motion.div>
    </section>
  )
}
