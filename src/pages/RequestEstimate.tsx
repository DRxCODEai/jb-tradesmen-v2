import '../styles/RequestEstimate.css';

export default function RequestEstimate() {
  return (
    <div className="request-estimate-page">

      <section className="estimate-hero">
        <div className="estimate-container">

          <p className="estimate-label">
            PROFESSIONAL PROPERTY ASSESSMENTS & ESTIMATES
          </p>

         <h1>
  Professional Property
  <br />
  <span>Assessment & Estimate</span>
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
      </section>

    </div>
  );
}