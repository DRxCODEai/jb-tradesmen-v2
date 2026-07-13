import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Printer, X } from 'lucide-react'
import logo from '../../assets/logo.png'
import { KOALENDAR_URL } from '../../config/links'
import './SampleAssessmentModal.css'
import './SampleAssessmentPolish.css'

type Props = { isOpen: boolean; onClose: () => void }
const findings = [
  ['Kitchen Sink', 'Minor plumbing leak observed beneath sink cabinet.', 'High', 'Repair leaking connection, inspect shutoff valves and confirm cabinet materials are dry.', '$175–$325'],
  ['Guest Bathroom', 'Loose toilet base with deteriorated seal.', 'High', 'Remove and reset toilet with new wax seal and mounting hardware.', '$225–$375'],
  ['Living Room', 'Drywall cracking visible near window opening.', 'Medium', 'Evaluate for continued movement, repair drywall and match existing texture and paint.', '$350–$650'],
  ['Exterior Irrigation', 'One irrigation valve is leaking and two sprinkler heads are damaged.', 'Medium', 'Replace damaged valve components and sprinkler heads, then test irrigation zones.', '$275–$525'],
  ['HVAC Return', 'Filter is heavily soiled and return grille requires cleaning.', 'Preventative', 'Replace filter, clean grille and establish a routine replacement schedule.', '$75–$150'],
  ['Primary Bedroom', 'Interior door does not latch properly.', 'Low', 'Adjust hinges and strike plate and verify proper operation.', '$95–$175'],
]

function SampleMark() { return <div className="sample-report__mark"><strong>SAMPLE REPORT</strong><span>For Demonstration Purposes Only</span></div> }
function List({ items }: { items: string[] }) { return <ul className="sample-report__list">{items.map((item) => <li key={item}>✓ {item}</li>)}</ul> }

export default function SampleAssessmentModal({ isOpen, onClose: closeParent }: Props) {
  const [page, setPage] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const onClose = useCallback(() => { setPage(0); closeParent() }, [closeParent])
  useLayoutEffect(() => {
    if (!isOpen) return
    modalRef.current?.querySelector<HTMLElement>('.sample-modal__scroll')?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [isOpen])
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = originalOverflow; window.removeEventListener('keydown', onKeyDown) }
  }, [isOpen, onClose])
  if (!isOpen) return null
  const changePage = (next: number) => { setPage(Math.max(0, Math.min(7, next))); modalRef.current?.querySelector<HTMLElement>('.sample-modal__scroll')?.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }
  const pageContent = [
    <section className="sample-report__cover" key="cover"><SampleMark /><img src={logo} alt="JBTRADESMENLLC" /><div className="sample-report__gold-line" /><p className="sample-report__kicker">Professional Property Assessment Report</p><h1>Sample Property</h1><p>123 Example Street<br />Las Vegas, Nevada 89139</p><div className="sample-report__cover-meta"><span>Assessment Type<br /><strong>Residential Property Assessment</strong></span><span>Prepared By<br /><strong>JBTRADESMENLLC</strong></span><span>Report Status<br /><strong>Sample / Demonstration</strong></span></div><footer>Licensed &amp; Insured · OSHA 30 Certified · EPA 608 &amp; 609 Certified<br />Federal Contractor · CAGE Code: 13SR1 · UEI: PKT6EMEN5BJ9</footer></section>,
    <section key="summary"><SampleMark /><h1>Executive Summary</h1><p>This sample assessment documents visible property conditions observed during a general property evaluation. The report identifies maintenance concerns, recommended repairs, priority levels and estimated project costs to help the property owner make informed maintenance decisions.</p><div className="sample-report__dashboard"><div><strong>18</strong><span>Total Items Reviewed</span></div><div><strong>2</strong><span>Immediate Priority Items</span></div><div><strong>6</strong><span>Recommended Repairs</span></div><div><strong>5</strong><span>Preventative Maintenance Items</span></div><div className="sample-report__dashboard-total"><strong>$2,450–$4,100</strong><span>Estimated Repair Range</span></div></div><aside className="sample-report__note">These figures are fictional examples provided only to demonstrate the format of a JBTRADESMENLLC Property Assessment Report.</aside></section>,
    <section key="overview"><SampleMark /><h1>Property Overview</h1><div className="sample-report__details">{[['Property Type','Single-Family Residence'],['Approximate Size','1,850 Square Feet'],['Bedrooms','3'],['Bathrooms','2'],['Occupancy','Owner Occupied'],['Exterior','Stucco and Painted Trim'],['Roof','Asphalt Shingle'],['HVAC','Central Heating and Cooling']].map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><h2>Assessment Scope</h2><List items={['Interior visual review','Exterior visual review','Plumbing fixture review','HVAC condition observations','Electrical fixture observations','Doors, windows and locks','Flooring, drywall and tile','Appliance condition observations','Visible maintenance concerns','Photographic documentation']} /><aside className="sample-report__note">This assessment is visual and non-destructive. Conditions hidden behind walls, beneath flooring, above ceilings, inside sealed equipment, or in inaccessible areas are outside the scope unless specifically identified.</aside></section>,
    <section key="findings"><SampleMark /><h1>Sample Inspection Findings</h1><div className="sample-report__findings">{findings.map(([area,condition,priority,recommendation,cost], index)=><article key={area}><header><span>Finding {index + 1}</span><b className={`sample-report__priority sample-report__priority--${priority.toLowerCase()}`}>{priority}</b></header><h2>{area}</h2><p><strong>Condition:</strong> {condition}</p><p><strong>Recommendation:</strong> {recommendation}</p><footer><span>Estimated Cost</span><strong>{cost}</strong></footer></article>)}</div></section>,
    <section key="priorities"><SampleMark /><h1>Repair Priority Summary</h1><p>Repair priorities help property owners plan work according to urgency, safety and budget.</p><div className="sample-report__priority-grid"><article><h2>Immediate / High Priority</h2><List items={['Kitchen plumbing leak','Guest bathroom toilet seal']} /></article><article><h2>Recommended / Medium Priority</h2><List items={['Living room drywall repair','Irrigation valve and sprinkler repairs']} /></article><article><h2>Routine / Low Priority</h2><List items={['Primary bedroom door adjustment']} /></article><article><h2>Preventative Maintenance</h2><List items={['HVAC filter replacement and return cleaning','Test smoke and carbon monoxide detectors','Inspect exterior drainage before rainy season','Review water heater condition annually','Inspect visible plumbing connections regularly']} /></article></div></section>,
    <section key="costs"><SampleMark /><h1>Estimated Repair Cost Summary</h1><table className="sample-report__table"><tbody>{[['Kitchen plumbing repair','$175–$325'],['Toilet reset and seal','$225–$375'],['Drywall repair and paint','$350–$650'],['Irrigation repairs','$275–$525'],['HVAC filter and cleaning','$75–$150'],['Door adjustment','$95–$175'],['Potential additional maintenance allowance','$1,255–$1,900']].map(([name,cost])=><tr key={name}><td>{name}</td><td>{cost}</td></tr>)}<tr className="sample-report__total"><td>Estimated Total Range</td><td>$2,450–$4,100</td></tr></tbody></table><aside className="sample-report__note">Estimated costs are planning figures only. Final pricing may change after detailed inspection, material selection, accessibility review and confirmation of the final scope of work.</aside></section>,
    <section key="next"><SampleMark /><h1>Recommended Next Steps</h1><ol className="sample-report__steps"><li>Address active plumbing leaks and moisture concerns first.</li><li>Complete high-priority bathroom repairs.</li><li>Schedule medium-priority drywall and irrigation repairs.</li><li>Establish recurring HVAC and property maintenance intervals.</li><li>Request a detailed project estimate for approved repairs.</li></ol><aside className="sample-report__callout">JBTRADESMENLLC can provide repair estimates and complete many of the recommended services identified in the assessment.</aside></section>,
    <section key="disclaimer"><SampleMark /><h1>Assessment Limitations &amp; Disclaimer</h1><p>This sample report demonstrates the format of a JBTRADESMENLLC Property Assessment Report. A property assessment is a visual, non-invasive review of accessible areas and is not a municipal code inspection, engineering evaluation, environmental assessment, insurance inspection or certified home inspection unless expressly stated in writing.</p><p>Conditions hidden behind walls, beneath flooring, above ceilings, inside sealed equipment or in inaccessible areas are not included unless specifically identified in the scope of work.</p><p>The actual report provided to a customer will reflect the property conditions observed during the scheduled assessment.</p><div className="sample-report__not-real">SAMPLE — NOT A REAL PROPERTY REPORT</div></section>,
  ][page]
  return <div className="sample-modal__backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><div ref={modalRef} className="sample-modal" role="dialog" aria-modal="true" aria-labelledby="sample-report-title"><header className="sample-modal__header"><div><span>JBTRADESMENLLC</span><strong id="sample-report-title">Sample Assessment Report Preview</strong></div><button ref={closeRef} onClick={onClose} aria-label="Close sample report"><X size={22} /></button></header><div className="sample-modal__scroll"><div className="sample-modal__report">{pageContent}</div></div><footer className="sample-modal__footer"><div className="sample-modal__navigation"><button onClick={() => changePage(page - 1)} disabled={page === 0}><ChevronLeft size={18} />Previous Page</button><span>Page {page + 1} of 8</span><button onClick={() => changePage(page + 1)} disabled={page === 7}>Next Page<ChevronRight size={18} /></button></div><div className="sample-modal__actions"><button onClick={onClose}>Close Preview</button><button onClick={() => window.print()}><Printer size={17} />Print / Save Sample</button><a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Assessment</a></div></footer></div></div>
}
