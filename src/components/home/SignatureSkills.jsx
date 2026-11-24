import { motion } from 'framer-motion'
import { Reveal, EASE_OUT } from '../ui/AnimatedSection'
import TiltCard from '../ui/TiltCard'
import personalData from '../../data/personal.json'

/*
 * Bento of the ten skills shown on the home page. Cell sizes are fixed by
 * skill name so the grid always fills exactly (4 columns x 4 rows on
 * desktop: one 2x2 tile, three 2x1 tiles, six singles). Every tile tilts toward the
 * pointer and its text floats a little above the tile surface.
 */
const span = {
  'Software Architecture': 'md:col-span-2 md:row-span-2',
  'App & Security Testing': 'md:col-span-2',
  'Agentic Workflow': 'md:col-span-2',
  'HSK 6 Mandarin': 'md:col-span-2',
}

function Cell({ skill, index }) {
  const isArch = skill.name === 'Software Architecture'
  const isAgentic = skill.name === 'Agentic Workflow'
  const isHsk = skill.name === 'HSK 6 Mandarin'

  return (
    <motion.li
      initial={{ opacity: 0, y: 30, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.07, ease: EASE_OUT }}
      style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
      className={span[skill.name] ?? ''}
    >
      <TiltCard max={isArch ? 5 : 9} className="h-full rounded-[var(--radius-panel)]">
        <div
          className={`relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 [transform-style:preserve-3d] ${
            isArch ? 'min-h-[22rem]' : 'min-h-[9.5rem] md:min-h-[11rem]'
          } ${isAgentic ? 'bg-accent text-on-accent' : 'border border-line bg-raised/85 backdrop-blur-sm'}`}
        >
          {isArch && (
            <div aria-hidden="true" className="grid-floor pointer-events-none absolute inset-0">
              <div className="grid-floor__plane" />
            </div>
          )}
          {isHsk && (
            <span
              lang="zh"
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-6 select-none text-[7.5rem] font-semibold leading-none text-raised-3"
            >
              汉语
            </span>
          )}
          <div style={{ transform: 'translateZ(28px)' }} className="relative">
            <h3 className={`font-semibold tracking-tight ${isArch ? 'text-3xl' : 'text-xl'}`}>{skill.name}</h3>
            <p className={`mt-1.5 text-[0.9375rem] ${isAgentic ? 'text-on-accent/75' : 'text-fg-muted'}`}>
              {skill.note}
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.li>
  )
}

export default function SignatureSkills() {
  return (
    <section className="container-page pb-20 md:pb-28">
      <Reveal>
        <h2 className="text-h2 mb-10 max-w-[20ch] md:mb-14">What I bring to the table</h2>
      </Reveal>
      <ul className="grid gap-3 md:auto-rows-[minmax(11rem,auto)] md:grid-cols-4 md:[grid-auto-flow:dense]">
        {personalData.featuredSkills.map((skill, i) => (
          <Cell key={skill.name} skill={skill} index={i} />
        ))}
      </ul>
    </section>
  )
}
