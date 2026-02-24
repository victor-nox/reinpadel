import { HeroSection } from '@/components/sections/HeroSection'
import { MissionSection } from '@/components/sections/MissionSection'
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
        <DiseaseSection />
        <ParticipationSection />
        <PartnersSection />
      </main>
      <FooterSection />
    </>
  )
}
