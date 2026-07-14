import type { GalleryImage } from '../../types/gallery'

interface GalleryProjectImageProps {
  image: GalleryImage
  projectTitle: string
  loading?: 'eager' | 'lazy'
  onError: () => void
}

export default function GalleryProjectImage({ image, projectTitle, loading, onError }: GalleryProjectImageProps) {
  const isPlaceholder = image.src.toLowerCase().endsWith('.svg')
  const placeholderLabel = image.src.toLowerCase().endsWith('/cover.svg')
    ? 'Cover Image'
    : `Project Photo${image.label ? ` · ${image.label}` : ''}`

  return (
    <>
      <img
        className={isPlaceholder ? 'gallery-placeholder-image' : undefined}
        src={image.src}
        alt={image.alt}
        loading={loading}
        onError={onError}
      />
      {isPlaceholder && (
        <span className="gallery-placeholder-copy" aria-hidden="true">
          <small>{placeholderLabel}</small>
          <strong>{projectTitle}</strong>
          <span>Replace this file with project photography</span>
        </span>
      )}
    </>
  )
}
