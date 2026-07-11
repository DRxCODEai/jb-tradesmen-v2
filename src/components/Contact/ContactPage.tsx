import ContactForm from './ContactForm'
import ContactHero from './ContactHero'
import ContactInformation from './ContactInformation'
import ContactOptions from './ContactOptions'
import ContactServiceAreas from './ContactServiceAreas'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <main className="contact-page">
      <ContactHero />
      <ContactOptions />
      <ContactForm />
      <ContactInformation />
      <ContactServiceAreas />
    </main>
  )
}
