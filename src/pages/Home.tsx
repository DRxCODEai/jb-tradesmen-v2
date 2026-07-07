const trustBadges = ['Licensed', 'Insured', 'Reliable', 'Professional']
const serviceHighlights = [
  'Residential Repairs',
  'Commercial Repairs',
  'Property Maintenance',
  'Preventative Maintenance',
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">JBTRADESMENLLC</p>
          <h1>Your Trusted Residential &amp; Commercial Maintenance Partner</h1>
          <p className="hero-subtitle">
            Serving homeowners, businesses, property managers, HOAs, banks, retail
            locations, and commercial facilities across Colorado, Wyoming &amp;
            Nevada.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="/instant-project-estimate">
              Get a Free Estimate
            </a>
            <a className="secondary-cta" href="/contact">
              Call Now
            </a>
          </div>
          <div className="trust-badges" aria-label="Company trust indicators">
            {trustBadges.map((badge) => (
              <span key={badge} className="trust-badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Our Services</p>
          <h2>Comprehensive maintenance and repair solutions</h2>
        </div>
        <div className="card-grid">
          {serviceHighlights.map((service) => (
            <article key={service} className="info-card">
              <h3>{service}</h3>
              <p>Professional service delivered with consistency and care.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section alt-section">
        <div className="section-heading">
          <p className="section-label">Why Choose JBTRADESMENLLC</p>
          <h2>Built on responsiveness, craftsmanship, and accountability</h2>
        </div>
        <div className="card-grid">
          <article className="info-card">
            <h3>Fast Response</h3>
            <p>Reliable support for urgent repairs and ongoing maintenance.</p>
          </article>
          <article className="info-card">
            <h3>Commercial Grade Work</h3>
            <p>Professional execution for facilities, retail, and property teams.</p>
          </article>
          <article className="info-card">
            <h3>Long-Term Partnerships</h3>
            <p>Consistent service that helps properties stay protected and operating.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Recent Projects</p>
          <h2>Recent work across residential and commercial properties</h2>
        </div>
        <div className="card-grid three-up">
          <article className="info-card project-card">
            <h3>Property Turnover</h3>
            <p>Restoration and maintenance support for fast occupancy schedules.</p>
          </article>
          <article className="info-card project-card">
            <h3>Retail Maintenance</h3>
            <p>Preventative and corrective work for occupied retail environments.</p>
          </article>
          <article className="info-card project-card">
            <h3>Facility Repairs</h3>
            <p>Responsive service for commercial buildings and multi-site operations.</p>
          </article>
        </div>
      </section>

      <section className="content-section alt-section">
        <div className="section-heading">
          <p className="section-label">Customer Reviews</p>
          <h2>Trusted by property managers, owners, and business leaders</h2>
        </div>
        <div className="card-grid">
          <article className="info-card">
            <h3>“Responsive and professional.”</h3>
            <p>Reliable scheduling and quality workmanship on every visit.</p>
          </article>
          <article className="info-card">
            <h3>“Clear communication.”</h3>
            <p>Thoughtful project coordination from estimate through completion.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Request an Estimate</p>
          <h2>Let’s talk about your property maintenance needs</h2>
        </div>
        <div className="estimate-card">
          <p>Start with a consultation and receive a tailored estimate for your project.</p>
          <a className="primary-cta" href="/instant-project-estimate">
            Get a Free Estimate
          </a>
        </div>
      </section>
    </div>
  )
}
