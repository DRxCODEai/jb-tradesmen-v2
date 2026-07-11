import type { GalleryProject } from '../../types/gallery'
import ProjectCard from './ProjectCard'

export default function ProjectGrid({ projects, onOpen }: { projects: GalleryProject[]; onOpen: (project: GalleryProject, button: HTMLButtonElement) => void }) {
  return <div className="gallery-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} onOpen={(button) => onOpen(project, button)} />)}</div>
}
