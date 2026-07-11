import { CalendarDays, ClipboardCheck, SearchCheck, ShieldCheck, Wrench } from 'lucide-react'
import './ResidentialProcess.css'

const steps = [
  { icon: ClipboardCheck, title: 'Request Service' },
  { icon: CalendarDays, title: 'Schedule Visit' },
  { icon: Wrench, title: 'On-Site Repair' },
  { icon: SearchCheck, title: 'Quality Inspection' },
  { icon: ShieldCheck, title: '12-Month Warranty' },
]

export default function ResidentialProcess() {
  return (
    <section className="residential-process" aria-labelledby="residential-process-title">
      <div className="residential-process__inner">
        <header className="residential-process__heading">
          <span>Simple by design</span>
          <h2 id="residential-process-title">Our Residential Service Process</h2>
        </header>
        <ol className="residential-process__timeline">
          {steps.map(({ icon: Icon, title }, index) => (
            <li key={title}>
              <span className="residential-process__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="residential-process__icon"><Icon size={25} aria-hidden="true" /></span>
              <h3>{title}</h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
