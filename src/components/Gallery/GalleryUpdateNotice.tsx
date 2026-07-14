import { Link } from 'react-router-dom'
import './GalleryUpdateNotice.css'

export default function GalleryUpdateNotice() {
  return (
    <section className="gallery-update" aria-labelledby="gallery-update-heading">
      <div className="gallery-shell">
        <div className="gallery-update__panel">
          <div className="gallery-update__content">
            <p className="gallery-update__label">Gallery Update</p>
            <h2 id="gallery-update-heading">Our New Project Gallery Is Coming Soon</h2>
            <p>
              As part of the recent JBTRADESMENLLC website restructure, we are currently organizing and
              uploading photography from completed residential, commercial, maintenance, remodeling,
              plumbing, HVAC, flooring, welding, and property-improvement projects.
            </p>
            <p>
              The project examples below represent the services and types of work featured in the upcoming
              gallery. Real project photography will be added as it is prepared for publication.
            </p>
            <p>Please check back soon as we continue adding completed work.</p>
          </div>

          <div className="gallery-update__actions">
            <Link to="/request-estimate">Request an Estimate</Link>
            <Link to="/contact">Contact JBTRADESMENLLC</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
