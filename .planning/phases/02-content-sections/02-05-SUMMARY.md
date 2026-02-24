---
phase: 02-content-sections
plan: 05
subsystem: ui
tags: [nextjs, react, tailwind, server-components, one-pager]

# Dependency graph
requires:
  - phase: 02-content-sections plan 02
    provides: HeroSection and MissionSection components
  - phase: 02-content-sections plan 03
    provides: DiseaseSection and ParticipationSection components
  - phase: 02-content-sections plan 04
    provides: PartnersSection and FooterSection components
provides:
  - Complete one-pager page.tsx composing all 6 sections
  - Hero with padel court background image and navy overlay
  - Blueish palette across Mission, Participation, Partners sections
  - Horizontal fact card layout in MissionSection
  - Bigger logo (w-36/w-48) in HeroSection
affects: [03-interactive-map, 04-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component page.tsx with no interactivity — all sections are server components"
    - "FooterSection outside <main> landmark — semantic HTML per PERF-04"
    - "Hero background via next/image fill with absolute overlay div"
    - "Blueish bg-blue-50 / bg-blue-100 variants for light sections instead of white"
    - "Fact cards in horizontal flex layout (value shrink-0 + label text)"

key-files:
  created:
    - public/hero-bg.png
  modified:
    - src/app/page.tsx
    - src/components/sections/HeroSection.tsx
    - src/components/sections/MissionSection.tsx
    - src/components/sections/ParticipationSection.tsx
    - src/components/sections/PartnersSection.tsx
    - src/lib/constants.ts
    - public/rpt_logo.png

key-decisions:
  - "Hero uses real padel court image (hero-bg.png) with bg-brand-navy/70 overlay instead of CSS gradient — more visual impact"
  - "Logo CSS size increased to w-36 md:w-48 (was w-24 md:w-32) — better brand presence in hero"
  - "All light sections shifted from white to blue-50/blue-100 palette — cohesive blueish story matching navy brand"
  - "Fact cards use horizontal flex (value + label) not vertical stacked — cleaner, more compact layout"
  - "FACT_NUMBERS reordered: 9 villes first, then 10 jours, then ~3000 km — narrative order matches journey story"
  - "FooterSection rendered outside <main> — footer is document-level landmark, not main content (semantic HTML PERF-04)"
  - "No wrapper div or extra classes in page.tsx — each section manages its own background/padding"

patterns-established:
  - "next/image fill for full-bleed backgrounds with absolute positioned overlay"
  - "Blueish section palette: bg-blue-50 (sections), bg-blue-100/60 (card backgrounds), bg-blue-100/40 (dense grids)"

requirements-completed: [PERF-04]

# Metrics
duration: 15min
completed: 2026-02-24
---

# Phase 2 Plan 05: One-Pager Composition Summary

**Complete one-pager assembled from 6 section components with padel court hero background, blueish palette, and visually approved layout at both desktop and mobile breakpoints.**

## Performance

- **Duration:** 15 min
- **Started:** 2026-02-24T14:00:00Z
- **Completed:** 2026-02-24T14:15:00Z
- **Tasks:** 2 (including checkpoint)
- **Files modified:** 7

## Accomplishments

- Replaced Phase 1 showcase in page.tsx with complete one-pager composition — Hero, Mission, Disease, Participation, Partners, Footer in correct semantic order
- Applied human-approved design tweaks: real padel court background image in hero, larger logo, blueish section palette, horizontal fact cards
- PERF-04 semantic HTML audit passed: all sections use section/footer landmarks, H1/H2 hierarchy correct, all images have alt text

## Task Commits

1. **Task 1: Compose all sections into page.tsx** - `b97b683` (feat)
2. **Task 2: Visual verification — design tweaks applied** - `4fb802e` (feat)

**Plan metadata:** (see final docs commit)

## Files Created/Modified

- `src/app/page.tsx` - One-pager composition: imports and renders all 6 section components
- `src/components/sections/HeroSection.tsx` - Background changed to padel court image + navy overlay; logo size w-36/w-48
- `src/components/sections/MissionSection.tsx` - bg-blue-50 section background; fact cards in horizontal flex layout
- `src/components/sections/ParticipationSection.tsx` - bg-blue-50 section; blue-100/60 card backgrounds
- `src/components/sections/PartnersSection.tsx` - bg-blue-100/40 section background
- `src/lib/constants.ts` - FACT_NUMBERS reordered (9 villes, 10 jours, ~3000 km)
- `public/hero-bg.png` - Padel court background image (1.4 MB, priority LCP)
- `public/rpt_logo.png` - Replaced with bigger logo version

## Decisions Made

- Used real padel court image instead of CSS gradient for hero — makes the sport immediately recognizable and dramatically more visual.
- Kept nav overlay at bg-brand-navy/70 (not full opacity) — retains background image visibility while ensuring white text contrast.
- Blueish palette (bg-blue-50 / bg-blue-100) instead of white for light sections — creates visual cohesion with the navy brand color while differentiating from the dark DiseaseSection.
- Fact cards horizontal: stat value (shrink-0, text-4xl) sits beside label text, much more readable than stacked layout especially on narrow mobile.
- FACT_NUMBERS order 9 → 10 → ~3000: follows narrative progression (cities visited, days challenged, kilometers driven).

## Deviations from Plan

The plan called for a straightforward composition task followed by human verification. The user approved with design tweaks applied during the checkpoint session. These tweaks were committed post-checkpoint as a single atomic commit.

**Design tweaks from human verification (not in original plan):**
- Hero background image + overlay (was gradient)
- Logo size increase
- Section palette shift to blueish
- Fact card layout change to horizontal
- FACT_NUMBERS reorder

These are presentation-level changes, not architectural. No auto-fix rules triggered.

**Total deviations:** 1 planned deviation (design tweaks applied from checkpoint feedback)
**Impact on plan:** Visual polish improvements only. No scope creep, no structural changes.

## Issues Encountered

None — build passed, all 6 sections rendered correctly in correct order, mobile and desktop layouts both verified by user.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 6 section components built and visually approved
- One-pager fully composed and live at http://localhost:3000
- Phase 3 (Interactive Map) can start: DiseaseSection is ready to receive the FranceMap component slot
- Blocker noted for Phase 3: France SVG outline and kidney tour path must be sourced before implementation

---
*Phase: 02-content-sections*
*Completed: 2026-02-24*

## Self-Check: PASSED

- FOUND: src/app/page.tsx
- FOUND: src/components/sections/HeroSection.tsx
- FOUND: public/hero-bg.png
- FOUND: .planning/phases/02-content-sections/02-05-SUMMARY.md
- FOUND commit: b97b683 (page composition)
- FOUND commit: 4fb802e (design tweaks)
