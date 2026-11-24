import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageTransition } from '../components/ui/AnimatedSection'
import CaseStudyHeader from '../components/case-study/CaseStudyHeader'
import CaseStudyBody from '../components/case-study/CaseStudyBody'
import MediaGallery from '../components/case-study/MediaGallery'
import projects from '../data/projects.json'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const index = projects.findIndex((p) => p.id === id)

  if (index === -1) return <Navigate to="/projects" replace />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  const gallery = (project.media.images || []).filter((img) => img !== project.thumbnail)

  return (
    <PageTransition>
      <CaseStudyHeader project={project} />
      <MediaGallery images={gallery} />
      <CaseStudyBody project={project} />

      {next.id !== project.id && (
        <nav className="border-t border-line" aria-label="Next project">
          <Link to={`/projects/${next.id}`} className="group container-page flex items-end justify-between gap-6 py-16 md:py-24">
            <span>
              <span className="block text-fg-faint">Next project</span>
              <span className="mt-2 block text-h1 font-semibold transition-colors duration-200 group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <ArrowRight
              className="mb-2 size-8 shrink-0 text-fg-muted transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </nav>
      )}
    </PageTransition>
  )
}
