import type { EstimatorQuestionValue } from '../../templates/estimatorQuestionTemplate'
import type { PropertyContext, ServiceTiming } from './company'
import type { MinimumMaximumRange, NumericRange } from './pricing'

export type ProjectCondition = 'light' | 'standard' | 'extensive' | 'unknown'
export type AccessDifficulty = 'easy' | 'standard' | 'difficult' | 'unknown'

export interface ServiceEstimateInput {
  serviceId: string
  propertyContext: PropertyContext
  serviceTiming: ServiceTiming
  quantity?: number
  siteVisits?: number
  squareFeet?: number
  linearFeet?: number
  itemCount?: number
  condition: ProjectCondition
  accessDifficulty: AccessDifficulty
  ceilingOrElevatedWork: boolean
  ceilingHeightFeet?: number
  floorLevel?: number
  occupied: boolean
  finishMatching: boolean
  customerSuppliedMaterials: boolean
  materialPickupRequired: boolean
  emergency: boolean
  afterHours: boolean
  answers: Readonly<Record<string, EstimatorQuestionValue>>
  photoCount: number
  descriptionLength: number
  measurementsProvided: boolean
  locationProvided: boolean
  concealedDamagePossible?: boolean
  permitRequirementsResolved?: boolean
  unclassifiedService?: boolean
}

export interface AppliedModifier {
  id: string
  name: string
}

export interface PricingEngineResult {
  laborHours: NumericRange
  laborCost: NumericRange
  tripCharges: number
  materials: NumericRange
  equipment: NumericRange
  total: NumericRange
  siteVisits: number
  laborRate: number
  appliedModifiers: readonly AppliedModifier[]
  warnings: readonly string[]
  manualReviewFlags: readonly string[]
}

export interface TimelineEngineResult {
  technicianLaborHours: NumericRange
  expectedSiteVisits: number
  calendarDurationDays: NumericRange
  dryingOrCuringTimeHours?: NumericRange
  materialLeadTimeDays?: NumericRange
  schedulingWindowBusinessDays: MinimumMaximumRange
  schedulingMessage: string
  manualReviewFlags: readonly string[]
}

export type ConfidenceLabel = 'Preliminary' | 'Moderate' | 'Strong'

export interface ConfidenceEngineResult {
  score: number
  label: ConfidenceLabel
  improvingFactors: readonly string[]
  reducingFactors: readonly string[]
  missingInformation: readonly string[]
}

export interface RecommendationItem {
  category: 'nextStep' | 'relatedService' | 'customerPreparation' | 'manualReview' | 'safetyConsideration'
  text: string
}

export interface EstimateSummaryResult {
  service: {
    id: string
    name: string
    category: string
    trade: string
  }
  propertyContext: PropertyContext
  serviceTiming: ServiceTiming
  laborHours: NumericRange
  laborCost: NumericRange
  tripCharges: number
  materials: NumericRange
  equipment: NumericRange
  total: NumericRange
  expectedSiteVisits: number
  calendarDurationDays: NumericRange
  schedulingWindow: MinimumMaximumRange | 'Direct confirmation required'
  confidence: ConfidenceLabel
  assumptions: readonly string[]
  exclusions: readonly string[]
  scopeSteps: readonly string[]
  recommendations: readonly RecommendationItem[]
  manualReviewFlags: readonly string[]
  disclaimer: string
}
