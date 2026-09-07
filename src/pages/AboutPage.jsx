import { motion } from 'framer-motion'
import { Clock, Mail } from 'lucide-react'
import { PageTransition } from '../components/ui/AnimatedSection'
import PersonalStory from '../components/about/PersonalStory'
import SkillsSection from '../components/about/SkillsSection'
import ContactForm from '../components/about/ContactForm'
import SocialLinks from '../components/about/SocialLinks'
import personalData from '../data/personal.json'

export default function AboutPage() {
  return (
    <PageTransition>
      {/* ── Profile ────────────────────────────────────────────── */}
      <section className="section-container py-12 md:py-18">
        <PersonalStory />
      </section>

      {/* ── Capabilities ───────────────────────────────────────── */}
      <SkillsSection />

      {/* ── Contact ────────────────────────────────────────────── */}
      <section id="contact" className="section-container pb-18 md:pb-26 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-moss-deep text-on-dark p-6 sm:p-10 md:p-12 shadow-lift"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Statement */}
            <div className="lg:col-span-6 space-y-5">
              <h2 className="font-display text-headline-sm md:text-headline text-on-dark">
                Let&rsquo;s create something{' '}
                <span className="italic text-moss-soft">meaningful together</span>.
              </h2>

              <p className="text-lead text-on-dark/75 max-w-lg">
                Have a project idea, a question, or just want to say hello? I am always open to
                collaboration opportunities on high-impact projects where I can bring Agile project
                management and end-to-end product development to the table.
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
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

              <div className="pt-2 space-y-3">
                <span className="kicker text-moss-soft">Find me online</span>
                <SocialLinks variant="onDark" />
              </div>
            </div>

            {/* Form card */}
            <div className="lg:col-span-6 rounded-xl bg-canvas text-ink p-6 sm:p-8 shadow-float space-y-5">
              <div className="space-y-1.5">
                <h3 className="font-display text-title text-ink">Start a Dialogue</h3>
                <p className="text-note text-ink-muted">
                  Share a brief note about your product scope, timeline, and aspirations.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  )
}
