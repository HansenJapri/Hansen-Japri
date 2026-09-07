import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Instagram, ArrowUp, Download } from 'lucide-react'
import personalData from '../../data/personal.json'

const socialLabels = {
  github: { label: 'GitHub', Icon: Github },
  linkedin: { label: 'LinkedIn', Icon: Linkedin },
  email: { label: 'Email', Icon: Mail },
  instagram: { label: 'Instagram', Icon: Instagram },
}

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Selected Works' },
  { to: '/journey', label: 'Journey & Credentials' },
  { to: '/about', label: 'About & Contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialEntries = Object.entries(personalData.socialLinks).filter(
    ([key]) => socialLabels[key]
  )

  return (
    <footer className="w-full bg-surface-low border-t border-line">
      <div className="section-container py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand statement */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <Link
                to="/"
                className="font-display text-title text-ink hover:text-moss transition-colors duration-300"
              >
                {personalData.name}
              </Link>
              <p className="text-body text-ink-muted max-w-sm">
                {personalData.tagline} — {personalData.role}, based in {personalData.location}.
              </p>
            </div>
            <span className="kicker text-moss">{personalData.availability}</span>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="kicker text-ink">Navigation</span>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline text-note text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={personalData.resumeUrl}
                  download="Hansen Japri CV Resume.pdf"
                  className="link-underline inline-flex items-center gap-1.5 text-note text-ink-muted hover:text-ink transition-colors"
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          {/* Inquiries */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="kicker text-ink">Inquiries</span>
              <a
                href={`mailto:${personalData.socialLinks.email}`}
                className="block font-display italic text-lead md:text-quote text-ink hover:text-moss transition-colors break-words"
              >
                {personalData.socialLinks.email}
              </a>
              <p className="text-note text-ink-muted">
                Open for high-impact product collaborations, Agile project management, and
                end-to-end software development engagements.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {socialEntries.map(([key, url]) => {
                const { label, Icon } = socialLabels[key]
                const href = key === 'email' ? `mailto:${url}` : url
                return (
                  <a
                    key={key}
                    href={href}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-high text-ink kicker hover:bg-surface-highest transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                    {label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="kicker text-ink-faint text-center sm:text-left">
            © {new Date().getFullYear()} {personalData.name}
          </p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 kicker text-ink-faint hover:text-ink transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
