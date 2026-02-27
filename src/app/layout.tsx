import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = 'https://reinpadeltour.com'

export const metadata: Metadata = {
  title: 'Rein Padel Tour 2026 — Tournoi caritatif contre la maladie rénale',
  description:
    '10 jours, 9 villes, ~3 000 km : tournois amicaux de padel à travers la France pour sensibiliser à la maladie rénale (maladie de Berger) et soutenir la recherche. 6–15 mars 2026.',
  keywords: [
    'Rein Padel Tour',
    'padel',
    'tournoi caritatif',
    'maladie de Berger',
    'maladie rénale',
    'charity padel',
    'France',
    '2026',
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rein Padel Tour 2026',
    description:
      '10 jours de tournois caritatifs de padel à travers la France pour la recherche contre la maladie rénale. 6–15 mars 2026.',
    url: siteUrl,
    siteName: 'Rein Padel Tour',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rein Padel Tour 2026 — Tournoi caritatif de padel à travers la France',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rein Padel Tour 2026',
    description:
      '10 jours de tournois caritatifs de padel à travers la France pour la recherche contre la maladie rénale.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#1a3a8a',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
