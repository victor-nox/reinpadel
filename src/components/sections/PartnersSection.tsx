import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'

/**
 * PartnersSection — displays all partner logos as a single combined image.
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

      {/* All partner logos — single combined image */}
      <div className="mx-auto max-w-5xl">
        <Image
          src="/partner_logos.png"
          alt="Logos des partenaires de la Rein Padel Tour 2026"
          width={597}
          height={110}
          className="w-full h-auto rounded-2xl"
        />
      </div>

      {/* CTA — become a partner */}
      <div className="mt-10 text-center">
        <a
          href="#"
          className="rounded-full border border-brand-navy/30 px-5 py-2 text-sm font-display font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
        >
          <Fr>{"Devenir partenaire"}</Fr>
        </a>
      </div>
    </SectionWrapper>
  )
}
