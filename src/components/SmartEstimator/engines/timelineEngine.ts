import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { PricingEngineResult, ServiceEstimateInput, TimelineEngineResult } from '../types/v1/engines'
import { createConditionContext, evaluateConditions } from '../utils/v1/evaluateConditions'
import { mapRange, normalizeRange } from '../utils/v1/rangeMath'
import { calculateServicePricing } from './pricingEngine'

export function calculateServiceTimeline(
  input: ServiceEstimateInput,
  profile: MasterServiceTemplate,
  pricing: PricingEngineResult = calculateServicePricing(input, profile),
): TimelineEngineResult {
  const context = createConditionContext(input)
  const activeModifiers = profile.modifiers.filter((modifier) => evaluateConditions(modifier.conditions, context))
  const timelineMultiplier = activeModifiers.reduce((value, modifier) => value * (modifier.effects.timelineMultiplier ?? 1), 1)
  const manualReviewFlags = [
    ...pricing.manualReviewFlags,
    ...activeModifiers.filter((modifier) => modifier.effects.requiresManualReview).map((modifier) => modifier.name),
  ]
  if (profile.timeline.weatherSensitive) manualReviewFlags.push('Weather may affect the calendar schedule')
  if (profile.timeline.permitMayAffectTimeline && !input.permitRequirementsResolved) manualReviewFlags.push('Permit timing requires jurisdiction review')

  const emergencyScheduling = input.serviceTiming !== 'standard' || input.emergency || input.afterHours
  const schedulingWindowBusinessDays = emergencyScheduling
    ? { minimum: 0, maximum: 0 }
    : { ...COMPANY_STANDARDS.scheduling.standardSchedulingWindowBusinessDays }

  return {
    technicianLaborHours: normalizeRange(pricing.laborHours),
    expectedSiteVisits: pricing.siteVisits,
    calendarDurationDays: mapRange(profile.timeline.calendarDurationDays, (days) => days * timelineMultiplier),
    dryingOrCuringTimeHours: profile.timeline.dryingOrCuringTimeHours
      ? mapRange(profile.timeline.dryingOrCuringTimeHours, (hours) => hours * timelineMultiplier)
      : undefined,
    materialLeadTimeDays: profile.timeline.materialLeadTimeDays,
    schedulingWindowBusinessDays,
    schedulingMessage: emergencyScheduling ? 'Direct confirmation required' : `${schedulingWindowBusinessDays.minimum}–${schedulingWindowBusinessDays.maximum} business days`,
    manualReviewFlags: [...new Set(manualReviewFlags)],
  }
}
