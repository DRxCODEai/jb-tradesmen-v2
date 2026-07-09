import './ProfessionalCredentials.css';
import { credentials } from '../../data/credentials';

export default function ProfessionalCredentials() {
  return (
    <section className="credentials-section">

      <div className="credentials-container">

        <span className="section-tag">
          PROFESSIONAL CREDENTIALS
        </span>

        <h2>
          Certifications & Professional Qualifications
        </h2>

        <p className="credentials-intro">
          JBTRADESMENLLC maintains nationally recognized certifications,
          licensing and contractor registrations to support residential,
          commercial, retail, financial institution and government
          maintenance projects.
        </p>

        <div className="credentials-grid">

          {credentials.map((credential) => (

            <div
              key={credential}
              className="credential-card"
            >

              <div className="credential-icon">
                ✓
              </div>

              <h3>{credential}</h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}