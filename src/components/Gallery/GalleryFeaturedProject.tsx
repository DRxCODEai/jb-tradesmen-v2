import { useState } from 'react'
import { MapPin } from 'lucide-react'
import type { GalleryProject } from '../../types/gallery'
import GalleryProjectImage from './GalleryProjectImage'

export default function GalleryFeaturedProject({ project, onOpen }: { project: GalleryProject; onOpen: (button: HTMLButtonElement) => void }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <section className="gallery-featured" aria-labelledby="featured-project-heading">
      <div className="gallery-shell gallery-featured__layout">
        <div className="gallery-featured__media">
          {imageFailed ? <div className="gallery-image-fallback"><strong>{project.title}</strong><span>Project image unavailable</span></div> :
            <GalleryProjectImage image={project.coverImage} projectTitle={project.title} onError={() => setImageFailed(true)} />}
        </div>
        <div className="gallery-featured__content">
          <p className="gallery-eyebrow">Featured Project · {project.category}</p>
          <h2 id="featured-project-heading">{project.title}</h2>
          <p className="gallery-location"><MapPin size={17} aria-hidden="true" />{project.location} · {project.propertyType}</p>
          <p>{project.summary}</p>
          <ul className="gallery-featured__services">{project.services.slice(0, 4).map((service) => <li key={service}>{service}</li>)}</ul>
          <button className="gallery-button gallery-button--gold" type="button" onClick={(event) => onOpen(event.currentTarget)}>View Featured Project</button>
        </div>
      </div>
    </section>
  )
}
