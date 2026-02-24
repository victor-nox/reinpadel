import { HeroSection } from '@/components/sections/HeroSection'
import { MissionSection } from '@/components/sections/MissionSection'
import { TourSection } from '@/components/sections/TourSection'
import { DiseaseSection } from '@/components/sections/DiseaseSection'
import { ParticipationSection } from '@/components/sections/ParticipationSection'
import { PartnersSection } from '@/components/sections/PartnersSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <MissionSection />
        <TourSection />
        <DiseaseSection />
        <ParticipationSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
