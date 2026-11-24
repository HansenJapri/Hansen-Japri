import { lazy, Suspense, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useReducedMotion, useScroll } from 'framer-motion'

const BackgroundScene = lazy(() => import('./BackgroundScene'))

/* Fixed layer behind every page. Fades in once the WebGL chunk is ready. */
export default function Backdrop() {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const reduce = useReducedMotion()
  const [compact] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [webgl] = useState(() => {
    try {
      return Boolean(document.createElement('canvas').getContext('webgl2'))
    } catch {
      return false
    }
  })

  if (!webgl) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.3 }}
    >
      <Suspense fallback={null}>
        <BackgroundScene scroll={scrollYProgress} pathname={pathname} animate={!reduce} compact={compact} />
      </Suspense>
    </motion.div>
  )
}
