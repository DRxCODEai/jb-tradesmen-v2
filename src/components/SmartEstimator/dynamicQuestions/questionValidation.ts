import type { Data } from '../types/estimator'
import { resolveDynamicQuestions } from './questionResolver'

export interface DynamicQuestionValidationResult {
  valid: boolean
  message: string
  questionId: string | null
}

function validationMessage(label: string, type: string): string {
  if (type === 'number' || type === 'measurement') return `Enter ${label.toLowerCase()} or choose Unknown.`
  if (/wall or ceiling/i.test(label)) return 'Tell us whether the work is on a wall or ceiling.'
  return `Select ${label.toLowerCase()} to continue.`
}

export function validateDynamicQuestions(data: Data): DynamicQuestionValidationResult {
  const question = resolveDynamicQuestions(data).unansweredRequired[0]
  if (!question) return { valid: true, message: '', questionId: null }
  return { valid: false, message: validationMessage(question.label, question.type), questionId: question.id }
}
