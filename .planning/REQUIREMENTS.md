# Requirements: Rein Padel Tour 2026

**Defined:** 2026-02-23
**Core Value:** Visitors immediately understand what the Rein Padel Tour is, why it matters, and how they can get involved — in under 30 seconds.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUN-01**: Project scaffolded with Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- [ ] **FOUN-02**: Custom design tokens defined (colors, fonts, spacing) matching poster identity
- [ ] **FOUN-03**: Montserrat and Inter fonts loaded via next/font with zero CLS
- [ ] **FOUN-04**: French typography utility with non-breaking spaces before : ? ! ;
- [ ] **FOUN-05**: Shared UI primitives (SectionWrapper, Button) established

### Navigation

- [ ] **NAV-01**: Sticky navbar transitions from transparent to solid on scroll
- [ ] **NAV-02**: Navbar has logo (left) and section links (right) with CTA button
- [ ] **NAV-03**: Mobile hamburger menu for small screens
- [ ] **NAV-04**: Smooth scroll to sections via native anchor links

### Hero

- [ ] **HERO-01**: Fullscreen hero section with logo, headline "REIN PADEL TOUR 2026", and subheadline
- [ ] **HERO-02**: Date badge "6 – 15 MARS 2026" in pill shape with red background
- [ ] **HERO-03**: Primary CTA button "Participez a l'aventure" (placeholder href)
- [ ] **HERO-04**: Secondary ghost CTA button "Decouvrir la mission" (scrolls to Mission)
- [ ] **HERO-05**: Hero image/background eager-loaded for LCP performance

### Mission

- [ ] **MISS-01**: Two-column layout (text left, facts right) on desktop, stacked on mobile
- [ ] **MISS-02**: Project explanation text with Antoine's personal quote (blockquote style)
- [ ] **MISS-03**: 3 fact cards displaying key numbers (7,000 km / 1 rein / 9 villes)

### Disease

- [ ] **DISE-01**: Dark blue background section explaining Berger's disease
- [ ] **DISE-02**: Impact statistics strip (1.5M affected / 10% terminal / 0 cures)
- [ ] **DISE-03**: White text on dark background with sufficient WCAG contrast

### Route

- [ ] **ROUT-01**: Inline SVG France map with kidney-shaped tour route displayed
- [ ] **ROUT-02**: 9 station markers on the map with hover tooltips (city + date)
- [ ] **ROUT-03**: Station list alongside map (desktop) or below (mobile) with city, date, club
- [ ] **ROUT-04**: Station data sourced from lib/constants.ts

### Participation

- [ ] **PART-01**: 3-card layout (Jouez, Donnez, Devenez Partenaire) on desktop, stacked on mobile
- [ ] **PART-02**: Each card has icon, title, description, and CTA button (placeholder href)
- [ ] **PART-03**: Distinct button styles per card (blue, red, outline)

### Partners

- [ ] **PRTN-01**: Two-tier logo grid (main partners larger, partners smaller)
- [ ] **PRTN-02**: Grayscale logos that show color on hover
- [ ] **PRTN-03**: CTA to become a partner (placeholder href)
- [ ] **PRTN-04**: Partner data sourced from lib/constants.ts

### Footer

- [ ] **FOOT-01**: Dark blue footer with 3-column layout (logo+text, links, social)
- [ ] **FOOT-02**: Mission statement text
- [ ] **FOOT-03**: Section navigation links and legal page links
- [ ] **FOOT-04**: Social media icons (Instagram, Facebook)
- [ ] **FOOT-05**: Copyright line

### Legal & SEO

- [ ] **LEGL-01**: Mentions legales page at /mentions-legales with required French legal content
- [ ] **LEGL-02**: SEO metadata (title, description, keywords) in French
- [ ] **LEGL-03**: Open Graph tags with og:image for social sharing
- [ ] **LEGL-04**: metadataBase configured for correct OG image URLs in production

### Performance & Quality

- [ ] **PERF-01**: Lighthouse score >= 95 on mobile preset
- [ ] **PERF-02**: All images use next/image for automatic optimization
- [ ] **PERF-03**: Fully responsive from 375px to 1440px+ (mobile-first)
- [ ] **PERF-04**: Semantic HTML with alt texts on all images
- [ ] **PERF-05**: All French text uses correct non-breaking space typography

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Animations

- **ANIM-01**: SVG route draw-on animation (stroke-dashoffset on scroll)
- **ANIM-02**: Count-up animation on fact numbers (Intersection Observer)
- **ANIM-03**: Section fade-in on scroll
- **ANIM-04**: Hero entrance animation (fade-in sequence)

### Integrations

- **INTG-01**: Donation integration (HelloAsso or Stripe Checkout)
- **INTG-02**: Tournament signup links (Playciz or similar)
- **INTG-03**: Newsletter email capture with double opt-in
- **INTG-04**: Plausible Analytics integration (cookieless)
- **INTG-05**: Contact form

### Content

- **CONT-01**: Blog/actualites section with MDX posts
- **CONT-02**: Video gallery (L'Eau, Le Moteur, Carnet de Bord)
- **CONT-03**: Live GPS tracking during tour (Supabase Realtime + Mapbox)
- **CONT-04**: Real-time ace counter with donation triggers
- **CONT-05**: Multilingual support (FR/DE/EN)

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS backend | No dynamic content needed for MVP — all data in constants.ts |
| Database | Static site, no user data stored |
| Authentication | No user accounts needed |
| Cookie consent banner | Not needed — Plausible is cookieless, no personal data collected |
| Video background in hero | Kills Lighthouse on mobile, use poster image |
| Social media feed embed | External JS dependencies hurt performance |
| State management library | No client state beyond navbar scroll position |
| Heavy animation library (Framer Motion) | 40KB+ client JS, overkill for static site |
| Map library (Leaflet/D3/Mapbox) | 40-70KB for a decorative fixed route — inline SVG suffices |
| Working CTA links | V1 is visual/informational only — placeholder hrefs |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | — | Pending |
| FOUN-02 | — | Pending |
| FOUN-03 | — | Pending |
| FOUN-04 | — | Pending |
| FOUN-05 | — | Pending |
| NAV-01 | — | Pending |
| NAV-02 | — | Pending |
| NAV-03 | — | Pending |
| NAV-04 | — | Pending |
| HERO-01 | — | Pending |
| HERO-02 | — | Pending |
| HERO-03 | — | Pending |
| HERO-04 | — | Pending |
| HERO-05 | — | Pending |
| MISS-01 | — | Pending |
| MISS-02 | — | Pending |
| MISS-03 | — | Pending |
| DISE-01 | — | Pending |
| DISE-02 | — | Pending |
| DISE-03 | — | Pending |
| ROUT-01 | — | Pending |
| ROUT-02 | — | Pending |
| ROUT-03 | — | Pending |
| ROUT-04 | — | Pending |
| PART-01 | — | Pending |
| PART-02 | — | Pending |
| PART-03 | — | Pending |
| PRTN-01 | — | Pending |
| PRTN-02 | — | Pending |
| PRTN-03 | — | Pending |
| PRTN-04 | — | Pending |
| FOOT-01 | — | Pending |
| FOOT-02 | — | Pending |
| FOOT-03 | — | Pending |
| FOOT-04 | — | Pending |
| FOOT-05 | — | Pending |
| LEGL-01 | — | Pending |
| LEGL-02 | — | Pending |
| LEGL-03 | — | Pending |
| LEGL-04 | — | Pending |
| PERF-01 | — | Pending |
| PERF-02 | — | Pending |
| PERF-03 | — | Pending |
| PERF-04 | — | Pending |
| PERF-05 | — | Pending |

**Coverage:**
- v1 requirements: 45 total
- Mapped to phases: 0
- Unmapped: 45

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-23 after initial definition*
