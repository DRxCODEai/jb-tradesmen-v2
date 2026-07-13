import type { Estimate } from '../types/estimator'

function List({ title, items }: { title: string; items?: string[] }) { if (!items?.length) return null; return <div><h4>{title}</h4><ul>{[...new Set(items)].map((item) => <li key={item}>{item}</li>)}</ul></div> }

export default function EstimateConfidence({ estimate }: { estimate: Estimate }) {
  return <section className="estimate-report-section" aria-labelledby="estimate-confidence-title"><h3 id="estimate-confidence-title">Estimate Confidence</h3><p className="estimate-confidence-label"><span>Confidence</span><strong>{estimate.confidence}</strong></p><p>Confidence reflects the completeness of the project information supplied. It does not guarantee final-price accuracy.</p><div className="estimate-two-column"><List title="Information that improved this estimate" items={estimate.confidenceImprovingFactors}/><List title="Information still needed" items={estimate.missingInformation}/></div></section>
}
