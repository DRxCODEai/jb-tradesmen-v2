export default function GalleryEmptyState({ onReset }: { onReset: () => void }) {
  return <div className="gallery-empty"><h3>No Projects Found</h3><p>No gallery projects currently match this category. Select another filter to continue browsing.</p><button className="gallery-button gallery-button--dark" type="button" onClick={onReset}>View All Projects</button></div>
}
