import { useState, useMemo } from 'react'
import { PageTransition } from '../components/ui/AnimatedSection'
import SectionHeading from '../components/ui/SectionHeading'
import FilterBar from '../components/projects/FilterBar'
import ProjectGrid from '../components/projects/ProjectGrid'
import projects from '../data/projects.json'

/* Chips come from the data, so no filter can resolve to an empty grid. */
const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <PageTransition>
      <section className="section-container py-12 md:py-18">
        <SectionHeading
          title="Selected Works"
          description="The complete collection — every project built end to end, from business logic and system architecture through AI integration and deployment."
          action={
            <FilterBar
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          }
        />

        <ProjectGrid projects={filteredProjects} />

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 rounded-2xl bg-surface-low border border-line">
            <p className="text-body text-ink-muted">No projects found in this category.</p>
          </div>
        )}
      </section>
    </PageTransition>
  )
}
