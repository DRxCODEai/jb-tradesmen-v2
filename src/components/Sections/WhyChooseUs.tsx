import './WhyChooseUs.css';

const reasons = [
  {
    title: 'Licensed & Insured',
    description:
      'Fully licensed and insured for residential and commercial property maintenance.',
  },
  {
    title: 'Federal Contractor',
    description:
      'Active CAGE and UEI registrations for government and institutional projects.',
  },
  {
    title: '1,200+ Projects',
    description:
      'Successfully completed projects across residential, commercial and property management sectors.',
  },
  {
    title: '10+ Years Experience',
    description:
      'A decade of hands-on experience delivering dependable maintenance solutions.',
  },
  {
    title: 'Fast Response',
    description:
      'Most assessment requests receive a response within 72 hours.',
  },
  {
    title: 'Professional Reports',
    description:
      'Detailed digital assessment reports with photos, findings and repair recommendations.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="why-container">

        <span className="section-tag">
          WHY CHOOSE JBTRADESMENLLC
        </span>

        <h2>
          Professional.
          <br />
          Reliable.
          <br />
          Trusted.
        </h2>

        <p className="why-intro">
          We combine professional property assessments, quality workmanship,
          transparent communication and industry certifications to deliver
          dependable maintenance solutions for every client.
        </p>

        <div className="why-grid">

          {reasons.map((reason) => (

            <div
              key={reason.title}
              className="why-card"
            >

              <div className="why-icon">

                <div className="why-dot"></div>

              </div>

              <h3>
                {reason.title}
              </h3>

              <p>
                {reason.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}