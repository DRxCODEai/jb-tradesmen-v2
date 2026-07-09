import './ProfessionalCredentials.css';
import { credentials } from '../../data/credentials';

export default function ProfessionalCredentials() {
  return (
    <section className="credentials-section">

      <div className="credentials-container">

        <div className="credentials-heading">

          <p className="section-label">
            PROFESSIONAL CREDENTIALS
          </p>

          <h2>
            Trusted by Property Owners,
            Businesses & Government Agencies
          </h2>

          <p>
            JBTRADESMENLLC delivers professional maintenance,
            repair, inspections and property assessments backed
            by nationally recognized certifications and federal
            contractor registration.
          </p>

        </div>

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

                <h3>{credential.title}</h3>

                <p>{credential.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}