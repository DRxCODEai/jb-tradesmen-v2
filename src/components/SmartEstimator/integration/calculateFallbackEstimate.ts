import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { Data, Estimate, PricingContext } from '../types/estimator'
import type { SafetyOverrideResult } from '../types/v1/guardrails'
import type { NumericRange } from '../types/v1/pricing'
import { addRanges, multiplyRange, normalizeRange } from '../utils/v1/rangeMath'
import { roundCurrencyRange } from '../utils/v1/roundCurrency'
import { CATEGORY_FALLBACK_PRICING, FALLBACK_TRIP_CHARGE_PER_VISIT, fallbackLaborRate, type CategoryFallbackDefinition } from './categoryFallbackPricing'
import type { MappedEstimatorInput } from './integrationTypes'
import { projectDetails } from './integrationTypes'
import { INTEGRATED_ESTIMATE_DISCLAIMER } from './mapEstimateResult'

export interface FallbackEstimateOptions {
  reviewReasons: readonly string[]
  serviceName?: string
  safetyOverride?: SafetyOverrideResult | null
  forceEmergency?: boolean
}

function number(value: number): string { return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value) }
function money(value: number): string { return new Intl.NumberFormat('en-US', { style: 'currency', currency: COMPANY_STANDARDS.currency, maximumFractionDigits: 0 }).format(value) }
function moneyRange(range: NumericRange): string { return range.minimum === range.maximum ? money(range.minimum) : `${money(range.minimum)}–${money(range.maximum)}` }
function numericRange(range: NumericRange, unit: string): string { return range.minimum === range.maximum ? `${number(range.minimum)} ${unit}` : `${number(range.minimum)}–${number(range.maximum)} ${unit}` }

function emergencyPricingContext(mapped: MappedEstimatorInput): PricingContext {
  return mapped.engineInput.propertyContext === 'commercial' ? 'Commercial Emergency / After Hours' : 'Residential Emergency / After Hours'
}

function flooringMaterials(definition: CategoryFallbackDefinition, mapped: MappedEstimatorInput): NumericRange {
  const squareFeet = mapped.engineInput.squareFeet
  if (definition.id === 'residentialFlooring' && squareFeet !== undefined) return roundCurrencyRange({ minimum: squareFeet * 2, typical: squareFeet * 5.5, maximum: squareFeet * 9 })
  return normalizeRange(definition.materials)
}

export function selectCategoryFallback(data: Data, mapped: MappedEstimatorInput): CategoryFallbackDefinition {
  const commercial = mapped.engineInput.propertyContext === 'commercial'
  if (data.category === 'Property Assessment' || data.service === 'Property Inspection') return CATEGORY_FALLBACK_PRICING.propertyAssessment
  if (data.service === 'Tenant Improvements') return CATEGORY_FALLBACK_PRICING.commercialTenantImprovement
  if (data.service === 'Appliance Repair') return commercial ? CATEGORY_FALLBACK_PRICING.commercialAppliance : CATEGORY_FALLBACK_PRICING.residentialAppliance
  if (data.service === 'Flooring') return commercial ? CATEGORY_FALLBACK_PRICING.commercialFlooring : CATEGORY_FALLBACK_PRICING.residentialFlooring
  if (data.service === 'Plumbing') return commercial ? CATEGORY_FALLBACK_PRICING.commercialPlumbing : CATEGORY_FALLBACK_PRICING.residentialPlumbing
  if (data.category === 'Remodel' || ['Kitchen Remodeling', 'Bathroom Remodeling', 'Cabinets and Countertops'].includes(data.service ?? '')) return commercial ? CATEGORY_FALLBACK_PRICING.commercialTenantImprovement : CATEGORY_FALLBACK_PRICING.residentialRemodel
  if (data.category === 'Emergency Service' || data.service === 'Emergency Repair') return commercial ? CATEGORY_FALLBACK_PRICING.commercialEmergencyDiagnostic : CATEGORY_FALLBACK_PRICING.residentialEmergencyDiagnostic
  if (data.category === 'Maintenance' || ['Preventative Maintenance', 'Commercial Property Maintenance', 'Rental Turnover'].includes(data.service ?? '')) return commercial ? CATEGORY_FALLBACK_PRICING.commercialMaintenance : CATEGORY_FALLBACK_PRICING.residentialMaintenance
  if (data.service === 'Other') return commercial ? CATEGORY_FALLBACK_PRICING.commercialOther : CATEGORY_FALLBACK_PRICING.residentialOther
  return commercial ? CATEGORY_FALLBACK_PRICING.commercialRepair : CATEGORY_FALLBACK_PRICING.residentialRepair
}

export function emergencyFallback(mapped: MappedEstimatorInput): CategoryFallbackDefinition {
  return mapped.engineInput.propertyContext === 'commercial' ? CATEGORY_FALLBACK_PRICING.commercialEmergencyDiagnostic : CATEGORY_FALLBACK_PRICING.residentialEmergencyDiagnostic
}

export function calculateFallbackEstimate(data: Data, mapped: MappedEstimatorInput, definition: CategoryFallbackDefinition, options: FallbackEstimateOptions): Estimate {
  const forceEmergency = options.forceEmergency || definition.kind === 'emergency'
  const laborRate = fallbackLaborRate(mapped.engineInput.propertyContext, mapped.engineInput.serviceTiming, forceEmergency)
  const laborHours = normalizeRange(definition.laborHours)
  const laborCost = roundCurrencyRange(multiplyRange(laborHours, laborRate))
  const materials = flooringMaterials(definition, mapped)
  const equipment = { minimum: 0, typical: 0, maximum: 0 }
  const visits = normalizeRange(definition.visits)
  const tripCharges = roundCurrencyRange(multiplyRange(visits, FALLBACK_TRIP_CHARGE_PER_VISIT))
  const total = roundCurrencyRange(addRanges(laborCost, tripCharges, materials, equipment))
  const safety = options.safetyOverride
  const reviewReasons = [...new Set(options.reviewReasons)]
  const recommendations = [...new Set([...definition.recommendations, 'Schedule Professional Assessment', 'Request Formal Estimate'])]
  const flooringBasis = definition.id === 'residentialFlooring' && mapped.engineInput.squareFeet !== undefined
    ? [`Materials are calculated at $2–$9 per supplied square foot using ${number(mapped.engineInput.squareFeet)} square feet.`]
    : []

  return {
    laborHours: numericRange(laborHours, 'technician hours'), labor: moneyRange(laborCost), materials: moneyRange(materials), total: moneyRange(total), duration: definition.duration,
    confidence: 'Preliminary', considerations: [...new Set([definition.basisNote, ...reviewReasons])], status: safety ? 'safetyOverride' : 'estimate',
    resultHeading: definition.heading, resultLabel: definition.label, rangeBasisNote: definition.basisNote, serviceName: options.serviceName ?? data.service ?? definition.label,
    applicableLaborRate: laborRate, tripChargeTotal: moneyRange(tripCharges), tripChargePerVisit: FALLBACK_TRIP_CHARGE_PER_VISIT,
    expectedSiteVisits: visits.minimum === visits.maximum ? number(visits.minimum) : `${number(visits.minimum)}–${number(visits.maximum)}`,
    equipmentCostRange: undefined, schedulingWindow: forceEmergency ? 'Direct confirmation required' : `${COMPANY_STANDARDS.scheduling.standardSchedulingWindowBusinessDays.minimum}–${COMPANY_STANDARDS.scheduling.standardSchedulingWindowBusinessDays.maximum} business days`,
    manualReviewRequired: true, manualReviewReasons: reviewReasons, safetyOverride: safety ? { guidance: safety.guidance, reasons: [...safety.reasons] } : undefined,
    pricingContext: forceEmergency ? emergencyPricingContext(mapped) : mapped.pricingContext, fallbackUsed: false, engineVersion: 'v1-category-fallback',
    assumptions: [...definition.assumptions, ...flooringBasis], recommendations, missingInformation: ['Exact scope, quantity, materials, and site conditions require confirmation.'],
    disclaimer: INTEGRATED_ESTIMATE_DISCLAIMER, projectDetails: projectDetails(data),
    calculationRanges: { laborHours, laborCost, tripCharges, materials, equipment, total, visits },
  }
}
