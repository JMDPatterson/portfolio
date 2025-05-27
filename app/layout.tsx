import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'James Patterson',
  description: 'The official portfolio of James Patterson, engineering innovative experiences at the intersection of technology, design, and human imagination.',
}

export const viewport = {
  themeColor: '#ffffff',
  backgroundColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
