import type { Estimate } from '../types/estimator'

export default function EstimateRecommendations({ estimate }: { estimate: Estimate }) { if (!estimate.recommendations?.length) return null; return <section className="estimate-report-section" aria-labelledby="estimate-recommendations-title"><h3 id="estimate-recommendations-title">Recommendations</h3><ul>{[...new Set(estimate.recommendations)].map((item) => <li key={item}>{item}</li>)}</ul></section> }
