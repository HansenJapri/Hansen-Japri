import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const SPRING = { stiffness: 180, damping: 18, mass: 0.6 }

/*
 * Perspective tilt that follows the pointer, with a soft light highlight.
 * Only on devices with a fine pointer and hover; elsewhere it is a plain
 * container.
 */
export default function TiltCard({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING)
  const lightX = useTransform(px, (v) => `${v * 100}%`)
  const lightY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(420px circle at ${lightX} ${lightY}, rgb(255 255 255 / 0.09), transparent 60%)`
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 26 })

  if (!enabled || reduce) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={() => glareOpacity.set(1)}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.div>
    </div>
  )
}
