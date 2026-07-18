import { ArrowRight, Check, ChevronRight, MapPin, Phone, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'
import { getServiceById } from '../../data/serviceHubServices'
import type { ServiceHubService } from '../../types/serviceHub'
import ServiceStructuredData from './ServiceStructuredData'
import './ServiceDetailPage.css'

interface ServiceDetailPageProps {
  service: ServiceHubService
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="service-detail__check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={18} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const relatedServices = service.relatedServiceIds
    .map(getServiceById)
    .filter((related): related is ServiceHubService => Boolean(related))
    .slice(0, 4)

  return (
    <div className="service-detail-page">
      <ServiceStructuredData service={service} />

      <header className="service-detail__hero">
        <div className="service-detail__container">
          <nav className="service-detail__breadcrumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><ChevronRight size={15} aria-hidden="true" /><Link to="/service-hub">Service Hub</Link></li>
              <li aria-current="page"><ChevronRight size={15} aria-hidden="true" /><span>{service.title}</span></li>
            </ol>
          </nav>
          <p className="service-detail__eyebrow">{service.eyebrow}</p>
          <h1>{service.heroHeading}</h1>
          <p className="service-detail__hero-copy">{service.heroDescription}</p>
          <div className="service-detail__actions">
            <Link className="service-detail__button service-detail__button--gold" to={service.primaryCTA.route}>
              {service.primaryCTA.label} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="service-detail__button service-detail__button--outline" to={service.secondaryCTA.route}>
              {service.secondaryCTA.label}
            </Link>
          </div>
        </div>
      </header>

      <article>
        <section className="service-detail__overview" aria-labelledby="service-overview-heading">
          <div className="service-detail__container service-detail__narrow">
            <p className="service-detail__eyebrow">Service overview</p>
            <h2 id="service-overview-heading">Understanding {service.title}</h2>
            <div className="service-detail__prose">
              {service.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>

        <section className="service-detail__lists" aria-label={`${service.title} scope and concerns`}>
          <div className="service-detail__container service-detail__two-column">
            <section className="service-detail__panel" aria-labelledby="included-services-heading">
              <p className="service-detail__eyebrow">Typical scope</p>
              <h2 id="included-services-heading">Services Commonly Included</h2>
              <DetailList items={service.includedServices} />
            </section>
            <section className="service-detail__panel" aria-labelledby="common-concerns-heading">
              <p className="service-detail__eyebrow">Planning concerns</p>
              <h2 id="common-concerns-heading">Common Problems or Project Needs</h2>
              <DetailList items={service.commonConcerns} />
            </section>
          </div>
        </section>

        <section className="service-detail__tips" aria-labelledby="helpful-tips-heading">
          <div className="service-detail__container">
            <header className="service-detail__section-heading">
              <p className="service-detail__eyebrow">Helpful knowledge</p>
              <h2 id="helpful-tips-heading">Practical Tips Before Service</h2>
              <p>Use these points to document the condition and prepare for a more focused service conversation.</p>
            </header>
            <ol className="service-detail__tip-grid">
              {service.helpfulTips.map((tip, index) => (
                <li key={tip}><span>{String(index + 1).padStart(2, '0')}</span><p>{tip}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="service-detail__professional" aria-labelledby="professional-service-heading">
          <div className="service-detail__container service-detail__professional-grid">
            <div>
              <p className="service-detail__eyebrow">Professional review</p>
              <h2 id="professional-service-heading">When Professional Service Is Recommended</h2>
              <DetailList items={service.whenToCallProfessional} />
            </div>
            <aside className="service-detail__notice" aria-label="Scope and safety notes">
              <TriangleAlert size={25} aria-hidden="true" />
              <div>
                <h3>Scope &amp; Safety Notes</h3>
                {service.regulatedWorkNotes.map((note) => <p key={note}>{note}</p>)}
                {service.assumptions.map((assumption) => <p key={assumption}>{assumption}</p>)}
              </div>
            </aside>
          </div>
        </section>

        <section className="service-detail__related" aria-labelledby="related-services-heading">
          <div className="service-detail__container">
            <header className="service-detail__section-heading">
              <p className="service-detail__eyebrow">Continue planning</p>
              <h2 id="related-services-heading">Related Services</h2>
            </header>
            <div className="service-detail__related-grid">
              {relatedServices.map((related) => (
                <article className="service-detail__related-card" key={related.id}>
                  <p>{related.category}</p>
                  <h3>{related.title}</h3>
                  <span>{related.heroDescription}</span>
                  <Link to={related.route}>Explore {related.shortTitle} <ArrowRight size={16} aria-hidden="true" /></Link>
                </article>
              ))}
            </div>
            <Link className="service-detail__hub-link" to="/service-hub">View all services in the Service Hub</Link>
          </div>
        </section>

        <section className="service-detail__area" aria-labelledby="service-area-heading">
          <div className="service-detail__container service-detail__area-inner">
            <MapPin size={34} aria-hidden="true" />
            <div>
              <p className="service-detail__eyebrow">Service area</p>
              <h2 id="service-area-heading">Serving the Las Vegas Valley</h2>
              <p>{service.serviceAreaCopy}</p>
            </div>
          </div>
        </section>
      </article>

      <section className="service-detail__cta" aria-labelledby="service-detail-cta-heading">
        <div className="service-detail__container">
          <p className="service-detail__eyebrow">Start the conversation</p>
          <h2 id="service-detail-cta-heading">Plan Your {service.shortTitle} Project</h2>
          <p>Share the property, visible conditions, access considerations, and the result you want to achieve.</p>
          <div className="service-detail__actions service-detail__actions--center">
            <Link className="service-detail__button service-detail__button--gold" to="/request-estimate">Request an Estimate</Link>
            <a className="service-detail__button service-detail__button--outline" href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule an Assessment</a>
            <a className="service-detail__button service-detail__button--outline" href="tel:9702865993"><Phone size={18} aria-hidden="true" />Call 970-286-5993</a>
            <Link className="service-detail__button service-detail__button--outline" to="/contact">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
