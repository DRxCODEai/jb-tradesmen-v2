import { useEffect } from 'react'
import ContactPage from '../components/Contact/ContactPage'

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact JBTRADESMENLLC | Residential & Commercial Services'
  }, [])

  return <ContactPage />
}
