import type { Metadata } from 'next'
import SitePage from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Website, Software & Creative Services | HYNOX',
  description: 'Website development, mobile apps, ERP software, Shopify, branding, digital marketing and photography services in Coimbatore.',
}

export default function Page() {
  return <SitePage view="services" />
}
