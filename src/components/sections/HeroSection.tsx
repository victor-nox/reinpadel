import Image from 'next/image'
import { Fr } from '@/lib/typography'

/**
 * Hero section — the first thing visitors see.
 *
 * Layout: centered stack (logo → date badge → H1 → subtitle → CTAs) on a
 * blue gradient background. Auto height (not 100vh) so the Mission section
 * peeks below the fold, inviting scroll.
 *
 * Server Component — no interactivity needed.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden text-white"
    >
      {/* Background — poster image with dark overlay for text readability */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-navy/70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-10 pb-20 md:pt-16 md:pb-32 gap-6">
        {/* Logo — priority-loaded as LCP element (HERO-05) */}
        <Image
          src="/rpt_logo.png"
          width={424}
          height={424}
          priority
          className="w-36 h-36 md:w-48 md:h-48 object-contain"
          alt="Logo Rein Padel Tour"
        />

        {/* Date badge (HERO-02) */}
        <span className="inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 font-display text-sm font-semibold uppercase tracking-widest text-white/90">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          6 – 15 MARS 2026
        </span>

        {/* H1 headline (HERO-01) */}
        <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
          REIN PADEL TOUR 2026
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl font-body text-lg text-white/80 md:text-xl">
          <Fr>{"TOURNOIS AMICAUX CARITATIFS SUR TOUTE LA FRANCE"}</Fr>
        </p>

      </div>
    </section>
  )
}
