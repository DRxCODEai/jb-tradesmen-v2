import { BadgeDollarSign, Clock3, ShieldCheck, Sparkles, Star, Wrench } from 'lucide-react'
import './ResidentialBenefits.css'

const benefits = [
  { icon: ShieldCheck, title: 'Licensed & Insured', copy: 'Fully insured and committed to safe professional workmanship.' },
  { icon: Star, title: '12-Month Workmanship Warranty', copy: 'Most completed work is backed by our 12-month workmanship warranty.' },
  { icon: BadgeDollarSign, title: 'Upfront Pricing', copy: 'Clear pricing before work begins with no hidden surprises.' },
  { icon: Clock3, title: 'Fast Response', copy: 'Prompt scheduling and responsive communication.' },
  { icon: Sparkles, title: 'Clean Job Sites', copy: 'Respectful technicians who leave your home clean.' },
  { icon: Wrench, title: 'Experienced Professionals', copy: 'Over 10 years of residential repair and maintenance experience.' },
]

export default function ResidentialBenefits() {
  return (
    <section className="residential-benefits" aria-labelledby="residential-benefits-title">
      <div className="residential-benefits__inner">
        <header className="residential-benefits__heading">
          <span>Why choose us</span>
          <h2 id="residential-benefits-title">Why Homeowners Choose JBTRADESMENLLC</h2>
          <p>Professional residential maintenance performed with quality workmanship, clear communication, and dependable service.</p>
        </header>
        <div className="residential-benefits__grid">
          {benefits.map(({ icon: Icon, title, copy }) => (
            <article className="residential-benefits__card" key={title}>
              <span className="residential-benefits__icon"><Icon size={25} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
