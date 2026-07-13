export type ManualReviewFlag =
  | 'jurisdictionReviewRequired'
  | 'licensingReviewRequired'
  | 'permitReviewRequired'
  | 'electricalProfessionalReviewRequired'
  | 'refrigerantCertificationRequired'
  | 'combustionSafetyReviewRequired'
  | 'lifeSafetySystemReviewRequired'
  | 'utilityCoordinationRequired'
  | 'structuralReviewRequired'
  | 'hazardousMaterialReviewRequired'
  | 'immediateSafetyConcern'

export interface SafetyOverrideDefinition {
  reason: string
  guidance?: string
}

export interface SafetyOverrideResult {
  active: true
  suppressOrdinaryPricing: true
  guidance: string
  reasons: readonly string[]
  manualReviewFlags: readonly ManualReviewFlag[]
}

export interface RegulatedWorkReview {
  flag: ManualReviewFlag
  reason: string
}

export interface GuardrailEngineResult {
  reviews: readonly RegulatedWorkReview[]
  safetyOverride: SafetyOverrideResult | null
}
