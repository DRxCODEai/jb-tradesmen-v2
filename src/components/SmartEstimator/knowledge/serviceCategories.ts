import type { ServiceCategoryDefinition } from '../types/v1/service'

export const SERVICE_CATEGORIES = [
  { id: 'interior-repairs', name: 'Interior Repairs', description: 'Interior finish, fixture, and general repair services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['General Repair', 'Carpentry', 'Drywall'], displayOrder: 1 },
  { id: 'painting', name: 'Painting', description: 'Interior and exterior preparation and painting services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Painting'], displayOrder: 2 },
  { id: 'flooring', name: 'Flooring', description: 'Flooring repair, removal, preparation, and installation services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Flooring'], displayOrder: 3 },
  { id: 'tile', name: 'Tile', description: 'Tile, grout, caulk, and related surface services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Tile'], displayOrder: 4 },
  { id: 'plumbing', name: 'Plumbing', description: 'Fixture, piping, valve, leak, and water-system services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Plumbing'], displayOrder: 5 },
  { id: 'electrical', name: 'Electrical', description: 'Electrical fixture, device, and troubleshooting services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Electrical'], displayOrder: 6 },
  { id: 'hvac', name: 'HVAC', description: 'Heating, cooling, thermostat, diagnostic, and maintenance services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['HVAC'], displayOrder: 7 },
  { id: 'appliances', name: 'Appliances', description: 'Appliance installation, connection, and minor service work.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Appliance Service'], displayOrder: 8 },
  { id: 'exterior-repairs', name: 'Exterior Repairs', description: 'Exterior envelope, trim, opening, and finish repairs.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['General Repair', 'Carpentry', 'Painting'], displayOrder: 9 },
  { id: 'property-maintenance', name: 'Property Maintenance', description: 'Routine and preventative property maintenance services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Property Maintenance'], displayOrder: 10 },
  { id: 'commercial-maintenance', name: 'Commercial Maintenance', description: 'Maintenance and repair coordination for commercial facilities.', supportedPropertyContexts: ['commercial'], commonTrades: ['Commercial Maintenance', 'Facility Services'], displayOrder: 11 },
  { id: 'remodeling', name: 'Remodeling', description: 'Coordinated improvement and remodeling services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Remodeling', 'Carpentry'], displayOrder: 12 },
  { id: 'property-assessments', name: 'Property Assessments', description: 'Property condition review and documentation services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Property Assessment'], displayOrder: 13 },
  { id: 'emergency-repairs', name: 'Emergency Repairs', description: 'Urgent repair assessment and stabilization services.', supportedPropertyContexts: ['residential', 'commercial'], commonTrades: ['Emergency Repair'], displayOrder: 14 },
] as const satisfies readonly ServiceCategoryDefinition[]
