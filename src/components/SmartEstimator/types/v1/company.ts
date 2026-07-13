import { COMPANY_STANDARDS } from '../../company/companyStandards'

export type PropertyContext = 'residential' | 'commercial'
export type ServiceTiming = 'standard' | 'emergency' | 'afterHours'
export type LaborRateKey = keyof typeof COMPANY_STANDARDS.laborRates
export type SupportedServiceState = (typeof COMPANY_STANDARDS.serviceAreas)[number]

export interface CrewConfiguration {
  defaultSize: number
  minimumSize: number
  maximumRecommendedSize: number
  secondTechnicianRequired: boolean
  secondTechnicianReason: string | null
}
