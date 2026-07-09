import './AssessmentReport.css';

export default function AssessmentReport() {
  return (
    <section
      className="assessment-section"
      id="assessment-report"
    >
      <div className="assessment-container">

        {/* LEFT */}

        <div className="assessment-left">

          <span className="section-tag">
            PROFESSIONAL PROPERTY ASSESSMENTS
          </span>

          <h2>
            Know Exactly What
            <br />
            Your Property Needs
          </h2>

          <p>
            Our Professional Property Assessment Reports help homeowners,
            commercial property owners, property managers, financial
            institutions and government agencies understand a property's
            condition before committing to repairs or maintenance.

            Every report includes detailed documentation, photographs,
            repair recommendations, maintenance priorities and estimated
            project costs prepared by JBTRADESMENLLC.
          </p>

          <div className="assessment-grid">

            <div>📷 High Resolution Photos</div>

            <div>📋 Detailed Inspection Findings</div>

            <div>🔧 Recommended Repairs</div>

            <div>⚠ Maintenance Priorities</div>

            <div>💲 Estimated Repair Costs</div>

            <div>📄 Professional PDF Report</div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="assessment-card">

          <div className="report-cover">

            <div className="report-top">
              PROPERTY ASSESSMENT REPORT
            </div>

            <div className="report-content">

              <small>JBTRADESMENLLC</small>

              <h3>
                Professional Property
                <br />
                Assessment
              </h3>

              <div className="report-divider"></div>

              <div className="report-list">

                <span>✓ Interior Inspection</span>

                <span>✓ Exterior Inspection</span>

                <span>✓ Property Photos</span>

                <span>✓ Repair Recommendations</span>

                <span>✓ Priority Ratings</span>

                <span>✓ Cost Estimates</span>

              </div>

              <div className="report-footer">

                <div>
                  <strong>PDF</strong>
                  <small>Professional Report</small>
                </div>

                <div>
                  <strong>$49</strong>
                  <small>Flat Rate</small>
                </div>

              </div>

              <a
                href="#estimate-form"
                className="primary-btn"
              >
                Request Assessment
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}