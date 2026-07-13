export type ServiceModifierValue = string | number | boolean | readonly string[]

export interface ServiceModifierCondition {
  field: string
  operator: 'equals' | 'notEquals' | 'includes' | 'greaterThan' | 'lessThan' | 'exists'
  value?: ServiceModifierValue
}

export interface ServiceModifierEffects {
  laborMultiplier?: number
  materialMultiplier?: number
  equipmentMultiplier?: number
  timelineMultiplier?: number
  flatLaborHours?: number
  flatMaterialCost?: number
  flatEquipmentCost?: number
  extraVisits?: number
  confidenceAdjustment?: number
  requiresManualReview?: boolean
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
