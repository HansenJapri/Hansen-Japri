import TimelineItem from './TimelineItem'

export default function Timeline({ items }) {
  if (!items?.length) return null

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </div>
  )
}
