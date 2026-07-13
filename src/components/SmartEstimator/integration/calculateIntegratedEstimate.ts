import type { Data } from '../types/estimator'
import { createEstimateSummary } from '../engines/estimateSummaryEngine'
import { calculateEstimate as calculateLegacyEstimate } from '../utils/calculateEstimate'
import type { IntegratedEstimateResult, IntegrationErrorCode } from './integrationTypes'
import { mapEstimatorInput } from './mapEstimatorInput'
import { createManualReviewEstimate, INTEGRATED_ESTIMATE_DISCLAIMER, mapEstimateResult } from './mapEstimateResult'
import { resolveVisibleService } from './serviceIdMap'

function manualReview(data: Data, reasons: readonly string[], errorCode: IntegrationErrorCode = 'unsupportedService'): IntegratedEstimateResult {
  return { estimate: createManualReviewEstimate(data, reasons), metadata: { engineVersion: 'v1', supportedProfile: false, profileId: null, fallbackUsed: false, errorCode, warnings: reasons }, engineSummary: null }
}

function categoryReviewReason(data: Data): string | null {
  if (data.category === 'Remodel') return 'Remodeling profiles are not yet available. This project requires professional scope review before a meaningful preliminary range can be provided.'
  if (data.category === 'Property Assessment') return 'Property Assessment is scheduled as a professional assessment and is not priced as a repair.'
  if (data.service === 'Emergency Repair') return 'Emergency Repair requires a specific underlying service before pricing.'
  return null
}

export function calculateIntegratedEstimate(data: Data): IntegratedEstimateResult {
  const categoryReason = categoryReviewReason(data)
  if (categoryReason) return manualReview(data, [categoryReason])

  const resolution = resolveVisibleService(data.service)
  if (!resolution.serviceId) return manualReview(data, resolution.manualReviewReasons)
  if (!resolution.profile) return manualReview(data, resolution.manualReviewReasons, 'missingProfile')

  const mapped = mapEstimatorInput(data, resolution.serviceId)
  try {
    const summary = createEstimateSummary(mapped.engineInput, resolution.profile)
    const estimate = mapEstimateResult(summary, data, mapped)
    return {
      estimate,
      metadata: { engineVersion: 'v1', supportedProfile: true, profileId: resolution.serviceId, fallbackUsed: false, errorCode: mapped.manualReviewReasons.length ? 'propertyContextUncertain' : null, warnings: mapped.warnings },
      engineSummary: summary,
    }
  } catch {
    const fallback = calculateLegacyEstimate(data)
    const notice = 'A deterministic service calculation could not be completed. This temporary planning range requires professional review.'
    return {
      estimate: { ...fallback, status: 'estimate', serviceName: data.service, serviceProfileId: resolution.serviceId, manualReviewRequired: true, manualReviewReasons: [notice], fallbackUsed: true, engineVersion: 'legacy-fallback', disclaimer: INTEGRATED_ESTIMATE_DISCLAIMER },
      metadata: { engineVersion: 'v1', supportedProfile: true, profileId: resolution.serviceId, fallbackUsed: true, errorCode: 'engineFailure', warnings: [notice] },
      engineSummary: null,
    }
  }
}
