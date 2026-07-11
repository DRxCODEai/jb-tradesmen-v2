import {
  Bath,
  Building2,
  Check,
  Droplets,
  Paintbrush,
  Refrigerator,
  Wind,
  Zap,
} from 'lucide-react'
import './ResidentialServicesGrid.css'

const services = [
  {
    title: 'Property Maintenance',
    icon: Building2,
    items: ['Lock Changes', 'Property Inspections', 'Interior Repairs', 'Exterior Repairs', 'Appliance Repairs', 'Interior & Exterior Painting'],
  },
  {
    title: 'Interior Repairs',
    icon: Paintbrush,
    items: ['Drywall', 'Tile', 'Flooring', 'Doors', 'Trim', 'Cabinets', 'Hardware'],
  },
  {
    title: 'Plumbing',
    icon: Droplets,
    items: ['Fixture Replacement', 'Valve Repairs', 'Leak Repairs', 'Water Heater Repairs', 'Water Filtration Systems', 'Irrigation Repairs'],
  },
  {
    title: 'Electrical',
    icon: Zap,
    items: ['Lighting', 'Switches', 'Outlets', 'Ceiling Fans', 'Troubleshooting'],
  },
  {
    title: 'HVAC',
    icon: Wind,
    items: ['Diagnostics', 'Thermostats', 'Filter Replacement & Maintenance', 'Minor Repairs', 'Preventative Maintenance'],
  },
  {
    title: 'Kitchen & Bathroom Remodeling',
    icon: Bath,
    items: ['Kitchen Remodeling', 'Bathroom Remodeling', 'Cabinet Installation', 'Countertops', 'Tile Installation', 'Flooring', 'Fixture Upgrades'],
  },
  {
    title: 'Appliance Repairs & Diagnostics',
    icon: Refrigerator,
    items: ['Washer', 'Dryer', 'Dishwasher', 'Refrigerators', 'Ranges', 'Garbage Disposal'],
  },
]

export default function ResidentialServicesGrid() {
  return (
    <section className="residential-services-grid" aria-labelledby="residential-services-grid-title">
      <div className="residential-services-grid__inner">
        <div className="residential-services-grid__heading">
          <span>Residential expertise</span>
          <h2 id="residential-services-grid-title">Reliable solutions for every room and repair.</h2>
          <p>Professional support for the repairs, upgrades, and maintenance your home needs most.</p>
        </div>

        <div className="residential-services-grid__cards">
          {services.map(({ title, icon: Icon, items }) => (
            <article className="residential-services-grid__card" key={title}>
              <div className="residential-services-grid__icon"><Icon size={27} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}><Check size={15} aria-hidden="true" />{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
