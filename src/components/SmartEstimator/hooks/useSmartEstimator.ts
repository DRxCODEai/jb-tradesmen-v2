import { useEffect, useRef, useState } from 'react'
import type { Data, Estimate } from '../types/estimator'
import { validate } from '../utils/validateEstimatorStep'
import { calculateIntegratedEstimate } from '../integration/calculateIntegratedEstimate'

const initial: Data = { description: '', condition: '', quantity: '', dimensions: '', outcome: '', materials: false, matching: false, accessNotes: '', propertyType: '', city: '', state: 'Colorado', zip: '', occupancy: 'Occupied', location: 'Interior', floor: '1', access: 'Easy', urgency: 'Routine', timing: 'Flexible', photos: [], firstName: '', lastName: '', email: '', phone: '', contact: 'Phone', company: '', consent: false }

export function useSmartEstimator() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Data>(initial)
  const [error, setError] = useState('')
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const estimateRef = useRef<Estimate | null>(null)
  const photosRef = useRef(data.photos)
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), [])
  const update = <K extends keyof Data>(key: K, value: Data[K]) => { if (key === 'photos') photosRef.current = value as Data['photos']; setData((current) => ({ ...current, [key]: value })); setError('') }
  const next = () => { const validationError = validate(step, data); if (validationError) { setError(validationError); return } if (step === 6) { if (!estimateRef.current) { estimateRef.current = calculateIntegratedEstimate(data).estimate; setEstimate(estimateRef.current) } setStep(7); return } setStep((current) => Math.min(7, current + 1)) }
  const addPhotos = (files: FileList | null) => { if (!files) return; const valid = [...files].filter((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type) && file.size <= 8 * 1024 * 1024).slice(0, 5 - data.photos.length).map((file) => ({ file, url: URL.createObjectURL(file) })); if (!valid.length) setError('Add JPG, PNG, or WebP images under 8 MB.'); else update('photos', [...data.photos, ...valid]) }
  const removePhoto = (index: number) => { URL.revokeObjectURL(data.photos[index].url); update('photos', data.photos.filter((_, current) => current !== index)) }
  const reset = () => { data.photos.forEach((photo) => URL.revokeObjectURL(photo.url)); photosRef.current = []; estimateRef.current = null; setData(initial); setEstimate(null); setStep(0); setError('') }
  return { step, data, error, update, next, back: () => { setError(''); setStep((current) => Math.max(0, current - 1)) }, addPhotos, removePhoto, estimate, reset }
}
