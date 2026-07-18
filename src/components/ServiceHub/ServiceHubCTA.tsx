import { Link } from 'react-router-dom'

export default function ServiceHubCTA() {
  return (
    <section className="service-hub__cta" aria-labelledby="service-hub-cta-heading">
      <div className="service-hub__container">
        <p className="service-hub__eyebrow">Plan the next step</p>
        <h2 id="service-hub-cta-heading">Not Sure Which Service Fits Your Project?</h2>
        <p>
          Share the property type, visible condition, and project goals. We can
          help identify whether an estimate, assessment, or additional review is
          the right place to begin.
        </p>
        <div className="service-hub__actions service-hub__actions--center">
          <Link className="service-hub__button service-hub__button--gold" to="/request-estimate">
            Request an Estimate
          </Link>
          <Link className="service-hub__button service-hub__button--outline" to="/contact">
            Contact JBTRADESMENLLC
          </Link>
        </div>
      </div>
    </section>
  )
}
