import type { ServiceModifier } from '../../templates/serviceModifierTemplate'
import type { ManualReviewFlag } from '../../types/v1/guardrails'
import type { PermitAndCodeRequirements, ServiceEquipment } from '../../types/v1/service'

export const HVAC_EQUIPMENT: ServiceEquipment = { typicalEquipment: [], rentalMayBeRequired: true, rentalCostRange: { minimum: 0, typical: 250, maximum: 1200 }, elevatedAccessPossible: true, specialtyEquipmentNotes: ['Ordinary diagnostic instruments and hand tools are not included as customer equipment charges.', 'Rooftop or specialty access equipment requires project-specific review.'] }
export const HVAC_PERMIT_REVIEW: PermitAndCodeRequirements = { permitMayBeRequired: true, inspectionMayBeRequired: true, licensedTradeMayBeRequired: true, jurisdictionReviewRequired: true, notes: ['Permit, inspection, certification, licensing, and jurisdiction requirements must be confirmed for the final HVAC scope.'] }

function reviewModifier(id: string, field: string, name: string, flags: readonly ManualReviewFlag[]): ServiceModifier {
  return { id, name, description: `${name} requires formal review.`, conditions: [{ field, operator: 'equals', value: true }], effects: { requiresManualReview: true, manualReviewFlags: flags }, customerExplanation: `${name} is outside ordinary minor-service pricing and requires qualified review.`, internalNotes: [] }
}
function safetyModifier(id: string, field: string, name: string, flags: readonly ManualReviewFlag[] = []): ServiceModifier {
  return { id, name, description: `${name} requires immediate safety review.`, conditions: [{ field, operator: 'equals', value: true }], effects: { requiresManualReview: true, manualReviewFlags: [...flags, 'immediateSafetyConcern'], safetyOverride: { reason: `Reported ${name.toLowerCase()} involving HVAC equipment.` } }, customerExplanation: 'The reported condition requires direct safety and professional review before ordinary pricing.', internalNotes: [] }
}

export const HVAC_MANUAL_REVIEW_MODIFIERS: readonly ServiceModifier[] = [
  reviewModifier('hvac-refrigerant', 'refrigerantHandling', 'Refrigerant handling', ['refrigerantCertificationRequired', 'licensingReviewRequired']),
  reviewModifier('hvac-refrigerant-leak', 'suspectedRefrigerantLeak', 'Suspected refrigerant leak', ['refrigerantCertificationRequired']),
  reviewModifier('hvac-compressor', 'compressorFailure', 'Compressor failure', ['refrigerantCertificationRequired']),
  reviewModifier('hvac-heat-exchanger', 'heatExchangerConcern', 'Heat exchanger concern', ['combustionSafetyReviewRequired']),
  reviewModifier('hvac-gas-valve', 'gasValveAdjustment', 'Gas-valve adjustment', ['combustionSafetyReviewRequired', 'licensingReviewRequired']),
  reviewModifier('hvac-gas-pressure', 'gasPressureAdjustment', 'Gas-pressure adjustment', ['combustionSafetyReviewRequired', 'licensingReviewRequired']),
  reviewModifier('hvac-combustion', 'combustionAnalysis', 'Combustion analysis', ['combustionSafetyReviewRequired']),
  reviewModifier('hvac-venting', 'damagedVenting', 'Cracked or damaged venting', ['combustionSafetyReviewRequired']),
  reviewModifier('hvac-co-concern', 'carbonMonoxideConcern', 'Carbon-monoxide concern', ['combustionSafetyReviewRequired', 'immediateSafetyConcern']),
  reviewModifier('hvac-electrical-service', 'electricalServiceChange', 'Electrical service change', ['electricalProfessionalReviewRequired', 'permitReviewRequired']),
  reviewModifier('hvac-major-replacement', 'majorEquipmentReplacement', 'Major HVAC equipment replacement', ['licensingReviewRequired', 'permitReviewRequired']),
  reviewModifier('hvac-rooftop', 'commercialRooftopEquipment', 'Commercial rooftop equipment', ['licensingReviewRequired']),
  reviewModifier('hvac-duct-redesign', 'ductSystemRedesign', 'Duct-system redesign', ['permitReviewRequired']),
  reviewModifier('hvac-zoning', 'zoningControlRedesign', 'Zoning control redesign', ['licensingReviewRequired']),
  reviewModifier('hvac-boiler', 'boilerSystem', 'Boiler system', ['licensingReviewRequired']),
  reviewModifier('hvac-hydronic', 'hydronicSystem', 'Hydronic system', ['licensingReviewRequired']),
  reviewModifier('hvac-geothermal', 'geothermalSystem', 'Geothermal system', ['licensingReviewRequired']),
  reviewModifier('hvac-mini-split-sealed', 'miniSplitSealedSystem', 'Mini-split sealed-system work', ['refrigerantCertificationRequired']),
  reviewModifier('hvac-high-voltage', 'highVoltageControlFailure', 'High-voltage control failure', ['electricalProfessionalReviewRequired']),
  reviewModifier('hvac-permit-uncertain', 'permitUncertain', 'Permit uncertainty', ['permitReviewRequired', 'jurisdictionReviewRequired']),
  reviewModifier('hvac-hazardous-no-heat', 'hazardousWeatherNoHeat', 'Emergency loss of heat in hazardous weather', ['immediateSafetyConcern']),
  reviewModifier('hvac-vulnerable-occupants', 'vulnerableOccupants', 'Vulnerable occupant condition', ['immediateSafetyConcern']),
]

export const HVAC_SAFETY_OVERRIDE_MODIFIERS: readonly ServiceModifier[] = [
  safetyModifier('hvac-gas-odor', 'gasOdor', 'gas odor', ['combustionSafetyReviewRequired']),
  safetyModifier('hvac-smoke', 'smoke', 'smoke'),
  safetyModifier('hvac-active-burning', 'activeBurning', 'active burning'),
  safetyModifier('hvac-co-alarm', 'carbonMonoxideAlarm', 'carbon-monoxide alarm', ['combustionSafetyReviewRequired']),
  safetyModifier('hvac-electrical-arcing', 'electricalArcing', 'electrical arcing', ['electricalProfessionalReviewRequired']),
  safetyModifier('hvac-overheating', 'unsafeOverheating', 'unsafe overheating'),
]
