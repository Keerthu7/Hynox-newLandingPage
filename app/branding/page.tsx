import type { Metadata } from 'next'
import SitePage from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Branding & Creative Services in Coimbatore | HYNOX',
  description: 'Build a distinctive brand with HYNOX. Explore brand identity, graphic design, packaging, photography, videography and digital branding in Coimbatore.',
}

export default function Page() {
  return <SitePage view="branding" />
}
