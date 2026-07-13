import type { Data, PricingContext } from '../types/estimator'
import type { EstimatorQuestionValue } from '../templates/estimatorQuestionTemplate'
import type { AccessDifficulty, ProjectCondition, ServiceEstimateInput } from '../types/v1/engines'
import type { PropertyContext, ServiceTiming } from '../types/v1/company'
import type { MappedEstimatorInput } from './integrationTypes'

function parseExplicitNumber(value: string): number | undefined {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(?:\s|$)/)
  if (!match) return undefined
  const parsed = Number(match[1])
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined
}

function parseDimensions(value: string): { squareFeet?: number; linearFeet?: number; available: boolean } {
  const normalized = value.trim().toLowerCase()
  const rectangle = normalized.match(/(\d+(?:\.\d+)?)\s*(?:ft|feet|')?\s*[x×]\s*(\d+(?:\.\d+)?)\s*(?:ft|feet|')?/)
  if (rectangle) return { squareFeet: Number(rectangle[1]) * Number(rectangle[2]), available: true }
  const square = normalized.match(/(\d+(?:\.\d+)?)\s*(?:sq(?:uare)?\s*(?:ft|feet)|sf)\b/)
  if (square) return { squareFeet: Number(square[1]), available: true }
  const linear = normalized.match(/(\d+(?:\.\d+)?)\s*(?:linear\s*(?:ft|feet)|lf)\b/)
  if (linear) return { linearFeet: Number(linear[1]), available: true }
  return { available: false }
}

function parseCeilingHeight(data: Data): number | undefined {
  const text = `${data.dimensions} ${data.accessNotes} ${data.description}`.toLowerCase()
  const match = text.match(/(?:ceiling(?:\s+height)?\s*(?:is|:)?\s*)(\d+(?:\.\d+)?)\s*(?:ft|feet|foot)|(?:at|about|approximately)\s*(\d+(?:\.\d+)?)\s*(?:ft|feet|foot)\s+ceiling|(\d+(?:\.\d+)?)\s*(?:-|\s)?\s*(?:ft|feet|foot)\s+ceiling/)
  return match ? Number(match[1] ?? match[2] ?? match[3]) : undefined
}

function mapCondition(value: string): ProjectCondition {
  const text = value.trim().toLowerCase()
  if (!text) return 'unknown'
  if (/\b(light|minor|small|good)\b/.test(text)) return 'light'
  if (/\b(extensive|severe|major|heavy|failed)\b/.test(text)) return 'extensive'
  return 'standard'
}

function mapAccess(value: string): AccessDifficulty {
  if (value === 'Easy') return 'easy'
  if (value === 'Moderate') return 'standard'
  if (value === 'Difficult') return 'difficult'
  return 'unknown'
}

function propertyContext(data: Data): { context: PropertyContext; pricingContextReview: boolean } {
  if (data.projectType === 'Commercial') return { context: 'commercial', pricingContextReview: false }
  if (data.projectType === 'Residential') return { context: 'residential', pricingContextReview: false }
  const type = data.propertyType.toLowerCase()
  if (/common area|multi[- ]unit|commercial|office|retail|warehouse|facility|apartment building/.test(type)) return { context: 'commercial', pricingContextReview: false }
  if (/single[- ]family|house|home|residen|condo(?:minium)? unit|apartment unit/.test(type)) return { context: 'residential', pricingContextReview: false }
  return { context: 'residential', pricingContextReview: true }
}

function serviceTiming(data: Data): ServiceTiming {
  if (data.urgency === 'Emergency' || data.category === 'Emergency Service') return 'emergency'
  return 'standard'
}

function pricingContextLabel(context: PropertyContext, timing: ServiceTiming, review: boolean): PricingContext {
  if (review) return 'Residential assumption — review required'
  if (context === 'commercial') return timing === 'standard' ? 'Commercial' : 'Commercial Emergency / After Hours'
  return timing === 'standard' ? 'Residential' : 'Residential Emergency / After Hours'
}

function phrase(text: string, pattern: RegExp): boolean {
  return pattern.test(text.toLowerCase())
}

export function mapEstimatorInput(data: Data, serviceId: string): MappedEstimatorInput {
  const property = propertyContext(data)
  const timing = serviceTiming(data)
  const dimensions = parseDimensions(data.dimensions)
  const quantity = parseExplicitNumber(data.quantity)
  const ceilingHeightFeet = parseCeilingHeight(data)
  const combined = `${data.description} ${data.condition} ${data.accessNotes}`
  const occupied = data.occupancy === 'Occupied'
  const answers: Record<string, EstimatorQuestionValue> = {
    originalDimensions: data.dimensions,
    originalCondition: data.condition,
    propertyType: data.propertyType,
    city: data.city,
    state: data.state,
    zip: data.zip,
    exposure: data.location.toLowerCase(),
    occupancyAffectsWork: occupied,
    photos: data.photos.length > 0,
    gasOdor: phrase(combined, /\b(gas odor|smell(?:s|ing)? of gas)\b/),
    carbonMonoxideAlarm: phrase(combined, /\b(carbon monoxide alarm|co alarm)\b/),
    activeArcing: phrase(combined, /\b(active arcing|active sparking|sparking now)\b|\b(outlet|switch|fixture|wire|electrical)[^.!?]{0,24}\b(sparking|arcing)\b/),
    electricalArcing: phrase(combined, /\b(active arcing|active sparking|sparking now)\b|\b(outlet|switch|fixture|wire|electrical)[^.!?]{0,24}\b(sparking|arcing)\b/),
    smoke: phrase(combined, /\bsmoke|smoking\b/),
    burningOdor: phrase(combined, /\b(burning odor|burning smell)\b/),
    meltedComponents: phrase(combined, /\b(melted component|melted wiring|melted insulation)\b/),
    waterContactingElectrical: phrase(combined, /\b(water (?:contacting|on|in) (?:electrical|outlet|switch|panel)|electrical equipment is wet)\b/),
    activeFlooding: phrase(combined, /\b(active flooding|uncontrolled flooding)\b/),
    fixtureCount: quantity ?? 1,
    deviceCount: quantity ?? 1,
    additionalDeviceCount: Math.max(0, (quantity ?? 1) - 1),
    affectedLocationCount: quantity ?? 1,
    additionalSystemCount: Math.max(0, (quantity ?? 1) - 1),
  }
  if (ceilingHeightFeet !== undefined) answers.ceilingHeightFeet = ceilingHeightFeet

  const warnings: string[] = []
  const manualReviewReasons: string[] = []
  if (data.dimensions.trim() && !dimensions.available) warnings.push('The original dimensions were preserved but were not converted into an exact measurement.')
  if (property.pricingContextReview) manualReviewReasons.push('Property Management pricing context is unclear; a residential assumption is displayed and requires review.')

  const engineInput: ServiceEstimateInput = {
    serviceId,
    propertyContext: property.context,
    serviceTiming: timing,
    quantity,
    squareFeet: dimensions.squareFeet,
    linearFeet: dimensions.linearFeet,
    itemCount: quantity,
    condition: mapCondition(data.condition),
    accessDifficulty: mapAccess(data.access),
    ceilingOrElevatedWork: ceilingHeightFeet !== undefined || data.floor === '3+',
    ceilingHeightFeet,
    floorLevel: data.floor === '3+' ? 3 : parseExplicitNumber(data.floor),
    occupied,
    finishMatching: data.matching,
    customerSuppliedMaterials: data.materials,
    materialPickupRequired: false,
    emergency: timing === 'emergency',
    afterHours: timing === 'afterHours',
    answers,
    photoCount: data.photos.length,
    descriptionLength: data.description.trim().length,
    measurementsProvided: dimensions.available,
    locationProvided: Boolean(data.city.trim() && data.state.trim()),
    concealedDamagePossible: phrase(combined, /\b(concealed|hidden|inside (?:the )?wall|water damage)\b/),
    permitRequirementsResolved: false,
    unclassifiedService: false,
  }

  return { engineInput, pricingContext: pricingContextLabel(property.context, timing, property.pricingContextReview), warnings, manualReviewReasons, originalDimensions: data.dimensions }
}
