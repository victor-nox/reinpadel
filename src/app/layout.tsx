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

export const metadata: Metadata = {
  title: 'Rein Padel Tour 2026',
  description: 'Tournoi de padel caritatif au profit de la recherche sur la maladie de Berger',
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
