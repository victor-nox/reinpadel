import { HeroSection } from '@/components/sections/HeroSection'
import { TourSection } from '@/components/sections/TourSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { FooterSection } from '@/components/sections/FooterSection'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Rein Padel Tour 2026',
  description:
    'Tournois amicaux caritatifs de padel à travers la France pour sensibiliser à la maladie rénale et soutenir la recherche.',
  startDate: '2026-03-06',
  endDate: '2026-03-15',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Country',
    name: 'France',
  },
  organizer: {
    '@type': 'Organization',
    name: 'Rein Padel Tour',
    url: 'https://reinpadeltour.com',
  },
  image: 'https://reinpadeltour.com/og-image.png',
  url: 'https://reinpadeltour.com',
  inLanguage: 'fr',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <TourSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
