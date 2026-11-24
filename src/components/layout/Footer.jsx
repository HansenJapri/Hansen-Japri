import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import personalData from '../../data/personal.json'

const pages = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/journey', label: 'Journey' },
  { to: '/about', label: 'About' },
]

const socials = [
  { key: 'github', label: 'GitHub' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
]

export default function Footer() {
  const { socialLinks } = personalData

  return (
    <footer className="border-t border-line">
      <div className="container-page py-14 md:py-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-lg font-semibold tracking-tight">{personalData.name}</p>
          <p className="mt-2 text-fg-muted max-w-sm">{personalData.role}, based in {personalData.location}.</p>
          <a
            href={`mailto:${socialLinks.email}`}
            className="link-draw mt-6 inline-block text-fg hover:text-accent"
          >
            {socialLinks.email}
          </a>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <ul className="space-y-2.5">
            {pages.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="link-draw text-fg-muted hover:text-fg">
                  {p.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={personalData.resumeUrl}
                download="Hansen Japri CV Resume.pdf"
                className="link-draw text-fg-muted hover:text-fg"
              >
                Download CV
              </a>
            </li>
          </ul>
        </nav>

        <ul className="md:col-span-4 space-y-2.5">
          {socials.map(({ key, label }) => (
            <li key={key}>
              <a
                href={socialLinks[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-fg-muted hover:text-fg transition-colors"
              >
                {label}
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container-page pb-8 text-sm text-fg-faint">
        &copy; {new Date().getFullYear()} {personalData.name}
      </div>
    </footer>
  )
}
