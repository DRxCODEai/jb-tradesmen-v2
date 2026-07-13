import type { EstimatorQuestion } from '../../templates/estimatorQuestionTemplate'
import type { ServiceModifier } from '../../templates/serviceModifierTemplate'
import type { CrewConfiguration, PropertyContext } from './company'
import type { NumericRange, PricingConfiguration } from './pricing'
import type { ServiceTimeline } from './timeline'

export interface ServiceIdentity {
  id: string
  slug: string
  version: string
  name: string
  shortName: string
  description: string
  category: string
  trade: string
  tags: readonly string[]
}

export interface ServiceAvailability {
  residential: boolean
  commercial: boolean
  emergencyEligible: boolean
  afterHoursEligible: boolean
  active: boolean
}

export interface ProductionRate {
  quantity: number
  unit: string
  laborHours: number
  unitsPerTechnicianHour?: NumericRange
}

export interface ServiceLabor {
  baseHours: NumericRange
  quantityUnit: string
  setupHours: number
  cleanupHours: number
  productionRate?: ProductionRate
  returnVisits: NumericRange
  minimumBillableHoursOverride?: number
}

export interface ServiceMaterials {
  costRange: NumericRange
  costUnit: string
  typicalMaterials: readonly string[]
  wasteFactorPercentage: number
  customerSuppliedAllowed: boolean
  materialPickupUsuallyRequired: boolean
  specialOrderPossible: boolean
}

export interface ServiceEquipment {
  typicalEquipment: readonly string[]
  rentalMayBeRequired: boolean
  rentalCostRange?: NumericRange
  elevatedAccessPossible: boolean
  specialtyEquipmentNotes: readonly string[]
}

export interface ServiceConfidence {
  improvesConfidence: readonly string[]
  reducesConfidence: readonly string[]
  requiredForStrongConfidence: readonly string[]
}

export interface ServiceScopeOfWork {
  standardSteps: readonly string[]
  conditionalSteps: readonly string[]
  cleanupSteps: readonly string[]
}

export interface ServiceRecommendations {
  relatedServices: readonly string[]
  customerPreparation: readonly string[]
  professionalReviewTriggers: readonly string[]
}

export interface PermitAndCodeRequirements {
  permitMayBeRequired: boolean
  inspectionMayBeRequired: boolean
  licensedTradeMayBeRequired: boolean
  jurisdictionReviewRequired: boolean
  notes: readonly string[]
}

export interface ServiceResearchMetadata {
  sourceType: string
  nationalAverageBasis: string
  reviewedDate: string | null
  reviewedBy: string | null
  notes: readonly string[]
}

export interface ServiceCategoryDefinition {
  id: string
  name: string
  description: string
  supportedPropertyContexts: readonly PropertyContext[]
  commonTrades: readonly string[]
  displayOrder: number
}

export interface ServiceFoundation {
  identity: ServiceIdentity
  availability: ServiceAvailability
  crew: CrewConfiguration
  labor: ServiceLabor
  materials: ServiceMaterials
  equipment: ServiceEquipment
  timeline: ServiceTimeline
  pricing: PricingConfiguration
  estimatorQuestions: readonly EstimatorQuestion[]
  modifiers: readonly ServiceModifier[]
  confidence: ServiceConfidence
  scopeOfWork: ServiceScopeOfWork
  recommendations: ServiceRecommendations
  assumptions: readonly string[]
  exclusions: readonly string[]
  permitsAndCode: PermitAndCodeRequirements
  researchMetadata: ServiceResearchMetadata
}
