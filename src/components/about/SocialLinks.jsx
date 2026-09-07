import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Instagram, ArrowUpRight } from 'lucide-react'
import personalData from '../../data/personal.json'

const socialConfig = [
  { key: 'github', Icon: Github, label: 'GitHub', hint: 'Code & open work' },
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn', hint: 'Professional network' },
  { key: 'email', Icon: Mail, label: 'Email', hint: personalData.socialLinks.email },
  { key: 'instagram', Icon: Instagram, label: 'Instagram', hint: 'Behind the scenes' },
]

/* Two surfaces: the light page ground and the deep moss contact banner. */
const themes = {
  light: {
    card: 'bg-canvas border-line hover:shadow-float',
    badge: 'bg-surface-high text-ink group-hover:bg-moss-soft group-hover:text-moss-ink',
    label: 'text-ink',
    hint: 'text-ink-muted',
    glyph: 'text-ink-faint group-hover:text-ink',
  },
  onDark: {
    card: 'bg-on-dark/5 border-on-dark/15 hover:bg-on-dark/10',
    badge: 'bg-on-dark/10 text-on-dark group-hover:bg-moss-soft group-hover:text-moss-ink',
    label: 'text-on-dark',
    hint: 'text-on-dark/60',
    glyph: 'text-on-dark/50 group-hover:text-on-dark',
  },
}

export default function SocialLinks({ variant = 'light' }) {
  const theme = themes[variant] || themes.light

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {socialConfig.map(({ key, Icon, label, hint }, index) => {
        const url = personalData.socialLinks[key]
        if (!url) return null
        const isEmail = key === 'email'

        return (
          <motion.a
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07, duration: 0.45 }}
            href={isEmail ? `mailto:${url}` : url}
            target={isEmail ? undefined : '_blank'}
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${theme.card}`}
          >
            <span
              className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-full transition-colors duration-300 ${theme.badge}`}
            >
              <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
            </span>

            <span className="min-w-0 flex-1">
              <span className={`block text-body font-medium ${theme.label}`}>{label}</span>
              <span className={`block text-note truncate ${theme.hint}`}>{hint}</span>
            </span>

            <ArrowUpRight
              className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.glyph}`}
              strokeWidth={1.75}
            />
          </motion.a>
        )
      })}
    </div>
  )
}
