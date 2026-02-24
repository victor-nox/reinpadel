# Requirements: Rein Padel Tour 2026

**Defined:** 2026-02-23
**Core Value:** Visitors immediately understand what the Rein Padel Tour is, why it matters, and how they can get involved — in under 30 seconds.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUN-01**: Project scaffolded with Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- [x] **FOUN-02**: Custom design tokens defined (colors, fonts, spacing) matching poster identity
- [x] **FOUN-03**: Montserrat and Inter fonts loaded via next/font with zero CLS
- [x] **FOUN-04**: French typography utility with non-breaking spaces before : ? ! ;
- [x] **FOUN-05**: Shared UI primitives (SectionWrapper, Button) established

### Navigation

- [ ] **NAV-01**: Sticky navbar transitions from transparent to solid on scroll
- [ ] **NAV-02**: Navbar has logo (left) and section links (right) with CTA button
- [ ] **NAV-03**: Mobile hamburger menu for small screens
- [ ] **NAV-04**: Smooth scroll to sections via native anchor links

### Hero

- [x] **HERO-01**: Fullscreen hero section with logo, headline "REIN PADEL TOUR 2026", and subheadline
- [x] **HERO-02**: Date badge "6 – 15 MARS 2026" in pill shape with red background
- [x] **HERO-03**: Primary CTA button "Participez a l'aventure" (placeholder href)
- [x] **HERO-04**: Secondary ghost CTA button "Decouvrir la mission" (scrolls to Mission)
- [x] **HERO-05**: Hero image/background eager-loaded for LCP performance

### Mission

- [x] **MISS-01**: Two-column layout (text left, facts right) on desktop, stacked on mobile
- [x] **MISS-02**: Project explanation text with Antoine's personal quote (blockquote style)
- [x] **MISS-03**: 3 fact cards displaying key numbers (7,000 km / 1 rein / 9 villes)

### Disease

- [x] **DISE-01**: Dark blue background section explaining Berger's disease
- [x] **DISE-02**: Impact statistics strip (1.5M affected / 10% terminal / 0 cures)
- [x] **DISE-03**: White text on dark background with sufficient WCAG contrast

### Route

- [ ] **ROUT-01**: Inline SVG France map with kidney-shaped tour route displayed
- [ ] **ROUT-02**: 9 station markers on the map with hover tooltips (city + date)
- [ ] **ROUT-03**: Station list alongside map (desktop) or below (mobile) with city, date, club
- [ ] **ROUT-04**: Station data sourced from lib/constants.ts

### Participation

- [x] **PART-01**: 3-card layout (Jouez, Donnez, Devenez Partenaire) on desktop, stacked on mobile
- [x] **PART-02**: Each card has icon, title, description, and CTA button (placeholder href)
- [x] **PART-03**: Distinct button styles per card (blue, red, outline)

### Partners

- [x] **PRTN-01**: Two-tier logo grid (main partners larger, partners smaller)
- [x] **PRTN-02**: Grayscale logos that show color on hover
- [x] **PRTN-03**: CTA to become a partner (placeholder href)
- [x] **PRTN-04**: Partner data sourced from lib/constants.ts

### Footer

- [x] **FOOT-01**: Dark blue footer with 3-column layout (logo+text, links, social)
- [x] **FOOT-02**: Mission statement text
- [x] **FOOT-03**: Section navigation links and legal page links
- [x] **FOOT-04**: Social media icons (Instagram, Facebook)
- [x] **FOOT-05**: Copyright line

### Legal & SEO

- [ ] **LEGL-01**: Mentions legales page at /mentions-legales with required French legal content
- [ ] **LEGL-02**: SEO metadata (title, description, keywords) in French
- [ ] **LEGL-03**: Open Graph tags with og:image for social sharing
- [ ] **LEGL-04**: metadataBase configured for correct OG image URLs in production

### Performance & Quality

- [ ] **PERF-01**: Lighthouse score >= 95 on mobile preset
- [x] **PERF-02**: All images use next/image for automatic optimization
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
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Complete |
| FOUN-04 | Phase 1 | Complete |
| FOUN-05 | Phase 1 | Complete |
| NAV-01 | Phase 3 | Pending |
| NAV-02 | Phase 3 | Pending |
| NAV-03 | Phase 3 | Pending |
| NAV-04 | Phase 3 | Pending |
| HERO-01 | Phase 2 | Complete |
| HERO-02 | Phase 2 | Complete |
| HERO-03 | Phase 2 | Complete |
| HERO-04 | Phase 2 | Complete |
| HERO-05 | Phase 2 | Complete |
| MISS-01 | Phase 2 | Complete |
| MISS-02 | Phase 2 | Complete |
| MISS-03 | Phase 2 | Complete |
| DISE-01 | Phase 2 | Complete |
| DISE-02 | Phase 2 | Complete |
| DISE-03 | Phase 2 | Complete |
| ROUT-01 | Phase 3 | Pending |
| ROUT-02 | Phase 3 | Pending |
| ROUT-03 | Phase 3 | Pending |
| ROUT-04 | Phase 3 | Pending |
| PART-01 | Phase 2 | Complete |
| PART-02 | Phase 2 | Complete |
| PART-03 | Phase 2 | Complete |
| PRTN-01 | Phase 2 | Complete |
| PRTN-02 | Phase 2 | Complete |
| PRTN-03 | Phase 2 | Complete |
| PRTN-04 | Phase 2 | Complete |
| FOOT-01 | Phase 2 | Complete |
| FOOT-02 | Phase 2 | Complete |
| FOOT-03 | Phase 2 | Complete |
| FOOT-04 | Phase 2 | Complete |
| FOOT-05 | Phase 2 | Complete |
| LEGL-01 | Phase 4 | Pending |
| LEGL-02 | Phase 4 | Pending |
| LEGL-03 | Phase 4 | Pending |
| LEGL-04 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 2 | Complete |
| PERF-03 | Phase 3 | Pending |
| PERF-04 | Phase 2 | Pending |
| PERF-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 45 total
- Mapped to phases: 45
- Unmapped: 0

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-24 after 02-01 execution — PERF-02, PRTN-04 complete*
