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
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Column 1 — Logo + mission statement */}
          <div>
            <Image
              src="/rpt_logo.png"
              alt="Rein Padel Tour"
              width={424}
              height={424}
              className="mb-4 h-12 w-12 object-contain"
            />
            <p className="text-sm leading-relaxed text-white/70">
              <Fr>
                {"Tournois amicaux caritatifs a travers la France pour sensibiliser a la maladie de Berger."}
              </Fr>
            </p>
          </div>

          {/* Column 2 — Navigation links */}
          <nav aria-label="Navigation du pied de page">
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#mission"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  La mission
                </a>
              </li>
              <li>
                <a
                  href="#maladie"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  La maladie de Berger
                </a>
              </li>
              <li>
                <a
                  href="#participer"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Participer
                </a>
              </li>
              <li>
                <a
                  href="#partenaires"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  Nos partenaires
                </a>
              </li>
              <li>
                <a
                  href="/mentions-legales"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  <Fr>{"Mentions legales"}</Fr>
                </a>
              </li>
            </ul>
          </nav>

          {/* Column 3 — Social icons + copyright */}
          <div>
            {/* Social icons */}
            <div className="mb-6 flex gap-4">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/70 transition-colors hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="text-white/70 transition-colors hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-white/50">
              <Fr>{"© 2026 Rein Padel Tour. Tous droits reserves."}</Fr>
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
