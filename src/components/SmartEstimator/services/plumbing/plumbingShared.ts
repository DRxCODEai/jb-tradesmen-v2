import type { ServiceModifier } from '../../templates/serviceModifierTemplate'
import type { PermitAndCodeRequirements, ServiceEquipment } from '../../types/v1/service'

export const PLUMBING_EQUIPMENT: ServiceEquipment = {
  typicalEquipment: [],
  rentalMayBeRequired: false,
  elevatedAccessPossible: false,
  specialtyEquipmentNotes: ['Ordinary hand tools are not included as customer equipment charges.'],
}

export const PLUMBING_PERMIT_REVIEW: PermitAndCodeRequirements = {
  permitMayBeRequired: true,
  inspectionMayBeRequired: true,
  licensedTradeMayBeRequired: true,
  jurisdictionReviewRequired: true,
  notes: ['Permit, inspection, licensing, and code requirements must be confirmed for the jurisdiction and final scope.'],
}

export const PLUMBING_DIRECT_CONTACT_MODIFIERS: readonly ServiceModifier[] = [
  { id: 'plumbing-active-flooding', name: 'Active flooding', description: 'Active flooding requires immediate direct contact.', conditions: [{ field: 'activeFlooding', operator: 'equals', value: true }], effects: { requiresManualReview: true, manualReviewFlags: ['immediateSafetyConcern'], safetyOverride: { reason: 'Reported active uncontrolled flooding.' }, recommendationsToAdd: ['Contact the appropriate utility, emergency service, or qualified professional based on the observed condition.'] }, customerExplanation: 'Active flooding requires immediate direct coordination.', internalNotes: [] },
  { id: 'plumbing-uncontrolled-leak', name: 'Uncontrolled leak', description: 'An uncontrolled leak requires immediate direct contact.', conditions: [{ field: 'uncontrolledLeak', operator: 'equals', value: true }], effects: { requiresManualReview: true, recommendationsToAdd: ['Contact JBTRADESMENLLC directly for active flooding or an uncontrolled leak.'] }, customerExplanation: 'An uncontrolled leak requires immediate direct coordination.', internalNotes: [] },
]

export const PLUMBING_STANDARD_SCOPE = ['Protect the accessible work area.', 'Shut off the available affected water supply where applicable.', 'Relieve pressure or drain the affected component where applicable.', 'Inspect visible accessible connections.', 'Restore the system after included work.', 'Test normal operation.', 'Check visible included connections for leaks.'] as const

export const PLUMBING_CLEANUP_SCOPE = ['Clean the work area.', 'Remove included packaging and repair debris.'] as const
