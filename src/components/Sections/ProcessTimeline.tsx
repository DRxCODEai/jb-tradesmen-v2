import './ProcessTimeline.css';

const steps = [
  {
    number: '01',
    icon: '📅',
    title: 'Request Assessment',
    text: 'Submit your request online or give us a call to discuss your project.',
  },
  {
    number: '02',
    icon: '📋',
    title: 'Project Review',
    text: 'We review property details, photos, and maintenance needs.',
  },
  {
    number: '03',
    icon: '🔎',
    title: 'Professional Site Visit',
    text: 'Our technician performs a detailed on-site inspection.',
  },
  {
    number: '04',
    icon: '📄',
    title: 'Assessment Report',
    text: 'Receive a professional report with recommendations and pricing.',
  },
  {
    number: '05',
    icon: '✔',
    title: 'Schedule Project',
    text: "Approve your proposal and we'll schedule the work.",
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
          From your first phone call to project completion, we keep the
          process simple, transparent, and professional.
        </p>

        <div className="timeline">

          {steps.map((step) => (

            <div
              key={step.number}
              className="timeline-item"
            >

              <div className="timeline-circle">

                <span>{step.number}</span>

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