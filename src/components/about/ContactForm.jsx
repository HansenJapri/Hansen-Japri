import { useState } from 'react'
import { Send } from 'lucide-react'
import Button from '../ui/Button'
import personalData from '../../data/personal.json'

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
]

const inputClass =
  'w-full rounded-xl border border-line-strong bg-raised px-4 py-3 text-fg placeholder:text-fg-faint outline-none transition-colors duration-200 focus:border-accent'

/*
 * No backend: submitting opens the visitor's email app with the message
 * already written, addressed to Hansen.
 */
export default function ContactForm() {
  const [data, setData] = useState({ name: '', email: '', message: '' })
  const [opened, setOpened] = useState(false)

  const onChange = (e) => setData((d) => ({ ...d, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Hello from ${data.name}`
    const body = `${data.message}\n\n${data.name}\n${data.email}`
    window.location.href = `mailto:${personalData.socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name} className="flex flex-col gap-2">
            <label htmlFor={`contact-${f.name}`} className="text-sm text-fg-muted">
              {f.label}
            </label>
            <input
              id={`contact-${f.name}`}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              value={data[f.name]}
              onChange={onChange}
              required
              className={inputClass}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm text-fg-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={data.message}
          onChange={onChange}
          placeholder="What are you building, and where do you need help?"
          required
          className={`${inputClass} resize-y min-h-36`}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <Button type="submit" size="lg" icon={Send}>
          Send message
        </Button>
        <p className="text-sm text-fg-faint" aria-live="polite">
          {opened ? 'Your email app should open with the message ready to send.' : 'Opens in your email app.'}
        </p>
      </div>
    </form>
  )
}
