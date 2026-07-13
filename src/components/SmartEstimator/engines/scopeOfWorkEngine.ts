import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceEstimateInput } from '../types/v1/engines'
import { createConditionContext, evaluateConditions } from '../utils/v1/evaluateConditions'

export function buildScopeOfWork(input: ServiceEstimateInput, profile: MasterServiceTemplate): readonly string[] {
  const context = createConditionContext(input)
  const modifierSteps = profile.modifiers
    .filter((modifier) => evaluateConditions(modifier.conditions, context))
    .flatMap((modifier) => modifier.effects.scopeStepsToAdd ?? [])

  return [...new Set([
    ...profile.scopeOfWork.standardSteps,
    ...profile.scopeOfWork.conditionalSteps,
    ...modifierSteps,
    ...profile.scopeOfWork.cleanupSteps,
  ])]
}
