import ResourcesHero from '../components/Resources/ResourcesHero'
import ResourceCategories from '../components/Resources/ResourceCategories'
import FeaturedGuides from '../components/Resources/FeaturedGuides'
import MaintenanceChecklists from '../components/Resources/MaintenanceChecklists'
import AssessmentResources from '../components/Resources/AssessmentResources'
import ResourcesCTA from '../components/Resources/ResourcesCTA'

export default function Resources() {
  return (
    <>
      <ResourcesHero />
      <ResourceCategories />
      <FeaturedGuides />
      <MaintenanceChecklists />
      <AssessmentResources />
      <ResourcesCTA />
    </>
  )
}
