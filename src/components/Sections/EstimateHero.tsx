import './EstimateHero.css';
import logo from '../../assets/logo.png';

export default function EstimateHero() {
  return (
    <section className="estimate-hero">

      <div className="estimate-overlay">

        {/* LEFT SIDE */}

        <div className="estimate-left">

          <span className="estimate-tag">
            PROFESSIONAL PROPERTY ASSESSMENTS
          </span>

          <h1>
            Professional Property
            <br />
            <span>Assessment</span>
          </h1>

          <p>
            Receive a professional Property Assessment Report designed for
            homeowners, commercial facilities, property managers,
            financial institutions, retail facilities, and government
            agencies.

            Every assessment includes detailed findings,
            photographs, repair recommendations, maintenance
            priorities, and a professional estimate.
          </p>

          <div className="estimate-badges">

            <div className="badge">Residential</div>

            <div className="badge">Commercial</div>

            <div className="badge">Property Management</div>

            <div className="badge">Financial Institutions</div>

            <div className="badge">Government</div>

          </div>

          <div className="trust-strip">

            <span>✓ Licensed &amp; Insured</span>

            <span>✓ OSHA 30 Certified</span>

            <span>✓ Federal Contractor</span>

            <span>✓ 1,200+ Projects</span>

            <span>✓ 10+ Years Experience</span>

            <span>✓ 0–72 Hour Response</span>

          </div>

          <div className="estimate-buttons">

            <a
              href="#assessment-report"
              className="primary-btn"
            >
              Request Property Assessment
            </a>

            <a
              href="#sample-report"
              className="secondary-btn"
            >
              View Sample Report
            </a>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="estimate-right">

          <div className="brand-card">

            <img
              src={logo}
              alt="JBTRADESMENLLC"
              className="brand-logo"
            />

            <div className="brand-divider"></div>

            <h3>
              Professional Property Assessment Reports
            </h3>

            <p>
              Residential, Commercial, Property Management,
              Financial Institutions and Government Facilities.
            </p>

            <div className="brand-checks">

              <span>✓ Licensed &amp; Insured</span>

              <span>✓ OSHA 30 Certified</span>

              <span>✓ EPA 608 &amp; 609 Certified</span>

              <span>✓ Federal Contractor</span>

            </div>

            <div className="brand-stats">

              <div>
                <strong>1,200+</strong>
                <small>Projects</small>
              </div>

              <div>
                <strong>10+</strong>
                <small>Years</small>
              </div>

              <div>
                <strong>CO • WY • NV</strong>
                <small>Serving</small>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}