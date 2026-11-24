import { ArrowUpRight } from 'lucide-react'
import { PageTransition, Reveal } from '../components/ui/AnimatedSection'
import PersonalStory from '../components/about/PersonalStory'
import SkillsSection from '../components/about/SkillsSection'
import ContactForm from '../components/about/ContactForm'
import personalData from '../data/personal.json'

const channels = [
  { key: 'email', label: 'Email' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'github', label: 'GitHub' },
  { key: 'instagram', label: 'Instagram' },
]

export default function AboutPage() {
  const { socialLinks } = personalData

  return (
    <PageTransition>
      <section className="container-page pt-14 md:pt-20">
        <PersonalStory />
      </section>

      <SkillsSection />

      <section id="contact" className="border-t border-line scroll-mt-16">
        <div className="container-page grid gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-h2">Get in touch</h2>
              <p className="mt-4 text-lead text-fg-muted max-w-[40ch]">{personalData.availability}.</p>
            </Reveal>

            <Reveal delay={0.06}>
              <ul className="mt-10 border-b border-line">
                {channels.map(({ key, label }) => {
                  const url = socialLinks[key]
                  const isEmail = key === 'email'
                  return (
                    <li key={key}>
                      <a
                        href={isEmail ? `mailto:${url}` : url}
                        target={isEmail ? undefined : '_blank'}
                        rel={isEmail ? undefined : 'noopener noreferrer'}
                        className="group flex items-center justify-between gap-4 border-t border-line py-4"
                      >
                        <span className="text-fg-muted">{label}</span>
                        <span className="flex min-w-0 items-center gap-2 text-fg">
                          <span className="truncate group-hover:text-accent transition-colors duration-200">
                            {isEmail ? url : url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                          </span>
                          <ArrowUpRight
                            className="size-4 shrink-0 text-fg-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.5}
                          />
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
