import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageTransition } from '../components/ui/AnimatedSection'
import CaseStudyHeader from '../components/case-study/CaseStudyHeader'
import CaseStudyBody from '../components/case-study/CaseStudyBody'
import MediaGallery from '../components/case-study/MediaGallery'
import projects from '../data/projects.json'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const index = projects.findIndex((p) => p.id === id)

  if (index === -1) {
    return <Navigate to="/projects" replace />
  }

  const project = projects[index]
  const nextProject = projects[(index + 1) % projects.length]

  /* The hero plate already shows the thumbnail, so the gallery only carries
     the additional media for this project. */
  const galleryImages = (project.media.images || []).filter((img) => img !== project.thumbnail)

  return (
    <PageTransition>
      <CaseStudyHeader project={project} />
      <MediaGallery images={galleryImages} />
      <CaseStudyBody project={project} />

      {/* Archive pager */}
      <nav className="section-container pb-18 md:pb-26">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-line">
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

          {nextProject.id !== project.id && (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex items-center gap-3 text-right"
            >
              <span className="flex flex-col">
                <span className="kicker text-ink-faint">Next Case Study</span>
                <span className="font-display text-title text-ink group-hover:text-moss transition-colors">
                  {nextProject.title}
                </span>
              </span>
              <ArrowRight
                className="w-4 h-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-ink"
                strokeWidth={1.75}
              />
            </Link>
          )}
        </div>
      </nav>
    </PageTransition>
  )
}
