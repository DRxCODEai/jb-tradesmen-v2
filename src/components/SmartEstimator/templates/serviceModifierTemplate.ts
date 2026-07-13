import type { NumericRange } from '../types/v1/pricing'
import type { ManualReviewFlag, SafetyOverrideDefinition } from '../types/v1/guardrails'

export type ServiceModifierValue = string | number | boolean | readonly string[]

export interface ServiceModifierCondition {
  field: string
  operator: 'equals' | 'notEquals' | 'includes' | 'greaterThan' | 'lessThan' | 'exists'
  value?: ServiceModifierValue
}

export interface ServiceModifierEffects {
  laborHoursOverride?: NumericRange
  materialCostOverride?: NumericRange
  laborMultiplier?: number
  laborMultiplierRange?: NumericRange
  materialMultiplier?: number
  materialMultiplierRange?: NumericRange
  equipmentMultiplier?: number
  timelineMultiplier?: number
  laborHoursPerUnit?: NumericRange
  laborUnitField?: string
  materialCostPerUnit?: NumericRange
  materialUnitField?: string
  calendarDaysToAdd?: NumericRange
  flatLaborHours?: number
  flatLaborHoursRange?: NumericRange
  flatMaterialCost?: number
  flatMaterialCostRange?: NumericRange
  flatEquipmentCost?: number
  extraVisits?: number
  confidenceAdjustment?: number
  requiresManualReview?: boolean
  manualReviewFlags?: readonly ManualReviewFlag[]
  safetyOverride?: SafetyOverrideDefinition
  recommendationsToAdd?: readonly string[]
  scopeStepsToAdd?: readonly string[]
}

export interface ServiceModifier {
  id: string
  name: string
  description: string
  conditions: readonly ServiceModifierCondition[]
  effects: ServiceModifierEffects
  customerExplanation: string
  internalNotes: readonly string[]
}
