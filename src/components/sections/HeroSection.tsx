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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center py-20 md:py-32 gap-6">
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
        <span className="inline-flex items-center rounded-full bg-brand-coral px-5 py-2 font-display text-sm font-bold uppercase tracking-widest">
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

        {/* CTAs (HERO-03, HERO-04) */}
        <div className="flex flex-col gap-4 sm:flex-row">
          {/* Primary CTA — placeholder href (no external links in v1) */}
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full font-display font-semibold transition-colors bg-brand-cyan text-white hover:bg-brand-cyan/90 px-8 py-4 text-lg"
          >
            <Fr>{"Participez a l'aventure"}</Fr>
          </a>

          {/* Ghost CTA — scrolls to #mission (HERO-04) */}
          <a
            href="#mission"
            className="inline-flex items-center justify-center rounded-full font-display font-semibold transition-colors bg-transparent border border-white text-white hover:bg-white/10 px-8 py-4 text-lg"
          >
            <Fr>{"Decouvrir la mission"}</Fr>
          </a>
        </div>
      </div>
    </section>
  )
}
