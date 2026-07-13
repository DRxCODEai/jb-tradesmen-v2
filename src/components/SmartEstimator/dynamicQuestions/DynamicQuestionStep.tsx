import { useEffect } from 'react'
import type { Data } from '../types/estimator'
import DynamicQuestionField from './DynamicQuestionField'
import { resolveDynamicQuestions } from './questionResolver'
import type { ServiceAnswerValue } from './dynamicQuestionTypes'
import './DynamicQuestionStep.css'

interface Props {
  data: Data
  invalidQuestionId: string | null
  onAnswer: (field: string, value: ServiceAnswerValue) => void
}

export default function DynamicQuestionStep({ data, invalidQuestionId, onAnswer }: Props) {
  const resolved = resolveDynamicQuestions(data)
  const primary = resolved.questions.slice(0, 10)
  const additional = resolved.questions.slice(10)

  useEffect(() => {
    if (!invalidQuestionId) return
    document.getElementById(`service-question-${invalidQuestionId}`)?.focus({ preventScroll: true })
    document.getElementById(`service-question-${invalidQuestionId}`)?.scrollIntoView({ behavior: 'auto', block: 'center' })
  }, [invalidQuestionId])

  const field = (question: (typeof resolved.questions)[number]) => <DynamicQuestionField key={question.id} question={question} value={data.serviceAnswers[question.field]} onChange={(value) => onAnswer(question.field, value)} invalid={invalidQuestionId === question.id} />

  return <section className="dynamic-question-step" aria-live="polite">
    <span className="dynamic-section-tag">Service details</span>
    <h3>{resolved.serviceName}</h3>
    <p>{resolved.fallback ? 'A few details will help narrow this broad planning range. Unknown answers are welcome.' : 'Answer what you know so the planning range can reflect the service, quantity, access, and condition.'}</p>
    <div className="dynamic-question-grid">{primary.map(field)}</div>
    {additional.length > 0 && <details className="dynamic-additional"><summary>Additional service details</summary><div className="dynamic-question-grid">{additional.map(field)}</div></details>}
  </section>
}
