import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  DoorOpen,
  Hammer,
  House,
  Paintbrush,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import heroImage from '../../assets/hero-homepage-v1.png'
import './ResidentialServicesPage.css'

const serviceGroups = [
  {
    icon: Hammer,
    title: 'Repairs & Improvements',
    description: 'Thoughtful repairs and upgrades that keep the spaces you use every day working beautifully.',
    services: ['General repairs', 'Drywall repair', 'Door & window repair', 'Deck and fence repair'],
  },
  {
    icon: Paintbrush,
    title: 'Interior Refreshes',
    description: 'Detail-oriented finishing work for a home that feels cared for from room to room.',
    services: ['Painting', 'Fixture replacement', 'Lighting updates', 'Ceiling fan installation'],
  },
  {
    icon: Wrench,
    title: 'Home Maintenance',
    description: 'Proactive support that helps small issues stay small and your home stay ready.',
    services: ['Appliance installation', 'Plumbing repairs', 'Electrical repairs', 'Preventative maintenance'],
  },
]

const process = [
  ['01', 'Tell us what you need', 'Share the project details and we’ll help identify the right next step.'],
  ['02', 'Receive a clear plan', 'Get a straightforward assessment, scope, and path forward.'],
  ['03', 'Enjoy work done right', 'Our team completes your project with care, communication, and respect for your home.'],
]

export default function ResidentialServicesPage() {
  return (
    <main className="residential-page">
      <section className="residential-hero">
        <div className="residential-hero__image" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
        <div className="residential-shell residential-hero__content">
          <p className="residential-eyebrow">Residential services</p>
          <h1>Reliable care for the home you love.</h1>
          <p className="residential-hero__copy">
            From a quick repair to a thoughtful home refresh, JBTRADESMENLLC brings practical expertise,
            clear communication, and pride in every detail.
          </p>
          <div className="residential-actions">
            <Link className="residential-button residential-button--gold" to="/request-estimate">
              Request an assessment <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="residential-button residential-button--outline" href="tel:9702865993">
              Call 970-286-5993
            </a>
          </div>
        </div>
      </section>

      <section className="residential-intro residential-shell">
        <div>
          <p className="residential-eyebrow">Built around your home</p>
          <h2>A trusted hand for the jobs that matter.</h2>
        </div>
        <p>
          Your home deserves more than a quick fix. We help homeowners move projects forward with dependable
          workmanship and a service experience that stays simple from the first call through completion.
        </p>
      </section>

      <section className="residential-services" aria-labelledby="residential-services-heading">
        <div className="residential-shell">
          <div className="residential-section-heading">
            <p className="residential-eyebrow">What we do</p>
            <h2 id="residential-services-heading">Practical solutions, beautifully finished.</h2>
          </div>
          <div className="residential-service-grid">
            {serviceGroups.map(({ icon: Icon, title, description, services }) => (
              <article className="residential-service-card" key={title}>
                <span className="residential-service-card__icon"><Icon size={25} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ul>
                  {services.map((service) => <li key={service}><Check size={16} aria-hidden="true" />{service}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="residential-confidence">
        <div className="residential-shell residential-confidence__grid">
          <div className="residential-confidence__image" aria-hidden="true">
            <img src={heroImage} alt="" />
          </div>
          <div className="residential-confidence__content">
            <p className="residential-eyebrow">The JBTRADESMENLLC difference</p>
            <h2>Capable work. A better experience.</h2>
            <p>We pair dependable hands-on service with the kind of communication that makes a home project feel manageable.</p>
            <div className="residential-trust-list">
              <div><ShieldCheck size={22} aria-hidden="true" /><span><strong>Professional and accountable</strong>Licensed and insured service you can feel confident inviting into your home.</span></div>
              <div><ClipboardCheck size={22} aria-hidden="true" /><span><strong>Clear from start to finish</strong>A straightforward process, responsive updates, and respect for your time.</span></div>
              <div><DoorOpen size={22} aria-hidden="true" /><span><strong>Care for every space</strong>Thoughtful work that treats your property with the attention it deserves.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="residential-process residential-shell" aria-labelledby="residential-process-heading">
        <div className="residential-section-heading">
          <p className="residential-eyebrow">A simple process</p>
          <h2 id="residential-process-heading">From your list to a finished home.</h2>
        </div>
        <ol>
          {process.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="residential-cta">
        <div className="residential-shell residential-cta__content">
          <House size={34} aria-hidden="true" />
          <div><p className="residential-eyebrow">Ready when you are</p><h2>Let’s take care of your next home project.</h2></div>
          <Link className="residential-button residential-button--gold" to="/request-estimate">Get started <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  )
}
