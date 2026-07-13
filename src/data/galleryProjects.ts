import type { GalleryImage, GalleryProject } from '../types/gallery'

type ProjectContent = Omit<GalleryProject, 'slug' | 'coverImage' | 'images'> & {
  imageLabels?: GalleryImage['label'][]
}

function createProject(project: ProjectContent): GalleryProject {
  const folder = `/images/gallery/${project.id}`
  const labels = project.imageLabels ?? ['Completed', 'Before', 'During', 'During', 'After', 'After', 'Completed']
  const descriptions = labels.map((label, index) => ({
    src: index === 0 ? `${folder}/cover.svg` : `${folder}/image-${String(index).padStart(2, '0')}.svg`,
    alt: `${label} view of ${project.title.toLowerCase()} in ${project.location}`,
    label,
  }))
  const { imageLabels: _imageLabels, ...content } = project
  void _imageLabels
  return { ...content, slug: project.id, coverImage: descriptions[0], images: descriptions }
}

export const galleryProjects: GalleryProject[] = [
  createProject({
    id: 'first-interstate-bank', title: 'First Interstate Bank Facility Improvements', shortTitle: 'Bank Facility Improvements', category: 'Commercial',
    filterCategories: ['Commercial', 'Property Maintenance', 'Facility Improvements', 'Repairs'], location: 'Cheyenne, Wyoming', propertyType: 'Banking Facility', clientDisplayName: 'First Interstate Bank',
    summary: 'Multi-floor facility improvements involving ceiling tile replacement, wall repairs, painting, television relocation, mounting, and detailed jobsite documentation.',
    overview: 'JBTRADESMENLLC completed coordinated improvements throughout multiple floors of an occupied banking facility. The work required careful planning, protection of finished areas, communication with facility management, and completion around normal business operations.',
    services: ['Commercial Property Maintenance', 'Ceiling Tile Replacement', 'Drywall Repair', 'Interior Painting', 'Television Mounting and Relocation', 'Cord Concealment', 'Jobsite Photo Documentation', 'Final Client Sign-Off'],
    projectDetails: ['Work coordinated across multiple occupied floors', 'Damaged ceiling tiles identified and replaced', 'Wall openings repaired and finished', 'Television mounts relocated and leveled', 'Existing finishes protected during work', 'Before-and-after photography completed', 'Final walkthrough performed with facility contact'],
    outcome: 'The facility received coordinated repairs and improvements with minimal disruption to daily operations and a documented final walkthrough.', featured: true,
  }),
  createProject({
    id: 'walgreens-water-heater', title: 'Commercial Water Heater Assessment and Replacement', shortTitle: 'Hot Water Heater Service', category: 'Commercial',
    filterCategories: ['Commercial', 'Property Maintenance', 'Repairs', 'Facility Improvements'], location: 'Cheyenne, Wyoming', propertyType: 'Retail Facility', clientDisplayName: 'Walgreens',
    summary: 'Assessment and replacement planning for a failed commercial water heater located in a difficult elevated utility space.',
    overview: 'JBTRADESMENLLC evaluated a non-operational water heater serving a retail facility. The assessment identified thermostat damage, corrosion, leakage at the tank seam, and difficult access conditions requiring careful removal and replacement planning.',
    services: ['Water Heater Assessment', 'Commercial Plumbing', 'Equipment Diagnostics', 'Leak Evaluation', 'Replacement Planning', 'Access and Safety Planning', 'Photo Documentation'],
    projectDetails: ['Water heater located in an elevated utility closet', 'Failed and corroded components documented', 'Tank seam leakage identified', 'Temporary diagnostic work completed', 'Replacement scope developed', 'Access requirements evaluated', 'Facility recommendations documented'],
    outcome: 'The facility received a clear documented assessment identifying the failure, access considerations, and recommended replacement path.', featured: false,
  }),
  createProject({
    id: 'home-depot-plumbing', title: 'High-Access Commercial Plumbing Repairs', shortTitle: 'Commercial Plumbing Repairs', category: 'Commercial',
    filterCategories: ['Commercial', 'Property Maintenance', 'Repairs', 'Facility Improvements'], location: 'Cheyenne, Wyoming', propertyType: 'Retail Garden Center', clientDisplayName: 'Home Depot',
    summary: 'Commercial plumbing repair planning involving damaged copper drops, PEX water lines, multiple shutoff valves, and elevated work areas.',
    overview: 'JBTRADESMENLLC assessed and planned repairs for multiple damaged water-line sections throughout an outdoor commercial garden center. Several repairs required elevated access and replacement of aging copper and brittle PEX components.',
    services: ['Commercial Plumbing', 'PEX Repairs', 'Copper-to-PEX Conversion', 'Shutoff Valve Replacement', 'Elevated Access Work', 'Leak Isolation', 'Repair Planning'],
    projectDetails: ['Multiple separate line failures identified', 'Copper drops evaluated for full replacement', 'PEX main-line damage documented', 'Repairs required work at elevated heights', 'Shutoff valves and fittings included in scope', 'Aging and brittle piping conditions documented', 'Repair and replacement options compared'],
    outcome: 'The client received a structured repair plan addressing immediate leaks, aging materials, elevated access, and long-term reliability.', featured: false,
  }),
  createProject({
    id: 'pines-condominiums', title: 'Condominium Exterior Maintenance Program', shortTitle: 'HOA Exterior Maintenance', category: 'Property Maintenance',
    filterCategories: ['Commercial', 'Property Maintenance', 'Facility Improvements', 'Repairs'], location: 'Cheyenne, Wyoming', propertyType: 'Condominium Community', clientDisplayName: 'Pines Condominiums HOA',
    summary: 'Coordinated community maintenance involving siding repairs, painting, irrigation work, deck improvements, and resident sign-off documentation.',
    overview: 'JBTRADESMENLLC supported a multi-building condominium community with a phased exterior maintenance program. The work required resident coordination, building-by-building scheduling, project documentation, and careful management of multiple scopes.',
    services: ['HOA Property Maintenance', 'Siding Repair', 'Exterior Painting', 'Irrigation Repair', 'Deck Repair', 'Resident Coordination', 'Completion Sign-Off Documentation'],
    projectDetails: ['Work planned across multiple buildings', 'Exterior repairs sequenced by building', 'Siding and paint scopes coordinated', 'Irrigation work completed as a separate phase', 'Deck work tracked by unit', 'Resident and property-management communication maintained', 'Completion sign-offs organized by location'],
    outcome: 'The community received a coordinated maintenance program with phased scheduling, documented completion, and improved exterior conditions.', featured: false,
  }),
  createProject({
    id: 'commercial-stair-repair', title: 'Metal Stair Reinforcement & Welding', shortTitle: 'Metal Stair Reinforcement', category: 'Facility Improvements',
    filterCategories: ['Commercial', 'Repairs', 'Facility Improvements'], location: 'Henderson, Colorado', propertyType: 'Commercial Property',
    summary: 'Structural repair and reinforcement of metal stair systems, including toe-kick replacement, exposed-step reinforcement, baluster repair, and railing welding.',
    overview: 'JBTRADESMENLLC completed repair planning and metalwork for two commercial stair systems with damaged and weakened components. The project required cutting, fitting, welding, reinforcement, and restoration of stair and railing elements.',
    services: ['Commercial Metal Repair', 'Welding', 'Stair Reinforcement', 'Railing Repair', 'Baluster Replacement', 'Steel Fabrication', 'Safety Improvement'],
    projectDetails: ['Two stair systems evaluated', 'Damaged steel toe kicks identified', 'Exposed steps reinforced', 'Balusters cut and replaced', 'Railing connections re-welded', 'Structural steel components fabricated', 'Repair scope separated into materials and labor'],
    outcome: 'The stair systems received targeted reinforcement and component repairs intended to improve stability, durability, and safe use.', featured: false,
  }),
  createProject({
    id: 'residential-flooring', title: 'Residential Luxury Vinyl Plank Installation', shortTitle: 'LVP Flooring Installation', category: 'Residential',
    filterCategories: ['Residential', 'Facility Improvements', 'Repairs'], location: 'Cheyenne, Wyoming', propertyType: 'Residential Property',
    summary: 'Luxury vinyl plank flooring replacement involving removal preparation, appliance movement, baseboard work, flooring installation, and final cleanup.',
    overview: 'JBTRADESMENLLC completed residential flooring improvements using durable luxury vinyl plank flooring. The work included room preparation, careful appliance handling, flooring layout, trim coordination, and restoration of the finished space.',
    services: ['LVP Flooring Installation', 'Flooring Removal', 'Appliance Moving and Reset', 'Baseboard Removal and Installation', 'Quarter-Round Removal', 'Room Preparation', 'Final Cleanup'],
    projectDetails: ['Existing floor conditions evaluated', 'Appliances moved and reset', 'Flooring layout planned to reduce waste', 'Baseboards coordinated with installation', 'Transitions and edges completed', 'Work area cleaned after installation', 'Finished flooring inspected for alignment and fit'],
    outcome: 'The property received a durable, updated flooring surface with coordinated trim work and a clean finished appearance.', featured: false,
  }),
  createProject({
    id: 'drywall-paint-repair', title: 'Interior Drywall and Paint Restoration', shortTitle: 'Drywall and Paint Repair', category: 'Repairs',
    filterCategories: ['Residential', 'Commercial', 'Property Maintenance', 'Repairs'], location: 'Colorado, Wyoming, and Nevada', propertyType: 'Residential and Commercial Properties',
    summary: 'Interior wall restoration involving drywall patching, surface preparation, texture matching, priming, painting, and finish blending.',
    overview: 'JBTRADESMENLLC performs coordinated drywall and paint repairs for occupied residential and commercial properties. Work is planned around the existing wall finish, texture, access, furniture, and color-matching requirements.',
    services: ['Drywall Repair', 'Surface Preparation', 'Texture Matching', 'Primer Application', 'Interior Painting', 'Color Matching', 'Site Protection and Cleanup'],
    projectDetails: ['Damaged areas inspected before repair', 'Loose material removed', 'Repairs reinforced where required', 'Joint compound applied and finished', 'Texture matched where practical', 'Repaired surfaces primed', 'Finish paint blended with surrounding areas'],
    outcome: 'Damaged interior surfaces were restored with attention to texture, paint matching, protection of surrounding finishes, and professional cleanup.', featured: false,
  }),
  createProject({
    id: 'copper-to-pex-conversion', title: 'Copper-to-PEX Plumbing Conversion', shortTitle: 'PEX Plumbing Conversion', category: 'Repairs',
    filterCategories: ['Residential', 'Commercial', 'Property Maintenance', 'Repairs', 'Facility Improvements'], location: 'Colorado and Wyoming', propertyType: 'Residential and Commercial Properties',
    summary: 'Replacement of damaged or aging copper water-line sections with PEX piping, updated shutoff components, secured supports, and restored hose-bib connections.',
    overview: 'JBTRADESMENLLC completed plumbing improvements involving conversion from aging copper sections to PEX. The work focused on reliable connections, proper shutoff placement, supported piping, leak testing, and improved serviceability.',
    services: ['Copper-to-PEX Conversion', 'PEX Installation', 'Shutoff Valve Replacement', 'Hose Bib Replacement', 'Pipe Support Installation', 'Leak Testing', 'Plumbing Repair'],
    projectDetails: ['Existing copper condition evaluated', 'Damaged sections removed', 'PEX replacement routes planned', 'Shutoff valves installed or replaced', 'Pipe supports added', 'Hose-bib connections restored', 'Completed repairs tested for leaks'],
    outcome: 'The plumbing system received updated piping and service components designed to improve reliability, maintenance access, and resistance to future damage.', featured: false,
  }),
  createProject({
    id: 'kitchen-bathroom-remodeling', title: 'Kitchen & Bathroom Remodeling', shortTitle: 'Remodeling', category: 'Residential',
    filterCategories: ['Residential', 'Facility Improvements'], location: 'Colorado • Wyoming • Nevada', propertyType: 'Residential Property',
    summary: 'Complete kitchen and bathroom remodeling including demolition, framing, drywall, flooring, cabinetry, countertops, tile, plumbing fixtures, lighting, painting, and finish carpentry.',
    overview: 'JBTRADESMENLLC provides complete kitchen and bathroom remodeling with coordinated work from demolition through final finishes.',
    services: ['Kitchen Remodeling', 'Bathroom Remodeling', 'Cabinet Installation', 'Countertops', 'Tile Installation', 'Flooring', 'Plumbing Fixtures', 'Lighting', 'Painting', 'Finish Carpentry'],
    projectDetails: ['Demolition and preparation', 'Framing and drywall', 'Flooring and tile installation', 'Cabinet and countertop installation', 'Plumbing fixture and lighting installation', 'Painting and finish carpentry'],
    outcome: 'The remodeled spaces received coordinated structural, surface, fixture, and finish improvements.', featured: false,
  }),
  createProject({
    id: 'residential-hvac-service', title: 'Residential HVAC Service', shortTitle: 'HVAC', category: 'Residential',
    filterCategories: ['Residential', 'Repairs', 'Property Maintenance'], location: 'Colorado • Wyoming • Nevada', propertyType: 'Residential Property',
    summary: 'Residential HVAC diagnostics, preventative maintenance, thermostat replacement, minor repairs, filter replacement, airflow improvements, and seasonal servicing.',
    overview: 'JBTRADESMENLLC provides residential HVAC diagnostics, maintenance, minor repairs, and seasonal servicing to support reliable system operation.',
    services: ['HVAC Diagnostics', 'Preventative Maintenance', 'Thermostat Replacement', 'Filter Replacement', 'Minor Repairs', 'Airflow Inspection'],
    projectDetails: ['System diagnostics', 'Preventative maintenance', 'Thermostat and filter replacement', 'Minor repairs', 'Airflow inspection', 'Seasonal servicing'],
    outcome: 'The HVAC system received diagnostic, maintenance, and service work focused on reliable seasonal performance.', featured: false,
  }),
  createProject({
    id: 'residential-plumbing-repairs', title: 'Residential Plumbing Repairs', shortTitle: 'Residential Plumbing', category: 'Residential',
    filterCategories: ['Residential', 'Repairs', 'Property Maintenance'], location: 'Colorado • Wyoming • Nevada', propertyType: 'Residential Property',
    summary: 'Residential plumbing repairs including fixture replacement, shutoff valves, hose bibs, leak repairs, water filtration systems, garbage disposals, and water heater service.',
    overview: 'JBTRADESMENLLC provides residential plumbing repairs and fixture service for common household plumbing needs.',
    services: ['Fixture Replacement', 'Valve Repairs', 'Leak Repairs', 'Hose Bibs', 'Water Filtration', 'Garbage Disposal', 'Water Heater Repairs'],
    projectDetails: ['Fixture replacement', 'Valve and leak repairs', 'Hose bib service', 'Water filtration installation', 'Garbage disposal service', 'Water heater repairs'],
    outcome: 'The residential plumbing system received targeted repairs and fixture improvements to restore reliable operation.', featured: false,
  }),
  createProject({
    id: 'minor-residential-repairs', title: 'Minor Residential Repairs', shortTitle: 'Minor Repairs', category: 'Residential',
    filterCategories: ['Residential', 'Repairs', 'Property Maintenance'], location: 'Colorado • Wyoming • Nevada', propertyType: 'Residential Property',
    summary: 'Professional completion of common residential repairs including drywall patches, trim repair, door adjustments, hardware replacement, caulking, painting touch-ups, fixture replacement, and general maintenance.',
    overview: 'JBTRADESMENLLC completes common residential repairs and maintenance tasks with coordinated preparation, repair, and cleanup.',
    services: ['Drywall Repair', 'Trim Repair', 'Door Repair', 'Hardware Replacement', 'Painting Touch-ups', 'Caulking', 'Fixture Replacement', 'General Maintenance'],
    projectDetails: ['Drywall and trim repair', 'Door adjustments', 'Hardware replacement', 'Caulking and paint touch-ups', 'Fixture replacement', 'General maintenance'],
    outcome: 'The property received coordinated minor repairs and maintenance with attention to function and finished appearance.', featured: false,
  }),
]
