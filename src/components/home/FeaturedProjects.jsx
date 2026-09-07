import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../projects/ProjectCard'
import projects from '../../data/projects.json'

const featured = projects.filter((p) => p.featured)

export default function FeaturedProjects() {
  return (
    <section id="selected-works" className="section-container pb-12 md:pb-18 scroll-mt-24">
      <SectionHeading
        title="Selected Works"
        description="Products built end to end — from business logic and system architecture through AI integration and deployment."
        action={
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-line text-ink kicker hover:bg-surface-high transition-colors duration-300"
          >
            View Full Archive
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Mobile fallback for the header action, which is easy to miss up top */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex md:hidden justify-center mt-8"
      >
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-high text-ink border border-line text-note font-medium"
        >
          View Full Archive
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </Link>
      </motion.div>
    </section>
  )
}
