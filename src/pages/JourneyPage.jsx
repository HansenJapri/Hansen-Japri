import { Download } from 'lucide-react'
import { PageTransition, Reveal } from '../components/ui/AnimatedSection'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Timeline from '../components/journey/Timeline'
import Certificates from '../components/journey/Certificates'
import timelineData from '../data/timeline.json'
import personalData from '../data/personal.json'

/* Newest first. "Present" only appears as an end date, so sorting on the
   start date keeps ongoing entries at the top of their group. */
const byRecency = (a, b) => new Date(b.startDate) - new Date(a.startDate)
const byType = (type) => timelineData.filter((i) => i.type === type).sort(byRecency)

const groups = [
  { id: 'experience', title: 'Experience', items: byType('work') },
  { id: 'achievements', title: 'Achievements', items: byType('achievement') },
  { id: 'education', title: 'Education & training', items: byType('education') },
]

export default function JourneyPage() {
  return (
    <PageTransition>
      <section className="container-page pt-14 md:pt-20">
        <SectionHeading
          as="h1"
          title="Journey"
          description="Building ventures since junior high, now focused on AI product engineering and software engineering."
        />
        <Reveal>
          <Button
            href={personalData.resumeUrl}
            download="Hansen Japri CV Resume.pdf"
            variant="secondary"
            icon={Download}
          >
            Download CV
          </Button>
        </Reveal>
      </section>

      {groups.map((group) => (
        <section key={group.id} id={group.id} className="container-page pt-20 md:pt-28 scroll-mt-20">
          <Reveal>
            <h2 className="text-h2 mb-8">{group.title}</h2>
          </Reveal>
          <Timeline items={group.items} />
        </section>
      ))}

      <section id="certificates" className="container-page py-20 md:py-28 scroll-mt-20">
        <Reveal>
          <h2 className="text-h2 mb-8">Certificates & honors</h2>
        </Reveal>
        <Certificates />
      </section>
    </PageTransition>
  )
}
