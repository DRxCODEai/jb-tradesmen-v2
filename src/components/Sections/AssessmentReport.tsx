import './AssessmentReport.css';
export default function AssessmentReport() {
  return (
    <section className="assessment-section">

      <div className="assessment-container">

        <div className="assessment-left">

          <span className="section-tag">
            PROPERTY ASSESSMENT REPORTS
          </span>

          <h2>
            Know Exactly What Your Property Needs
          </h2>

          <p>
            Our professional Property Assessment Reports help
            homeowners, commercial property owners, property
            managers, retail facilities and government agencies
            understand maintenance needs before committing to
            repairs.
          </p>

          <div className="assessment-grid">

            <div>✔ Detailed Property Inspection</div>

            <div>✔ High Resolution Photos</div>

            <div>✔ Repair Recommendations</div>

            <div>✔ Estimated Repair Costs</div>

            <div>✔ Maintenance Priorities</div>

            <div>✔ Professional PDF Report</div>

          </div>

        </div>

        <div className="assessment-card">

          <div className="report-header">
            PROFESSIONAL REPORT
          </div>

          <div className="report-body">

            <h3>$49</h3>

            <p>
              Flat-rate assessment for residential,
              commercial and property management clients.
            </p>

            <ul>

              <li>Residential</li>

              <li>Commercial</li>

              <li>Property Management</li>

              <li>Government Facilities</li>

            </ul>

            <a
              href="#estimate-form"
              className="primary-btn"
            >
              Request Assessment
            </a>

          </div>

        </div>

      </div>

    </section>
  );
}