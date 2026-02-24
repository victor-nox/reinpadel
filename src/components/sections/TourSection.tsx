import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'
import { TOUR_STOPS } from '@/lib/constants'

export function TourSection() {
  return (
    <SectionWrapper id="etapes" className="bg-blue-50">
      <h2 className="mb-4 text-center font-display text-3xl font-bold text-brand-navy md:text-4xl">
        <Fr>{"Les etapes"}</Fr>
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-brand-gray/70">
        <Fr>
          {"10 jours, 9 villes, une route en forme de rein tracee par GPS a travers la France."}
        </Fr>
      </p>

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Map */}
        <div className="flex justify-center">
          <Image
            src="/rpt_map.png"
            alt="Carte de France avec le parcours de la Rein Padel Tour"
            width={263}
            height={283}
            className="w-full max-w-sm"
          />
        </div>

        {/* Schedule list */}
        <div className="space-y-2">
          {TOUR_STOPS.map((stop) => (
            <div
              key={stop.day}
              className={`flex items-center gap-4 rounded-lg px-4 py-3 ${
                stop.city
                  ? 'bg-white shadow-sm'
                  : 'bg-blue-100/40 italic text-brand-gray/50'
              }`}
            >
              <span className="w-16 shrink-0 text-sm font-semibold text-brand-navy/60">
                {stop.date}
              </span>
              {stop.city ? (
                <>
                  <span className="font-display text-lg font-bold text-brand-navy">
                    {stop.city}
                  </span>
                  {stop.tag && (
                    <span className="rounded-full bg-brand-coral px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                      {stop.tag}
                    </span>
                  )}
                  <a
                    href={stop.instagram ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto hidden text-sm text-brand-gray/50 underline-offset-4 transition-colors hover:text-brand-navy hover:underline sm:block"
                  >
                    {stop.club}
                  </a>
                </>
              ) : (
                <span className="text-sm">
                  <Fr>{"Jour de repos"}</Fr>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
