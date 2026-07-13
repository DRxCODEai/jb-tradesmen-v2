import { COMPANY_STANDARDS } from '../company/companyStandards'
import type { Data, Estimate } from '../types/estimator'
import type { EstimateSummaryResult } from '../types/v1/engines'
import type { NumericRange } from '../types/v1/pricing'
import type { MappedEstimatorInput } from './integrationTypes'
import { projectDetails } from './integrationTypes'

export const INTEGRATED_ESTIMATE_DISCLAIMER = 'This preliminary planning range is based solely on the information supplied and nationally informed production assumptions. It is not a proposal, contract, inspection, diagnosis, code-compliance determination, or guaranteed price. Site conditions, material selections, concealed damage, access, permits, jurisdictional requirements, regulated-trade requirements, and project changes may affect final pricing. Final pricing must be reviewed and approved by JBTRADESMENLLC.'

function number(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value)
}

function moneyValue(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: COMPANY_STANDARDS.currency, maximumFractionDigits: 0 }).format(value)
}

function moneyRange(range: NumericRange): string {
  return range.minimum === range.maximum ? moneyValue(range.minimum) : `${moneyValue(range.minimum)}–${moneyValue(range.maximum)}`
}

function numericRange(range: NumericRange, singular: string, plural: string): string {
  if (range.minimum === range.maximum) return `${number(range.minimum)} ${range.minimum === 1 ? singular : plural}`
  return `${number(range.minimum)}–${number(range.maximum)} ${plural}`
}

function scheduling(summary: EstimateSummaryResult): string {
  if (summary.schedulingWindow === 'Direct confirmation required') return summary.schedulingWindow
  return `${summary.schedulingWindow.minimum}–${summary.schedulingWindow.maximum} business days`
}

function customerFacingReason(reason: string): string {
  return reason.replace(/^[a-zA-Z]+Required:\s*/, '')
}

export function mapEstimateResult(summary: EstimateSummaryResult, data: Data, mapped: MappedEstimatorInput): Estimate {
  const safety = summary.safetyOverride
  const manualReviewReasons = [...new Set([...mapped.manualReviewReasons, ...summary.manualReviewFlags.map(customerFacingReason)])]
  const recommendations = summary.recommendations.map((item) => item.text)
  const common: Pick<Estimate, 'serviceName'|'serviceProfileId'|'applicableLaborRate'|'tripChargeTotal'|'tripChargePerVisit'|'expectedSiteVisits'|'equipmentCostRange'|'schedulingWindow'|'manualReviewRequired'|'manualReviewReasons'|'pricingContext'|'fallbackUsed'|'engineVersion'|'assumptions'|'recommendations'|'missingInformation'|'disclaimer'|'projectDetails'> = {
    serviceName: summary.service.name,
    serviceProfileId: summary.service.id,
    applicableLaborRate: summary.laborRate,
    tripChargeTotal: moneyValue(summary.tripCharges),
    tripChargePerVisit: COMPANY_STANDARDS.billing.tripChargePerVisit,
    expectedSiteVisits: `${summary.expectedSiteVisits}`,
    equipmentCostRange: summary.equipment.maximum > 0 ? moneyRange(summary.equipment) : undefined,
    schedulingWindow: scheduling(summary),
    manualReviewRequired: manualReviewReasons.length > 0,
    manualReviewReasons,
    pricingContext: mapped.pricingContext,
    fallbackUsed: false,
    engineVersion: 'v1',
    assumptions: [...summary.assumptions],
    recommendations: [...new Set(recommendations)],
    missingInformation: [...summary.missingInformation],
    disclaimer: INTEGRATED_ESTIMATE_DISCLAIMER,
    projectDetails: projectDetails(data),
  }

  if (safety) {
    return {
      laborHours: 'Not calculated — safety review required', labor: 'Not calculated', materials: 'Not calculated', total: 'Safety review required',
      duration: 'Direct professional review required', confidence: summary.confidence, considerations: [safety.guidance], status: 'safetyOverride',
      safetyOverride: { guidance: safety.guidance, reasons: [...safety.reasons] }, ...common, manualReviewRequired: true,
    }
  }

  return {
    laborHours: numericRange(summary.laborHours, 'technician hour', 'technician hours'),
    labor: moneyRange(summary.laborCost),
    materials: moneyRange(summary.materials),
    total: moneyRange(summary.total),
    duration: numericRange(summary.calendarDurationDays, 'calendar day', 'calendar days'),
    confidence: summary.confidence,
    considerations: [...new Set([...mapped.warnings, ...summary.exclusions, ...summary.missingInformation.map((item) => `Additional information requested: ${item}`)])],
    status: 'estimate',
    ...common,
  }
}

export function createManualReviewEstimate(data: Data, reasons: readonly string[]): Estimate {
  const uniqueReasons = [...new Set(reasons)]
  return {
    laborHours: 'Not calculated — professional review required', labor: 'Not calculated', materials: 'Not calculated', total: 'Professional review required',
    duration: 'To be confirmed after scope review', confidence: 'Preliminary', considerations: uniqueReasons, status: 'manualReview',
    manualReviewRequired: true, manualReviewReasons: uniqueReasons, fallbackUsed: false, engineVersion: 'v1',
    recommendations: ['Schedule Professional Assessment', 'Request Formal Estimate', 'Call JBTRADESMENLLC'], disclaimer: INTEGRATED_ESTIMATE_DISCLAIMER,
    projectDetails: projectDetails(data),
  }
}
