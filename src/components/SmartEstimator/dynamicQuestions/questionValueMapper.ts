import type { Data } from '../types/estimator'
import type { EstimatorQuestionValue } from '../templates/estimatorQuestionTemplate'
import type { AccessDifficulty, ProjectCondition } from '../types/v1/engines'
import { isMeasurementAnswer, type ServiceAnswerValue } from './dynamicQuestionTypes'

export interface MappedQuestionValues {
  answers: Record<string, EstimatorQuestionValue>
  quantity?: number
  squareFeet?: number
  linearFeet?: number
  itemCount?: number
  ceilingHeightFeet?: number
  accessDifficulty?: AccessDifficulty
  condition?: ProjectCondition
  occupied?: boolean
  finishMatching?: boolean
  customerSuppliedMaterials?: boolean
  emergency?: boolean
  measurementsProvided: boolean
  reviewReasons: readonly string[]
}

const QUANTITY_FIELDS = ['damagedAreaCount', 'roomCount', 'lockCount', 'windowCount', 'tileQuantity', 'tileCount', 'fixtureCount', 'valveCount', 'deviceCount', 'affectedLocationCount', 'taskCount', 'fallbackQuantity'] as const
const SQUARE_FOOT_FIELDS = ['squareFeet', 'wallDimensions', 'surfaceArea', 'roomDimensions', 'fallbackSize'] as const
const LINEAR_FOOT_FIELDS = ['linearFeet', 'profileDimensions', 'fallbackSize'] as const

function numeric(answers: Data['serviceAnswers'], fields: readonly string[]): number | undefined {
  for (const field of fields) {
    const value = answers[field]
    if (typeof value === 'number' && Number.isFinite(value)) return value
    if (isMeasurementAnswer(value) && !value.unknown && value.value !== null) return value.value
  }
  return undefined
}

function measurementForUnit(answers: Data['serviceAnswers'], fields: readonly string[], unit: RegExp): number | undefined {
  for (const field of fields) {
    const value = answers[field]
    if (isMeasurementAnswer(value) && !value.unknown && value.value !== null && unit.test(value.unit)) return value.value
  }
  return undefined
}

function normalizeAnswer(field: string, value: ServiceAnswerValue): EstimatorQuestionValue | undefined {
  if (value === undefined || value === null) return undefined
  if (isMeasurementAnswer(value)) return value.unknown || value.value === null ? 'unknown' : value.value
  if (field === 'damageType' && value === 'water-related-damage') return 'water-related'
  if (field === 'existingFlooringType' && (value === 'carpet' || value === 'sheet-vinyl')) return 'sheet-or-carpet'
  if (field === 'existingFlooringType' && (value === 'lvp' || value === 'laminate')) return 'floating'
  return value
}

function access(value: ServiceAnswerValue): AccessDifficulty | undefined {
  if (value === 'easy') return 'easy'
  if (value === 'moderate') return 'standard'
  if (value === 'difficult') return 'difficult'
  if (value === 'unknown') return 'unknown'
  return undefined
}

function condition(value: ServiceAnswerValue): ProjectCondition | undefined {
  if (value === 'light' || value === 'standard' || value === 'extensive' || value === 'unknown') return value
  if (value === 'heavy-patching' || value === 'failed-coating' || value === 'damaged') return 'extensive'
  if (value === 'minor-repairs' || value === 'minor-preparation') return 'light'
  return undefined
}

export function mapQuestionValues(data: Data): MappedQuestionValues {
  const answers: Record<string, EstimatorQuestionValue> = {}
  const reviewReasons: string[] = []
  let measurementsProvided = false

  for (const [field, value] of Object.entries(data.serviceAnswers)) {
    const mapped = normalizeAnswer(field, value)
    if (mapped !== undefined) answers[field] = mapped
    if (isMeasurementAnswer(value)) {
      answers[`${field}Unit`] = value.unit
      if (!value.unknown && value.value !== null) measurementsProvided = true
      if (value.unknown) reviewReasons.push(`${field} measurement is unknown.`)
    } else if (value === 'unknown') reviewReasons.push(`${field} is unknown.`)
  }

  const quantity = numeric(data.serviceAnswers, QUANTITY_FIELDS)
  const squareFeet = measurementForUnit(data.serviceAnswers, SQUARE_FOOT_FIELDS, /square/i)
  const linearFeet = measurementForUnit(data.serviceAnswers, LINEAR_FOOT_FIELDS, /linear/i)
  const ceilingHeightFeet = numeric(data.serviceAnswers, ['ceilingHeightFeet'])
  const itemCount = numeric(data.serviceAnswers, ['fixtureCount', 'tileQuantity', 'tileCount', 'lockCount', 'valveCount', 'deviceCount', 'windowCount', 'damagedAreaCount', 'taskCount']) ?? quantity

  if (quantity !== undefined) answers.quantity = quantity
  if (squareFeet !== undefined) answers.squareFeet = squareFeet
  if (linearFeet !== undefined) answers.linearFeet = linearFeet
  if (itemCount !== undefined) answers.itemCount = itemCount

  const surfaces = data.serviceAnswers.surfacesIncluded
  if (Array.isArray(surfaces)) {
    answers.heavyPatching = data.serviceAnswers.existingCondition === 'heavy-patching'
    answers.ceilingOrElevatedWork = surfaces.includes('ceilings')
  }
  if (data.serviceAnswers.installationLocation === 'attic') answers.difficultAtticOrCrawlspace = true
  if (typeof data.serviceAnswers.fallbackExposure === 'string') answers.exposure = data.serviceAnswers.fallbackExposure
  if (data.serviceAnswers.fallbackHeight === true) answers.ceilingOrElevatedWork = true
  if (data.serviceAnswers.heaterType === 'tankless') answers.nonstandardHeaterScope = true
  if (data.serviceAnswers.mountType === 'wall-mounted') reviewReasons.push('Wall-mounted faucet access requires direct scope review.')
  if (data.serviceAnswers.stairsIncluded === true) reviewReasons.push('Flooring stairs require professional scope review.')
  if (data.serviceAnswers.activeMoisture === true || data.serviceAnswers.activeLeak === true) reviewReasons.push('Active moisture or leakage requires source confirmation.')
  if (data.serviceAnswers.fallbackUtilities === true) reviewReasons.push('Utility-related work requires confirmation of the appropriate regulated service profile.')
  if (data.serviceAnswers.fallbackHeight === true) reviewReasons.push('Work at height requires access and equipment confirmation.')
  if (data.serviceAnswers.fixtureWeightPounds !== undefined && Number(data.serviceAnswers.fixtureWeightPounds) > 50) reviewReasons.push('Fixture weight may require a second technician and support review.')

  return {
    answers,
    quantity,
    squareFeet,
    linearFeet,
    itemCount,
    ceilingHeightFeet,
    accessDifficulty: access(data.serviceAnswers.accessDifficulty ?? data.serviceAnswers.fallbackAccess),
    condition: condition(data.serviceAnswers.existingCondition ?? data.serviceAnswers.currentCondition ?? data.serviceAnswers.fallbackCondition),
    occupied: typeof data.serviceAnswers.occupied === 'boolean' ? data.serviceAnswers.occupied : undefined,
    finishMatching: typeof data.serviceAnswers.finishMatching === 'boolean' ? data.serviceAnswers.finishMatching : undefined,
    customerSuppliedMaterials: typeof data.serviceAnswers.customerSuppliedMaterials === 'boolean' ? data.serviceAnswers.customerSuppliedMaterials : typeof data.serviceAnswers.fallbackMaterials === 'boolean' ? data.serviceAnswers.fallbackMaterials : undefined,
    emergency: data.serviceAnswers.fallbackUrgent === true || data.serviceAnswers.activeLeak === true || data.serviceAnswers.activeArcing === true || data.serviceAnswers.gasOdor === true || data.serviceAnswers.carbonMonoxideAlarm === true,
    measurementsProvided,
    reviewReasons: [...new Set(reviewReasons)],
  }
}
