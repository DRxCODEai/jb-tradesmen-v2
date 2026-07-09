import './CTASection.css';
import { KOALENDAR_URL } from '../../config/links';

export default function CTASection() {
  return (
    <section className="cta-section">

      <div className="cta-container">

        <span className="section-tag">
          READY TO GET STARTED?
        </span>

        <h2>
          Let's Build Your Next Project Together
        </h2>

        <p>
          Whether you need a professional property assessment,
          commercial maintenance, residential repairs,
          or ongoing facility support,
          JBTRADESMENLLC is ready to help.
        </p>

        <div className="cta-highlights">

          <span>Residential</span>

          <span>Commercial</span>

          <span>Property Management</span>

          <span>Government Contracting</span>

        </div>

        <div className="cta-buttons">

          <a
            href={KOALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="primary-btn"
          >
            Request Assessment
          </a>

          <a
            href="tel:9702865993"
            className="secondary-btn"
          >
            Call (970) 286-5993
          </a>

        </div>

      </div>

    </section>
  );
}