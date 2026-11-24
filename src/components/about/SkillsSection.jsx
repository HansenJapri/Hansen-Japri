import { Reveal } from '../ui/AnimatedSection'
import skills from '../../data/skills.json'

export default function SkillsSection() {
  return (
    <section className="container-page py-20 md:py-28 border-t border-line mt-20 md:mt-28">
      <Reveal>
        <h2 className="text-h2">Hard skills</h2>
      </Reveal>

      <dl className="mt-10 border-b border-line">
        {skills.hard.map((group) => (
          <Reveal key={group.category} className="grid gap-3 border-t border-line py-6 md:grid-cols-12 md:gap-8">
            <dt className="md:col-span-3 font-medium pt-1">{group.category}</dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-[0.9375rem] text-fg-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>

      <Reveal className="mt-20 md:mt-28">
        <h2 className="text-h2">Soft skills</h2>
      </Reveal>
      <Reveal delay={0.06}>
        <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2 text-2xl md:text-[2rem] font-medium tracking-[-0.03em] leading-snug max-w-5xl">
          {skills.soft.map((s, i) => (
            <li key={s} className={i % 3 === 0 ? 'text-fg' : 'text-fg-faint'}>
              {s}
              {i < skills.soft.length - 1 && <span className="text-raised-3">,</span>}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
