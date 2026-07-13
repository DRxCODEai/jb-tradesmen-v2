import { COMPANY_STANDARDS } from '../company/companyStandards'
import { drywallRepair } from '../services/interior/drywallRepair'
import { generalHandymanRepair } from '../services/maintenance/generalHandymanRepair'
import { luxuryVinylPlankFlooring } from '../services/flooring/luxuryVinylPlankFlooring'
import { tileRepair } from '../services/tile/tileRepair'
import { faucetReplacement } from '../services/plumbing/faucetReplacement'
import { waterHeaterReplacement } from '../services/plumbing/waterHeaterReplacement'
import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceEstimateInput } from '../types/v1/engines'
import type { NumericRange } from '../types/v1/pricing'
import { calculateServicePricing } from './pricingEngine'

export interface EngineValidationCheck {
  name: string
  passed: boolean
}

export interface EngineValidationResult {
  passed: boolean
  checks: readonly EngineValidationCheck[]
}

function representativeInput(overrides: Partial<ServiceEstimateInput> = {}): ServiceEstimateInput {
  return {
    serviceId: 'general-handyman-repair',
    propertyContext: 'residential',
    serviceTiming: 'standard',
    quantity: 1,
    siteVisits: 1,
    condition: 'standard',
    accessDifficulty: 'standard',
    ceilingOrElevatedWork: false,
    occupied: false,
    finishMatching: false,
    customerSuppliedMaterials: false,
    materialPickupRequired: false,
    emergency: false,
    afterHours: false,
    answers: {},
    photoCount: 0,
    descriptionLength: 100,
    measurementsProvided: true,
    locationProvided: true,
    permitRequirementsResolved: true,
    ...overrides,
  }
}

const oneHourFixture: MasterServiceTemplate = {
  ...generalHandymanRepair,
  labor: {
    ...generalHandymanRepair.labor,
    baseHours: { minimum: 0.25, typical: 0.5, maximum: 0.75 },
    setupHours: 0,
    cleanupHours: 0,
    returnVisits: { minimum: 1, typical: 1, maximum: 1 },
  },
  materials: { ...generalHandymanRepair.materials, costRange: { minimum: 0, typical: 0, maximum: 0 }, wasteFactorPercentage: 0 },
}

const fourHourMinimumFixture: MasterServiceTemplate = {
  ...luxuryVinylPlankFlooring,
  labor: {
    ...luxuryVinylPlankFlooring.labor,
    baseHours: { minimum: 0.25, typical: 0.5, maximum: 0.75 },
    setupHours: 0,
    cleanupHours: 0,
  },
}

function ordered(range: NumericRange): boolean {
  return range.minimum <= range.typical && range.typical <= range.maximum
}

function nonnegative(range: NumericRange): boolean {
  return range.minimum >= 0 && range.typical >= 0 && range.maximum >= 0
}

export function validateDeterministicEngines(): EngineValidationResult {
  const residential = calculateServicePricing(representativeInput(), oneHourFixture)
  const commercial = calculateServicePricing(representativeInput({ propertyContext: 'commercial' }), oneHourFixture)
  const residentialEmergency = calculateServicePricing(representativeInput({ serviceTiming: 'emergency', emergency: true }), oneHourFixture)
  const commercialEmergency = calculateServicePricing(representativeInput({ propertyContext: 'commercial', serviceTiming: 'emergency', emergency: true }), oneHourFixture)
  const drywallTwoVisitsInput = representativeInput({ serviceId: 'drywall-repair', siteVisits: 2 })
  const drywallTwoVisits = calculateServicePricing(drywallTwoVisitsInput, drywallRepair)
  const identicalA = calculateServicePricing(drywallTwoVisitsInput, drywallRepair)
  const identicalB = calculateServicePricing(drywallTwoVisitsInput, drywallRepair)
  const lvpInput = representativeInput({ serviceId: 'luxury-vinyl-plank-flooring', squareFeet: 100, quantity: 100 })
  const lvp = calculateServicePricing(lvpInput, luxuryVinylPlankFlooring)
  const lvpMinimumOverride = calculateServicePricing(lvpInput, fourHourMinimumFixture)
  const suppliedLvp = calculateServicePricing({ ...lvpInput, customerSuppliedMaterials: true }, luxuryVinylPlankFlooring)
  const tileTwoVisits = calculateServicePricing(representativeInput({ serviceId: 'tile-repair', itemCount: 1, siteVisits: 2 }), tileRepair)
  const residentialFaucet = calculateServicePricing(representativeInput({ serviceId: 'faucet-replacement', answers: { faucetType: 'bathroom' } }), faucetReplacement)
  const commercialFaucet = calculateServicePricing(representativeInput({ serviceId: 'faucet-replacement', propertyContext: 'commercial', answers: { faucetType: 'commercial' } }), faucetReplacement)
  const residentialEmergencyPlumbing = calculateServicePricing(representativeInput({ serviceId: 'faucet-replacement', serviceTiming: 'emergency', emergency: true }), faucetReplacement)
  const commercialEmergencyPlumbing = calculateServicePricing(representativeInput({ serviceId: 'faucet-replacement', propertyContext: 'commercial', serviceTiming: 'emergency', emergency: true }), faucetReplacement)
  const waterHeater = calculateServicePricing(representativeInput({ serviceId: 'water-heater-replacement', answers: { fuelType: 'electric' } }), waterHeaterReplacement)
  const deterministicLvpA = calculateServicePricing(lvpInput, luxuryVinylPlankFlooring)
  const deterministicLvpB = calculateServicePricing(lvpInput, luxuryVinylPlankFlooring)
  const phase2BRanges = [lvp.laborHours, lvp.laborCost, lvp.materials, lvp.equipment, lvp.total, suppliedLvp.materials, tileTwoVisits.total, residentialFaucet.total, commercialFaucet.total, waterHeater.total]
  const ranges = [drywallTwoVisits.laborHours, drywallTwoVisits.laborCost, drywallTwoVisits.materials, drywallTwoVisits.equipment, drywallTwoVisits.total, ...phase2BRanges]

  const checks: EngineValidationCheck[] = [
    { name: 'Residential one-hour minimum is approved labor plus one trip charge', passed: residential.laborCost.minimum === COMPANY_STANDARDS.laborRates.residential && residential.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit },
    { name: 'Commercial one-hour minimum is approved labor plus one trip charge', passed: commercial.laborCost.minimum === COMPANY_STANDARDS.laborRates.commercial && commercial.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit },
    { name: 'Residential emergency one-hour minimum uses the approved emergency rate', passed: residentialEmergency.laborCost.minimum === COMPANY_STANDARDS.laborRates.residentialEmergency && residentialEmergency.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit },
    { name: 'Commercial emergency one-hour minimum uses the approved emergency rate', passed: commercialEmergency.laborCost.minimum === COMPANY_STANDARDS.laborRates.commercialEmergency && commercialEmergency.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit },
    { name: 'Two-visit drywall repair applies two trip charges', passed: drywallTwoVisits.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit * 2 },
    { name: 'Identical inputs produce identical outputs', passed: JSON.stringify(identicalA) === JSON.stringify(identicalB) },
    { name: 'No calculated range is negative', passed: ranges.every(nonnegative) },
    { name: 'Low range never exceeds typical', passed: ranges.every((range) => range.minimum <= range.typical) },
    { name: 'Typical range never exceeds high', passed: ranges.every(ordered) },
    { name: '100-square-foot residential LVP applies its service minimum, one trip, and materials', passed: lvp.laborHours.minimum >= 4 && lvp.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit && lvp.materials.minimum > 0 },
    { name: 'Service-specific four-hour minimum overrides the company one-hour minimum', passed: lvpMinimumOverride.laborHours.minimum === 4 },
    { name: 'Customer-supplied flooring retains consumables and accessories', passed: suppliedLvp.materials.minimum > 0 },
    { name: 'Two-visit tile repair applies two trip charges', passed: tileTwoVisits.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit * 2 },
    { name: 'Standard residential faucet replacement uses the residential rate', passed: residentialFaucet.laborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Standard commercial faucet replacement uses the commercial rate without a multiplier', passed: commercialFaucet.laborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'Residential emergency plumbing uses the approved emergency rate without a multiplier', passed: residentialEmergencyPlumbing.laborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'Commercial emergency plumbing uses the approved emergency rate without a multiplier', passed: commercialEmergencyPlumbing.laborRate === COMPANY_STANDARDS.laborRates.commercialEmergency },
    { name: 'Water-heater replacement enforces at least four labor hours', passed: waterHeater.laborHours.minimum >= 4 },
    { name: 'Phase 2B identical inputs produce identical outputs', passed: JSON.stringify(deterministicLvpA) === JSON.stringify(deterministicLvpB) },
    { name: 'Phase 2B low ranges never exceed typical ranges', passed: phase2BRanges.every((range) => range.minimum <= range.typical) },
    { name: 'Phase 2B typical ranges never exceed high ranges', passed: phase2BRanges.every(ordered) },
    { name: 'Phase 2B values are nonnegative', passed: phase2BRanges.every(nonnegative) && tileTwoVisits.tripCharges >= 0 },
  ]

  return { passed: checks.every((check) => check.passed), checks }
}
