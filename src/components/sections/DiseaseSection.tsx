import { DISEASE_STATS } from '@/lib/constants'
import { Fr } from '@/lib/typography'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

/**
 * DiseaseSection — disease awareness section (DISE-01, DISE-02, DISE-03)
 *
 * Dark navy background with white text. Explains Berger's disease (IgA
 * nephropathy) and displays 3 verified French medical statistics.
 *
 * WCAG contrast: white on #1a3a8a yields ~9.5:1 ratio (passes AA and AAA).
 */
export function DiseaseSection() {
  return (
    <SectionWrapper id="maladie" className="bg-brand-navy text-white">
      {/* Heading */}
      <h2 className="font-display text-3xl font-bold md:text-4xl">
        <Fr>{"La maladie de Berger"}</Fr>
      </h2>

      {/* Subheading */}
      <p className="mt-4 max-w-3xl text-lg text-white/80">
        <Fr>
          {
            "Une maladie renale chronique. Invisible. Frequente. Et largement meconnue du grand public."
          }
        </Fr>
      </p>

      {/* Body text — 2 concise paragraphs explaining IgA nephropathy */}
      <div className="mt-8 max-w-3xl space-y-4 text-white/80 leading-relaxed">
        <p>
          <Fr>
            {
              "La nephropathie a IgA, ou maladie de Berger, est une maladie auto-immune dans laquelle le systeme immunitaire produit des anticorps anormaux (IgA) qui se deposent dans les reins. Ces depots endommagent progressivement les filtres renaux, provoquant une deterioration silencieuse de la fonction renale."
            }
          </Fr>
        </p>
        <p>
          <Fr>
            {
              "Le danger reside dans son invisibilite : aucun symptome pendant des annees, une decouverte souvent tardive. Pourtant, un depistage precoce change tout — et c'est precisement pour accelerer cette prise en charge que le Rein Padel Tour existe."
            }
          </Fr>
        </p>
      </div>

      {/* Statistics strip — 3 verified French medical numbers (DISE-02) */}
      <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/20 pt-12 sm:grid-cols-3">
        {DISEASE_STATS.map((stat) => (
          <div key={stat.value} className="text-center">
            <span className="font-display text-5xl font-black text-brand-cyan">
              {stat.value}
            </span>
            <p className="mt-2 text-sm text-white/70">
              <Fr>{stat.label}</Fr>
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
