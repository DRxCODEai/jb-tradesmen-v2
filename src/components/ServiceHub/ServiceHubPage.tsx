import { activeServiceHubServices } from '../../data/serviceHubServices'
import ServiceCategorySection from './ServiceCategorySection'
import ServiceHubCTA from './ServiceHubCTA'
import ServiceHubHero from './ServiceHubHero'
import './ServiceHubPage.css'

export default function ServiceHubPage() {
  const commercialServices = activeServiceHubServices.filter(
    (service) => service.audience === 'commercial',
  )
  const residentialServices = activeServiceHubServices.filter(
    (service) => service.audience === 'residential',
  )

  return (
    <div className="service-hub-page">
      <ServiceHubHero />
      <section className="service-hub__intro" aria-labelledby="service-hub-intro-heading">
        <div className="service-hub__container">
          <p className="service-hub__eyebrow">Practical property support</p>
          <h2 id="service-hub-intro-heading">Find the Right Service for the Property</h2>
          <p>
            Browse focused service information, common project needs, planning
            tips, professional-review guidance, and related next steps. Every
            project remains subject to site conditions, access, materials, and
            any specialty or jurisdictional requirements.
          </p>
        </div>
      </section>
      <ServiceCategorySection
        eyebrow="Commercial services"
        heading="Commercial Property & Facility Services"
        description="Maintenance, repairs, finish improvements, and practical work-order support for offices, retail properties, managed facilities, and commercial spaces."
        services={commercialServices}
        dark
      />
      <ServiceCategorySection
        eyebrow="Residential services"
        heading="Residential Repair & Maintenance Services"
        description="Focused home repair, upkeep, installation, and improvement services for homeowners, rental properties, and residential turnovers."
        services={residentialServices}
      />
      <ServiceHubCTA />
    </div>
  )
}
