import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import Button from '../ui/Button'
import { EASE_OUT } from '../ui/AnimatedSection'
import Portrait from '../three/Portrait'
import personalData from '../../data/personal.json'

const rise = (delay) => ({
  initial: { opacity: 0, y: 28, rotateX: 18, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' },
  transition: { duration: 1, delay, ease: EASE_OUT },
  style: { transformPerspective: 900, transformOrigin: '50% 100%' },
})

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textFade = useTransform(scrollYProgress, [0.3, 0.8], [1, 0])
  const [first, ...rest] = personalData.name.split(' ')

  return (
    <section ref={ref} className="relative">
      <div className="container-page grid min-h-[calc(100dvh-4rem)] items-center gap-4 pt-4 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-0">
        <div className="order-1 -mb-10 lg:order-2 lg:col-span-6 lg:mb-0">
          <Portrait
            src={personalData.avatar}
            alt={`Portrait of ${personalData.name}`}
            scroll={scrollYProgress}
            className="mx-auto aspect-[4/5] w-[82%] max-w-[22rem] sm:max-w-[26rem] lg:w-full lg:max-w-[33rem] lg:mr-0"
          />
        </div>

        <motion.div style={{ y: textY, opacity: textFade }} className="relative z-10 order-2 lg:order-1 lg:col-span-6">
          <motion.h1 {...rise(0.15)} className="text-display font-semibold">
            {first}
            <br />
            <span className="text-fg-muted">{rest.join(' ')}</span>
          </motion.h1>

          <motion.p {...rise(0.25)} className="mt-7 text-lead text-fg-muted max-w-[36ch] md:text-xl">
            <span className="text-fg">{personalData.role}.</span> {personalData.headline}
          </motion.p>

          <motion.div {...rise(0.35)} className="mt-9 flex flex-wrap gap-3">
            <Button to="/projects" size="lg" iconRight={ArrowRight}>
              View work
            </Button>
            <Button
              href={personalData.resumeUrl}
              download="Hansen Japri CV Resume.pdf"
              variant="secondary"
              size="lg"
              icon={Download}
            >
              Download CV
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
