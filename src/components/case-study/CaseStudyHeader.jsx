import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import Button from '../ui/Button'
import TiltCard from '../ui/TiltCard'
import { EASE_OUT } from '../ui/AnimatedSection'

export default function CaseStudyHeader({ project }) {
  const meta = [
    { label: 'Date', value: new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.collaborationType },
    { label: 'Context', value: project.context },
  ]

  return (
    <header className="container-page pt-10 md:pt-14">
      <Link
        to="/projects"
        className="group inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg transition-colors"
      >
        <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" strokeWidth={1.5} />
        All work
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="mt-10"
      >
        <h1 className="text-display font-semibold">{project.title}</h1>
        <p className="mt-6 text-lead text-fg-muted max-w-[62ch]">{project.shortSummary}</p>

        {(project.media.demoUrl || project.media.repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.media.demoUrl && (
              <Button href={project.media.demoUrl} iconRight={ArrowUpRight}>
                Live demo
              </Button>
            )}
            {project.media.repoUrl && (
              <Button href={project.media.repoUrl} variant="secondary" icon={Github}>
                Repository
              </Button>
            )}
          </div>
        )}
      </motion.div>

      <dl className="mt-12 grid grid-cols-2 gap-y-6 border-t border-line pt-6 md:grid-cols-4">
        {meta.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm text-fg-faint">{label}</dt>
            <dd className="mt-1 text-fg">{value}</dd>
          </div>
        ))}
      </dl>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT }}
        className="mt-12"
      >
        <TiltCard max={4}>
          <img
            src={project.thumbnail}
            alt={`${project.title} interface`}
            className="aspect-[16/10] w-full rounded-[var(--radius-panel)] border border-line object-cover object-top bg-raised"
          />
        </TiltCard>
      </motion.div>
    </header>
  )
}
