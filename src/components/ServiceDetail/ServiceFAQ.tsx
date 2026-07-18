import type { ServiceFAQ as ServiceFAQItem } from '../../types/serviceHub'

interface ServiceFAQProps {
  serviceName: string
  faqs: ServiceFAQItem[]
}

export default function ServiceFAQ({ serviceName, faqs }: ServiceFAQProps) {
  return (
    <section className="service-detail__faq" aria-labelledby="service-faq-heading">
      <div className="service-detail__container service-detail__narrow">
        <header className="service-detail__section-heading">
          <p className="service-detail__eyebrow">Common questions</p>
          <h2 id="service-faq-heading">{serviceName} Frequently Asked Questions</h2>
        </header>
        <div className="service-detail__faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
