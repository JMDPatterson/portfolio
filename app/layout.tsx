import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'James Patterson',
  description: 'The official portfolio of James Patterson, engineering innovative experiences at the intersection of technology, design, and human imagination.',
}

export const viewport = {
  themeColor: '#000000',
  backgroundColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  )
}
