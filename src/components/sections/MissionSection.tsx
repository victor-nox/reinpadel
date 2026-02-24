import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'
import { FACT_NUMBERS } from '@/lib/constants'

/**
 * Mission section — communicates the "why" of the Rein Padel Tour.
 *
 * Layout: two-column on desktop (text + blockquote left, fact cards right),
 * single-column stacked on mobile.
 *
 * Server Component — no interactivity needed.
 */
export function MissionSection() {
  return (
    <SectionWrapper id="mission" className="bg-white">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">

        {/* Left column — text + quote (MISS-02) */}
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-3xl font-bold text-brand-navy md:text-4xl">
            <Fr>{"Une maladie invisible. Un defi visible."}</Fr>
          </h2>

          <p className="font-body text-brand-gray/80 leading-relaxed">
            <Fr>
              {"La maladie de Berger touche les reins de maniere silencieuse. Pas de symptomes pendant des annees. Quand on la decouvre, il est souvent deja trop tard."}
            </Fr>
          </p>

          <p className="font-body text-brand-gray/80 leading-relaxed">
            <Fr>
              {"Antoine a 36 ans. Il vit avec cette maladie. Et il a decide de ne plus se taire. Sa methode ? Traverser la France en 10 jours, jouer au padel dans 9 villes, et tracer — par GPS — un rein geant sur la carte de France."}
            </Fr>
          </p>

          {/* Antoine's quote (MISS-02) */}
          <blockquote className="border-l-4 border-brand-coral pl-4 italic text-brand-gray">
            <p>
              <Fr>{"« Ma maladie est invisible. Ce tour, c'est ma facon de la rendre visible. »"}</Fr>
            </p>
            <cite className="mt-2 block text-sm not-italic text-brand-gray/60">
              — Antoine
            </cite>
          </blockquote>
        </div>

        {/* Right column — fact cards (MISS-03) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          {FACT_NUMBERS.map((fact) => (
            <div
              key={fact.value}
              className="rounded-xl bg-brand-gray-light p-6 text-center"
            >
              <p className="font-display text-4xl font-black text-brand-navy">
                {fact.value}
              </p>
              <p className="mt-1 text-sm text-brand-gray/70">
                <Fr>{fact.label}</Fr>
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
