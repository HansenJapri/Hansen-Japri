import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, Users, Wrench } from 'lucide-react'

const narrativeSections = [
  { key: 'impact', index: '01', label: 'Outcome', title: 'Impact & Results', Icon: TrendingUp },
  { key: 'learning', index: '02', label: 'Reflection', title: 'Key Learnings', Icon: Lightbulb },
]

function Panel({ children, delay = 0, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl bg-surface-low border border-line p-5 sm:p-8 md:p-10 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function PanelHeading({ Icon, index, label, title }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-moss-soft">
        <Icon className="w-4.5 h-4.5 text-moss-ink" strokeWidth={1.75} />
      </span>
      <div>
        {(index || label) && (
          <span className="block kicker text-moss">
            {index ? `${index} • ` : ''}
            {label}
          </span>
        )}
        <h2 className="font-display text-title text-ink">{title}</h2>
      </div>
    </div>
  )
}

export default function CaseStudyBody({ project }) {
  const hasTeam = project.team?.length > 0

  return (
    <div className="section-container pb-18 md:pb-26 space-y-4">
      {/* Stack + team — the full tech list lives here, not truncated */}
      <div className={`grid grid-cols-1 gap-4 ${hasTeam ? 'lg:grid-cols-2' : ''}`}>
        <Panel>
          <PanelHeading Icon={Wrench} label="Toolkit" title="Tech Stack" />
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full bg-surface-high text-ink text-note border border-line"
              >
                {tech}
              </span>
            ))}
          </div>
        </Panel>

        {hasTeam && (
          <Panel delay={0.08}>
            <PanelHeading Icon={Users} label="Collaborators" title="Team" />
            <div className="flex flex-wrap gap-2">
              {project.team.map((member) => (
                <span
                  key={member}
                  className="inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full bg-surface-high border border-line"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-moss text-on-dark text-note font-semibold">
                    {member.charAt(0)}
                  </span>
                  <span className="text-note text-ink">{member}</span>
                </span>
              ))}
            </div>
          </Panel>
        )}
      </div>

      {/* Long-form narrative */}
      {narrativeSections.map((section, idx) => (
        <Panel key={section.key} delay={0.08 * (idx + 1)}>
          <PanelHeading
            Icon={section.Icon}
            index={section.index}
            label={section.label}
            title={section.title}
          />
          <p className="text-body md:text-lead text-ink-muted max-w-3xl">{project[section.key]}</p>
        </Panel>
      ))}
    </div>
  )
}
