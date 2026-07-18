import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServiceHubHero() {
  return (
    <header className="service-hub__hero">
      <div className="service-hub__container service-hub__hero-inner">
        <p className="service-hub__eyebrow">Service Hub</p>
        <h1>Residential &amp; Commercial Services in Las Vegas</h1>
        <p className="service-hub__hero-copy">
          Explore JBTRADESMENLLC services for commercial facilities, property
          managers, retail spaces, offices, and residential properties
          throughout Las Vegas and surrounding communities.
        </p>
        <div className="service-hub__actions">
          <Link className="service-hub__button service-hub__button--gold" to="/request-estimate">
            Request an Estimate <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link className="service-hub__button service-hub__button--outline" to="/instant-project-estimate">
            Use Smart Project Estimator
          </Link>
        </div>
      </div>
    </header>
  )
}
