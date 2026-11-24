import { PageTransition } from '../components/ui/AnimatedSection'
import SectionHeading from '../components/ui/SectionHeading'
import { ProjectRow } from '../components/projects/ProjectCard'
import projects from '../data/projects.json'

const ordered = [...projects].sort((a, b) => new Date(b.date) - new Date(a.date))

export default function ProjectsPage() {
  return (
    <PageTransition>
      <section className="container-page pt-14 pb-24 md:pt-20 md:pb-32">
        <SectionHeading
          as="h1"
          title="Work"
          description="Products built end to end, from business logic and system design through AI integration and deployment."
        />

        {ordered.length === 0 ? (
          <p className="text-fg-muted">New projects are on the way.</p>
        ) : (
          <div className="space-y-20 md:space-y-28">
            {ordered.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </PageTransition>
  )
}
