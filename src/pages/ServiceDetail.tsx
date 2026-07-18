import { useParams } from 'react-router-dom'
import ServiceDetailPage from '../components/ServiceDetail/ServiceDetailPage'
import { getServiceBySlug } from '../data/serviceHubServices'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const service = getServiceBySlug(slug)

  if (!service) return <NotFound />

  return <ServiceDetailPage service={service} />
}
