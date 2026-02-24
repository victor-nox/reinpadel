import { Button } from '@/components/ui/Button'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'

// ---------------------------------------------------------------------------
// Phase 1 showcase page — validates all Plan 01 and Plan 02 outputs visually.
// This page will be replaced in Phase 2 with the actual one-pager content.
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-gray-light">

      {/* ------------------------------------------------------------------ */}
      {/*  Section 1: Button variants — all 5 variants × 3 sizes             */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper id="buttons" className="bg-white border-b border-brand-gray/10">
        <h2 className="mb-8 font-display text-2xl font-bold text-brand-gray">
          Button Variants
        </h2>

        {/* Sizes: sm / md / lg — solid variants */}
        {(['primary', 'blue', 'red', 'outline'] as const).map((variant) => (
          <div key={variant} className="mb-6">
            <p className="mb-2 text-sm font-semibold text-brand-gray/60 uppercase tracking-wide">
              {variant}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant={variant} size="sm">Petit</Button>
              <Button variant={variant} size="md">Moyen</Button>
              <Button variant={variant} size="lg">Grand</Button>
            </div>
          </div>
        ))}

        {/* Ghost variant on dark background */}
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold text-brand-gray/60 uppercase tracking-wide">
            ghost (dark background required)
          </p>
          <div className="flex flex-wrap items-center gap-3 rounded-xl bg-brand-navy p-6">
            <Button variant="ghost" size="sm">Petit</Button>
            <Button variant="ghost" size="md">Moyen</Button>
            <Button variant="ghost" size="lg">Grand</Button>
          </div>
        </div>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/*  Section 2: SectionWrapper — padding and max-width demonstration   */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper
        id="section-wrapper"
        className="bg-brand-gray-light"
        innerClassName="border-2 border-dashed border-brand-navy/30 rounded-xl"
      >
        <h2 className="mb-4 font-display text-2xl font-bold text-brand-gray">
          SectionWrapper
        </h2>
        <p className="font-body text-brand-gray/70">
          This content is constrained to{' '}
          <code className="rounded bg-brand-navy/10 px-1 py-0.5 text-sm">max-w-6xl</code>{' '}
          with responsive horizontal padding (px-4 → sm:px-6 → lg:px-8) and vertical
          padding of{' '}
          <code className="rounded bg-brand-navy/10 px-1 py-0.5 text-sm">py-16 md:py-24</code>.
          The dashed border visualises the inner container boundary.
        </p>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/*  Section 3: French typography — non-breaking spaces                */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper id="typography" className="bg-white">
        <h2 className="mb-6 font-display text-2xl font-bold text-brand-gray">
          Typographie Française
        </h2>

        <div className="space-y-4 font-body text-brand-gray">
          <p>
            <span className="text-xs uppercase tracking-wide text-brand-gray/50 mr-2">
              Colon&nbsp;(:)
            </span>
            <Fr>{"Le tournoi commence : préparez-vous !"}</Fr>
          </p>
          <p>
            <span className="text-xs uppercase tracking-wide text-brand-gray/50 mr-2">
              Question&nbsp;(?)
            </span>
            <Fr>{"Vous êtes prêts ? C'est parti !"}</Fr>
          </p>
          <p>
            <span className="text-xs uppercase tracking-wide text-brand-gray/50 mr-2">
              Exclamation&nbsp;(!)
            </span>
            <Fr>{"Bienvenue au Rein Padel Tour !"}</Fr>
          </p>
          <p>
            <span className="text-xs uppercase tracking-wide text-brand-gray/50 mr-2">
              Semi-colon&nbsp;(;)
            </span>
            <Fr>{"Inscrivez-vous maintenant ; les places sont limitées."}</Fr>
          </p>
          <p>
            <span className="text-xs uppercase tracking-wide text-brand-gray/50 mr-2">
              Guillemets&nbsp;(«»)
            </span>
            <Fr>{"Le slogan est «Ensemble pour la vie»."}</Fr>
          </p>
          <p className="mt-6 text-sm text-brand-gray/50 italic">
            Narrow NBSP (\u202F) before ? ! ; — Regular NBSP (\u00A0) before : and inside guillemets.
            These prevent line breaks at those points.
          </p>
        </div>
      </SectionWrapper>

      {/* ------------------------------------------------------------------ */}
      {/*  Section 4: Design token swatches (from Plan 01)                   */}
      {/* ------------------------------------------------------------------ */}
      <SectionWrapper id="tokens" className="bg-brand-gray-light">
        <h2 className="mb-6 font-display text-2xl font-bold text-brand-gray">
          Design Tokens
        </h2>
        <div className="flex flex-wrap gap-4">
          {[
            { name: 'brand-navy', bg: 'bg-brand-navy', light: false },
            { name: 'brand-cyan', bg: 'bg-brand-cyan', light: false },
            { name: 'brand-coral', bg: 'bg-brand-coral', light: false },
            { name: 'brand-yellow-green', bg: 'bg-brand-yellow-green', light: true },
            { name: 'brand-gray', bg: 'bg-brand-gray', light: false },
            { name: 'brand-gray-light', bg: 'bg-brand-gray-light', light: true },
          ].map(({ name, bg, light }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className={`h-16 w-16 rounded-lg ${bg} border border-brand-gray/10`}
              />
              <span
                className={`text-xs font-mono ${light ? 'text-brand-gray' : 'text-brand-gray'}`}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </SectionWrapper>

    </main>
  )
}
