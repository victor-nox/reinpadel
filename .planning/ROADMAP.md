# Roadmap: Rein Padel Tour 2026

## Overview

Four phases take the project from an empty Next.js scaffold to a live, legally-compliant French one-pager. Foundation first (tokens, types, shared primitives), then all static content sections (Hero through Footer), then the two interactive Client Components (Navbar scroll behavior and the animated SVG France map), and finally legal compliance, SEO metadata, and the Lighthouse audit gate before launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Project scaffold, design tokens, fonts, shared UI primitives
- [ ] **Phase 2: Content Sections** - All static page sections from Hero to Footer, fully responsive
- [ ] **Phase 3: Interactive Components** - Sticky navbar, animated SVG France map with 9 station markers
- [ ] **Phase 4: Legal, SEO, and Launch** - Mentions legales, Open Graph metadata, Lighthouse audit

## Phase Details

### Phase 1: Foundation
**Goal**: A running Next.js 15 project with the correct design system, fonts, and shared primitives so every subsequent component can be built without rework
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05
**Success Criteria** (what must be TRUE):
  1. `npm run dev` starts without errors and renders a blank root layout at localhost:3000
  2. Tailwind v4 utility classes apply the poster color palette (Padel-Court blue, kidney red, ball yellow-green) visibly in the browser
  3. Montserrat and Inter fonts render via `next/font` with zero layout shift (CLS = 0 in DevTools)
  4. A French text sample using the typography utility renders non-breaking spaces correctly before `: ? ! ;`
  5. SectionWrapper and Button primitives render in isolation with correct padding and contrast
**Plans:** 2 plans
Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 15, design tokens, and Google Fonts
- [x] 01-02-PLAN.md — French typography utility and UI primitives (Button, SectionWrapper)

### Phase 2: Content Sections
**Goal**: A fully scrollable one-pager where visitors can read the complete story — from the hero headline to the footer — on any device, with all images optimized and all French copy correct
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, MISS-01, MISS-02, MISS-03, DISE-01, DISE-02, DISE-03, PART-01, PART-02, PART-03, PRTN-01, PRTN-02, PRTN-03, PRTN-04, FOOT-01, FOOT-02, FOOT-03, FOOT-04, FOOT-05, PERF-02, PERF-04
**Success Criteria** (what must be TRUE):
  1. Visitor on a 375px screen can scroll from the hero headline to the footer without any layout overflow or broken text
  2. Hero section displays the logo, "REIN PADEL TOUR 2026" headline, the red "6 - 15 MARS 2026" date badge, and two CTA buttons
  3. Mission section shows Antoine's quote and the three key-number fact cards (7,000 km / 1 rein / 9 villes)
  4. Disease section renders white text on dark blue with all impact statistics legible (WCAG AA contrast passes)
  5. Partners section shows the two-tier logo grid with grayscale-to-color hover effect; footer shows social icons and copyright
**Plans:** 4/5 plans executed
Plans:
- [x] 02-01-PLAN.md — Asset migration and constants data file
- [ ] 02-02-PLAN.md — Hero and Mission sections
- [ ] 02-03-PLAN.md — Disease and Participation sections
- [ ] 02-04-PLAN.md — Partners and Footer sections
- [ ] 02-05-PLAN.md — Page composition and visual verification

### Phase 3: Interactive Components
**Goal**: The page is fully interactive — the navbar transitions from transparent to solid on scroll, the mobile menu opens and closes, and the France SVG map displays the animated kidney route with hoverable station markers
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, ROUT-01, ROUT-02, ROUT-03, ROUT-04, PERF-03
**Success Criteria** (what must be TRUE):
  1. Scrolling past the hero section causes the navbar background to transition from transparent to solid blue, visibly
  2. On a 375px device, tapping the hamburger icon opens the mobile menu; tapping a link or the close icon dismisses it and scrolls to the correct section
  3. France SVG map renders the kidney-shaped tour route as an animated draw-on path that plays once when the section scrolls into view
  4. Each of the 9 station markers on the map shows a tooltip with city name and date on hover (desktop) or tap (mobile)
  5. All station data (city, date, club) is also visible in the station list rendered from `lib/constants.ts`
**Plans**: TBD

### Phase 4: Legal, SEO, and Launch
**Goal**: The site is legally compliant, socially shareable with a correct preview card, scores Lighthouse >= 95 on mobile, and is ready to go live before March 6
**Depends on**: Phase 3
**Requirements**: LEGL-01, LEGL-02, LEGL-03, LEGL-04, PERF-01, PERF-05
**Success Criteria** (what must be TRUE):
  1. `/mentions-legales` renders required French legal content (operator identity, RNA/SIRET, registered address, host details) — not a placeholder
  2. Sharing the production URL on Facebook or WhatsApp shows a correct preview card with the OG image, title, and description in French
  3. Lighthouse mobile audit on the production URL returns a score >= 95 for Performance
  4. All French text on every page uses non-breaking spaces before `: ? ! ;` (grep check passes with zero hits for bare ` ?` or ` :`)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete | 2026-02-24 |
| 2. Content Sections | 4/5 | In Progress|  |
| 3. Interactive Components | 0/TBD | Not started | - |
| 4. Legal, SEO, and Launch | 0/TBD | Not started | - |
