import './ProfessionalCredentials.css';
import { credentials } from '../../data/credentials';

export default function ProfessionalCredentials() {
  return (
    <section className="credentials-section">

      <div className="credentials-container">

        <p className="section-label">
          PROFESSIONAL CREDENTIALS
        </p>

        <h2>
          Trusted Qualifications
        </h2>

        <p className="credentials-intro">
          JBTRADESMENLLC provides professional residential,
          commercial and government maintenance services backed by
          nationally recognized certifications.
        </p>

        <div className="credentials-grid">

          {credentials.map((credential) => (

            <div
              key={credential}
              className="credential-card"
            >

              <div className="credential-check">
                ✓
              </div>

              <span>{credential}</span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}