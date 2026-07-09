import './WhyChooseUs.css';

const reasons = [
  {
    title: 'Licensed & Insured',
    description:
      'Fully insured and committed to professional workmanship on every project.',
    icon: '🛡',
  },
  {
    title: 'Federal Contractor',
    description:
      'Registered Federal Contractor with active CAGE and UEI registrations.',
    icon: '🏛',
  },
  {
    title: '1,200+ Projects',
    description:
      'Extensive experience serving homeowners, businesses, and property managers.',
    icon: '🔨',
  },
  {
    title: '5-Star Service',
    description:
      'Built on professionalism, communication, and quality craftsmanship.',
    icon: '⭐',
  },
  {
    title: '72-Hour Response',
    description:
      'Responsive scheduling and communication for residential and commercial clients.',
    icon: '⚡',
  },
  {
    title: 'Professional Reports',
    description:
      'Detailed assessment reports with photographs, findings, repair priorities, and cost recommendations.',
    icon: '📄',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section">

      <div className="why-container">

        <span className="section-tag">
          WHY JBTRADESMENLLC
        </span>

        <h2>
          Experience You Can Trust.
          <br />
          Results You Can See.
        </h2>

        <p className="why-intro">
          We combine professional property assessments, commercial maintenance
          experience, and transparent communication to help our clients make
          informed decisions before every project.
        </p>

        <div className="why-grid">

          {reasons.map((reason) => (

            <div
              key={reason.title}
              className="why-card"
            >

              <div className="why-icon">
                {reason.icon}
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