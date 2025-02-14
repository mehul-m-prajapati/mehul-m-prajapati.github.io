export const dynamic = 'force-static'; // Ensures static generation of this route

import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site.config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
