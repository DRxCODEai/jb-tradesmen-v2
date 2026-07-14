import heroImage from "../assets/hero-homepage-v1.png";
import ReviewCarousel from "../components/UI/ReviewCarousel";
import "./Home.css";

import {
  Star,
  Home as HomeIcon,
  Zap,
  Building2,
  MapPin,
} from "lucide-react";

const trustStats = [
  {
    icon: '★',
    title: '5-Star Rated',
    description: 'Consistently recognized for excellence in communication, craftsmanship, and follow-through.',
  },
  {
    icon: '⌂',
    title: 'Residential & Commercial',
    description: 'Reliable support for homes, offices, retail spaces, property managers, and facilities.',
  },
  {
    icon: '✓',
    title: 'Licensed & Insured',
    description: 'Professional service backed by the proper credentials and accountability.',
  },
  {
    icon: '⚡',
    title: 'Fast Response',
    description: 'Responsive, efficient service for urgent repairs and planned maintenance.',
  },
  {
    icon: '◫',
    title: 'Property Management Specialists',
    description: 'Turnover support, make-readies, inspections, preventative maintenance, and punch lists.',
  },
  {
    icon: '◌',
    title: 'Colorado • Wyoming • Nevada',
    description: 'Serving the Rocky Mountain region with dependable regional coverage.',
  },
]

const serviceAreaGroups = [
  {
    state: 'Colorado',
    cities: ['Fort Collins', 'Loveland', 'Greeley', 'Windsor', 'Timnath', 'Johnstown'],
  },
  {
    state: 'Wyoming',
    cities: ['Cheyenne', 'Laramie'],
  },
  {
    state: 'Nevada',
    cities: ['Las Vegas', 'Henderson', 'North Las Vegas', 'Summerlin', 'Spring Valley', 'Paradise'],
  },
]

const serviceHighlights = [
  {
    title: 'Residential Services',
    description:
      'Interior and exterior repairs, drywall, painting, flooring, trim, doors, fixtures, remodeling, and ongoing home maintenance.',
    icon: '⌂',
  },
  {
    title: 'Commercial Maintenance',
    description:
      'Maintenance and repair services for offices, retail stores, banks, restaurants, and commercial facilities.',
    icon: '▣',
  },
  {
    title: 'Property Management Support',
    description:
      'Property turnovers, make-readies, inspections, punch lists, preventative maintenance, and tenant-ready repairs.',
    icon: '◫',
  },
  {
    title: 'Emergency Repairs',
    description:
      'Rapid-response repair services that minimize downtime and protect residential and commercial properties.',
    icon: '⚡',
  },
]

const clientSegments = [
  { title: 'Residential Homeowners', icon: '⌂' },
  { title: 'Property Management Companies', icon: '⌘' },
  { title: 'Retail Centers', icon: '◫' },
  { title: 'Financial Institutions', icon: '▤' },
  { title: 'HOA Communities', icon: '◌' },
  { title: 'Commercial Facilities', icon: '⬢' },
  { title: 'Office Buildings', icon: '◈' },
]

const featuredProjects = [
  {
    title: 'Property Turnover',
    location: 'Fort Collins, Colorado',
    service: 'Turnover Support & Property Readiness',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Retail Maintenance',
    location: 'Greeley, Colorado',
    service: 'Preventative Maintenance & Repairs',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Commercial Facility Repairs',
    location: 'Cheyenne, Wyoming',
    service: 'Commercial Repairs & Facility Support',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bank Maintenance',
    location: 'Cheyenne, Wyoming',
    service: 'Maintenance & Responsive Service',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Property Management Support',
    location: 'Colorado, Wyoming & Nevada',
    service: 'Make-Ready Coordination & Punch Lists',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Commercial Maintenance',
    location: 'Las Vegas, Nevada',
    service: 'Multi-Site Maintenance & Emergency Response',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80',
  },
]

const customerStories = [
  {
    name: 'David M.',
    quote:
      'JBTRADESMENLLC showed up quickly, communicated clearly, and took ownership of the entire project. The workmanship was excellent, and the experience felt organized from start to finish.',
  },
  {
    name: 'Michael P.',
    quote:
      'We needed dependable support across multiple properties and they delivered every time. Their team was professional, efficient, and easy to work with under pressure.',
  },
  {
    name: 'Sarah K.',
    quote:
      'The attention to detail was outstanding. From the estimate through completion, they were responsive, honest, and committed to quality in a way that gave us confidence.',
  },
]

const bbbReview = {
  name: 'Dan B.',
  title: 'Better Business Bureau Review',
  review:
    'Exceptional service at a fair price. The team was responsive, honest, and detail-oriented, and the completed work exceeded expectations.',
}

export default function Home() {
  return (
    <div className="home-page">
        <section className="hero-section">
  <div className="hero-image-wrapper">
    <img
      src={heroImage}
      alt="JBTRADESMENLLC Residential & Commercial Maintenance"
      className="hero-image"
    />

   <a
  href="/request-estimate"
  className="hero-overlay hero-estimate"
  aria-label="Request a Property Assessment"
/>

    <a
      href="tel:9702865993"
      className="hero-overlay hero-call"
      aria-label="Call JBTRADESMENLLC"
    />
  </div>
</section>
<section className="hero-feature-strip">

<div className="hero-feature-item">
    <Star size={34} strokeWidth={2.5} />
    <div>
        <strong>5-Star Rated</strong>
        <span>Trusted by Hundreds of Clients</span>
    </div>
</div>

<div className="hero-feature-item">
    <HomeIcon size={34} strokeWidth={2.5} />
    <div>
        <strong>Residential & Commercial</strong>
        <span>Maintenance Experts</span>
    </div>
</div>

<div className="hero-feature-item">
    <Zap size={34} strokeWidth={2.5} />
    <div>
        <strong>Fast Response</strong>
        <span>Quick & Reliable</span>
    </div>
</div>

<div className="hero-feature-item">
    <Building2 size={34} strokeWidth={2.5} />
    <div>
        <strong>Property Management</strong>
        <span>Preferred Vendor</span>
    </div>
</div>

<div className="hero-feature-item">
    <MapPin size={34} strokeWidth={2.5} />
    <div>
        <strong>Colorado • Wyoming • Nevada</strong>
        <span>Licensed Regional Coverage</span>
    </div>
</div>

</section>
    <section className="content-section trust-section">
        <div className="section-heading trust-heading">
          <p className="section-label">Trust &amp; Service Area</p>
          <h2>Trusted Throughout Colorado, Wyoming &amp; Nevada</h2>
          <p className="section-copy">
            Trusted maintenance and repair solutions for homeowners, property managers, financial institutions, retail facilities, HOA communities, and commercial properties across Colorado, Wyoming, and Nevada.
          </p>
        </div>
        <div className="trust-stats-grid">
          {trustStats.map((stat) => (
            <article key={stat.title} className="info-card trust-card">
              <div className="card-icon" aria-hidden="true">
                {stat.icon}
              </div>
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </article>
          ))}
        </div>
        <div className="service-area-grid">
          {serviceAreaGroups.map((group) => (
            <article key={group.state} className="service-area-card">
              <h3>{group.state}</h3>
              <div className="service-area-cities">
                {group.cities.map((city) => (
                  <span key={city} className="service-area-chip">
                    {city}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Our Services</p>
          <h2>Comprehensive maintenance and repair solutions</h2>
        </div>
        <div className="card-grid">
          {serviceHighlights.map((service) => (
            <article key={service.title} className="info-card service-card">
              <div className="card-icon" aria-hidden="true">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section alt-section">
        <div className="section-heading">
          <p className="section-label">Industries We Serve</p>
          <h2>Professional support for a broad range of residential and commercial clients</h2>
        </div>
        <div className="card-grid client-grid">
          {clientSegments.map((client) => (
            <article key={client.title} className="info-card client-card">
              <div className="card-icon" aria-hidden="true">
                {client.icon}
              </div>
              <h3>{client.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <ReviewCarousel />

      <section className="content-section alt-section review-section bbb-section">
        <div className="section-heading review-heading">
          <p className="section-label section-label-with-badge">
            <span className="bbb-badge">BBB</span>
            Better Business Bureau Reviews
          </p>
          <h2>Additional verified customer feedback from the Better Business Bureau.</h2>
        </div>
        <div className="review-carousel">
          <article className="review-card bbb-card">
            <div className="review-card-top">
              <div className="review-stars" aria-label="Rated 5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={`${bbbReview.name}-${index}`}>★</span>
                ))}
              </div>
              <span className="review-badge">BBB Verified</span>
            </div>
            <div className="review-quote">“</div>
            <p className="review-text">{bbbReview.review}</p>
            <div className="review-author">
              <h3>{bbbReview.name}</h3>
              <p>{bbbReview.title}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Featured Projects</p>
          <h2>Recent residential and commercial work completed across Colorado, Wyoming and Nevada</h2>
        </div>
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-media">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-location">{project.location}</p>
                <p className="project-service">{project.service}</p>
                <a className="text-link" href="/project-gallery">
                  View Project
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section alt-section">
        <div className="section-heading">
          <p className="section-label">Customer Success Stories</p>
          <h2>Long-form feedback from clients about their experience working with JBTRADESMENLLC</h2>
        </div>
        <div className="story-grid">
          {customerStories.map((story) => (
            <article key={story.name} className="info-card story-card">
              <div className="story-quote" aria-hidden="true">
                “
              </div>
              <div className="story-stars" aria-label="Five star testimonial">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={`${story.name}-${index}`}>★</span>
                ))}
              </div>
              <p>{story.quote}</p>
              <div className="story-author">
                <h3>{story.name}</h3>
                <p>Client Experience</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-label">Request an Estimate</p>
          <h2>Let’s talk about your property maintenance needs</h2>
        </div>
        <div className="estimate-card">
          <div className="estimate-copy">
            <p>
              Start with a consultation and receive a tailored estimate for your project,
              whether it is a single repair or a long-term maintenance plan.
            </p>
          </div>
          <div className="estimate-actions">
            <a className="primary-cta" href="/request-estimate">
  Request Property Assessment
</a>
            <a
  className="secondary-cta dark-cta"
  href="/instant-project-estimate"
>
  Try AI Instant Estimate
</a>
          </div>
        </div>
      </section>
    </div>
  )
}
