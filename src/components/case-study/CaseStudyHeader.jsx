import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Calendar, ExternalLink, Github, User, Users } from 'lucide-react'

const cellBorders = [
  '',
  'border-l border-line',
  'border-t border-line sm:border-t-0 sm:border-l',
  'border-t border-l border-line sm:border-t-0',
]

export default function CaseStudyHeader({ project }) {
  const year = new Date(project.date).getFullYear()
  const meta = [
    {
      Icon: Calendar,
      label: 'Date',
      value: new Date(project.date).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
    },
    { Icon: Users, label: 'Team', value: project.collaborationType },
    { Icon: User, label: 'Role', value: project.role },
    { Icon: Briefcase, label: 'Context', value: project.context },
  ]

  return (
    <header className="section-container pt-8 pb-10 md:pb-12">
      {/* Chapter tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-8 border-b border-line">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 kicker text-ink-muted hover:text-ink transition-colors"
        >
          <ArrowLeft
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
            strokeWidth={1.75}
          />
          Back to Archive
        </Link>
        <div className="flex items-center gap-4 text-ink-faint">
          <span className="kicker">
            {year} • {project.category}
          </span>
          <span className="hidden sm:inline-block w-8 h-px bg-line-strong" aria-hidden="true" />
          <span className="kicker">{project.status}</span>
        </div>
      </div>

      {/* Title block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-8 md:pb-10 border-b border-line"
      >
        <div className="lg:col-span-7 space-y-3">
          <h1 className="font-display text-headline-sm md:text-headline text-ink">
            {project.title}
          </h1>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <p className="text-lead text-ink-muted">{project.shortSummary}</p>

          <div className="flex flex-wrap items-center gap-3">
            {project.media.demoUrl && (
              <a
                href={project.media.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-canvas text-note font-medium shadow-float hover:bg-ink-muted transition-colors duration-300"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
                Live Demo
              </a>
            )}
            {project.media.repoUrl && (
              <a
                href={project.media.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-high text-ink border border-line text-note font-medium hover:bg-surface-highest transition-colors duration-300"
              >
                <Github className="w-4 h-4" strokeWidth={1.75} />
                Repository
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Preview plate */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 md:mt-10 rounded-2xl overflow-hidden bg-surface-highest border border-line shadow-lift"
      >
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full aspect-16/10 object-cover object-top"
        />
      </motion.div>

      {/* Meta ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 rounded-2xl bg-surface border border-line px-2 py-2 sm:px-4"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {meta.map(({ Icon, label, value }, index) => (
            <div key={label} className={`px-4 sm:px-6 py-4 ${cellBorders[index]}`}>
              <div className="flex items-center gap-1.5 kicker text-ink-faint mb-1.5">
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {label}
              </div>
              <div className="text-body font-medium text-ink">{value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </header>
  )
}
