import logo from '../../assets/logo.png'
import { KOALENDAR_URL } from '../../config/links'
import './CommercialHero.css'

const capabilities = ['Commercial Maintenance', 'Retail Facilities', 'Property Management', 'Government Facilities', 'Financial Institutions', 'Preventative Maintenance', 'Emergency Repairs']

export default function CommercialHero() {
  return <section className="commercial-hero">
    <div className="commercial-hero__layout">
      <div className="commercial-hero__content">
        <span className="commercial-hero__tag">Commercial services</span>
        <h1>Professional Commercial<br /><span>Maintenance &amp; Facility Services</span></h1>
        <p>JBTRADESMENLLC provides dependable commercial maintenance, repairs, inspections and facility support for businesses, retail facilities, financial institutions, government agencies and property managers throughout Colorado, Wyoming and Nevada.</p>
        <p>Whether you need scheduled maintenance, emergency repairs or ongoing facility support, our team delivers responsive service with professional workmanship and minimal disruption to your operations.</p>
        <div className="commercial-hero__badges">
          {['Commercial Maintenance', 'Retail Facilities', 'Property Management', 'Government', 'Financial Institutions', 'Emergency Repairs'].map((badge) => <span key={badge}>{badge}</span>)}
        </div>
        <div className="commercial-hero__trust">
          {['Licensed & Insured', 'OSHA 30 Certified', 'Federal Contractor', '1,200+ Projects', '10+ Years Experience', '0–72 Hour Response'].map((item) => <span key={item}>✓ {item}</span>)}
        </div>
        <div className="commercial-hero__actions">
          <a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer" className="commercial-hero__button commercial-hero__button--primary">Request Commercial Service</a>
          <a href="tel:9702865993" className="commercial-hero__button commercial-hero__button--secondary">Call Now</a>
        </div>
      </div>
      <div className="commercial-hero__card-wrap"><aside className="commercial-hero__card" aria-label="JBTRADESMENLLC commercial capabilities">
        <img src={logo} alt="JBTRADESMENLLC" className="commercial-hero__logo" />
        <div className="commercial-hero__divider" />
        <h2>JBTRADESMENLLC</h2><p className="commercial-hero__subtitle">Commercial Services</p>
        <div className="commercial-hero__stats">
          <div><strong>1,200+</strong><span>Projects Completed</span></div><div><strong>10+</strong><span>Years Experience</span></div><div><strong>★★★★★</strong><span>5-Star Service</span></div><div><strong>CO • WY • NV</strong><span>Serving</span></div>
        </div>
        <div className="commercial-hero__divider" />
        <div className="commercial-hero__checks">{capabilities.map((item) => <span key={item}>✓ {item}</span>)}</div>
      </aside></div>
    </div>
  </section>
}
