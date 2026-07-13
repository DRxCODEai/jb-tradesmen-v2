import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceEstimateInput, PricingEngineResult } from '../types/v1/engines'
import type { NumericRange } from '../types/v1/pricing'
import { createConditionContext, evaluateConditions, type ConditionContext } from '../utils/v1/evaluateConditions'
import { addFlatAmount, addRanges, clampRangeMinimum, mapRange, multiplyRange, multiplyRanges, normalizeRange } from '../utils/v1/rangeMath'
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

function componentScale(costUnit: 'perProject' | 'perSquareFoot' | 'perLinearFoot' | 'perItem', input: ServiceEstimateInput): number {
  if (costUnit === 'perSquareFoot') return Math.max(1, input.squareFeet ?? input.quantity ?? 1)
  if (costUnit === 'perLinearFoot') return Math.max(1, input.linearFeet ?? input.quantity ?? 1)
  if (costUnit === 'perItem') return Math.max(1, input.itemCount ?? input.quantity ?? 1)
  return 1
}

function baseMaterialRange(input: ServiceEstimateInput, profile: MasterServiceTemplate, quantity: number, factor: number, context: ConditionContext): NumericRange {
  if (profile.materials.costComponents?.length) {
    const wasteFactor = 1 + Math.max(0, profile.materials.wasteFactorPercentage) / 100
    const components = profile.materials.costComponents
      .filter((component) => !component.conditions || evaluateConditions(component.conditions, context))
      .filter((component) => !(input.customerSuppliedMaterials && component.customerSuppliedEligible))
      .map((component) => {
        const scale = componentScale(component.costUnit, input)
        const range = multiplyRange(component.costRange, scale)
        return component.applyWasteFactor ? multiplyRange(range, wasteFactor) : range
      })
    const combined = addRanges(...components)
    if (input.customerSuppliedMaterials && combined.maximum === 0) {
      const allowance = COMPANY_STANDARDS.billing.roundCurrencyToNearest
      return { minimum: allowance, typical: allowance, maximum: allowance }
    }
    return combined
  }

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
  let materials = baseMaterialRange(input, profile, quantity, factor, context)
  let equipment = profile.equipment.rentalCostRange && (
    input.accessDifficulty === 'difficult' ||
    (input.ceilingHeightFeet ?? 0) > 10 ||
    input.answers.equipmentRequired === true
  ) ? normalizeRange(profile.equipment.rentalCostRange) : { minimum: 0, typical: 0, maximum: 0 }
  let siteVisits = Math.max(1, Math.round(input.siteVisits ?? profile.labor.returnVisits.typical))
  const manualReviewFlags: string[] = []

  for (const modifier of activeModifiers) {
    const effects = modifier.effects
    if (effects.laborHoursOverride !== undefined) laborHours = addFlatAmount(multiplyRange(effects.laborHoursOverride, factor), fixedHours)
    if (effects.materialCostOverride !== undefined) materials = normalizeRange(effects.materialCostOverride)
    if (effects.laborMultiplier !== undefined) laborHours = multiplyRange(laborHours, effects.laborMultiplier)
    if (effects.laborMultiplierRange !== undefined) laborHours = multiplyRanges(laborHours, effects.laborMultiplierRange)
    if (effects.materialMultiplier !== undefined) materials = multiplyRange(materials, effects.materialMultiplier)
    if (effects.materialMultiplierRange !== undefined) materials = multiplyRanges(materials, effects.materialMultiplierRange)
    if (effects.equipmentMultiplier !== undefined) equipment = multiplyRange(equipment, effects.equipmentMultiplier)
    if (effects.laborHoursPerUnit !== undefined && effects.laborUnitField) {
      const units = context[effects.laborUnitField]
      if (typeof units === 'number') laborHours = addRanges(laborHours, multiplyRange(effects.laborHoursPerUnit, Math.max(0, units)))
    }
    if (effects.materialCostPerUnit !== undefined && effects.materialUnitField) {
      const units = context[effects.materialUnitField]
      if (typeof units === 'number') materials = addRanges(materials, multiplyRange(effects.materialCostPerUnit, Math.max(0, units)))
    }
    if (effects.flatLaborHours !== undefined) laborHours = addFlatAmount(laborHours, effects.flatLaborHours)
    if (effects.flatLaborHoursRange !== undefined) laborHours = addRanges(laborHours, effects.flatLaborHoursRange)
    if (effects.flatMaterialCost !== undefined) materials = addFlatAmount(materials, effects.flatMaterialCost)
    if (effects.flatMaterialCostRange !== undefined) materials = addRanges(materials, effects.flatMaterialCostRange)
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
  const laborCost = roundCurrencyRange(mapRange(laborHours, (hours) => hours * laborRate))
  materials = roundCurrencyRange(materials)
  equipment = roundCurrencyRange(equipment)
  const tripRate = profile.pricing.tripChargePerVisitOverride ?? COMPANY_STANDARDS.billing.tripChargePerVisit
  const tripCharges = profile.pricing.applyTripCharge ? siteVisits * tripRate : 0
  const tripRange = { minimum: tripCharges, typical: tripCharges, maximum: tripCharges }
  const total = roundCurrencyRange(addRanges(laborCost, materials, equipment, tripRange))

  if (profile.pricing.manualReviewThreshold !== undefined && total.maximum >= profile.pricing.manualReviewThreshold) {
    manualReviewFlags.push('Estimated range meets the service manual-review threshold')
  }

  const warnings: string[] = []
  if (input.customerSuppliedMaterials) warnings.push('Customer-supplied materials require verification; consumables and miscellaneous materials remain included.')
  if (input.materialPickupRequired || profile.materials.materialPickupUsuallyRequired) warnings.push('Material pickup requirements should be confirmed before final pricing.')

  return {
    laborHours: normalizeRange(laborHours),
    laborCost,
    tripCharges,
    materials,
    equipment,
    total,
    siteVisits,
    laborRate,
    appliedModifiers: activeModifiers.map(({ id, name }) => ({ id, name })),
    warnings,
    manualReviewFlags: [...new Set(manualReviewFlags)],
  }
}
