import { motion } from 'framer-motion'
import {
  Monitor,
  Server,
  Wrench,
  Shield,
  Briefcase,
  Globe,
  Sparkles,
  Database,
  Layers,
  Target,
  MessageCircle,
  Brain,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import skillsData from '../../data/skills.json'

const iconMap = {
  monitor: Monitor,
  server: Server,
  wrench: Wrench,
  shield: Shield,
  briefcase: Briefcase,
  globe: Globe,
  database: Database,
  layers: Layers,
  target: Target,
  messageCircle: MessageCircle,
  brain: Brain,
  sparkles: Sparkles,
}

/* Two skill families, each with its own quiet accent — hard skills in
   moss, soft skills in umber — so the split reads at a glance without
   another label doing the work. */
const tones = {
  hard: { chip: 'bg-moss-soft', icon: 'text-moss-ink' },
  soft: { chip: 'bg-umber/12', icon: 'text-umber' },
}

function SkillGroup({ group, delay }) {
  const Icon = iconMap[group.icon] || Wrench
  const tone = tones[group.type]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col gap-4 p-6 rounded-xl bg-canvas border border-line transition-shadow duration-500 hover:shadow-float"
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex items-center justify-center w-9 h-9 shrink-0 rounded-full ${tone.chip}`}
        >
          <Icon className={`w-4.5 h-4.5 ${tone.icon}`} strokeWidth={1.75} />
        </span>
        <h3 className="text-body font-semibold text-ink">{group.category}</h3>
      </div>

      <div className="hairline" />

      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span key={skill} className="px-3 py-1 rounded-full bg-surface-high text-ink-muted text-note">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function SkillFamily({ title, groups }) {
  return (
    <div className="space-y-4">
      <h3 className="kicker text-ink-muted">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {groups.map((group, index) => (
          <SkillGroup key={group.category} group={group} delay={Math.min(index, 5) * 0.06} />
        ))}
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const hardSkills = skillsData.filter((g) => g.type === 'hard')
  const softSkills = skillsData.filter((g) => g.type === 'soft')

  return (
    <section className="section-container pb-12 md:pb-18">
      <div className="rounded-2xl bg-surface-low border border-line p-5 sm:p-8 md:p-12">
        <SectionHeading
          title="Capabilities & Tech Stack"
          description="Bridging the gap between strategic business thinking and production-ready implementation."
        />

        <div className="space-y-10">
          <SkillFamily title="Hard Skills" groups={hardSkills} />
          <SkillFamily title="Soft Skills" groups={softSkills} />
        </div>

        {/* Generative AI note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-start gap-4 p-6 rounded-xl bg-moss-soft/40 border border-line"
        >
          <span className="flex items-center justify-center w-9 h-9 shrink-0 rounded-full bg-moss-soft">
            <Sparkles className="w-4.5 h-4.5 text-moss-ink" strokeWidth={1.75} />
          </span>
          <div className="space-y-1">
            <p className="text-body font-semibold text-ink">Generative AI Practitioner</p>
            <p className="text-note text-ink-muted">
              Proficient in prompt engineering techniques and experienced with AI image/video
              generation tools. Capable of leveraging AI to accelerate complex workflows and solve
              multi-step problems efficiently.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
