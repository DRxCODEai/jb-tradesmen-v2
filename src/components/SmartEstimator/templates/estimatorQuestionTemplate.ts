export type EstimatorQuestionType =
  | 'singleSelect'
  | 'multiSelect'
  | 'number'
  | 'text'
  | 'textarea'
  | 'boolean'
  | 'measurement'
  | 'photo'

export type EstimatorQuestionEffect =
  | 'labor'
  | 'materials'
  | 'equipment'
  | 'timeline'
  | 'confidence'
  | 'recommendations'
  | 'scope'
  | 'manualReview'

export type EstimatorQuestionValue = string | number | boolean | readonly string[]

export interface EstimatorQuestionOption {
  label: string
  value: string | number | boolean
}

export interface QuestionVisibilityCondition {
  field: string
  operator: 'equals' | 'notEquals' | 'includes' | 'greaterThan' | 'lessThan' | 'exists'
  value?: EstimatorQuestionValue
}

export interface EstimatorQuestion {
  id: string
  field: string
  label: string
  helpText: string
  type: EstimatorQuestionType
  required: boolean
  options: readonly EstimatorQuestionOption[]
  minimum?: number
  maximum?: number
  unit?: string
  placeholder?: string
  affects: readonly EstimatorQuestionEffect[]
  confidenceWeight: number
  visibilityConditions: readonly QuestionVisibilityCondition[]
}
