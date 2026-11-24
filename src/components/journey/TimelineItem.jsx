import { Reveal } from '../ui/AnimatedSection'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/* Dates arrive as "2024", "2024-01", "2026-07-24" or the literal "Present". */
export function formatDate(value) {
  if (!value) return ''
  if (!/^\d{4}-\d{2}/.test(value)) return value
  const [year, month] = value.split('-')
  return `${MONTHS[Number(month) - 1]} ${year}`
}

function formatRange(start, end) {
  const a = formatDate(start)
  const b = formatDate(end)
  return a === b ? a : `${a} - ${b}`
}

export default function TimelineItem({ item }) {
  const ongoing = item.endDate === 'Present'

  return (
    <Reveal as="li" className="grid gap-3 border-t border-line py-9 md:grid-cols-12 md:gap-8">
      <p className="md:col-span-3 font-mono text-[0.8125rem] text-fg-faint pt-1.5">
        {formatRange(item.startDate, item.endDate)}
        {ongoing && <span className="ml-2 text-accent">Now</span>}
      </p>

      <div className="md:col-span-9">
        <h3 className="text-2xl md:text-[1.75rem] font-semibold tracking-[-0.025em] leading-tight">{item.title}</h3>
        <p className="mt-1 text-fg-muted">{item.organization}</p>
        <p className="mt-4 text-fg-muted whitespace-pre-line max-w-[68ch]">{item.description}</p>

        {item.highlights?.length > 0 && (
          <ul className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 max-w-[76ch]">
            {item.highlights.map((h) => (
              <li key={h} className="relative pl-4 text-[0.9375rem] text-fg-muted before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-fg-faint">
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  )
}
