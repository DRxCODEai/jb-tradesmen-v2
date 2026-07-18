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
  capabilitySeed: string[]
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
      'General home punch lists',
      'Door and trim repairs',
      'Drywall patches',
      'Hardware replacement',
      'Caulking and sealant maintenance',
      'Shelving and accessory installation',
      'Fixture replacement where appropriate',
      'TV and wall-mounted item installation',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['home-repairs', 'property-maintenance', 'drywall-repair', 'tv-mounting'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential handyman services',
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
    ],
    capabilitySeed: [
      'Interior wall and finish repairs',
      'Selected exterior finish repairs',
      'Door and window adjustments',
      'Trim and minor carpentry',
      'Fixture and hardware replacement',
      'Flooring detail repairs',
      'Drywall and paint correction',
      'Move-in and turnover punch lists',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['handyman', 'drywall-repair', 'interior-painting', 'flooring-installation'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential home repair services',
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
    ],
    capabilitySeed: [
      'Seasonal property observations',
      'Rental turnover maintenance',
      'Exterior caulking observations and replacement',
      'Door and window maintenance',
      'Visible water-system observations',
      'HVAC filter and access observations',
      'Interior finish and hardware repairs',
      'General preventative upkeep',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['home-repairs', 'handyman', 'plumbing-repair', 'water-heater-replacement'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential property maintenance services',
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
    ],
    capabilitySeed: [
      'Existing tank and location assessment',
      'Fuel type and capacity documentation',
      'Access-path and removal planning',
      'Drain pan and drainage observations',
      'Expansion tank observations',
      'Shutoff valve and accessible connection review',
      'Replacement-equipment compatibility planning',
      'Removal and replacement scope development',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['plumbing-repair', 'property-maintenance', 'home-repairs', 'appliance-repair'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Water heater replacement services',
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
    ],
    capabilitySeed: [
      'Small and moderate hole repair',
      'Crack and impact-damage repair',
      'Selected ceiling drywall repair',
      'Access-opening closure after approved work',
      'Texture assessment and blending',
      'Primer application',
      'Paint touch-up or coordinated repainting',
      'Water-damage repair after source correction',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['interior-painting', 'home-repairs', 'handyman', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential drywall repair services',
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
    ],
    capabilitySeed: [
      'Commercial punch-list completion',
      'Door and cabinet hardware adjustments',
      'Drywall patches and wall repairs',
      'Shelving and accessory installation',
      'Minor carpentry and trim repairs',
      'Caulking and finish corrections',
      'Fixture and hardware replacement',
      'Wall-mounted item installation',
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
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
    ],
    capabilitySeed: [
      'Damaged tile replacement',
      'Stained tile replacement after source correction',
      'Tile size, pattern, and edge-profile documentation',
      'Replacement-product matching',
      'Perimeter tile fitting',
      'Cutting around approved lights and diffusers',
      'Minor visible grid observations',
      'High-access planning and site protection',
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
    ],
    capabilitySeed: [
      'Wall painting',
      'Ceiling painting',
      'Trim and baseboard painting',
      'Interior door painting',
      'Minor patching and surface preparation',
      'Primer application where appropriate',
      'Color and sheen changes',
      'Occupied and vacant property painting',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['drywall-repair', 'home-repairs', 'flooring-installation', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential interior painting services',
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
    ],
    capabilitySeed: [
      'LVP installation',
      'Laminate installation',
      'Existing flooring removal where appropriate',
      'Accessible subfloor observations',
      'Transition installation',
      'Baseboard and quarter-round work',
      'Door-clearance and finish-detail planning',
      'Appliance-area coordination',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['home-repairs', 'interior-painting', 'handyman', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential flooring installation services',
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
    ],
    capabilitySeed: [
      'TV bracket compatibility review',
      'Stud and wall-condition observations',
      'Viewing-height planning',
      'Wall-mount installation',
      'TV placement and leveling',
      'Compatible soundbar mounting',
      'Surface cable-management options',
      'Commercial display-mounting assessment',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['handyman', 'home-repairs', 'drywall-repair', 'interior-painting'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'TV mounting services',
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
    ],
    capabilitySeed: [
      'Faucet repair or replacement',
      'Toilet component and fixture service',
      'Accessible shutoff valve repairs',
      'Hose bib service',
      'Visible localized leak repairs',
      'Water filtration service',
      'Fixture replacement',
      'Garbage-disposal service',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['water-heater-replacement', 'appliance-repair', 'property-maintenance', 'home-repairs'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Residential plumbing repair services',
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
    ],
    capabilitySeed: [
      'Appliance condition assessment',
      'Water-filter replacement',
      'Garbage-disposal service',
      'Dishwasher installation support',
      'Washer and dryer installation support',
      'Accessible refrigerator water-line or filter observations',
      'Commercial water and ice-machine cleaning where offered',
      'Appliance access and connection observations',
    ],
    serviceAreaCopy,
    relatedServiceIds: ['plumbing-repair', 'water-heater-replacement', 'handyman', 'property-maintenance'],
    primaryCTA,
    secondaryCTA,
    schemaServiceType: 'Appliance assessment and installation support services',
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
      'Property assessment support',
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
    capabilityAdditions: ['Welding and minor metal repair'],
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
  const existing = record.capabilitySeed.map((item) =>
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
  const applicationContext = `${record.category} customers commonly schedule ${record.shortTitle.toLowerCase()} for ${plan.commonApplications.slice(0, 3).join(', ').toLowerCase()}. Reviewing those related needs together helps our team prepare the right materials, coordinate the work area, and recommend a practical service sequence based on the property’s priorities.`

  return [record.overview[0], process, applicationContext, plan.overviewClosing]
}

export const serviceHubServices: ServiceHubService[] = serviceHubRecords.map((record) => {
  const plan = serviceContentPlans[record.id]
  if (!plan) throw new Error(`Missing service content plan for ${record.id}`)

  const {
    capabilitySeed: _capabilitySeed,
    ...service
  } = record
  void _capabilitySeed

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
