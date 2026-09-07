import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function MediaGallery({ images = [] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])
  const step = useCallback(
    (dir) => setCurrentIndex((prev) => (prev + dir + images.length) % images.length),
    [images.length]
  )

  /* Keyboard control + scroll lock live together so the body class can never
     be left behind if the component unmounts while the lightbox is open. */
  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxOpen, closeLightbox, step])

  if (images.length === 0) return null

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <section className="section-container pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-surface-low border border-line p-5 sm:p-8 md:p-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="kicker text-moss">Gallery</span>
            <span className="h-px w-8 bg-moss/35" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <button
                key={img}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative aspect-16/10 rounded-xl overflow-hidden bg-surface-highest border border-line cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30"
              >
                <img
                  src={img}
                  alt={`Project view ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 group-hover:bg-ink/25 transition-colors duration-300">
                  <span className="kicker text-canvas opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Full
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Project image viewer"
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-moss-deep/95"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-on-dark/10 text-on-dark flex items-center justify-center hover:bg-on-dark/20 transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-on-dark/10 text-on-dark flex items-center justify-center hover:bg-on-dark/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-on-dark/10 text-on-dark flex items-center justify-center hover:bg-on-dark/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </>
            )}

            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              src={images[currentIndex]}
              alt={`Project view ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <span className="absolute bottom-5 kicker text-on-dark/70">
                {currentIndex + 1} / {images.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
