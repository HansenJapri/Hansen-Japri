import TimelineItem from './TimelineItem'

export default function Timeline({ items }) {
  if (!items?.length) return null

  return (
    <ol className="border-b border-line">
      {items.map((item) => (
        <TimelineItem key={item.id} item={item} />
      ))}
    </ol>
  )
}
