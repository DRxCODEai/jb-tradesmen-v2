import { COMPANY_STANDARDS } from '../../company/companyStandards'
import type { NumericRange } from '../../types/v1/pricing'
import { mapRange } from './rangeMath'

export function roundCurrency(value: number): number {
  const increment = COMPANY_STANDARDS.billing.roundCurrencyToNearest
  return Math.round(value / increment) * increment
}

export function roundCurrencyRange(range: NumericRange): NumericRange {
  return mapRange(range, roundCurrency)
}
