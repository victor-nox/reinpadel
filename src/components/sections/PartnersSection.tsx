import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'
import { PARTNERS } from '@/lib/constants'

/**
 * PartnersSection — displays all 19 partner logos in a uniform responsive grid.
 *
 * PRTN-01: All 19 logos at same size, no two-tier distinction (CONTEXT.md override)
 * PRTN-02: Logos are grayscale by default, show color on hover (pure CSS, zero JS)
 * PRTN-03: CTA button "Devenir partenaire" below the grid
 */
export function PartnersSection() {
  return (
    <SectionWrapper id="partenaires" className="bg-blue-100/40">
      <h2 className="mb-10 text-center font-display text-3xl font-bold text-brand-navy md:text-4xl">
        <Fr>{"Nos partenaires"}</Fr>
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-center text-brand-gray/70">
        <Fr>
          {"La Rein Padel Tour 2026 existe grace a des partenaires qui croient en notre mission."}
        </Fr>
      </p>

      {/* Logo grid — responsive columns, all logos at same size */}
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {PARTNERS.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-center rounded-lg bg-white/70 p-4 shadow-sm"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={120}
              height={60}
              className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </div>

      {/* CTA — become a partner */}
      <div className="mt-10 text-center">
        <a href="#">
          <Button variant="outline">
            <Fr>{"Devenir partenaire"}</Fr>
          </Button>
        </a>
      </div>
    </SectionWrapper>
  )
}
