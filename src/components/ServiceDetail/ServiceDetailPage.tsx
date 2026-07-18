import { ArrowRight, Check, ChevronRight, Lightbulb, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'
import { getServiceById } from '../../data/serviceHubServices'
import type { ServiceHubService } from '../../types/serviceHub'
import ServiceFAQ from './ServiceFAQ'
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
          <p className="service-detail__credentials">
            Licensed &amp; Insured · OSHA 30 Certified · EPA 608 &amp; 609 Certified · Federal Contractor
          </p>
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

        <section className="service-detail__lists" aria-label={`${service.title} capabilities and applications`}>
          <div className="service-detail__container service-detail__two-column">
            <section className="service-detail__panel" aria-labelledby="included-services-heading">
              <p className="service-detail__eyebrow">Service capabilities</p>
              <h2 id="included-services-heading">What We Do</h2>
              <DetailList items={service.whatWeDo} />
            </section>
            <section className="service-detail__panel" aria-labelledby="common-concerns-heading">
              <p className="service-detail__eyebrow">Where we help</p>
              <h2 id="common-concerns-heading">Common Applications</h2>
              <DetailList items={service.commonApplications} />
            </section>
          </div>
        </section>

        <section className="service-detail__expectations" aria-labelledby="service-expectations-heading">
          <div className="service-detail__container">
            <header className="service-detail__section-heading">
              <p className="service-detail__eyebrow">Our service process</p>
              <h2 id="service-expectations-heading">What to Expect During Service</h2>
            </header>
            <ol className="service-detail__process-grid">
              {service.whatToExpect.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="service-detail__professional" aria-labelledby="professional-insight-heading">
          <div className="service-detail__container">
            <header className="service-detail__section-heading">
              <p className="service-detail__eyebrow">Field knowledge</p>
              <h2 id="professional-insight-heading">Professional Insight</h2>
            </header>
            <div className="service-detail__insight-grid">
              {service.professionalInsights.map((insight) => (
                <article key={insight}>
                  <Lightbulb size={24} aria-hidden="true" />
                  <p>{insight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="service-detail__tips" aria-labelledby="helpful-tips-heading">
          <div className="service-detail__container">
            <header className="service-detail__section-heading">
              <p className="service-detail__eyebrow">Prepare for the visit</p>
              <h2 id="helpful-tips-heading">Helpful Preparation Tips</h2>
              <p>A little project information helps our team prepare materials, access, and the most practical service approach.</p>
            </header>
            <ol className="service-detail__tip-grid">
              {service.preparationTips.map((tip, index) => (
                <li key={tip}><span>{String(index + 1).padStart(2, '0')}</span><p>{tip}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <ServiceFAQ serviceName={service.title} faqs={service.faqs} />

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

      {service.projectScopeNotes.length > 0 && (
        <aside className="service-detail__scope-notes" aria-labelledby="project-scope-notes-heading">
          <div className="service-detail__container service-detail__narrow">
            <h2 id="project-scope-notes-heading">Project Scope Notes</h2>
            {service.projectScopeNotes.map((note) => <p key={note}>{note}</p>)}
          </div>
        </aside>
      )}
    </div>
  )
}
