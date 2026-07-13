import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'
import type { Data, Estimate } from './types/estimator'
import EstimatorDisclaimer from './EstimatorDisclaimer'

function ResultActions({ onReset }: { onReset: () => void }) {
  return <div className="smart-result-actions"><a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Professional Assessment</a><Link to="/request-estimate">Request Formal Estimate</Link><a href="tel:9702865993">Call JBTRADESMENLLC</a><button type="button" onClick={onReset}>Start New Estimate</button></div>
}

function ReviewReasons({ title, reasons }: { title: string; reasons?: string[] }) {
  if (!reasons?.length) return null
  return <><h3>{title}</h3><ul>{reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></>
}

export default function EstimateResultsStep({ estimate, data, onReset }: { estimate: Estimate; data: Data; onReset: () => void }) {
  return <section className="smart-results" aria-live={estimate.status === 'safetyOverride' ? 'assertive' : 'polite'}>
    <h2>{estimate.resultHeading ?? 'Preliminary Estimate'}</h2>
    {estimate.resultLabel ? <p><strong>{estimate.resultLabel}</strong></p> : null}
    {estimate.status === 'safetyOverride' ? <div className="smart-disclaimer" role="alert"><strong>Immediate safety review recommended</strong><p>{estimate.safetyOverride?.guidance}</p></div> : null}
    {estimate.fallbackUsed ? <div className="smart-disclaimer" role="status"><strong>Professional review required</strong><p>{estimate.manualReviewReasons?.[0]}</p></div> : null}
    <div className="smart-result-total"><span>Estimated preliminary total</span><strong>{estimate.total}</strong><small>{estimate.confidence} confidence based on information completeness</small></div>
    <div className="smart-result-grid">
      <p><span>Selected service</span><strong>{estimate.serviceName ?? data.service}</strong></p><p><span>Pricing context</span><strong>{estimate.pricingContext}</strong></p>
      <p><span>Estimated labor</span><strong>{estimate.laborHours}</strong></p><p><span>Labor range</span><strong>{estimate.labor}</strong></p>
      {estimate.applicableLaborRate ? <p><span>Applicable labor rate</span><strong>${estimate.applicableLaborRate} per technician hour</strong></p> : null}
      <p><span>Trip charge</span><strong>${estimate.tripChargePerVisit} per expected visit</strong></p><p><span>Expected site visits</span><strong>{estimate.expectedSiteVisits}</strong></p><p><span>Estimated trip charges</span><strong>{estimate.tripChargeTotal}</strong></p>
      <p><span>Estimated materials</span><strong>{estimate.materials}</strong></p>{estimate.equipmentCostRange ? <p><span>Estimated equipment</span><strong>{estimate.equipmentCostRange}</strong></p> : null}
      <p><span>Likely project duration</span><strong>{estimate.duration}</strong></p><p><span>Typical scheduling window</span><strong>{estimate.schedulingWindow}</strong></p><p><span>Confidence</span><strong>{estimate.confidence}</strong><small>Confidence reflects the completeness of the information supplied.</small></p>
    </div>
    {estimate.rangeBasisNote ? <p className="smart-disclaimer">{estimate.rangeBasisNote}</p> : null}
    {estimate.manualReviewRequired ? <ReviewReasons title="Professional Review Recommended" reasons={estimate.manualReviewReasons}/> : null}
    {estimate.assumptions?.length ? <><h3>Assumptions</h3><ul>{estimate.assumptions.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
    <h3>Information that may change the estimate</h3><ul>{estimate.considerations.map((item) => <li key={item}>{item}</li>)}</ul>
    {estimate.recommendations?.length ? <><h3>Recommendations</h3><ul>{estimate.recommendations.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
    <EstimatorDisclaimer/><ResultActions onReset={onReset}/>
  </section>
}
