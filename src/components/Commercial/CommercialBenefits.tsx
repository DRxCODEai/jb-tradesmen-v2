import { BadgeCheck, Building2, Clock3, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import './CommercialBenefits.css'

const benefits=[
  [ShieldCheck,'Licensed & Insured','Professional service backed by proper coverage and accountability.'],
  [BadgeCheck,'OSHA 30 Certified','Safety-aware work practices for active business environments.'],
  [Building2,'Federal Contractor','Qualified support for government facilities and regulated properties.'],
  [Clock3,'Fast Response','Responsive scheduling and communication when your facility needs support.'],
  [Sparkles,'Minimal Business Disruption','Focused work planning that respects your tenants, customers, and operations.'],
  [Wrench,'Professional Workmanship','Reliable repair and maintenance performed with attention to detail.'],
] as const

export default function CommercialBenefits(){return <section className="commercial-benefits" aria-labelledby="commercial-benefits-title"><div className="commercial-benefits__inner"><header className="commercial-benefits__heading"><span>Why choose us</span><h2 id="commercial-benefits-title">Why Businesses Choose JBTRADESMENLLC</h2></header><div className="commercial-benefits__grid">{benefits.map(([Icon,title,copy])=><article className="commercial-benefits__card" key={title}><span className="commercial-benefits__icon"><Icon size={25} aria-hidden="true"/></span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>}
