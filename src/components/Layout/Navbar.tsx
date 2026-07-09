import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import './navbar.css'

const links = [
  { to: '/residential-services', label: 'Residential' },
  { to: '/commercial-services', label: 'Commercial' },
  { to: '/project-gallery', label: 'Gallery' },
  { to: '/who-we-work-with', label: 'Clients' },
  { to: '/resources', label: 'Resources' },
  { to: '/instant-project-estimate', label: 'Estimate' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="navbar-shell">
      <div className="navbar-inner">
        <Logo />

        <nav className="navbar-nav" aria-label="Primary">
          <ul className="navbar-links">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a className="navbar-call-now" href="/contact">
          Call Now
        </a>
      </div>
    </header>
  )
}
