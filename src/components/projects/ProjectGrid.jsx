import { AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </AnimatePresence>
    </div>
  )
}
