import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../../config/links'

export default function EstimateActions({ onReset }: { onReset: () => void }) { return <div className="estimate-report-actions" aria-label="Estimate actions"><a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Professional Assessment</a><Link to="/request-estimate">Request Formal Estimate</Link><a href="tel:9702865993">Call JBTRADESMENLLC</a><button type="button" onClick={onReset}>Start New Estimate</button><button type="button" onClick={() => window.print()}>Print Estimate</button></div> }
