import { COMPANY_STANDARDS } from '../company/companyStandards'
import { drywallRepair } from '../services/interior/drywallRepair'
import { generalHandymanRepair } from '../services/maintenance/generalHandymanRepair'
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
  const ranges = [drywallTwoVisits.laborHours, drywallTwoVisits.laborCost, drywallTwoVisits.materials, drywallTwoVisits.equipment, drywallTwoVisits.total]

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
  ]

  return { passed: checks.every((check) => check.passed), checks }
}
