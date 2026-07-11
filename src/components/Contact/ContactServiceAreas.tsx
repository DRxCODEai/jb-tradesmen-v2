import { Link } from 'react-router-dom'
import { Calculator, ClipboardCheck } from 'lucide-react'
import { KOALENDAR_URL } from '../../config/links'

export default function ContactServiceAreas() {
  return (
    <section className="contact-planning" aria-labelledby="contact-planning-heading">
      <div className="contact-shell">
        <div className="contact-section-heading">
          <p className="contact-eyebrow">Additional planning options</p>
          <h2 id="contact-planning-heading">Not ready to send a service request?</h2>
          <p>JBTRADESMENLLC currently serves customers in Colorado, Wyoming, and Nevada.</p>
        </div>
        <div className="contact-planning__grid">
          <article>
            <Calculator size={28} aria-hidden="true" />
            <h3>Smart Project Estimator</h3>
            <p>Answer guided project questions and receive a preliminary labor, materials, and project-cost range.</p>
            <Link className="contact-button contact-button--dark" to="/instant-project-estimate">Try Smart Project Estimator</Link>
          </article>
          <article>
            <ClipboardCheck size={28} aria-hidden="true" />
            <h3>Property Assessment</h3>
            <p>Schedule an on-site professional assessment for detailed project planning and formal recommendations.</p>
            <a className="contact-button contact-button--dark" href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Property Assessment</a>
          </article>
        </div>
      </div>
    </section>
  )
}
