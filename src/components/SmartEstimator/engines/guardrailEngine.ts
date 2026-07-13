import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceEstimateInput } from '../types/v1/engines'
import type { GuardrailEngineResult, ManualReviewFlag, RegulatedWorkReview } from '../types/v1/guardrails'
import { createConditionContext, evaluateConditions } from '../utils/v1/evaluateConditions'

export const SAFETY_OVERRIDE_GUIDANCE = 'This condition may require immediate professional or emergency attention. Do not continue operating or handling the affected system. Contact the appropriate utility, emergency service, or qualified professional based on the observed condition.'

const FLAG_REASONS: Readonly<Record<ManualReviewFlag, string>> = {
  jurisdictionReviewRequired: 'Jurisdiction requirements must be confirmed before final pricing.',
  licensingReviewRequired: 'Applicable trade licensing must be confirmed before final pricing.',
  permitReviewRequired: 'Permit requirements must be confirmed before final pricing.',
  electricalProfessionalReviewRequired: 'The reported electrical condition requires qualified professional review.',
  refrigerantCertificationRequired: 'Refrigerant-circuit work requires appropriately certified professional review.',
  combustionSafetyReviewRequired: 'The reported combustion or gas-system condition requires qualified safety review.',
  lifeSafetySystemReviewRequired: 'Life-safety or emergency-system work requires specialized professional review.',
  utilityCoordinationRequired: 'Utility-owned or service equipment requires utility or qualified professional coordination.',
  structuralReviewRequired: 'The reported condition may require structural review before final pricing.',
  hazardousMaterialReviewRequired: 'Potential hazardous materials require qualified review before final pricing.',
  immediateSafetyConcern: 'The reported condition may require immediate professional or emergency attention.',
}

export function evaluateServiceGuardrails(input: ServiceEstimateInput, profile: MasterServiceTemplate): GuardrailEngineResult {
  const context = createConditionContext(input)
  const activeModifiers = profile.modifiers.filter((modifier) => evaluateConditions(modifier.conditions, context))
  const flags: ManualReviewFlag[] = []

  if (profile.permitsAndCode.jurisdictionReviewRequired) flags.push('jurisdictionReviewRequired')
  if (profile.permitsAndCode.licensedTradeMayBeRequired) flags.push('licensingReviewRequired')
  if (profile.permitsAndCode.permitMayBeRequired) flags.push('permitReviewRequired')
  for (const modifier of activeModifiers) flags.push(...(modifier.effects.manualReviewFlags ?? []))

  const uniqueFlags = [...new Set(flags)]
  const reviews: RegulatedWorkReview[] = uniqueFlags.map((flag) => ({ flag, reason: FLAG_REASONS[flag] }))
  const safetyDefinitions = activeModifiers.flatMap((modifier) => modifier.effects.safetyOverride ? [modifier.effects.safetyOverride] : [])
  const safetyOverride = safetyDefinitions.length === 0 ? null : {
    active: true as const,
    suppressOrdinaryPricing: true as const,
    guidance: safetyDefinitions.find((definition) => definition.guidance)?.guidance ?? SAFETY_OVERRIDE_GUIDANCE,
    reasons: [...new Set(safetyDefinitions.map((definition) => definition.reason))],
    manualReviewFlags: [...new Set<ManualReviewFlag>([...uniqueFlags, 'immediateSafetyConcern'])],
  }

  return { reviews, safetyOverride }
}
