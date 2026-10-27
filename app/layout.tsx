import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

const SITE_URL = 'https://jmdpatterson.com'
const TITLE = 'James Patterson | Creative Technologist'
const DESCRIPTION =
  'Portfolio of James Patterson, a UK-based creative technologist building AI and immersive (AR/VR/XR) experiences. Open to roles and freelance projects.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'James Patterson',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'James Patterson',
  url: SITE_URL,
  email: 'jmdpatterson1@gmail.com',
  jobTitle: 'Creative Technologist',
  worksFor: { '@type': 'Organization', name: 'PwC UK' },
  sameAs: [
    'https://github.com/JMDPatterson',
    'https://www.linkedin.com/in/jmdpatterson/',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
