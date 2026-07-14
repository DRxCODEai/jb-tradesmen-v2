import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function Logo() {
  return (
    <Link to="/" className="navbar-logo" aria-label="JBTRADESMENLLC home">
      <img
        src={logo}
        alt="JBTRADESMENLLC"
      />
    </Link>
  )
}
