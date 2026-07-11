import './CommercialTrustedBy.css'

const clients = [
  'First Interstate Bank', 'Home Depot', 'Red Lobster', "Michael's Arts & Crafts", 'GNC', "Sally's Beauty Salon", 'Ross', 'TJ Maxx', 'Family Dollar', 'Sprouts Farmers Market', 'Superior Property Management', 'DaVita Dialysis', 'ATD (American Tire Distributors)', 'MasTec', 'USPS (United States Postal Service)', 'FedEx',
]

const metrics = [
  '1,200+ Projects Completed', '10+ Years Experience', 'Licensed & Insured', 'OSHA 30 Certified', 'Federal Contractor', 'CAGE Code 13SR1', 'UEI Registered', '12-Month Workmanship Warranty',
]

export default function CommercialTrustedBy() {
  return (
    <section className="commercial-trusted" aria-labelledby="commercial-trusted-title">
      <div className="commercial-trusted__inner">
        <header className="commercial-trusted__heading">
          <span>Trusted by</span>
          <h2 id="commercial-trusted-title">Supporting Industry Leaders Across Colorado, Wyoming &amp; Nevada</h2>
          <p>JBTRADESMENLLC proudly provides maintenance, repair and facility services for commercial properties, national retailers, financial institutions, property managers and government agencies.</p>
        </header>
        <div className="commercial-trusted__clients" aria-label="Commercial clients">
          {clients.map((client) => <div className="commercial-trusted__client" key={client}>{client}</div>)}
        </div>
        <div className="commercial-trusted__metrics" aria-label="Company qualifications">
          {metrics.map((metric) => <span key={metric}>✓ {metric}</span>)}
        </div>
      </div>
    </section>
  )
}
