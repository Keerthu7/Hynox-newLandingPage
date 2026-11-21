import type { Metadata } from 'next'
import SitePage from '@/components/site-page'

export const metadata: Metadata = {
  title: 'About HYNOX | Software, Branding & Creative Team',
  description: 'Discover HYNOX: a software and branding company bringing technology, design and creative thinking together to help businesses build, grow and evolve.',
}

export default function Page() {
  return <SitePage view="about" />
}
