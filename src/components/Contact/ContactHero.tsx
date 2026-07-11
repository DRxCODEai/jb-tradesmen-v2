export default function ContactHero() {
  return (
    <section className="contact-hero" aria-labelledby="contact-heading">
      <div className="contact-shell contact-hero__content">
        <p className="contact-eyebrow">Contact JBTRADESMENLLC</p>
        <h1 id="contact-heading">Let’s Discuss Your Property or Project</h1>
        <p className="contact-hero__copy">
          Contact JBTRADESMENLLC for residential repairs, commercial maintenance, property assessments,
          remodeling, and facility service requests throughout Colorado, Wyoming, and Nevada.
        </p>
        <ul className="contact-hero__trust" aria-label="Company qualifications and service areas">
          <li>Licensed &amp; Insured</li>
          <li>OSHA 30</li>
          <li>Residential &amp; Commercial</li>
          <li>Colorado • Wyoming • Nevada</li>
        </ul>
      </div>
    </section>
  )
}
