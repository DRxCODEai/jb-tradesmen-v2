import { useCallback, useState } from 'react'
import { galleryProjects } from '../../data/galleryProjects'
import type { GalleryProject } from '../../types/gallery'
import GalleryCTA from './GalleryCTA'
import GalleryEmptyState from './GalleryEmptyState'
import GalleryFeaturedProject from './GalleryFeaturedProject'
import GalleryFilters, { type GalleryFilter } from './GalleryFilters'
import GalleryHero from './GalleryHero'
import GalleryUpdateNotice from './GalleryUpdateNotice'
import ProjectGrid from './ProjectGrid'
import ProjectModal from './ProjectModal'
import './GalleryPage.css'

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>('All Projects')
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null)
  const [opener, setOpener] = useState<HTMLButtonElement | null>(null)
  const featuredProject = galleryProjects.find((project) => project.featured) ?? galleryProjects[0]
  const filteredProjects = activeFilter === 'All Projects' ? galleryProjects : galleryProjects.filter((project) => project.filterCategories.includes(activeFilter))
  const openProject = (project: GalleryProject, button: HTMLButtonElement) => { setOpener(button); setSelectedProject(project) }
  const closeProject = useCallback(() => setSelectedProject(null), [])

  return <main className="gallery-page"><GalleryHero /><GalleryUpdateNotice /><GalleryFeaturedProject project={featuredProject} onOpen={(button) => openProject(featuredProject, button)} /><section className="gallery-projects" aria-labelledby="gallery-projects-heading"><div className="gallery-shell"><div className="gallery-section-heading"><p className="gallery-eyebrow">Completed Work</p><h2 id="gallery-projects-heading">Browse Our Projects</h2><p>Filter by project type to explore relevant repairs, maintenance, and property improvements.</p></div><GalleryFilters activeFilter={activeFilter} onChange={setActiveFilter} />{filteredProjects.length ? <ProjectGrid projects={filteredProjects} onOpen={openProject} /> : <GalleryEmptyState onReset={() => setActiveFilter('All Projects')} />}</div></section><GalleryCTA /><ProjectModal key={selectedProject?.id ?? 'closed'} project={selectedProject} opener={opener} onClose={closeProject} /></main>
}
