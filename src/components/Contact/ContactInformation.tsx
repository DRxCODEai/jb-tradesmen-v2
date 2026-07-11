export default function ContactInformation() {
  return (
    <section className="contact-information" aria-labelledby="contact-information-heading">
      <div className="contact-shell">
        <div className="contact-section-heading contact-section-heading--light">
          <p className="contact-eyebrow">Contact information</p>
          <h2 id="contact-information-heading">Direct access to our team</h2>
        </div>
        <dl className="contact-information__grid">
          <div><dt>Phone</dt><dd><a href="tel:9702865993">970-286-5993</a></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:Jerome@JBTradesmenLLC.com">Jerome@JBTradesmenLLC.com</a></dd></div>
          <div><dt>Service Areas</dt><dd>Colorado • Wyoming • Nevada</dd></div>
          <div><dt>Service Types</dt><dd>Residential • Commercial • Property Management</dd></div>
        </dl>
        <p className="contact-information__urgent">For urgent or after-hours service, calling is the fastest way to reach JBTRADESMENLLC.</p>
      </div>
    </section>
  )
}
