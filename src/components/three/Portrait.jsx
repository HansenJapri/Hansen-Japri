import { lazy, Suspense, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const PortraitScene = lazy(() => import('./PortraitScene'))

function hasWebGL() {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'))
  } catch {
    return false
  }
}

/*
 * Hero portrait. With WebGL the photo becomes a 3D point field that
 * assembles on load. Without WebGL, or with reduced motion, a graded and
 * edge-faded still photo is shown instead.
 */
export default function Portrait({ src, alt, scroll, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduce = useReducedMotion()
  const [webgl] = useState(hasWebGL)
  const [compact] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const live = webgl && !reduce

  return (
    <div ref={ref} className={`relative ${className}`}>
      {!live && (
        <img
          src={src}
          alt={alt}
          fetchPriority="high"
          className="portrait-still absolute inset-0 h-full w-full object-cover object-[50%_15%]"
        />
      )}
      {live && (
        <div role="img" aria-label={alt} className="pointer-events-none absolute -inset-[12%]">
          <Suspense fallback={null}>
            <PortraitScene src={src} scroll={scroll} animate={inView} compact={compact} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
