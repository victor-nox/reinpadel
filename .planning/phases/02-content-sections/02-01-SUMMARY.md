---
phase: 02-content-sections
plan: 01
subsystem: ui
tags: [next-image, tailwind, typescript, constants, assets]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js 16 scaffolding, Tailwind v4 config, globals.css, lib/utils.ts
provides:
  - 21 optimized image assets in public/ (rpt_logo, rpt_map, 19 partner logos)
  - src/lib/constants.ts with FACT_NUMBERS, DISEASE_STATS, PARTICIPATION_CARDS, PARTNERS, SECTION_IDS
  - Smooth scroll CSS on html element
affects: [02-02, 02-03, 02-04, 02-05, 02-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "constants.ts single source of truth for all section structured data"
    - "next/image asset serving requires files in public/ not src/"
    - "Array.from pattern for typed PARTNERS array with sequential IDs"

key-files:
  created:
    - src/lib/constants.ts
  modified:
    - src/app/globals.css
    - public/ (21 PNG files added, 5 default SVGs removed)

key-decisions:
  - "Used verified French medical numbers from AIRG-France/Orphanet (670 000 personnes, 30% dialyse, 0 curatif) over REQUIREMENTS.md placeholders"
  - "Partner logos stored as Array.from pattern rather than static array literal for DRY 19-entry list"
  - "Raw French text stored in constants without typography fixes — components apply Fr/frenchTypography() at render time"
  - "affiche-rtp.png NOT copied to public/ (1.3 MB, reference-only, not for display)"
  - "Partner logo intrinsic dimensions recorded: 20-75px height range, all RGBA PNGs, use object-contain with h-10 container for normalized display"

patterns-established:
  - "Pattern 1: All structured page data exported from src/lib/constants.ts as typed const arrays"
  - "Pattern 2: French text in constants uses plain strings; Fr component applied at render time"
  - "Pattern 3: PARTNERS array uses Array.from with index+1 for sequential /partner_logo_N.png srcs"

requirements-completed: [PERF-02, PRTN-04]

# Metrics
duration: 1min
completed: 2026-02-24
---

# Phase 02 Plan 01: Asset Migration and Constants Summary

**21 Next.js-optimized images in public/ plus typed constants.ts with all section data (FACT_NUMBERS, DISEASE_STATS, PARTICIPATION_CARDS, PARTNERS) and smooth scroll CSS — unlocking all subsequent Phase 2 section components.**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-24T12:20:35Z
- **Completed:** 2026-02-24T12:22:10Z
- **Tasks:** 2
- **Files modified:** 23 (21 images added to public/, globals.css updated, constants.ts created)

## Accomplishments

- Migrated all 21 required image assets from srv/grafic/ to public/ for next/image serving (logo 424x424, map 263x283, 19 partner logos with varying dimensions 20-75px height)
- Removed 5 unused Next.js scaffold SVGs (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
- Created src/lib/constants.ts exporting all 5 typed data structures used by Phase 2 section components
- Added scroll-behavior: smooth to html element in globals.css @layer base block
- npm run build passes cleanly after all changes

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate image assets from srv/grafic/ to public/** - `bf7509c` (chore)
2. **Task 2: Create constants.ts with all section data and add smooth scroll CSS** - `6eaa9b7` (feat)

**Plan metadata:** (see final commit)

## Files Created/Modified

- `src/lib/constants.ts` - FACT_NUMBERS (3), DISEASE_STATS (3), PARTICIPATION_CARDS (3), PARTNERS (19), SECTION_IDS (5 keys)
- `src/app/globals.css` - Added `scroll-behavior: smooth` to html rule in @layer base
- `public/rpt_logo.png` - Logo 424x424 RGBA PNG (69 KB)
- `public/rpt_map.png` - France map 263x283 RGBA PNG (41 KB)
- `public/partner_logo_1.png` through `public/partner_logo_19.png` - Partner logos, 20-75px height, all small RGBA PNGs

## Partner Logo Dimensions (recorded for Plan 04 next/image props)

| File | Width | Height |
|------|-------|--------|
| partner_logo_1.png | 79 | 20 |
| partner_logo_2.png | 60 | 40 |
| partner_logo_3.png | 67 | 33 |
| partner_logo_4.png | 62 | 12 |
| partner_logo_5.png | 48 | 48 |
| partner_logo_6.png | 84 | 28 |
| partner_logo_7.png | 36 | 43 |
| partner_logo_8.png | 75 | 75 |
| partner_logo_9.png | 76 | 28 |
| partner_logo_10.png | 54 | 35 |
| partner_logo_11.png | 86 | 72 |
| partner_logo_12.png | 62 | 62 |
| partner_logo_13.png | 50 | 39 |
| partner_logo_14.png | 59 | 35 |
| partner_logo_15.png | 71 | 39 |
| partner_logo_16.png | 54 | 29 |
| partner_logo_17.png | 44 | 29 |
| partner_logo_18.png | 32 | 32 |
| partner_logo_19.png | 58 | 32 |

Recommendation: Use `width={120} height={60}` as display dimensions with `className="object-contain"` — CSS controls rendered size regardless of intrinsic dimensions.

## Decisions Made

- Used verified French medical numbers from AIRG-France/Orphanet citing the project content doc (February 2026): ~670 000 personnes touchees, 30% dialyse, 0 curatif — REQUIREMENTS.md "1.5M" placeholder is worldwide figure not France-specific
- FACT_NUMBERS uses CONTEXT.md override: 9 villes, ~3 000 km, 10 jours (not REQUIREMENTS.md's 10 cities / 7,000 km)
- affiche-rtp.png deliberately excluded from public/ — 1.3 MB design reference not for display
- French text stored as plain strings in constants; Fr component and frenchTypography() applied at render time only

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All 21 images are in public/ and servable by Next.js via next/image
- constants.ts is a valid TypeScript module fully verifiable with npx tsx
- Smooth scroll CSS is in place for all anchor links across the page
- Plan 02 (HeroSection) can start immediately — rpt_logo.png ready at /rpt_logo.png
- Partner logo intrinsic dimensions documented above for accurate next/image width/height props in Plan 04

## Self-Check: PASSED

- FOUND: public/rpt_logo.png
- FOUND: public/rpt_map.png
- FOUND: public/partner_logo_1.png
- FOUND: public/partner_logo_19.png
- FOUND: src/lib/constants.ts
- FOUND: .planning/phases/02-content-sections/02-01-SUMMARY.md
- FOUND commit bf7509c: chore(02-01): migrate image assets to public/
- FOUND commit 6eaa9b7: feat(02-01): create constants.ts with section data and add smooth scroll CSS

---
*Phase: 02-content-sections*
*Completed: 2026-02-24*
