import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { Reveal, SplitHeading } from '../ui/AnimatedSection'
import personalData from '../../data/personal.json'

export default function CTASection() {
  const { email } = personalData.socialLinks

  return (
    <section className="relative overflow-hidden border-t border-line">
      <div className="container-page relative py-24 md:py-36">
        <SplitHeading text="Got an idea that needs to ship?" className="text-display font-semibold max-w-[13ch]" />
        <Reveal delay={0.1} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Button to="/about#contact" size="lg" iconRight={ArrowRight}>
            Get in touch
          </Button>
          <a href={`mailto:${email}`} className="link-draw text-lg text-fg-muted hover:text-fg">
            {email}
          </a>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 text-fg-faint">{personalData.availability}.</p>
        </Reveal>
      </div>
    </section>
  )
}
