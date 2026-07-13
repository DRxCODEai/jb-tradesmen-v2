import { SERVICE_REGISTRY } from '../../knowledge/serviceRegistry'
import type { MasterServiceTemplate } from '../../templates/masterServiceTemplate'

export function findServiceProfile(serviceId: string): MasterServiceTemplate | undefined {
  return SERVICE_REGISTRY.find((profile) => profile.identity.id === serviceId)
}

export function requireServiceProfile(serviceId: string): MasterServiceTemplate {
  const profile = findServiceProfile(serviceId)
  if (!profile) throw new Error(`Unknown Smart Estimator service profile: ${serviceId}`)
  return profile
}
