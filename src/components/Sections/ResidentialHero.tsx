import logo from '../../assets/logo.png'
import { KOALENDAR_URL } from '../../config/links'
import './ResidentialHero.css'

export default function ResidentialHero() {
  return (
    <section className="residential-hero">
      <div className="residential-hero__layout">
        <div className="residential-hero__content">
          <span className="residential-hero__tag">Residential Services</span>

          <h1>
            Professional Residential
            <br />
            <span>Repair &amp; Maintenance</span>
          </h1>

          <p className="residential-hero__description">
            JBTRADESMENLLC provides dependable residential repair, maintenance, remodeling,
            inspections and improvement services for homeowners throughout Colorado, Wyoming and Nevada.
          </p>
          <p className="residential-hero__description">
            From small repairs to complete remodeling projects, our experienced team delivers quality
            workmanship, clear communication and dependable service.
          </p>

          <div className="residential-hero__badges" aria-label="Residential service types">
            <span>Residential Repairs</span>
            <span>Property Maintenance</span>
            <span>Remodeling</span>
            <span>Inspections</span>
            <span>Home Improvements</span>
            <span>Emergency Repairs</span>
          </div>

          <div className="residential-hero__trust" aria-label="Company qualifications">
            <span>✓ Licensed &amp; Insured</span>
            <span>✓ OSHA 30 Certified</span>
            <span>✓ 1,200+ Projects</span>
            <span>✓ 10+ Years Experience</span>
            <span>✓ 12-Month Warranty</span>
            <span>✓ 0–72 Hour Response</span>
          </div>

          <div className="residential-hero__actions">
            <a
              className="residential-hero__button residential-hero__button--primary"
              href={KOALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Request Service
            </a>
            <a className="residential-hero__button residential-hero__button--secondary" href="tel:9702865993">
              Call Now
            </a>
          </div>
        </div>

        <div className="residential-hero__card-wrap">
          <aside className="residential-hero__card" aria-label="JBTRADESMENLLC Residential Services details">
            <img src={logo} alt="JBTRADESMENLLC" className="residential-hero__logo" />
            <div className="residential-hero__divider" />
            <h2>JBTRADESMENLLC</h2>
            <p className="residential-hero__subtitle">Residential Services</p>

            <div className="residential-hero__stats">
              <div><strong>1,200+</strong><span>Projects Completed</span></div>
              <div><strong>10+</strong><span>Years Experience</span></div>
              <div><strong>★★★★★</strong><span>5-Star Service</span></div>
              <div><strong>CO • WY • NV</strong><span>Serving</span></div>
            </div>

            <div className="residential-hero__divider" />
            <div className="residential-hero__checks">
              <span>✓ Interior Repairs</span>
              <span>✓ Exterior Repairs</span>
              <span>✓ Plumbing</span>
              <span>✓ HVAC</span>
              <span>✓ Electrical</span>
              <span>✓ Kitchen &amp; Bathroom Remodeling</span>
              <span>✓ Property Maintenance</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
