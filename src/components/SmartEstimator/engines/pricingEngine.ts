import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceEstimateInput, PricingEngineResult } from '../types/v1/engines'
import type { NumericRange } from '../types/v1/pricing'
import { createConditionContext, evaluateConditions } from '../utils/v1/evaluateConditions'
import { addFlatAmount, addRanges, clampRangeMinimum, mapRange, multiplyRange, normalizeRange } from '../utils/v1/rangeMath'
import { roundCurrencyRange } from '../utils/v1/roundCurrency'

function selectLaborRate(input: ServiceEstimateInput): number {
  const premiumTiming = input.serviceTiming === 'emergency' || input.serviceTiming === 'afterHours' || input.emergency || input.afterHours
  if (input.propertyContext === 'commercial') {
    return premiumTiming ? COMPANY_STANDARDS.laborRates.commercialEmergency : COMPANY_STANDARDS.laborRates.commercial
  }
  return premiumTiming ? COMPANY_STANDARDS.laborRates.residentialEmergency : COMPANY_STANDARDS.laborRates.residential
}

function inputQuantity(input: ServiceEstimateInput, quantityUnit: string): number {
  const unit = quantityUnit.toLowerCase()
  if (unit.includes('square')) return Math.max(0, input.squareFeet ?? input.quantity ?? 1)
  if (unit.includes('linear')) return Math.max(0, input.linearFeet ?? input.quantity ?? 1)
  if (unit === 'item' || unit.includes('lock') || unit.includes('door') || unit.includes('tile')) return Math.max(0, input.itemCount ?? input.quantity ?? 1)
  return Math.max(0, input.quantity ?? input.itemCount ?? 1)
}

function quantityScale(input: ServiceEstimateInput, profile: MasterServiceTemplate): { quantity: number; factor: number } {
  const quantity = Math.max(1, inputQuantity(input, profile.labor.quantityUnit))
  const baseline = Math.max(1, profile.labor.productionRate?.quantity ?? 1)
  return { quantity, factor: Math.max(1, quantity / baseline) }
}

function baseMaterialRange(input: ServiceEstimateInput, profile: MasterServiceTemplate, quantity: number, factor: number): NumericRange {
  const perUnit = /per|linearFoot|squareFoot|item/i.test(profile.materials.costUnit)
  const scale = perUnit ? quantity : factor
  let range = multiplyRange(profile.materials.costRange, scale)
  const wasteFactor = 1 + Math.max(0, profile.materials.wasteFactorPercentage) / 100
  range = multiplyRange(range, wasteFactor)

  if (input.customerSuppliedMaterials && profile.materials.customerSuppliedAllowed) {
    const consumablesAllowance = Math.max(
      COMPANY_STANDARDS.billing.roundCurrencyToNearest,
      profile.materials.costRange.minimum * scale * wasteFactor,
    )
    range = { minimum: consumablesAllowance, typical: consumablesAllowance, maximum: consumablesAllowance }
  }
  return range
}

export function calculateServicePricing(input: ServiceEstimateInput, profile: MasterServiceTemplate): PricingEngineResult {
  const context = createConditionContext(input)
  const activeModifiers = profile.modifiers.filter((modifier) => evaluateConditions(modifier.conditions, context))
  const { quantity, factor } = quantityScale(input, profile)
  const fixedHours = profile.labor.setupHours + profile.labor.cleanupHours
  let laborHours = addFlatAmount(multiplyRange(profile.labor.baseHours, factor), fixedHours)
  let materials = baseMaterialRange(input, profile, quantity, factor)
  let equipment = profile.equipment.rentalCostRange && (
    input.accessDifficulty === 'difficult' ||
    (input.ceilingHeightFeet ?? 0) > 10 ||
    input.answers.equipmentRequired === true
  ) ? normalizeRange(profile.equipment.rentalCostRange) : { minimum: 0, typical: 0, maximum: 0 }
  let siteVisits = Math.max(1, Math.round(input.siteVisits ?? profile.labor.returnVisits.typical))
  const manualReviewFlags: string[] = []

  for (const modifier of activeModifiers) {
    const effects = modifier.effects
    if (effects.laborMultiplier !== undefined) laborHours = multiplyRange(laborHours, effects.laborMultiplier)
    if (effects.materialMultiplier !== undefined) materials = multiplyRange(materials, effects.materialMultiplier)
    if (effects.equipmentMultiplier !== undefined) equipment = multiplyRange(equipment, effects.equipmentMultiplier)
    if (effects.flatLaborHours !== undefined) laborHours = addFlatAmount(laborHours, effects.flatLaborHours)
    if (effects.flatMaterialCost !== undefined) materials = addFlatAmount(materials, effects.flatMaterialCost)
    if (effects.flatEquipmentCost !== undefined) equipment = addFlatAmount(equipment, effects.flatEquipmentCost)
    if (effects.extraVisits !== undefined) siteVisits += Math.max(0, Math.round(effects.extraVisits))
    if (effects.requiresManualReview) manualReviewFlags.push(modifier.name)
  }

  const minimumLaborHours = Math.max(
    COMPANY_STANDARDS.billing.minimumLaborHours,
    profile.labor.minimumBillableHoursOverride ?? 0,
    profile.pricing.minimumLaborHoursOverride ?? 0,
  )
  laborHours = clampRangeMinimum(laborHours, minimumLaborHours)

  const laborRate = selectLaborRate(input)
  const laborCost = mapRange(laborHours, (hours) => hours * laborRate)
  const tripRate = profile.pricing.tripChargePerVisitOverride ?? COMPANY_STANDARDS.billing.tripChargePerVisit
  const tripCharges = profile.pricing.applyTripCharge ? siteVisits * tripRate : 0
  const tripRange = { minimum: tripCharges, typical: tripCharges, maximum: tripCharges }
  const total = addRanges(laborCost, materials, equipment, tripRange)

  if (profile.pricing.manualReviewThreshold !== undefined && total.maximum >= profile.pricing.manualReviewThreshold) {
    manualReviewFlags.push('Estimated range meets the service manual-review threshold')
  }

  const warnings: string[] = []
  if (input.customerSuppliedMaterials) warnings.push('Customer-supplied materials require verification; consumables and miscellaneous materials remain included.')
  if (input.materialPickupRequired || profile.materials.materialPickupUsuallyRequired) warnings.push('Material pickup requirements should be confirmed before final pricing.')

  return {
    laborHours: normalizeRange(laborHours),
    laborCost: roundCurrencyRange(laborCost),
    tripCharges,
    materials: roundCurrencyRange(materials),
    equipment: roundCurrencyRange(equipment),
    total: roundCurrencyRange(total),
    siteVisits,
    laborRate,
    appliedModifiers: activeModifiers.map(({ id, name }) => ({ id, name })),
    warnings,
    manualReviewFlags: [...new Set(manualReviewFlags)],
  }
}
