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

function timeRange(range: NumericRange, unit: string): string {
  return range.minimum === range.maximum ? `${number(range.minimum)} ${unit}` : `${number(range.minimum)}–${number(range.maximum)} ${unit}`
}

function customerFacingReason(reason: string): string {
  return reason.replace(/^[a-zA-Z]+Required:\s*/, '')
}

export function mapEstimateResult(summary: EstimateSummaryResult, data: Data, mapped: MappedEstimatorInput): Estimate {
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

  return {
    laborHours: numericRange(summary.laborHours, 'technician hour', 'technician hours'),
    labor: moneyRange(summary.laborCost),
    materials: moneyRange(summary.materials),
    total: moneyRange(summary.total),
    duration: numericRange(summary.calendarDurationDays, 'calendar day', 'calendar days'),
    confidence: summary.confidence,
    considerations: [...new Set([...mapped.warnings, ...summary.exclusions, ...summary.missingInformation.map((item) => `Additional information requested: ${item}`)])],
    status: 'estimate', resultHeading: 'Preliminary Project Estimate', resultType: 'supported', resultLabel: `${summary.service.name} Preliminary Estimate`,
    resolvedServiceName: summary.service.name, selectedServiceName: data.service ?? 'Not selected',
    serviceTiming: summary.serviceTiming === 'standard' && !summary.projectInput.emergency && !summary.projectInput.afterHours ? 'Standard' : 'Emergency / After Hours',
    onsiteLaborDescription: numericRange(summary.laborHours, 'technician hour', 'technician hours'),
    calendarDuration: numericRange(summary.calendarDurationDays, 'calendar day', 'calendar days'),
    curingTime: summary.dryingOrCuringTimeHours ? timeRange(summary.dryingOrCuringTimeHours, 'hours') : undefined,
    materialLeadTime: summary.materialLeadTimeDays ? timeRange(summary.materialLeadTimeDays, 'calendar days') : undefined,
    confidenceImprovingFactors: [...summary.improvingConfidenceFactors], confidenceReducingFactors: [...summary.reducingConfidenceFactors],
    scopeSteps: [...summary.scopeSteps], exclusions: [...summary.exclusions], customerSuppliedMaterials: data.materials || summary.projectInput.customerSuppliedMaterials,
    manualReviewRecommended: manualReviewReasons.length > 0, broadFallbackUsed: false,
    calculationRanges: { laborHours: summary.laborHours, laborCost: summary.laborCost, tripCharges: { minimum: summary.tripCharges, typical: summary.tripCharges, maximum: summary.tripCharges }, materials: summary.materials, equipment: summary.equipment, total: summary.total, visits: { minimum: summary.expectedSiteVisits, typical: summary.expectedSiteVisits, maximum: summary.expectedSiteVisits } },
    laborHoursRange: summary.laborHours, laborCostRange: summary.laborCost, expectedVisitRange: { minimum: summary.expectedSiteVisits, typical: summary.expectedSiteVisits, maximum: summary.expectedSiteVisits }, tripChargeRange: { minimum: summary.tripCharges, typical: summary.tripCharges, maximum: summary.tripCharges }, materialCostRange: summary.materials, equipmentRange: summary.equipment, totalRange: summary.total,
    ...common,
  }
}
