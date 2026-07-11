import CommercialHero from '../components/Commercial/CommercialHero'
import CommercialServicesGrid from '../components/Commercial/CommercialServicesGrid'
import CommercialBenefits from '../components/Commercial/CommercialBenefits'
import CommercialProcess from '../components/Commercial/CommercialProcess'
import CommercialServiceAreas from '../components/Commercial/CommercialServiceAreas'
import CommercialFAQ from '../components/Commercial/CommercialFAQ'
import CommercialCTA from '../components/Commercial/CommercialCTA'

export default function CommercialServices() {
  return (
    <>
      <CommercialHero />
      <CommercialServicesGrid />
      <CommercialBenefits />
      <CommercialProcess />
      <CommercialServiceAreas />
      <CommercialFAQ />
      <CommercialCTA />
    </>
  )
}
