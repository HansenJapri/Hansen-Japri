import { motion } from 'framer-motion'

export const EASE_OUT = [0.23, 1, 0.32, 1]

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

/* Headline whose words flip up one after another, each hinged on its
   baseline, when the heading scrolls into view. */
export function SplitHeading({ text, className = '', as = 'h2' }) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: 0.07 }}
      aria-label={text}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block [perspective:800px]">
          <motion.span
            className="inline-block pb-[0.08em]"
            style={{ transformOrigin: '50% 100%' }}
            variants={{
              hidden: { opacity: 0, rotateX: -80, y: '0.3em' },
              shown: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

/* Enters once when scrolled into view: the block tips up from a slight
   backward lean and its blur clears, so it lands in place with depth. */
export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      initial={{ opacity: 0, y: 26, rotateX: 14, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
      style={{ transformPerspective: 1000, transformOrigin: '50% 100%' }}
      className={className}
    >
      {children}
    </Tag>
  )
}
