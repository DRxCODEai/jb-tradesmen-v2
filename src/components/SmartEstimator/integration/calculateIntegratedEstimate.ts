import type { Data } from '../types/estimator'
import type { SafetyOverrideResult } from '../types/v1/guardrails'
import { createEstimateSummary } from '../engines/estimateSummaryEngine'
import { SAFETY_OVERRIDE_GUIDANCE } from '../engines/guardrailEngine'
import type { IntegratedEstimateResult, MappedEstimatorInput } from './integrationTypes'
import { calculateFallbackEstimate, emergencyFallback, selectCategoryFallback } from './calculateFallbackEstimate'
import { resolveServiceFromDescription, type DescriptionServiceResolution } from './descriptionServiceResolver'
import { mapEstimatorInput } from './mapEstimatorInput'
import { mapEstimateResult } from './mapEstimateResult'
import { manualReviewReasonForSelection, resolveServiceProfile, resolveVisibleService } from './serviceIdMap'

type ResolutionSource = 'exactSelection' | 'guidedQuestions' | 'description'

function inferredSafetyOverride(mapped: MappedEstimatorInput): SafetyOverrideResult | null {
  const answers = mapped.engineInput.answers
  const active = ['gasOdor', 'carbonMonoxideAlarm', 'activeArcing', 'electricalArcing', 'smoke', 'burningOdor', 'meltedComponents', 'waterContactingElectrical', 'activeFlooding']
    .filter((field) => answers[field] === true)
  if (!active.length) return null
  return { active: true, suppressOrdinaryPricing: true, guidance: SAFETY_OVERRIDE_GUIDANCE, reasons: ['The supplied project description reports a potential immediate safety concern.'], manualReviewFlags: ['immediateSafetyConcern'] }
}

function cleanReviewReason(reason: string): string { return reason.replace(/^[a-zA-Z]+Required:\s*/, '') }

function calculateProfileEstimate(data: Data, serviceId: string, source: ResolutionSource, descriptionResolution?: DescriptionServiceResolution): IntegratedEstimateResult | null {
  const profile = resolveServiceProfile(serviceId)
  if (!profile) return null
  const mapped = mapEstimatorInput(data, serviceId)
  try {
    const summary = createEstimateSummary(mapped.engineInput, profile)
    if (summary.safetyOverride) {
      const reviewReasons = [...mapped.manualReviewReasons, ...summary.manualReviewFlags.map(cleanReviewReason), 'The complete repair scope must be assessed after the immediate condition is addressed.']
      const estimate = calculateFallbackEstimate(data, mapped, emergencyFallback(mapped), { reviewReasons, serviceName: profile.identity.name, safetyOverride: summary.safetyOverride, forceEmergency: true })
      return { estimate, metadata: { engineVersion: 'v1', supportedProfile: true, profileId: serviceId, fallbackUsed: false, errorCode: null, warnings: mapped.warnings, resolutionSource: source, descriptionConfidence: descriptionResolution?.confidence, matchedKeywords: descriptionResolution?.matchedKeywords }, engineSummary: summary }
    }
    const estimate = mapEstimateResult(summary, data, mapped)
    if (source === 'description' && estimate.confidence === 'Strong') estimate.confidence = 'Moderate'
    if (source === 'description') {
      estimate.resolvedByDescription = true
      estimate.manualReviewRequired = true
      estimate.manualReviewReasons = [...new Set([...(estimate.manualReviewReasons ?? []), `Service profile resolved from the project description using: ${descriptionResolution?.matchedKeywords.join(', ')}. Confirm the final scope before approval.`])]
      estimate.manualReviewRecommended = true
    }
    return { estimate, metadata: { engineVersion: 'v1', supportedProfile: true, profileId: serviceId, fallbackUsed: false, errorCode: mapped.manualReviewReasons.length ? 'propertyContextUncertain' : null, warnings: mapped.warnings, resolutionSource: source, descriptionConfidence: descriptionResolution?.confidence, matchedKeywords: descriptionResolution?.matchedKeywords }, engineSummary: summary }
  } catch { return calculateIntegrationFailureFallback(data, mapped) }
}

export function calculateIntegrationFailureFallback(data: Data, existingMapped?: MappedEstimatorInput): IntegratedEstimateResult {
  const mapped = existingMapped ?? mapEstimatorInput(data, 'category-fallback')
  const safety = inferredSafetyOverride(mapped)
  const notice = 'A detailed service profile could not be applied to this request, so this result uses broader category-level assumptions.'
  const definition = safety ? emergencyFallback(mapped) : selectCategoryFallback(data, mapped)
  const estimate = calculateFallbackEstimate(data, mapped, definition, { reviewReasons: [notice, ...mapped.manualReviewReasons], serviceName: data.service, safetyOverride: safety, forceEmergency: Boolean(safety) })
  return { estimate, metadata: { engineVersion: 'v1', supportedProfile: false, profileId: null, fallbackUsed: false, errorCode: 'engineFailure', warnings: [notice], resolutionSource: 'categoryFallback' }, engineSummary: null }
}

export function calculateIntegratedEstimate(data: Data): IntegratedEstimateResult {
  const exact = resolveVisibleService(data.service)
  if (exact.serviceId && exact.profile) {
    const result = calculateProfileEstimate(data, exact.serviceId, 'exactSelection')
    if (result) return result
  }

  const guidedServiceId = data.serviceAnswers.fallbackSubtype
  if (typeof guidedServiceId === 'string' && resolveServiceProfile(guidedServiceId)) {
    const result = calculateProfileEstimate(data, guidedServiceId, 'guidedQuestions')
    if (result) return result
  }

  const descriptionResolution = resolveServiceFromDescription(data)
  if (descriptionResolution.serviceId && !descriptionResolution.ambiguous) {
    const result = calculateProfileEstimate(data, descriptionResolution.serviceId, 'description', descriptionResolution)
    if (result) return result
  }

  const mapped = mapEstimatorInput(data, 'category-fallback')
  const safety = inferredSafetyOverride(mapped)
  const reviewReasons = [
    manualReviewReasonForSelection(data.service ?? 'Not selected'),
    ...mapped.manualReviewReasons,
    ...(descriptionResolution.ambiguous ? ['The supplied description matches more than one service profile.'] : []),
    ...(!mapped.engineInput.measurementsProvided ? ['Measurements are missing or not sufficiently defined.'] : []),
    'The exact scope, material selection, and site conditions require confirmation.',
  ]
  const definition = safety ? emergencyFallback(mapped) : selectCategoryFallback(data, mapped)
  const estimate = calculateFallbackEstimate(data, mapped, definition, { reviewReasons, safetyOverride: safety, forceEmergency: Boolean(safety), serviceName: data.service })
  return {
    estimate,
    metadata: { engineVersion: 'v1', supportedProfile: false, profileId: null, fallbackUsed: false, errorCode: 'unsupportedService', warnings: mapped.warnings, resolutionSource: 'categoryFallback', descriptionConfidence: descriptionResolution.confidence, matchedKeywords: descriptionResolution.matchedKeywords },
    engineSummary: null,
  }
}
