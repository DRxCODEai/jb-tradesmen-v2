import type { ServiceFAQ, ServiceHubService } from '../types/serviceHub'

type NewContentField =
  | 'whatWeDo'
  | 'commonApplications'
  | 'whatToExpect'
  | 'professionalInsights'
  | 'preparationTips'
  | 'faqs'
  | 'projectScopeNotes'

interface LegacyServiceRecord extends Omit<ServiceHubService, NewContentField> {
  includedServices: string[]
  commonConcerns: string[]
  helpfulTips: string[]
  whenToCallProfessional: string[]
  regulatedWorkNotes: string[]
  assumptions: string[]
}

interface ServiceContentPlan {
  commonApplications: string[]
  overviewClosing: string
  workFocus: string
  professionalInsights: string[]
  preparationDetails: string[]
  specificFaqs: ServiceFAQ[]
  capabilityAdditions?: string[]
  projectScopeNotes?: string[]
}

const siteUrl = 'https://www.jbtradesmenllc.com'

const serviceAreaCopy =
  'JBTRADESMENLLC serves Las Vegas, Henderson, North Las Vegas, Summerlin, Enterprise, Spring Valley, Paradise, Southern Highlands, and nearby Las Vegas Valley communities. Scheduled dispatch support remains available for select clients in Cheyenne, Wyoming, and Fort Collins, Colorado.'

const primaryCTA = {
  label: 'Request an Estimate',
  route: '/request-estimate',
}

const secondaryCTA = {
  label: 'Use Smart Project Estimator',
  route: '/instant-project-estimate',
}

export function getServiceBySlug(slug: string | undefined) {
  return serviceHubServices.find(
    (service) => service.active && service.slug === slug,
  )
}

export function getServiceById(id: string) {
  return serviceHubServices.find(
    (service) => service.active && service.id === id,
  )
}

const serviceHubRecords: LegacyServiceRecord[] = [
  {
    id: 'commercial-maintenance',
    slug: 'commercial-maintenance-las-vegas',
    route: '/services/commercial-maintenance-las-vegas',
    title: 'Commercial Maintenance',
    shortTitle: 'Commercial Maintenance',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Commercial Maintenance Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial maintenance in Las Vegas for offices, retail spaces, banks, warehouses, common areas, and professionally managed properties.',
    canonicalUrl: `${siteUrl}/services/commercial-maintenance-las-vegas`,
    heroHeading: 'Commercial Maintenance Services in Las Vegas',
    heroDescription:
      'Practical recurring upkeep, preventative maintenance, corrective repairs, and documented property support for commercial facilities.',
    overview: [
      'Commercial maintenance brings routine observations, planned upkeep, and corrective repair work into one organized property-care process. In Las Vegas, heat, heavy use, tenant activity, and around-the-clock operations can make small finish or fixture problems more disruptive when they are left unresolved. JBTRADESMENLLC supports offices, retail locations, banks, warehouses, managed properties, and shared commercial areas with work that can be scheduled around the property’s access requirements and operating priorities.',
      'A typical scope may combine inspection notes, preventative tasks, interior and exterior repairs, plumbing fixture attention, drywall and paint correction, door hardware work, ceiling tiles, flooring, and fixture replacement. The approach starts with the visible condition and the customer’s maintenance goals, then separates immediate concerns from work that can be planned. Before-and-after documentation can help facility teams track completion, identify recurring failures by location or asset, and communicate clearly with owners, tenants, or other vendors.',
      'Not every condition can be fully defined from a work order or photograph. Active water intrusion, concealed damage, access restrictions, equipment shutdowns, hazardous materials, or regulated systems may require a site assessment and coordination with an appropriately qualified specialty provider. JBTRADESMENLLC develops the practical repair scope it can responsibly complete, identifies limitations early, and helps customers plan phased or scheduled maintenance without representing an observation as an engineering, code-compliance, or specialty-trade determination.',
    ],
    includedServices: [
      'Preventative maintenance',
      'Interior repairs',
      'Exterior repairs',
      'Accessible plumbing repairs',
      'Drywall and paint repairs',
      'Door and hardware repairs',
      'Ceiling tile replacement',
      'Flooring repairs',
      'Fixture replacement',
      'Property condition observations',
    ],
    commonConcerns: [
      'Recurring repair requests without a documented history',
      'Water-stained finishes or ceiling tiles',
      'Worn doors, hardware, walls, and flooring in high-traffic areas',
      'Tenant and common-area punch lists',
      'Deferred maintenance affecting daily operations',
      'Multiple small repairs requiring coordinated access',
    ],
    helpfulTips: [
      'Maintain a documented inspection schedule.',
      'Resolve water intrusion before replacing damaged finishes.',
      'Track recurring failures by location and asset.',
      'Coordinate disruptive work outside peak operating hours where practical.',
      'Photograph and document conditions before and after repair.',
    ],
    whenToCallProfessional: [
      'A condition is recurring, spreading, or affecting customers, tenants, or operations.',
      'Several trades or repair areas need to be evaluated and prioritized together.',
      'Access, shutdowns, high work areas, or occupied spaces require coordination.',
      'The visible damage may be connected to concealed moisture or a regulated system.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'facility-maintenance',
      'commercial-property-maintenance',
      'commercial-repairs',
      'commercial-handyman',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial maintenance services',
    regulatedWorkNotes: [
      'Regulated electrical, plumbing, HVAC, fire-life-safety, structural, or permit-required work may require additional review and an appropriate specialty trade.',
    ],
    assumptions: [
      'Final scope depends on site conditions, access, operating schedules, and the customer’s approved priorities.',
      'Condition observations are not engineering, environmental, or code-compliance inspections.',
    ],
    active: true,
  },
  {
    id: 'handyman',
    slug: 'handyman-las-vegas',
    route: '/services/handyman-las-vegas',
    title: 'Handyman Services',
    shortTitle: 'Handyman Services',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Handyman Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Handyman services in Las Vegas for general home repairs, punch lists, doors, trim, drywall, hardware, caulking, shelving, and TV mounting.',
    canonicalUrl: `${siteUrl}/services/handyman-las-vegas`,
    heroHeading: 'Handyman Services in Las Vegas',
    heroDescription:
      'Practical help with general repairs, punch lists, installations, and routine maintenance throughout the home.',
    overview: [
      'Handyman service helps homeowners and residential property managers complete a varied list of repairs without turning each small item into a separate project. A Las Vegas home may need door adjustments, trim correction, drywall patches, caulking, hardware replacement, shelving, fixture installation, TV mounting, or general upkeep at the same time. JBTRADESMENLLC reviews the list, groups related work, and identifies materials or access questions before the service visit whenever possible.',
      'The typical scope is practical, visible, and accessible. Work may involve walls, doors, cabinets, trim, hardware, sealants, mounted accessories, and other finish items that can be evaluated from the room and mounting surface. Regulated electrical, concealed or major plumbing, HVAC, gas, structural, hazardous-material, and permit-required work may require qualified specialty review rather than general handyman service.',
    ],
    includedServices: [
      'General home punch lists',
      'Door and trim repairs',
      'Drywall patches',
      'Hardware replacement',
      'Caulking and sealant maintenance',
      'Shelving and accessory installation',
      'Fixture replacement where appropriate',
      'TV and wall-mounted item installation',
    ],
    commonConcerns: [
      'Several small repairs accumulating throughout the home',
      'Loose or misaligned doors, cabinets, and hardware',
      'Wall damage after moving furniture or accessories',
      'Failed caulking around finishes',
      'Shelving or equipment needing secure mounting',
      'Punch-list work before move-in, sale, or turnover',
    ],
    helpfulTips: [
      'Make one room-by-room list and identify the highest-priority items.',
      'Photograph repairs and include dimensions or product labels where possible.',
      'Keep matching paint, trim, and hardware information on file.',
      'Report moisture, burning odors, gas odors, or active leakage separately and promptly.',
      'Confirm that customer-provided fixtures fit the intended location.',
    ],
    whenToCallProfessional: [
      'The list includes secure mounting, high access, or several material types.',
      'Cracks, leaks, or movement continue after a prior repair.',
      'A task may involve a concealed utility or regulated system.',
      'Damage affects safe access, doors, stairs, or occupied living areas.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['home-repairs', 'property-maintenance', 'drywall-repair', 'tv-mounting'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential handyman services',
    regulatedWorkNotes: [
      'Electrical, major or concealed plumbing, gas, HVAC, structural, hazardous-material, and permit-required work may require appropriate specialty review.',
    ],
    assumptions: [
      'Service scope depends on accessible conditions, mounting surfaces, material availability, and product compatibility.',
    ],
    active: true,
  },
  {
    id: 'home-repairs',
    slug: 'home-repairs-las-vegas',
    route: '/services/home-repairs-las-vegas',
    title: 'Home Repairs',
    shortTitle: 'Home Repairs',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Home Repairs Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Professional home repairs in Las Vegas for walls, doors, windows, trim, fixtures, flooring, minor carpentry, and maintenance concerns.',
    canonicalUrl: `${siteUrl}/services/home-repairs-las-vegas`,
    heroHeading: 'Professional Home Repairs in Las Vegas',
    heroDescription:
      'Thoughtful correction of everyday damage, wear, and maintenance concerns in occupied, vacant, and rental homes.',
    overview: [
      'Home repair service addresses wear, damage, and incomplete maintenance that can affect how a property looks and functions. Interior and exterior finishes in Las Vegas homes experience daily use, temperature changes, movement, and occasional water exposure. JBTRADESMENLLC works with homeowners, rental owners, and property managers to document visible concerns and organize repairs by urgency, access, material needs, and the source of the damage.',
      'A typical scope may include doors, windows, trim, walls, fixtures, flooring details, minor carpentry, exterior finish concerns, and related punch-list work. Widespread cracking, sagging, active water entry, suspected hazardous materials, damaged electrical components, gas concerns, structural movement, and permit-required alterations should be evaluated by an appropriately qualified professional before finish repairs proceed.',
    ],
    includedServices: [
      'Interior wall and finish repairs',
      'Selected exterior finish repairs',
      'Door and window adjustments',
      'Trim and minor carpentry',
      'Fixture and hardware replacement',
      'Flooring detail repairs',
      'Drywall and paint correction',
      'Move-in and turnover punch lists',
    ],
    commonConcerns: [
      'Normal wear and tear throughout the home',
      'Impact damage to walls, trim, or doors',
      'Sticking or misaligned doors and windows',
      'Loose fixtures, transitions, or finish details',
      'Water-related damage after the source is corrected',
      'Repair lists before occupancy, sale, or rental turnover',
    ],
    helpfulTips: [
      'Photograph damage before finishes are removed.',
      'Resolve active moisture before repairing walls, ceilings, or flooring.',
      'Save paint colors, product labels, and flooring information for matching.',
      'Watch for repeated cracks or movement after a prior repair.',
      'Separate urgent water or safety concerns from cosmetic punch-list items.',
    ],
    whenToCallProfessional: [
      'Damage is recurring, widespread, or connected to moisture.',
      'A door, floor, wall, or fixture condition affects safe use.',
      'The repair may conceal a structural, electrical, plumbing, or material concern.',
      'Several areas need coordinated repair and finish matching.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['handyman', 'drywall-repair', 'interior-painting', 'flooring-installation'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential home repair services',
    regulatedWorkNotes: [
      'Structural, electrical, gas, major plumbing, hazardous-material, and permit-required conditions need appropriate professional review.',
    ],
    assumptions: [
      'Repair recommendations are based on visible and accessible conditions.',
    ],
    active: true,
  },
  {
    id: 'property-maintenance',
    slug: 'property-maintenance-las-vegas',
    route: '/services/property-maintenance-las-vegas',
    title: 'Property Maintenance',
    shortTitle: 'Property Maintenance',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Property Maintenance Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Residential property maintenance in Las Vegas for homeowners, rentals, turnovers, seasonal observations, preventative repairs, and general upkeep.',
    canonicalUrl: `${siteUrl}/services/property-maintenance-las-vegas`,
    heroHeading: 'Residential Property Maintenance in Las Vegas',
    heroDescription:
      'Planned home upkeep, seasonal observations, turnover support, and preventative repair for residential properties.',
    overview: [
      'Residential property maintenance is the ongoing process of noticing change, completing routine upkeep, and addressing small concerns before they become larger repair projects. Las Vegas homes and rentals face intense sun, dry air, seasonal temperature changes, water risks, and normal occupancy wear. JBTRADESMENLLC helps homeowners and property managers organize maintenance observations and practical repairs around the property’s age, equipment instructions, occupancy, and known service history.',
      'A maintenance visit may include doors and windows, exterior caulking, visible water concerns, HVAC-filter observations, fixture condition, walls and trim, general hardware, turnover items, and other accessible components. Observations do not replace licensed system diagnostics, environmental testing, structural evaluation, or required inspections, and unsafe or regulated conditions require appropriate professional attention.',
    ],
    includedServices: [
      'Seasonal property observations',
      'Rental turnover maintenance',
      'Exterior caulking observations and replacement',
      'Door and window maintenance',
      'Visible water-system observations',
      'HVAC filter and access observations',
      'Interior finish and hardware repairs',
      'General preventative upkeep',
    ],
    commonConcerns: [
      'Cracked exterior sealant around doors and windows',
      'Recurring stains, moisture, or minor leaks',
      'Deferred turnover or seasonal maintenance',
      'Doors, windows, and hardware changing with use or weather',
      'Unknown filter, fixture, or equipment service history',
      'Multiple small concerns without a prioritized plan',
    ],
    helpfulTips: [
      'Inspect exterior caulking around doors and windows.',
      'Test sump pumps where installed according to manufacturer guidance.',
      'Follow manufacturer guidance for HVAC-filter replacement.',
      'Watch for stains, moisture, and recurring leaks.',
      'Document maintenance history, product models, and prior repairs.',
    ],
    whenToCallProfessional: [
      'A stain, leak, odor, or equipment problem is new or recurring.',
      'Maintenance requires access beyond a safe, visible, routine scope.',
      'A condition involves gas, electricity, structure, refrigerant, or hazardous material.',
      'A turnover list needs coordinated repairs across several areas.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['home-repairs', 'handyman', 'plumbing-repair', 'water-heater-replacement'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential property maintenance services',
    regulatedWorkNotes: [
      'System diagnostics, energized equipment, gas, refrigerant, structural conditions, hazardous materials, and permit-required work need appropriate professional review.',
    ],
    assumptions: [
      'Maintenance frequency follows property conditions and manufacturer guidance rather than a universal interval.',
    ],
    active: true,
  },
  {
    id: 'water-heater-replacement',
    slug: 'water-heater-replacement-las-vegas',
    route: '/services/water-heater-replacement-las-vegas',
    title: 'Water Heater Replacement',
    shortTitle: 'Water Heater Replacement',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Water Heater Replacement Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Water heater replacement planning in Las Vegas for conventional tank units, capacity, access, pans, expansion tanks, valves, and utility conditions.',
    canonicalUrl: `${siteUrl}/services/water-heater-replacement-las-vegas`,
    heroHeading: 'Water Heater Replacement Services in Las Vegas',
    heroDescription:
      'Site-specific planning for conventional tank water-heater removal and replacement, including access and surrounding installation conditions.',
    overview: [
      'Water heater replacement requires more planning than selecting a tank with a similar appearance. Fuel type, capacity, dimensions, installation location, access path, drain pan, expansion tank, shutoff valve, connections, venting, and electrical conditions can all affect the scope. JBTRADESMENLLC documents the existing conventional tank unit and surrounding area so the visible replacement considerations are understood before equipment and scheduling decisions are finalized.',
      'Gas and electric units have different requirements, and existing installations may require utility, venting, electrical, plumbing, permit, or access review. Active leakage should be addressed promptly. Customers should not drain, disconnect, relight, alter gas components, or perform electrical work based on this page; qualified specialty providers may be required after site review.',
    ],
    includedServices: [
      'Existing tank and location assessment',
      'Fuel type and capacity documentation',
      'Access-path and removal planning',
      'Drain pan and drainage observations',
      'Expansion tank observations',
      'Shutoff valve and accessible connection review',
      'Replacement-equipment compatibility planning',
      'Removal and replacement scope development',
    ],
    commonConcerns: [
      'Active tank or connection leakage',
      'Limited access or incompatible replacement dimensions',
      'Unknown fuel type, capacity, model, or service history',
      'Damaged pans, valves, or surrounding finishes',
      'Expansion, drainage, venting, gas, or electrical concerns',
      'Permit or jurisdictional review affecting the project',
    ],
    helpfulTips: [
      'Identify fuel type, tank capacity, model, and installation location before requesting service.',
      'Address active leaks promptly.',
      'Keep the area around the unit accessible.',
      'Follow manufacturer maintenance instructions.',
      'Expansion tanks, pans, drainage, venting, gas, and electrical conditions may affect scope.',
    ],
    whenToCallProfessional: [
      'The tank or a connection is actively leaking.',
      'Hot-water availability, temperature, sound, or operation changes unexpectedly.',
      'The installation includes gas, venting, electrical, drainage, or access concerns.',
      'The replacement may require permits or corrective work beyond the tank itself.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['plumbing-repair', 'property-maintenance', 'home-repairs', 'appliance-repair'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Water heater replacement services',
    regulatedWorkNotes: [
      'Permits, gas systems, venting, electrical work, concealed piping, and jurisdictional requirements may require appropriately qualified specialty providers.',
    ],
    assumptions: [
      'Final equipment selection and scope depend on site measurements, utilities, access, manufacturer instructions, and required reviews.',
    ],
    active: true,
  },
  {
    id: 'drywall-repair',
    slug: 'drywall-repair-las-vegas',
    route: '/services/drywall-repair-las-vegas',
    title: 'Drywall Repair',
    shortTitle: 'Drywall Repair',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Drywall Repair Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Drywall repair in Las Vegas for holes, cracks, impact damage, ceiling damage, texture matching, primer, paint, and corrected water damage.',
    canonicalUrl: `${siteUrl}/services/drywall-repair-las-vegas`,
    heroHeading: 'Drywall Repair Services in Las Vegas',
    heroDescription:
      'Careful wall and ceiling repair with attention to the damage source, texture, primer, and surrounding finish.',
    overview: [
      'Drywall repair restores walls and ceilings after impact, fastener movement, fixture changes, cracking, access cuts, or corrected water damage. The surrounding board, framing support, moisture condition, texture, primer, paint, and lighting all influence how the finished repair will look. JBTRADESMENLLC evaluates those details before recommending a patch size and finish sequence for a Las Vegas home.',
      'Water-damaged drywall should not be closed until the moisture source is corrected. Sagging ceilings, widespread staining, repeated cracking, structural movement, contamination, or older suspect textures may require specialty or hazardous-material review before disturbance. Finish matching remains subject to existing texture, paint age, sheen, and lighting.',
    ],
    includedServices: [
      'Small and moderate hole repair',
      'Crack and impact-damage repair',
      'Selected ceiling drywall repair',
      'Access-opening closure after approved work',
      'Texture assessment and blending',
      'Primer application',
      'Paint touch-up or coordinated repainting',
      'Water-damage repair after source correction',
    ],
    commonConcerns: [
      'Holes from impact, anchors, or removed fixtures',
      'Cracks returning after prior repair',
      'Ceiling stains, sagging, or damaged board',
      'Texture that is difficult to match',
      'Water damage with an uncertain source',
      'Older materials that should be reviewed before disturbance',
    ],
    helpfulTips: [
      'Repair the moisture source before closing damaged drywall.',
      'Photograph texture in natural light.',
      'Keep matching paint information where possible.',
      'Sagging ceilings or widespread water damage require inspection.',
      'Older textures may require hazardous-material review before disturbance.',
    ],
    whenToCallProfessional: [
      'A ceiling is sagging, soft, wet, or changing shape.',
      'Cracks are widespread, recurring, or associated with movement.',
      'The repair requires texture blending across a larger area.',
      'The material or moisture condition is unknown.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['interior-painting', 'home-repairs', 'handyman', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential drywall repair services',
    regulatedWorkNotes: [
      'Suspect hazardous materials, structural movement, active leaks, contamination, and widespread ceiling damage require appropriate review before disturbance.',
    ],
    assumptions: [
      'Moisture sources and specialty-system work are corrected before drywall closure.',
    ],
    active: true,
  },
  {
    id: 'commercial-handyman',
    slug: 'commercial-handyman-las-vegas',
    route: '/services/commercial-handyman-las-vegas',
    title: 'Commercial Handyman',
    shortTitle: 'Commercial Handyman',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Commercial Handyman Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial handyman service in Las Vegas for office and retail punch lists, hardware, wall repairs, fixtures, shelving, and minor carpentry.',
    canonicalUrl: `${siteUrl}/services/commercial-handyman-las-vegas`,
    heroHeading: 'Commercial Handyman Services in Las Vegas',
    heroDescription:
      'Efficient completion of small-to-medium commercial repair lists across multiple practical maintenance categories.',
    overview: [
      'Commercial handyman service is useful when a property has a collection of practical repairs that do not justify coordinating a separate visit for every item. Retail stores, offices, professional suites, common areas, and managed facilities often accumulate door adjustments, wall damage, loose hardware, shelving needs, minor carpentry, fixture replacements, and finish corrections. JBTRADESMENLLC organizes these items into a clear punch list so access, materials, priorities, and completion expectations can be discussed before work begins.',
      'The service is suited to small-to-medium repair lists and routine property needs that fall within an accessible, non-specialty scope. A visit may include door and cabinet hardware, drywall patches, caulking, trim, wall-mounted accessories, shelving, signs, fixtures, or minor finish work. Each item is evaluated for surrounding damage and practical access rather than treated as an isolated cosmetic task. This helps identify whether the requested repair is straightforward or whether a recurring failure, concealed condition, or separate system needs attention first.',
      'A handyman work order is not a substitute for regulated trade review. Electrical systems, concealed or major plumbing, HVAC and refrigerant equipment, structural modifications, fire-life-safety components, hazardous materials, and permit-required projects may need qualified specialty providers or jurisdictional coordination. When a request crosses that boundary, JBTRADESMENLLC can document the observed condition, complete appropriate related items, and help the customer separate the general repair scope from work requiring additional authorization or expertise.',
    ],
    includedServices: [
      'Commercial punch-list completion',
      'Door and cabinet hardware adjustments',
      'Drywall patches and wall repairs',
      'Shelving and accessory installation',
      'Minor carpentry and trim repairs',
      'Caulking and finish corrections',
      'Fixture and hardware replacement',
      'Wall-mounted item installation',
    ],
    commonConcerns: [
      'A growing list of unrelated minor repairs',
      'Loose, worn, or misaligned doors and hardware',
      'Wall damage after tenant or fixture changes',
      'Shelving, accessories, or fixtures needing secure installation',
      'Finish defects that affect customer-facing presentation',
      'Punch-list items delaying turnover or closeout',
    ],
    helpfulTips: [
      'Group repair items by room or access area before scheduling.',
      'Photograph each item and note dimensions when possible.',
      'Identify replacement finishes, hardware, or brand standards in advance.',
      'Separate operationally urgent items from cosmetic improvements.',
      'Confirm occupied-area and after-hours access requirements early.',
    ],
    whenToCallProfessional: [
      'The repair list includes multiple materials, mounting conditions, or occupied work areas.',
      'A door, wall, ceiling, or fixture problem continues after prior adjustment.',
      'Damage may be connected to moisture, movement, or a concealed system.',
      'Secure mounting, elevated access, or operational coordination is required.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-repairs',
      'office-maintenance',
      'retail-maintenance',
      'commercial-maintenance',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial handyman services',
    regulatedWorkNotes: [
      'Regulated electrical, plumbing, HVAC, structural, fire-life-safety, and permit-required work may require an appropriate specialty trade or additional review.',
    ],
    assumptions: [
      'Service scope is confirmed after reviewing site conditions, mounting surfaces, materials, and access.',
      'Customer-provided fixtures and hardware must be compatible with the intended installation.',
    ],
    active: true,
  },
  {
    id: 'facility-maintenance',
    slug: 'facility-maintenance-las-vegas',
    route: '/services/facility-maintenance-las-vegas',
    title: 'Facility Maintenance',
    shortTitle: 'Facility Maintenance',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Facility Maintenance Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Facility maintenance support in Las Vegas for preventative work, condition observations, work orders, repair priorities, and vendor coordination.',
    canonicalUrl: `${siteUrl}/services/facility-maintenance-las-vegas`,
    heroHeading: 'Facility Maintenance Services in Las Vegas',
    heroDescription:
      'Organized maintenance support for building conditions, work orders, preventative tasks, and multi-site facility needs.',
    overview: [
      'Facility maintenance connects day-to-day work orders with the longer view of how a building is being used and cared for. For facility teams and multi-site operators in Las Vegas, the challenge is often not a single repair but the volume of recurring requests, service intervals, access needs, and vendor responsibilities. JBTRADESMENLLC supports this process through practical condition observations, routine maintenance tasks, repair completion, documentation, and coordination around occupied commercial operations.',
      'A facility scope can include preventative task lists, interior finish repairs, doors and hardware, ceiling systems, accessible plumbing fixtures, common-area needs, and follow-up on reported conditions. Work is organized so urgent failures are distinguished from planned maintenance and cosmetic improvements. Service records, photographs, asset locations, and clear completion notes give facility managers useful information for future planning without turning a maintenance visit into an unsupported engineering or system-performance conclusion.',
      'Some equipment and building systems have manufacturer requirements or regulated service boundaries that general facility maintenance cannot replace. Electrical panels, gas systems, refrigerant equipment, fire protection, structural concerns, hazardous materials, and permit-related work require the appropriate review. JBTRADESMENLLC can help identify visible concerns, maintain safe access, address approved general repairs, and coordinate its scope with other vendors while leaving specialty diagnostics and final technical determinations to qualified providers.',
    ],
    includedServices: [
      'Preventative maintenance task support',
      'Work-order completion',
      'Asset condition observations',
      'Repair prioritization support',
      'Facility documentation',
      'Interior finish repairs',
      'Door, hardware, and ceiling maintenance',
      'Vendor access and scope coordination',
      'Multi-site maintenance support',
    ],
    commonConcerns: [
      'Work-order backlogs with mixed urgency',
      'Incomplete asset or service records',
      'Recurring failures at the same equipment location',
      'Water-prone areas and ceiling staining',
      'Access conflicts in occupied facilities',
      'Maintenance needs spread across multiple sites',
    ],
    helpfulTips: [
      'Maintain asset and service records.',
      'Separate urgent failures from planned maintenance.',
      'Track manufacturer service intervals.',
      'Review HVAC filters and ventilation maintenance regularly according to equipment requirements.',
      'Inspect water-prone areas and ceiling systems.',
      'Maintain safe and clear access to service equipment.',
    ],
    whenToCallProfessional: [
      'A work order affects safe access, business operations, or multiple building areas.',
      'The same condition returns after routine maintenance.',
      'Equipment access, shutdowns, or vendor coordination require planning.',
      'A visible concern may involve a regulated system or concealed damage.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-maintenance',
      'commercial-property-maintenance',
      'office-maintenance',
      'commercial-repairs',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Facility maintenance services',
    regulatedWorkNotes: [
      'Manufacturer-required service, regulated systems, engineering, environmental review, and permit-related work remain outside a general maintenance determination.',
    ],
    assumptions: [
      'Facility representatives provide current access rules, asset information, and known service history where available.',
      'Observations support maintenance planning and do not certify system performance or code compliance.',
    ],
    active: true,
  },
  {
    id: 'commercial-property-maintenance',
    slug: 'commercial-property-maintenance-las-vegas',
    route: '/services/commercial-property-maintenance-las-vegas',
    title: 'Commercial Property Maintenance',
    shortTitle: 'Property Maintenance',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Commercial Property Maintenance Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial property maintenance in Las Vegas for common areas, tenant turnover, inspections, recurring repairs, and property-manager reporting.',
    canonicalUrl: `${siteUrl}/services/commercial-property-maintenance-las-vegas`,
    heroHeading: 'Commercial Property Maintenance in Las Vegas',
    heroDescription:
      'Responsive interior and exterior maintenance support for property managers, mixed-use sites, and multi-unit commercial properties.',
    overview: [
      'Commercial property maintenance focuses on the shared spaces, tenant areas, exterior interfaces, and recurring repair needs that influence how a managed property operates and presents. Property managers in the Las Vegas Valley often need consistent support across common areas, turnovers, scheduled observations, vendor reporting, and small corrective projects. JBTRADESMENLLC helps organize those needs into defined work orders that can be prioritized by urgency, access, tenant impact, and approved budget.',
      'Typical work may involve walls and paint, doors and hardware, flooring transitions, ceiling tiles, accessible plumbing fixtures, exterior sealant or finish concerns, turnover punch lists, and documentation of visible property conditions. The service can support one-time repairs or a recurring maintenance plan. Clear photographs and completion notes help managers communicate with ownership and tenants, while grouping related tasks can reduce repeated access disruptions and make material planning more practical.',
      'A property-wide maintenance visit does not replace specialty inspections or determine the condition of concealed systems. Active leaks, significant movement, structural concerns, electrical or HVAC problems, hazardous materials, fire-life-safety systems, and permit-required alterations need appropriate professional review. JBTRADESMENLLC identifies the portion of the scope suitable for general property maintenance, documents limitations, and coordinates the timing of approved repairs with occupants and other providers when needed.',
    ],
    includedServices: [
      'Common-area repairs',
      'Tenant-turnover punch lists',
      'Interior wall and finish repairs',
      'Door and hardware maintenance',
      'Ceiling tile and flooring repairs',
      'Accessible fixture replacement',
      'Minor exterior finish repairs',
      'Maintenance condition observations',
      'Vendor reporting and photo documentation',
    ],
    commonConcerns: [
      'Turnover items that must be completed before occupancy',
      'Common-area wear affecting multiple tenants',
      'Recurring repair requests without location history',
      'Interior and exterior tasks requiring one coordinated schedule',
      'Deferred finish damage around leaks or failed sealants',
      'Multi-unit access and communication requirements',
    ],
    helpfulTips: [
      'Use unit, suite, and common-area identifiers on every work order.',
      'Document preexisting conditions before turnover work begins.',
      'Correct active moisture sources before repairing finishes.',
      'Track recurring requests to reveal broader maintenance patterns.',
      'Confirm tenant access and quiet-hour requirements before scheduling.',
    ],
    whenToCallProfessional: [
      'Damage is repeated across units or common areas.',
      'Turnover work involves several repair categories or tight scheduling.',
      'A condition is affecting occupancy, access, or property operations.',
      'The visible repair may depend on specialty diagnosis or concealed conditions.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-maintenance',
      'facility-maintenance',
      'commercial-repairs',
      'commercial-handyman',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial property maintenance services',
    regulatedWorkNotes: [
      'Specialty systems, structural conditions, hazardous materials, fire-life-safety work, and permit-required alterations require appropriate review.',
    ],
    assumptions: [
      'Property management provides access authorization and communicates occupant restrictions.',
      'Repair priorities and recurring-service frequency are established with the customer after site review.',
    ],
    active: true,
  },
  {
    id: 'retail-maintenance',
    slug: 'retail-maintenance-las-vegas',
    route: '/services/retail-maintenance-las-vegas',
    title: 'Retail Maintenance',
    shortTitle: 'Retail Maintenance',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Retail Maintenance Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Retail maintenance in Las Vegas for customer-facing finishes, fixtures, doors, walls, flooring, ceiling tiles, and coordinated repair work.',
    canonicalUrl: `${siteUrl}/services/retail-maintenance-las-vegas`,
    heroHeading: 'Retail Maintenance Services in Las Vegas',
    heroDescription:
      'Customer-conscious repair and upkeep for stores, showrooms, service counters, and other active retail environments.',
    overview: [
      'Retail maintenance has to balance repair quality with customer access, brand presentation, and operating schedules. A worn door, damaged wall, stained ceiling tile, loose fixture, or flooring transition may be a small construction item, but it is highly visible in a customer-facing environment. JBTRADESMENLLC supports Las Vegas retail properties with planned maintenance and corrective work organized around store access, peak traffic, work-zone control, and the finish expectations supplied by the customer.',
      'Common scopes include doors and hardware, wall and paint repairs, store fixtures, shelving, flooring details, ceiling tiles, accessible plumbing fixtures, and punch-list completion. Existing finishes and replacement requirements are reviewed before materials are selected, especially where brand standards or matching products matter. When practical, disruptive work can be coordinated outside peak hours, and completed conditions can be photographed so store and facility teams have a clear service record.',
      'Retail environments may contain specialty lighting, fire-life-safety equipment, security systems, structural displays, regulated plumbing, or electrical connections that require separate expertise. Work near customers, employees, high shelving, or active merchandise also requires site-specific planning. JBTRADESMENLLC defines a safe general maintenance scope, communicates access limitations, and separates routine finish or fixture work from conditions that need manufacturer direction, specialty trades, or additional jurisdictional review.',
    ],
    includedServices: [
      'Customer-facing wall and paint repairs',
      'Door and hardware adjustments',
      'Store fixture and shelving support',
      'Flooring and transition repairs',
      'Ceiling tile replacement',
      'Accessible plumbing fixture repairs',
      'Minor carpentry and trim work',
      'Opening, closing, and turnover punch lists',
      'After-hours coordination where practical',
    ],
    commonConcerns: [
      'Visible finish damage in customer areas',
      'Doors or hardware receiving heavy daily use',
      'Loose fixtures, shelving, or wall-mounted accessories',
      'Stained ceiling tiles or damaged flooring transitions',
      'Repair work that must avoid peak shopping periods',
      'Replacement materials that must match brand standards',
    ],
    helpfulTips: [
      'Record brand finish standards and approved materials before repair.',
      'Photograph customer-facing damage under normal store lighting.',
      'Correct moisture sources before replacing stained finishes.',
      'Plan work zones and material movement around operating hours.',
      'Keep replacement ceiling tile, paint, and flooring information on file.',
    ],
    whenToCallProfessional: [
      'A repair creates a trip, access, or customer-safety concern.',
      'Finish damage is spreading or returning after prior work.',
      'Store operations or after-hours access must be coordinated.',
      'Fixtures or displays require secure mounting to an unknown substrate.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-handyman',
      'commercial-repairs',
      'ceiling-tile-replacement',
      'commercial-maintenance',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Retail maintenance services',
    regulatedWorkNotes: [
      'Specialty electrical, plumbing, security, fire-life-safety, structural, and permit-required work may need separate qualified providers.',
    ],
    assumptions: [
      'The customer supplies current brand standards and approves finish selections.',
      'Work-zone and access planning are coordinated with the site representative.',
    ],
    active: true,
  },
  {
    id: 'office-maintenance',
    slug: 'office-maintenance-las-vegas',
    route: '/services/office-maintenance-las-vegas',
    title: 'Office Maintenance',
    shortTitle: 'Office Maintenance',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Office Maintenance Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Office maintenance in Las Vegas for doors, walls, paint, ceilings, fixtures, mounted items, and coordinated workplace improvements.',
    canonicalUrl: `${siteUrl}/services/office-maintenance-las-vegas`,
    heroHeading: 'Office Maintenance Services in Las Vegas',
    heroDescription:
      'Workplace repairs and practical improvements planned to limit disruption in occupied and transitioning office environments.',
    overview: [
      'Office maintenance supports the everyday details that keep workplaces functional and presentable for employees, tenants, and visitors. In an occupied office, even routine wall, door, ceiling, or fixture work can affect meetings, circulation, noise, and access. JBTRADESMENLLC plans office repair scopes around these constraints, whether the need is a small punch list, recurring maintenance, a suite turnover, or coordinated finish improvements across several rooms.',
      'Typical work includes doors and hardware, drywall and paint, suspended ceiling tiles, accessible plumbing fixtures, furniture assembly, wall-mounted items, trim, flooring details, and selected tenant-improvement tasks. The existing condition, desired finish, mounting substrate, and room use are reviewed before work proceeds. Sequencing dusty or noisy tasks separately from finish work and confirming access to offices or shared areas can reduce disruption and help the customer understand what will be completed during each phase.',
      'Office buildings also contain regulated and specialty systems that are not part of general maintenance. Electrical connections, concealed plumbing, HVAC controls, fire-rated assemblies, fire-life-safety equipment, structural changes, and permit-related tenant improvements may need qualified specialty review. JBTRADESMENLLC can complete appropriate general repairs, document observed limitations, and coordinate its phase with property management or other vendors without claiming that routine maintenance verifies building-system or code performance.',
    ],
    includedServices: [
      'Door and hardware repairs',
      'Drywall patching and paint touch-ups',
      'Ceiling tile replacement',
      'Furniture and wall-mounted item installation',
      'Trim and minor carpentry',
      'Accessible plumbing fixture repairs',
      'Flooring detail and transition repairs',
      'Office turnover punch lists',
      'Selected finish improvements',
    ],
    commonConcerns: [
      'Repairs that may interrupt occupied work areas',
      'Wall damage after furniture or tenant changes',
      'Misaligned doors and worn hardware',
      'Ceiling stains or damaged acoustical tiles',
      'Fixtures and accessories requiring secure mounting',
      'Multiple rooms needing phased completion',
    ],
    helpfulTips: [
      'Identify noise-sensitive rooms and operating hours before scheduling.',
      'Save paint, ceiling tile, and hardware specifications for future matching.',
      'Correct active leaks before repairing ceilings or walls.',
      'Confirm wall construction before selecting mounting hardware.',
      'Group work by area to reduce repeated access interruptions.',
    ],
    whenToCallProfessional: [
      'A door, wall, ceiling, or fixture issue affects safe use of the workplace.',
      'Repairs need after-hours access or coordination with building management.',
      'Damage suggests moisture, movement, or a concealed utility condition.',
      'A tenant-improvement request may involve specialty systems or permitting.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-handyman',
      'commercial-maintenance',
      'ceiling-tile-replacement',
      'commercial-remodeling',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Office maintenance services',
    regulatedWorkNotes: [
      'Lighting fixture work is limited to permitted scope; regulated electrical, plumbing, HVAC, fire-life-safety, structural, and permit-required work needs appropriate review.',
    ],
    assumptions: [
      'Building and tenant access requirements are supplied before scheduling.',
      'Finish and fixture selections remain subject to compatibility and site conditions.',
    ],
    active: true,
  },
  {
    id: 'commercial-plumbing',
    slug: 'commercial-plumbing-las-vegas',
    route: '/services/commercial-plumbing-las-vegas',
    title: 'Commercial Plumbing',
    shortTitle: 'Commercial Plumbing',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Commercial Plumbing Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial plumbing repair support in Las Vegas for accessible fixtures, faucets, toilets, valves, visible leaks, filtration, and water heaters.',
    canonicalUrl: `${siteUrl}/services/commercial-plumbing-las-vegas`,
    heroHeading: 'Commercial Plumbing Repair Services in Las Vegas',
    heroDescription:
      'Assessment and repair support for accessible commercial plumbing fixtures and visible localized maintenance concerns.',
    overview: [
      'Commercial plumbing maintenance often begins with an accessible fixture that leaks, runs, drips, will not shut off correctly, or no longer supports normal use. Faucets, toilets, exposed shutoff valves, hose bibs, filtration components, and water-heater related items can affect customers, employees, sanitation, and daily operations. JBTRADESMENLLC reviews visible conditions, access, fixture type, connection points, and shutdown requirements before defining an appropriate repair or replacement scope.',
      'The service is focused on accessible maintenance and repair rather than every type of plumbing system work. A typical request may involve fixture replacement, a visible localized leak, a worn valve, a filtration concern, a drain component where appropriate, or planning for water-heater service. Model information, photographs, observed symptoms, and the location of available shutoffs help determine materials and whether a scheduled repair can proceed without broader diagnostic or building coordination.',
      'Commercial plumbing conditions can extend beyond the visible fixture. Licensing, permits, shutdown coordination, concealed piping, gas systems, major drain or sewer work, and jurisdictional requirements may require additional professional review. Active leaks, suspected contamination, significant water damage, or conditions affecting multiple fixtures should be addressed promptly and may need a specialty plumbing provider. JBTRADESMENLLC communicates these limits before work and does not represent accessible fixture service as a complete diagnosis of concealed building piping.',
    ],
    includedServices: [
      'Faucet repair or replacement',
      'Toilet component and fixture service',
      'Accessible shutoff valve review',
      'Visible localized leak assessment',
      'Water filtration component service',
      'Water-heater service planning',
      'Hose bib service',
      'Accessible fixture replacement',
      'Selected drain-component service where appropriate',
    ],
    commonConcerns: [
      'Dripping or continuously running fixtures',
      'Visible water around accessible connections',
      'A shutoff valve that is damaged or not operating normally',
      'Fixture wear affecting customer or employee use',
      'Water-heater or filtration concerns needing assessment',
      'Plumbing work requiring building shutdown coordination',
    ],
    helpfulTips: [
      'Record the fixture manufacturer and model when visible.',
      'Photograph the fixture, connections, and surrounding damage.',
      'Report active leaks promptly and protect the affected area from use.',
      'Confirm the building contact authorized to coordinate water shutdowns.',
      'Do not cover recurring water damage without identifying its source.',
    ],
    whenToCallProfessional: [
      'Water is actively leaking, spreading, or affecting electrical equipment or occupied areas.',
      'Several fixtures are affected or drainage problems are recurring.',
      'The work involves concealed piping, gas, sewer, major drains, or a required permit.',
      'A building shutdown or jurisdictional coordination is necessary.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-maintenance',
      'commercial-repairs',
      'facility-maintenance',
      'office-maintenance',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial plumbing repair services',
    regulatedWorkNotes: [
      'Licensing, permits, shutdown coordination, concealed piping, gas systems, major drain or sewer work, and jurisdictional requirements may require additional professional review.',
    ],
    assumptions: [
      'The final scope depends on accessible conditions, fixture compatibility, shutoff operation, and evidence of concealed damage.',
      'No step-by-step customer work on pressurized, gas, concealed, or energized systems is represented by this service information.',
    ],
    active: true,
  },
  {
    id: 'commercial-repairs',
    slug: 'commercial-repairs-las-vegas',
    route: '/services/commercial-repairs-las-vegas',
    title: 'Commercial Repairs',
    shortTitle: 'Commercial Repairs',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Commercial Repairs Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial repair services in Las Vegas for damage assessment, interior finishes, doors, ceilings, fixtures, flooring, and work-order completion.',
    canonicalUrl: `${siteUrl}/services/commercial-repairs-las-vegas`,
    heroHeading: 'Commercial Repair Services in Las Vegas',
    heroDescription:
      'Multi-trade corrective repairs organized around damage, priority, access, and commercial operating needs.',
    overview: [
      'Commercial repair work begins when normal wear, impact, failure, water exposure, or tenant activity leaves a property item damaged or unusable. The visible result may involve a wall, door, ceiling, fixture, floor, trim detail, or minor exterior finish, while the underlying cause may be less obvious. JBTRADESMENLLC starts by documenting the condition and separating immediate operational concerns from cosmetic restoration and planned follow-up work.',
      'A repair scope can combine several practical trades so customers do not have to treat every finish item as a separate project. Typical work includes drywall and paint, doors and hardware, ceiling tile replacement, accessible fixtures, flooring details, minor carpentry, and selected exterior repairs. Materials, matching requirements, occupant access, work-zone needs, and the sequence of correction are reviewed before completion. If damage came from moisture or another active source, that source should be addressed before finishes are closed or replaced.',
      'Corrective repair is different from diagnosing every concealed building condition. Widespread movement, continuing water entry, structural damage, hazardous materials, energized equipment, regulated plumbing or HVAC systems, and permit-related work require appropriate professional review. JBTRADESMENLLC can complete the defined general repair scope, identify visible limitations, and provide completion documentation while avoiding unsupported conclusions about concealed systems, engineering, or code compliance.',
    ],
    includedServices: [
      'Damage and repair-scope observations',
      'Drywall and paint repairs',
      'Door and hardware correction',
      'Ceiling tile replacement',
      'Flooring and transition repairs',
      'Accessible fixture replacement',
      'Minor carpentry and trim work',
      'Selected minor exterior repairs',
      'Work-order documentation',
    ],
    commonConcerns: [
      'Impact or wear damage in active commercial areas',
      'Water-damaged finishes after source correction',
      'Doors, ceilings, or fixtures that no longer function normally',
      'Mixed repair lists requiring prioritization',
      'Matching existing materials and finishes',
      'Corrective work needing occupied-site coordination',
    ],
    helpfulTips: [
      'Document the condition and surrounding area before materials are removed.',
      'Correct active moisture or movement before finish replacement.',
      'Preserve product labels and finish information for matching.',
      'Prioritize access, water, and operational concerns before cosmetic work.',
      'Confirm whether damage affects tenant or public circulation.',
    ],
    whenToCallProfessional: [
      'Damage is spreading, recurring, or interfering with normal operation.',
      'The cause is unclear or may be concealed behind a finish.',
      'Several repair categories need coordinated sequencing.',
      'The condition may involve structural, regulated, hazardous, or permit-related work.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-handyman',
      'commercial-maintenance',
      'commercial-remodeling',
      'ceiling-tile-replacement',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial repair services',
    regulatedWorkNotes: [
      'Structural, electrical, HVAC, major plumbing, hazardous-material, fire-life-safety, and permit-required conditions require appropriate specialty review.',
    ],
    assumptions: [
      'Repair recommendations are based on visible and accessible conditions at the time of review.',
      'Finish matching depends on product availability, age, lighting, and existing wear.',
    ],
    active: true,
  },
  {
    id: 'commercial-remodeling',
    slug: 'commercial-remodeling-las-vegas',
    route: '/services/commercial-remodeling-las-vegas',
    title: 'Commercial Remodeling',
    shortTitle: 'Commercial Remodeling',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Commercial Remodeling Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial remodeling in Las Vegas for office refreshes, retail improvements, flooring, drywall, paint, doors, fixtures, and phased finish work.',
    canonicalUrl: `${siteUrl}/services/commercial-remodeling-las-vegas`,
    heroHeading: 'Commercial Remodeling and Tenant Improvements in Las Vegas',
    heroDescription:
      'Planned interior improvements and finish updates for offices, retail spaces, break rooms, restrooms, and tenant areas.',
    overview: [
      'Commercial remodeling updates a space so it better supports current operations, presentation, occupancy, or tenant needs. Projects may range from a focused office refresh to coordinated finish improvements across retail, break-room, restroom, or shared areas. JBTRADESMENLLC helps Las Vegas customers define the visible scope, confirm existing conditions, organize materials, and phase work around property access rather than treating every improvement as an open-ended construction project.',
      'Typical work can include flooring, drywall, painting, doors, trim, fixtures, cabinetry or counters where appropriate, break-room updates, and restroom finish improvements. Early planning considers demolition limits, substrate conditions, material lead times, occupied areas, dust and noise, and the order in which related work should occur. A clear scope also distinguishes owner-selected finishes from items that require field verification, specialty installation, or coordination with building management and other providers.',
      'Commercial remodeling may be affected by permits, plans, engineering, specialty trades, accessibility requirements, fire-rated assemblies, and jurisdictional review. Existing buildings can also reveal concealed damage or utilities after work begins. JBTRADESMENLLC identifies assumptions and visible limitations during planning, completes the approved scope it is qualified to perform, and coordinates as needed without promising permit approval, code compliance, or a final schedule before applicable reviews and site conditions are understood.',
    ],
    includedServices: [
      'Office and suite refreshes',
      'Retail interior improvements',
      'Drywall and painting',
      'Flooring installation and finish details',
      'Door, trim, and hardware updates',
      'Fixture and accessory installation',
      'Break-room finish updates',
      'Restroom finish improvements',
      'Phased work and site coordination',
    ],
    commonConcerns: [
      'Outdated or damaged commercial finishes',
      'Tenant spaces needing reconfiguration or refresh work',
      'Occupied areas requiring phased construction',
      'Unknown substrate conditions beneath existing finishes',
      'Material selections with long lead times or matching requirements',
      'Scope items affected by specialty systems or jurisdictional review',
    ],
    helpfulTips: [
      'Define operational priorities and must-complete areas before selecting finishes.',
      'Confirm material availability and lead times before scheduling demolition.',
      'Document existing conditions and items intended to remain.',
      'Plan dust, noise, access, and temporary protection for occupied spaces.',
      'Allow for review when work may affect accessibility or regulated systems.',
    ],
    whenToCallProfessional: [
      'The improvement affects multiple rooms, trades, or operating phases.',
      'Existing damage or concealed conditions may change the finish scope.',
      'The project may involve plans, permits, accessibility, or specialty systems.',
      'Material selections and work sequencing need coordinated planning.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-repairs',
      'office-maintenance',
      'retail-maintenance',
      'commercial-property-maintenance',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial remodeling and tenant improvement services',
    regulatedWorkNotes: [
      'Permits, plans, engineering, specialty trades, accessibility requirements, and jurisdictional review may affect scope and scheduling.',
    ],
    assumptions: [
      'Final scope is subject to field conditions, approved selections, building rules, and required reviews.',
      'Concealed conditions discovered after authorized work begins may require separate evaluation.',
    ],
    active: true,
  },
  {
    id: 'ceiling-tile-replacement',
    slug: 'ceiling-tile-replacement-las-vegas',
    route: '/services/ceiling-tile-replacement-las-vegas',
    title: 'Ceiling Tile Replacement',
    shortTitle: 'Ceiling Tile Replacement',
    eyebrow: 'Commercial Services',
    category: 'Commercial',
    audience: 'commercial',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Ceiling Tile Replacement Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Commercial ceiling tile replacement in Las Vegas for damaged or stained suspended-ceiling tiles, matching, cutting, and grid observations.',
    canonicalUrl: `${siteUrl}/services/ceiling-tile-replacement-las-vegas`,
    heroHeading: 'Commercial Ceiling Tile Replacement in Las Vegas',
    heroDescription:
      'Careful replacement of damaged or stained tiles in existing suspended ceiling systems for offices, retail spaces, banks, and facilities.',
    overview: [
      'Suspended ceiling tiles provide an accessible finish below many commercial building systems, but they can become stained, broken, bowed, or damaged during maintenance and tenant activity. Replacement improves presentation only when the surrounding ceiling and the source of damage have been considered. JBTRADESMENLLC supports Las Vegas offices, retail spaces, banks, and facilities by documenting the existing tile, edge profile, dimensions, pattern, grid condition, access height, and nearby penetrations before ordering or cutting material.',
      'A typical scope may include removing damaged tiles, matching available replacement products, cutting around lights or diffusers where the approved scope permits, fitting perimeter pieces, and noting minor visible grid concerns. Ceiling products that appear similar can differ in thickness, texture, edge detail, fire-rating information, and manufacturer availability. Recording a product label or retaining an undamaged sample can reduce guesswork, although aging and production changes may still make an exact visual match unavailable.',
      'Stained tile should not be used to conceal an active roof, plumbing, HVAC, or condensation problem. High-access work, widespread grid damage, fire-rated ceiling systems, specialty fixtures, and suspect hazardous materials may require added review before disturbance. JBTRADESMENLLC limits work to observable and approved conditions, stops when the ceiling presents an unexpected safety or material concern, and does not claim that replacing a finish corrects concealed moisture or certifies the ceiling assembly.',
    ],
    includedServices: [
      'Damaged tile replacement',
      'Stained tile replacement after source correction',
      'Tile size, pattern, and edge-profile documentation',
      'Replacement-product matching',
      'Perimeter tile fitting',
      'Cutting around approved lights and diffusers',
      'Minor visible grid observations',
      'High-access planning and site protection',
    ],
    commonConcerns: [
      'Water-stained tiles with an unresolved source',
      'Broken, sagging, or missing panels',
      'Unknown manufacturer, pattern, or edge profile',
      'Visible grid damage or misalignment',
      'High ceilings or occupied work areas',
      'Fire-rated systems or suspect older materials',
    ],
    helpfulTips: [
      'Correct active roof, plumbing, HVAC, or condensation sources before replacing stained tiles.',
      'Record the tile manufacturer, pattern, dimensions, and edge profile before ordering.',
      'Inspect the surrounding grid condition.',
      'Do not disturb suspect hazardous materials.',
      'High or fire-rated ceiling systems may require added review.',
    ],
    whenToCallProfessional: [
      'Tiles are repeatedly staining, sagging, or falling out of position.',
      'The ceiling is high, difficult to access, or above occupied areas.',
      'Grid components, fixtures, or large ceiling areas appear damaged.',
      'The material is unknown or may be part of a rated assembly.',
    ],
    serviceAreaCopy,
    relatedServiceIds: [
      'commercial-repairs',
      'office-maintenance',
      'retail-maintenance',
      'facility-maintenance',
    ],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Commercial ceiling tile replacement services',
    regulatedWorkNotes: [
      'Do not disturb suspect hazardous materials; high-access, fire-rated, damaged-grid, and specialty-system conditions may require additional review.',
    ],
    assumptions: [
      'Active moisture sources are corrected before finish replacement.',
      'Exact matching depends on available manufacturer products and the age of the existing ceiling.',
    ],
    active: true,
  },
  {
    id: 'interior-painting',
    slug: 'interior-painting-las-vegas',
    route: '/services/interior-painting-las-vegas',
    title: 'Interior Painting',
    shortTitle: 'Interior Painting',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Interior Painting Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Interior painting in Las Vegas for walls, ceilings, trim, doors, preparation, patching, color changes, and occupied or vacant properties.',
    canonicalUrl: `${siteUrl}/services/interior-painting-las-vegas`,
    heroHeading: 'Interior Painting Services in Las Vegas',
    heroDescription:
      'Prepared, protected, and carefully finished interior painting for occupied homes, vacant properties, and residential turnovers.',
    overview: [
      'Interior painting depends on more than color. Surface condition, previous coatings, sheen, patching, lighting, room use, and protection of the surrounding home all affect the finished result. JBTRADESMENLLC works with Las Vegas homeowners and property managers on walls, ceilings, trim, doors, touch-ups, and color changes after the intended scope and existing finish have been reviewed.',
      'Preparation may include protecting floors and fixtures, filling minor defects, sanding approved areas, spot priming, and establishing clean finish boundaries. Paint should not conceal active moisture, widespread coating failure, contamination, or suspect hazardous materials. Older coatings and unusual substrates may require testing or specialty preparation before disturbance.',
    ],
    includedServices: [
      'Wall painting',
      'Ceiling painting',
      'Trim and baseboard painting',
      'Interior door painting',
      'Minor patching and surface preparation',
      'Primer application where appropriate',
      'Color and sheen changes',
      'Occupied and vacant property painting',
    ],
    commonConcerns: [
      'Scuffs, stains, fading, or uneven prior touch-ups',
      'Minor wall defects visible through the finish',
      'Peeling associated with moisture or adhesion failure',
      'Color and sheen matching under different lighting',
      'Furniture and flooring protection in occupied rooms',
      'Older or unknown coatings needing additional review',
    ],
    helpfulTips: [
      'Surface preparation strongly affects finish quality.',
      'Confirm sheen and color before work begins.',
      'Address active moisture or peeling causes.',
      'Protect flooring, fixtures, and furniture.',
      'Keep leftover labeled paint for future touch-ups.',
    ],
    whenToCallProfessional: [
      'Walls or ceilings need significant patching before painting.',
      'Peeling, staining, or moisture continues after prior coating work.',
      'High areas or occupied rooms require coordinated protection.',
      'Existing coatings or substrates are unknown.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['drywall-repair', 'home-repairs', 'flooring-installation', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential interior painting services',
    regulatedWorkNotes: [
      'Suspect hazardous coatings, active moisture, contamination, and unusual substrate failures may require testing or specialty review before disturbance.',
    ],
    assumptions: [
      'Colors, sheen, rooms, surfaces, and protection needs are approved before work begins.',
    ],
    active: true,
  },
  {
    id: 'flooring-installation',
    slug: 'flooring-installation-las-vegas',
    route: '/services/flooring-installation-las-vegas',
    title: 'Flooring Installation',
    shortTitle: 'Flooring Installation',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Flooring Installation Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Flooring installation in Las Vegas for LVP, laminate, removal, substrate observations, transitions, baseboards, and moisture planning.',
    canonicalUrl: `${siteUrl}/services/flooring-installation-las-vegas`,
    heroHeading: 'Flooring Installation Services in Las Vegas',
    heroDescription:
      'Careful planning and installation support for LVP, laminate, transitions, trim, and related residential flooring details.',
    overview: [
      'Flooring installation depends on the room, product, substrate, moisture conditions, transitions, and adjacent finishes working together. LVP and laminate products can have different acclimation, flatness, underlayment, expansion, and installation requirements. JBTRADESMENLLC reviews the selected product and visible site conditions before confirming removal, preparation, layout, trim, appliance, and transition work.',
      'New flooring should not be installed over an active moisture condition or known structural subfloor damage. Widespread movement, rot, slab moisture, suspect hazardous flooring or adhesive, and significant substrate correction may require separate testing or specialty review. Final material quantities depend on verified measurements, layout, pattern, and appropriate waste allowance.',
    ],
    includedServices: [
      'LVP installation',
      'Laminate installation',
      'Existing flooring removal where appropriate',
      'Accessible subfloor observations',
      'Transition installation',
      'Baseboard and quarter-round work',
      'Door-clearance and finish-detail planning',
      'Appliance-area coordination',
    ],
    commonConcerns: [
      'Uneven, damaged, or moisture-affected substrates',
      'Transitions between different floor heights',
      'Door and appliance clearance changes',
      'Insufficient material or omitted waste allowance',
      'Baseboard and perimeter finish decisions',
      'Unknown older flooring or adhesive materials',
    ],
    helpfulTips: [
      'Measure each room and include waste allowance.',
      'Confirm manufacturer acclimation and substrate requirements.',
      'Address active moisture before installation.',
      'Check transitions and door clearances.',
      'Structural subfloor damage requires separate review.',
    ],
    whenToCallProfessional: [
      'The subfloor is soft, uneven, moving, or moisture-damaged.',
      'Several rooms, transitions, doors, or appliances affect the layout.',
      'Older flooring or adhesive may need testing before removal.',
      'Product substrate requirements have not been verified.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['home-repairs', 'interior-painting', 'handyman', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential flooring installation services',
    regulatedWorkNotes: [
      'Structural subfloor damage, active moisture, and suspect hazardous flooring or adhesives require appropriate review before covering or disturbance.',
    ],
    assumptions: [
      'The selected flooring is suitable for the location and installed according to manufacturer requirements.',
    ],
    active: true,
  },
  {
    id: 'tv-mounting',
    slug: 'tv-mounting-las-vegas',
    route: '/services/tv-mounting-las-vegas',
    title: 'TV Mounting',
    shortTitle: 'TV Mounting',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'TV Mounting Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Professional TV mounting in Las Vegas with bracket compatibility, wall construction, stud location, viewing height, and soundbar planning.',
    canonicalUrl: `${siteUrl}/services/tv-mounting-las-vegas`,
    heroHeading: 'Professional TV Mounting in Las Vegas',
    heroDescription:
      'Secure display and soundbar mounting planned around equipment weight, bracket compatibility, wall construction, and viewing goals.',
    overview: [
      'Professional TV mounting begins with the display, bracket, wall, and intended viewing position. Equipment weight, mounting-hole pattern, bracket rating, stud location, wall material, furniture placement, and room use all influence a safe installation. JBTRADESMENLLC reviews these factors with Las Vegas homeowners before drilling so the selected mount and proposed location can be evaluated together.',
      'Not every wall type supports every display or mounting method. Masonry, metal framing, unknown backing, fireplaces, specialty finishes, very large equipment, and commercial displays may require different anchors or added assessment. Concealed electrical work or cable routing may require separate review, and work will not proceed when adequate support cannot be established.',
    ],
    includedServices: [
      'TV bracket compatibility review',
      'Stud and wall-condition observations',
      'Viewing-height planning',
      'Wall-mount installation',
      'TV placement and leveling',
      'Compatible soundbar mounting',
      'Surface cable-management options',
      'Commercial display-mounting assessment',
    ],
    commonConcerns: [
      'An incompatible or underrated mounting bracket',
      'Unknown wall construction or support location',
      'Mounting over fireplaces or specialty finishes',
      'Very large or heavy displays',
      'Cable routing that may involve concealed electrical work',
      'Viewing height conflicts with furniture or room layout',
    ],
    helpfulTips: [
      'Confirm the TV model, weight, and mounting pattern before selecting a bracket.',
      'Choose viewing height based on the primary seating position.',
      'Keep mount hardware and manufacturer instructions together.',
      'Discuss soundbar and cable-management goals before drilling.',
      'Do not assume every wall material supports the same mounting method.',
    ],
    whenToCallProfessional: [
      'The display is large, heavy, or mounted above occupied space.',
      'Wall construction, framing, backing, or concealed utilities are uncertain.',
      'A full-motion mount or specialty surface increases complexity.',
      'Cable routing may require electrical or low-voltage review.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['handyman', 'home-repairs', 'drywall-repair', 'interior-painting'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'TV mounting services',
    regulatedWorkNotes: [
      'Concealed electrical, in-wall cable, specialty structural support, and regulated low-voltage work may require separate review.',
    ],
    assumptions: [
      'The display, bracket, and accessories are compatible and within manufacturer ratings.',
    ],
    active: true,
  },
  {
    id: 'plumbing-repair',
    slug: 'plumbing-repair-las-vegas',
    route: '/services/plumbing-repair-las-vegas',
    title: 'Plumbing Repair',
    shortTitle: 'Plumbing Repair',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Plumbing Repair Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Residential plumbing repair support in Las Vegas for faucets, toilets, valves, hose bibs, visible leaks, filtration, and fixture replacement.',
    canonicalUrl: `${siteUrl}/services/plumbing-repair-las-vegas`,
    heroHeading: 'Residential Plumbing Repair Services in Las Vegas',
    heroDescription:
      'Assessment and repair support for accessible fixtures, valves, visible localized leaks, filtration, and related maintenance needs.',
    overview: [
      'Residential plumbing repair often starts with a visible and localized problem such as a dripping faucet, running toilet, worn shutoff valve, leaking hose bib, filtration concern, or fixture that no longer operates normally. JBTRADESMENLLC reviews the accessible fixture, connections, surrounding condition, and available shutoffs before confirming a suitable repair scope.',
      'Concealed piping, slab leaks, sewer or major drain work, gas systems, widespread pressure concerns, and permit-required plumbing can exceed an accessible repair scope. Active water near electrical equipment, uncontrolled leakage, sewage, or damage affecting several areas requires prompt qualified assistance. A localized repair is not represented as proof that concealed piping is free of defects.',
    ],
    includedServices: [
      'Faucet repair or replacement',
      'Toilet component and fixture service',
      'Accessible shutoff valve repairs',
      'Hose bib service',
      'Visible localized leak repairs',
      'Water filtration service',
      'Fixture replacement',
      'Garbage-disposal service',
    ],
    commonConcerns: [
      'Dripping, running, or loose fixtures',
      'Visible leaks around accessible connections',
      'Damaged or difficult-to-operate shutoff valves',
      'Recurring cabinet, wall, or floor moisture',
      'Filtration or fixture performance concerns',
      'Conditions that may involve concealed piping',
    ],
    helpfulTips: [
      'Know the location of the main water shutoff.',
      'Address active leaks quickly.',
      'Photograph visible pipe material and connections.',
      'Do not conceal recurring leaks without identifying the source.',
      'Concealed, slab, sewer, gas, major drain, or permit-required work needs additional review.',
    ],
    whenToCallProfessional: [
      'Water is actively leaking or spreading into finishes or electrical areas.',
      'Several fixtures are affected or a problem keeps returning.',
      'The source is concealed or connected to sewer, gas, or major drains.',
      'A shutoff is unavailable, damaged, or ineffective.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['water-heater-replacement', 'appliance-repair', 'property-maintenance', 'home-repairs'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential plumbing repair services',
    regulatedWorkNotes: [
      'Concealed piping, slab, sewer, gas, major drain, licensing, and permit-required work may require appropriately qualified specialty providers.',
    ],
    assumptions: [
      'Final scope is based on accessible connections, shutoff operation, fixture compatibility, and evidence of concealed damage.',
    ],
    active: true,
  },
  {
    id: 'appliance-repair',
    slug: 'appliance-repair-las-vegas',
    route: '/services/appliance-repair-las-vegas',
    title: 'Appliance Repair',
    shortTitle: 'Appliance Repair',
    eyebrow: 'Residential Services',
    category: 'Residential',
    audience: 'residential',
    locationFocus: 'Las Vegas Valley',
    metaTitle: 'Appliance Repair Las Vegas | JBTRADESMENLLC',
    metaDescription:
      'Appliance assessment and installation support in Las Vegas for filters, disposals, dishwashers, laundry equipment, and accessible connections.',
    canonicalUrl: `${siteUrl}/services/appliance-repair-las-vegas`,
    heroHeading: 'Appliance Repair and Installation Support in Las Vegas',
    heroDescription:
      'Practical appliance condition assessment, maintenance, and installation support within verified equipment and connection limits.',
    overview: [
      'Appliance service starts with accurately identifying the equipment and observed problem. Model and serial numbers, error codes, utility availability, connection type, access, and manufacturer information help determine whether a service request fits the available scope. JBTRADESMENLLC provides selected condition assessment, maintenance, and installation support without claiming factory authorization or universal coverage for every brand and internal system.',
      'An appliance showing smoke, sparking, gas odor, overheating, active leakage, or abnormal electrical behavior should be taken out of use without touching unsafe components, and the appropriate qualified or emergency provider should be contacted. Manufacturer-specific parts, sealed refrigeration, specialty gas connections, and electronic diagnostics may require another provider.',
    ],
    includedServices: [
      'Appliance condition assessment',
      'Water-filter replacement',
      'Garbage-disposal service',
      'Dishwasher installation support',
      'Washer and dryer installation support',
      'Accessible refrigerator water-line or filter observations',
      'Commercial water and ice-machine cleaning where offered',
      'Appliance access and connection observations',
    ],
    commonConcerns: [
      'Unknown model, serial number, or error information',
      'Appliances that do not fit the opening or available connections',
      'Visible leakage around hoses or accessible connections',
      'Manufacturer-specific parts or electronic diagnostics',
      'Sealed refrigeration or specialty gas-system concerns',
      'Smoke, sparking, overheating, or gas odor requiring urgent action',
    ],
    helpfulTips: [
      'Record the appliance model and serial number.',
      'Photograph error codes.',
      'Confirm whether utilities are functioning without touching unsafe components.',
      'Stop using an appliance showing smoke, sparking, gas odor, overheating, or active leakage.',
      'Manufacturer-specific parts and diagnostics may affect scheduling.',
    ],
    whenToCallProfessional: [
      'The appliance shows smoke, sparking, gas odor, overheating, or active leakage.',
      'The issue involves gas, energized components, refrigerant, or sealed systems.',
      'Installation requires utility changes beyond an accessible existing setup.',
      'Manufacturer-specific diagnostics, parts, or authorization are needed.',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['plumbing-repair', 'water-heater-replacement', 'handyman', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Appliance assessment and installation support services',
    regulatedWorkNotes: [
      'Gas, electrical, sealed refrigeration, refrigerant, manufacturer-authorized, and permit-required work may require an appropriate specialty provider.',
    ],
    assumptions: [
      'Service availability depends on appliance type, manufacturer requirements, utilities, access, symptoms, and parts.',
    ],
    active: true,
  },
];

const serviceContentPlans: Record<string, ServiceContentPlan> = {
  'commercial-maintenance': {
    commonApplications: [
      'Retail and office punch lists',
      'Property-management work orders',
      'Tenant and common-area repairs',
      'Preventative facility upkeep',
      'Plumbing, lighting, ceiling, flooring, and finish repairs',
      'Corporate and multi-location service requests',
    ],
    overviewClosing:
      'Our technicians review the work order, inspect visible conditions, confirm access and materials, complete the approved repairs, test normal operation where applicable, and provide useful completion documentation. Combining related tasks during planned visits helps limit downtime and gives property teams a clearer maintenance record.',
    workFocus: 'maintenance, repair, and inspection work',
    professionalInsights: [
      'Tracking recurring failures by asset, suite, or location helps distinguish an isolated repair from a pattern that deserves preventative attention.',
      'Water-stained finishes should be connected to the moisture source before replacement; otherwise, a clean finish can become another repeat work order.',
      'Before-and-after photos and concise completion notes give corporate and property-management teams a dependable record across multiple locations.',
    ],
    preparationDetails: [
      'Share the work order, priority level, suite or asset location, and completion-documentation requirements.',
      'Note parking, security, loading, after-hours, and tenant-access procedures.',
    ],
    specificFaqs: [
      {
        question: 'Can you help build a preventative maintenance list?',
        answer: 'Yes. We can document visible conditions, recurring repair needs, and practical maintenance priorities for the property team to review and schedule.',
      },
    ],
    capabilityAdditions: [
      'Minor electrical and lighting repairs',
      'HVAC diagnostics and minor maintenance',
      'Work-order completion photos and notes',
    ],
  },
  'commercial-handyman': {
    commonApplications: [
      'Multi-item commercial punch lists',
      'Door, lock, and hardware repairs',
      'Drywall, trim, and finish corrections',
      'Shelving, fixture, and display mounting',
      'Minor plumbing, electrical, and lighting repairs',
      'Turnover and closeout work orders',
    ],
    overviewClosing:
      'We organize the repair list by location and material, verify mounting and access conditions, and complete approved items in a practical sequence. This multi-trade approach is especially useful when a facility needs one accountable service visit for several everyday repairs instead of separate appointments for each item.',
    workFocus: 'multi-item punch-list and handyman repairs',
    professionalInsights: [
      'A grouped punch list is most efficient when each item includes a location, photo, dimensions, and any required replacement finish or hardware standard.',
      'Repeated door, hardware, or wall-mounting failures often point to worn components, inadequate backing, alignment problems, or heavy-use conditions that should be corrected with the repair.',
    ],
    preparationDetails: [
      'Provide a room-by-room or suite-by-suite punch list with photos.',
      'Share approved hardware, fixture, paint, shelving, or brand-standard information when available.',
    ],
    specificFaqs: [
      {
        question: 'Can minor plumbing and lighting items be included with the punch list?',
        answer: 'Yes. JBTRADESMENLLC handles many minor fixture, faucet, device, and lighting repairs within the approved project scope and applicable requirements.',
      },
    ],
    capabilityAdditions: [
      'Minor plumbing repairs',
      'Minor electrical and lighting repairs',
    ],
    projectScopeNotes: [
      'Project scope may vary based on access, existing conditions, equipment compatibility, and applicable permit or jurisdictional requirements.',
    ],
  },
  'facility-maintenance': {
    commonApplications: [
      'Planned preventative maintenance visits',
      'Facility condition inspections',
      'Work-order backlog reduction',
      'Asset and service-interval tracking',
      'Vendor access and repair coordination',
      'Multi-site maintenance support',
    ],
    overviewClosing:
      'JBTRADESMENLLC helps facility teams turn observations into organized action. We review priorities, coordinate access, complete approved maintenance and repairs, document results, and identify follow-up items. That process supports consistent operations and gives managers better information for planning work before a minor condition becomes an emergency request.',
    workFocus: 'planned facility maintenance and prioritized repairs',
    professionalInsights: [
      'Separating urgent failures, recurring issues, manufacturer service intervals, and planned finish work creates a maintenance list that is easier to budget and schedule.',
      'Repeat failures are easier to reduce when service records include the asset location, observed condition, prior repair, material used, and result after testing.',
    ],
    preparationDetails: [
      'Share asset lists, prior service records, recurring work orders, and current facility priorities.',
      'Identify shutdown, security, escort, and vendor-coordination requirements before scheduling.',
    ],
    specificFaqs: [
      {
        question: 'Can you support more than one facility?',
        answer: 'Yes. We support multi-site and corporate maintenance programs with location-specific work orders, coordinated access, and consistent completion documentation.',
      },
    ],
    capabilityAdditions: [
      'HVAC filter, thermostat, and airflow observations',
      'Minor electrical and lighting maintenance',
    ],
  },
  'commercial-property-maintenance': {
    commonApplications: [
      'Property-management work orders',
      'Common-area maintenance',
      'Tenant turnovers and vacant-space repairs',
      'Interior and exterior upkeep',
      'Recurring service programs',
      'Condition reports and completion photos',
    ],
    overviewClosing:
      'Our team coordinates with property managers, tenants, and site contacts to review each work order, document existing conditions, complete approved repairs, and provide completion photos. Grouping related turnover, common-area, and exterior items creates a more organized service plan and reduces repeated access to occupied properties.',
    workFocus: 'property-management, turnover, and common-area repairs',
    professionalInsights: [
      'Using consistent suite, unit, and common-area identifiers on every work order makes recurring conditions easier to track across a property.',
      'Turnover inspections are most useful when functional repairs, finish work, material needs, and owner decisions are separated into clear priorities before scheduling.',
    ],
    preparationDetails: [
      'Provide unit or suite numbers, occupancy status, access authorization, and desired completion documentation.',
      'Share turnover standards and identify owner-supplied finishes or fixtures.',
    ],
    specificFaqs: [
      {
        question: 'Do you provide completion photos for property-management work orders?',
        answer: 'Yes. Completion photos and concise notes can be included so property managers and owners have a clear record of the approved work.',
      },
    ],
  },
  'retail-maintenance': {
    commonApplications: [
      'Customer-facing wall and paint repairs',
      'Store fixture and shelving service',
      'Door and hardware maintenance',
      'Flooring transition and ceiling tile repairs',
      'Plumbing-fixture maintenance',
      'After-hours punch lists and store refreshes',
    ],
    overviewClosing:
      'We coordinate with store and facility contacts to understand brand standards, customer traffic, approved work hours, and protection requirements. Repairs are sequenced to control the work area, limit disruption, and leave the store clean, secure, and ready for normal use with completion documentation when requested.',
    workFocus: 'customer-facing retail maintenance and repairs',
    professionalInsights: [
      'Matching paint, ceiling tile, flooring, and hardware is faster and more reliable when brand specifications or attic-stock materials are identified before the visit.',
      'High-traffic doors, flooring transitions, fixtures, and wall corners often show recurring wear first; tracking those locations helps plan preventative attention.',
    ],
    preparationDetails: [
      'Share brand standards, approved materials, blackout dates, and store operating hours.',
      'Identify merchandise protection, loading access, security, and work-area requirements.',
    ],
    specificFaqs: [
      {
        question: 'Can work be coordinated outside peak retail hours?',
        answer: 'Yes. When site access allows, we coordinate scheduling with the store or facility contact to reduce disruption during customer-facing hours.',
      },
    ],
  },
  'office-maintenance': {
    commonApplications: [
      'Door and hardware repairs',
      'Drywall, paint, and ceiling-system work',
      'Lighting and plumbing-fixture replacement',
      'Wall mounting and furniture support',
      'Break-room repairs',
      'Office refreshes and tenant turnovers',
    ],
    overviewClosing:
      'JBTRADESMENLLC plans office work around occupied rooms, meetings, noise-sensitive areas, and building access. We document the condition, confirm the repair and finish plan, complete approved work, test normal function where applicable, clean the work area, and communicate any useful maintenance follow-up to the office or property contact.',
    workFocus: 'office repairs, fixture work, and finish improvements',
    professionalInsights: [
      'Door alignment, ceiling staining, wall cracks, and repeated fixture issues can reveal patterns that are easy to miss when every request is handled as an isolated cosmetic item.',
      'Grouping noisy preparation work separately from finish, fixture, and cleanup tasks helps reduce disruption in occupied offices.',
    ],
    preparationDetails: [
      'Identify occupied rooms, quiet hours, building access, and any confidential or restricted areas.',
      'Provide paint, ceiling tile, hardware, lighting, or fixture information when matching is important.',
    ],
    specificFaqs: [
      {
        question: 'Can you complete lighting, plumbing-fixture, and wall repairs during one visit?',
        answer: 'Yes. Multi-item office work orders can combine many minor lighting, fixture, drywall, hardware, and mounting repairs into one coordinated visit.',
      },
    ],
    capabilityAdditions: ['Minor electrical and lighting repairs'],
    projectScopeNotes: [
      'Tenant-improvement scope may vary based on building requirements, existing conditions, and applicable permit or jurisdictional requirements.',
    ],
  },
  'commercial-plumbing': {
    commonApplications: [
      'Faucet and toilet repairs',
      'Shutoff-valve replacement',
      'Visible localized leak diagnosis',
      'Water filtration and hose-bib service',
      'Water-heater maintenance',
      'Commercial ice and water equipment maintenance',
    ],
    overviewClosing:
      'Our technicians review the reported symptom, inspect accessible fixtures and connections, plan any required shutdown with the site contact, confirm parts, complete the approved repair, restore service, and test normal operation. Photos and completion notes help facility teams understand what was corrected and what should be monitored.',
    workFocus: 'commercial fixture, valve, leak, and water-equipment repairs',
    professionalInsights: [
      'Recurring fixture leaks are often connected to worn shutoff valves, corrosion, pressure conditions, or repeated repairs to aging components; evaluating nearby connections helps prevent repeat calls.',
      'A planned shutdown is more effective when the affected branch, occupied areas, replacement parts, and authorized building contact are confirmed before work begins.',
    ],
    preparationDetails: [
      'Share fixture photos, model information, the exact leak location, and whether the condition is constant or intermittent.',
      'Identify the building contact authorized to coordinate water access or shutdowns.',
    ],
    specificFaqs: [
      {
        question: 'Do you test the fixture after the repair?',
        answer: 'Yes. After restoring service, we test normal fixture operation and inspect accessible connections for leakage within the completed scope.',
      },
    ],
    capabilityAdditions: ['Commercial ice and water equipment maintenance'],
    projectScopeNotes: [
      'Project scope may vary based on access, shutdown requirements, concealed piping, permits, and jurisdictional requirements.',
    ],
  },
  'commercial-repairs': {
    commonApplications: [
      'Corrective work-order response',
      'Door, wall, and ceiling repairs',
      'Flooring and fixture damage',
      'Minor exterior repairs',
      'Water-damaged finish restoration',
      'Repair documentation and completion photos',
    ],
    overviewClosing:
      'We evaluate the visible damage, identify the likely cause, confirm materials and access, and sequence the approved repair so underlying corrections come before finish restoration. After completion, the work area is cleaned and the result can be documented for the owner, manager, tenant, or corporate account.',
    workFocus: 'multi-trade corrective repairs and finish restoration',
    professionalInsights: [
      'The shape, location, and recurrence of damage often indicate whether a repair is simple wear, impact, movement, or a moisture-related condition.',
      'Preserving product labels, paint information, ceiling samples, and flooring specifications can significantly improve finish matching on future repairs.',
    ],
    preparationDetails: [
      'Share photos showing both the damaged item and the surrounding area.',
      'Provide prior repair history, finish information, and the operational impact of the condition.',
    ],
    specificFaqs: [
      {
        question: 'Can several types of damage be repaired during the same visit?',
        answer: 'Yes. We routinely organize multi-trade commercial repair lists involving walls, doors, ceilings, flooring, hardware, and fixtures.',
      },
    ],
  },
  'commercial-remodeling': {
    commonApplications: [
      'Tenant improvements',
      'Office and suite refreshes',
      'Retail finish improvements',
      'Drywall, paint, flooring, and door updates',
      'Break-room and restroom finish improvements',
      'Phased occupied-space remodeling',
    ],
    overviewClosing:
      'JBTRADESMENLLC develops the project around the approved finish scope, existing conditions, material selections, access, and business operations. We coordinate phases, protect occupied areas, complete approved demolition and installation work, manage finish details, and keep the customer informed when field conditions affect the next practical step.',
    workFocus: 'commercial remodeling and tenant-improvement phases',
    professionalInsights: [
      'Material lead times, demolition limits, substrate condition, dust control, and occupied-area access often influence the schedule as much as the finish installation itself.',
      'Confirming who approves selections and field changes before work begins keeps phased office and retail improvements moving without unnecessary delays.',
    ],
    preparationDetails: [
      'Share the desired layout or finish changes, operating priorities, building rules, and target phasing.',
      'Identify selected flooring, paint, doors, fixtures, cabinetry, counters, and other owner decisions.',
    ],
    specificFaqs: [
      {
        question: 'Can remodeling be phased around business operations?',
        answer: 'Yes. We can organize approved work into practical phases based on access, material availability, occupied areas, and operational priorities.',
      },
    ],
    projectScopeNotes: [
      'Plans, permits, accessibility requirements, specialty trades, material lead times, and jurisdictional review may affect final scope and scheduling.',
    ],
  },
  'ceiling-tile-replacement': {
    commonApplications: [
      'Stained or damaged acoustical tiles',
      'Tile identification and pattern matching',
      'Perimeter and fixture cutouts',
      'Minor grid observations',
      'High-access ceiling work',
      'Occupied office, retail, bank, and facility coordination',
    ],
    overviewClosing:
      'Our technicians identify the tile size, face pattern, thickness, edge profile, and available manufacturer markings; inspect the surrounding grid and stain source; plan safe access; cut and fit approved replacement tiles; and clean the area. The result is a more accurate match and a better record for future maintenance.',
    workFocus: 'ceiling tile identification, fitting, and replacement',
    professionalInsights: [
      'Ceiling stains often provide the first visible sign of a roof leak, plumbing leak, or HVAC condensation issue. Documenting the source and grid condition helps prevent repeat damage.',
      'Tiles with the same dimensions may still differ in pattern, thickness, edge profile, acoustic properties, and manufacturer availability, so an intact sample or product label is valuable.',
    ],
    preparationDetails: [
      'Share photos of the tile face, edge, back markings, surrounding grid, and any stain pattern.',
      'Identify ceiling height, occupied-area restrictions, attic stock, and prior leak or HVAC history.',
    ],
    specificFaqs: [
      {
        question: 'Can you match an existing ceiling tile?',
        answer: 'We document the size, pattern, thickness, edge profile, and manufacturer markings to locate the closest available match. Exact availability depends on the existing product and current supply.',
      },
      {
        question: 'Can tiles be cut around lights and diffusers?',
        answer: 'Yes. Approved replacement tiles can be measured and cut around existing fixtures and diffusers as part of the replacement scope.',
      },
    ],
    projectScopeNotes: [
      'High-access, rated ceiling, specialty fixture, or suspect material conditions may affect the final service approach.',
    ],
  },
  handyman: {
    commonApplications: [
      'Room-by-room home repair lists',
      'Door, trim, drywall, and hardware repairs',
      'Shelving, TV, and accessory mounting',
      'Caulking and finish maintenance',
      'Minor plumbing and lighting repairs',
      'Move-in, turnover, and routine maintenance punch lists',
    ],
    overviewClosing:
      'Our technicians review the repair list, inspect each accessible condition, confirm materials and mounting requirements, and organize the approved work in a practical sequence. After repairs are completed, we check normal function, clean the work areas, and review any maintenance recommendations that will help the homeowner plan the next step.',
    workFocus: 'handyman repairs, mounting, and maintenance items',
    professionalInsights: [
      'A door that repeatedly drags, loose shelving, or recurring wall damage often has an alignment, backing, hardware, or heavy-use cause that should be corrected with the visible repair.',
      'Grouping related tasks by room and material helps complete more of a household repair list efficiently while keeping the work organized.',
    ],
    preparationDetails: [
      'Share a room-by-room list with photos, dimensions, and priority items.',
      'Provide replacement fixtures, hardware, paint, shelving, or mounting equipment information when available.',
    ],
    specificFaqs: [
      {
        question: 'Can minor plumbing and lighting repairs be included?',
        answer: 'Yes. JBTRADESMENLLC handles many minor faucet, fixture, device, and lighting repairs within the approved project scope and applicable requirements.',
      },
    ],
    capabilityAdditions: ['Minor plumbing repairs', 'Minor electrical and lighting repairs'],
    projectScopeNotes: [
      'Project scope may vary based on access, wall construction, existing conditions, product compatibility, and applicable requirements.',
    ],
  },
  'home-repairs': {
    commonApplications: [
      'Everyday wear-and-tear repairs',
      'Door, window, and trim correction',
      'Wall and ceiling damage',
      'Flooring and transition repairs',
      'Fixture and hardware replacement',
      'Move-in, sale, and rental-turnover punch lists',
    ],
    overviewClosing:
      'JBTRADESMENLLC evaluates the damaged item and surrounding area, identifies the likely cause, confirms the material and finish plan, completes the approved repair, and checks normal use. Coordinating adjacent work—such as trim, wall, paint, and flooring details—helps create a complete result instead of leaving disconnected finish items behind.',
    workFocus: 'home repairs and coordinated finish restoration',
    professionalInsights: [
      'Crack pattern, door movement, staining, and repeated finish damage can provide useful clues about whether the condition is normal wear, impact, moisture, or movement.',
      'Keeping paint colors, flooring labels, trim profiles, and hardware information makes future matching and turnover repairs more accurate.',
    ],
    preparationDetails: [
      'Share photos of the damaged item and the surrounding wall, floor, door, or window.',
      'Note when the condition appeared, any previous repair, and available finish information.',
    ],
    specificFaqs: [
      {
        question: 'Can several home repairs be grouped into one project?',
        answer: 'Yes. We can review a combined repair list and organize compatible wall, door, trim, flooring, fixture, and finish items into an efficient scope.',
      },
    ],
  },
  'property-maintenance': {
    commonApplications: [
      'Rental-property turnovers',
      'Seasonal home checks',
      'Door, window, and exterior caulking maintenance',
      'Filter, plumbing-fixture, and water-heater observations',
      'Interior finish and hardware repairs',
      'Maintenance records and recurring service lists',
    ],
    overviewClosing:
      'Our technicians review the property’s maintenance history and current priorities, inspect visible and accessible conditions, complete approved upkeep and repairs, and document follow-up items. A consistent record of filters, fixtures, sealants, water concerns, finish repairs, and equipment models helps owners and managers plan preventative work with fewer surprises.',
    workFocus: 'seasonal, turnover, and preventative property maintenance',
    professionalInsights: [
      'Recurring stains, failed caulking, changing door alignment, and repeated fixture issues are easier to manage when dates, locations, and prior repairs are documented.',
      'Manufacturer guidance and actual property conditions are more useful than applying one maintenance interval to every filter, fixture, or appliance.',
    ],
    preparationDetails: [
      'Share maintenance history, equipment models, turnover standards, and current priority items.',
      'Identify recurring leaks, stains, seasonal changes, or areas that have received previous repairs.',
    ],
    specificFaqs: [
      {
        question: 'Can you help organize a recurring maintenance list?',
        answer: 'Yes. We can document visible conditions and completed work so owners and property managers can build a practical recurring maintenance schedule.',
      },
    ],
    capabilityAdditions: [
      'Minor plumbing and lighting maintenance',
      'HVAC filter, thermostat, and airflow observations',
    ],
  },
  'water-heater-replacement': {
    commonApplications: [
      'Failed or leaking tank water heaters',
      'No-hot-water complaints',
      'Capacity or location changes',
      'Expansion-tank and drain-pan replacement',
      'Shutoff-valve and connection upgrades',
      'Access, removal, drainage, and replacement planning',
    ],
    overviewClosing:
      'We document the existing unit, fuel type, capacity, access path, pan, drainage, expansion control, shutoff, and visible connections before confirming the replacement approach. During approved service, the team coordinates removal and installation, checks accessible connections, restores the system, tests normal operation, cleans the area, and reviews the new equipment information with the customer.',
    workFocus: 'water-heater removal, replacement, connection, and testing',
    professionalInsights: [
      'Tank capacity, fuel type, access, drainage, expansion control, and connection condition all influence replacement planning and equipment selection.',
      'Photographing the rating label, full installation area, pan, piping, venting, and access path before the visit helps reduce unexpected material and handling changes.',
    ],
    preparationDetails: [
      'Share photos of the full installation, model and rating labels, connections, pan, and access path.',
      'Note whether the issue is leakage, no hot water, temperature change, sound, or planned replacement.',
    ],
    specificFaqs: [
      {
        question: 'Does tank size affect installation?',
        answer: 'Yes. Capacity and physical dimensions affect equipment selection, available clearances, connections, access, handling, and the replacement plan.',
      },
      {
        question: 'Can access affect the replacement scope?',
        answer: 'Yes. Stairs, narrow doors, closets, platforms, finished floors, and limited drainage access can change removal and installation planning.',
      },
    ],
    projectScopeNotes: [
      'Final scope may vary based on fuel type, connections, access, equipment compatibility, permits, and jurisdictional requirements.',
    ],
  },
  'drywall-repair': {
    commonApplications: [
      'Impact holes and anchor damage',
      'Cracks and seam repairs',
      'Wall and ceiling patches',
      'Access-opening closure',
      'Water-damaged drywall after source correction',
      'Texture, primer, and paint restoration',
    ],
    overviewClosing:
      'Our technicians evaluate the damage type, patch size, wall or ceiling location, moisture history, texture, and surrounding paint. We protect the work area, remove loose material, build the approved repair, blend texture, prime and paint as scoped, control dust, and leave the area clean. The finish plan is discussed before work begins so expectations are clear.',
    workFocus: 'drywall patching, texture blending, and finish restoration',
    professionalInsights: [
      'Crack shape and location matter. Straight seams, corner cracks, impact damage, fastener movement, and moisture deterioration each call for a different repair and finish plan.',
      'Texture matching is influenced by pattern, application method, lighting, paint sheen, and the age of the surrounding finish—not only the patch itself.',
    ],
    preparationDetails: [
      'Share photos in normal room lighting and note whether the damage has changed over time.',
      'Provide matching paint information and describe any prior moisture source or repair.',
    ],
    specificFaqs: [
      {
        question: 'Can you match the existing wall or ceiling texture?',
        answer: 'We evaluate the existing pattern and use the most practical blending method for the approved repair. Lighting and finish age can affect how closely any local repair matches.',
      },
    ],
    projectScopeNotes: [
      'Moisture sources and any suspect material conditions should be addressed before drywall is closed or disturbed.',
    ],
  },
  'interior-painting': {
    commonApplications: [
      'Wall and ceiling repainting',
      'Trim, baseboard, and door painting',
      'Color and sheen changes',
      'Patch and touch-up coordination',
      'Occupied-home protection',
      'Vacant property and turnover painting',
    ],
    overviewClosing:
      'JBTRADESMENLLC reviews the rooms, surfaces, existing finish, patching needs, colors, sheen, and protection plan before work begins. We prepare approved surfaces, protect floors and fixtures, complete the specified coats and finish details, maintain an orderly work area, and clean up after completion. Labeled product information is retained when available for future touch-ups.',
    workFocus: 'surface preparation and interior painting',
    professionalInsights: [
      'Surface preparation has a direct effect on the finish. Patches, adhesion problems, stains, gloss, and damaged caulking should be addressed before the final coats.',
      'The same color can appear different across walls, ceilings, natural light, and artificial light, so confirming both color and sheen is important.',
    ],
    preparationDetails: [
      'Share room photos, desired colors and sheen, and any known existing paint information.',
      'Identify furniture, wall-mounted items, occupied-room needs, and areas requiring special protection.',
    ],
    specificFaqs: [
      {
        question: 'Do you handle patching before painting?',
        answer: 'Yes. Minor patching and surface preparation can be included so the approved walls or ceilings are ready for the planned finish.',
      },
    ],
    projectScopeNotes: [
      'Existing coating condition, moisture, unusual substrates, and material compatibility may affect the preparation plan.',
    ],
  },
  'flooring-installation': {
    commonApplications: [
      'LVP and laminate installation',
      'Existing flooring removal',
      'Room measurement and material planning',
      'Subfloor observations',
      'Transitions and door clearances',
      'Baseboard, quarter-round, and appliance-area details',
    ],
    overviewClosing:
      'Our technicians verify the product, room measurements, layout, substrate observations, moisture considerations, transitions, door clearances, appliances, and trim plan. We complete approved removal and preparation, install according to product requirements, finish transitions and perimeter details, clean the area, and review care information supplied for the selected flooring.',
    workFocus: 'flooring removal, preparation, installation, and finish details',
    professionalInsights: [
      'Subfloor condition, room transitions, appliance clearance, moisture, and baseboard details often have as much impact on the finished installation as the flooring product itself.',
      'Product number, lot information, acclimation instructions, expansion requirements, underlayment, and matching trim should be confirmed before installation day.',
    ],
    preparationDetails: [
      'Provide the exact flooring product, manufacturer instructions, room measurements, and matching trim information.',
      'Identify furniture, appliances, door-clearance concerns, transitions, and any known moisture history.',
    ],
    specificFaqs: [
      {
        question: 'Do you inspect the subfloor during the project?',
        answer: 'We inspect visible and accessible substrate conditions during the approved scope and discuss practical preparation or repair needs before covering the area.',
      },
    ],
    projectScopeNotes: [
      'Final scope may vary based on product requirements, substrate condition, moisture, removal materials, transitions, and structural repairs.',
    ],
  },
  'tv-mounting': {
    commonApplications: [
      'Fixed and full-motion TV mounting',
      'Viewing-height and alignment planning',
      'Bracket compatibility review',
      'Stud and wall-construction evaluation',
      'Soundbar and accessory mounting',
      'Residential and commercial display installation',
    ],
    overviewClosing:
      'We confirm the display model and weight, bracket rating, mounting pattern, wall construction, support location, viewing height, and accessory plan before installation. The team mounts and aligns the approved equipment, checks bracket movement and final stability, cleans the work area, and reviews the completed position with the customer.',
    workFocus: 'display, bracket, and soundbar mounting',
    professionalInsights: [
      'Display weight, bracket leverage, stud location, wall material, and existing backing determine the mounting approach more than screen size alone.',
      'Planning viewing height, furniture placement, soundbar position, and cable appearance together produces a cleaner alignment than treating each item separately.',
    ],
    preparationDetails: [
      'Share the TV and bracket model numbers, display weight, wall photo, and preferred viewing position.',
      'Identify soundbars, accessories, furniture, prior mounts, and desired cable appearance.',
    ],
    specificFaqs: [
      {
        question: 'How do you determine the mounting height?',
        answer: 'We consider the primary seating position, screen size, furniture, room use, bracket type, and customer preference before confirming the final height.',
      },
    ],
    projectScopeNotes: [
      'Mounting approach depends on verified wall construction, available support, equipment compatibility, and any concealed cable or electrical scope.',
    ],
  },
  'plumbing-repair': {
    commonApplications: [
      'Faucet and toilet repairs',
      'Shutoff-valve and hose-bib replacement',
      'Visible localized leak diagnosis',
      'Water filtration service',
      'Fixture and garbage-disposal replacement',
      'Water-heater connection maintenance',
    ],
    overviewClosing:
      'Our technicians discuss the symptom, inspect accessible fixtures and connections, identify the likely source, confirm parts and shutoff access, complete the approved repair, restore service, and test normal operation. We also review the surrounding cabinet, wall, or floor for visible moisture concerns and explain useful maintenance observations before leaving.',
    workFocus: 'residential fixture, valve, leak, and connection repairs',
    professionalInsights: [
      'A recurring faucet, toilet, or connection leak may involve worn components, corrosion, movement, pressure conditions, or a shutoff valve that should be addressed with the visible repair.',
      'Knowing the location and condition of the main and local shutoffs supports faster diagnosis and more predictable fixture service.',
    ],
    preparationDetails: [
      'Share photos of the fixture, visible connections, surrounding moisture, and any model information.',
      'Note when the issue occurs, prior repairs, and the location of available water shutoffs.',
    ],
    specificFaqs: [
      {
        question: 'Will you test the repair before completing service?',
        answer: 'Yes. After restoring water service, we test normal operation and inspect accessible completed connections for leakage.',
      },
    ],
    projectScopeNotes: [
      'Scope may vary when the source involves concealed piping, slab conditions, sewer or major drain work, gas systems, permits, or jurisdictional requirements.',
    ],
  },
  'appliance-repair': {
    commonApplications: [
      'Appliance diagnostics and condition assessment',
      'Model, serial number, and error-code review',
      'Water-filter and garbage-disposal service',
      'Dishwasher installation support',
      'Washer and dryer installation support',
      'Refrigerator water-line, filter, and commercial ice-machine maintenance',
    ],
    overviewClosing:
      'We review the reported symptom, model and serial information, error codes, access, utilities, and visible connections before confirming the service approach. For approved work, the technician completes accessible diagnostics, maintenance, connection, filter, disposal, or installation support; checks normal operation where applicable; cleans the area; and explains parts or follow-up needs.',
    workFocus: 'appliance diagnostics, maintenance, and installation support',
    professionalInsights: [
      'Model and serial numbers, error-code timing, utility condition, and a clear description of when the symptom occurs can narrow the diagnostic path before parts are ordered.',
      'Appliance performance concerns are sometimes connected to access, filters, drains, water connections, venting, or installation conditions rather than an internal component alone.',
    ],
    preparationDetails: [
      'Share the model and serial numbers, photos, error codes, and a description of when the problem occurs.',
      'Clear reasonable access and identify recent installation, outage, filter, utility, or connection changes.',
    ],
    specificFaqs: [
      {
        question: 'Do you service every appliance brand and sealed refrigeration system?',
        answer: 'Service depends on the appliance, symptoms, access, parts, and manufacturer requirements. We confirm whether the request fits our diagnostic, maintenance, or installation-support capabilities before scheduling the final scope.',
      },
    ],
    projectScopeNotes: [
      'Factory-authorized, gas, electrical, sealed refrigeration, refrigerant, and manufacturer-specific work may affect the appropriate service approach.',
    ],
  },
}

const commercialProcess = (workFocus: string) => [
  'Review the work order, site requirements, priorities, and requested documentation.',
  'Coordinate access and inspect visible conditions with the site contact.',
  'Confirm the approved scope, materials, equipment, and work-area plan.',
  `Complete the approved ${workFocus}.`,
  'Test normal operation or review the completed finish where applicable.',
  'Clean the work area and provide completion notes or photos as requested.',
]

const residentialProcess = (workFocus: string) => [
  'Discuss the issue, project goals, prior repairs, and available product information.',
  'Inspect visible and accessible conditions at the work area.',
  'Confirm the approved repair option, materials, and preparation needs.',
  `Complete the approved ${workFocus}.`,
  'Test normal operation or review the completed finish where applicable.',
  'Clean the work area and explain useful maintenance recommendations.',
]

const commercialPreparation = [
  'Share photos of the affected area and note whether the condition is constant, intermittent, or recurring.',
  'Provide the location, site contact, work-order number, and priority.',
  'Identify access, parking, security, loading, tenant, or after-hours requirements.',
  'Provide model numbers, finish standards, or prior repair information when applicable.',
]

const residentialPreparation = [
  'Share photos of the affected area and note whether the condition is constant, intermittent, or recurring.',
  'Provide model, serial, paint, flooring, tile, fixture, or hardware information when applicable.',
  'Clear reasonable access to the work area without dismantling equipment or systems.',
  'Identify previous repairs, recent changes, and the result you want to achieve.',
]

function buildFaqs(record: LegacyServiceRecord, plan: ServiceContentPlan): ServiceFAQ[] {
  const shared = record.audience === 'commercial'
    ? [
        {
          question: 'Can you handle multiple repairs during one visit?',
          answer: 'Yes. We can review a multi-item work order, group compatible tasks, and confirm the most practical sequence for the approved visit.',
        },
        {
          question: 'Do you work with property managers and corporate accounts?',
          answer: 'Yes. JBTRADESMENLLC supports property managers, facility teams, commercial accounts, and multi-location work orders with coordinated access and documentation.',
        },
        {
          question: 'Can service be coordinated around business operations?',
          answer: 'Yes. We review operating hours, tenant activity, access, noise, work-area control, and site requirements when planning the service approach.',
        },
      ]
    : [
        {
          question: 'What information helps before scheduling?',
          answer: 'Photos, the exact location, model or material information, prior repair history, and a clear description of the desired result help us prepare.',
        },
        {
          question: `Can more than one ${record.shortTitle.toLowerCase()} item be reviewed?`,
          answer: 'Yes. Share the complete list so we can group compatible items and confirm the practical scope, materials, and visit plan.',
        },
        {
          question: 'What happens after the work is approved?',
          answer: 'We confirm the repair approach, complete the approved work, test normal function or review the finish, clean the area, and discuss useful follow-up recommendations.',
        },
      ]

  return [...shared, ...plan.specificFaqs].slice(0, 5)
}

function confidentCapabilities(record: LegacyServiceRecord, plan: ServiceContentPlan) {
  const existing = record.includedServices.map((item) =>
    item
      .replace(/^Accessible /, '')
      .replace(/^Selected /, '')
      .replace(/ where appropriate$/, ''),
  )

  return [...new Set([...existing, ...(plan.capabilityAdditions ?? [])])].slice(0, 12)
}

function buildOverview(record: LegacyServiceRecord, plan: ServiceContentPlan) {
  const process = record.audience === 'commercial'
    ? 'Commercial service begins with the work order, operating priorities, and site requirements. Our technicians inspect visible conditions, identify the likely cause, confirm access and material needs, complete the approved work, test normal operation where applicable, and document additional concerns. The goal is a practical repair that supports reliability, presentation, and daily property operation—not simply a temporary cosmetic response.'
    : 'Residential service begins with a clear discussion of the issue, the desired result, and any prior repairs. Our technicians inspect visible and accessible conditions, identify the likely cause, confirm materials and repair options, complete the approved work, test normal operation where applicable, and review useful maintenance recommendations. This organized approach helps homeowners understand what was addressed and how the completed repair supports everyday use of the property.'

  return [record.overview[0], process, plan.overviewClosing]
}

export const serviceHubServices: ServiceHubService[] = serviceHubRecords.map((record) => {
  const plan = serviceContentPlans[record.id]
  if (!plan) throw new Error(`Missing service content plan for ${record.id}`)

  const {
    includedServices: _includedServices,
    commonConcerns: _commonConcerns,
    helpfulTips: _helpfulTips,
    whenToCallProfessional: _whenToCallProfessional,
    regulatedWorkNotes: _regulatedWorkNotes,
    assumptions: _assumptions,
    ...service
  } = record
  void [
    _includedServices,
    _commonConcerns,
    _helpfulTips,
    _whenToCallProfessional,
    _regulatedWorkNotes,
    _assumptions,
  ]

  return {
    ...service,
    overview: buildOverview(record, plan),
    whatWeDo: confidentCapabilities(record, plan),
    commonApplications: plan.commonApplications,
    whatToExpect: record.audience === 'commercial'
      ? commercialProcess(plan.workFocus)
      : residentialProcess(plan.workFocus),
    professionalInsights: plan.professionalInsights,
    preparationTips: [
      ...(record.audience === 'commercial' ? commercialPreparation : residentialPreparation),
      ...plan.preparationDetails,
    ],
    faqs: buildFaqs(record, plan),
    projectScopeNotes: plan.projectScopeNotes ?? [],
  }
})
