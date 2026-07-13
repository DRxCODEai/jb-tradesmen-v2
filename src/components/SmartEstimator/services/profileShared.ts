import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { EstimatorQuestion, EstimatorQuestionEffect, EstimatorQuestionOption, EstimatorQuestionType } from '../templates/estimatorQuestionTemplate'
import type { ServiceModifier } from '../templates/serviceModifierTemplate'
import type { CrewConfiguration } from '../types/v1/company'
import type { PricingConfiguration } from '../types/v1/pricing'
import type { ServiceEquipment, ServiceResearchMetadata } from '../types/v1/service'

export const STANDARD_CREW: CrewConfiguration = {
  defaultSize: COMPANY_STANDARDS.billing.defaultCrewSize,
  minimumSize: 1,
  maximumRecommendedSize: 2,
  secondTechnicianRequired: false,
  secondTechnicianReason: null,
}

export const STANDARD_PRICING: PricingConfiguration = {
  applyTripCharge: COMPANY_STANDARDS.billing.applyTripChargePerVisit,
  materialMarkupPercentage: 0,
  wasteFactorPercentage: 0,
  pricingNotes: ['Preliminary planning range only; final pricing requires review and approval.'],
}

export const STANDARD_EQUIPMENT: ServiceEquipment = {
  typicalEquipment: ['Ordinary hand tools'],
  rentalMayBeRequired: false,
  elevatedAccessPossible: false,
  specialtyEquipmentNotes: [],
}

export const NATIONALLY_INFORMED_RESEARCH: ServiceResearchMetadata = {
  sourceType: 'Nationally informed production assumptions',
  nationalAverageBasis: 'Reasonableness reference only; not an installed-price total.',
  reviewedDate: null,
  reviewedBy: null,
  notes: ['Review against completed JBTRADESMENLLC job data before final production approval.'],
}

export const COMPANY_SCHEDULING_WINDOW = COMPANY_STANDARDS.scheduling.standardSchedulingWindowBusinessDays

export function question(
  id: string,
  label: string,
  type: EstimatorQuestionType,
  affects: readonly EstimatorQuestionEffect[],
  required = false,
  options: readonly EstimatorQuestionOption[] = [],
): EstimatorQuestion {
  return {
    id,
    field: id,
    label,
    helpText: '',
    type,
    required,
    options,
    affects,
    confidenceWeight: required ? 1 : 0.5,
    visibilityConditions: [],
  }
}

export const BASE_CONDITION_MODIFIERS: readonly ServiceModifier[] = [
  { id: 'condition-light', name: 'Light condition', description: 'Light-condition planning adjustment.', conditions: [{ field: 'condition', operator: 'equals', value: 'light' }], effects: { laborMultiplier: 0.85, materialMultiplier: 0.85 }, customerExplanation: 'The supplied condition indicates a lighter repair scope.', internalNotes: [] },
  { id: 'condition-extensive', name: 'Extensive condition', description: 'Extensive-condition planning adjustment.', conditions: [{ field: 'condition', operator: 'equals', value: 'extensive' }], effects: { laborMultiplier: 1.35, materialMultiplier: 1.25 }, customerExplanation: 'The supplied condition indicates more extensive work.', internalNotes: [] },
  { id: 'condition-unknown', name: 'Unknown condition', description: 'Unknown conditions reduce confidence and may require review.', conditions: [{ field: 'condition', operator: 'equals', value: 'unknown' }], effects: { requiresManualReview: true, recommendationsToAdd: ['Provide photos and condition details before final pricing.'] }, customerExplanation: 'The project condition needs confirmation.', internalNotes: [] },
]

export const BASE_ACCESS_MODIFIERS: readonly ServiceModifier[] = [
  { id: 'access-easy', name: 'Easy access', description: 'Easy-access labor adjustment.', conditions: [{ field: 'accessDifficulty', operator: 'equals', value: 'easy' }], effects: { laborMultiplier: 0.95 }, customerExplanation: 'The work area appears readily accessible.', internalNotes: [] },
  { id: 'access-difficult', name: 'Difficult access', description: 'Difficult-access labor and timeline adjustment.', conditions: [{ field: 'accessDifficulty', operator: 'equals', value: 'difficult' }], effects: { laborMultiplier: 1.25, timelineMultiplier: 1.1 }, customerExplanation: 'Restricted access may require additional handling and time.', internalNotes: [] },
  { id: 'access-unknown', name: 'Unknown access', description: 'Unknown access reduces confidence.', conditions: [{ field: 'accessDifficulty', operator: 'equals', value: 'unknown' }], effects: { recommendationsToAdd: ['Confirm access conditions before scheduling.'] }, customerExplanation: 'Access conditions need confirmation.', internalNotes: [] },
]

export const FINISH_MATCHING_MODIFIER: ServiceModifier = {
  id: 'finish-matching',
  name: 'Finish matching',
  description: 'Matching an existing finish requires additional labor and materials.',
  conditions: [{ field: 'finishMatching', operator: 'equals', value: true }],
  effects: { laborMultiplier: 1.1, materialMultiplier: 1.05, recommendationsToAdd: ['Provide clear photos or a finish sample for matching review.'] },
  customerExplanation: 'Matching existing texture, color, or profile may require additional preparation and materials.',
  internalNotes: [],
}

export const OCCUPIED_PROTECTION_MODIFIER: ServiceModifier = {
  id: 'occupied-protection',
  name: 'Occupied-area protection',
  description: 'Protection, staged access, or contents handling is required.',
  conditions: [{ field: 'occupied', operator: 'equals', value: true }, { field: 'occupancyAffectsWork', operator: 'equals', value: true }],
  effects: { laborMultiplier: 1.05, scopeStepsToAdd: ['Coordinate staged access and protect occupied areas.'] },
  customerExplanation: 'Occupied areas may require additional protection or staged access.',
  internalNotes: [],
}

export const ELEVATED_WORK_MODIFIERS: readonly ServiceModifier[] = [
  { id: 'elevated-under-10', name: 'Typical ceiling access', description: 'Typical elevated work below ten feet.', conditions: [{ field: 'ceilingOrElevatedWork', operator: 'equals', value: true }, { field: 'ceilingHeightFeet', operator: 'lessThan', value: 10.01 }], effects: { laborMultiplier: 1.2 }, customerExplanation: 'Elevated positioning requires additional setup and work time.', internalNotes: [] },
  { id: 'elevated-10-to-16', name: 'Elevated work above 10 feet', description: 'Elevated work requiring equipment review.', conditions: [{ field: 'ceilingHeightFeet', operator: 'greaterThan', value: 10 }, { field: 'ceilingHeightFeet', operator: 'lessThan', value: 16.01 }], effects: { laborMultiplier: 1.35, recommendationsToAdd: ['Confirm ladder, scaffold, or lift requirements.'] }, customerExplanation: 'Work above ten feet requires additional access planning.', internalNotes: [] },
  { id: 'elevated-over-16', name: 'Work above 16 feet', description: 'High-access work requires manual review.', conditions: [{ field: 'ceilingHeightFeet', operator: 'greaterThan', value: 16 }], effects: { laborMultiplier: 1.35, requiresManualReview: true, recommendationsToAdd: ['Schedule a high-access equipment and safety review.'] }, customerExplanation: 'Work above sixteen feet requires direct review.', internalNotes: [] },
]
