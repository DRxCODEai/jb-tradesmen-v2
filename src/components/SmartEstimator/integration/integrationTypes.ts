import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { Data, Estimate, PricingContext } from '../types/estimator'
import type { EstimateSummaryResult, ServiceEstimateInput } from '../types/v1/engines'

export type IntegrationErrorCode = 'unsupportedService' | 'missingProfile' | 'engineFailure' | 'propertyContextUncertain'

export interface ServiceResolution {
  visibleService: string
  serviceId: string | null
  profile: MasterServiceTemplate | null
  manualReviewRequired: boolean
  manualReviewReasons: readonly string[]
}

export interface MappedEstimatorInput {
  engineInput: ServiceEstimateInput
  pricingContext: PricingContext
  warnings: readonly string[]
  manualReviewReasons: readonly string[]
  originalDimensions: string
}

export interface IntegrationMetadata {
  engineVersion: 'v1'
  supportedProfile: boolean
  profileId: string | null
  fallbackUsed: boolean
  errorCode: IntegrationErrorCode | null
  warnings: readonly string[]
  resolutionSource: 'exactSelection' | 'guidedQuestions' | 'description' | 'categoryFallback' | 'legacyFallback'
  descriptionConfidence?: number
  matchedKeywords?: readonly string[]
}

export interface IntegratedEstimateResult {
  estimate: Estimate
  metadata: IntegrationMetadata
  engineSummary: EstimateSummaryResult | null
}

export function projectDetails(data: Data): NonNullable<Estimate['projectDetails']> {
  return {
    summary: data.description,
    selectedService: data.service ?? 'Not selected',
    propertyContext: [data.projectType, data.propertyType].filter(Boolean).join(' — '),
    location: [data.city, data.state, data.zip].filter(Boolean).join(', '),
    photoCount: data.photos.length,
    contact: { name: `${data.firstName} ${data.lastName}`.trim(), email: data.email, phone: data.phone, preferredMethod: data.contact },
  }
}
