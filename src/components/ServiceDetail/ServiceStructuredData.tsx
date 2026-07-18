import { useEffect } from 'react'
import type { ServiceHubService } from '../../types/serviceHub'

const siteUrl = 'https://www.jbtradesmenllc.com'
const scriptId = 'service-page-structured-data'

export default function ServiceStructuredData({ service }: { service: ServiceHubService }) {
  useEffect(() => {
    document.getElementById(scriptId)?.remove()

    const script = document.createElement('script')
    script.id = scriptId
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: service.title,
          description: service.metaDescription,
          serviceType: service.schemaServiceType,
          provider: {
            '@type': 'Organization',
            name: 'JBTRADESMENLLC',
            url: `${siteUrl}/`,
          },
          areaServed: [
            { '@type': 'City', name: 'Las Vegas', addressRegion: 'NV' },
            { '@type': 'City', name: 'Henderson', addressRegion: 'NV' },
            { '@type': 'City', name: 'North Las Vegas', addressRegion: 'NV' },
            { '@type': 'Place', name: 'Nearby Las Vegas Valley communities' },
          ],
          url: service.canonicalUrl,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${siteUrl}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Service Hub',
              item: `${siteUrl}/service-hub`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: service.title,
              item: service.canonicalUrl,
            },
          ],
        },
      ],
    })
    document.head.appendChild(script)

    return () => {
      if (document.getElementById(scriptId) === script) script.remove()
    }
  }, [service])

  return null
}
