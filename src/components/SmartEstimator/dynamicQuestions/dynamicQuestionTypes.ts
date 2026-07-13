import type { EstimatorQuestion } from '../templates/estimatorQuestionTemplate'

export type MeasurementAnswer = {
  value: number | null
  unit: string
  unknown: boolean
}

export type ServiceAnswerValue = string | number | boolean | string[] | MeasurementAnswer | null | undefined
export type ServiceAnswers = Record<string, ServiceAnswerValue>

export interface DynamicEstimatorQuestion extends EstimatorQuestion {
  measurementUnits?: readonly string[]
  fullWidth?: boolean
}

export interface ResolvedQuestionSet {
  serviceId: string | null
  serviceName: string
  questions: readonly DynamicEstimatorQuestion[]
  unansweredRequired: readonly DynamicEstimatorQuestion[]
  fallback: boolean
}

export function isMeasurementAnswer(value: ServiceAnswerValue): value is MeasurementAnswer {
  return typeof value === 'object' && value !== null && 'unit' in value && 'unknown' in value
}

export function isAnswered(value: ServiceAnswerValue): boolean {
  if (value === undefined || value === null || value === '') return false
  if (Array.isArray(value)) return value.length > 0
  if (isMeasurementAnswer(value)) return value.unknown || (value.value !== null && Number.isFinite(value.value))
  return true
}
