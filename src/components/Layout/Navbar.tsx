import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import './navbar.css'

const links = [
  { to: '/residential-services', label: 'Residential' },
  { to: '/commercial-services', label: 'Commercial' },
  { to: '/project-gallery', label: 'Gallery' },
  { to: '/who-we-work-with', label: 'Clients' },
  { to: '/resources', label: 'Resources' },
  { to: '/request-estimate', label: 'Estimate' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navbarRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const closeAfterNavigation = window.setTimeout(() => setIsMenuOpen(false), 0)
    return () => window.clearTimeout(closeAfterNavigation)
  }, [pathname])

  useEffect(() => {
    if (!isMenuOpen) return

    const originalOverflow = document.body.style.overflow
    const closeMenu = () => setIsMenuOpen(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      closeMenu()
      menuButtonRef.current?.focus()
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!navbarRef.current?.contains(event.target as Node)) closeMenu()
    }
    const handleResize = () => {
      if (window.innerWidth > 1150) closeMenu()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="navbar-shell" ref={navbarRef}>
      <div className="navbar-inner" onClick={(event) => { if ((event.target as Element).closest('a')) closeMenu() }}>
        <Logo />

        <button
          className="navbar-menu-toggle"
          type="button"
          ref={menuButtonRef}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav id="primary-navigation" className={`navbar-nav${isMenuOpen ? ' navbar-nav--open' : ''}`} aria-label="Primary">
          <ul className="navbar-links">
            <li className="navbar-mobile-home">
              <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            </li>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={closeMenu}>{link.label}</NavLink>
              </li>
            ))}
            <li className="navbar-mobile-call">
              <a href="tel:9702865993" onClick={closeMenu}>Call Now</a>
            </li>
          </ul>
        </nav>

        <a className="navbar-call-now" href="tel:9702865993">
          Call Now
        </a>
      </div>
    </header>
  )
}
