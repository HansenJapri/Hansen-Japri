import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import { Reveal } from '../ui/AnimatedSection'

function Thumb({ project, className = '' }) {
  return (
    <TiltCard className={className}>
      <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-raised">
        <img
          src={project.thumbnail}
          alt={`${project.title} interface`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
    </TiltCard>
  )
}

function Meta({ project }) {
  return (
    <p className="font-mono text-[0.8125rem] text-fg-faint">
      {new Date(project.date).getFullYear()} / {project.context} / {project.role}
    </p>
  )
}

/* Wide row: large preview with the story beside it. */
export function ProjectRow({ project }) {
  return (
    <Reveal as="article">
      <Link
        to={`/projects/${project.id}`}
        className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
      >
        <Thumb project={project} className="lg:col-span-7" />
        <div className="lg:col-span-5">
          <Meta project={project} />
          <h3 className="mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.04em] inline-flex items-start gap-2">
            {project.title}
            <ArrowUpRight
              className="mt-1 size-6 text-fg-faint transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              strokeWidth={1.5}
            />
          </h3>
          <p className="mt-4 text-lead text-fg-muted clamp-3">{project.shortSummary}</p>
          <p className="mt-5 text-sm text-fg-faint">{project.techStack.join(', ')}</p>
        </div>
      </Link>
    </Reveal>
  )
}

/* Compact card: preview on top, title and summary under it. */
export default function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay}>
      <Link to={`/projects/${project.id}`} className="group block">
        <Thumb project={project} />
        <div className="mt-5">
          <Meta project={project} />
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em] group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-2 text-fg-muted clamp-3 max-w-[56ch]">{project.shortSummary}</p>
        </div>
      </Link>
    </Reveal>
  )
}
