import '../styles/RequestEstimate.css';

export default function RequestEstimate() {
  return (
    <div className="request-estimate-page">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="estimate-hero">

        <div className="estimate-container">

          <div className="estimate-grid">

            {/* LEFT */}

            <div className="estimate-left">

              <p className="estimate-label">
                PROFESSIONAL PROPERTY ASSESSMENTS & ESTIMATES
              </p>

              <h1>
                Professional Property
                <br />
                <span>Assessment &amp; Estimate</span>
              </h1>

              <p className="estimate-subtitle">
                Professional maintenance solutions for homeowners,
                commercial facilities, property managers,
                financial institutions, retail locations,
                and government agencies.

                Schedule a consultation or request
                a detailed Property Assessment Report.
              </p>

              <div className="estimate-badges">
                <span>Residential</span>
                <span>Commercial</span>
                <span>Property Management</span>
                <span>Government Contracting</span>
                <span>$49 Assessment Reports</span>
              </div>

              <p className="estimate-trust">
                Licensed &amp; Insured • OSHA 30 Certified • EPA 608 Certified •
                EPA 609 Certified • Registered Federal Contractor •
                CAGE: 13SR1 • UEI: PKT6EMEN5BJ9
              </p>

              <div className="estimate-buttons">

                <a
                  href="YOUR KOALENDAR LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="estimate-primary"
                >
                  Request Assessment
                </a>

                <a
                  href="tel:+19702865993"
                  className="estimate-secondary"
                >
                  Call (970) 286-5993
                </a>

              </div>

            </div>

            {/* RIGHT */}

            <div className="estimate-right">

              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
                alt="Commercial Property Assessment"
              />

              <div className="estimate-card">

                <h3>Professional Assessment Report</h3>

                <p>
                  Receive a comprehensive property assessment with
                  photographs, repair recommendations, estimated costs,
                  maintenance priorities, and a professional PDF report.
                </p>

                <ul>
                  <li>✔ Residential Properties</li>
                  <li>✔ Commercial Facilities</li>
                  <li>✔ Property Management</li>
                  <li>✔ Government Facilities</li>
                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==========================================
          OUR PROCESS
      ========================================== */}

      <section className="estimate-process">

        <div className="process-container">

          <div className="section-heading">

            <p className="section-label">
              OUR PROCESS
            </p>

            <h2>
              What Happens After You Request an Assessment?
            </h2>

            <p className="section-copy">
              Every project follows a clear, professional process from your
              initial request through project completion. Whether you're a
              homeowner, property manager, commercial client, or government
              agency, you'll know exactly what to expect.
            </p>

          </div>

          <div className="process-grid">

            <div className="process-card">

              <div className="process-number">1</div>

              <h3>Request an Assessment</h3>

              <p>
                Schedule online or contact us directly to discuss your project
                and maintenance needs.
              </p>

            </div>

            <div className="process-card">

              <div className="process-number">2</div>

              <h3>Project Review</h3>

              <p>
                We review your information, photos, location, and service
                requirements before scheduling.
              </p>

            </div>

            <div className="process-card">

              <div className="process-number">3</div>

              <h3>Professional Site Visit</h3>

              <p>
                We perform an on-site inspection, document findings, take
                photographs, and identify repair priorities.
              </p>

            </div>

            <div className="process-card">

              <div className="process-number">4</div>

              <h3>Assessment &amp; Estimate</h3>

              <p>
                Receive a detailed estimate or a Professional Property
                Assessment Report with recommendations and pricing.
              </p>

            </div>

            <div className="process-card">

              <div className="process-number">5</div>

              <h3>Schedule Your Project</h3>

              <p>
                Once approved, we'll schedule your project and keep you updated
                through completion.
              </p>

            </div>

          </div>

        </div>

      </section>
            {/* ==========================================
          PROPERTY ASSESSMENT REPORTS
      ========================================== */}

      <section className="assessment-section">

        <div className="assessment-container">

          <div className="assessment-left">

            <p className="section-label">
              PROFESSIONAL PROPERTY ASSESSMENTS
            </p>

            <h2>
              More Than an Estimate.
              <br />
              A Professional Property Assessment.
            </h2>

            <p className="section-copy">

              Our Professional Property Assessment Reports provide
              homeowners, property managers, commercial clients,
              financial institutions and government agencies with
              detailed documentation of existing conditions,
              recommended repairs, maintenance priorities and
              project costs.

            </p>

            <div className="assessment-features">

              <div>📷 High Resolution Photos</div>

              <div>📋 Detailed Inspection Findings</div>

              <div>🔧 Repair Recommendations</div>

              <div>⚠ Priority Ranking</div>

              <div>💲 Itemized Estimate</div>

              <div>📄 Professional PDF Report</div>

            </div>

          </div>

          <div className="assessment-right">

            <div className="report-card">

              <div className="report-header">

                PROPERTY ASSESSMENT REPORT

              </div>

              <div className="report-body">

                <h3>$49 Flat Rate</h3>

                <p>

                  Perfect for:

                </p>

                <ul>

                  <li>Residential Properties</li>

                  <li>Commercial Facilities</li>

                  <li>Property Management</li>

                  <li>Banks & Financial Institutions</li>

                  <li>Government Agencies</li>

                  <li>Insurance Documentation</li>

                </ul>

                <a
                  href="YOUR KOALENDAR LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="estimate-primary"
                >
                  Schedule Assessment
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}