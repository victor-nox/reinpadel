# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Visitors immediately understand what the Rein Padel Tour is, why it matters, and how they can get involved — in under 30 seconds.
**Current focus:** Phase 2 - Content Sections

## Current Position

Phase: 2 of 4 (Content Sections)
Plan: 4 of 5 in current phase
Status: In progress
Last activity: 2026-02-24 — Completed Plan 04 (PartnersSection + FooterSection)

Progress: [████░░░░░░] 40%

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: 2 min
- Total execution time: 0.13 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 5 min | 2.5 min |
| 02-content-sections | 2 | 4 min | 2 min |

**Recent Trend:**
- Last 5 plans: 01-01 (3 min), 01-02 (2 min), 02-01 (2 min), 02-02 (2 min), 02-04 (1 min)
- Trend: Fast — section components building efficiently from constants and design spec

*Updated after each plan completion*
| Phase 02-content-sections P03 | 1m 23s | 2 tasks | 2 files |
| Phase 02-content-sections P04 | 1m 7s | 2 tasks | 2 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- One-pager MVP (not multi-page): Speed to launch, single scroll from social media
- No external links in v1: Lean first shot, focus on visual/content structure
- Hardcoded data in constants.ts: No CMS needed for MVP, can migrate later
- Used @theme inline (not plain @theme) for Tailwind v4: next/font CSS variables must be referenced without shadowing
- Brand colors extracted from poster: navy #1a3a8a, cyan #0ea5e9, coral #e85d4a, yellow-green #b8d42a
- Scaffolded Next.js in /tmp (naming restriction): create-next-app rejects uppercase directory names
- Used .tsx extension for typography file: Fr JSX component requires .tsx — .ts causes esbuild "Unexpected >" error
- Narrow NBSP (\u202F) for ? ! ; and regular NBSP (\u00A0) for : and guillemets: typographically distinct per Imprimerie nationale
- Record<ButtonVariant, string> for Tailwind classes: prevents JIT purging of classes in dynamic template literals
- Verified French medical stats (670 000 personnes, 30% dialyse, 0 curatif): REQUIREMENTS.md "1.5M" is worldwide figure; used AIRG-France/Orphanet numbers from content doc
- FACT_NUMBERS uses CONTEXT.md override (9 villes, ~3 000 km, 10 jours): REQUIREMENTS.md values (10 cities, 7,000 km) were incorrect
- French text stored as plain strings in constants.ts: Fr component applies typography at render time only
- Partner logos at uniform size in single-tier grid: CONTEXT.md overrides REQUIREMENTS.md PRTN-01 two-tier distinction
- [Phase 02-03]: Inline SVG icons for CardIcon (no icon library) keeps bundle size zero
- HeroSection does not use SectionWrapper: hero needs full-width gradient with py-20/py-32 vs standard py-16/py-24
- CTA links are anchor tags not Button component: semantic HTML for navigation links
- [Phase 02-04]: Grayscale-to-color hover on partner logos uses Tailwind grayscale/grayscale-0 utilities (pure CSS, zero JS)
- [Phase 02-04]: Inline SVG social icons (Instagram, Facebook) — two icons not worth adding an icon library

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 3]: France SVG outline and kidney-shaped tour path must be sourced/designed before FranceMap implementation. Natural Earth for France outline, custom bezier for kidney route. Station SVG viewport coordinates also needed once viewBox is finalized.
- [Phase 4]: Mentions legales page requires real legal content (RNA/SIRET, operator address, directeur de publication) from the project owner — this is a human input dependency, not a code task.

## Session Continuity

Last session: 2026-02-24
Stopped at: Completed 02-02-PLAN.md — HeroSection and MissionSection ready for page composition in Plan 05
Resume file: None
