import { ArrowRight, Phone } from 'lucide-react'
import { KOALENDAR_URL } from '../../config/links'
import './ResidentialCTA.css'

export default function ResidentialCTA() {
  return (
    <section className="residential-cta" aria-labelledby="residential-cta-title">
      <div className="residential-cta__inner">
        <span>Get started today</span>
        <h2 id="residential-cta-title">Ready to Schedule Your Residential Service?</h2>
        <p>Whether you need repairs, maintenance, remodeling, or emergency service, JBTRADESMENLLC is ready to help.</p>
        <div className="residential-cta__actions">
          <a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer" className="residential-cta__button residential-cta__button--primary">
            Request Service <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href="tel:9702865993" className="residential-cta__button residential-cta__button--secondary">
            <Phone size={18} aria-hidden="true" /> Call (970) 286-5993
          </a>
        </div>
      </div>
    </section>
  )
}
