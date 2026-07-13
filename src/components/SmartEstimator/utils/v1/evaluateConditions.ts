import type { ServiceModifierCondition } from '../../templates/serviceModifierTemplate'
import type { ServiceEstimateInput } from '../../types/v1/engines'

export type ConditionContext = Readonly<Record<string, unknown>>

export function createConditionContext(input: ServiceEstimateInput): ConditionContext {
  return { ...input.answers, ...input }
}

function includesValue(actual: unknown, expected: unknown): boolean {
  if (typeof actual === 'string' && typeof expected === 'string') return actual.includes(expected)
  if (Array.isArray(actual)) return actual.includes(expected)
  return false
}

export function evaluateCondition(condition: ServiceModifierCondition, context: ConditionContext): boolean {
  const actual = context[condition.field]
  const expected = condition.value

  switch (condition.operator) {
    case 'equals': return actual === expected
    case 'notEquals': return actual !== expected
    case 'includes': return includesValue(actual, expected)
    case 'greaterThan': return typeof actual === 'number' && typeof expected === 'number' && actual > expected
    case 'lessThan': return typeof actual === 'number' && typeof expected === 'number' && actual < expected
    case 'exists': return actual !== undefined && actual !== null && actual !== ''
  }
}

export function evaluateConditions(conditions: readonly ServiceModifierCondition[], context: ConditionContext): boolean {
  return conditions.every((condition) => evaluateCondition(condition, context))
}
