import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'

export default function GalleryCTA() {
  return <section className="gallery-cta" aria-labelledby="gallery-cta-heading"><div className="gallery-shell"><p className="gallery-eyebrow">Start Your Project</p><h2 id="gallery-cta-heading">Planning a Repair, Upgrade, or Facility Improvement?</h2><p>Tell JBTRADESMENLLC about your property or project and receive guidance on the best next step.</p><div className="gallery-cta__actions"><Link className="gallery-button gallery-button--gold" to="/request-estimate">Request an Estimate</Link><Link className="gallery-button gallery-button--outline" to="/instant-project-estimate">Try Smart Project Estimator</Link><a className="gallery-button gallery-button--outline" href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Assessment</a></div></div></section>
}
