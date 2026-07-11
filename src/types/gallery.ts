export type GalleryCategory =
  | 'Commercial'
  | 'Residential'
  | 'Property Maintenance'
  | 'Repairs'
  | 'Facility Improvements'

export interface GalleryImage {
  src: string
  alt: string
  label?: 'Before' | 'During' | 'After' | 'Completed'
}

export interface GalleryProject {
  id: string
  slug: string
  title: string
  shortTitle: string
  category: GalleryCategory
  filterCategories: GalleryCategory[]
  location: string
  propertyType: string
  clientDisplayName?: string
  summary: string
  overview: string
  services: string[]
  projectDetails: string[]
  outcome: string
  coverImage: GalleryImage
  images: GalleryImage[]
  featured: boolean
}
