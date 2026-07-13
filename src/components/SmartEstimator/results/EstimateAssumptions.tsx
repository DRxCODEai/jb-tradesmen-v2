import type { Estimate } from '../types/estimator'

function Items({ items }: { items?: string[] }) { return items?.length ? <ul>{[...new Set(items)].map((item) => <li key={item}>{item}</li>)}</ul> : <p>None identified from the supplied information.</p> }
export default function EstimateAssumptions({ estimate }: { estimate: Estimate }) { return <section className="estimate-report-section estimate-two-column" aria-label="Estimate assumptions and exclusions"><div><h3>Estimate Assumptions</h3><Items items={estimate.assumptions}/></div><div><h3>Possible Exclusions or Additional Costs</h3><Items items={estimate.exclusions ?? estimate.considerations}/></div></section> }
