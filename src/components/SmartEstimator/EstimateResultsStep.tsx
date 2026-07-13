import type { Data, Estimate } from './types/estimator'
import EstimateReport from './results/EstimateReport'

export default function EstimateResultsStep({ estimate, data, onReset }: { estimate: Estimate; data: Data; onReset: () => void }) {
  return <EstimateReport estimate={estimate} data={data} onReset={onReset}/>
}
