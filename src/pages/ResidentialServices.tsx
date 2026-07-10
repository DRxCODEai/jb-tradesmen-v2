import ResidentialHero from '../components/Sections/ResidentialHero'
import ResidentialServicesGrid from '../components/Sections/ResidentialServicesGrid'
import ResidentialBenefits from '../components/Sections/ResidentialBenefits'
import ResidentialProcess from '../components/Sections/ResidentialProcess'
import ResidentialServiceAreas from '../components/Sections/ResidentialServiceAreas'
import ResidentialFAQ from '../components/Sections/ResidentialFAQ'
import ResidentialCTA from '../components/Sections/ResidentialCTA'

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
