import logo from '../../assets/logo.png'
import { KOALENDAR_URL } from '../../config/links'
import './ClientsHero.css'

const qualifications = ['Residential', 'Commercial', 'Property Management', 'Financial Institutions', 'Retail Facilities', 'Government Agencies', 'Licensed & Insured', 'OSHA 30 Certified']

export default function ClientsHero() {
  return <section className="clients-hero">
    <div className="clients-hero__layout">
      <div className="clients-hero__content">
        <span className="clients-hero__tag">Who we work with</span>
        <h1>Trusted by Homeowners,<br /><span>Businesses &amp;<br />Property Managers</span></h1>
        <p>JBTRADESMENLLC proudly provides residential and commercial maintenance, repairs, inspections and facility support for homeowners, businesses, retail facilities, financial institutions, property managers and government agencies throughout Colorado, Wyoming and Nevada.</p>
        <p>Our experience across multiple industries allows us to deliver dependable workmanship, responsive communication and professional service on every project.</p>
        <div className="clients-hero__badges">{['Residential', 'Commercial', 'Property Management', 'Financial Institutions', 'Government', 'Retail'].map((badge) => <span key={badge}>{badge}</span>)}</div>
        <div className="clients-hero__trust">{['Licensed & Insured', 'OSHA 30 Certified', 'Federal Contractor', '1,200+ Projects', '10+ Years Experience', 'Serving CO • WY • NV'].map((item) => <span key={item}>✓ {item}</span>)}</div>
        <div className="clients-hero__actions"><a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer" className="clients-hero__button clients-hero__button--primary">Schedule Consultation</a><a href="tel:9702865993" className="clients-hero__button clients-hero__button--secondary">Call (970) 286-5993</a></div>
      </div>
      <div className="clients-hero__card-wrap"><aside className="clients-hero__card" aria-label="JBTRADESMENLLC client support"><img src={logo} alt="JBTRADESMENLLC" className="clients-hero__logo" /><div className="clients-hero__divider" /><h2>JBTRADESMENLLC</h2><p className="clients-hero__subtitle">Professional Property Support</p><div className="clients-hero__stats"><div><strong>1,200+</strong><span>Projects Completed</span></div><div><strong>10+</strong><span>Years Experience</span></div><div><strong>★★★★★</strong><span>5-Star Service</span></div><div><strong>CO • WY • NV</strong><span>Serving</span></div></div><div className="clients-hero__divider" /><div className="clients-hero__checks">{qualifications.map((item) => <span key={item}>✓ {item}</span>)}</div></aside></div>
    </div>
  </section>
}
