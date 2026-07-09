import './ProcessTimeline.css';

const steps = [
  {
    number: '01',
    icon: '📅',
    title: 'Request Assessment',
    text: 'Submit your request online or call our office to discuss your project.',
  },
  {
    number: '02',
    icon: '📋',
    title: 'Project Review',
    text: 'We review your property information, photos, and maintenance needs.',
  },
  {
    number: '03',
    icon: '🔎',
    title: 'Professional Site Visit',
    text: 'Our technician performs an on-site inspection and documents findings.',
  },
  {
    number: '04',
    icon: '📄',
    title: 'Assessment Report',
    text: 'Receive a detailed Property Assessment Report with recommendations and pricing.',
  },
  {
    number: '05',
    icon: '✔',
    title: 'Project Scheduling',
    text: 'Approve the proposal and we schedule your project for completion.',
  },
];

export default function ProcessTimeline() {
  return (
    <section className="timeline-section">

      <div className="timeline-container">

        <span className="section-tag">
          OUR PROCESS
        </span>

        <h2>
          What Happens After You
          <br />
          Request an Assessment?
        </h2>

        <p className="timeline-intro">
          Every project follows a clear, professional process designed
          to keep you informed from your initial request through project
          completion.
        </p>

        <div className="timeline-grid">

          {steps.map((step) => (

            <div
              key={step.number}
              className="timeline-card"
            >

              <div className="timeline-number">
    {step.number}
</div>

<div className="timeline-icon">
    {step.icon}
</div>

              <h3>{step.title}</h3>

              <p>{step.text}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}