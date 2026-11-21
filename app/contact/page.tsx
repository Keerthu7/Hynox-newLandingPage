import type { Metadata } from 'next'
import SitePage from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Contact HYNOX | Discuss Your Project',
  description: 'Contact HYNOX for website development, custom software, branding, photography and videography. Start a conversation on WhatsApp.',
}

export default function Page() {
  return <SitePage view="contact" />
}
