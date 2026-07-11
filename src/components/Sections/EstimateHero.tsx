import { useState } from 'react';
import './EstimateHero.css';
import logo from '../../assets/logo.png';
import { KOALENDAR_URL } from '../../config/links';
import SampleAssessmentModal from '../Estimate/SampleAssessmentModal';

export default function EstimateHero() {
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  return (
    <section className="estimate-hero">
      <div className="estimate-overlay">

        {/* LEFT */}

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
            financial institutions, retail facilities and government agencies.

            Every assessment includes detailed findings,
            photographs, repair recommendations,
            maintenance priorities and a professional estimate.
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
              href={KOALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn"
            >
              Request Property Assessment
            </a>

            <a
              href="#sample-report"
              onClick={(event) => {
                event.preventDefault();
                setIsSampleOpen(true);
              }}
              className="secondary-btn"
            >
              View Sample Report
            </a>

          </div>

        </div>

        {/* RIGHT */}

        <div className="estimate-right">

          <div className="brand-card">

            <img
              src={logo}
              alt="JBTRADESMENLLC"
              className="brand-logo"
            />

            <div className="brand-divider"></div>

            <h3>JBTRADESMENLLC</h3>

            <p className="brand-subtitle">
              Professional Property Assessments
            </p>

            <div className="brand-dashboard">

              <div className="dashboard-item">
                <strong>1,200+</strong>
                <span>Projects Completed</span>
              </div>

              <div className="dashboard-item">
                <strong>10+</strong>
                <span>Years Experience</span>
              </div>

              <div className="dashboard-item">
                <strong>★★★★★</strong>
                <span>5-Star Rating</span>
              </div>

              <div className="dashboard-item">
                <strong>CO • WY • NV</strong>
                <span>Serving</span>
              </div>

            </div>

            <div className="brand-divider"></div>

            <div className="brand-checks">

              <span>✓ Licensed &amp; Insured</span>

              <span>✓ OSHA 30 Certified</span>

              <span>✓ EPA 608 &amp; 609 Certified</span>

              <span>✓ Federal Contractor</span>

              <span>✓ CAGE: 13SR1</span>

              <span>✓ UEI: PKT6EMEN5BJ9</span>

            </div>

          </div>

        </div>

      </div>
      <SampleAssessmentModal
        isOpen={isSampleOpen}
        onClose={() => setIsSampleOpen(false)}
      />
    </section>
  );
}
