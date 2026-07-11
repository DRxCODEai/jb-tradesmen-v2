import ClientsHero from '../components/Clients/ClientsHero'
import ClientCategories from '../components/Clients/ClientCategories'
import FeaturedClients from '../components/Clients/FeaturedClients'
import Qualifications from '../components/Clients/Qualifications'
import CoverageAreas from '../components/Clients/CoverageAreas'
import ClientsCTA from '../components/Clients/ClientsCTA'

export default function WhoWeWorkWith() {
  return (
    <>
      <ClientsHero />
      <ClientCategories />
      <FeaturedClients />
      <Qualifications />
      <CoverageAreas />
      <ClientsCTA />
    </>
  )
}
