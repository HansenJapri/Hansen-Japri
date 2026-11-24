import { Reveal } from '../ui/AnimatedSection'
import personalData from '../../data/personal.json'

/* Sticky heading on the left; the three working principles scroll past
   on the right. */
export default function Principles() {
  return (
    <section className="container-page py-20 md:py-28 border-t border-line">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 className="text-h2">How I work</h2>
              <p className="mt-4 text-lead text-fg-muted max-w-[34ch]">
                From business problem to shipped system, with decisions backed by evidence.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {personalData.principles.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.05}
              className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:first:pt-2"
            >
              <span className="font-mono text-sm text-fg-faint">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-3xl md:text-[2.5rem] font-semibold tracking-[-0.035em] leading-[1.1]">{item.title}</h3>
              <p className="mt-4 text-lead text-fg-muted max-w-[52ch]">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
