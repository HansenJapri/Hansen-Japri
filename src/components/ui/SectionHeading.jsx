import { Reveal } from './AnimatedSection'

/* Headline on top, optional standfirst stacked under it. */
export default function SectionHeading({ title, description, as: Tag = 'h2', className = '' }) {
  return (
    <Reveal className={`mb-10 md:mb-14 max-w-3xl ${className}`}>
      <Tag className={Tag === 'h1' ? 'text-h1' : 'text-h2'}>{title}</Tag>
      {description && <p className="mt-4 text-lead text-fg-muted max-w-[60ch]">{description}</p>}
    </Reveal>
  )
}
