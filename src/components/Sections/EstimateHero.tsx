import './EstimateHero.css'

export default function EstimateHero() {
  return (
    
    <section className="estimate-hero">

      <div className="estimate-overlay">

        <div className="estimate-left">

          <span className="estimate-tag">
            PROFESSIONAL PROPERTY ASSESSMENTS
          </span>

          <h1>
            Professional Property
            <br />
            Assessment &
            <span> Estimate</span>
          </h1>

          <p>
            Professional maintenance estimates for homeowners,
            commercial properties, property managers, financial
            institutions, retail facilities, and government agencies.
          </p>

          <div className="estimate-badges">

            <div className="badge">
              Residential
            </div>

            <div className="badge">
              Commercial
            </div>

            <div className="badge">
              Property Management
            </div>

            <div className="badge">
              Government
            </div>

            <div className="badge">
              Assessment Reports
            </div>

          </div>

          <div className="estimate-buttons">

            <a href="#estimate-form" className="primary-btn">
              Request Assessment
            </a>

            <a href="tel:9702865993" className="secondary-btn">
              Call (970) 286-5993
            </a>

          </div>

        </div>

        <div className="estimate-right">

          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80"
            alt="Professional property assessment"
          />

        </div>

      </div>

    </section>
  )
}