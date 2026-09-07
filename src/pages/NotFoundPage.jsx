import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { PageTransition } from '../components/ui/AnimatedSection'

export default function NotFoundPage() {
  return (
    <PageTransition>
      <section className="section-container py-18 md:py-26">
        <div className="relative overflow-hidden rounded-2xl bg-surface-low border border-line px-6 py-16 md:py-24 text-center">
          <div
            className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-moss-soft/40 blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <div className="flex items-center gap-3">
              <span className="kicker text-moss">Error 404</span>
              <span className="h-px w-12 bg-moss/35" aria-hidden="true" />
            </div>

            <h1 className="font-display text-hero-sm md:text-hero text-ink leading-none">404</h1>

            <p className="font-display italic text-lead md:text-quote text-ink">
              This page has left the <span className="accent-underline">archive</span>.
            </p>

            <p className="text-body text-ink-muted max-w-md">
              The page you are looking for does not exist or has been moved to a different URL.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-note font-medium shadow-float hover:bg-ink-muted transition-colors duration-300"
              >
                <Home className="w-4 h-4" strokeWidth={1.75} />
                Back to Home
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-high text-ink border border-line text-note font-medium hover:bg-surface-highest transition-colors duration-300"
              >
                <ArrowLeft
                  className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                  strokeWidth={1.75}
                />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
