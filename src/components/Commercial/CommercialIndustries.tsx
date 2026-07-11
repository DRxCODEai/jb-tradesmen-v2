import { Building2, Factory, Landmark, MapPinned, Store, Stethoscope, UtensilsCrossed, Warehouse } from 'lucide-react'
import './CommercialIndustries.css'

const industries = [
  { icon: Landmark, title: 'Financial Institutions', copy: 'Dependable maintenance for banks, credit unions, and financial facilities.' },
  { icon: MapPinned, title: 'Property Management Companies', copy: 'Responsive support for portfolios, managed communities, and multi-site properties.' },
  { icon: Store, title: 'Retail Stores', copy: 'Reliable repairs and maintenance for retail environments and storefronts.' },
  { icon: UtensilsCrossed, title: 'Restaurants', copy: 'Practical repair and facility support for active restaurant operations.' },
  { icon: Stethoscope, title: 'Medical Facilities', copy: 'Professional service for medical offices, clinics, and healthcare settings.' },
  { icon: Landmark, title: 'Government Facilities', copy: 'Qualified support for municipal, state, and federal properties.' },
  { icon: Building2, title: 'Office Buildings', copy: 'Maintenance solutions for professional offices and business complexes.' },
  { icon: Factory, title: 'Industrial Facilities', copy: 'Hands-on support for light industrial and manufacturing environments.' },
  { icon: Warehouse, title: 'Warehouses & Distribution Centers', copy: 'Maintenance for warehouses, logistics sites, and distribution facilities.' },
  { icon: Building2, title: 'Multi-Family Housing', copy: 'Property-ready repairs and maintenance for apartment communities.' },
  { icon: MapPinned, title: 'Homeowners Associations (HOAs)', copy: 'Reliable common-area and community maintenance support.' },
]

export default function CommercialIndustries() {
  return (
    <section className="commercial-industries" aria-labelledby="commercial-industries-title">
      <div className="commercial-industries__inner">
        <header className="commercial-industries__heading">
          <span>Who we serve</span>
          <h2 id="commercial-industries-title">Industries We Serve</h2>
          <p>Professional maintenance and repair solutions tailored for commercial facilities throughout Colorado, Wyoming and Nevada.</p>
        </header>
        <div className="commercial-industries__grid">
          {industries.map(({ icon: Icon, title, copy }) => (
            <article className="commercial-industries__card" key={title}>
              <span className="commercial-industries__icon"><Icon size={25} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
