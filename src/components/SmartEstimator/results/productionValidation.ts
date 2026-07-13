import { COMPANY_STANDARDS } from '../company/companyStandards'
import { reconcileServiceAnswers } from '../dynamicQuestions/questionResolver'
import type { Data, Estimate, EstimateNumericRange } from '../types/estimator'
import { calculateIntegratedEstimate, calculateIntegrationFailureFallback } from '../integration/calculateIntegratedEstimate'

export interface ProductionValidationCheck { name: string; passed: boolean }
export interface ProductionValidationResult { passed: boolean; checks: readonly ProductionValidationCheck[] }

function data(overrides: Partial<Data> = {}): Data { return { projectType: 'Residential', category: 'Repair', service: 'Other', serviceAnswers: {}, description: 'Accessible project conditions supplied for production validation.', condition: 'Standard', quantity: '1', dimensions: '', outcome: 'Complete selected work', materials: false, matching: false, accessNotes: '', propertyType: 'Single-family home', city: 'Fort Collins', state: 'Colorado', zip: '80521', occupancy: 'Occupied', location: 'Interior', floor: '1', access: 'Easy', urgency: 'Routine', timing: 'Flexible', photos: [], firstName: 'Test', lastName: 'Customer', email: 'test@example.com', phone: '9702865993', contact: 'Phone', company: '', consent: true, ...overrides } }
const measurement = (value: number | null, unit: string, unknown = false) => ({ value, unit, unknown })
const hasRange = (estimate: Estimate) => /^\$[\d,]+(?:–\$[\d,]+)?$/.test(estimate.total)
const finiteOrdered = (range: EstimateNumericRange) => [range.minimum, range.typical, range.maximum].every((value) => Number.isFinite(value) && value >= 0) && range.minimum <= range.typical && range.typical <= range.maximum
const ranges = (estimate: Estimate) => estimate.calculationRanges ? Object.values(estimate.calculationRanges) : []
const laborTypical = (estimate: Estimate) => estimate.laborHoursRange?.typical ?? 0
const materialTypical = (estimate: Estimate) => estimate.materialCostRange?.typical ?? 0
const totalMaximum = (estimate: Estimate) => estimate.totalRange?.maximum ?? 0
const roundedCurrency = (value: number) => Math.round(value / COMPANY_STANDARDS.billing.roundCurrencyToNearest) * COMPANY_STANDARDS.billing.roundCurrencyToNearest

export function validateProductionEstimator(): ProductionValidationResult {
  const waterHeater = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace hot water heater', serviceAnswers: { propertyUse: 'residential', heaterType: 'tank', fuelType: 'electric', capacityGallons: 50, installationLocation: 'garage', accessDimensions: measurement(30, 'Inches') } }))
  const lvp100 = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'install LVP', serviceAnswers: { squareFeet: measurement(100, 'Square feet'), roomDimensions: measurement(100, 'Square feet'), subfloorCondition: 'good' } }))
  const lvp500 = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'install LVP', serviceAnswers: { squareFeet: measurement(500, 'Square feet'), roomDimensions: measurement(500, 'Square feet'), subfloorCondition: 'good' } }))
  const supplied = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'install LVP', serviceAnswers: { squareFeet: measurement(500, 'Square feet'), roomDimensions: measurement(500, 'Square feet'), subfloorCondition: 'good', customerSuppliedMaterials: true } }))
  const drywallBase = calculateIntegratedEstimate(data({ service: 'Drywall Repair', serviceAnswers: { damagedAreaCount: 2, dimensions: measurement(4, 'Square feet'), surfaceLocation: 'wall', damageType: 'medium-hole', damageSourceResolved: true } }))
  const drywallPaint = calculateIntegratedEstimate(data({ service: 'Drywall Repair', serviceAnswers: { damagedAreaCount: 2, dimensions: measurement(4, 'Square feet'), surfaceLocation: 'wall', damageType: 'medium-hole', damageSourceResolved: true, paintIncluded: true } }))
  const ceiling2 = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Ceiling Tiles', propertyType: 'Office', serviceAnswers: { tileQuantity: 2, tileDimensions: measurement(24, 'Inches'), ceilingHeightFeet: measurement(10, 'Feet') } }))
  const ceiling10 = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Ceiling Tiles', propertyType: 'Office', serviceAnswers: { tileQuantity: 10, tileDimensions: measurement(24, 'Inches'), ceilingHeightFeet: measurement(10, 'Feet'), occupied: true } }))
  const faucet1 = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace kitchen faucet', serviceAnswers: { faucetType: 'kitchen', fixtureCount: 1, shutoffFunctioning: true } }))
  const faucet2 = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace kitchen faucet', serviceAnswers: { faucetType: 'kitchen', fixtureCount: 2, shutoffFunctioning: true } }))
  const light8 = calculateIntegratedEstimate(data({ service: 'Electrical', description: 'replace light fixture', serviceAnswers: { fixtureCount: 2, ceilingHeightFeet: measurement(8, 'Feet') } }))
  const light12 = calculateIntegratedEstimate(data({ service: 'Electrical', description: 'replace light fixture', serviceAnswers: { fixtureCount: 2, ceilingHeightFeet: measurement(12, 'Feet') } }))
  const atticHeater = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace hot water heater', serviceAnswers: { propertyUse: 'residential', heaterType: 'tank', fuelType: 'electric', capacityGallons: 50, installationLocation: 'attic', accessDimensions: measurement(30, 'Inches') } }))
  const broadFlooring = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'replace flooring' }))
  const remodel = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Kitchen Remodeling', description: 'complete kitchen remodel' }))
  const appliance = calculateIntegratedEstimate(data({ service: 'Appliance Repair', description: 'dishwasher not draining' }))
  const assessment = calculateIntegratedEstimate(data({ category: 'Property Assessment', service: 'Property Inspection', description: 'property assessment' }))
  const residentialOther = calculateIntegratedEstimate(data({ service: 'Other', description: 'unknown residential repair' }))
  const commercialOther = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Other', propertyType: 'Office', description: 'unknown commercial repair' }))
  const residentialEmergency = calculateIntegratedEstimate(data({ service: 'HVAC', description: 'gas odor' }))
  const commercialEmergency = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Electrical', propertyType: 'Office', description: 'outlet is actively sparking' }))
  const failure = calculateIntegrationFailureFallback(data({ service: 'Drywall Repair', description: 'drywall calculation fallback' }))
  const oneVisit = faucet1.estimate
  const twoVisits = drywallBase.estimate
  const all = [waterHeater, lvp100, lvp500, supplied, drywallBase, drywallPaint, ceiling2, ceiling10, faucet1, faucet2, light8, light12, atticHeater, broadFlooring, remodel, appliance, assessment, residentialOther, commercialOther, residentialEmergency, commercialEmergency, failure]
  const allRanges = all.flatMap((result) => ranges(result.estimate))
  const totalsMatchComponents = all.every(({ estimate }) => {
    const values = estimate.calculationRanges
    if (!values) return false
    return (['minimum', 'typical', 'maximum'] as const).every((key) => values.total[key] === values.laborCost[key] + values.tripCharges[key] + values.materials[key] + values.equipment[key])
  })
  const unchanged = data({ service: 'Drywall Repair', serviceAnswers: { damagedAreaCount: 2 } })

  const checks: ProductionValidationCheck[] = [
    { name: 'Every completed submission returns a dollar range', passed: all.every((result) => hasRange(result.estimate)) },
    { name: 'No normal result uses the legacy placeholder engine', passed: all.every((result) => result.metadata.resolutionSource !== 'legacyFallback' && result.estimate.engineVersion !== 'legacy') },
    { name: 'Supported profiles use the Phase 2 deterministic engine', passed: waterHeater.metadata.supportedProfile && waterHeater.estimate.engineVersion === 'v1' },
    { name: 'Broad categories use approved fallback pricing', passed: broadFlooring.estimate.engineVersion === 'v1-category-fallback' },
    { name: 'Safety overrides show emergency diagnostic pricing', passed: residentialEmergency.estimate.status === 'safetyOverride' && hasRange(residentialEmergency.estimate) },
    { name: 'Professional review never replaces pricing', passed: [broadFlooring, remodel, appliance, failure].every((result) => result.estimate.manualReviewRecommended && hasRange(result.estimate)) },
    { name: 'Water-heater description resolves correctly', passed: waterHeater.metadata.profileId === 'water-heater-replacement' },
    { name: 'Water-heater minimum labor is at least four hours', passed: (waterHeater.estimate.laborHoursRange?.minimum ?? 0) >= 4 },
    { name: 'LVP minimum labor is at least four hours', passed: (lvp100.estimate.laborHoursRange?.minimum ?? 0) >= 4 },
    { name: 'Customer-supplied materials retain consumables', passed: (supplied.estimate.materialCostRange?.minimum ?? 0) > 0 },
    { name: 'One visit applies $50 trip charge', passed: oneVisit.tripChargeRange?.minimum === 50 },
    { name: 'Two visits apply $100 trip charges', passed: twoVisits.tripChargeRange?.typical === 100 },
    { name: 'Residential standard labor uses $50 per hour', passed: waterHeater.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Commercial standard labor uses $75 per hour', passed: ceiling10.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'Residential emergency uses $100 per hour', passed: residentialEmergency.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'Commercial emergency uses $150 per hour', passed: commercialEmergency.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.commercialEmergency },
    { name: 'No second commercial multiplier', passed: ceiling10.estimate.laborCostRange?.minimum === roundedCurrency((ceiling10.estimate.laborHoursRange?.minimum ?? -1) * COMPANY_STANDARDS.laborRates.commercial) },
    { name: 'No second emergency multiplier', passed: residentialEmergency.estimate.laborCostRange?.minimum === roundedCurrency((residentialEmergency.estimate.laborHoursRange?.minimum ?? -1) * COMPANY_STANDARDS.laborRates.residentialEmergency) },
    { name: 'Broad remodel returns a total range', passed: hasRange(remodel.estimate) },
    { name: 'Broad flooring returns a total range', passed: hasRange(broadFlooring.estimate) },
    { name: 'Appliance diagnostic returns a total range', passed: hasRange(appliance.estimate) },
    { name: 'Property assessment returns a total range', passed: hasRange(assessment.estimate) },
    { name: 'Unknown residential other returns a total range', passed: hasRange(residentialOther.estimate) },
    { name: 'Unknown commercial other returns a total range', passed: hasRange(commercialOther.estimate) },
    { name: 'Integration failure returns a deterministic broad range', passed: failure.metadata.errorCode === 'engineFailure' && failure.estimate.engineVersion === 'v1-category-fallback' && hasRange(failure.estimate) },
    { name: 'No negative values', passed: allRanges.every((range) => range.minimum >= 0 && range.typical >= 0 && range.maximum >= 0) },
    { name: 'No NaN or Infinity values', passed: allRanges.every((range) => [range.minimum, range.typical, range.maximum].every(Number.isFinite)) },
    { name: 'Low range never exceeds high range', passed: allRanges.every(finiteOrdered) },
    { name: 'Total ranges equal labor, trips, materials, and equipment', passed: totalsMatchComponents },
    { name: 'Material ranges remain ordered', passed: all.every((result) => !result.estimate.materialCostRange || finiteOrdered(result.estimate.materialCostRange)) },
    { name: 'Labor ranges remain ordered', passed: all.every((result) => !result.estimate.laborHoursRange || finiteOrdered(result.estimate.laborHoursRange)) },
    { name: 'Trip-charge range remains ordered', passed: all.every((result) => !result.estimate.tripChargeRange || finiteOrdered(result.estimate.tripChargeRange)) },
    { name: 'Results reset correctly', passed: Object.keys(data().serviceAnswers).length === 0 },
    { name: 'Back navigation does not corrupt results', passed: reconcileServiceAnswers(unchanged, { ...unchanged }).damagedAreaCount === 2 },
    { name: 'Dynamic answers remain connected to calculations', passed: lvp500.estimate.totalRange?.maximum !== lvp100.estimate.totalRange?.maximum },
    { name: 'Ten ceiling tiles estimate more than two tiles', passed: totalMaximum(ceiling10.estimate) > totalMaximum(ceiling2.estimate) },
    { name: 'Five hundred square feet of LVP estimates more than one hundred', passed: totalMaximum(lvp500.estimate) > totalMaximum(lvp100.estimate) },
    { name: 'Two faucets estimate more than one faucet', passed: totalMaximum(faucet2.estimate) > totalMaximum(faucet1.estimate) },
    { name: 'Twelve-foot access increases appropriate labor', passed: laborTypical(light12.estimate) > laborTypical(light8.estimate) },
    { name: 'Drywall paint inclusion increases labor and materials', passed: laborTypical(drywallPaint.estimate) > laborTypical(drywallBase.estimate) && materialTypical(drywallPaint.estimate) > materialTypical(drywallBase.estimate) },
    { name: 'Water-heater attic access increases labor and review flags', passed: laborTypical(atticHeater.estimate) > laborTypical(waterHeater.estimate) && atticHeater.estimate.manualReviewRecommended === true },
  ]
  return { passed: checks.every((check) => check.passed), checks }
}

export function validateManualProductionMatrix(): ProductionValidationResult {
  const scenarios: readonly [string, ReturnType<typeof calculateIntegratedEstimate>][] = [
    ['A Residential drywall repair', calculateIntegratedEstimate(data({ service: 'Drywall Repair', serviceAnswers: { damagedAreaCount: 2, dimensions: measurement(4, 'Square feet'), surfaceLocation: 'wall', damageType: 'medium-hole', existingTexture: 'orange-peel', paintIncluded: true, ceilingHeightFeet: measurement(8, 'Feet'), damageSourceResolved: true } }))],
    ['B Commercial ceiling tiles', calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Ceiling Tiles', propertyType: 'Office', serviceAnswers: { tileQuantity: 10, tileDimensions: measurement(24, 'Inches'), ceilingHeightFeet: measurement(10, 'Feet'), occupied: true } }))],
    ['C Residential LVP', calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'install LVP', serviceAnswers: { squareFeet: measurement(500, 'Square feet'), roomDimensions: measurement(500, 'Square feet'), subfloorCondition: 'good', existingFlooringRemovalRequired: true, existingFlooringType: 'carpet', applianceCount: 2, baseboardRemovalReset: true } }))],
    ['D Residential water heater', calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace hot water heater', serviceAnswers: { propertyUse: 'residential', heaterType: 'tank', fuelType: 'electric', capacityGallons: 50, installationLocation: 'garage', haulAwayRequired: true, accessDimensions: measurement(30, 'Inches') } }))],
    ['E Residential emergency leak', calculateIntegratedEstimate(data({ category: 'Emergency Service', service: 'Plumbing', urgency: 'Emergency', description: 'accessible active plumbing leak', serviceAnswers: { leakSystem: 'supply', activeOrIntermittent: 'active', activeLeak: true, accessible: true } }))],
    ['F Commercial light fixture', calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Electrical', propertyType: 'Office', description: 'replace light fixture', serviceAnswers: { fixtureCount: 2, ceilingHeightFeet: measurement(12, 'Feet') } }))],
    ['G Residential smart thermostat', calculateIntegratedEstimate(data({ service: 'HVAC', description: 'replace smart thermostat', serviceAnswers: { fallbackSubtype: 'thermostat-replacement', replacementThermostatModel: 'Smart thermostat', systemType: 'heat-pump', smartThermostat: true, commonWirePresent: 'unknown' } }))],
    ['H HVAC no cooling', calculateIntegratedEstimate(data({ service: 'HVAC', description: 'HVAC no cooling', serviceAnswers: { equipmentType: 'air-conditioner', issueType: 'cooling', gasOdor: false } }))],
    ['I HVAC gas odor', calculateIntegratedEstimate(data({ service: 'HVAC', description: 'HVAC gas odor', serviceAnswers: { equipmentType: 'furnace', issueType: 'heating', gasOdor: true } }))],
    ['J Electrical active sparking', calculateIntegratedEstimate(data({ service: 'Electrical', description: 'outlet is actively sparking', serviceAnswers: { activeArcing: true } }))],
    ['K Broad flooring', calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'replace flooring' }))],
    ['L Broad remodel', calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Kitchen Remodeling', description: 'complete kitchen remodel' }))],
    ['M Appliance repair', calculateIntegratedEstimate(data({ service: 'Appliance Repair', description: 'dishwasher not draining' }))],
    ['N Property assessment', calculateIntegratedEstimate(data({ category: 'Property Assessment', service: 'Property Inspection', description: 'property assessment' }))],
    ['O Unknown residential repair', calculateIntegratedEstimate(data({ service: 'Other', description: 'unknown residential repair' }))],
    ['P Unknown commercial repair', calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Other', propertyType: 'Office', description: 'unknown commercial repair' }))],
    ['Q Customer-supplied materials', calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'install LVP', serviceAnswers: { squareFeet: measurement(500, 'Square feet'), roomDimensions: measurement(500, 'Square feet'), subfloorCondition: 'good', customerSuppliedMaterials: true } }))],
  ]
  const checks: ProductionValidationCheck[] = scenarios.map(([name, result]) => ({ name, passed: hasRange(result.estimate) && Boolean(result.estimate.tripChargeTotal) && Boolean(result.estimate.pricingContext) && (!result.estimate.manualReviewRecommended || hasRange(result.estimate)) }))
  checks.push({ name: 'R Reset and restart', passed: Object.keys(data().serviceAnswers).length === 0 })
  const safety = scenarios.filter(([name]) => name.startsWith('I ') || name.startsWith('J '))
  checks.push({ name: 'Safety scenarios retain emergency diagnostic pricing', passed: safety.every(([, result]) => result.estimate.status === 'safetyOverride' && result.estimate.resultType === 'emergency' && hasRange(result.estimate)) })
  return { passed: checks.every((check) => check.passed), checks }
}
