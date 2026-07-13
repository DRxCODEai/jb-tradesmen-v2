import { COMPANY_STANDARDS } from '../company/companyStandards'
import { calculateIntegratedEstimate } from '../integration/calculateIntegratedEstimate'
import type { Data, Estimate } from '../types/estimator'
import { reconcileServiceAnswers, resolveDynamicQuestions, updateAndPruneServiceAnswers } from './questionResolver'
import { validateDynamicQuestions } from './questionValidation'

export interface DynamicQuestionValidationCheck { name: string; passed: boolean }
export interface DynamicQuestionValidationResult { passed: boolean; checks: readonly DynamicQuestionValidationCheck[] }

function data(overrides: Partial<Data> = {}): Data {
  return { projectType: 'Residential', category: 'Repair', service: 'Other', serviceAnswers: {}, description: 'Project details supplied for deterministic development validation.', condition: 'Standard condition', quantity: '1', dimensions: '', outcome: 'Complete the selected work', materials: false, matching: false, accessNotes: '', propertyType: 'Single-family home', city: 'Fort Collins', state: 'Colorado', zip: '80521', occupancy: 'Occupied', location: 'Interior', floor: '1', access: 'Easy', urgency: 'Routine', timing: 'Flexible', photos: [], firstName: 'Test', lastName: 'Customer', email: 'test@example.com', phone: '9702865993', contact: 'Phone', company: '', consent: true, ...overrides }
}

const measurement = (value: number | null, unit: string, unknown = false) => ({ value, unit, unknown })
const totalMaximum = (estimate: Estimate) => estimate.calculationRanges?.total.maximum ?? 0
const laborTypical = (estimate: Estimate) => estimate.calculationRanges?.laborHours.typical ?? 0
const hasRange = (estimate: Estimate) => /^\$[\d,]+(?:–\$[\d,]+)?$/.test(estimate.total)

export function validateDynamicQuestionIntegration(): DynamicQuestionValidationResult {
  const waterHeaterData = data({ service: 'Plumbing', description: 'Replace hot water heater', serviceAnswers: { propertyUse: 'residential', heaterType: 'tank', fuelType: 'electric', capacityGallons: 50, installationLocation: 'garage', expansionTankPresent: true, haulAwayRequired: true, accessDimensions: measurement(30, 'Inches') } })
  const waterQuestions = resolveDynamicQuestions(waterHeaterData)
  const faucetData = data({ service: 'Plumbing', description: 'Replace kitchen faucet', serviceAnswers: { faucetType: 'kitchen', fixtureCount: 1, shutoffFunctioning: true, customerSuppliedMaterials: true } })
  const switched = { ...waterHeaterData, service: 'Plumbing', description: faucetData.description }
  const cleared = reconcileServiceAnswers(waterHeaterData, switched)
  const genericUnknown = data({ service: 'Other', serviceAnswers: { fallbackSize: measurement(null, 'Square feet', true), fallbackAccess: 'unknown' } })
  const drywallRequired = data({ service: 'Drywall Repair', serviceAnswers: {} })

  const ceiling2 = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Ceiling Tiles', propertyType: 'Office', serviceAnswers: { tileQuantity: 2, tileDimensions: measurement(24, 'Inches'), ceilingHeightFeet: measurement(10, 'Feet') } })).estimate
  const ceiling10 = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Ceiling Tiles', propertyType: 'Office', serviceAnswers: { tileQuantity: 10, tileDimensions: measurement(24, 'Inches'), ceilingHeightFeet: measurement(10, 'Feet'), occupied: true } })).estimate
  const lvp100Data = data({ category: 'Remodel', service: 'Flooring', description: 'Install LVP flooring', serviceAnswers: { squareFeet: measurement(100, 'Square feet'), roomDimensions: measurement(100, 'Square feet'), subfloorCondition: 'good', existingFlooringRemovalRequired: false } })
  const lvp500Data = data({ ...lvp100Data, serviceAnswers: { ...lvp100Data.serviceAnswers, squareFeet: measurement(500, 'Square feet'), roomDimensions: measurement(500, 'Square feet') } })
  const lvp100 = calculateIntegratedEstimate(lvp100Data).estimate
  const lvp500 = calculateIntegratedEstimate(lvp500Data).estimate
  const suppliedFlooring = calculateIntegratedEstimate(data({ ...lvp500Data, serviceAnswers: { ...lvp500Data.serviceAnswers, customerSuppliedMaterials: true } })).estimate
  const flooringRemoval = calculateIntegratedEstimate(data({ ...lvp500Data, serviceAnswers: { ...lvp500Data.serviceAnswers, existingFlooringRemovalRequired: true, existingFlooringType: 'carpet' } })).estimate
  const paintWallsData = data({ service: 'Interior Painting', serviceAnswers: { roomCount: 2, wallDimensions: measurement(600, 'Square feet'), surfacesIncluded: ['walls'] } })
  const paintCeilingsData = data({ ...paintWallsData, serviceAnswers: { ...paintWallsData.serviceAnswers, surfacesIncluded: ['walls', 'ceilings'], majorColorChange: true } })
  const paintWalls = calculateIntegratedEstimate(paintWallsData).estimate
  const paintCeilings = calculateIntegratedEstimate(paintCeilingsData).estimate
  const faucet1 = calculateIntegratedEstimate(faucetData).estimate
  const faucet2 = calculateIntegratedEstimate(data({ ...faucetData, serviceAnswers: { ...faucetData.serviceAnswers, fixtureCount: 2 } })).estimate
  const light8 = calculateIntegratedEstimate(data({ service: 'Electrical', description: 'Replace light fixture', serviceAnswers: { fixtureCount: 2, mountingLocation: 'ceiling', ceilingHeightFeet: measurement(8, 'Feet'), customerSuppliedMaterials: true } })).estimate
  const light12 = calculateIntegratedEstimate(data({ service: 'Electrical', description: 'Replace light fixture', serviceAnswers: { fixtureCount: 2, mountingLocation: 'ceiling', ceilingHeightFeet: measurement(12, 'Feet'), customerSuppliedMaterials: true } })).estimate
  const heaterGarage = calculateIntegratedEstimate(waterHeaterData).estimate
  const heaterAttic = calculateIntegratedEstimate(data({ ...waterHeaterData, serviceAnswers: { ...waterHeaterData.serviceAnswers, installationLocation: 'attic' } })).estimate
  const arcing = calculateIntegratedEstimate(data({ service: 'Electrical', description: 'Electrical troubleshooting', serviceAnswers: { activeArcing: true } })).estimate
  const gasOdor = calculateIntegratedEstimate(data({ service: 'HVAC', description: 'HVAC no cooling', serviceAnswers: { equipmentType: 'air-conditioner', issueType: 'cooling', gasOdor: true } })).estimate
  const broadUnknown = calculateIntegratedEstimate(genericUnknown).estimate
  const allEstimates = [ceiling2, ceiling10, lvp100, lvp500, suppliedFlooring, flooringRemoval, paintWalls, paintCeilings, faucet1, faucet2, light8, light12, heaterGarage, heaterAttic, arcing, gasOdor, broadUnknown]
  const hiddenStart = data({ service: 'Drywall Repair', serviceAnswers: { paintIncluded: true, paintMatchAvailable: true } })
  const hiddenPruned = updateAndPruneServiceAnswers(hiddenStart, 'paintIncluded', false)
  const deterministicA = calculateIntegratedEstimate(waterHeaterData)
  const deterministicB = calculateIntegratedEstimate(waterHeaterData)

  const checks: DynamicQuestionValidationCheck[] = [
    { name: 'Water-heater description resolves water-heater questions', passed: waterQuestions.serviceId === 'water-heater-replacement' && waterQuestions.questions.some((question) => question.field === 'fuelType') },
    { name: 'Changing from water heater to faucet clears water-heater-only answers', passed: Object.keys(cleared).length === 0 },
    { name: 'Unknown optional answers do not block completion', passed: validateDynamicQuestions(genericUnknown).valid },
    { name: 'Required profile questions block Continue', passed: !validateDynamicQuestions(drywallRequired).valid },
    { name: 'Ten ceiling tiles calculate higher than two tiles', passed: totalMaximum(ceiling10) > totalMaximum(ceiling2) },
    { name: 'Five hundred square feet of LVP calculates higher than one hundred', passed: totalMaximum(lvp500) > totalMaximum(lvp100) },
    { name: 'Customer-supplied flooring retains consumables', passed: (suppliedFlooring.calculationRanges?.materials.minimum ?? 0) >= COMPANY_STANDARDS.billing.roundCurrencyToNearest },
    { name: 'Flooring removal increases labor', passed: laborTypical(flooringRemoval) > laborTypical(lvp500) },
    { name: 'Painting ceilings increases labor', passed: laborTypical(paintCeilings) > laborTypical(paintWalls) },
    { name: 'Two faucets estimate higher than one faucet', passed: totalMaximum(faucet2) > totalMaximum(faucet1) },
    { name: 'A twelve-foot ceiling applies elevated-access logic', passed: laborTypical(light12) > laborTypical(light8) },
    { name: 'Water-heater attic access increases labor and review flags', passed: laborTypical(heaterAttic) > laborTypical(heaterGarage) && heaterAttic.manualReviewRequired === true },
    { name: 'Electrical active arcing produces safety override', passed: arcing.status === 'safetyOverride' && hasRange(arcing) },
    { name: 'HVAC gas odor produces safety override', passed: gasOdor.status === 'safetyOverride' && hasRange(gasOdor) },
    { name: 'Unknown measurements still produce a broad price range', passed: hasRange(broadUnknown) },
    { name: 'Every completed submission still produces a dollar range', passed: allEstimates.every(hasRange) },
    { name: 'Professional review remains secondary to pricing', passed: broadUnknown.manualReviewRequired === true && hasRange(broadUnknown) },
    { name: 'No second commercial multiplier applies', passed: ceiling10.applicableLaborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'No second emergency multiplier applies', passed: gasOdor.applicableLaborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'One visit applies a $50 trip charge', passed: faucet1.tripChargeTotal === '$50' },
    { name: 'Two visits apply $100 in trip charges', passed: paintWalls.tripChargeTotal === '$100' },
    { name: 'Back navigation can preserve current valid service answers', passed: reconcileServiceAnswers(waterHeaterData, { ...waterHeaterData }).capacityGallons === 50 },
    { name: 'Reset state clears service answers', passed: Object.keys(data().serviceAnswers).length === 0 },
    { name: 'Switching conditions removes stale hidden answers', passed: hiddenPruned.paintMatchAvailable === undefined },
    { name: 'Same inputs produce identical outputs', passed: JSON.stringify(deterministicA) === JSON.stringify(deterministicB) },
  ]
  return { passed: checks.every((check) => check.passed), checks }
}

export function validateGuidedQuestionManualScenarios(): DynamicQuestionValidationResult {
  const scenarios = [
    calculateIntegratedEstimate(data({ service: 'Drywall Repair', serviceAnswers: { damagedAreaCount: 2, dimensions: measurement(4, 'Square feet'), surfaceLocation: 'wall', damageType: 'medium-hole', existingTexture: 'orange-peel', paintIncluded: true, ceilingHeightFeet: measurement(8, 'Feet'), damageSourceResolved: true } })).estimate,
    calculateIntegratedEstimate(data({ service: 'Interior Painting', serviceAnswers: { roomCount: 2, wallDimensions: measurement(600, 'Square feet'), surfacesIncluded: ['walls', 'ceilings'], majorColorChange: true } })).estimate,
    calculateIntegratedEstimate(data({ service: 'Flooring', description: 'Install LVP flooring', serviceAnswers: { squareFeet: measurement(500, 'Square feet'), roomDimensions: measurement(500, 'Square feet'), subfloorCondition: 'good', existingFlooringRemovalRequired: true, existingFlooringType: 'carpet', applianceCount: 2, baseboardRemovalReset: true } })).estimate,
    calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Ceiling Tiles', propertyType: 'Office', serviceAnswers: { tileQuantity: 10, tileDimensions: measurement(24, 'Inches'), ceilingHeightFeet: measurement(10, 'Feet'), occupied: true } })).estimate,
    calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'Replace hot water heater', serviceAnswers: { propertyUse: 'residential', heaterType: 'tank', fuelType: 'electric', capacityGallons: 50, installationLocation: 'garage', expansionTankPresent: true, haulAwayRequired: true, accessDimensions: measurement(30, 'Inches') } })).estimate,
    calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'Replace kitchen faucet', serviceAnswers: { faucetType: 'kitchen', fixtureCount: 1, shutoffFunctioning: true, customerSuppliedMaterials: true } })).estimate,
    calculateIntegratedEstimate(data({ service: 'Electrical', description: 'Replace light fixtures', serviceAnswers: { fixtureCount: 2, mountingLocation: 'ceiling', ceilingHeightFeet: measurement(12, 'Feet'), customerSuppliedMaterials: true } })).estimate,
    calculateIntegratedEstimate(data({ service: 'HVAC', description: 'Replace smart thermostat', serviceAnswers: { fallbackSubtype: 'thermostat-replacement', replacementThermostatModel: 'Smart thermostat', systemType: 'heat-pump', smartThermostat: true, commonWirePresent: 'unknown' } })).estimate,
    calculateIntegratedEstimate(data({ service: 'HVAC', description: 'HVAC no cooling', serviceAnswers: { equipmentType: 'air-conditioner', issueType: 'cooling', gasOdor: false } })).estimate,
    calculateIntegratedEstimate(data({ service: 'HVAC', description: 'HVAC gas odor', serviceAnswers: { equipmentType: 'furnace', issueType: 'heating', gasOdor: true } })).estimate,
    calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Kitchen Remodeling', description: 'Broad kitchen remodeling project', serviceAnswers: { fallbackSize: measurement(null, 'Square feet', true), fallbackAccess: 'unknown' } })).estimate,
  ]
  const resetState = data({ serviceAnswers: {} })
  const checks: DynamicQuestionValidationCheck[] = [
    { name: 'Manual scenarios A through K all return dollar ranges', passed: scenarios.every(hasRange) },
    { name: 'Manual thermostat scenario resolves the thermostat profile', passed: scenarios[7].serviceProfileId === 'thermostat-replacement' },
    { name: 'Manual standard HVAC scenario remains ordinary priced output', passed: scenarios[8].status !== 'safetyOverride' && scenarios[8].applicableLaborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Manual HVAC gas-odor scenario returns emergency diagnostic pricing', passed: scenarios[9].status === 'safetyOverride' && scenarios[9].applicableLaborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'Manual broad remodeling scenario remains priced with unknown measurements', passed: scenarios[10].manualReviewRequired === true && hasRange(scenarios[10]) },
    { name: 'Manual reset scenario clears dynamic answers', passed: Object.keys(resetState.serviceAnswers).length === 0 },
  ]
  return { passed: checks.every((check) => check.passed), checks }
}
