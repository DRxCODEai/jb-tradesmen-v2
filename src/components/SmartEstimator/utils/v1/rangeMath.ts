import type { NumericRange } from '../../types/v1/pricing'

export function normalizeRange(range: NumericRange): NumericRange {
  const minimum = Math.max(0, range.minimum)
  const typical = Math.max(minimum, range.typical)
  const maximum = Math.max(typical, range.maximum)
  return { minimum, typical, maximum }
}

export function mapRange(range: NumericRange, transform: (value: number) => number): NumericRange {
  return normalizeRange({
    minimum: transform(range.minimum),
    typical: transform(range.typical),
    maximum: transform(range.maximum),
  })
}

export function multiplyRange(range: NumericRange, multiplier: number): NumericRange {
  return mapRange(range, (value) => value * Math.max(0, multiplier))
}

export function addRanges(...ranges: readonly NumericRange[]): NumericRange {
  return normalizeRange(ranges.reduce<NumericRange>((total, range) => ({
    minimum: total.minimum + range.minimum,
    typical: total.typical + range.typical,
    maximum: total.maximum + range.maximum,
  }), { minimum: 0, typical: 0, maximum: 0 }))
}

export function addFlatAmount(range: NumericRange, amount: number): NumericRange {
  return mapRange(range, (value) => value + Math.max(0, amount))
}

export function clampRangeMinimum(range: NumericRange, minimum: number): NumericRange {
  return normalizeRange({
    minimum: Math.max(range.minimum, minimum),
    typical: Math.max(range.typical, minimum),
    maximum: Math.max(range.maximum, minimum),
  })
}
