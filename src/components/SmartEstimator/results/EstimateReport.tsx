import { useEffect, useRef } from 'react'
import { company } from '../../../data/company'
import type { Data, Estimate, EstimateResultHeading } from '../types/estimator'
import EstimatorDisclaimer from '../EstimatorDisclaimer'
import EstimateActions from './EstimateActions'
import EstimateAssumptions from './EstimateAssumptions'
import EstimateConfidence from './EstimateConfidence'
import EstimateOverview from './EstimateOverview'
import EstimatePricingBreakdown from './EstimatePricingBreakdown'
import EstimateRecommendations from './EstimateRecommendations'
import EstimateReviewNotice from './EstimateReviewNotice'
import EstimateSafetyNotice from './EstimateSafetyNotice'
import EstimateScope from './EstimateScope'
import EstimateTimeline from './EstimateTimeline'
import './EstimateReport.css'

function heading(estimate: Estimate): EstimateResultHeading {
  if (estimate.status === 'safetyOverride' || estimate.resultType === 'emergency') return 'Emergency Diagnostic / Initial Service Range'
  if (estimate.resultType === 'broadFallback') return 'Broad Preliminary Planning Range'
  if (estimate.resultType === 'diagnostic') return 'Preliminary Diagnostic / Initial Service Range'
  return 'Preliminary Project Estimate'
}

export default function EstimateReport({ estimate, data, onReset }: { estimate: Estimate; data: Data; onReset: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => { titleRef.current?.focus({ preventScroll: true }); titleRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' }) }, [])
  return <article className="estimate-report" aria-live="polite" aria-labelledby="estimate-report-title">
    <header className="estimate-report-header"><span>JBTRADESMENLLC planning estimate</span><h2 ref={titleRef} tabIndex={-1} id="estimate-report-title">{heading(estimate)}</h2>{estimate.resultLabel && <p>{estimate.resultLabel}</p>}</header>
    <EstimateSafetyNotice estimate={estimate}/>
    {estimate.rangeBasisNote && <p className="estimate-basis-note">{estimate.rangeBasisNote}</p>}
    <EstimateOverview estimate={estimate} data={data}/>
    <EstimatePricingBreakdown estimate={estimate}/>
    <EstimateTimeline estimate={estimate}/>
    <EstimateConfidence estimate={estimate}/>
    <EstimateScope estimate={estimate}/>
    <EstimateAssumptions estimate={estimate}/>
    <EstimateRecommendations estimate={estimate}/>
    <EstimateReviewNotice estimate={estimate}/>
    <EstimatorDisclaimer/>
    <div className="estimate-print-contact"><strong>{company.name}</strong><span>{company.phone}</span><span>{company.email}</span><span>{company.website}</span></div>
    <EstimateActions onReset={onReset}/>
  </article>
}
