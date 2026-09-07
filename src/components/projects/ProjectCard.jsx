import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * Case-study card — the single card used by both the home archive strip
 * and the full projects grid.
 *
 * Structure follows the editorial spec: aspect-locked preview inside a
 * hairline frame, category kicker + directional glyph, Playfair title,
 * summary, then a metadata strip anchored to the bottom so cards in a row
 * always align regardless of summary length.
 */
export default function ProjectCard({ project, index = 0 }) {
  const year = new Date(project.date).getFullYear()

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link
        to={`/projects/${project.id}`}
        className="group flex h-full flex-col justify-between rounded-2xl bg-surface-low border border-line p-4 sm:p-6 transition-shadow duration-500 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden bg-surface-highest border border-line">
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <span className="absolute top-3 left-3 px-3 py-1 rounded-full frosted kicker text-ink shadow-float">
              {year} • {project.category}
            </span>
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full frosted kicker text-moss-ink shadow-float">
              {project.status}
            </span>
          </div>

          {/* Title block */}
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-3">
              <span className="kicker text-moss">{project.role}</span>
              <ArrowUpRight
                className="w-4 h-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                strokeWidth={1.75}
              />
            </div>

            <h3 className="font-display text-title text-ink transition-colors duration-300 group-hover:text-moss">
              {project.title}
            </h3>

            <p className="text-body text-ink-muted clamp-3">{project.shortSummary}</p>
          </div>

          {/* Tech chips — full stack lives on the case-study page */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-surface-high text-ink-muted text-note"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2.5 py-1 rounded-full bg-surface-high text-ink-faint text-note">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Metadata strip — anchored to the card floor */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-5 border-t border-line">
          <span className="text-note text-ink-muted">
            {project.context} · {project.collaborationType}
          </span>
          <span className="kicker text-ink group-hover:underline underline-offset-4">
            Read Case Study
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
