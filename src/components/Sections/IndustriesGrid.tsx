import './IndustriesGrid.css';

const industries = [
  {
    title: 'Residential',
    description:
      'Repairs, maintenance, remodels and home improvement services for homeowners.'
  },
  {
    title: 'Commercial',
    description:
      'Maintenance solutions for offices, retail stores, restaurants and facilities.'
  },
  {
    title: 'Property Management',
    description:
      'Turnovers, inspections, work orders and preventative maintenance.'
  },
  {
    title: 'Financial Institutions',
    description:
      'Banks, credit unions and financial facilities requiring dependable service.'
  },
  {
    title: 'Government',
    description:
      'Federal, state and municipal maintenance performed to professional standards.'
  },
  {
    title: 'Retail & Multi-Site',
    description:
      'Nationwide and regional maintenance programs for retail and franchise locations.'
  }
];

export default function IndustriesGrid() {
  return (
    <section className="industries-section">

      <div className="industries-container">

        <span className="section-tag">
          WHO WE SERVE
        </span>

        <h2>
          Industries We Proudly Serve
        </h2>

        <p className="industries-intro">
          From homeowners to national commercial clients, our team
          delivers dependable maintenance solutions backed by
          professional communication and quality workmanship.
        </p>

        <div className="industries-grid">

          {industries.map((industry) => (

            <div
              key={industry.title}
              className="industry-card"
            >

              <div className="industry-icon">
                ◆
              </div>

              <h3>{industry.title}</h3>

              <p>{industry.description}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}