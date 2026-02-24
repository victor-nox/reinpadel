---
phase: 02-content-sections
plan: "03"
subsystem: sections
tags: [disease-section, participation-section, react, tailwind, wcag]
dependency_graph:
  requires: ["02-01"]
  provides: ["DiseaseSection", "ParticipationSection"]
  affects: ["02-05-page-composition"]
tech_stack:
  added: []
  patterns: ["inline-svg-icons", "server-component", "fr-typography-wrapper"]
key_files:
  created:
    - src/components/sections/DiseaseSection.tsx
    - src/components/sections/ParticipationSection.tsx
  modified: []
decisions:
  - "Inline SVG icons for CardIcon helper (no icon library) keeps bundle size zero — decorative icons do not need pixel-perfect accuracy"
  - "brand-gray/70 opacity for card description text — provides readable contrast on white bg without hard-coding a grey value"
metrics:
  duration: "1m 23s"
  completed: "2026-02-24"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 02 Plan 03: Disease and Participation Sections Summary

DiseaseSection with dark navy bg and 3 verified French IgA stats, plus ParticipationSection with 3-card grid using blue/red/outline Button variants and inline SVG icons.

## Objective

Build the Disease awareness and Participation section components — the middle sections that communicate medical impact and call visitors to action.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create DiseaseSection component | 80d4628 | src/components/sections/DiseaseSection.tsx |
| 2 | Create ParticipationSection component | e3be61a | src/components/sections/ParticipationSection.tsx |

## What Was Built

### DiseaseSection (`src/components/sections/DiseaseSection.tsx`)

- Server Component using `SectionWrapper` with `id="maladie"` and `className="bg-brand-navy text-white"`
- Heading: "La maladie de Berger" in `font-display text-3xl font-bold md:text-4xl`
- Subheading emphasising the disease's invisibility and prevalence
- 2 concise body paragraphs explaining IgA nephropathy: immune deposits, silent kidney damage, danger of late discovery
- Statistics strip (DISE-02): 3 verified numbers — `~670 000`, `30%`, `0` — mapped from `DISEASE_STATS` constant
  - Stat values in `font-display text-5xl font-black text-brand-cyan` (cyan pop against navy)
  - Stat labels in `text-sm text-white/70`
- WCAG contrast: white on `#1a3a8a` (brand-navy) yields ~9.5:1 — passes both AA and AAA (DISE-03)
- All French text uses `Fr` component for typographic spacing

### ParticipationSection (`src/components/sections/ParticipationSection.tsx`)

- Server Component using `SectionWrapper` with `id="participer"` and `className="bg-white"`
- Section heading "Rejoignez l'aventure" centered with `text-brand-navy`
- Responsive grid: `grid-cols-1` on mobile, `md:grid-cols-3` on desktop
- 3 cards mapped from `PARTICIPATION_CARDS` constant (PART-01, PART-02):
  - Jouez — paddle icon, blue Button variant
  - Donnez — heart icon, red Button variant
  - Devenez Partenaire — handshake icon, outline Button variant
- `CardIcon` local helper renders inline SVG per icon name (no icon library dependency)
- Card layout: circular icon container, title, description (flex-1), CTA button anchored to bottom
- CTA wrapped in `<a href={card.href}><Button variant={card.variant}>` (PART-03)

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- Both files exist: confirmed
- `DISEASE_STATS` import count: 2 (import + usage in map)
- `PARTICIPATION_CARDS` import count: 3 (import + usage)
- `variant` usage count: 4 (type annotation + 3 card usages)
- `npm run build`: passes — TypeScript compiled successfully, static pages generated

## Self-Check: PASSED

- [x] `src/components/sections/DiseaseSection.tsx` exists
- [x] `src/components/sections/ParticipationSection.tsx` exists
- [x] Commit 80d4628 exists (DiseaseSection)
- [x] Commit e3be61a exists (ParticipationSection)
- [x] Build passes with no errors
