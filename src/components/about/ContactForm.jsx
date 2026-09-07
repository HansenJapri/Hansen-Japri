import { useState } from 'react'
import { Send, Check } from 'lucide-react'

const FIELDS = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Doe', half: true },
  { name: 'email', label: 'Work Email', type: 'email', placeholder: 'jane@company.com', half: true },
  { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project collaboration' },
]

const inputClasses =
  'w-full px-4 py-2.5 rounded-lg bg-surface-low text-ink text-note placeholder:text-ink-faint border border-line outline-none transition-colors duration-300 focus:border-ink focus:ring-1 focus:ring-ink'

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // No backend is wired up yet — the submit is simulated locally.
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.filter((f) => f.half).map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label htmlFor={`contact-${field.name}`} className="block kicker text-ink-muted">
              {field.label}
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required
              className={inputClasses}
            />
          </div>
        ))}
      </div>

      {FIELDS.filter((f) => !f.half).map((field) => (
        <div key={field.name} className="space-y-1.5">
          <label htmlFor={`contact-${field.name}`} className="block kicker text-ink-muted">
            {field.label}
          </label>
          <input
            id={`contact-${field.name}`}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            required
            className={inputClasses}
          />
        </div>
      ))}

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="block kicker text-ink-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project scope, timeline, and aspirations…"
          required
          rows={5}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-note font-medium transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
          isSubmitted ? 'bg-moss text-on-dark' : 'bg-ink text-canvas hover:bg-ink-muted'
        }`}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-canvas/30 border-t-canvas animate-spin" />
            Sending…
          </>
        ) : isSubmitted ? (
          <>
            <Check className="w-4 h-4" strokeWidth={2} />
            Message sent successfully
          </>
        ) : (
          <>
            <Send className="w-4 h-4" strokeWidth={1.75} />
            Send Message
          </>
        )}
      </button>

      <p className="kicker text-ink-faint text-center">
        Typically responds within 24 hours
      </p>
    </form>
  )
}
