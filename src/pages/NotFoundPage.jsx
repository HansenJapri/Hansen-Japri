import { ArrowLeft } from 'lucide-react'
import { PageTransition } from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <PageTransition>
      <section className="container-page grid min-h-[calc(100dvh-4rem)] items-center gap-10 py-16 ">
        <div>
          <p className="font-mono text-sm text-fg-faint">404</p>
          <h1 className="mt-4 text-h1">This page is not in the system.</h1>
          <p className="mt-5 text-lead text-fg-muted max-w-[40ch]">
            The link may be old, or the page has moved.
          </p>
          <div className="mt-9">
            <Button to="/" icon={ArrowLeft}>
              Back home
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
