import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Backdrop from '../three/Backdrop'

export default function Layout({ children }) {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!hash) return
    // The next page mounts after the exit transition, so wait for it.
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }, 320)
    return () => clearTimeout(timer)
  }, [pathname, hash])

  return (
    <div className="relative min-h-[100dvh] flex flex-col">
      <Backdrop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative z-10 flex-1 pt-16">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
