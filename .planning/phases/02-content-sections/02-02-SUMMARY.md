---
phase: 02-content-sections
plan: 02
subsystem: ui
tags: [next-image, tailwind, react, typescript, server-components, typography]

# Dependency graph
requires:
  - phase: 02-content-sections
    plan: 01
    provides: rpt_logo.png in public/, constants.ts with FACT_NUMBERS, SectionWrapper, Fr typography component
  - phase: 01-foundation
    provides: Next.js 16 scaffolding, Tailwind v4 config, globals.css, lib/utils.ts
provides:
  - src/components/sections/HeroSection.tsx — priority-loaded logo, blue gradient, H1, date badge, two CTAs
  - src/components/sections/MissionSection.tsx — two-column layout, Antoine quote, fact cards from FACT_NUMBERS
affects: [02-05, 02-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Components for static sections — no use client needed for non-interactive content"
    - "Inline anchor tags for CTA links instead of Button component — semantic HTML for navigation"
    - "Fr component applied to all French text at render time"
    - "SectionWrapper used for standard sections; Hero has custom layout without wrapper"

key-files:
  created:
    - src/components/sections/HeroSection.tsx
    - src/components/sections/MissionSection.tsx
  modified: []

key-decisions:
  - "HeroSection does not use SectionWrapper — hero needs full-width gradient with different vertical padding (py-20 md:py-32) vs standard py-16 md:py-24"
  - "CTA links are anchor tags not Button component — semantic correctness for navigation links"
  - "Date badge uses en-dash (–) not hyphen (-) per typographic standards: 6 – 15 MARS 2026"
  - "Fact card grid uses sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 for responsive reflow in the two-column layout context"

patterns-established:
  - "Pattern 1: Static content sections are Server Components — no use client directive"
  - "Pattern 2: French text always wrapped with Fr component at render time, not stored pre-processed"
  - "Pattern 3: Hero section gets its own layout structure; standard sections use SectionWrapper"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, MISS-01, MISS-02, MISS-03]

# Metrics
duration: 2min
completed: 2026-02-24
---

# Phase 02 Plan 02: Hero and Mission Sections Summary

**HeroSection with priority-loaded logo, blue gradient, date badge, and dual CTAs plus MissionSection with two-column responsive layout, Antoine's blockquote, and fact cards from FACT_NUMBERS constants.**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-24T12:25:01Z
- **Completed:** 2026-02-24T12:27:00Z
- **Tasks:** 2
- **Files modified:** 2 (both created new)

## Accomplishments

- Created HeroSection.tsx as a Server Component with priority-loaded logo (LCP optimization), blue gradient background, coral date badge, display-font H1, subtitle, and primary + ghost anchor CTAs
- Created MissionSection.tsx with two-column responsive grid layout, two body paragraphs, Antoine's blockquote with coral left border, and 3 fact cards mapping FACT_NUMBERS from constants.ts
- Full npm run build passes cleanly with both new components

## Task Commits

Each task was committed atomically:

1. **Task 1: Create HeroSection component** - `b8e778f` (feat)
2. **Task 2: Create MissionSection component** - `af8b47a` (feat)

**Plan metadata:** (see final commit)

## Files Created/Modified

- `src/components/sections/HeroSection.tsx` — 66 lines; logo (priority), date badge "6 – 15 MARS 2026", H1 "REIN PADEL TOUR 2026", subtitle, primary CTA + ghost CTA linking to #mission
- `src/components/sections/MissionSection.tsx` — 67 lines; two-column grid, h2 heading, 2 body paragraphs, Antoine blockquote, 3 FACT_NUMBERS cards

## Decisions Made

- HeroSection does not use SectionWrapper because the hero needs a full-width gradient background spanning the entire viewport width, plus different vertical padding (py-20 md:py-32) vs the standard py-16 md:py-24 that SectionWrapper applies
- CTA elements are anchor tags (not Button component) because they are navigation links — semantic HTML best practice; the ghost anchor mirrors Button ghost variant styles via inline Tailwind
- Date badge uses an en-dash (–) not a hyphen: "6 – 15 MARS 2026" per typographic standards
- Fact card grid uses `sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3` to correctly reflow within the two-column layout context (on md screens, cards are in the right column of a 2-col grid, so they go 1-wide; on lg screens the column is wide enough for 3)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- HeroSection and MissionSection are valid React Server Components, TypeScript-clean, and build-verified
- Both components ready for page composition in Plan 05 (page layout)
- Ghost CTA href="#mission" scroll target is set; Hero primary CTA uses placeholder href="#"
- The sections directory is established at src/components/sections/ for subsequent section components (Plans 02-03, 02-04)

## Self-Check: PASSED

- FOUND: src/components/sections/HeroSection.tsx
- FOUND: src/components/sections/MissionSection.tsx
- FOUND commit b8e778f: feat(02-02): create HeroSection component
- FOUND commit af8b47a: feat(02-02): create MissionSection component
- priority attribute present in HeroSection (grep count: 2)
- FACT_NUMBERS import present in MissionSection (grep count: 2)
- #mission anchor link present in HeroSection
- npm run build: PASSED

---
*Phase: 02-content-sections*
*Completed: 2026-02-24*
