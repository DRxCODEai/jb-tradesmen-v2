import ResidentialHero from '../components/Residential/ResidentialHero'
import ResidentialServicesGrid from '../components/Residential/ResidentialServicesGrid'
import ResidentialBenefits from '../components/Residential/ResidentialBenefits'
import ResidentialProcess from '../components/Residential/ResidentialProcess'
import ResidentialServiceAreas from '../components/Residential/ResidentialServiceAreas'
import ResidentialFAQ from '../components/Residential/ResidentialFAQ'
import ResidentialCTA from '../components/Residential/ResidentialCTA'

export default function ResidentialServices() {
  return (
    <>
      <ResidentialHero />
      <ResidentialServicesGrid />
      <ResidentialBenefits />
      <ResidentialProcess />
      <ResidentialServiceAreas />
      <ResidentialFAQ />
      <ResidentialCTA />
    </>
  )
}
