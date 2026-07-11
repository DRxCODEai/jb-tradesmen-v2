import { useEffect } from 'react'
import GalleryPage from '../components/Gallery/GalleryPage'

export default function Gallery() {
  useEffect(() => {
    document.title = 'Project Gallery | JBTRADESMENLLC'
  }, [])

  return <GalleryPage />
}
