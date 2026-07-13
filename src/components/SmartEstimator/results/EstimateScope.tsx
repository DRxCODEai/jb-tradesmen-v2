import type { Estimate } from '../types/estimator'

export default function EstimateScope({ estimate }: { estimate: Estimate }) { if (!estimate.scopeSteps?.length) return null; return <section className="estimate-report-section" aria-labelledby="estimate-scope-title"><h3 id="estimate-scope-title">Likely Scope of Work</h3><ol className="estimate-scope-list">{[...new Set(estimate.scopeSteps)].map((step) => <li key={step}>{step}</li>)}</ol></section> }
