import type { ServiceModifier } from '../../templates/serviceModifierTemplate'
import type { ManualReviewFlag } from '../../types/v1/guardrails'
import type { PermitAndCodeRequirements, ServiceEquipment } from '../../types/v1/service'

export const ELECTRICAL_EQUIPMENT: ServiceEquipment = {
  typicalEquipment: [],
  rentalMayBeRequired: true,
  rentalCostRange: { minimum: 0, typical: 250, maximum: 1500 },
  elevatedAccessPossible: true,
  specialtyEquipmentNotes: ['Ordinary ladders, diagnostic meters, and hand tools are not included as customer equipment charges.', 'Scaffold, lifts, traffic control, or specialty access equipment require project-specific review.'],
}

export const ELECTRICAL_PERMIT_REVIEW: PermitAndCodeRequirements = {
  permitMayBeRequired: true,
  inspectionMayBeRequired: true,
  licensedTradeMayBeRequired: true,
  jurisdictionReviewRequired: true,
  notes: ['Permit, inspection, licensing, and jurisdiction requirements must be confirmed for the final electrical scope. No code-compliance determination is provided.'],
}

export const ELECTRICAL_STANDARD_SCOPE = [
  'Confirm the included device or fixture and accessible work area.',
  'Protect surrounding surfaces.',
  'Have a qualified person safely isolate applicable power.',
  'Inspect visible accessible mounting, device, and conductor conditions.',
  'Complete the included like-for-like replacement at the existing approved connection point.',
  'Restore power and test normal operation when included work is complete.',
  'Document visible unresolved concerns.',
] as const

export const ELECTRICAL_CLEANUP_SCOPE = ['Clean the work area.', 'Remove included packaging and repair debris.'] as const

function reviewModifier(id: string, field: string, name: string, flags: readonly ManualReviewFlag[], recommendation: string): ServiceModifier {
  return { id, name, description: `${name} requires formal review.`, conditions: [{ field, operator: 'equals', value: true }], effects: { requiresManualReview: true, manualReviewFlags: flags, recommendationsToAdd: [recommendation] }, customerExplanation: recommendation, internalNotes: [] }
}

function safetyModifier(id: string, field: string, name: string): ServiceModifier {
  return { id, name, description: `${name} requires immediate safety review.`, conditions: [{ field, operator: 'equals', value: true }], effects: { requiresManualReview: true, manualReviewFlags: ['electricalProfessionalReviewRequired', 'immediateSafetyConcern'], safetyOverride: { reason: `Reported ${name.toLowerCase()} involving electrical equipment.` } }, customerExplanation: 'The reported condition requires direct safety and professional review before ordinary pricing.', internalNotes: [] }
}

export const ELECTRICAL_MANUAL_REVIEW_MODIFIERS: readonly ServiceModifier[] = [
  reviewModifier('electrical-panel-work', 'panelWork', 'Panel work', ['electricalProfessionalReviewRequired', 'permitReviewRequired'], 'Panel work is outside minor-repair pricing and requires qualified review.'),
  reviewModifier('electrical-breaker', 'breakerReplacement', 'Breaker replacement', ['electricalProfessionalReviewRequired', 'permitReviewRequired'], 'Breaker replacement requires qualified review.'),
  reviewModifier('electrical-service-equipment', 'serviceEquipment', 'Service equipment', ['electricalProfessionalReviewRequired', 'utilityCoordinationRequired'], 'Service equipment requires qualified and possible utility coordination.'),
  reviewModifier('electrical-meter-equipment', 'meterEquipment', 'Meter equipment', ['electricalProfessionalReviewRequired', 'utilityCoordinationRequired'], 'Meter equipment requires qualified and possible utility coordination.'),
  reviewModifier('electrical-new-circuit', 'newCircuit', 'New circuit', ['electricalProfessionalReviewRequired', 'permitReviewRequired'], 'New circuits require formal scope, permit, and licensing review.'),
  reviewModifier('electrical-circuit-extension', 'circuitExtension', 'Circuit extension', ['electricalProfessionalReviewRequired', 'permitReviewRequired'], 'Circuit extensions require formal scope review.'),
  reviewModifier('electrical-aluminum', 'aluminumWiring', 'Aluminum branch wiring', ['electricalProfessionalReviewRequired'], 'Aluminum branch wiring requires qualified review.'),
  reviewModifier('electrical-knob-tube', 'knobAndTubeWiring', 'Knob-and-tube wiring', ['electricalProfessionalReviewRequired'], 'Knob-and-tube wiring requires qualified review.'),
  reviewModifier('electrical-burned-wiring', 'burnedWiring', 'Burned or melted wiring', ['electricalProfessionalReviewRequired', 'immediateSafetyConcern'], 'Burned or melted wiring requires direct professional review.'),
  reviewModifier('electrical-breaker-trips', 'repeatedBreakerTrips', 'Repeated breaker trips', ['electricalProfessionalReviewRequired'], 'Repeated breaker trips require diagnostic review.'),
  reviewModifier('electrical-unknown-voltage', 'unknownVoltage', 'Unknown voltage', ['electricalProfessionalReviewRequired'], 'Unknown voltage requires qualified verification.'),
  reviewModifier('electrical-three-phase', 'threePhase', 'Commercial three-phase system', ['electricalProfessionalReviewRequired'], 'Three-phase equipment requires qualified commercial electrical review.'),
  reviewModifier('electrical-life-safety', 'lifeSafetySystem', 'Life-safety system', ['lifeSafetySystemReviewRequired'], 'Life-safety equipment requires specialized review.'),
  reviewModifier('electrical-fire-alarm', 'fireAlarmSystem', 'Fire-alarm system', ['lifeSafetySystemReviewRequired'], 'Fire-alarm equipment requires specialized review.'),
  reviewModifier('electrical-security', 'securitySystem', 'Security system', ['lifeSafetySystemReviewRequired'], 'Security-system integration requires specialized review.'),
  reviewModifier('electrical-generator', 'generatorTransferEquipment', 'Generator transfer equipment', ['electricalProfessionalReviewRequired', 'utilityCoordinationRequired'], 'Generator transfer equipment requires specialized review.'),
  reviewModifier('electrical-solar', 'solarSystem', 'Solar system', ['electricalProfessionalReviewRequired', 'utilityCoordinationRequired'], 'Solar-system work requires specialized review.'),
  reviewModifier('electrical-ev', 'evChargingCircuit', 'EV charging circuit', ['electricalProfessionalReviewRequired', 'permitReviewRequired'], 'EV charging circuits require formal load and permit review.'),
  reviewModifier('electrical-wet-energized', 'wetEnergizedCondition', 'Wet or energized condition', ['electricalProfessionalReviewRequired', 'immediateSafetyConcern'], 'Wet or uncontrolled energized conditions require direct safety review.'),
  reviewModifier('electrical-utility-owned', 'utilityOwnedEquipment', 'Utility-owned equipment', ['utilityCoordinationRequired'], 'Utility-owned equipment requires utility coordination.'),
  reviewModifier('electrical-permit-uncertain', 'permitUncertain', 'Permit uncertainty', ['permitReviewRequired', 'jurisdictionReviewRequired'], 'Permit requirements must be confirmed.'),
  reviewModifier('electrical-license-uncertain', 'licensingUncertain', 'Licensing uncertainty', ['licensingReviewRequired'], 'Applicable trade licensing must be confirmed.'),
]

export const ELECTRICAL_SAFETY_OVERRIDE_MODIFIERS: readonly ServiceModifier[] = [
  safetyModifier('electrical-active-arcing', 'activeArcing', 'active electrical arcing'),
  safetyModifier('electrical-smoke', 'smoke', 'smoke'),
  safetyModifier('electrical-burning-odor', 'burningOdor', 'burning odor'),
  safetyModifier('electrical-melted-components', 'meltedComponents', 'melted electrical components'),
  safetyModifier('electrical-water-contact', 'waterContactingElectrical', 'water contacting electrical equipment'),
]
