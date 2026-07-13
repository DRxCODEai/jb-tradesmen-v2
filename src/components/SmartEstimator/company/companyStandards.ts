export const COMPANY_STANDARDS = {
  version: "1.0.0",

  currency: "USD",

  laborRates: {
    residential: 50,
    commercial: 75,
    residentialEmergency: 100,
    commercialEmergency: 150,
  },

  billing: {
    minimumLaborHours: 1,
    tripChargePerVisit: 50,
    defaultCrewSize: 1,
    applyTripChargePerVisit: true,
    roundCurrencyToNearest: 5,
  },

  travel: {
    includedRadiusMiles: 25,
    outsideStandardRadiusRequiresManualReview: true,
    additionalMileageRate: null,
  },

  serviceAreas: [
    "Colorado",
    "Wyoming",
    "Nevada",
  ],

  estimateRules: {
    usePriceRanges: true,
    deterministicCalculations: true,
    finalPricingRequiresApproval: true,
    customerSuppliedMaterialsAllowed: true,
    permitsRequireJurisdictionReview: true,
    concealedConditionsRequireManualReview: true,
  },

  scheduling: {
    businessDaysPerWeek: 5,
    standardSchedulingWindowBusinessDays: {
      minimum: 3,
      maximum: 10,
    },
    emergencySchedulingRequiresDirectConfirmation: true,
  },
} as const
