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
            Every Property Assessment Report is designed to help you make
            informed decisions before spending thousands on repairs.

            Whether you're a homeowner, commercial property owner,
            property manager, financial institution or government agency,
            you'll receive professional documentation identifying current
            conditions, recommended repairs, maintenance priorities and
            estimated project costs.
          </p>

          <div className="assessment-grid">

            <div>📷 High Resolution Property Photos</div>

            <div>📋 Detailed Inspection Findings</div>

            <div>🔧 Professional Repair Recommendations</div>

            <div>⚠ Maintenance Priority Ranking</div>

            <div>💲 Estimated Repair Costs</div>

            <div>📄 Professional PDF Report</div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="assessment-card">

          <div className="report-header">
            PROFESSIONAL PROPERTY REPORT
          </div>

          <div className="report-body">

            <h3>
              $49
            </h3>

            <span className="report-price-label">
              Flat Rate Assessment
            </span>

            <p>
              A comprehensive on-site property assessment delivered
              as a professional PDF report complete with photographs,
              inspection findings, maintenance priorities and estimated
              repair recommendations.
            </p>

            <div className="report-benefits">

              <div>✔ Residential Properties</div>

              <div>✔ Commercial Facilities</div>

              <div>✔ Property Management</div>

              <div>✔ Financial Institutions</div>

              <div>✔ Government Agencies</div>

              <div>✔ Insurance Documentation</div>

            </div>

            <a
              href="#estimate-form"
              className="primary-btn"
            >
              Schedule Assessment
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}