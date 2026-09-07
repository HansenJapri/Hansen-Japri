import { PageTransition } from '../components/ui/AnimatedSection'
import SectionHeading from '../components/ui/SectionHeading'
import Timeline from '../components/journey/Timeline'
import CertCard from '../components/journey/CertCard'
import Button from '../components/ui/Button'
import { Download } from 'lucide-react'
import timelineData from '../data/timeline.json'
import certifications from '../data/certifications.json'
import personalData from '../data/personal.json'

/* Newest first. "Present" only ever appears as an end date, so sorting
   on startDate alone keeps ongoing entries at the top of their stream. */
const byRecency = (a, b) => new Date(b.startDate) - new Date(a.startDate)

const byType = (type) => timelineData.filter((item) => item.type === type).sort(byRecency)

const work = byType('work')
const achievements = byType('achievement')
const education = byType('education')

export default function JourneyPage() {
  return (
    <PageTransition>
      {/* ── 02 • Work history ─────────────────────────────────── */}
      <section className="section-container py-12 md:py-18">
        <SectionHeading
          title="Work History & Leadership"
          description="Founding and leading ventures across software, retail, and fashion, alongside simulated Wall Street engineering and banking experience."
          action={
            <Button
              variant="secondary"
              size="sm"
              icon={Download}
              href={personalData.resumeUrl}
              download="Hansen Japri CV Resume.pdf"
            >
              Curriculum Vitae
            </Button>
          }
        />
        <Timeline items={work} />
      </section>

      {/* ── 03 • Achievements ─────────────────────────────────── */}
      <section className="section-container pb-12 md:pb-18">
        <SectionHeading
          title="Achievements & Recognition"
          description="Competitive results from national hackathons and university–industry collaborations."
        />
        <Timeline items={achievements} />
      </section>

      {/* ── 04 • Education ────────────────────────────────────── */}
      <section className="section-container pb-12 md:pb-18">
        <SectionHeading
          title="Education & Training"
          description="Formal informatics study alongside professional training in software architecture, full-stack development, applied AI, and offensive security."
        />
        <Timeline items={education} />
      </section>

      {/* ── 05 • Credentials ──────────────────────────────────── */}
      <section className="section-container pb-18 md:pb-26">
        <div className="rounded-2xl bg-surface-high border border-line p-5 sm:p-8 md:p-12">
          <SectionHeading
            title="Certifications & Honors"
            description="Every credential below links to its original certificate document."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <CertCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
