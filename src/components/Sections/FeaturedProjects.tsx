import './FeaturedProjects.css';

const projects = [
  {
    title: 'Commercial Property Maintenance',
    location: 'Colorado',
    category: 'Commercial',
    description:
      'Preventative maintenance, repairs, and facility support for commercial buildings and business owners.',
  },
  {
    title: 'Retail Facility Repairs',
    location: 'Wyoming',
    category: 'Retail',
    description:
      'Responsive repair services for retail stores, restaurants, and customer-facing businesses.',
  },
  {
    title: 'Property Management Services',
    location: 'Nevada',
    category: 'Property Management',
    description:
      'Reliable maintenance solutions for property managers, apartment communities, and rental portfolios.',
  },
];

export default function FeaturedProjects() {
  return (
    <section className="projects-section">

      <div className="projects-container">

        <span className="section-tag">
          FEATURED PROJECTS
        </span>

        <h2>
          Built on Quality.
          <br />
          Backed by Experience.
        </h2>

        <p className="projects-intro">
          JBTRADESMENLLC provides professional residential and commercial
          maintenance throughout Colorado, Wyoming, and Nevada. Every project
          is completed with a commitment to quality workmanship, clear
          communication, and dependable service.
        </p>

        <div className="projects-grid">

          {projects.map((project) => (

            <div
              key={project.title}
              className="project-card"
            >

              <div className="project-image">

                <span>
                  Project Photo
                  <br />
                  Coming Soon
                </span>

              </div>

              <div className="project-content">

                <small>
                  {project.category}
                </small>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                <p className="project-location">
                  📍 {project.location}
                </p>

                <a
                  href="/project-gallery"
                  className="project-button"
                >
                  View Project →
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}