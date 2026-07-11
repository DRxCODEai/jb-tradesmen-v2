import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { KOALENDAR_URL } from '../../config/links'

export default function ContactSuccess() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <section className="contact-success" aria-live="polite" role="status">
      <CheckCircle2 size={46} aria-hidden="true" />
      <p className="contact-eyebrow">Request received</p>
      <h2 ref={headingRef} tabIndex={-1}>Thank You for Contacting JBTRADESMENLLC</h2>
      <p>Your request has been received. We will review the information you provided and contact you as soon as possible.</p>
      <p className="contact-success__note">For emergency or after-hours service, call 970-286-5993 directly.</p>
      <div className="contact-success__actions">
        <a className="contact-button contact-button--gold" href="tel:9702865993">Call JBTRADESMENLLC</a>
        <a className="contact-button contact-button--outline" href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Assessment</a>
        <Link className="contact-button contact-button--outline" to="/">Return to Home</Link>
      </div>
    </section>
  )
}
