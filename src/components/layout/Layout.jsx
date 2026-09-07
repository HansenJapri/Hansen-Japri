import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-canvas">
      <Navbar />
      {/* pt-20 clears the fixed 5rem header */}
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  )
}
