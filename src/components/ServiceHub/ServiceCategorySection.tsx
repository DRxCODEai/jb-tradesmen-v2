import type { ServiceHubService } from '../../types/serviceHub'
import ServiceHubCard from './ServiceHubCard'

interface ServiceCategorySectionProps {
  eyebrow: string
  heading: string
  description: string
  services: ServiceHubService[]
  dark?: boolean
}

export default function ServiceCategorySection({
  eyebrow,
  heading,
  description,
  services,
  dark = false,
}: ServiceCategorySectionProps) {
  return (
    <section
      className={`service-hub__category${dark ? ' service-hub__category--dark' : ''}`}
      aria-labelledby={`${services[0]?.audience}-services-heading`}
    >
      <div className="service-hub__container">
        <header className="service-hub__section-heading">
          <p className="service-hub__eyebrow">{eyebrow}</p>
          <h2 id={`${services[0]?.audience}-services-heading`}>{heading}</h2>
          <p>{description}</p>
        </header>
        <div className="service-hub__grid">
          {services.map((service) => (
            <ServiceHubCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
