import { useState } from 'react'
import { MapPin } from 'lucide-react'
import type { GalleryProject } from '../../types/gallery'
import GalleryProjectImage from './GalleryProjectImage'

export default function ProjectCard({ project, onOpen }: { project: GalleryProject; onOpen: (button: HTMLButtonElement) => void }) {
  const [imageFailed, setImageFailed] = useState(false)
  return (
    <article className="gallery-card">
      <div className="gallery-card__media">
        {imageFailed ? <div className="gallery-image-fallback"><strong>{project.shortTitle}</strong><span>Project image unavailable</span></div> :
          <GalleryProjectImage image={project.coverImage} projectTitle={project.title} loading="lazy" onError={() => setImageFailed(true)} />}
        <span className="gallery-badge">{project.category}</span>
      </div>
      <div className="gallery-card__body">
        <h3>{project.shortTitle}</h3>
        <p className="gallery-location"><MapPin size={16} aria-hidden="true" />{project.location}</p>
        <p>{project.summary}</p>
        <ul className="gallery-tags" aria-label="Services performed">{project.services.slice(0, 3).map((service) => <li key={service}>{service}</li>)}</ul>
        <button className="gallery-link-button" type="button" onClick={(event) => onOpen(event.currentTarget)}>View Project</button>
      </div>
    </article>
  )
}
