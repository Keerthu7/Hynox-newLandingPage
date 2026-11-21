import type { Metadata } from 'next'
import SitePage from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Work & Client Stories — Films, Photography & Branding | HYNOX',
  description: 'Explore HYNOX creative work, architectural films, brand photography, motion projects and client stories in one curated portfolio.',
}

export default function Page() {
  return <SitePage view="work" />
}
