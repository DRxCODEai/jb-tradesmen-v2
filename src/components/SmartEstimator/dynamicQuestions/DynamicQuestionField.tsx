import type { ChangeEvent } from 'react'
import { isMeasurementAnswer, type DynamicEstimatorQuestion, type ServiceAnswerValue } from './dynamicQuestionTypes'

interface Props {
  question: DynamicEstimatorQuestion
  value: ServiceAnswerValue
  onChange: (value: ServiceAnswerValue) => void
  invalid: boolean
}

const answerId = (question: DynamicEstimatorQuestion) => `service-question-${question.id}`

export default function DynamicQuestionField({ question, value, onChange, invalid }: Props) {
  const id = answerId(question)
  const errorId = `${id}-error`
  const describedBy = [question.helpText ? `${id}-help` : '', invalid ? errorId : ''].filter(Boolean).join(' ') || undefined
  const shared = { id, 'aria-invalid': invalid || undefined, 'aria-describedby': describedBy }

  if (question.type === 'photo') return <div className="dynamic-question full-width photo-guidance" id={id}><strong>{question.label}</strong><p>Photos can be added in the existing Photo Upload step.</p></div>

  if (question.type === 'boolean') return <fieldset className={`dynamic-question${question.fullWidth ? ' full-width' : ''}`} id={id} aria-describedby={describedBy}><legend>{question.label}{question.required && <span aria-hidden="true"> *</span>}</legend>{question.helpText && <p id={`${id}-help`}>{question.helpText}</p>}<div className="dynamic-options three-options">{([{ label: 'Yes', value: true }, { label: 'No', value: false }, { label: 'Unknown', value: 'unknown' }] as const).map((choice) => <button type="button" key={choice.label} className={value === choice.value ? 'selected' : ''} aria-pressed={value === choice.value} onClick={() => onChange(choice.value)}>{choice.label}</button>)}</div>{invalid && <span className="dynamic-field-error" id={errorId}>This answer is required.</span>}</fieldset>

  if (question.type === 'singleSelect') {
    if (question.options.length > 6) return <label className={`dynamic-question${question.fullWidth ? ' full-width' : ''}`} htmlFor={id}><span>{question.label}{question.required && ' *'}</span>{question.helpText && <small id={`${id}-help`}>{question.helpText}</small>}<select {...shared} value={typeof value === 'string' || typeof value === 'number' ? value : ''} onChange={(event) => onChange(event.target.value)}><option value="">Select an option</option>{question.options.map((choice) => <option key={String(choice.value)} value={String(choice.value)}>{choice.label}</option>)}</select>{invalid && <span className="dynamic-field-error" id={errorId}>This answer is required.</span>}</label>
    return <fieldset className={`dynamic-question${question.fullWidth ? ' full-width' : ''}`} id={id} aria-describedby={describedBy}><legend>{question.label}{question.required && <span aria-hidden="true"> *</span>}</legend>{question.helpText && <p id={`${id}-help`}>{question.helpText}</p>}<div className="dynamic-options">{question.options.map((choice) => <button type="button" key={String(choice.value)} className={value === choice.value ? 'selected' : ''} aria-pressed={value === choice.value} onClick={() => onChange(choice.value)}>{choice.label}</button>)}</div>{invalid && <span className="dynamic-field-error" id={errorId}>This answer is required.</span>}</fieldset>
  }

  if (question.type === 'multiSelect') {
    const selected = Array.isArray(value) ? value : []
    return <fieldset className="dynamic-question full-width" id={id} aria-describedby={describedBy}><legend>{question.label}{question.required && <span aria-hidden="true"> *</span>}</legend><div className="dynamic-checks">{question.options.map((choice) => { const optionValue = String(choice.value); return <label key={optionValue}><input type="checkbox" checked={selected.includes(optionValue)} onChange={(event) => onChange(event.target.checked ? [...selected, optionValue] : selected.filter((item) => item !== optionValue))} />{choice.label}</label> })}</div>{invalid && <span className="dynamic-field-error" id={errorId}>Select at least one option.</span>}</fieldset>
  }

  if (question.type === 'measurement') {
    const measurement = isMeasurementAnswer(value) ? value : { value: null, unit: question.measurementUnits?.[0] ?? 'Feet', unknown: false }
    return <fieldset className={`dynamic-question measurement${question.fullWidth ? ' full-width' : ''}`} id={id} aria-describedby={describedBy}><legend>{question.label}{question.required && <span aria-hidden="true"> *</span>}</legend><div><input type="number" min={question.minimum ?? 0} max={question.maximum} value={measurement.value ?? ''} disabled={measurement.unknown} aria-label={`${question.label} value`} onChange={(event) => onChange({ ...measurement, value: numericValue(event) ?? null, unknown: false })} /><select value={measurement.unit} disabled={measurement.unknown} aria-label={`${question.label} unit`} onChange={(event) => onChange({ ...measurement, unit: event.target.value })}>{question.measurementUnits?.filter((unit) => unit !== 'Unknown').map((unit) => <option key={unit}>{unit}</option>)}</select></div><label className="dynamic-unknown"><input type="checkbox" checked={measurement.unknown} onChange={(event) => onChange({ ...measurement, value: null, unknown: event.target.checked })} />Unknown</label>{invalid && <span className="dynamic-field-error" id={errorId}>Enter a measurement or choose Unknown.</span>}</fieldset>
  }

  if (question.type === 'number') return <label className={`dynamic-question${question.fullWidth ? ' full-width' : ''}`} htmlFor={id}><span>{question.label}{question.required && ' *'}</span><div className="dynamic-number"><input {...shared} type="number" min={question.minimum ?? 0} max={question.maximum} value={typeof value === 'number' ? value : ''} disabled={value === 'unknown'} onChange={(event) => onChange(numericValue(event))} /><button type="button" className={value === 'unknown' ? 'selected' : ''} aria-pressed={value === 'unknown'} onClick={() => onChange(value === 'unknown' ? undefined : 'unknown')}>Unknown</button></div>{invalid && <span className="dynamic-field-error" id={errorId}>Enter a value or choose Unknown.</span>}</label>

  const Component = question.type === 'textarea' ? 'textarea' : 'input'
  return <label className={`dynamic-question${question.fullWidth ? ' full-width' : ''}`} htmlFor={id}><span>{question.label}{question.required && ' *'}</span>{question.helpText && <small id={`${id}-help`}>{question.helpText}</small>}<Component {...shared} value={typeof value === 'string' ? value : ''} placeholder={question.placeholder} onChange={(event) => onChange(event.target.value)} />{invalid && <span className="dynamic-field-error" id={errorId}>This answer is required.</span>}</label>
}

function numericValue(event: ChangeEvent<HTMLInputElement>): number | undefined {
  return event.target.value === '' ? undefined : Number(event.target.value)
}
