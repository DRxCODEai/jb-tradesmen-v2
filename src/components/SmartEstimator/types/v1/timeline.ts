import type { MinimumMaximumRange, NumericRange } from './pricing'

export interface ServiceTimeline {
  onsiteLaborHours: NumericRange
  calendarDurationDays: NumericRange
  schedulingWindowBusinessDays: MinimumMaximumRange
  dryingOrCuringTimeHours?: NumericRange
  materialLeadTimeDays?: NumericRange
  returnVisitRequired: boolean
  weatherSensitive: boolean
  permitMayAffectTimeline: boolean
}
