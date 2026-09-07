import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import personalData from '../../data/personal.json'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/journey', label: 'Journey' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 frosted transition-shadow duration-500 ${
        scrolled ? 'shadow-float border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="section-container">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="group flex items-center gap-3 shrink-0">
            <img
              src={personalData.avatar}
              alt=""
              className="w-9 h-9 rounded-full object-cover object-top ring-1 ring-line"
            />
            <span className="font-display text-lg md:text-title text-ink leading-none group-hover:text-moss transition-colors duration-300">
              {personalData.name}
            </span>
          </Link>

          {/* Desktop nav — segmented pill group */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-surface-low border border-line">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 rounded-full text-note transition-colors duration-300 ${
                    isActive ? 'text-ink font-semibold' : 'text-ink-muted hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="navActivePill"
                        className="absolute inset-0 rounded-full bg-surface-highest"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/about"
              className="hidden sm:inline-flex group items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-canvas text-note font-medium hover:bg-ink-muted transition-colors duration-300"
            >
              Get in Touch
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full text-ink-muted hover:text-ink hover:bg-surface-high transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" strokeWidth={1.75} /> : <Menu className="w-5 h-5" strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden frosted border-t border-line"
          >
            <div className="section-container py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-body transition-colors ${
                        isActive
                          ? 'bg-surface-high text-ink font-semibold'
                          : 'text-ink-muted hover:text-ink hover:bg-surface-low'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="mt-3 pt-4 border-t border-line">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-canvas text-note font-medium w-full"
                >
                  Get in Touch
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
