# Phase 1: Foundation - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Running Next.js 15 project with design tokens matching the poster identity, Montserrat + Inter fonts with zero CLS, French typography utility, and shared UI primitives (SectionWrapper, Button). Everything subsequent phases need to build components without rework.

</domain>

<decisions>
## Implementation Decisions

### Color palette
- Extract exact hex values from the poster image (`srv/grafic/affiche-rtp.png`) and logo (`srv/grafic/rpt_logo.png`)
- Two separate blue tokens: navy/dark blue (headings, dark backgrounds) and cyan/bright blue (accents, highlights) — both are core brand colors
- Coral/salmon red for kidney theme and CTAs
- Yellow-green for ball accent and "2026" highlights
- Brand-tinted neutral grays (slight navy tint) for body text, borders, subtle backgrounds
- No full shade scales — use poster colors as-is; Claude generates any needed tints/shades during implementation

### Button variants
- Rounded pill shape (fully rounded ends, matching the date badge style on the poster)
- Primary CTA: cyan blue solid background with white text
- Ghost/secondary CTA: transparent background, white border and white text (designed for dark/image backgrounds)
- Participation card buttons: blue, red, and outline variants (per PART-03 requirements)

### Claude's Discretion
- Button sizes (how many, exact dimensions) — based on where buttons appear across phases
- Exact hex values extracted from poster — Claude picks the closest clean values
- Font usage rules (when Montserrat vs Inter, weight hierarchy)
- Section layout approach (SectionWrapper padding, max-width, spacing)
- French typography utility implementation details

</decisions>

<specifics>
## Specific Ideas

- Poster image at `srv/grafic/affiche-rtp.png` and logo at `srv/grafic/rpt_logo.png` are the color source of truth
- The poster has a bold, sporty identity — buttons and UI should feel energetic, not corporate
- Date badge on poster ("6 - 15 MARS 2026") is the reference for the pill shape style

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-02-24*
