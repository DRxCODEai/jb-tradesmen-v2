import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'
import type { Data, Estimate } from './types/estimator'
import EstimatorDisclaimer from './EstimatorDisclaimer'

function ResultActions({ onReset }: { onReset: () => void }) {
  return <div className="smart-result-actions"><a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Professional Assessment</a><Link to="/request-estimate">Request Formal Estimate</Link><a href="tel:9702865993">Call JBTRADESMENLLC</a><button type="button" onClick={onReset}>Start New Estimate</button></div>
}

function ProjectDetails({ data }: { data: Data }) {
  const location = [data.city, data.state, data.zip].filter(Boolean).join(', ')
  return <section><h3>Project details provided</h3><div className="smart-result-grid"><p><span>Project summary</span><strong>{data.description}</strong></p><p><span>Selected service</span><strong>{data.service}</strong></p><p><span>Property context</span><strong>{data.projectType} — {data.propertyType}</strong></p><p><span>Location</span><strong>{location}</strong></p><p><span>Photos</span><strong>{data.photos.length} added</strong></p></div></section>
}

function ReviewReasons({ title, reasons }: { title: string; reasons?: string[] }) {
  if (!reasons?.length) return null
  return <><h3>{title}</h3><ul>{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></>
}

export default function EstimateResultsStep({ estimate, data, onReset }: { estimate: Estimate; data: Data; onReset: () => void }) {
  if (estimate.status === 'safetyOverride') {
    return <section className="smart-results" aria-live="assertive"><div className="smart-result-total" role="alert"><h2>Immediate safety review recommended</h2><p>{estimate.safetyOverride?.guidance}</p></div><ProjectDetails data={data}/><ReviewReasons title="Professional review requirements" reasons={estimate.manualReviewReasons}/><EstimatorDisclaimer/><ResultActions onReset={onReset}/></section>
  }
  if (estimate.status === 'manualReview') {
    return <section className="smart-results" aria-live="polite"><div className="smart-result-total" role="status"><h2>Professional review required</h2><p>This project requires professional review before a meaningful preliminary range can be provided.</p></div><ProjectDetails data={data}/><ReviewReasons title="Why review is needed" reasons={estimate.manualReviewReasons}/><EstimatorDisclaimer/><ResultActions onReset={onReset}/></section>
  }
  return <section className="smart-results" aria-live="polite">
    <h2>Your preliminary planning range</h2>
    {estimate.fallbackUsed ? <div className="smart-disclaimer" role="status"><strong>Professional review required</strong><p>{estimate.manualReviewReasons?.[0]}</p></div> : null}
    <div className="smart-result-total"><span>Estimated preliminary total</span><strong>{estimate.total}</strong><small>{estimate.confidence} confidence based on information completeness</small></div>
    <div className="smart-result-grid">
      <p><span>Estimated labor</span><strong>{estimate.laborHours}</strong></p><p><span>Labor range</span><strong>{estimate.labor}</strong></p>
      {estimate.applicableLaborRate ? <p><span>Applicable labor rate</span><strong>${estimate.applicableLaborRate} per technician hour</strong></p> : null}
      <p><span>Trip charge</span><strong>${estimate.tripChargePerVisit} per expected visit</strong></p><p><span>Expected site visits</span><strong>{estimate.expectedSiteVisits}</strong></p><p><span>Estimated trip charges</span><strong>{estimate.tripChargeTotal}</strong></p>
      <p><span>Estimated materials</span><strong>{estimate.materials}</strong></p>{estimate.equipmentCostRange ? <p><span>Estimated equipment</span><strong>{estimate.equipmentCostRange}</strong></p> : null}
      <p><span>Likely project duration</span><strong>{estimate.duration}</strong></p><p><span>Typical scheduling window</span><strong>{estimate.schedulingWindow}</strong></p><p><span>Pricing context</span><strong>{estimate.pricingContext}</strong></p><p><span>Confidence</span><strong>{estimate.confidence}</strong><small>Confidence reflects the completeness of the information supplied.</small></p>
    </div>
    {estimate.manualReviewRequired ? <ReviewReasons title="Professional review requirements" reasons={estimate.manualReviewReasons}/> : null}
    <h3>Information that may change the estimate</h3><ul>{estimate.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
    {estimate.recommendations?.length ? <><h3>Recommendations</h3><ul>{estimate.recommendations.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
    <EstimatorDisclaimer/><ResultActions onReset={onReset}/>
  </section>
}
