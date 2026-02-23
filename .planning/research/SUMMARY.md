# Project Research Summary

**Project:** Rein Padel Tour 2026
**Domain:** Charity sports event one-pager website (France, padel, disease awareness)
**Researched:** 2026-02-23
**Confidence:** HIGH

## Executive Summary

Rein Padel Tour 2026 is a French-language charity one-pager targeting social media traffic (70%+ mobile, arriving via Instagram/Facebook links). Its core mission is emotional: make visitors understand the project in under 30 seconds and feel compelled to share it. The site is not a donation platform — it is a discovery and awareness page with a hard March 6 deadline. Research across all four domains converges on a single, lean recommendation: build a static Next.js 15 App Router site deployed on Vercel, using Tailwind CSS v4 for styling, with all data hardcoded in `lib/constants.ts`. No CMS, no backend, no client-side state management. The project's signature differentiator — a kidney-shaped tour route drawn on a France SVG map — can be achieved entirely with inline SVG and CSS animations, avoiding any map library overhead.

The recommended approach maximises Lighthouse performance (target ≥ 95) by keeping all sections as React Server Components, with only the Navbar and FranceMap as Client Components. The entire data layer is a single typed constants file, making it the CMS-readiness seam: when Phase 2 introduces dynamic content, only the data layer changes and no component rewrites are required. The architecture is intentionally boring — well-established App Router patterns throughout — because the real creative challenge is visual (the kidney route metaphor) and the real technical challenge is performance on mid-range Android devices on mobile data.

The primary risks are execution-level, not architectural: Tailwind v4's breaking config changes can silently break styling if the v3 mental model is carried over; the hero image LCP will collapse Lighthouse scores if not marked for preloading correctly; and the Open Graph image will fail on social crawlers if `metadataBase` is not set before production deployment. One non-negotiable compliance risk is the Mentions Légales page — French law (LCEN 2004) requires real operator identity content live before public launch, with penalties up to €75,000. All of these risks are preventable with the right build order and a pre-launch checklist.

## Key Findings

### Recommended Stack

The stack is entirely constraint-driven: Next.js 15.5.x (explicit project constraint, pinned below the current stable v16.1.6), TypeScript 5.9, and Tailwind CSS v4.2.x. These three are non-negotiable. Tailwind v4 is a CSS-first rewrite — it uses `@import "tailwindcss"` and `@theme {}` blocks in `globals.css` instead of a `tailwind.config.js`, and requires `@tailwindcss/postcss` as its PostCSS plugin. The supporting library selection is deliberately minimal: `react-intersection-observer` (~2KB) for scroll-triggered reveal animations, and `clsx` (239B) for conditional class merging. Both could be replaced with raw code, but the library versions handle SSR safety and class merge edge cases cleanly. Notably absent: Framer Motion (40KB+ client JS, overkill for simple reveals), any map library (Leaflet/D3 at 40–70KB for a fixed decorative route), and CSS-in-JS (incompatible with RSC). See `.planning/research/STACK.md` for full installation and configuration patterns.

**Core technologies:**
- **Next.js 15.5.x**: Full framework, App Router, RSC — project constraint; Vercel managed deployment keeps `next/image` optimization working (do NOT use `output: 'export'`)
- **React 19.x**: Bundled with Next.js 15 — zero client JS for purely presentational sections via RSC
- **TypeScript 5.9.x**: Type safety — project constraint; strict mode required
- **Tailwind CSS v4.2.x**: CSS-first utility styling — project constraint; `@theme` replaces `tailwind.config.js` entirely
- **`next/font`** (built-in): Zero-CLS self-hosted font loading — eliminates render-blocking Google Fonts requests
- **`next/image`** (built-in): Responsive image optimization — required for every content image to hit Lighthouse ≥ 95
- **`react-intersection-observer` ^9.x**: Scroll-triggered reveals — ~2KB, SSR-safe, handles cleanup
- **`clsx` ^2.x**: Conditional class merging — 239B, prevents class-order bugs

### Expected Features

This site serves three simultaneous audiences (players, donors, corporate partners) in a single scroll experience. Research identifies a clear divide between legally/socially required features and the project's true differentiators. See `.planning/research/FEATURES.md` for the full prioritisation matrix.

**Must have (table stakes — all P1 for March 6 launch):**
- Hero section — logo, headline, date badge (6–15 Mars 2026), 3 CTA buttons (Jouer / Donner / Devenir Partenaire)
- Mission section — key stats displayed as large-format numbers (7,000 km / 9 villes / 1 rein / 15 jours)
- Disease section — Berger's disease explanation with Antoine's personal founder story as emotional core
- Route section — France SVG map with the kidney-shaped route; this is the project's signature visual
- Participation section — 3 scannable cards, one per audience, with placeholder CTAs in v1
- Partners section — logo grid with two tiers (Partenaires Principaux / Partenaires)
- Footer — social links, anchor nav, legal links
- Sticky navbar — transparent to solid on scroll, mobile hamburger
- Mentions Légales page (`/mentions-legales`) — legally mandatory under LCEN 2004
- Mobile-first responsive design — 375px to 1440px, all sections
- SEO + Open Graph metadata — social share preview cards for Instagram/Facebook virality
- Lighthouse ≥ 95 on mobile preset — primary traffic is mobile, fast is expected

**Should have (differentiators — still P1/P2):**
- Animated kidney-shaped SVG route with CSS `stroke-dashoffset` draw-on animation — the project's unique visual identity, highest-impact differentiator
- Station timeline — 9 cities with dates and club names rendered from `lib/constants.ts`
- Bold stat cards with large number formatting (4–6rem) — makes scale visceral
- Cookieless analytics via Plausible — eliminates cookie consent banner, cleaner first impression

**Defer to v2+ (anti-features for v1):**
- Working donation integration (HelloAsso/Stripe) — scope risk to March 6 deadline; use placeholder href
- Newsletter/email capture — requires GDPR double opt-in, email provider, backend
- Live GPS tracking — requires real-time backend; not possible in static architecture
- Blog/actualités — requires CMS strategy; link to Instagram for updates in v1
- Video background — kills Lighthouse on mobile; use poster image instead
- Cookie consent banner — not needed with Plausible; adding one introduces unnecessary friction

### Architecture Approach

The architecture is server-first, client-islands: all sections are React Server Components rendering hardcoded data from `lib/constants.ts`. Only `Navbar.tsx` (scroll listener) and `FranceMap.tsx` (hover interactions) are Client Components — everything else ships as static HTML with zero hydration cost. There is no state management library, no Context API usage, and no prop-drilling through `page.tsx` — each section imports its slice of `constants.ts` directly. This is the correct pattern for a static informational site targeting Lighthouse ≥ 95. The `lib/constants.ts` file is deliberately designed as the CMS-readiness seam: when a CMS is added in Phase 2+, only the data layer changes and components remain untouched. One non-obvious decision from research: use native `<a href="#section-id">` tags for same-page anchor navigation, NOT Next.js `<Link>` — the Link component suppresses browser-native scroll-to-anchor behavior (confirmed open Next.js issue #51721). See `.planning/research/ARCHITECTURE.md` for full component map and suggested build order.

**Major components:**
1. `lib/constants.ts` — single source of truth for all tour data (stations, partners, stats, nav items); the CMS seam
2. `lib/types.ts` — TypeScript interfaces (Station, Partner, NavItem) shared across all components
3. `components/Navbar.tsx` (Client Component) — scroll-aware transparent-to-solid sticky header with anchor links
4. `components/sections/` (6 RSCs) — HeroSection, MissionSection, DiseaseSection, RouteSection, ParticipationSection, PartnersSection
5. `components/map/FranceMap.tsx` (Client Component) — inline SVG France outline + kidney-shaped animated route + 9 station markers with CSS hover tooltips
6. `components/ui/` — SectionWrapper (shared padding/max-width), StatCard, Footer
7. `app/mentions-legales/page.tsx` — legally required French law page

**Suggested build order (from ARCHITECTURE.md):**
1. Foundation: types → constants → globals.css → layout.tsx → SectionWrapper
2. Core sections: Hero through Partners → wire in page.tsx
3. Interactive: Navbar → FranceMap (most complex, last)
4. Pages and SEO: mentions-legales → metadata polish

### Critical Pitfalls

Six pitfalls emerged from research. Three are critical (build-blocking or launch-blocking if missed), three are high-impact but recoverable. Full details and a pre-launch checklist are in `.planning/research/PITFALLS.md`.

1. **Tailwind v4 config paradigm shift** — No `tailwind.config.js`, no `@tailwind` directives, PostCSS plugin is `@tailwindcss/postcss` not `tailwindcss`. Get `globals.css` correct on Day 1 before writing any component. Warning sign: utility classes render with no style applied.

2. **Hero image not marked as LCP** — `next/image` defaults to lazy loading; hero image must use `preload={true}` (Next.js 16+) or `loading="eager"` + `fetchPriority="high"` (Next.js 15). Missing this collapses Lighthouse mobile score from ~95 to ~60. Set correctly during Hero section build, not as an afterthought.

3. **Open Graph image uses relative URL** — Without `metadataBase` set in `app/layout.tsx`, the OG image resolves to `localhost:3000` in production, breaking all social share previews. Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://reinpadeltour.fr')` and configure the env var in the Vercel dashboard before launch.

4. **French typography — non-breaking spaces missing** — French requires `\u202F` (narrow NBSP) before `:`, `;`, `?`, `!` and `\u00A0` for number grouping. Create `lib/typography.ts` constants before writing any French copy. A grep for ` ?` and ` :` is part of the pre-launch checklist.

5. **SVG animation causes mobile jank** — Only `stroke-dashoffset` and `opacity` are compositor-friendly for SVG animation. Animating `stroke` colour or `fill` triggers paint on every frame. Keep kidney path < 200 anchor points. Respect `prefers-reduced-motion`. Validate on CPU-throttled Chrome (4x slowdown) before considering the Route section done.

6. **White text on Padel-Court blue fails contrast** — Verify every text-on-background combination against WCAG AA (4.5:1 for body, 3:1 for large text) before using the palette across all sections. Fix in `@theme` tokens first — changing colours after full implementation is a MEDIUM recovery cost.

**Compliance risk (non-negotiable):** Mentions Légales page must contain real legal content (operator name, RNA/SIRET, address, Vercel host details) before the site goes live. A placeholder page is a French law violation with fines up to €75,000. This is a content dependency, not a code dependency — the required information must be obtained from the association before launch.

## Implications for Roadmap

Based on the combined research, a 4-phase structure maps cleanly to the architectural build order and pitfall-prevention strategy. The overall shape is: foundation first, content sections second, interactive complexity third, launch validation fourth.

### Phase 1: Foundation and Design System

**Rationale:** Every subsequent component depends on types, constants, Tailwind tokens, and layout scaffolding. Building foundation first prevents rework — fixing colours or font tokens after 6 sections are built is expensive. The Tailwind v4 config pitfall (Pitfall 1) is most devastating when discovered late; addressing it on Day 1 with a visible smoke test is the highest-ROI risk mitigation.

**Delivers:** Project scaffold, design system tokens, font loading, root layout, shared UI primitives (SectionWrapper, StatCard)

**Addresses:** All features (shared dependency), French typography constants, WCAG colour contrast verification

**Avoids:** Tailwind v4 config mistakes (Pitfall 1), contrast violations on blue backgrounds (Pitfall 6), French typography errors (Pitfall 4)

**Stack elements used:** `create-next-app@15`, Tailwind v4 `@theme`, `next/font/google`, TypeScript strict mode, `prettier-plugin-tailwindcss`

**Research flag:** Standard — well-documented Next.js App Router setup. No additional research phase needed.

### Phase 2: Core Content Sections

**Rationale:** With foundation stable, build all 6 page sections plus Footer and wire them in `page.tsx`. Build in impact order: Hero first (validates visual identity, reveals palette issues early), then Mission, Disease, Participation, Partners, Footer. Hero intentionally comes before the Route map because its `next/image` LCP setup (Pitfall 2) is critical to validate early — if the poster image degrades Lighthouse, it's better to know before the full page is assembled.

**Delivers:** Complete scrollable one-pager (minus Navbar interaction and Route map) visible at localhost; all static content sections render correctly on mobile

**Addresses:** Hero, Mission, Disease, Participation, Partners, Footer features; mobile-first responsive design; SEO metadata export; partner logo grid with consistent sizing

**Avoids:** Hero LCP collapse (Pitfall 2 — set `preload` correctly during this phase, not retroactively), partner logo CLS (use `<Image>` with explicit dimensions)

**Stack elements used:** `next/image`, `next/font` CSS variables, `clsx`, RSC patterns, `lib/constants.ts` data imports

**Research flag:** Standard — all sections are RSCs with typed data. No additional research phase needed.

### Phase 3: Interactive Components and Route Map

**Rationale:** The two Client Components (Navbar, FranceMap) are intentionally deferred until sections are stable. Navbar depends on section IDs being finalised; building it last prevents anchor-link breakage. FranceMap is the most technically complex component — the animated kidney-shaped SVG path requires design work (France outline SVG sourcing and SVGO simplification) and mobile performance validation (Pitfall 5) that can block the rest of the page if attempted first.

**Delivers:** Fully interactive page — sticky transparent-to-solid Navbar with working anchor scroll, France SVG map with kidney route draw-on animation, 9 station markers with CSS hover tooltips

**Addresses:** Sticky navbar, route/map section (signature differentiator), station timeline, scroll-triggered reveals via `react-intersection-observer`

**Avoids:** SVG animation mobile jank (Pitfall 5 — validate with CPU throttling before phase completion), `<Link>` anchor scroll bug (use native `<a>` tags in Navbar), Client Component overuse (only Navbar and FranceMap get `"use client"`)

**Stack elements used:** `react-intersection-observer`, `clsx`, CSS `@keyframes` + `stroke-dashoffset`, `will-change: transform` on Navbar, `prefers-reduced-motion` media query

**Research flag:** Needs attention — the kidney-shaped SVG path is a design asset that must be sourced or drawn (France outline from Natural Earth/Wikimedia, kidney route as a custom Bezier approximation). The path coordinates for station dots must be pre-computed in `lib/constants.ts` in SVG viewport units. This is a design-to-development handoff task, not additional research.

### Phase 4: Legal, SEO, and Pre-Launch Validation

**Rationale:** Mentions Légales and OG metadata are deferred to the end because (a) they require real content inputs that may not be available on Day 1 (operator legal name, RNA number, Vercel host details) and (b) OG image testing requires a deployed production URL. Running the full pre-launch checklist as a formal phase ensures no compliance or social virality issues survive to launch.

**Delivers:** Live-ready site — `/mentions-legales` page with real legal content, correct OG metadata verified via opengraph.xyz and Facebook Sharing Debugger, Lighthouse ≥ 95 on mobile preset, Plausible analytics wired, `NEXT_PUBLIC_SITE_URL` env var set in Vercel

**Addresses:** Mentions Légales (French law obligation), SEO + Open Graph (social virality), Plausible analytics (cookieless, no banner), final Lighthouse audit

**Avoids:** OG image relative URL in production (Pitfall 3 — `metadataBase` + env var), missing legal content at launch (non-negotiable compliance risk), Plausible script blocking LCP (use `strategy="afterInteractive"`)

**Stack elements used:** `next/script` with `strategy="afterInteractive"`, Next.js `metadata` export with `metadataBase`, Vercel environment variables

**Research flag:** Mentions Légales content is a content dependency, not a code dependency. The association's legal details (RNA number, registered address, directeur de publication) must be provided by the project owner before this phase can complete. Flag this as a human input requirement, not a technical blocker.

### Phase Ordering Rationale

- **Foundation before content:** Tailwind tokens and TypeScript types must exist before any component renders them. Changing design tokens after implementation is a MEDIUM recovery cost.
- **Content sections before interactivity:** Section IDs must be stable before Navbar anchor links are wired. Building interactive components against unstable section structure causes repeated rework.
- **Route map last among components:** FranceMap is the highest-complexity component and the only one requiring external design assets (SVG path data). Its mobile performance (Pitfall 5) must be validated in isolation before the full page assembly obscures the source of any jank.
- **Legal and SEO last:** These depend on a deployed URL (OG testing) and content inputs that may arrive late (Mentions Légales legal data). They can be completed in parallel with Phase 3 if content is available early.
- **No phase needs a backend:** This is a static site throughout all phases. The CTA buttons in Participation section use placeholder `href="#participation"` for v1; wiring them to HelloAsso is explicitly v2 scope.

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 3 (FranceMap):** The France SVG outline source and kidney path bezier approximation are design-level decisions with implementation implications. Recommend sourcing the France SVG outline from Natural Earth data before Phase 3 begins. The kidney path should be designed in Figma or Inkscape and exported as a simplified `<path d="...">` string. This is not code research — it is asset preparation.

**Phases with standard patterns (skip additional research):**
- **Phase 1:** Standard Next.js App Router scaffold with Tailwind v4. Official docs are current and complete.
- **Phase 2:** RSC section components with typed data imports. No novel patterns required.
- **Phase 4:** Next.js metadata API and Vercel environment variables are fully documented.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core technology choices verified against official Next.js 15.x and Tailwind v4 docs (2026-02-20 to 2026-02-23). Version pinning rationale is explicit. The one MEDIUM-confidence pattern is `next/font` + Tailwind v4 CSS variable integration (community source + consistent with official docs). |
| Features | HIGH | Table stakes features derived from charity event site studies and French legal requirements (LCEN). Prioritisation matrix is well-reasoned. Mentions Légales compliance is MEDIUM confidence — sourced from LCEN text and service-public.gouv.fr but recommends legal verification for final content. |
| Architecture | HIGH | Official Next.js App Router docs are current and comprehensive. The `<Link>` anchor scroll bug is confirmed via open GitHub issues. The one LOW-confidence source (yogijs.tech architecture patterns) is consistent with official docs and was used only for structural validation. |
| Pitfalls | HIGH | Most pitfalls verified against official docs or multiple sources. Tailwind v4 breaking changes and the Link anchor bug have official confirmations. French typography rules are MEDIUM (leifgehrmann.com + common knowledge). SVG animation performance guidance sourced from MDN (HIGH confidence). |

**Overall confidence:** HIGH

### Gaps to Address

- **Mentions Légales content:** The association's RNA number, registered address, contact details, and directeur de publication are content dependencies that cannot be resolved through research. These must be provided by the project owner before Phase 4. Flag as a human input requirement at roadmap planning time.

- **France SVG outline and kidney path data:** The exact SVG `<path d="...">` strings for the France map outline and kidney route are design assets, not code. They must be sourced (Natural Earth for France outline) and created (kidney bezier for the tour route) before Phase 3 component implementation begins. This is a design-to-development handoff gap.

- **Station SVG coordinates:** The 9 station city names and dates exist in the project spec, but their SVG viewport coordinates (svgX, svgY) must be computed once the France SVG viewBox is finalised. These belong in `lib/constants.ts` but require the SVG asset to exist first.

- **Partner logo assets:** Project spec confirms logos exist in the repository, but format and resolution have not been verified. SVG logos can use `<Image unoptimized>` safely; PNG/JPG logos should be verified for resolution before the Partners section is built.

- **`next/image` preload API in Next.js 15 vs 16:** PITFALLS.md notes that `priority` prop was deprecated in Next.js 16 in favour of `preload`. Since this project pins to Next.js 15, verify the correct prop: in Next.js 15, use `priority` (not `preload`). This is a minor discrepancy in the research that must be confirmed against the pinned version.

## Sources

### Primary (HIGH confidence)

- [Next.js 15.x official docs (2026-02-20)](https://nextjs.org/docs) — App Router structure, font optimization, image optimization, metadata API, deployment
- [Tailwind CSS v4.2 release notes (2026-02-23)](https://github.com/tailwindlabs/tailwindcss/releases) — v4 paradigm shift, `@theme`, `@tailwindcss/postcss`
- [Tailwind CSS upgrade guide](https://tailwindcss.com/docs/upgrade-guide) — breaking changes from v3 to v4
- [Plausible Data Policy (official)](https://plausible.io/data-policy) — cookieless analytics, no consent banner required
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — WCAG AA/AAA contrast verification
- [MDN: CSS and JavaScript animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance) — compositor-friendly animation properties
- [Vercel Environment Variables docs](https://vercel.com/docs/environment-variables) — `NEXT_PUBLIC_` prefix requirements
- [GitHub issue #51721 — Next.js Link anchor scroll](https://github.com/vercel/next.js/issues/51721) — use native `<a>` for same-page anchors

### Secondary (MEDIUM confidence)

- [service-public.gouv.fr — Mentions légales requirements](https://www.service-public.gouv.fr/P10025) — French legal obligations for websites
- [entreprendre.service-public.gouv.fr — Mentions obligatoires](https://entreprendre.service-public.gouv.fr/vosdroits/F31228) — LCEN Article 6 requirements
- [buildwithmatija.com — next/font + Tailwind v4 CSS variable pattern](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) — Confirmed consistent with official docs
- [GitHub discussion #57251 — metadataBase not set for OG images](https://github.com/vercel/next.js/discussions/57251) — OG image URL resolution in production
- [leifgehrmann.com — French punctuation and spaces](https://i18n.leifgehrmann.com/french-punctuation/) — `\u202F` vs `\u00A0` usage

### Tertiary (LOW confidence — used for structural validation only)

- [imagexmedia.com — Best nonprofit website designs 2026](https://imagexmedia.com/blog/best-nonprofit-website-designs-drive-impact) — Feature prioritisation cross-check
- [wiredimpact.com — Event landing pages for nonprofits](https://wiredimpact.com/blog/event-landing-page-nonprofits-website/) — Table stakes feature validation
- [yogijs.tech — Next.js 2026 architecture patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — Architecture structural validation (consistent with official docs)

---
*Research completed: 2026-02-23*
*Ready for roadmap: yes*
