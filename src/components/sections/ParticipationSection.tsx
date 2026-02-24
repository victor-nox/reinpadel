import { PARTICIPATION_CARDS } from '@/lib/constants'
import { Fr } from '@/lib/typography'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Button } from '@/components/ui/Button'

/**
 * Inline SVG icons for participation cards.
 * Each icon is decorative — minimal, recognisable SVGs, no icon library.
 * Renders based on icon name string from PARTICIPATION_CARDS.
 */
function CardIcon({ name }: { name: string }) {
  if (name === 'paddle') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Racket face — rounded rectangle */}
        <rect x="6" y="2" width="12" height="14" rx="6" ry="6" />
        {/* Dots on the racket face */}
        <circle cx="10" cy="8" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="8" r="1" fill="currentColor" stroke="none" />
        {/* Handle */}
        <line x1="12" y1="16" x2="12" y2="22" />
      </svg>
    )
  }

  if (name === 'heart') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }

  if (name === 'handshake') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Left arm */}
        <path d="M2 12l4-4 4 4" />
        {/* Right arm */}
        <path d="M22 12l-4-4-4 4" />
        {/* Hands meeting at center */}
        <line x1="6" y1="12" x2="18" y2="12" />
        {/* Handshake grip */}
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  }

  // Fallback — generic circle
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

/**
 * ParticipationSection — 3-card call-to-action section (PART-01, PART-02, PART-03)
 *
 * White background, 3 cards in a responsive grid.
 * Each card has: icon, title, description, CTA button with distinct variant.
 * Button variants: blue (Jouez), red (Donnez), outline (Devenez Partenaire).
 */
export function ParticipationSection() {
  return (
    <SectionWrapper id="participer" className="bg-blue-50">
      {/* Section heading */}
      <h2 className="mb-12 text-center font-display text-3xl font-bold text-brand-navy md:text-4xl">
        <Fr>{"Rejoignez l'aventure"}</Fr>
      </h2>

      {/* Cards grid — single column on mobile, 3 columns on md+ */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PARTICIPATION_CARDS.map((card) => (
          <div
            key={card.title}
            className="flex flex-col items-center rounded-2xl border border-blue-100 bg-white/60 p-8 text-center shadow-sm"
          >
            {/* Icon container — circular badge */}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100/60 text-brand-navy">
              <CardIcon name={card.icon} />
            </div>

            {/* Card title */}
            <h3 className="mb-2 font-display text-xl font-bold text-brand-navy">
              <Fr>{card.title}</Fr>
            </h3>

            {/* Card description — flex-1 pushes button to bottom */}
            <p className="mb-6 flex-1 text-sm text-brand-gray/70 leading-relaxed">
              <Fr>{card.description}</Fr>
            </p>

            {/* CTA button — variant from constants (blue/red/outline) */}
            <a href={card.href}>
              <Button variant={card.variant} size="md">
                <Fr>{card.cta}</Fr>
              </Button>
            </a>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
