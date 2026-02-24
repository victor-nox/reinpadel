---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [nextjs, tailwind, typescript, next-font, design-tokens, google-fonts]

# Dependency graph
requires: []
provides:
  - Next.js 15 project scaffold with TypeScript and App Router
  - Tailwind CSS v4 with @theme inline brand color tokens (6 colors)
  - Montserrat (display) and Inter (body) fonts via next/font with zero CLS
  - cn() utility helper combining clsx and tailwind-merge
  - French lang attribute and metadata in root layout
affects:
  - 01-02 (SectionWrapper and Button primitives use brand tokens and cn())
  - All subsequent phases (every component uses brand colors and fonts)

# Tech tracking
tech-stack:
  added:
    - next@16.1.6
    - react@19.2.3
    - tailwindcss@^4
    - "@tailwindcss/postcss@^4"
    - clsx@^2.1.1
    - tailwind-merge@^3.5.0
  patterns:
    - Tailwind v4 @import and @theme inline (not v3 directives)
    - next/font/google with CSS variable option for zero CLS
    - Font CSS variables on <html>, referenced by @theme inline for font utilities

key-files:
  created:
    - src/lib/utils.ts
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/page.tsx
    - postcss.config.mjs
    - package.json
  modified: []

key-decisions:
  - "Used @theme inline (not plain @theme) so next/font CSS variables can be referenced without being shadowed"
  - "Brand colors extracted directly from poster image: navy #1a3a8a, cyan #0ea5e9, coral #e85d4a, yellow-green #b8d42a, gray #1e293b, gray-light #e8ecf4"
  - "Font variables placed on <html> element (not <body>) so @theme inline can resolve them at CSS variable resolution time"
  - "display: swap on both fonts ensures text visible during font load, adjustFontFallback default true provides metric-matched fallback for zero CLS"

patterns-established:
  - "Tailwind v4: Use @import tailwindcss + @theme inline block — never v3 directives"
  - "cn() helper: Always use for conditional/merged class names in components"
  - "Font loading: next/font/google with variable option, classes on <html>, referenced via @theme inline"

requirements-completed: [FOUN-01, FOUN-02, FOUN-03]

# Metrics
duration: 3min
completed: 2026-02-24
---

# Phase 1 Plan 01: Foundation Scaffold Summary

**Next.js 15 project with Tailwind v4 @theme inline brand tokens (navy, cyan, coral, yellow-green) and Montserrat/Inter fonts via next/font with zero CLS**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-24T09:55:01Z
- **Completed:** 2026-02-24T09:58:30Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Scaffolded Next.js 15 with TypeScript, App Router, Tailwind CSS v4, and Turbopack
- Created Tailwind v4 design system with 6 brand color tokens and 2 font family tokens in `@theme inline`
- Loaded Montserrat (display) and Inter (body) via next/font/google with CSS variable option for zero CLS
- Created `cn()` utility helper (clsx + tailwind-merge) for all subsequent component work
- Set `lang="fr"` on html element and French title/description metadata

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 15 project with Tailwind v4 and install dependencies** - `f6af388` (chore)
2. **Task 2: Add brand design tokens and Google Fonts to the design system** - `0b40072` (feat)

**Plan metadata:** (to be added)

## Files Created/Modified

- `src/lib/utils.ts` - cn() helper combining clsx and tailwind-merge
- `src/app/globals.css` - Tailwind v4 @import + @theme inline with 6 brand colors and 2 font families
- `src/app/layout.tsx` - Root layout with Montserrat + Inter via next/font, lang="fr", French metadata
- `src/app/page.tsx` - Temporary token showcase (color swatches + typography demo)
- `postcss.config.mjs` - Tailwind v4 PostCSS plugin (@tailwindcss/postcss)
- `package.json` - Dependencies including next, react, tailwind, clsx, tailwind-merge

## Decisions Made

- Used `@theme inline` (not plain `@theme`) because font values reference CSS variables from next/font — without `inline`, Tailwind would generate its own CSS variable that shadows the next/font one
- Scaffolded in `/tmp` first (Next.js naming restriction rejects capital letters in directory names), then copied files to project root
- Brand colors extracted from visual analysis of `affiche-rtp.png` and `rpt_logo.png`: navy #1a3a8a, cyan #0ea5e9, coral #e85d4a, yellow-green #b8d42a
- Used `display: 'swap'` on both fonts; Next.js `adjustFontFallback` defaults to `true` providing metric-matched fallback for zero layout shift

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Scaffolded in /tmp and copied files due to npm naming restriction**

- **Found during:** Task 1 (project scaffolding)
- **Issue:** `npx create-next-app@latest . --yes` fails with "name can no longer contain capital letters" because the directory name `ReinPadel_web` contains uppercase letters
- **Fix:** Ran create-next-app in `/tmp/rein-padel-tour`, then copied all project files (excluding .git and node_modules) to the project root. Used lowercase package name `rein-padel-tour` in package.json.
- **Files modified:** All scaffolded files
- **Verification:** npm run build succeeds, project structure intact, srv/ directory untouched
- **Committed in:** f6af388 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking - scaffolding workaround)
**Impact on plan:** Workaround was necessary and transparent. Output matches plan spec exactly. No scope creep.

## Issues Encountered

- npm naming restriction in create-next-app prevents scaffolding directly in a directory with uppercase letters — resolved by scaffolding in /tmp and copying files (see Deviations above)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Project builds and runs with `npm run dev`
- All 6 brand color tokens generate working Tailwind utilities (bg-brand-navy, text-brand-cyan, etc.)
- Montserrat (font-display) and Inter (font-body) loaded via next/font with zero CLS
- cn() helper available via `import { cn } from '@/lib/utils'` for all component work
- Ready for Phase 1 Plan 02: SectionWrapper and Button primitives

---
*Phase: 01-foundation*
*Completed: 2026-02-24*
