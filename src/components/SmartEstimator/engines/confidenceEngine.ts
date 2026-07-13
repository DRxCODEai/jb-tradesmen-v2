import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ConfidenceEngineResult, ConfidenceLabel, ServiceEstimateInput } from '../types/v1/engines'
import { createConditionContext, evaluateConditions } from '../utils/v1/evaluateConditions'

function hasAnswer(input: ServiceEstimateInput, field: string): boolean {
  const answer = input.answers[field]
  if (Array.isArray(answer)) return answer.length > 0
  return answer !== undefined && answer !== ''
}

function labelFor(score: number): ConfidenceLabel {
  if (score >= 75) return 'Strong'
  if (score >= 50) return 'Moderate'
  return 'Preliminary'
}

export function calculateEstimateConfidence(input: ServiceEstimateInput, profile: MasterServiceTemplate): ConfidenceEngineResult {
  let score = 50
  const improvingFactors: string[] = []
  const reducingFactors: string[] = []
  const missingInformation: string[] = []
  const add = (points: number, factor: string) => { score += points; improvingFactors.push(factor) }
  const subtract = (points: number, factor: string) => { score -= points; reducingFactors.push(factor) }

  if (input.descriptionLength >= 100) add(10, 'Detailed project description supplied')
  else missingInformation.push('A project description of at least 100 characters')
  if ((input.quantity ?? input.itemCount ?? input.squareFeet ?? input.linearFeet ?? 0) > 0) add(8, 'Quantity supplied')
  else missingInformation.push('Project quantity')
  if (input.measurementsProvided) add(10, 'Measurements supplied')
  if (input.photoCount >= 1) add(8, 'At least one photo supplied')
  if (input.photoCount >= 3) add(5, 'Three or more photos supplied')
  if (input.locationProvided) add(5, 'Project location supplied')
  if (input.accessDifficulty) add(5, 'Access information supplied')
  if (input.condition !== 'unknown') add(5, 'Known project condition supplied')

  const requiredQuestions = profile.estimatorQuestions.filter((question) => question.required)
  const answeredRequired = requiredQuestions.filter((question) => hasAnswer(input, question.field)).length
  if (requiredQuestions.length > 0 && answeredRequired > 0) {
    add(Math.min(15, (answeredRequired / requiredQuestions.length) * 15), 'Service-specific required questions answered')
  }
  for (const question of requiredQuestions) {
    if (!hasAnswer(input, question.field)) missingInformation.push(question.label)
  }

  if (input.condition === 'unknown') subtract(10, 'Project condition is unknown')
  if (input.accessDifficulty === 'unknown') subtract(8, 'Access difficulty is unknown')
  if (input.unclassifiedService) subtract(15, 'Service is other or unclassified')
  if (profile.confidence.requiredForStrongConfidence.includes('measurements') && !input.measurementsProvided) subtract(12, 'Measurements are missing for a measurement-dependent service')
  if (profile.confidence.requiredForStrongConfidence.includes('photos') && input.photoCount === 0) subtract(8, 'Photos are missing for a visually dependent service')
  if (input.emergency || input.serviceTiming === 'emergency') subtract(5, 'Emergency conditions limit planning confidence')
  if (input.concealedDamagePossible) subtract(10, 'Concealed damage may affect the scope')
  if (profile.permitsAndCode.permitMayBeRequired && !input.permitRequirementsResolved) subtract(10, 'Permit requirements are unresolved')
  if (input.finishMatching && input.photoCount === 0 && !hasAnswer(input, 'finishDetails')) subtract(5, 'Finish-matching details and photos are missing')

  const context = createConditionContext(input)
  for (const modifier of profile.modifiers.filter((item) => evaluateConditions(item.conditions, context))) {
    if (modifier.effects.confidenceAdjustment) {
      score += modifier.effects.confidenceAdjustment
      const target = modifier.effects.confidenceAdjustment > 0 ? improvingFactors : reducingFactors
      target.push(modifier.name)
    }
  }

  score = Math.max(0, Math.min(100, Math.round(score)))
  return {
    score,
    label: labelFor(score),
    improvingFactors: [...new Set(improvingFactors)],
    reducingFactors: [...new Set(reducingFactors)],
    missingInformation: [...new Set(missingInformation)],
  }
}
