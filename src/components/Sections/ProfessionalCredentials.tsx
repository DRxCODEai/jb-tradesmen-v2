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
          Certified.
          <br />
          Qualified.
          <br />
          Trusted.
        </h2>

        <p className="credentials-intro">
          JBTRADESMENLLC maintains nationally recognized certifications,
          contractor registrations and professional qualifications that
          support residential, commercial, retail, property management,
          financial institution and government maintenance projects.
        </p>

        <div className="credentials-grid">

          {credentials.map((credential) => (

            <div
              key={credential.title}
              className="credential-card"
            >

              <div className="credential-icon">

                <img
                  src={credential.image}
                  alt={credential.title}
                />

              </div>

              <div className="credential-content">

                <h3>
                  {credential.title}
                </h3>

                <p>
                  {credential.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}