export type ProjectType='Residential'|'Commercial'|'Property Management'
export type Category='Maintenance'|'Repair'|'Remodel'|'Property Assessment'|'Emergency Service'
export type Photo={file:File;url:string}
import type { ServiceAnswers } from '../dynamicQuestions/dynamicQuestionTypes'
export type Data={projectType?:ProjectType;category?:Category;service?:string;serviceAnswers:ServiceAnswers;description:string;condition:string;quantity:string;dimensions:string;outcome:string;materials:boolean;matching:boolean;accessNotes:string;propertyType:string;city:string;state:string;zip:string;occupancy:string;location:string;floor:string;access:string;urgency:string;timing:string;photos:Photo[];firstName:string;lastName:string;email:string;phone:string;contact:string;company:string;consent:boolean}
export type PricingContext = 'Residential' | 'Commercial' | 'Residential Emergency / After Hours' | 'Commercial Emergency / After Hours' | 'Residential assumption — review recommended'
export type EstimateStatus = 'estimate' | 'manualReview' | 'safetyOverride'
export type EstimateResultHeading = 'Preliminary Project Estimate' | 'Broad Preliminary Planning Range' | 'Preliminary Diagnostic / Initial Service Range' | 'Emergency Diagnostic / Initial Service Range'
export type EstimateResultType = 'supported' | 'broadFallback' | 'diagnostic' | 'emergency'
export type EstimateNumericRange = {minimum:number;typical:number;maximum:number}
export type Estimate={
  laborHours:string
  labor:string
  materials:string
  total:string
  duration:string
  confidence:'Preliminary'|'Moderate'|'Strong'
  considerations:string[]
  resultHeading?:EstimateResultHeading
  resultType?:EstimateResultType
  resultLabel?:string
  rangeBasisNote?:string
  status?:EstimateStatus
  serviceName?:string
  resolvedServiceName?:string
  selectedServiceName?:string
  serviceProfileId?:string
  applicableLaborRate?:number
  tripChargeTotal?:string
  tripChargePerVisit?:number
  expectedSiteVisits?:string
  equipmentCostRange?:string
  schedulingWindow?:string
  serviceTiming?:'Standard'|'Emergency / After Hours'
  onsiteLaborDescription?:string
  calendarDuration?:string
  curingTime?:string
  materialLeadTime?:string
  manualReviewRequired?:boolean
  manualReviewReasons?:string[]
  safetyOverride?:{guidance:string;reasons:string[]}
  pricingContext?:PricingContext
  fallbackUsed?:boolean
  broadFallbackUsed?:boolean
  resolvedByDescription?:boolean
  engineVersion?:string
  assumptions?:string[]
  recommendations?:string[]
  missingInformation?:string[]
  confidenceImprovingFactors?:string[]
  confidenceReducingFactors?:string[]
  scopeSteps?:string[]
  exclusions?:string[]
  customerSuppliedMaterials?:boolean
  manualReviewRecommended?:boolean
  disclaimer?:string
  projectDetails?:{
    summary:string
    selectedService:string
    propertyContext:string
    location:string
    photoCount:number
    contact:{name:string;email:string;phone:string;preferredMethod:string}
  }
  calculationRanges?:{
    laborHours:EstimateNumericRange
    laborCost:EstimateNumericRange
    tripCharges:EstimateNumericRange
    materials:EstimateNumericRange
    equipment:EstimateNumericRange
    total:EstimateNumericRange
    visits:EstimateNumericRange
  }
  laborHoursRange?:EstimateNumericRange
  laborCostRange?:EstimateNumericRange
  expectedVisitRange?:EstimateNumericRange
  tripChargeRange?:EstimateNumericRange
  materialCostRange?:EstimateNumericRange
  equipmentRange?:EstimateNumericRange
  totalRange?:EstimateNumericRange
}
