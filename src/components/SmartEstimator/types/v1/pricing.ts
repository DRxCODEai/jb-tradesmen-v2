export interface NumericRange {
  minimum: number
  typical: number
  maximum: number
}

export interface MinimumMaximumRange {
  minimum: number
  maximum: number
}

export interface PricingConfiguration {
  applyTripCharge: boolean
  tripChargePerVisitOverride?: number
  minimumLaborHoursOverride?: number
  materialMarkupPercentage: number
  wasteFactorPercentage: number
  manualReviewThreshold?: number
  pricingNotes: readonly string[]
}

export interface EstimateCostRange {
  minimum: number
  maximum: number
  currency: string
}
