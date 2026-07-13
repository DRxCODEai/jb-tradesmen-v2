import type { Data, Estimate } from '../types/estimator'
import { isMeasurementAnswer } from '../dynamicQuestions/dynamicQuestionTypes'

function projectSize(data: Data): string {
  for (const field of ['squareFeet', 'linearFeet', 'dimensions', 'wallDimensions', 'tileQuantity', 'fixtureCount', 'damagedAreaCount', 'roomCount', 'fallbackSize', 'fallbackQuantity']) {
    const value = data.serviceAnswers[field]
    if (isMeasurementAnswer(value)) return value.unknown ? 'Unknown' : `${value.value} ${value.unit}`
    if (typeof value === 'number') return `${value}`
  }
  return data.dimensions || data.quantity || 'Not supplied'
}

export default function EstimateOverview({ estimate, data }: { estimate: Estimate; data: Data }) {
  const selected = estimate.selectedServiceName ?? data.service ?? 'Not selected'
  const resolved = estimate.resolvedServiceName ?? estimate.serviceName ?? selected
  const size = projectSize(data)
  const items = [
    ['Resolved service', resolved], ['Selected service', selected], ['Project type', data.projectType],
    ['Pricing context', estimate.pricingContext], ['Service timing', estimate.serviceTiming],
    ['Location', estimate.projectDetails?.location || 'Not supplied'], ['Quantity or project size', size],
    ['Photos', `${data.photos.length} added`], ['Confidence', estimate.confidence],
  ]
  return <section className="estimate-report-section" aria-labelledby="estimate-overview-title"><h3 id="estimate-overview-title">Project Overview</h3>{selected !== resolved && <p className="estimate-resolution-note">Your selected service was refined using the project details supplied.</p>}<dl className="estimate-overview-grid">{items.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
}
