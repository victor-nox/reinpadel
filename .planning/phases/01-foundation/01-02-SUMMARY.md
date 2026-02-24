---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [react, typescript, tailwind, french-typography, button, section-wrapper, jsx]

# Dependency graph
requires:
  - 01-01 (cn() helper, brand color tokens, font-display/font-body utilities)
provides:
  - frenchTypography() function inserting Unicode NBSP before French punctuation
  - Fr JSX component wrapping frenchTypography for clean template usage
  - Button component: pill-shaped, 5 variants, 3 sizes, cn() class merging
  - SectionWrapper component: consistent padding, max-w-6xl, semantic as prop
affects:
  - All Phase 2 section components (use Button and SectionWrapper directly)
  - Any component with French text (use Fr or frenchTypography)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Record<Variant, string> lookup for Tailwind classes — never dynamic template literals"
    - "cn() from @/lib/utils for all conditional/merged class names in components"
    - "JSX utilities in .tsx files — even if primary export is non-JSX"
    - "Fr component as thin JSX wrapper over pure utility function"

key-files:
  created:
    - src/lib/typography.tsx
    - src/components/ui/Button.tsx
    - src/components/ui/SectionWrapper.tsx
  modified:
    - src/app/page.tsx

key-decisions:
  - "Used .tsx extension for typography file because Fr component uses JSX fragment syntax — .ts extension causes esbuild transform error"
  - "Narrow NBSP (\\u202F) for ? ! ; and regular NBSP (\\u00A0) for : and guillemets — typographically different widths, not interchangeable"
  - "Record<ButtonVariant, string> for variant lookup — prevents Tailwind class purging issues from dynamic class construction"

patterns-established:
  - "Button variants: primary=cyan, ghost=white-on-dark, blue=navy, red=coral, outline=navy-border"
  - "SectionWrapper: outer py-16 md:py-24, inner max-w-6xl px-4 sm:px-6 lg:px-8"
  - "French text: always use Fr component or frenchTypography() — never hardcode NBSP characters"

requirements-completed: [FOUN-04, FOUN-05]

# Metrics
duration: 2min
completed: 2026-02-24
---

# Phase 1 Plan 02: UI Primitives Summary

**French typography utility (frenchTypography + Fr) and pill-shaped Button (5 variants, 3 sizes) and SectionWrapper (max-w-6xl, responsive padding) with showcase page proving all Phase 1 outputs**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-24T10:01:47Z
- **Completed:** 2026-02-24T10:03:48Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `src/lib/typography.tsx` with `frenchTypography()` inserting narrow NBSP (\u202F) before ? ! ; and regular NBSP (\u00A0) before : and inside guillemets
- Created `Fr` JSX component as a thin wrapper over `frenchTypography()` for clean template usage
- Created `src/components/ui/Button.tsx` with 5 variants (primary, ghost, blue, red, outline), 3 sizes (sm, md, lg), pill shape (rounded-full), cn() class merging, Record-based class lookup
- Created `src/components/ui/SectionWrapper.tsx` with outer py-16 md:py-24, inner max-w-6xl, responsive horizontal padding, semantic `as` prop (section | div | article)
- Updated `src/app/page.tsx` with a showcase demonstrating all button variants (including ghost on dark bg), SectionWrapper padding boundaries, French typography with all punctuation rules, and design token swatches
- `npm run build` succeeds with zero TypeScript errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create French typography utility** - `67c8547` (feat)
2. **Task 2: Create Button and SectionWrapper UI primitives with showcase page** - `a3433ca` (feat)

**Plan metadata:** (committed with this SUMMARY)

## Files Created/Modified

- `src/lib/typography.tsx` - frenchTypography() function and Fr JSX component
- `src/components/ui/Button.tsx` - Pill-shaped button with 5 variants, 3 sizes, cn() class merging
- `src/components/ui/SectionWrapper.tsx` - Layout wrapper with max-w-6xl, py-16 md:py-24, responsive padding
- `src/app/page.tsx` - Phase 1 showcase page demonstrating all primitives

## Decisions Made

- Used `.tsx` extension for `typography.tsx` because the `Fr` component uses JSX fragment syntax (`<>{...}</>`). A `.ts` extension causes an esbuild transform error ("Unexpected >") when tsx tries to process JSX.
- Narrow NBSP (`\u202F`) for ? ! ; and regular NBSP (`\u00A0`) for : and guillemets. These are typographically distinct widths per Imprimerie nationale standards — using `\u00A0` for everything would be incorrect.
- `Record<ButtonVariant, string>` lookup for Tailwind variant classes ensures all class names appear as complete strings in source code — prevents Tailwind's JIT from purging classes that would appear only in template literals.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Renamed typography.ts to typography.tsx for JSX support**

- **Found during:** Task 1 verification
- **Issue:** The `Fr` component uses JSX fragment syntax (`<>{...}</>`). When `tsx` tried to execute the file as `.ts`, esbuild emitted "Unexpected >" error because JSX is not valid in `.ts` files.
- **Fix:** Renamed `typography.ts` to `typography.tsx` so the JSX is parsed correctly.
- **Files modified:** `src/lib/typography.tsx` (renamed from `typography.ts`)
- **Commit:** `67c8547` (same task commit — fix applied inline before commit)

---

**Total deviations:** 1 auto-fixed (1 naming/extension bug)
**Impact on plan:** Zero scope impact. Output matches plan spec exactly. All imports still work because both TypeScript and Next.js resolve `.tsx` for `@/lib/typography` imports.

## Issues Encountered

- jsx in `.ts` file causes esbuild error — resolved by using `.tsx` extension (see Deviations)

## User Setup Required

None — all code is self-contained in the repository.

## Next Phase Readiness

- `Button` is importable as `import { Button } from '@/components/ui/Button'`
- `SectionWrapper` is importable as `import { SectionWrapper } from '@/components/ui/SectionWrapper'`
- `frenchTypography` and `Fr` are importable as `import { frenchTypography, Fr } from '@/lib/typography'`
- All components use `cn()`, brand color tokens (bg-brand-cyan, bg-brand-navy, bg-brand-coral), and font-display — all established in Plan 01
- `npm run build` passes — ready for Phase 2 section component assembly

## Self-Check: PASSED

All created files verified present on disk. All commits verified in git log.

- FOUND: src/lib/typography.tsx
- FOUND: src/components/ui/Button.tsx
- FOUND: src/components/ui/SectionWrapper.tsx
- FOUND: src/app/page.tsx (modified)
- FOUND: commit 67c8547 (Task 1)
- FOUND: commit a3433ca (Task 2)

---
*Phase: 01-foundation*
*Completed: 2026-02-24*
