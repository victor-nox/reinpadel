import { HeroSection } from '@/components/sections/HeroSection'
import { TourSection } from '@/components/sections/TourSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function SitePage() {
  return (
    <>
      <main>
        <HeroSection />
        <TourSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
