import type { Estimate } from '../types/estimator'

export default function EstimateTimeline({ estimate }: { estimate: Estimate }) {
  const rows = [['Estimated On-Site Labor', estimate.onsiteLaborDescription ?? estimate.laborHours], ['Expected Site Visits', estimate.expectedSiteVisits], ['Likely Calendar Duration', estimate.calendarDuration ?? estimate.duration], ['Typical Scheduling Window', estimate.schedulingWindow], ['Drying or Curing Time', estimate.curingTime], ['Material Lead Time', estimate.materialLeadTime]]
  return <section className="estimate-report-section" aria-labelledby="estimate-timeline-title"><h3 id="estimate-timeline-title">Project Timeline</h3><dl className="estimate-detail-list">{rows.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
}
