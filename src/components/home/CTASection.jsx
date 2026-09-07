import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Download, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import personalData from '../../data/personal.json'

const socialConfig = [
  { key: 'github', label: 'GitHub', Icon: Github },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
]

export default function CTASection() {
  return (
    <section id="contact" className="section-container pb-18 md:pb-26 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl bg-moss-deep text-on-dark p-6 sm:p-10 md:p-12 shadow-lift"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Editorial statement */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-moss-soft animate-pulse" />
              <span className="kicker text-moss-soft">{personalData.availability}</span>
            </div>

            <h2 className="font-display text-headline-sm md:text-headline text-on-dark">
              Let&rsquo;s build something{' '}
              <span className="italic text-moss-soft">that matters</span>.
            </h2>

            <p className="text-lead text-on-dark/75 max-w-lg">
              Open for high-impact product collaborations, Agile project management, and
              end-to-end software development — from first concept to shipped commercial product.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <a
                href={`mailto:${personalData.socialLinks.email}`}
                className="inline-flex items-center gap-2 text-body text-on-dark hover:text-moss-soft transition-colors underline decoration-moss-soft/40 underline-offset-4 break-all"
              >
                <Mail className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                {personalData.socialLinks.email}
              </a>
              <span className="inline-flex items-center gap-2 text-body text-on-dark/70">
                <Clock className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                WIB · {personalData.location} (UTC+7)
              </span>
            </div>
          </div>

          {/* Quick-action card */}
          <div className="lg:col-span-5 rounded-xl bg-canvas text-ink p-6 shadow-float space-y-5">
            <div className="space-y-1.5">
              <h3 className="font-display text-title text-ink">Start a Dialogue</h3>
              <p className="text-note text-ink-muted">
                Share a brief note about your product scope, timeline, and aspirations — or reach
                out directly through any channel below.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-ink text-canvas text-note font-medium hover:bg-ink-muted transition-colors duration-300"
              >
                Send a Message
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                />
              </Link>
              <a
                href={personalData.resumeUrl}
                download="Hansen Japri CV Resume.pdf"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full bg-surface-high text-ink border border-line text-note font-medium hover:bg-surface-highest transition-colors duration-300"
              >
                <Download className="w-4 h-4" strokeWidth={1.75} />
                Download CV
              </a>
            </div>

            <div className="pt-4 border-t border-line space-y-2.5">
              <span className="kicker text-ink-faint">Elsewhere</span>
              <div className="flex flex-wrap gap-2">
                {socialConfig.map(({ key, label, Icon }) => {
                  const url = personalData.socialLinks[key]
                  if (!url) return null
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-high text-ink kicker hover:bg-surface-highest transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                      {label}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
