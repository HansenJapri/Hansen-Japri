import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover shadow-[0_10px_24px_-14px_rgb(0_0_0/0.9)]',
  secondary: 'border border-line-strong bg-ground/40 backdrop-blur-sm text-fg hover:bg-raised-2 hover:border-fg-faint',
  ghost: 'text-fg-muted hover:text-fg',
}

const sizes = {
  md: 'h-11 px-5 text-[0.9375rem]',
  lg: 'h-12 px-6 text-base',
}

const MotionLink = motion.create(Link)
const SPRING = { stiffness: 220, damping: 16, mass: 0.5 }
const PULL = 0.22

/*
 * One button for links, downloads, external URLs and form submits.
 * On fine pointers it leans toward the cursor (magnetic) and tilts a few
 * degrees, then springs back on leave.
 */
export default function Button({
  children,
  to,
  href,
  download,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)
  const rotateX = useSpring(useMotionValue(0), SPRING)
  const rotateY = useSpring(useMotionValue(0), SPRING)
  const magnetic = fine && !reduce

  const onMove = (e) => {
    if (!magnetic) return
    const r = ref.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2)
    const dy = e.clientY - (r.top + r.height / 2)
    x.set(dx * PULL)
    y.set(dy * PULL)
    rotateY.set((dx / r.width) * 14)
    rotateX.set((-dy / r.height) * 14)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  const motionProps = {
    ref,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    whileTap: { scale: 0.97 },
    style: magnetic ? { x, y, rotateX, rotateY, transformPerspective: 500 } : undefined,
    className: `group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,color,border-color] duration-200 ${variants[variant]} ${sizes[size]} ${className}`,
  }

  const content = (
    <>
      {Icon && <Icon className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />}
      <span>{children}</span>
      {IconRight && (
        <IconRight
          className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      )}
    </>
  )

  if (to) {
    return (
      <MotionLink to={to} {...motionProps} {...props}>
        {content}
      </MotionLink>
    )
  }

  if (href) {
    const external = !download && /^https?:/.test(href)
    return (
      <motion.a
        href={href}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button {...motionProps} {...props}>
      {content}
    </motion.button>
  )
}
