import { ArrowRight } from 'lucide-react'
import ProjectCard, { ProjectRow } from '../projects/ProjectCard'
import Button from '../ui/Button'
import { Reveal } from '../ui/AnimatedSection'
import projects from '../../data/projects.json'

const [lead, ...others] = projects.filter((p) => p.featured)

export default function FeaturedProjects() {
  return (
    <section id="work" className="container-page py-20 md:py-28 border-t border-line">
      <Reveal>
        <h2 className="text-h2 mb-12 md:mb-16">Selected work</h2>
      </Reveal>

      {lead && <ProjectRow project={lead} />}

      {others.length > 0 && (
        <div className="mt-16 md:mt-24 grid gap-14 md:grid-cols-2 md:gap-8">
          {others.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 0.08} />
          ))}
        </div>
      )}

      <div className="mt-14 md:mt-20">
        <Button to="/projects" variant="secondary" iconRight={ArrowRight}>
          View work
        </Button>
      </div>
    </section>
  )
}
