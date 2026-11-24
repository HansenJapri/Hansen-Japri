import { Reveal } from '../ui/AnimatedSection'

/* Label column on the left, readable measure on the right. */
function Row({ label, children }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <h2 className="md:col-span-4 text-xl font-semibold tracking-tight">{label}</h2>
      <div className="md:col-span-8">{children}</div>
    </Reveal>
  )
}

export default function CaseStudyBody({ project }) {
  return (
    <div className="container-page py-16 md:py-24">
      <Row label="Stack">
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li key={tech} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg">
              {tech}
            </li>
          ))}
        </ul>
      </Row>

      {project.team?.length > 0 && (
        <Row label="Team">
          <p className="text-lead text-fg-muted">{project.team.join(', ')}</p>
        </Row>
      )}

      <Row label="Impact">
        <p className="text-lead text-fg-muted max-w-[68ch]">{project.impact}</p>
      </Row>

      <Row label="What I learned">
        <p className="text-lead text-fg-muted max-w-[68ch]">{project.learning}</p>
      </Row>
    </div>
  )
}
