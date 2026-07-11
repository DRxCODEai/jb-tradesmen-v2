import type { GalleryCategory } from '../../types/gallery'

export type GalleryFilter = 'All Projects' | GalleryCategory

const galleryFilters: GalleryFilter[] = ['All Projects', 'Commercial', 'Residential', 'Property Maintenance', 'Repairs', 'Facility Improvements']

export default function GalleryFilters({ activeFilter, onChange }: { activeFilter: GalleryFilter; onChange: (filter: GalleryFilter) => void }) {
  return (
    <div className="gallery-filters" aria-label="Filter gallery projects">
      {galleryFilters.map((filter) => (
        <button type="button" key={filter} aria-pressed={activeFilter === filter} onClick={() => onChange(filter)}>{filter}</button>
      ))}
    </div>
  )
}
