import { Reveal } from '../ui/AnimatedSection'
import personalData from '../../data/personal.json'

export default function FocusSection() {
  return (
    <section className="container-page py-20 md:py-28 border-t border-line">
      <Reveal>
        <h2 className="text-h2 max-w-[18ch]">Two disciplines. One standard for shipping.</h2>
      </Reveal>

      <div className="mt-12 md:mt-16 grid md:grid-cols-2 border-t border-line">
        {personalData.focus.map((area, i) => (
          <Reveal
            key={area.title}
            delay={i * 0.08}
            className={`pt-8 pb-2 md:pb-0 ${i === 0 ? 'md:pr-12' : 'md:pl-12 md:border-l border-line max-md:mt-6'}`}
          >
            <h3 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em]">{area.title}</h3>
            <p className="mt-4 text-lead text-fg-muted max-w-[46ch]">{area.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
