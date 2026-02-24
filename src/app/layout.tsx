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
  title: 'Rein Padel Tour 2026 — Tournoi caritatif contre la maladie de Berger',
  description:
    '10 jours, 9 villes, ~3 000 km : tournois amicaux de padel a travers la France pour sensibiliser a la nephropathie a IgA (maladie de Berger) et soutenir la recherche. 6-15 mars 2026.',
  keywords: [
    'Rein Padel Tour',
    'padel',
    'tournoi caritatif',
    'maladie de Berger',
    'nephropathie a IgA',
    'charity padel',
    'France',
    '2026',
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Rein Padel Tour 2026',
    description:
      '10 jours de tournois caritatifs de padel a travers la France pour la recherche contre la maladie de Berger. 6-15 mars 2026.',
    url: siteUrl,
    siteName: 'Rein Padel Tour',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/rpt_logo.png',
        width: 424,
        height: 424,
        alt: 'Logo Rein Padel Tour 2026',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Rein Padel Tour 2026',
    description:
      '10 jours de tournois caritatifs de padel a travers la France pour la recherche contre la maladie de Berger.',
    images: ['/rpt_logo.png'],
  },
  robots: {
    index: true,
    follow: true,
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
