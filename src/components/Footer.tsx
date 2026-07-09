import { Link } from 'react-router-dom'
import Logo from './Logo'

const quickLinks = [
  { label: 'Residential Services', href: '/residential-services' },
  { label: 'Commercial Services', href: '/commercial-services' },
  { label: 'Property Management', href: '/who-we-work-with' },
  { label: 'Gallery', href: '/project-gallery' },
  { label: 'Estimate', href: '/instant-project-estimate' },
  { label: 'Contact', href: '/contact' },
]

const serviceAreas = [
  {
    state: 'Colorado',
    cities: ['Fort Collins', 'Loveland', 'Greeley', 'Windsor'],
  },
  {
    state: 'Wyoming',
    cities: ['Cheyenne', 'Laramie'],
  },
  {
    state: 'Nevada',
    cities: ['Las Vegas', 'Henderson', 'North Las Vegas', 'Summerlin', 'Paradise'],
  },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <h2>JBTRADESMENLLC</h2>
          <p>Professional residential and commercial maintenance with the responsiveness and accountability your property deserves.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className="footer-list">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Service Area</h3>
          <ul className="footer-list">
            {serviceAreas.map((area) => (
              <li key={area.state}>
                <strong>{area.state}</strong>
                <div>{area.cities.join(' • ')}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul className="footer-list">
            <li>
              <a href="tel:9702865993">(970) 286-5993</a>
            </li>
            <li>
              <a href="mailto:Jerome@JBTradesmenLLC.com">Jerome@JBTradesmenLLC.com</a>
            </li>
            <li>Serving the Rockies with dependable maintenance support</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 JBTRADESMENLLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
