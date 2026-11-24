import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import { EASE_OUT } from '../ui/AnimatedSection'
import personalData from '../../data/personal.json'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/journey', label: 'Journey' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? 'bg-ground/80 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page h-16 flex items-center justify-between gap-6">
        <Link to="/" className="text-[0.9375rem] font-semibold tracking-tight text-fg">
          {personalData.name}
        </Link>

        <nav className="hidden md:flex items-center gap-3" aria-label="Primary">
          <div className="flex items-center gap-0.5 rounded-full border border-line bg-raised/70 p-1 backdrop-blur-md shadow-[0_12px_30px_-16px_rgb(0_0_0/0.9)]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-1.5 text-[0.9375rem] transition-colors duration-200 ${
                  isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-raised-3"
                      transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
          </div>
          <Button to="/about#contact" className="!h-10 !px-4 !text-sm">
            Get in touch
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="press md:hidden -mr-2 p-2 rounded-full text-fg"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="md:hidden border-t border-line"
          >
            <ul className="container-page py-4 flex flex-col">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 text-2xl tracking-tight ${isActive ? 'text-fg' : 'text-fg-muted'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-4">
                <Button to="/about#contact" className="w-full">
                  Get in touch
                </Button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
