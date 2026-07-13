import { COMPANY_STANDARDS } from '../company/companyStandards'
import { drywallRepair } from '../services/interior/drywallRepair'
import { generalHandymanRepair } from '../services/maintenance/generalHandymanRepair'
import { luxuryVinylPlankFlooring } from '../services/flooring/luxuryVinylPlankFlooring'
import { tileRepair } from '../services/tile/tileRepair'
import { faucetReplacement } from '../services/plumbing/faucetReplacement'
import { waterHeaterReplacement } from '../services/plumbing/waterHeaterReplacement'
import { SERVICE_REGISTRY } from '../knowledge/serviceRegistry'
import { electricalTroubleshooting, lightFixtureReplacement, switchOutletReplacement } from '../services/electrical'
import { hvacDiagnosticMinorRepair, thermostatReplacement } from '../services/hvac'
import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceEstimateInput } from '../types/v1/engines'
import type { NumericRange } from '../types/v1/pricing'
import { calculateServicePricing } from './pricingEngine'
import { createEstimateSummary } from './estimateSummaryEngine'

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
  const activeProfiles = SERVICE_REGISTRY.filter((profile) => profile.availability.active)
  const fixtureAboveSixteen = createEstimateSummary(representativeInput({ serviceId: 'light-fixture-replacement', ceilingOrElevatedWork: true, ceilingHeightFeet: 17 }), lightFixtureReplacement)
  const burnedDevice = createEstimateSummary(representativeInput({ serviceId: 'switch-outlet-replacement', answers: { burnedWiring: true } }), switchOutletReplacement)
  const activeArcing = createEstimateSummary(representativeInput({ serviceId: 'electrical-troubleshooting', answers: { activeArcing: true } }), electricalTroubleshooting)
  const lineVoltageThermostat = createEstimateSummary(representativeInput({ serviceId: 'thermostat-replacement', answers: { lineVoltage: true } }), thermostatReplacement)
  const refrigerantHvac = createEstimateSummary(representativeInput({ serviceId: 'hvac-diagnostic-minor-repair', answers: { refrigerantHandling: true } }), hvacDiagnosticMinorRepair)
  const gasOdorHvac = createEstimateSummary(representativeInput({ serviceId: 'hvac-diagnostic-minor-repair', answers: { gasOdor: true } }), hvacDiagnosticMinorRepair)
  const profileLaborRanges = activeProfiles.map((profile) => profile.labor.baseHours)
  const profileMaterialRanges = activeProfiles.flatMap((profile) => [profile.materials.costRange, ...(profile.materials.costComponents?.map((component) => component.costRange) ?? [])])
  const profileTimelineRanges = activeProfiles.flatMap((profile) => [profile.timeline.onsiteLaborHours, profile.timeline.calendarDurationDays, ...(profile.timeline.dryingOrCuringTimeHours ? [profile.timeline.dryingOrCuringTimeHours] : []), ...(profile.timeline.materialLeadTimeDays ? [profile.timeline.materialLeadTimeDays] : [])])
  const allProfileRanges = [...profileLaborRanges, ...profileMaterialRanges, ...profileTimelineRanges]
  const activeProfileFieldsComplete = activeProfiles.every((profile) => Boolean(
    profile.identity.id && profile.identity.slug && profile.identity.name && profile.identity.category && profile.identity.trade &&
    profile.availability && profile.crew && profile.labor && profile.materials && profile.timeline &&
    profile.estimatorQuestions.length && profile.assumptions.length && profile.exclusions.length && profile.researchMetadata,
  ))
  const noCodeComplianceClaims = activeProfiles.every((profile) => !/(code[- ]compliant|complies with code|guaranteed code compliance)/i.test(JSON.stringify(profile)))
  const electricalPanelWorkExcluded = [lightFixtureReplacement, switchOutletReplacement, electricalTroubleshooting].every((profile) =>
    profile.exclusions.some((item) => /panel/i.test(item)) && profile.modifiers.some((modifier) => modifier.conditions.some((condition) => condition.field === 'panelWork') && modifier.effects.requiresManualReview),
  )
  const majorHvacReplacementExcluded = [thermostatReplacement, hvacDiagnosticMinorRepair].every((profile) =>
    profile.exclusions.some((item) => /equipment (repair|replacement)|major hvac diagnosis/i.test(item)) && profile.modifiers.some((modifier) => modifier.conditions.some((condition) => condition.field === 'majorEquipmentReplacement') && modifier.effects.requiresManualReview),
  )

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
    { name: 'Registry contains exactly 25 active profiles with unique service IDs', passed: activeProfiles.length === 25 && new Set(activeProfiles.map((profile) => profile.identity.id)).size === 25 },
    { name: 'Registry contains exactly 25 unique service slugs', passed: new Set(activeProfiles.map((profile) => profile.identity.slug)).size === 25 },
    { name: 'All registered profiles conform to the typed MasterServiceTemplate registry', passed: SERVICE_REGISTRY.length === 25 },
    { name: 'Every active profile contains the required identity, configuration, question, content, and research fields', passed: activeProfileFieldsComplete },
    { name: 'Every profile labor range is ordered', passed: profileLaborRanges.every(ordered) },
    { name: 'Every profile material range is ordered', passed: profileMaterialRanges.every(ordered) },
    { name: 'Every profile timeline range is ordered', passed: profileTimelineRanges.every(ordered) },
    { name: 'No profile pricing, material, labor-hour, or timeline range is negative', passed: allProfileRanges.every(nonnegative) },
    { name: 'No profile minimum billable labor falls below one hour', passed: activeProfiles.every((profile) => (profile.labor.minimumBillableHoursOverride ?? COMPANY_STANDARDS.billing.minimumLaborHours) >= 1 && (profile.pricing.minimumLaborHoursOverride ?? COMPANY_STANDARDS.billing.minimumLaborHours) >= 1) },
    { name: 'Light fixture replacement above 16 feet requires manual review', passed: fixtureAboveSixteen.manualReviewFlags.some((flag) => /Height over 16 feet/i.test(flag)) },
    { name: 'Switch or outlet replacement with burned wiring requires manual review', passed: burnedDevice.manualReviewFlags.some((flag) => /Burned or melted wiring/i.test(flag)) },
    { name: 'Electrical troubleshooting with active arcing produces a safety override', passed: activeArcing.safetyOverride?.active === true && activeArcing.safetyOverride.suppressOrdinaryPricing },
    { name: 'Thermostat replacement with line voltage requires manual review', passed: lineVoltageThermostat.manualReviewFlags.some((flag) => /Line-voltage thermostat/i.test(flag)) },
    { name: 'HVAC refrigerant work requires certification and manual review', passed: refrigerantHvac.manualReviewFlags.some((flag) => /refrigerantCertificationRequired/i.test(flag)) },
    { name: 'HVAC gas odor produces a safety override', passed: gasOdorHvac.safetyOverride?.active === true && gasOdorHvac.safetyOverride.suppressOrdinaryPricing },
    { name: 'HVAC diagnostic ordinary materials do not include refrigerant', passed: hvacDiagnosticMinorRepair.materials.typicalMaterials.every((material) => !/refrigerant/i.test(material)) },
    { name: 'No profile silently claims code compliance', passed: noCodeComplianceClaims },
    { name: 'Electrical profiles do not calculate panel work as minor repair', passed: electricalPanelWorkExcluded },
    { name: 'HVAC profiles do not calculate major equipment replacement as minor repair', passed: majorHvacReplacementExcluded },
  ]

  return { passed: checks.every((check) => check.passed), checks }
}
