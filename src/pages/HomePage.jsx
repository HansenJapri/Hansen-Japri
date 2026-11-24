import { PageTransition } from '../components/ui/AnimatedSection'
import HeroSection from '../components/home/HeroSection'
import FocusSection from '../components/home/FocusSection'
import SignatureSkills from '../components/home/SignatureSkills'
import FeaturedProjects from '../components/home/FeaturedProjects'
import Principles from '../components/home/Principles'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <FocusSection />
      <SignatureSkills />
      <FeaturedProjects />
      <Principles />
      <CTASection />
    </PageTransition>
  )
}
