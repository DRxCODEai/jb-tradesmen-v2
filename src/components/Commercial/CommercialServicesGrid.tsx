import { Building2, Check, Droplets, Store, Wind, Wrench, Zap } from 'lucide-react'
import './CommercialServicesGrid.css'

const services=[
  ['Commercial Property Maintenance',Building2,['Preventative Maintenance','Facility Inspections','Lock Changes','Interior Repairs','Exterior Repairs','Painting','General Repairs']],
  ['Commercial Repairs',Wrench,['Drywall','Doors','Ceiling Tile','Millwork','Hardware','Storefront Repairs','Tenant Improvements']],
  ['Plumbing',Droplets,['Fixture Repairs','Leak Repairs','Valve Repairs','Water Heater Repairs','Water Filtration','Irrigation Repairs']],
  ['Electrical',Zap,['Lighting','Ballasts','Switches','Outlets','Troubleshooting','Emergency Electrical Repairs']],
  ['HVAC',Wind,['Diagnostics','Filter Replacement & Maintenance','Thermostats','Minor Repairs','Preventative Maintenance']],
  ['Retail & Facility Services',Store,['Retail Repairs','Fixture Installation','Signage Repairs','Preventative Maintenance','Facility Support','Emergency Response']],
] as const

export default function CommercialServicesGrid(){return <section className="commercial-services-grid" aria-labelledby="commercial-services-title"><div className="commercial-services-grid__inner"><header className="commercial-services-grid__heading"><span>Commercial expertise</span><h2 id="commercial-services-title">Professional Commercial Maintenance Solutions</h2></header><div className="commercial-services-grid__cards">{services.map(([title,Icon,items])=><article className="commercial-services-grid__card" key={title}><span className="commercial-services-grid__icon"><Icon size={27} aria-hidden="true"/></span><h3>{title}</h3><ul>{items.map(item=><li key={item}><Check size={15} aria-hidden="true"/>{item}</li>)}</ul></article>)}</div></div></section>}
