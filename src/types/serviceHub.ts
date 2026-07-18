export type ServiceAudience = 'commercial' | 'residential'

export interface ServiceCTA {
  label: string
  route: string
}

export type ServiceFAQ = {
  question: string
  answer: string
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
  whatWeDo: string[]
  commonApplications: string[]
  whatToExpect: string[]
  professionalInsights: string[]
  preparationTips: string[]
  faqs: ServiceFAQ[]
  projectScopeNotes: string[]
  serviceAreaCopy: string
  relatedServiceIds: string[]
  primaryCTA: ServiceCTA
  secondaryCTA: ServiceCTA
  schemaServiceType: string
  active: boolean
}
