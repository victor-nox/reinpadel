# Phase 2: Content Sections - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

All static page sections from Hero through Footer, fully responsive on a single scrollable one-pager. Visitors can read the complete story — headline, mission, disease awareness, participation options, partners, and footer — on any device. No interactivity (navbar scroll behavior and animated SVG map are Phase 3). No legal/SEO (Phase 4).

</domain>

<decisions>
## Implementation Decisions

### Hero visual treatment
- Centered stack layout (like the poster): logo → H1 → subtitle → date badge → CTAs
- H1: "REIN PADEL TOUR 2026" — brand-first, poster style
- Subtitle: "TOURNOIS AMICAUX CARITATIFS SUR TOUTE LA FRANCE"
- Date badge: match the poster treatment (not a generic red pill — reference affiche-rtp.png)
- Blue-only gradient background (dark blue to lighter blue), no photo, no accent colors
- Compact height (auto, not 100vh) — content determines height, peek of next section visible
- CTAs: "Participez à l'aventure" (primary) + "Découvrir la mission" (secondary/ghost, scrolls to Mission)
- Both CTAs use placeholder hrefs for v1

### French copy & content source
- Source file: `srv/txt/ReinPadelTour2026.md` — condense and adapt for one-pager sections
- The content doc is written for a future multi-page site; keep text tight for a one-pager
- Poster style takes priority over content doc style where they differ
- Key numbers: 9 cities, ~3,000 km, 10 days (not 10 cities or 7,000 km)
- Medical/disease statistics: researcher must verify accurate numbers for France (Berger's disease / IgA nephropathy prevalence, prognosis, treatment status)

### Image & logo assets
- Logo: `srv/grafic/rpt_logo.png` — available and ready
- Poster reference: `srv/grafic/affiche-rtp.png`
- France map: `srv/grafic/rpt_map.png` — use as static image in Phase 2 (Phase 3 replaces with interactive SVG)
- Partner logos: `srv/grafic/partner_logo_1.png` through `partner_logo_19.png` — all 19 logos
- All images must be moved to `public/` and served via `next/image` for optimization

### Partner display
- All 19 partner logos displayed at same size (no two-tier distinction)
- Grayscale-to-color hover effect per requirements (PRTN-02)
- CTA to become a partner with placeholder href (PRTN-03)

### Claude's Discretion
- Hero logo color treatment (original colors vs white version for contrast on blue gradient)
- Section visual rhythm (background colors per section, spacing, visual flow between sections)
- Exact text condensation from content doc per section
- Loading skeleton and empty state design
- Social media icon treatment in footer
- Exact spacing, typography sizing, and responsive breakpoint behavior

</decisions>

<specifics>
## Specific Ideas

- The poster (`affiche-rtp.png`) is the primary visual reference for the hero — match its centered, bold, sporty feel
- Antoine's quote from content doc section 4.4: "Ma maladie est invisible. Ce tour, c'est ma façon de la rendre visible." — use in Mission section
- Disease section should have impactful, research-verified statistics — not copy-pasted from content doc without verification
- The France map image shows the kidney-shaped route across 9 cities — use as a visual element (static image) within the page content
- Content doc has a "L'Eau" video section — out of scope for v1 (deferred to CONT-02)

</specifics>

<deferred>
## Deferred Ideas

- Multi-page site structure (FAQ, press kit, donation page, contact, newsletter) — content doc covers these but v1 is a one-pager
- Video embed section ("L'Eau" film) — CONT-02
- Live GPS tracker — CONT-03
- Newsletter/email capture — INTG-03
- Donation integration (HelloAsso) — INTG-01

</deferred>

---

*Phase: 02-content-sections*
*Context gathered: 2026-02-24*
