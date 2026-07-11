import { CalendarDays, Mail, Phone } from 'lucide-react'
import { KOALENDAR_URL } from '../../config/links'

const options = [
  {
    icon: Phone,
    label: 'Call us',
    value: '970-286-5993',
    href: 'tel:9702865993',
    action: 'Call JBTRADESMENLLC',
  },
  {
    icon: Mail,
    label: 'Email us',
    value: 'Jerome@JBTradesmenLLC.com',
    href: 'mailto:Jerome@JBTradesmenLLC.com',
    action: 'Send Direct Email',
  },
  {
    icon: CalendarDays,
    label: 'Schedule an assessment',
    value: 'Plan an on-site visit',
    href: KOALENDAR_URL,
    action: 'Schedule Assessment',
    external: true,
  },
]

export default function ContactOptions() {
  return (
    <section className="contact-options" aria-labelledby="contact-options-heading">
      <div className="contact-shell">
        <div className="contact-section-heading">
          <p className="contact-eyebrow">Choose the best next step</p>
          <h2 id="contact-options-heading">Connect with our team</h2>
        </div>
        <div className="contact-options__grid">
          {options.map(({ icon: Icon, label, value, href, action, external }) => (
            <article className="contact-option-card" key={label}>
              <span className="contact-option-card__icon"><Icon aria-hidden="true" size={25} /></span>
              <p className="contact-eyebrow">{label}</p>
              <h3>{value}</h3>
              <a className="contact-button contact-button--dark" href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {action}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
