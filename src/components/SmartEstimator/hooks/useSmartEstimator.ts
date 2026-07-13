import { useEffect, useRef, useState } from 'react'
import type { Data, Estimate } from '../types/estimator'
import { validate } from '../utils/validateEstimatorStep'
import { calculateIntegratedEstimate } from '../integration/calculateIntegratedEstimate'
import { reconcileServiceAnswers, updateAndPruneServiceAnswers } from '../dynamicQuestions/questionResolver'
import { validateDynamicQuestions } from '../dynamicQuestions/questionValidation'
import type { ServiceAnswerValue } from '../dynamicQuestions/dynamicQuestionTypes'

const initial: Data = { serviceAnswers: {}, description: '', condition: '', quantity: '', dimensions: '', outcome: '', materials: false, matching: false, accessNotes: '', propertyType: '', city: '', state: 'Colorado', zip: '', occupancy: 'Occupied', location: 'Interior', floor: '1', access: 'Easy', urgency: 'Routine', timing: 'Flexible', photos: [], firstName: '', lastName: '', email: '', phone: '', contact: 'Phone', company: '', consent: false }

export function useSmartEstimator() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Data>(initial)
  const [error, setError] = useState('')
  const [invalidQuestionId, setInvalidQuestionId] = useState<string | null>(null)
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const estimateRef = useRef<Estimate | null>(null)
  const photosRef = useRef(data.photos)
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), [])
  const update = <K extends keyof Data>(key: K, value: Data[K]) => { if (key === 'photos') photosRef.current = value as Data['photos']; setData((current) => { const next = { ...current, [key]: value }; return { ...next, serviceAnswers: reconcileServiceAnswers(current, next) } }); estimateRef.current = null; setEstimate(null); setError(''); setInvalidQuestionId(null) }
  const updateServiceAnswer = (field: string, value: ServiceAnswerValue) => { setData((current) => ({ ...current, serviceAnswers: updateAndPruneServiceAnswers(current, field, value) })); estimateRef.current = null; setEstimate(null); setError(''); setInvalidQuestionId(null) }
  const next = () => { if (step === 3) { const result = validateDynamicQuestions(data); if (!result.valid) { setError(result.message); setInvalidQuestionId(result.questionId); return } } const validationError = validate(step, data); if (validationError) { setError(validationError); return } if (step === 7) { if (!estimateRef.current) { estimateRef.current = calculateIntegratedEstimate(data).estimate; setEstimate(estimateRef.current) } setStep(8); return } setStep((current) => Math.min(8, current + 1)) }
  const addPhotos = (files: FileList | null) => { if (!files) return; const valid = [...files].filter((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) && file.size <= 8 * 1024 * 1024).slice(0, 5 - data.photos.length).map((file) => ({ file, url: URL.createObjectURL(file) })); if (!valid.length) setError('Add JPG, PNG, or WebP images under 8 MB.'); else update('photos', [...data.photos, ...valid]) }
  const removePhoto = (index: number) => { URL.revokeObjectURL(data.photos[index].url); update('photos', data.photos.filter((_, current) => current !== index)) }
  const reset = () => { data.photos.forEach((photo) => URL.revokeObjectURL(photo.url)); photosRef.current = []; estimateRef.current = null; setData(initial); setEstimate(null); setStep(0); setError(''); setInvalidQuestionId(null) }
  return { step, data, error, invalidQuestionId, update, updateServiceAnswer, next, back: () => { setError(''); setInvalidQuestionId(null); setStep((current) => Math.max(0, current - 1)) }, addPhotos, removePhoto, estimate, reset }
}
