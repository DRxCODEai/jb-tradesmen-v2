import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { KOALENDAR_URL } from '../../config/links'
import type { GalleryProject } from '../../types/gallery'
import GalleryProjectImage from './GalleryProjectImage'

interface ProjectModalProps {
  project: GalleryProject | null
  opener: HTMLButtonElement | null
  onClose: () => void
}

export default function ProjectModal({ project, opener, onClose }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      opener?.focus()
    }
  }, [project, onClose, opener])

  if (!project) return null
  const image = project.images[activeImage]
  const selectRelative = (offset: number) => setActiveImage((current) => (current + offset + project.images.length) % project.images.length)
  const markFailed = (index: number) => setFailedImages((current) => new Set(current).add(index))

  return (
    <div className="gallery-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="gallery-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title">
        <header className="gallery-modal__header"><div><span>{project.category}</span><h2 id="gallery-modal-title">{project.title}</h2></div><button ref={closeRef} type="button" onClick={onClose}>Close Project</button></header>
        <div className="gallery-modal__scroll">
          <div className="gallery-modal__viewer">
            <div className="gallery-modal__active-image">
              {failedImages.has(activeImage) ? <div className="gallery-image-fallback"><strong>{project.title}</strong><span>Project image unavailable</span></div> : <GalleryProjectImage image={image} projectTitle={project.title} onError={() => markFailed(activeImage)} />}
              {image.label && <span className="gallery-modal__image-label">{image.label}</span>}
              <button type="button" className="gallery-modal__previous" aria-label="Previous project image" onClick={() => selectRelative(-1)}><ChevronLeft aria-hidden="true" /></button>
              <button type="button" className="gallery-modal__next" aria-label="Next project image" onClick={() => selectRelative(1)}><ChevronRight aria-hidden="true" /></button>
            </div>
            <p className="gallery-modal__count" aria-live="polite">{activeImage + 1} of {project.images.length}</p>
            <div className="gallery-modal__thumbnails" aria-label="Project image selection">
              {project.images.map((thumbnail, index) => <button type="button" key={thumbnail.src} aria-label={`View project image ${index + 1}`} aria-current={activeImage === index ? 'true' : undefined} onClick={() => setActiveImage(index)}>{failedImages.has(index) ? <span>Unavailable</span> : <img src={thumbnail.src} alt="" loading="lazy" onError={() => markFailed(index)} />}<small>{thumbnail.label}</small></button>)}
            </div>
          </div>
          <div className="gallery-modal__details">
            <div className="gallery-modal__facts"><p><span>Location</span>{project.location}</p><p><span>Property type</span>{project.propertyType}</p>{project.clientDisplayName && <p><span>Client / facility</span>{project.clientDisplayName}</p>}</div>
            <section><h3>Project overview</h3><p>{project.overview}</p></section>
            <div className="gallery-modal__columns"><section><h3>Services performed</h3><ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul></section><section><h3>Key project details</h3><ul>{project.projectDetails.map((detail) => <li key={detail}>{detail}</li>)}</ul></section></div>
            <section className="gallery-modal__outcome"><h3>Project outcome</h3><p>{project.outcome}</p></section>
          </div>
        </div>
        <footer className="gallery-modal__actions"><Link className="gallery-button gallery-button--gold" to="/request-estimate" onClick={onClose}>Request Similar Service</Link><a className="gallery-button gallery-button--dark" href={KOALENDAR_URL} target="_blank" rel="noopener noreferrer">Schedule Assessment</a><button className="gallery-button gallery-button--plain" type="button" onClick={onClose}>Close</button></footer>
      </div>
    </div>
  )
}
