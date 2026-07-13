import type { Data } from '../types/estimator'
import type { EstimatorQuestion, EstimatorQuestionOption, QuestionVisibilityCondition } from '../templates/estimatorQuestionTemplate'
import { resolveServiceFromDescription } from '../integration/descriptionServiceResolver'
import { resolveServiceProfile, resolveVisibleService } from '../integration/serviceIdMap'
import { isAnswered, isMeasurementAnswer, type DynamicEstimatorQuestion, type ResolvedQuestionSet, type ServiceAnswerValue, type ServiceAnswers } from './dynamicQuestionTypes'

const option = (label: string, value = label.toLowerCase().replace(/\s+/g, '-')): EstimatorQuestionOption => ({ label, value })
const choices = (...labels: string[]): readonly EstimatorQuestionOption[] => labels.map((label) => option(label))

const FIELD_OPTIONS: Readonly<Record<string, readonly EstimatorQuestionOption[]>> = {
  surfaceLocation: choices('Wall', 'Ceiling', 'Floor', 'Shower', 'Tub', 'Sink', 'Countertop', 'Unknown'),
  damageType: choices('Small hole', 'Medium hole', 'Large opening', 'Crack', 'Water-related damage', 'Sagging', 'Unknown'),
  existingTexture: choices('Smooth', 'Orange peel', 'Knockdown', 'Popcorn', 'Other', 'Unknown'),
  surfacesIncluded: choices('Walls', 'Ceilings', 'Trim', 'Doors'),
  existingCondition: choices('Good', 'Minor repairs', 'Heavy patching', 'Failed coating', 'Unknown'),
  subfloorCondition: choices('Good', 'Minor preparation', 'Leveling required', 'Damaged', 'Unknown'),
  subfloorPreparation: choices('None', 'Minor preparation', 'Leveling required', 'Unknown'),
  existingFlooringType: choices('Carpet', 'Sheet vinyl', 'LVP', 'Laminate', 'Tile', 'Wood', 'Other', 'Unknown'),
  repairOrReplacement: choices('Repair', 'Replacement', 'Unknown'),
  interiorOrExterior: choices('Interior', 'Exterior', 'Unknown'),
  exposure: choices('Interior', 'Exterior', 'Unknown'),
  doorAssembly: choices('Slab', 'Prehung', 'Unknown'),
  doorCore: choices('Hollow core', 'Solid core', 'Metal', 'Fiberglass', 'Unknown'),
  doorCondition: choices('Serviceable', 'Damaged', 'Water damaged', 'Impact damaged', 'Unknown'),
  frameCondition: choices('Good', 'Minor damage', 'Major damage', 'Unknown'),
  finishRequired: choices('Paint', 'Stain', 'None', 'Unknown'),
  finishType: choices('Paint-grade', 'Stain-grade', 'Unknown'),
  trimLocation: choices('Interior trim', 'Exterior trim', 'Both', 'Unknown'),
  currentCondition: choices('Good', 'Minor damage', 'Extensive damage', 'Unknown'),
  damageCondition: choices('Loose', 'Cracked', 'Hollow', 'Missing', 'Unknown'),
  floorOrWall: choices('Floor', 'Wall', 'Unknown'),
  tileMaterial: choices('Ceramic', 'Porcelain', 'Natural stone', 'Glass', 'Other', 'Unknown'),
  repairMaterial: choices('Grout', 'Caulk', 'Both', 'Unknown'),
  faucetType: choices('Kitchen', 'Bathroom', 'Utility', 'Commercial', 'Unknown'),
  mountType: choices('Deck-mounted', 'Wall-mounted', 'Unknown'),
  toiletSystem: choices('Residential tank toilet', 'Commercial flushometer', 'Unknown'),
  toiletConstruction: choices('One-piece', 'Two-piece', 'Unknown'),
  reportedCondition: choices('Running', 'Leaking', 'Loose', 'Clogged', 'Cracked', 'Poor flush', 'Unknown'),
  flangeCondition: choices('Good', 'Damaged', 'Unknown'),
  floorCondition: choices('Good', 'Damaged', 'Unknown'),
  supplyLineCondition: choices('Good', 'Corroded', 'Leaking', 'Unknown'),
  leakSystem: choices('Supply', 'Drain', 'Unknown'),
  activeOrIntermittent: choices('Active', 'Intermittent', 'Unknown'),
  pipeMaterial: choices('Copper', 'PEX', 'CPVC', 'PVC', 'Galvanized', 'Cast iron', 'Other', 'Unknown'),
  connectionType: choices('Compression', 'Threaded', 'Soldered', 'Push-to-connect', 'PEX', 'Unknown'),
  propertyType: choices('Residential', 'Commercial', 'Unknown'),
  propertyUse: choices('Residential', 'Commercial', 'Unknown'),
  commercialContext: choices('Residential', 'Commercial', 'Unknown'),
  heaterType: choices('Tank', 'Tankless', 'Unknown'),
  fuelType: choices('Electric', 'Gas', 'Unknown'),
  installationLocation: choices('Garage', 'Basement', 'Closet', 'Attic', 'Exterior', 'Elevated platform', 'Other', 'Unknown'),
  frostFree: choices('Frost-free', 'Standard', 'Unknown'),
  mountingLocation: choices('Ceiling', 'Wall', 'Unknown'),
  deviceType: choices('Switch', 'Outlet', 'GFCI', 'Dimmer', 'Smart device', 'Unknown'),
  controlType: choices('Standard', 'Three-way', 'Four-way', 'Unknown'),
  symptomType: choices('Loss of power', 'Intermittent issue', 'Flickering', 'Tripping', 'Heat', 'Odor', 'Sparking', 'Damaged device'),
  systemType: choices('Conventional', 'Heat pump', 'Boiler', 'Multi-stage', 'Zoned', 'Communicating', 'Unknown'),
  equipmentType: choices('Furnace', 'Air conditioner', 'Heat pump', 'Package unit', 'Mini-split', 'Boiler', 'Unknown'),
  issueType: choices('Heating', 'Cooling', 'Both', 'Airflow', 'Noise', 'Odor', 'Water', 'Unknown'),
  accessDifficulty: choices('Easy', 'Moderate', 'Difficult', 'Unknown'),
  thresholdCondition: choices('Good', 'Minor damage', 'Damaged', 'Unknown'),
}

const MEASUREMENT_UNITS: Readonly<Record<string, readonly string[]>> = {
  dimensions: ['Feet', 'Inches', 'Square feet'], wallDimensions: ['Square feet', 'Feet'], surfaceArea: ['Square feet'], squareFeet: ['Square feet'], roomDimensions: ['Feet', 'Square feet'],
  linearFeet: ['Linear feet'], profileDimensions: ['Inches', 'Linear feet'], doorDimensions: ['Inches', 'Feet'], tileDimensions: ['Inches'], pipeSize: ['Inches'], roughInDimension: ['Inches'], wallThickness: ['Inches'], accessDimensions: ['Inches', 'Feet'], ceilingHeightFeet: ['Feet'],
}

const CUSTOM_VISIBILITY: Readonly<Record<string, readonly QuestionVisibilityCondition[]>> = {
  paintMatchAvailable: [{ field: 'paintIncluded', operator: 'equals', value: true }],
  damageSourceResolved: [{ field: 'damageType', operator: 'equals', value: 'water-related-damage' }],
  existingFlooringType: [{ field: 'existingFlooringRemovalRequired', operator: 'equals', value: true }],
  sinkHoleCount: [{ field: 'mountType', operator: 'equals', value: 'deck-mounted' }],
  capacityGallons: [{ field: 'heaterType', operator: 'equals', value: 'tank' }],
  fanRatedSupportKnown: [{ field: 'ceilingFan', operator: 'equals', value: true }],
  wifiAvailable: [{ field: 'smartThermostat', operator: 'equals', value: true }],
}

const GENERIC_QUESTIONS: readonly DynamicEstimatorQuestion[] = [
  generic('fallbackQuantity', 'Approximate quantity', 'number', ['labor', 'materials']),
  { ...generic('fallbackSize', 'Approximate project size', 'measurement', ['labor', 'materials', 'confidence']), measurementUnits: ['Square feet', 'Linear feet', 'Feet', 'Item count'] },
  select('fallbackExposure', 'Is the work interior or exterior?', choices('Interior', 'Exterior', 'Both', 'Unknown')),
  select('fallbackCondition', 'What is the current condition?', choices('Light', 'Standard', 'Extensive', 'Unknown')),
  select('fallbackAccess', 'How difficult is access?', choices('Easy', 'Moderate', 'Difficult', 'Unknown')),
  generic('fallbackMaterials', 'Are materials already selected or purchased?', 'boolean', ['materials', 'confidence']),
  generic('fallbackPhotos', 'Are photos available?', 'boolean', ['confidence']),
  generic('fallbackHeight', 'Is the work at height?', 'boolean', ['labor', 'equipment', 'manualReview']),
  generic('fallbackUtilities', 'Are plumbing, electrical, HVAC, or gas utilities involved?', 'boolean', ['manualReview', 'scope']),
  generic('fallbackUrgent', 'Is there active damage or an urgent condition?', 'boolean', ['timeline', 'manualReview']),
]

const CATEGORY_SERVICE_OPTIONS: Readonly<Record<string, readonly EstimatorQuestionOption[]>> = {
  Flooring: [option('Luxury vinyl plank', 'luxury-vinyl-plank-flooring'), option('Laminate', 'laminate-flooring'), option('Other or unknown', 'unknown')],
  Plumbing: [option('Faucet', 'faucet-replacement'), option('Toilet', 'toilet-repair-replacement'), option('Shutoff valve', 'shutoff-valve-replacement'), option('Minor leak', 'minor-plumbing-leak-repair'), option('Water heater', 'water-heater-replacement'), option('Hose bib', 'hose-bib-repair-replacement'), option('Other or unknown', 'unknown')],
  Electrical: [option('Light fixture', 'light-fixture-replacement'), option('Switch or outlet', 'switch-outlet-replacement'), option('Troubleshooting', 'electrical-troubleshooting'), option('Other or unknown', 'unknown')],
  HVAC: [option('Thermostat', 'thermostat-replacement'), option('Diagnostic or minor repair', 'hvac-diagnostic-minor-repair'), option('Other or unknown', 'unknown')],
  Tile: [option('Tile repair', 'tile-repair'), option('Grout or caulk', 'grout-caulk-repair'), option('Other or unknown', 'unknown')],
  'Doors and Hardware': [option('Interior door', 'interior-door-repair-replacement'), option('Exterior door', 'exterior-door-repair-replacement'), option('Lock change', 'lock-change'), option('Window or trim', 'window-trim-repair'), option('Other or unknown', 'unknown')],
}

function categorySelector(data: Data): DynamicEstimatorQuestion | null {
  const options = CATEGORY_SERVICE_OPTIONS[data.service ?? '']
  return options ? { ...select('fallbackSubtype', `Which ${data.service?.toLowerCase()} service best matches the project?`, options), affects: ['labor', 'materials', 'scope', 'confidence'] } : null
}

function generic(id: string, label: string, type: EstimatorQuestion['type'], affects: EstimatorQuestion['affects']): DynamicEstimatorQuestion {
  return { id, field: id, label, helpText: '', type, required: false, options: [], affects, confidenceWeight: 0.5, visibilityConditions: [] }
}

function select(id: string, label: string, options: readonly EstimatorQuestionOption[]): DynamicEstimatorQuestion {
  return { ...generic(id, label, 'singleSelect', ['confidence']), options }
}

function conditionMatches(condition: QuestionVisibilityCondition, answers: ServiceAnswers): boolean {
  const actual = answers[condition.field]
  const expected = condition.value
  if (condition.operator === 'exists') return isAnswered(actual)
  if (isMeasurementAnswer(actual)) return condition.operator === 'equals' ? actual.value === expected : actual.value !== expected
  if (condition.operator === 'equals') return actual === expected
  if (condition.operator === 'notEquals') return actual !== expected
  if (condition.operator === 'includes') return Array.isArray(actual) ? actual.includes(String(expected)) : typeof actual === 'string' && actual.includes(String(expected))
  if (condition.operator === 'greaterThan') return typeof actual === 'number' && typeof expected === 'number' && actual > expected
  return typeof actual === 'number' && typeof expected === 'number' && actual < expected
}

function adapt(question: EstimatorQuestion): DynamicEstimatorQuestion {
  const visibilityConditions = question.visibilityConditions.length ? question.visibilityConditions : (CUSTOM_VISIBILITY[question.field] ?? [])
  const type = question.field === 'existingTexture' ? 'singleSelect' : question.type
  return {
    ...question,
    type,
    options: question.options.length ? question.options : (FIELD_OPTIONS[question.field] ?? []),
    visibilityConditions,
    measurementUnits: MEASUREMENT_UNITS[question.field] ?? (type === 'measurement' ? [question.unit ?? 'Feet', 'Inches', 'Unknown'] : undefined),
    fullWidth: type === 'textarea' || type === 'photo' || type === 'multiSelect',
  }
}

export function getResolvedServiceId(data: Data): string | null {
  const exact = resolveVisibleService(data.service)
  if (exact.profile && exact.serviceId) return exact.serviceId
  const selectedSubtype = data.serviceAnswers.fallbackSubtype
  if (typeof selectedSubtype === 'string' && selectedSubtype !== 'unknown' && resolveServiceProfile(selectedSubtype)) return selectedSubtype
  const fromDescription = resolveServiceFromDescription(data)
  return fromDescription.serviceId && !fromDescription.ambiguous ? fromDescription.serviceId : null
}

export function resolveDynamicQuestions(data: Data): ResolvedQuestionSet {
  const serviceId = getResolvedServiceId(data)
  const profile = serviceId ? resolveServiceProfile(serviceId) : undefined
  const selector = categorySelector(data)
  const profileQuestions = profile ? profile.estimatorQuestions.map(adapt).sort((left, right) => Number(right.required && right.type !== 'photo') - Number(left.required && left.type !== 'photo')) : []
  const allQuestions = profile ? (selector && data.serviceAnswers.fallbackSubtype ? [selector, ...profileQuestions] : profileQuestions) : (selector ? [selector, ...GENERIC_QUESTIONS] : GENERIC_QUESTIONS)
  const questions = allQuestions.filter((question) => question.visibilityConditions.every((condition) => conditionMatches(condition, data.serviceAnswers)))
  const unansweredRequired = questions.filter((question) => question.required && question.type !== 'photo' && !isAnswered(data.serviceAnswers[question.field]))
  return { serviceId, serviceName: profile?.identity.name ?? `${data.service ?? data.category ?? 'Project'} details`, questions, unansweredRequired, fallback: !profile }
}

export function answerKeysForResolvedQuestions(data: Data): readonly string[] {
  return resolveDynamicQuestions(data).questions.map((question) => question.field)
}

export function reconcileServiceAnswers(current: Data, next: Data): ServiceAnswers {
  if (current.projectType !== next.projectType || current.category !== next.category || current.service !== next.service || getResolvedServiceId(current) !== getResolvedServiceId(next)) return {}
  return current.serviceAnswers
}

export function updateAndPruneServiceAnswers(data: Data, field: string, value: ServiceAnswerValue): ServiceAnswers {
  const candidate = { ...data.serviceAnswers, [field]: value }
  const visible = new Set(answerKeysForResolvedQuestions({ ...data, serviceAnswers: candidate }))
  return Object.fromEntries(Object.entries(candidate).filter(([key]) => visible.has(key)))
}
