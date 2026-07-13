import type { ReactNode } from 'react'
import './LogoGlow.css'

interface LogoGlowProps {
  children: ReactNode
  centered?: boolean
}

export default function LogoGlow({ children, centered = false }: LogoGlowProps) {
  const className = centered ? 'logo-glow logo-glow--centered' : 'logo-glow'

  return <span className={className}>{children}</span>
}
