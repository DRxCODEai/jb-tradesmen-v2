import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="navbar-logo" aria-label="JBTRADESMENLLC home">
      <img
        src="/src/assets/logo.png"
        alt="JBTRADESMENLLC"
      />
    </Link>
  )
}
