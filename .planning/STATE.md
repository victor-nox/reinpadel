# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Visitors immediately understand what the Rein Padel Tour is, why it matters, and how they can get involved — in under 30 seconds.
**Current focus:** Phase 1 - Foundation

## Current Position

Phase: 1 of 4 (Foundation)
Plan: 2 of 2 in current phase
Status: In progress
Last activity: 2026-02-24 — Completed Plan 02 (French typography, Button, SectionWrapper)

Progress: [██░░░░░░░░] 20%

## Performance Metrics

**Velocity:**
- Total plans completed: 2
- Average duration: 2.5 min
- Total execution time: 0.08 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 2 | 5 min | 2.5 min |

**Recent Trend:**
- Last 5 plans: 01-01 (3 min), 01-02 (2 min)
- Trend: Fast — primitives and utilities built efficiently

*Updated after each plan completion*

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

### Pending Todos

None yet.

### Blockers/Concerns

- [Phase 3]: France SVG outline and kidney-shaped tour path must be sourced/designed before FranceMap implementation. Natural Earth for France outline, custom bezier for kidney route. Station SVG viewport coordinates also needed once viewBox is finalized.
- [Phase 4]: Mentions legales page requires real legal content (RNA/SIRET, operator address, directeur de publication) from the project owner — this is a human input dependency, not a code task.

## Session Continuity

Last session: 2026-02-24
Stopped at: Completed 01-02-PLAN.md — Phase 1 foundation complete, ready for Phase 2
Resume file: None
