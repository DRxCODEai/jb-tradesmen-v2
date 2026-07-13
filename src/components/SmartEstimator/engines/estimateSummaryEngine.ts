import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { EstimateSummaryResult, ServiceEstimateInput } from '../types/v1/engines'
import { calculateEstimateConfidence } from './confidenceEngine'
import { calculateServicePricing } from './pricingEngine'
import { buildRecommendations } from './recommendationEngine'
import { buildScopeOfWork } from './scopeOfWorkEngine'
import { calculateServiceTimeline } from './timelineEngine'

export const ESTIMATE_DISCLAIMER = 'This preliminary planning range is based solely on the information supplied and nationally informed production assumptions. It is not a proposal, contract, inspection, diagnosis, or guaranteed price. Site conditions, material selections, concealed damage, access, permits, jurisdictional requirements, and project changes may affect final pricing. Final pricing must be reviewed and approved by JBTRADESMENLLC.'

export function createEstimateSummary(input: ServiceEstimateInput, profile: MasterServiceTemplate): EstimateSummaryResult {
  const pricing = calculateServicePricing(input, profile)
  const timeline = calculateServiceTimeline(input, profile, pricing)
  const confidence = calculateEstimateConfidence(input, profile)
  const manualReviewFlags = [...new Set([...pricing.manualReviewFlags, ...timeline.manualReviewFlags])]

  return {
    service: {
      id: profile.identity.id,
      name: profile.identity.name,
      category: profile.identity.category,
      trade: profile.identity.trade,
    },
    propertyContext: input.propertyContext,
    serviceTiming: input.serviceTiming,
    laborHours: pricing.laborHours,
    laborCost: pricing.laborCost,
    tripCharges: pricing.tripCharges,
    materials: pricing.materials,
    equipment: pricing.equipment,
    total: pricing.total,
    expectedSiteVisits: timeline.expectedSiteVisits,
    calendarDurationDays: timeline.calendarDurationDays,
    schedulingWindow: timeline.schedulingMessage === 'Direct confirmation required'
      ? 'Direct confirmation required'
      : timeline.schedulingWindowBusinessDays,
    confidence: confidence.label,
    assumptions: profile.assumptions,
    exclusions: profile.exclusions,
    scopeSteps: buildScopeOfWork(input, profile),
    recommendations: buildRecommendations(input, profile, manualReviewFlags),
    manualReviewFlags,
    disclaimer: ESTIMATE_DISCLAIMER,
  }
}
