import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ServiceHubService } from '../../types/serviceHub'

interface ServiceHubCardProps {
  service: ServiceHubService
}

export default function ServiceHubCard({ service }: ServiceHubCardProps) {
  return (
    <article className="service-hub-card">
      <p className="service-hub-card__category">{service.category}</p>
      <h3>{service.title}</h3>
      <p className="service-hub-card__copy">{service.heroDescription}</p>
      <ul aria-label={`${service.title} examples`}>
        {service.whatWeDo.slice(0, 3).map((item) => (
          <li key={item}>
            <Check size={17} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link to={service.route} aria-label={`Learn more about ${service.title}`}>
        Learn More <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </article>
  )
}
