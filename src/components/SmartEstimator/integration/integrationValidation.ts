import { COMPANY_STANDARDS } from '../company/companyStandards'
import { VISIBLE_SERVICE_ID_MAP, resolveServiceProfile } from './serviceIdMap'
import { calculateIntegratedEstimate } from './calculateIntegratedEstimate'
import type { Data } from '../types/estimator'
import { validate } from '../utils/validateEstimatorStep'

export interface IntegrationValidationCheck { name: string; passed: boolean }
export interface IntegrationValidationResult { passed: boolean; checks: readonly IntegrationValidationCheck[] }

function data(overrides: Partial<Data> = {}): Data {
  return { projectType: 'Residential', category: 'Repair', service: 'Drywall Repair', description: 'Repair one accessible damaged area with supplied dimensions and normal site conditions.', condition: 'Normal condition', quantity: '1', dimensions: '2 ft x 2 ft', outcome: 'Complete repair', materials: false, matching: false, accessNotes: '', propertyType: 'Single-family home', city: 'Fort Collins', state: 'Colorado', zip: '80521', occupancy: 'Occupied', location: 'Interior', floor: '1', access: 'Easy', urgency: 'Routine', timing: 'Flexible', photos: [], firstName: 'Test', lastName: 'Customer', email: 'test@example.com', phone: '9702865993', contact: 'Phone', company: '', consent: true, ...overrides }
}

export function validateEstimatorIntegration(): IntegrationValidationResult {
  const testPhoto = { file: new File(['test'], 'repair.jpg', { type: 'image/jpeg' }), url: 'blob:integration-test' }
  const residentialDrywall = calculateIntegratedEstimate(data({ photos: [testPhoto] }))
  const commercialDrywall = calculateIntegratedEstimate(data({ projectType: 'Commercial', propertyType: 'Office' }))
  const residentialEmergencyPlumbing = calculateIntegratedEstimate(data({ category: 'Emergency Service', service: 'Minor Plumbing Leak', urgency: 'Emergency' }))
  const commercialEmergencyPlumbing = calculateIntegratedEstimate(data({ projectType: 'Commercial', propertyType: 'Commercial facility', category: 'Emergency Service', service: 'Minor Plumbing Leak', urgency: 'Emergency' }))
  const oneVisit = calculateIntegratedEstimate(data({ service: 'Ceiling Tiles', quantity: '10', dimensions: '10-foot ceiling', projectType: 'Commercial', propertyType: 'Office', occupancy: 'Occupied' }))
  const twoVisitDrywall = residentialDrywall
  const suppliedLvp = calculateIntegratedEstimate(data({ service: 'Luxury Vinyl Plank Flooring', dimensions: '300 sq ft', quantity: '300', materials: true }))
  const waterHeater = calculateIntegratedEstimate(data({ service: 'Water Heater Replacement' }))
  const lvp = calculateIntegratedEstimate(data({ service: 'Luxury Vinyl Plank Flooring', dimensions: '100 sq ft', quantity: '100' }))
  const deterministicA = calculateIntegratedEstimate(data())
  const deterministicB = calculateIntegratedEstimate(data())
  const gasOdor = calculateIntegratedEstimate(data({ service: 'HVAC Diagnostics or Minor Repair', description: 'There is a gas odor near the furnace.' }))
  const arcing = calculateIntegratedEstimate(data({ service: 'Electrical Troubleshooting', description: 'The outlet has active arcing now.' }))
  const commercialLightFixture = calculateIntegratedEstimate(data({ service: 'Light Fixture Replacement', projectType: 'Commercial', propertyType: 'Retail facility' }))
  const pmResidential = calculateIntegratedEstimate(data({ projectType: 'Property Management', propertyType: 'Managed single-family home' }))
  const pmCommercial = calculateIntegratedEstimate(data({ projectType: 'Property Management', propertyType: 'Apartment common area' }))
  const pmUnknown = calculateIntegratedEstimate(data({ projectType: 'Property Management', propertyType: 'Managed property' }))
  const numericSummaries = [residentialDrywall, commercialDrywall, residentialEmergencyPlumbing, commercialEmergencyPlumbing, oneVisit, suppliedLvp, waterHeater, lvp].flatMap((result) => result.engineSummary ? [result.engineSummary] : [])
  const ranges = numericSummaries.flatMap((summary) => [summary.laborHours, summary.laborCost, summary.materials, summary.equipment, summary.total, summary.calendarDurationDays])

  const checks: IntegrationValidationCheck[] = [
    { name: 'Every direct visible service mapping resolves to a registered profile', passed: Object.values(VISIBLE_SERVICE_ID_MAP).every((id) => Boolean(resolveServiceProfile(id))) },
    { name: 'Unsupported broad services return manual review', passed: calculateIntegratedEstimate(data({ service: 'Plumbing' })).estimate.status === 'manualReview' },
    { name: 'Remodel returns manual review', passed: calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Kitchen Remodeling' })).estimate.status === 'manualReview' },
    { name: 'Property Assessment returns scheduling review rather than repair pricing', passed: calculateIntegratedEstimate(data({ category: 'Property Assessment', service: 'Property Inspection' })).estimate.status === 'manualReview' },
    { name: 'Appliance Repair returns manual review', passed: calculateIntegratedEstimate(data({ service: 'Appliance Repair' })).estimate.status === 'manualReview' },
    { name: 'Tenant Improvements return manual review', passed: calculateIntegratedEstimate(data({ service: 'Tenant Improvements' })).estimate.status === 'manualReview' },
    { name: 'Residential standard drywall uses the approved rate', passed: residentialDrywall.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Commercial standard drywall uses the approved rate', passed: commercialDrywall.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'Residential emergency plumbing uses the approved rate', passed: residentialEmergencyPlumbing.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'Commercial emergency plumbing uses the approved rate', passed: commercialEmergencyPlumbing.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercialEmergency },
    { name: 'No second commercial multiplier applies', passed: commercialDrywall.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'No second emergency multiplier applies', passed: residentialEmergencyPlumbing.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'One expected visit creates one trip charge', passed: oneVisit.engineSummary?.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit },
    { name: 'Two expected visits create two trip charges', passed: twoVisitDrywall.engineSummary?.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit * 2 },
    { name: 'Drywall repair displays multiple expected trip charges', passed: twoVisitDrywall.estimate.tripChargeTotal === '$100' },
    { name: 'Customer-supplied materials retain consumable costs', passed: (suppliedLvp.engineSummary?.materials.minimum ?? 0) > 0 },
    { name: 'Water-heater minimum labor remains at least four hours', passed: (waterHeater.engineSummary?.laborHours.minimum ?? 0) >= 4 },
    { name: 'LVP minimum labor remains at least four hours', passed: (lvp.engineSummary?.laborHours.minimum ?? 0) >= 4 },
    { name: 'Same estimator input produces identical output', passed: JSON.stringify(deterministicA) === JSON.stringify(deterministicB) },
    { name: 'Supported profile calculation does not use the legacy fallback', passed: residentialDrywall.metadata.supportedProfile && !residentialDrywall.metadata.fallbackUsed },
    { name: 'Missing service profile resolves safely without a crash', passed: resolveServiceProfile('missing-service-profile') === undefined },
    { name: 'Gas-odor HVAC input produces a safety override', passed: gasOdor.estimate.status === 'safetyOverride' },
    { name: 'Active electrical arcing produces a safety override', passed: arcing.estimate.status === 'safetyOverride' },
    { name: 'Unsupported regulated electrical work produces manual review', passed: calculateIntegratedEstimate(data({ service: 'Electrical' })).estimate.status === 'manualReview' },
    { name: 'Property Management residential context uses residential pricing', passed: pmResidential.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residential },
    { name: 'Property Management common-area context uses commercial pricing', passed: pmCommercial.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'Unknown Property Management context discloses assumption review', passed: pmUnknown.estimate.pricingContext === 'Residential assumption — review required' && pmUnknown.estimate.manualReviewRequired === true },
    { name: 'Low result never exceeds typical', passed: ranges.every((range) => range.minimum <= range.typical) },
    { name: 'Typical result never exceeds high', passed: ranges.every((range) => range.typical <= range.maximum) },
    { name: 'No negative values are produced', passed: ranges.every((range) => range.minimum >= 0 && range.typical >= 0 && range.maximum >= 0) },
    { name: 'Reset-compatible empty data has no selected service or photos', passed: !data({ service: undefined, photos: [] }).service && data({ photos: [] }).photos.length === 0 },
    { name: 'Existing step validation still functions', passed: validate(0, data({ projectType: undefined })) === 'Select a project type to continue.' && validate(3, data({ description: '' })) !== '' },
    { name: 'Scenario A: residential standard drywall produces a deterministic estimate', passed: residentialDrywall.estimate.status === 'estimate' && residentialDrywall.estimate.pricingContext === 'Residential' },
    { name: 'Scenario B: commercial ceiling tiles use the commercial rate and one visit', passed: oneVisit.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercial && oneVisit.engineSummary.expectedSiteVisits === 1 },
    { name: 'Scenario C: residential emergency minor plumbing leak uses the emergency rate', passed: residentialEmergencyPlumbing.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.residentialEmergency },
    { name: 'Scenario D: residential water heater preserves its minimum and trip charge', passed: (waterHeater.engineSummary?.laborHours.minimum ?? 0) >= 4 && waterHeater.engineSummary?.tripCharges === COMPANY_STANDARDS.billing.tripChargePerVisit },
    { name: 'Scenario E: commercial light fixture uses $75 without a second multiplier', passed: commercialLightFixture.engineSummary?.laborRate === COMPANY_STANDARDS.laborRates.commercial },
    { name: 'Scenario F: managed single-family work uses residential pricing', passed: pmResidential.estimate.pricingContext === 'Residential' },
    { name: 'Scenario G: managed common-area work uses commercial pricing', passed: pmCommercial.estimate.pricingContext === 'Commercial' },
    { name: 'Scenario H: remodeling shows review-only output without a fabricated total', passed: calculateIntegratedEstimate(data({ category: 'Remodel', service: 'Kitchen Remodeling' })).estimate.total === 'Professional review required' },
    { name: 'Scenario I: appliance repair shows review-only output', passed: calculateIntegratedEstimate(data({ service: 'Appliance Repair' })).estimate.total === 'Professional review required' },
    { name: 'Scenario J: HVAC gas odor suppresses the ordinary estimate presentation', passed: gasOdor.estimate.status === 'safetyOverride' && gasOdor.estimate.total === 'Safety review required' },
    { name: 'Scenario K: active electrical arcing suppresses the ordinary estimate presentation', passed: arcing.estimate.status === 'safetyOverride' && arcing.estimate.total === 'Safety review required' },
  ]
  return { passed: checks.every((check) => check.passed), checks }
}
