import type { Data } from '../types/estimator'

export interface DescriptionServiceResolution {
  serviceId: string | null
  confidence: number
  matchedKeywords: readonly string[]
  ambiguous: boolean
}

interface KeywordRule {
  serviceId: string
  keywords: readonly string[]
  broadServices?: readonly string[]
}

const RULES: readonly KeywordRule[] = [
  { serviceId: 'water-heater-replacement', keywords: ['hot water heater', 'water heater', 'no hot water', 'leaking tank', 'replace heater'], broadServices: ['Plumbing', 'Other', 'Kitchen Remodeling', 'Bathroom Remodeling'] },
  { serviceId: 'hose-bib-repair-replacement', keywords: ['outdoor faucet', 'hose spigot', 'hose bib', 'sillcock'], broadServices: ['Plumbing', 'Exterior Repairs', 'Other'] },
  { serviceId: 'shutoff-valve-replacement', keywords: ['shut off valve', 'shutoff valve', 'angle stop', 'supply valve', 'shutoff'], broadServices: ['Plumbing', 'Other'] },
  { serviceId: 'faucet-replacement', keywords: ['kitchen faucet', 'bathroom faucet', 'sink faucet', 'faucet'], broadServices: ['Plumbing', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Other'] },
  { serviceId: 'toilet-repair-replacement', keywords: ['running toilet', 'replace toilet', 'commode', 'toilet'], broadServices: ['Plumbing', 'Bathroom Remodeling', 'Other'] },
  { serviceId: 'minor-plumbing-leak-repair', keywords: ['plumbing leak', 'water line leak', 'leaking pipe', 'pipe leak'], broadServices: ['Plumbing', 'Water Damage Repair', 'Other', 'Emergency Repair'] },
  { serviceId: 'luxury-vinyl-plank-flooring', keywords: ['luxury vinyl plank', 'luxury vinyl', 'vinyl plank', 'lvp'], broadServices: ['Flooring', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Other'] },
  { serviceId: 'laminate-flooring', keywords: ['laminate flooring', 'laminate floor'], broadServices: ['Flooring', 'Kitchen Remodeling', 'Other'] },
  { serviceId: 'grout-caulk-repair', keywords: ['regrout', 'recaulk', 'grout', 'caulk'], broadServices: ['Tile', 'Bathroom Remodeling', 'Kitchen Remodeling', 'Other'] },
  { serviceId: 'tile-repair', keywords: ['broken tile', 'cracked tile', 'replace tile', 'tile repair'], broadServices: ['Tile', 'Flooring', 'Bathroom Remodeling', 'Kitchen Remodeling', 'Other'] },
  { serviceId: 'drywall-repair', keywords: ['drywall', 'sheetrock', 'wall hole', 'ceiling hole', 'patch wall'], broadServices: ['Other', 'Water Damage Repair', 'Tenant Improvements', 'Rental Turnover', 'Commercial Property Maintenance'] },
  { serviceId: 'interior-painting', keywords: ['interior paint', 'paint walls', 'repaint room', 'paint room', 'paint kitchen', 'paint bathroom'], broadServices: ['Other', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Tenant Improvements', 'Rental Turnover', 'Commercial Property Maintenance'] },
  { serviceId: 'exterior-painting', keywords: ['exterior paint', 'paint siding', 'outside painting'], broadServices: ['Exterior Repairs', 'Other', 'Commercial Property Maintenance'] },
  { serviceId: 'ceiling-tile-replacement', keywords: ['drop ceiling tile', 'acoustic tile', 'ceiling tile'], broadServices: ['Other', 'Tenant Improvements', 'Commercial Property Maintenance'] },
  { serviceId: 'interior-door-repair-replacement', keywords: ['interior door', 'bedroom door', 'closet door'], broadServices: ['Doors and Hardware', 'Other', 'Rental Turnover', 'Tenant Improvements'] },
  { serviceId: 'exterior-door-repair-replacement', keywords: ['exterior door', 'entry door', 'front door', 'back door'], broadServices: ['Doors and Hardware', 'Exterior Repairs', 'Other'] },
  { serviceId: 'lock-change', keywords: ['lock change', 'replace lock', 'deadbolt', 'lockset'], broadServices: ['Doors and Hardware', 'Other', 'Rental Turnover'] },
  { serviceId: 'light-fixture-replacement', keywords: ['light fixture', 'ceiling light', 'replace light', 'chandelier'], broadServices: ['Electrical', 'Other', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Tenant Improvements'] },
  { serviceId: 'electrical-troubleshooting', keywords: ['outlet not working', 'breaker trips', 'no power', 'flickering', 'electrical issue', 'active arcing', 'active sparking'], broadServices: ['Electrical', 'Other', 'Emergency Repair'] },
  { serviceId: 'switch-outlet-replacement', keywords: ['receptacle', 'gfci', 'dimmer', 'outlet', 'switch'], broadServices: ['Electrical', 'Other', 'Kitchen Remodeling', 'Bathroom Remodeling', 'Tenant Improvements'] },
  { serviceId: 'thermostat-replacement', keywords: ['smart thermostat', 'thermostat'], broadServices: ['HVAC', 'Other'] },
  { serviceId: 'hvac-diagnostic-minor-repair', keywords: ['air conditioner', 'ac not working', 'heater not working', 'no cooling', 'no heat', 'furnace', 'hvac', 'gas odor', 'carbon monoxide alarm'], broadServices: ['HVAC', 'Other', 'Emergency Repair'] },
]

function normalize(value: string): string {
  return ` ${value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\s+/g, ' ').trim()} `
}

function keywordScore(keyword: string): number {
  return keyword.split(' ').length * 20 + keyword.length
}

export function resolveServiceFromDescription(data: Data): DescriptionServiceResolution {
  const selectedService = data.service ?? ''
  const text = normalize([data.description, data.category ?? '', selectedService, data.outcome, data.condition].join(' '))
  const candidates = RULES
    .filter((rule) => !rule.broadServices || rule.broadServices.includes(selectedService) || selectedService === rule.serviceId)
    .map((rule) => {
      const matchedKeywords = rule.keywords.filter((keyword) => text.includes(normalize(keyword)))
      const score = matchedKeywords.length ? Math.max(...matchedKeywords.map(keywordScore)) + (matchedKeywords.length - 1) * 10 : 0
      return { serviceId: rule.serviceId, matchedKeywords, score }
    })
    .filter((candidate) => candidate.score > 0)
    .sort((left, right) => right.score - left.score || left.serviceId.localeCompare(right.serviceId))

  if (!candidates.length) return { serviceId: null, confidence: 0, matchedKeywords: [], ambiguous: false }
  const best = candidates[0]
  const conflicting = candidates.slice(1).filter((candidate) => !candidate.matchedKeywords.every((keyword) => best.matchedKeywords.some((bestKeyword) => bestKeyword.includes(keyword) || keyword.includes(bestKeyword))))
  if (conflicting.length) return { serviceId: null, confidence: 0.35, matchedKeywords: [...new Set([best, ...conflicting].flatMap((candidate) => candidate.matchedKeywords))], ambiguous: true }
  const confidence = best.score >= 70 || best.matchedKeywords.length > 1 ? 0.9 : 0.72
  return { serviceId: best.serviceId, confidence, matchedKeywords: best.matchedKeywords, ambiguous: false }
}
