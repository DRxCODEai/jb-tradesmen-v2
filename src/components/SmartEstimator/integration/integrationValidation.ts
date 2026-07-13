import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { Data, Estimate } from '../types/estimator'
import { validate } from '../utils/validateEstimatorStep'
import { calculateIntegratedEstimate } from './calculateIntegratedEstimate'
import { VISIBLE_SERVICE_ID_MAP, resolveServiceProfile } from './serviceIdMap'

export interface IntegrationValidationCheck { name: string; passed: boolean }
export interface IntegrationValidationResult { passed: boolean; checks: readonly IntegrationValidationCheck[] }

function data(overrides: Partial<Data> = {}): Data {
  return { projectType: 'Residential', category: 'Repair', service: 'Other', serviceAnswers: {}, description: 'Other minor repair with accessible normal site conditions.', condition: 'Normal condition', quantity: '1', dimensions: '', outcome: 'Complete repair', materials: false, matching: false, accessNotes: '', propertyType: 'Single-family home', city: 'Fort Collins', state: 'Colorado', zip: '80521', occupancy: 'Occupied', location: 'Interior', floor: '1', access: 'Easy', urgency: 'Routine', timing: 'Flexible', photos: [], firstName: 'Test', lastName: 'Customer', email: 'test@example.com', phone: '9702865993', contact: 'Phone', company: '', consent: true, ...overrides }
}

function hasDollarRange(estimate: Estimate): boolean { return /^\$[\d,]+(?:–\$[\d,]+)?$/.test(estimate.total) }
function ranges(estimate: Estimate) { const value = estimate.calculationRanges; return value ? [value.laborHours, value.laborCost, value.tripCharges, value.materials, value.equipment, value.total, value.visits] : [] }

export function validateEstimatorIntegration(): IntegrationValidationResult {
  const hotWater = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace hot water heater' }))
  const flooring = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Flooring', description: 'replace flooring' }))
  const kitchenRemodel = calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Kitchen Remodeling', description: 'complete kitchen remodel' }))
  const tenantImprovement = calculateIntegratedEstimate(data({ projectType: 'Commercial', category: 'Remodel', service: 'Tenant Improvements', description: 'commercial tenant improvement', propertyType: 'Retail facility' }))
  const residentialAppliance = calculateIntegratedEstimate(data({ service: 'Appliance Repair', description: 'appliance not working' }))
  const commercialAppliance = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Appliance Repair', description: 'commercial appliance not working', propertyType: 'Commercial kitchen' }))
  const assessment = calculateIntegratedEstimate(data({ category: 'Property Assessment', service: 'Property Inspection', description: 'property assessment' }))
  const residentialOther = calculateIntegratedEstimate(data({ service: 'Other', description: 'unknown residential other work' }))
  const commercialOther = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Other', description: 'unknown commercial other work', propertyType: 'Office' }))
  const gasOdor = calculateIntegratedEstimate(data({ service: 'HVAC', description: 'gas odor' }))
  const arcing = calculateIntegratedEstimate(data({ service: 'Electrical', description: 'outlet is sparking' }))
  const plumbingWork = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'plumbing work' }))
  const deterministicA = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace hot water heater' }))
  const deterministicB = calculateIntegratedEstimate(data({ service: 'Plumbing', description: 'replace hot water heater' }))
  const residentialDrywall = calculateIntegratedEstimate(data({ service: 'Drywall Repair', description: 'patch wall hole', dimensions: '2 ft x 2 ft' }))
  const commercialDrywall = calculateIntegratedEstimate(data({ projectType: 'Commercial', service: 'Drywall Repair', description: 'patch wall hole', dimensions: '2 ft x 2 ft', propertyType: 'Office' }))
  const allResults = [hotWater, flooring, kitchenRemodel, tenantImprovement, residentialAppliance, commercialAppliance, assessment, residentialOther, commercialOther, gasOdor, arcing, plumbingWork, residentialDrywall, commercialDrywall]
  const allRanges = allResults.flatMap((result) => ranges(result.estimate))

  const checks: IntegrationValidationCheck[] = [
    { name: 'Every direct visible service mapping resolves to a registered profile', passed: Object.values(VISIBLE_SERVICE_ID_MAP).every((id) => Boolean(resolveServiceProfile(id))) },
    { name: 'Residential plumbing description resolves hot-water-heater replacement', passed: hotWater.metadata.profileId === 'water-heater-replacement' && hotWater.metadata.resolutionSource === 'description' },
    { name: 'Hot-water-heater result displays Phase 2 pricing at the residential rate', passed: hasDollarRange(hotWater.estimate) && hotWater.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Hot-water-heater minimum labor is at least four hours with a separate $50 trip charge', passed: (hotWater.engineSummary?.laborHours.minimum ?? 0) >= 4 && hotWater.estimate.tripChargeTotal === '$50' },
    { name: 'Replace flooring without a flooring type displays the residential flooring fallback', passed: flooring.estimate.resultLabel?.startsWith('Broad Flooring Planning Range') === true && hasDollarRange(flooring.estimate) },
    { name: 'Flooring fallback displays materials and trip charges and requests measurements and selection', passed: /^\$/.test(flooring.estimate.materials) && /^\$/.test(flooring.estimate.tripChargeTotal ?? '') && flooring.estimate.recommendations?.some((item) => /square footage|flooring selection/i.test(item)) === true },
    { name: 'Complete kitchen remodel displays the broad residential remodel range', passed: kitchenRemodel.estimate.resultLabel === 'Broad Remodel Planning Range' && hasDollarRange(kitchenRemodel.estimate) && kitchenRemodel.estimate.confidence === 'Preliminary' },
    { name: 'Commercial tenant improvement displays the broad commercial range at $75 per hour', passed: tenantImprovement.estimate.resultLabel === 'Commercial Tenant-Improvement Planning Range' && tenantImprovement.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.commercial && hasDollarRange(tenantImprovement.estimate) },
    { name: 'Residential appliance repair displays a diagnostic range and parts allowance', passed: residentialAppliance.estimate.resultHeading === 'Preliminary Diagnostic Range' && residentialAppliance.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.residential && residentialAppliance.estimate.materials !== '$0' },
    { name: 'Commercial appliance repair displays a commercial diagnostic range', passed: commercialAppliance.estimate.resultHeading === 'Preliminary Diagnostic Range' && commercialAppliance.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.commercial && hasDollarRange(commercialAppliance.estimate) },
    { name: 'Property Assessment displays a priced assessment service with a separate trip charge', passed: assessment.estimate.resultLabel === 'Property Assessment Service Range' && assessment.estimate.tripChargeTotal === '$50' && hasDollarRange(assessment.estimate) },
    { name: 'Unknown residential work displays a broad preliminary range', passed: residentialOther.estimate.resultHeading === 'Broad Preliminary Planning Range' && residentialOther.estimate.confidence === 'Preliminary' && hasDollarRange(residentialOther.estimate) },
    { name: 'Unknown commercial work displays a broad preliminary range', passed: commercialOther.estimate.resultHeading === 'Broad Preliminary Planning Range' && commercialOther.estimate.applicableLaborRate === COMPANY_STANDARDS.laborRates.commercial && hasDollarRange(commercialOther.estimate) },
    { name: 'Unspecified plumbing work displays a preliminary plumbing service range', passed: plumbingWork.estimate.resultHeading === 'Preliminary Diagnostic Range' && hasDollarRange(plumbingWork.estimate) },
    { name: 'HVAC gas odor displays the safety warning and residential emergency range', passed: gasOdor.estimate.status === 'safetyOverride' && gasOdor.estimate.resultHeading === 'Emergency Diagnostic / Initial Service Range' && gasOdor.estimate.total === '$150–$450' },
    { name: 'Active electrical arcing displays the safety warning and emergency range', passed: arcing.estimate.status === 'safetyOverride' && arcing.estimate.total === '$150–$450' && arcing.estimate.safetyOverride !== undefined },
    { name: 'Same estimator inputs return identical outputs', passed: JSON.stringify(deterministicA) === JSON.stringify(deterministicB) },
    { name: 'Every completed scenario displays a preliminary dollar range', passed: allResults.every((result) => hasDollarRange(result.estimate)) },
    { name: 'Every fallback recommends professional review as a secondary qualification', passed: [flooring, kitchenRemodel, tenantImprovement, residentialAppliance, commercialAppliance, assessment, residentialOther, commercialOther, plumbingWork].every((result) => result.estimate.manualReviewRequired && result.estimate.manualReviewReasons?.length) },
    { name: 'No calculated result range contains negative values', passed: allRanges.every((range) => range.minimum >= 0 && range.typical >= 0 && range.maximum >= 0) },
    { name: 'All calculated ranges preserve low, typical, and high ordering', passed: allRanges.every((range) => range.minimum <= range.typical && range.typical <= range.maximum) },
    { name: 'Trip charges display separately on every result', passed: allResults.every((result) => /^\$/.test(result.estimate.tripChargeTotal ?? '')) },
    { name: 'Commercial pricing receives no second multiplier', passed: commercialOther.estimate.calculationRanges?.laborCost.minimum === (commercialOther.estimate.calculationRanges?.laborHours.minimum ?? -1) * COMPANY_STANDARDS.laborRates.commercial && commercialDrywall.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'Emergency pricing receives no second multiplier', passed: gasOdor.estimate.calculationRanges?.laborCost.minimum === COMPANY_STANDARDS.laborRates.residentialEmergency && gasOdor.estimate.calculationRanges.laborCost.maximum === COMPANY_STANDARDS.laborRates.residentialEmergency * 4 },
    { name: 'Residential standard profile calculation still uses $50 per hour', passed: residentialDrywall.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Supported profile calculations do not use the legacy fallback', passed: hotWater.metadata.supportedProfile && !hotWater.metadata.fallbackUsed },
    { name: 'Existing step validation still functions', passed: validate(0, data({ projectType: undefined })) === 'Select a project type to continue.' && validate(4, data({ description: '' })) !== '' },
  ]
  return { passed: checks.every((check) => check.passed), checks }
}
