import CommercialHero from '../components/Commercial/CommercialHero'
import CommercialTrustedBy from '../components/Commercial/CommercialTrustedBy'
import CommercialServicesGrid from '../components/Commercial/CommercialServicesGrid'
import CommercialBenefits from '../components/Commercial/CommercialBenefits'
import CommercialIndustries from '../components/Commercial/CommercialIndustries'
import CommercialProcess from '../components/Commercial/CommercialProcess'
import CommercialServiceAreas from '../components/Commercial/CommercialServiceAreas'
import CommercialFAQ from '../components/Commercial/CommercialFAQ'
import CommercialCTA from '../components/Commercial/CommercialCTA'

export default function CommercialServices() {
  return (
    <>
      <CommercialHero />
      <CommercialTrustedBy />
      <CommercialServicesGrid />
      <CommercialBenefits />
      <CommercialIndustries />
      <CommercialProcess />
      <CommercialServiceAreas />
      <CommercialFAQ />
      <CommercialCTA />
    </>
  )
}
