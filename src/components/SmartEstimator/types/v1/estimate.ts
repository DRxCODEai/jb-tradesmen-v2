import type { PropertyContext, ServiceTiming } from './company'
import type { EstimateCostRange } from './pricing'

export type EstimateConfidence = 'preliminary' | 'moderate' | 'strong'

export interface EstimateInput {
  serviceId: string
  propertyContext: PropertyContext
  serviceTiming: ServiceTiming
  quantity: number
  siteVisits: number
  answers: Readonly<Record<string, string | number | boolean | readonly string[]>>
}

export interface EstimateBreakdown {
  labor: EstimateCostRange
  tripCharges: EstimateCostRange
  materials: EstimateCostRange
  equipment: EstimateCostRange
  modifiers: EstimateCostRange
  total: EstimateCostRange
}

export interface EstimateResult {
  serviceId: string
  breakdown: EstimateBreakdown
  confidence: EstimateConfidence
  scopeOfWork: readonly string[]
  recommendations: readonly string[]
  assumptions: readonly string[]
  requiresManualReview: boolean
}
