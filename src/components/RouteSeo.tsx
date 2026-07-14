import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://www.jbtradesmenllc.com'

interface RouteSeoConfig {
  title: string
  description: string
  canonicalPath: string
}

const routeSeo: Record<string, RouteSeoConfig> = {
  '/': {
    title: 'JBTRADESMENLLC | Residential & Commercial Property Services',
    description:
      'Professional residential repairs, commercial maintenance, remodeling, property assessments, and facility services.',
    canonicalPath: '/',
  },
  '/residential-services': {
    title: 'Residential Repair & Maintenance Services | JBTRADESMENLLC',
    description:
      'Professional residential repairs, maintenance, remodeling, inspections, and home improvements throughout Colorado, Wyoming, and Nevada.',
    canonicalPath: '/residential-services',
  },
  '/commercial-services': {
    title: 'Commercial Maintenance & Facility Services | JBTRADESMENLLC',
    description:
      'Dependable commercial maintenance, facility repairs, inspections, and property support for businesses throughout Colorado, Wyoming, and Nevada.',
    canonicalPath: '/commercial-services',
  },
  '/project-gallery': {
    title: 'Project Gallery | JBTRADESMENLLC',
    description:
      'Explore residential repairs, commercial maintenance, remodeling, plumbing, flooring, welding, and property-improvement project examples.',
    canonicalPath: '/project-gallery',
  },
  '/gallery': {
    title: 'Project Gallery | JBTRADESMENLLC',
    description:
      'Explore residential repairs, commercial maintenance, remodeling, plumbing, flooring, welding, and property-improvement project examples.',
    canonicalPath: '/project-gallery',
  },
  '/who-we-work-with': {
    title: 'Who We Work With | JBTRADESMENLLC',
    description:
      'Residential and commercial property services for homeowners, property managers, retailers, financial institutions, and government agencies.',
    canonicalPath: '/who-we-work-with',
  },
  '/resources': {
    title: 'Property Maintenance Resources | JBTRADESMENLLC',
    description:
      'Practical maintenance guides, inspection checklists, and property-planning resources for homeowners, facility teams, and property managers.',
    canonicalPath: '/resources',
  },
  '/resources/home-maintenance': {
    title: 'Home Maintenance Checklist | JBTRADESMENLLC',
    description:
      'Use practical interior, exterior, plumbing, HVAC, safety, and seasonal maintenance checks to help protect your home.',
    canonicalPath: '/resources/home-maintenance',
  },
  '/resources/commercial-facilities': {
    title: 'Commercial Facility Maintenance Resources | JBTRADESMENLLC',
    description:
      'Plan commercial facility inspections, preventative maintenance, repairs, and service priorities with practical property guidance.',
    canonicalPath: '/resources/commercial-facilities',
  },
  '/resources/property-management': {
    title: 'Property Management Maintenance Resources | JBTRADESMENLLC',
    description:
      'Property turnover, inspection, work-order, preventative-maintenance, and repair-planning guidance for property managers.',
    canonicalPath: '/resources/property-management',
  },
  '/resources/property-inspections': {
    title: 'Property Inspection Checklist | JBTRADESMENLLC',
    description:
      'Review visible property conditions, maintenance concerns, safety items, and repair priorities with a practical inspection checklist.',
    canonicalPath: '/resources/property-inspections',
  },
  '/resources/repair-planning': {
    title: 'Repair Planning Resources | JBTRADESMENLLC',
    description:
      'Organize property repairs by urgency, scope, budget, documentation, and professional assessment requirements.',
    canonicalPath: '/resources/repair-planning',
  },
  '/resources/assessment-reports': {
    title: 'Property Assessment Report Resources | JBTRADESMENLLC',
    description:
      'Learn how professional property assessment reports document conditions, photographs, priorities, recommendations, and estimated costs.',
    canonicalPath: '/resources/assessment-reports',
  },
  '/resources/guides/seasonal-home-maintenance': {
    title: 'Seasonal Home Maintenance Guide | JBTRADESMENLLC',
    description:
      'Follow a seasonal home maintenance guide covering inspections, preventative care, weather preparation, and routine property upkeep.',
    canonicalPath: '/resources/guides/seasonal-home-maintenance',
  },
  '/resources/guides/commercial-preventative-maintenance': {
    title: 'Commercial Preventative Maintenance Guide | JBTRADESMENLLC',
    description:
      'Build a commercial preventative maintenance plan for facilities, building systems, repairs, inspections, and recurring service needs.',
    canonicalPath: '/resources/guides/commercial-preventative-maintenance',
  },
  '/resources/guides/rental-property-turnover': {
    title: 'Rental Property Turnover Guide | JBTRADESMENLLC',
    description:
      'Prepare rental properties for new occupants with organized inspections, repairs, cleaning, safety checks, and turnover documentation.',
    canonicalPath: '/resources/guides/rental-property-turnover',
  },
  '/resources/guides/water-damage-prevention': {
    title: 'Water Damage Prevention Guide | JBTRADESMENLLC',
    description:
      'Reduce water-damage risks through plumbing checks, drainage maintenance, leak detection, moisture monitoring, and seasonal preparation.',
    canonicalPath: '/resources/guides/water-damage-prevention',
  },
  '/resources/guides/hvac-maintenance': {
    title: 'HVAC Maintenance Guide | JBTRADESMENLLC',
    description:
      'Support reliable heating and cooling with filter changes, seasonal checks, airflow inspections, thermostat review, and preventative HVAC maintenance.',
    canonicalPath: '/resources/guides/hvac-maintenance',
  },
  '/resources/guides/emergency-repair-preparation': {
    title: 'Emergency Repair Preparation Guide | JBTRADESMENLLC',
    description:
      'Prepare for urgent property repairs with shutoff information, emergency contacts, documentation, safety planning, and response priorities.',
    canonicalPath: '/resources/guides/emergency-repair-preparation',
  },
  '/request-estimate': {
    title: 'Request a Property Assessment | JBTRADESMENLLC',
    description:
      'Request a professional property assessment with documented findings, photographs, repair recommendations, maintenance priorities, and estimated costs.',
    canonicalPath: '/request-estimate',
  },
  '/instant-project-estimate': {
    title: 'Smart Project Estimator | JBTRADESMENLLC',
    description:
      'Plan residential and commercial projects with a guided preliminary labor, material, and project-cost range from JBTRADESMENLLC.',
    canonicalPath: '/instant-project-estimate',
  },
  '/contact': {
    title: 'Contact JBTRADESMENLLC | Property Services',
    description:
      'Contact JBTRADESMENLLC for residential repairs, commercial maintenance, property assessments, and facility services in Colorado, Wyoming, and Nevada.',
    canonicalPath: '/contact',
  },
}

const notFoundSeo: RouteSeoConfig = {
  title: 'Page Not Found | JBTRADESMENLLC',
  description:
    'The requested JBTRADESMENLLC page could not be found. Explore our residential, commercial, gallery, resources, and contact pages.',
  canonicalPath: '/',
}

export default function RouteSeo() {
  const { pathname } = useLocation()
  const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/+$/, '')

  useEffect(() => {
    const seo = routeSeo[normalizedPath] ?? notFoundSeo
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )

    document.title = seo.title
    description?.setAttribute('content', seo.description)
    canonical?.setAttribute('href', `${SITE_URL}${seo.canonicalPath}`)
  }, [normalizedPath])

  return null
}
