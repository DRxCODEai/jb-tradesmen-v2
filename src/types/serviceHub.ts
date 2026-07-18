export type ServiceAudience = 'commercial' | 'residential'

export interface ServiceCTA {
  label: string
  route: string
}

export interface ServiceHubService {
  id: string
  slug: string
  route: string
  title: string
  shortTitle: string
  eyebrow: string
  category: 'Commercial' | 'Residential'
  audience: ServiceAudience
  locationFocus: string
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  heroHeading: string
  heroDescription: string
  overview: string[]
  includedServices: string[]
  commonConcerns: string[]
  helpfulTips: string[]
  whenToCallProfessional: string[]
  serviceAreaCopy: string
  relatedServiceIds: string[]
  primaryCTA: ServiceCTA
  secondaryCTA: ServiceCTA
  schemaServiceType: string
  regulatedWorkNotes: string[]
  assumptions: string[]
  active: boolean
}
