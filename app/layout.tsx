import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Escapist — 2026 Long Weekend Travel for Corporate India',
  description: 'Discover unexplored destinations for every 2026 Indian long weekend. Packing lists, budget calculator, leave drafts and interactive maps — all in one place.',
  keywords: ['long weekend 2026','India travel','corporate leave','unexplored destinations','bridge day'],
  openGraph: {
    title: 'Escapist — Your 2026 Long Weekend Travel Companion',
    description: 'Bridge days, bento cards, and hidden gems. Plan your perfect escape.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d3c1c', width: 'device-width', initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
