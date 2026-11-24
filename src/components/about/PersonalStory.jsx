import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Button from '../ui/Button'
import TiltCard from '../ui/TiltCard'
import { EASE_OUT } from '../ui/AnimatedSection'
import personalData from '../../data/personal.json'

export default function PersonalStory() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="lg:col-span-5"
      >
        <TiltCard max={5} className="lg:sticky lg:top-28 max-w-md">
          <img
            src={personalData.avatar}
            alt={`Portrait of ${personalData.name}`}
            className="aspect-[4/5] w-full rounded-[var(--radius-panel)] border border-line object-cover object-top"
          />
        </TiltCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
        className="lg:col-span-7"
      >
        <h1 className="text-h1">About me</h1>
        <p className="mt-3 text-lg text-fg-muted">
          {personalData.role}, {personalData.location}
        </p>

        <p className="mt-10 text-xl md:text-[1.375rem] leading-[1.6] text-fg max-w-[62ch]">{personalData.about}</p>

        <div className="mt-10">
          <Button href={personalData.resumeUrl} download="Hansen Japri CV Resume.pdf" icon={Download}>
            Download CV
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
