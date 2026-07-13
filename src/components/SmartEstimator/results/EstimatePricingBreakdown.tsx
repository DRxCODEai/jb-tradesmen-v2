import type { Estimate } from '../types/estimator'

function rateContext(estimate: Estimate): string {
  const context = estimate.pricingContext?.replace(' / After Hours', '') ?? 'Selected pricing context'
  return `$${estimate.applicableLaborRate ?? 0}/hour — ${context}`
}

export default function EstimatePricingBreakdown({ estimate }: { estimate: Estimate }) {
  const materialLabel = /Remodel|Tenant-Improvement/i.test(estimate.resultLabel ?? '') ? 'Preliminary Material Allowance' : 'Estimated Materials'
  const rows = [
    ['Estimated Labor Time', estimate.onsiteLaborDescription ?? estimate.laborHours],
    ['Applicable Labor Rate', rateContext(estimate)], ['Estimated Labor Cost', estimate.labor],
    ['Expected Site Visits', estimate.expectedSiteVisits ? `${estimate.expectedSiteVisits} ${estimate.expectedSiteVisits === '1' ? 'visit' : 'visits'}` : undefined],
    ['Estimated Trip Charges', estimate.tripChargeTotal], [materialLabel, estimate.materials],
    ...(estimate.equipmentRange?.maximum ? [['Estimated Equipment', estimate.equipmentCostRange]] : []),
  ]
  return <section className="estimate-report-section" aria-labelledby="estimate-pricing-title"><h3 id="estimate-pricing-title">Pricing Breakdown</h3><dl className="estimate-pricing-grid">{rows.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{estimate.customerSuppliedMaterials && <div className="estimate-material-note"><strong>Customer-supplied primary materials assumed.</strong><p>Consumables, accessories, fittings, protection, disposal, or miscellaneous materials may still be included in the material allowance.</p></div>}<div className="estimate-total"><span>Estimated Preliminary Total</span><strong>{estimate.total}</strong><small>Preliminary planning range—not a binding quote.</small></div></section>
}
