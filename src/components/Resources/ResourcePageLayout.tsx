import { Check, ChevronLeft, Phone, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'
import './ResourcePageLayout.css'

export type ResourceSection = { heading: string; copy: string; items: string[] }
type Props = { category: string; title: string; intro: string; sections: ResourceSection[]; tip?: string; warning?: string }

export default function ResourcePageLayout({ category, title, intro, sections, tip, warning }: Props) {
  return (
    <main className="resource-page">
      <article>
        <header className="resource-page__hero"><div className="resource-page__container"><Link className="resource-page__back" to="/resources"><ChevronLeft size={18} aria-hidden="true" />Back to Resources</Link><span>{category}</span><h1>{title}</h1><p>{intro}</p></div></header>
        <div className="resource-page__container resource-page__content">
          {sections.map((section) => <section className="resource-page__section" key={section.heading}><h2>{section.heading}</h2><p>{section.copy}</p><ul>{section.items.map((item) => <li key={item}><Check size={17} aria-hidden="true" />{item}</li>)}</ul></section>)}
          {tip && <aside className="resource-page__tip"><strong>Helpful tip</strong><p>{tip}</p></aside>}
          {warning && <aside className="resource-page__warning"><TriangleAlert size={22} aria-hidden="true" /><p>{warning}</p></aside>}
          <section className="resource-page__professional"><h2>When to Call a Professional</h2><p>Maintenance checklists are useful for noticing changes, but they do not replace a licensed inspection, code-compliance review, or professional assessment. Contact a qualified professional for safety concerns, recurring issues, or repairs beyond routine upkeep.</p></section>
        </div>
      </article>
      <section className="resource-page__cta"><div className="resource-page__container"><h2>Need Professional Help With Your Property?</h2><p>Schedule a professional property assessment for detailed findings, repair recommendations, and estimated project costs.</p><div><a href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Request Assessment</a><a href="tel:9702865993" className="resource-page__call"><Phone size={18} aria-hidden="true" />Call (970) 286-5993</a></div></div></section>
    </main>
  )
}
