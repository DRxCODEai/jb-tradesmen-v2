import { SERVICE_REGISTRY } from '../knowledge/serviceRegistry'
import type { MasterServiceTemplate } from '../templates/masterServiceTemplate'
import type { ServiceResolution } from './integrationTypes'

export const VISIBLE_SERVICE_ID_MAP: Readonly<Record<string, string>> = {
  'Drywall Repair': 'drywall-repair',
  'Interior Painting': 'interior-painting',
  'Exterior Painting': 'exterior-painting',
  'Baseboard and Trim Repair': 'baseboard-trim-repair',
  'Interior Door Repair or Replacement': 'interior-door-repair-replacement',
  'Exterior Door Repair or Replacement': 'exterior-door-repair-replacement',
  'Lock Change': 'lock-change',
  'Windows and Trim': 'window-trim-repair',
  'Window and Trim Repair': 'window-trim-repair',
  'Ceiling Tiles': 'ceiling-tile-replacement',
  'Ceiling Tile Replacement': 'ceiling-tile-replacement',
  'General Handyman Repair': 'general-handyman-repair',
  'Luxury Vinyl Plank Flooring': 'luxury-vinyl-plank-flooring',
  'Laminate Flooring': 'laminate-flooring',
  'Tile Repair': 'tile-repair',
  'Grout or Caulk Repair': 'grout-caulk-repair',
  'Faucet Replacement': 'faucet-replacement',
  'Toilet Repair or Replacement': 'toilet-repair-replacement',
  'Shutoff Valve Replacement': 'shutoff-valve-replacement',
  'Minor Plumbing Leak': 'minor-plumbing-leak-repair',
  'Water Heater Replacement': 'water-heater-replacement',
  'Hose Bib Repair or Replacement': 'hose-bib-repair-replacement',
  'Light Fixture Replacement': 'light-fixture-replacement',
  'Switch or Outlet Replacement': 'switch-outlet-replacement',
  'Electrical Troubleshooting': 'electrical-troubleshooting',
  'Thermostat Replacement': 'thermostat-replacement',
  'HVAC Diagnostics or Minor Repair': 'hvac-diagnostic-minor-repair',
}

const MANUAL_REVIEW_REASONS: Readonly<Record<string, string>> = {
  Flooring: 'Select a specific flooring system before a meaningful preliminary range can be provided.',
  Plumbing: 'Select a specific plumbing service so regulated work and materials can be reviewed correctly.',
  Electrical: 'Electrical work requires a specific service and qualified professional review.',
  HVAC: 'HVAC work requires a specific service and equipment review.',
  'Appliance Repair': 'A dedicated appliance-repair service profile is not yet available.',
  'Doors and Hardware': 'Select a specific door or lock service before pricing.',
  'Kitchen Remodeling': 'Remodeling profiles are not yet available and require professional scope review.',
  'Bathroom Remodeling': 'Remodeling profiles are not yet available and require professional scope review.',
  'Cabinets and Countertops': 'Cabinet and countertop profiles are not yet available.',
  Tile: 'Select tile repair or grout and caulk repair before pricing.',
  'Exterior Repairs': 'The exterior repair scope is too broad for automatic pricing.',
  'Water Damage Repair': 'Water damage may involve concealed, structural, electrical, or hazardous conditions.',
  Other: 'The selected work does not have a sufficiently specific service profile.',
  'Commercial Property Maintenance': 'Commercial maintenance requires a clearly defined, non-regulated task before automatic pricing.',
  'Preventative Maintenance': 'Select a specific maintenance task before pricing.',
  'Tenant Improvements': 'Tenant improvements require professional scope, permit, and trade review.',
  'Rental Turnover': 'Rental turnover work requires an itemized scope before pricing.',
  'Property Inspection': 'Property Assessment is scheduled as a professional assessment and is not priced as a repair.',
  'Emergency Repair': 'Emergency Repair requires a specific underlying service before pricing.',
}

export function resolveServiceProfile(serviceId: string): MasterServiceTemplate | undefined {
  return SERVICE_REGISTRY.find((profile) => profile.identity.id === serviceId)
}

export function selectionRequiresManualReview(visibleService: string): boolean {
  return !(visibleService in VISIBLE_SERVICE_ID_MAP)
}

export function manualReviewReasonForSelection(visibleService: string): string {
  return MANUAL_REVIEW_REASONS[visibleService] ?? 'A dedicated service profile is not yet available for the selected project.'
}

export function resolveVisibleService(visibleService: string | undefined): ServiceResolution {
  const selection = visibleService ?? 'Not selected'
  const serviceId = VISIBLE_SERVICE_ID_MAP[selection] ?? null
  if (!serviceId) return { visibleService: selection, serviceId: null, profile: null, manualReviewRequired: true, manualReviewReasons: [manualReviewReasonForSelection(selection)] }
  const profile = resolveServiceProfile(serviceId) ?? null
  if (!profile) return { visibleService: selection, serviceId, profile: null, manualReviewRequired: true, manualReviewReasons: ['The mapped service profile is unavailable. Professional review is required.'] }
  return { visibleService: selection, serviceId, profile, manualReviewRequired: false, manualReviewReasons: [] }
}
