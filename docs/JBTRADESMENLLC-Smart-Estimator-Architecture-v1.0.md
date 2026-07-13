# JBTRADESMENLLC Smart Estimator Architecture v1.0

## 1. Purpose

SMART START Phase 1 establishes a parallel, type-safe foundation for a future deterministic estimating system. It does not replace, connect to, or change the current Smart Project Estimator, its interface, questions, results, or placeholder pricing engine.

## 2. Approved Company Standards

The single runtime source of truth is `company/companyStandards.ts`.

| Standard | Approved value |
| --- | ---: |
| Residential standard labor | $50 per technician hour |
| Commercial standard labor | $75 per technician hour |
| Residential emergency and after-hours labor | $100 per technician hour |
| Commercial emergency and after-hours labor | $150 per technician hour |
| Minimum billable labor | 1 hour |
| Trip charge | $50 per site visit |
| Default crew | 1 technician |

The approved minimums before materials are $100 residential standard, $125 commercial standard, $150 residential emergency or after-hours, and $200 commercial emergency or after-hours.

## 3. Pricing Formula

Estimated range =
billable labor
+ trip charges
+ materials
+ equipment
+ applicable service modifiers

Labor pricing uses the approved JBTRADESMENLLC rate for the property context and service timing. Materials, equipment, and modifiers remain separate line items. Phase 1 adds no material markup, tax calculation, profit-margin percentage, or overtime multiplier beyond the approved emergency rates.

## 4. Trip-Charge Rules

Trip charge total =
number of site visits × $50

The trip charge is separate from labor and applies per site visit. Return visits may create additional trip charges. A future service profile may document expected return visits, but it cannot silently combine trip charges with labor rates.

## 5. One-Hour Minimum Rule

Billable labor hours must never be lower than the approved one-hour minimum unless a future service profile explicitly requires a higher minimum.

A profile-level override may raise the minimum when justified. It must not lower the approved company minimum.

## 6. Crew-Size Assumption

The default estimate assumes one technician. Service profiles must identify minimum, default, and maximum recommended crew size and explain when a second technician is required. Labor hours are technician hours, so crew size and onsite elapsed time must remain distinguishable.

## 7. Architecture Principles

- Keep approved company standards centralized and immutable.
- Keep service knowledge declarative and versioned.
- Keep calculation engines deterministic and independent of React.
- Keep labor, materials, equipment, trips, timeline, and confidence separate.
- Use strict TypeScript without `any` or error suppression.
- Require manual review for concealed conditions, jurisdiction questions, uncertain access, and profile-defined thresholds.
- Treat final pricing as subject to JBTRADESMENLLC review and approval.
- Keep the Phase 1 foundation disconnected from the current production estimator.

## 8. Folder Structure

```text
src/components/SmartEstimator/
├── company/
│   └── companyStandards.ts
├── engines/
│   └── README.md
├── knowledge/
│   ├── serviceCategories.ts
│   └── serviceRegistry.ts
├── services/
│   └── README.md
├── templates/
│   ├── estimatorQuestionTemplate.ts
│   ├── masterServiceTemplate.ts
│   └── serviceModifierTemplate.ts
├── types/v1/
│   ├── company.ts
│   ├── estimate.ts
│   ├── pricing.ts
│   ├── service.ts
│   └── timeline.ts
└── utils/v1/
```

The `utils/v1` folder is reserved for future versioned utilities. Existing estimator files remain in their current locations.

## 9. Master Service Template

Every future service profile must satisfy `MasterServiceTemplate`. The model covers identity, availability, crew, labor, materials, equipment, timeline, pricing, estimator questions, modifiers, confidence, scope of work, recommendations, assumptions, exclusions, permits and code, and research metadata.

Profiles must contain service-specific assumptions and data; the template itself contains no production service data.

## 10. Estimator Question Model

Questions support single select, multi-select, number, text, textarea, boolean, measurement, and photo inputs. Each question identifies validation bounds, options, unit, visibility conditions, confidence weight, and the estimate dimensions it affects: labor, materials, equipment, timeline, confidence, recommendations, scope, or manual review.

Conditional visibility must be based on typed field conditions and deterministic operators.

## 11. Service Modifier Model

Modifiers describe typed conditions and deterministic effects. Conditions support equality, inequality, inclusion, numeric comparisons, and existence checks. Effects may adjust labor, materials, equipment, timeline, flat costs or hours, visits, confidence, manual review, recommendations, and scope steps.

Every modifier must include a customer explanation and internal notes. Modifiers must never obscure how an estimate changed.

## 12. Future Pricing Engine

The future Pricing Engine will select the approved labor-rate key from property context and service timing, enforce the labor minimum, calculate technician labor, apply per-visit trip charges, and add profile-derived material, equipment, and modifier ranges. It will round currency using approved company standards and flag manual-review conditions.

No Pricing Engine is implemented in Phase 1.

## 13. Future Timeline Engine

The Timeline Engine will calculate onsite labor hours, calendar duration, scheduling window, return visits, curing or drying time, material lead time, weather sensitivity, and permit impacts. Labor time and calendar duration are separate: additional crew members may change onsite duration without changing total technician hours, while curing, lead time, or return visits may extend calendar duration without adding continuous labor.

## 14. Future Confidence Engine

The Confidence Engine will score estimate completeness using profile-defined confidence factors, required answers, measurements, photos, access details, and uncertainty triggers. It will produce a consistent confidence classification and surface information needed to improve confidence.

## 15. Future Scope-of-Work Engine

The Scope-of-Work Engine will combine standard steps, conditionally triggered steps, cleanup requirements, exclusions, and modifier-added steps. It will not create unsupported work or conceal assumptions.

## 16. Future Recommendation Engine

The Recommendation Engine will provide profile-defined related services, customer preparation, and professional-review triggers. Recommendations must be deterministic and traceable to service data or customer answers.

## 17. National Average Research Standard

National averages will supply production assumptions, while approved JBTRADESMENLLC rates supply labor pricing. Future research must record its source type, basis, review date, reviewer, geographic relevance, and limitations before approval for a production profile.

Phase 1 does not claim that national-average data has already been researched or approved.

## 18. Initial 25-Service Roadmap

1. Drywall repair
2. Interior painting
3. Exterior painting
4. Baseboard and trim repair
5. Interior door repair or replacement
6. Exterior door repair or replacement
7. Lock change
8. Window and trim repair
9. Ceiling tile replacement
10. General handyman repair
11. Luxury vinyl plank flooring
12. Laminate flooring
13. Tile repair
14. Grout and caulk repair
15. Faucet replacement
16. Toilet repair or replacement
17. Shutoff valve replacement
18. Minor plumbing leak repair
19. Water heater replacement
20. Hose bib repair or replacement
21. Light fixture replacement
22. Switch or outlet replacement
23. Electrical troubleshooting
24. Thermostat replacement
25. HVAC diagnostic or minor repair

These profiles are roadmap items only and are not created in Phase 1.

## 19. Implementation Phases

1. **Phase 1 — Foundation:** approve standards, types, templates, category knowledge, empty registry, architecture, and boundaries.
2. **Phase 2 — Engines:** implement and test deterministic engines against approved standards without connecting the UI.
3. **Phase 3 — Service profiles:** research, review, create, and register production service profiles, beginning with the 25-service roadmap.
4. **Phase 4 — Parallel integration:** connect versioned engines and profiles behind controlled validation while preserving the current estimator fallback.
5. **Phase 5 — Production release:** complete business approval, regression testing, accessibility checks, monitoring, and controlled rollout.

## 20. Safety and Pricing Disclaimers

Estimator output is preliminary planning information, not a proposal, contract, inspection, diagnosis, or guaranteed price. Concealed damage, site conditions, access, material choices, code requirements, permits, jurisdiction rules, and scope changes can affect final price and schedule. Emergency availability requires direct confirmation. Final pricing and scope require JBTRADESMENLLC review and approval.

Electrical, plumbing, HVAC, structural, hazardous-material, and other regulated work may require a properly licensed trade, permits, inspections, or jurisdiction review. The estimator must never replace professional evaluation where safety or code compliance is uncertain.

## 21. Future AI Boundaries

AI may later help interpret free-text descriptions, categorize requests, suggest clarifying questions, or summarize deterministic output. AI must not set final prices, invent company standards, change service-profile values, bypass manual-review rules, or make untraceable calculations. External AI services are not part of Phase 1, and deterministic engines must not call them.

## 22. Version 1.0 Success Criteria

- Approved standards exist once in an immutable configuration.
- Strict reusable types cover company, service, pricing, timeline, and estimate domains.
- Templates support questions, modifiers, and complete future service profiles without `any`.
- All approved service categories exist without pricing or production profiles.
- The service registry is typed and empty until Phase 3.
- Engine and service responsibilities are documented.
- The 25-service roadmap and phased implementation are documented.
- The existing estimator interface, questions, results, pricing, files, and behavior remain unchanged.
- TypeScript and the production Vite build pass without new errors.

## Phase 2A Implementation Status

- Six deterministic engines have been created for pricing, timeline, confidence, scope of work, recommendations, and estimate summaries.
- The first 10 typed service profiles have been created and registered in deterministic roadmap order.
- Nationally informed production assumptions remain pending validation against completed JBTRADESMENLLC field and job data.
- The existing Smart Project Estimator has not been integrated with the Phase 2A engines or profiles.
- Phase 2B will add flooring, tile, and plumbing profiles.
- Phase 2C will add electrical and HVAC profiles.

## Phase 2B Implementation Status

- Flooring profiles have been added for luxury vinyl plank and laminate flooring.
- Tile profiles have been added for localized tile repair and grout or caulk repair.
- Plumbing profiles have been added for faucet, toilet, shutoff-valve, minor leak, water-heater, and hose-bib service.
- The typed service registry now contains 20 active Phase 2 profiles.
- Nationally informed planning assumptions still require comparison against completed JBTRADESMENLLC jobs before final production approval.
- The existing visible Smart Project Estimator remains unconnected to the Phase 2 engines and profiles.
- Phase 2C will add electrical and HVAC profiles, cross-profile validation, and final engine hardening.
