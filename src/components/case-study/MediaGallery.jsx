import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '../ui/AnimatedSection'

export default function MediaGallery({ images = [] }) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(0)

  const close = useCallback(() => setOpen(false), [])
  const step = useCallback((dir) => setCurrent((i) => (i + dir + images.length) % images.length), [images.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  if (images.length === 0) return null

  const navButton = 'press absolute z-10 flex size-11 items-center justify-center rounded-full bg-raised-2 text-fg hover:bg-raised-3'

  return (
    <>
      <section className="container-page pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {images.map((img, index) => (
            <Reveal key={img} delay={index * 0.06}>
              <button
                type="button"
                onClick={() => {
                  setCurrent(index)
                  setOpen(true)
                }}
                className="group block w-full overflow-hidden rounded-[var(--radius-panel)] border border-line bg-raised cursor-zoom-in"
                aria-label={`Open image ${index + 1} of ${images.length}`}
              >
                <img
                  src={img}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ground/95 p-4"
            onClick={close}
          >
            <button type="button" onClick={close} className={`${navButton} top-4 right-4`} aria-label="Close viewer">
              <X className="size-5" strokeWidth={1.5} />
            </button>
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  className={`${navButton} left-4`}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  className={`${navButton} right-4`}
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5" strokeWidth={1.5} />
                </button>
              </>
            )}
            <motion.img
              key={current}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              src={images[current]}
              alt={`Image ${current + 1} of ${images.length}`}
              className="max-h-[85vh] max-w-full rounded-[var(--radius-panel)] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
