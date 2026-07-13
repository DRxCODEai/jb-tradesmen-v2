import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { RecommendationItem, ServiceEstimateInput } from '../types/v1/engines'
import { createConditionContext, evaluateConditions } from '../utils/v1/evaluateConditions'

export function buildRecommendations(
  input: ServiceEstimateInput,
  profile: MasterServiceTemplate,
  manualReviewFlags: readonly string[] = [],
): readonly RecommendationItem[] {
  const context = createConditionContext(input)
  const activeModifiers = profile.modifiers.filter((modifier) => evaluateConditions(modifier.conditions, context))
  const items: RecommendationItem[] = [
    ...profile.recommendations.relatedServices.map((text) => ({ category: 'relatedService' as const, text })),
    ...profile.recommendations.customerPreparation.map((text) => ({ category: 'customerPreparation' as const, text })),
    ...profile.recommendations.professionalReviewTriggers.map((text) => ({ category: 'manualReview' as const, text })),
    ...activeModifiers.flatMap((modifier) => (modifier.effects.recommendationsToAdd ?? []).map((text) => ({ category: 'nextStep' as const, text }))),
    ...manualReviewFlags.map((text) => ({ category: 'manualReview' as const, text })),
  ]

  if (profile.permitsAndCode.licensedTradeMayBeRequired) {
    items.push({ category: 'safetyConsideration', text: 'Confirm whether a properly licensed trade is required for the final scope.' })
  }
  if (profile.permitsAndCode.jurisdictionReviewRequired) {
    items.push({ category: 'safetyConsideration', text: 'Confirm permit and inspection requirements with the applicable jurisdiction.' })
  }

  return items.filter((item, index) => items.findIndex((candidate) => candidate.category === item.category && candidate.text === item.text) === index)
}
