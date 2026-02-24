'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Fr } from '@/lib/typography'

/**
 * Coming Soon page — public-facing root while the site is pre-launch.
 *
 * Layout: full-viewport hero (same background as HeroSection) with centered
 * logo, title, "coming soon" message, passcode input, and social links.
 *
 * Entering the correct passcode ("vamos") redirects to /site where the
 * full website lives. Client-side soft gate only.
 */
export default function ComingSoonPage() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (passcode.trim().toLowerCase() === 'vamos') {
      window.location.href = '/site'
    } else {
      setError(true)
    }
  }

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden text-white">
      {/* Background — same as HeroSection */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-brand-navy/70" />

      <div className="relative flex flex-col items-center gap-6 px-4 text-center sm:px-6">
        {/* Logo */}
        <Image
          src="/rpt_logo.png"
          width={424}
          height={424}
          priority
          className="h-36 w-36 object-contain md:h-48 md:w-48"
          alt="Logo Rein Padel Tour"
        />

        {/* Date badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-2 font-display text-sm font-semibold uppercase tracking-widest text-white/90 backdrop-blur-sm">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          6 – 15 MARS 2026
        </span>

        {/* Title */}
        <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
          REIN PADEL TOUR 2026
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl font-body text-lg text-white/80 md:text-xl">
          <Fr>{"TOURNOIS AMICAUX CARITATIFS SUR TOUTE LA FRANCE"}</Fr>
        </p>

        {/* Coming soon message */}
        <p className="mt-2 font-display text-2xl font-bold tracking-wide uppercase md:text-3xl">
          <Fr>{"Bientot disponible"}</Fr>
        </p>

        {/* Passcode form */}
        <form onSubmit={handleSubmit} className="mt-2 flex w-full max-w-xs flex-col items-center gap-3">
          <div className="flex w-full overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <input
              type="text"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value)
                setError(false)
              }}
              placeholder="Mot de passe"
              className="flex-1 bg-transparent px-5 py-2.5 text-sm text-white placeholder-white/50 outline-none"
            />
            <button
              type="submit"
              className="bg-brand-coral px-5 py-2.5 font-display text-sm font-semibold transition-colors hover:bg-brand-coral/80"
            >
              Entrer
            </button>
          </div>
          {error && (
            <p className="text-sm text-brand-coral">
              <Fr>{"Mot de passe incorrect"}</Fr>
            </p>
          )}
        </form>

        {/* Social links */}
        <div className="mt-4 flex gap-3">
          <a
            href="https://www.instagram.com/rein_padel_tour/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com/people/Rein-padel-tour/61580001025488/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
