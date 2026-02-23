# Rein Padel Tour 2026 — Website

## What This Is

A one-pager website for the Rein Padel Tour 2026 — a charity padel tour across France (March 6–15, 2026) where the driven route symbolically draws a kidney on the map of France to raise awareness for Berger's disease (IgA nephropathy). The website is the first digital touchpoint for the project and serves potential players, donors, and partners.

## Core Value

Visitors immediately understand what the Rein Padel Tour is, why it matters, and how they can get involved — in under 30 seconds.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section with logo, headline, date badge, and CTAs
- [ ] Mission section explaining the project with key facts (7,000 km, 1 kidney, 9 cities)
- [ ] Disease section about Berger's disease with impact statistics
- [ ] Route section with France map showing kidney-shaped tour route and 9 stations
- [ ] Participation section with 3 cards (Play, Donate, Become Partner)
- [ ] Partners section with logo grid (main partners + partners)
- [ ] Footer with mission statement, nav links, social icons, legal links
- [ ] Sticky navbar (transparent to solid on scroll)
- [ ] Mentions légales page (legally required in France)
- [ ] Fully responsive (mobile-first — 70%+ traffic from social media)
- [ ] French-language content throughout
- [ ] SEO metadata and Open Graph tags
- [ ] High performance (Lighthouse ≥ 95)

### Out of Scope

- Live links / working CTAs — v1 uses placeholder hrefs, no external integrations
- Blog / Actualités — deferred to phase 2+
- Live GPS tracking — deferred to tour week (phase 3+)
- Donation integration (Stripe/HelloAsso) — phase 2+
- Newsletter signup — phase 2+
- Multilingual support (FR/DE/EN) — deferred, architecture should allow it later
- Real-time ace counter — phase 3+
- Video gallery — phase 2+
- Cookie banner — not needed without tracking (Plausible is cookieless)

## Context

- The tour is March 6–15, 2026 — website launch is time-critical
- Initiator Antoine has Berger's disease himself — personal story is central
- Traffic will primarily come from Instagram/Facebook shares — mobile experience is paramount
- Logo, poster, and partner logo assets are already in the repository
- The poster (`affiche-rtp.png`) defines the visual identity: Padel-Court blue, kidney red, ball yellow-green
- All website text content is provided in French in the spec
- The spec includes all station data (9 cities with dates, clubs, coordinates)
- V1 has no external links/CTAs — purely visual and informational

## Constraints

- **Tech stack**: Next.js 15 (App Router), Tailwind CSS v4, TypeScript — non-negotiable
- **Deployment**: Vercel
- **Timeline**: Must launch before March 6, 2026
- **Language**: French only for content, English for code/comments
- **Performance**: Lighthouse ≥ 95, all images via Next.js `<Image>`, fonts via `next/font`
- **Legal**: Mentions légales page required (French law)
- **No overengineering**: No state management libs, no CMS, no DB — all data hardcoded in constants
- **French typography**: Non-breaking space before `:`, `?`, `!`, `;` (use `\u00A0`)
- **Accessibility**: Semantic HTML, alt texts, sufficient contrast (esp. white on blue)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| One-pager MVP (not multi-page) | Speed to launch, single scroll experience from social | — Pending |
| No external links in v1 | Lean first shot — focus on visual/content structure | — Pending |
| Hardcoded data in constants.ts | No CMS needed for MVP, can migrate later | — Pending |
| Mobile-first responsive | 70%+ traffic from Instagram/Facebook | — Pending |
| CSS-only animations (no heavy JS libs) | Performance budget, minimal client JS | — Pending |

---
*Last updated: 2026-02-23 after initialization*
