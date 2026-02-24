import Image from 'next/image'
import { Fr } from '@/lib/typography'

/**
 * FooterSection — dark navy footer with 3-column layout.
 *
 * FOOT-01: Semantic <footer> element, 3-column grid
 * FOOT-02: Column 1 — logo + mission tagline
 * FOOT-03: Column 2 — navigation links to section anchors
 * FOOT-04: Column 3 — social icons (inline SVG, no icon library)
 * FOOT-05: Copyright line
 */
export function FooterSection() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top row — logo, nav, social */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <Image
              src="/rpt_logo.png"
              alt="Rein Padel Tour"
              width={424}
              height={424}
              className="h-10 w-10 object-contain"
            />
            <span className="font-display text-sm font-semibold tracking-wide uppercase">
              Rein Padel Tour
            </span>
          </div>

          {/* Navigation — minimal underline links */}
          <nav aria-label="Navigation du pied de page">
            <ul className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm">
              <li><a href="#mission" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">La mission</a></li>
              <li className="text-white/30">·</li>
              <li><a href="#etapes" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"><Fr>{"Les etapes"}</Fr></a></li>
              <li className="text-white/30">·</li>
              <li><a href="#maladie" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">La maladie</a></li>
              <li className="text-white/30">·</li>
              <li><a href="#participer" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">Participer</a></li>
              <li className="text-white/30">·</li>
              <li><a href="#partenaires" className="text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline">Partenaires</a></li>
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="#"
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
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            <Fr>{"© 2026 Rein Padel Tour. Tous droits reserves."}</Fr>
            <span className="mx-2">·</span>
            <a href="/mentions-legales" className="text-white/40 transition-colors hover:text-white/70">
              <Fr>{"Mentions legales"}</Fr>
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
