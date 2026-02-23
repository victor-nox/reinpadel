# Architecture Research

**Domain:** One-pager charity event website (Next.js 15 App Router)
**Researched:** 2026-02-23
**Confidence:** HIGH — based on official Next.js 15.x docs (v16.1.6, updated 2026-02-20) and verified patterns

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                            │
│                                                                     │
│  ┌──────────────┐  ┌──────────────────────────────────────────────┐ │
│  │  NavbarClient│  │          One-Page Scroll Container           │ │
│  │  (use client)│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌───────┐ │ │
│  │  scroll spy  │  │  │  Hero  │ │Mission │ │Disease │ │ Route │ │ │
│  │  bg toggle   │  │  │Section │ │Section │ │Section │ │Section│ │ │
│  └──────────────┘  │  └────────┘ └────────┘ └────────┘ └───────┘ │ │
│                    │  ┌────────────┐ ┌───────────┐ ┌────────────┐ │ │
│                    │  │Participation│ │ Partners  │ │   Footer   │ │ │
│                    │  │  Section   │ │  Section  │ │            │ │ │
│                    │  └────────────┘ └───────────┘ └────────────┘ │ │
│                    └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
         │ (all rendered as RSC, only Navbar is a Client Component)
         ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Next.js 15 App Router (Server)                   │
│                                                                     │
│   app/layout.tsx          — Root layout: fonts, metadata, Navbar    │
│   app/page.tsx            — Home: assembles section RSCs            │
│   app/mentions-legales/   — Legal page (required by French law)     │
│                                                                     │
│   DATA LAYER (no fetch, no DB):                                     │
│   lib/constants.ts        — Tour stations, partners, stats, nav     │
│   lib/types.ts            — TypeScript interfaces for all data      │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Type | Communicates With |
|-----------|---------------|------|-------------------|
| `app/layout.tsx` | HTML shell, fonts, metadata, Navbar mount | RSC | All pages |
| `app/page.tsx` | Assembles all sections in order | RSC | Section components |
| `components/Navbar.tsx` | Sticky nav, transparent→solid on scroll, anchor links | Client Component | `lib/constants.ts` (nav items) |
| `components/sections/HeroSection.tsx` | Logo, headline, date badge, 2 CTAs | RSC | None |
| `components/sections/MissionSection.tsx` | Project explanation, key facts (7k km, 1 kidney, 9 cities) | RSC | `lib/constants.ts` |
| `components/sections/DiseaseSection.tsx` | Berger's disease info, impact statistics | RSC | `lib/constants.ts` |
| `components/sections/RouteSection.tsx` | SVG France map with kidney route + 9 station markers | RSC/Client | `lib/constants.ts` (stations) |
| `components/sections/ParticipationSection.tsx` | 3 cards: Play / Donate / Become Partner | RSC | None |
| `components/sections/PartnersSection.tsx` | Logo grid: main partners + partners | RSC | `lib/constants.ts` (partners) |
| `components/ui/Footer.tsx` | Mission statement, nav links, social icons, legal | RSC | `lib/constants.ts` |
| `components/map/FranceMap.tsx` | Inline SVG France outline + kidney path + station dots | Client Component | `lib/constants.ts` (stations) |
| `lib/constants.ts` | Single source of truth: stations, partners, nav, stats | Pure data | Imported by components |
| `lib/types.ts` | TypeScript interfaces: Station, Partner, NavItem | Pure types | Imported everywhere |

---

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: fonts, <html lang="fr">, Navbar, metadata
│   ├── page.tsx                # Home page: assembles all section components
│   ├── globals.css             # Tailwind v4 @import, @theme with font vars, base styles
│   ├── mentions-legales/
│   │   └── page.tsx            # Legal page (required by French law)
│   └── opengraph-image.tsx     # Generated OG image (optional, or static file)
│
├── components/
│   ├── Navbar.tsx              # "use client" — scroll-aware sticky header
│   ├── sections/               # One section per route anchor
│   │   ├── HeroSection.tsx
│   │   ├── MissionSection.tsx
│   │   ├── DiseaseSection.tsx
│   │   ├── RouteSection.tsx
│   │   ├── ParticipationSection.tsx
│   │   └── PartnersSection.tsx
│   ├── map/
│   │   └── FranceMap.tsx       # "use client" — inline SVG with interactive station markers
│   └── ui/
│       ├── Footer.tsx
│       ├── SectionWrapper.tsx  # Shared padding/max-width wrapper
│       └── StatCard.tsx        # Reusable stat display (7000 km, 9 cities, etc.)
│
├── lib/
│   ├── constants.ts            # All hardcoded data: stations, partners, nav items, stats
│   └── types.ts                # TypeScript interfaces for all data shapes
│
└── public/
    ├── images/
    │   ├── logo-rtp.svg
    │   ├── affiche-rtp.png
    │   └── partners/           # Partner logo files
    └── fonts/                  # Only if using local fonts (otherwise next/font handles it)
```

### Structure Rationale

- **`components/sections/`:** One file per scroll section — maps directly to the one-pager's visual structure. Easy to find, extend, or reorder.
- **`components/map/`:** Isolated because FranceMap is the most complex component (SVG + interactivity). Separation makes it easy to replace with a library later.
- **`components/ui/`:** Shared primitives like SectionWrapper keep padding/max-width consistent across all sections without repetition.
- **`lib/constants.ts`:** All content data in one file. When text changes (partner added, station updated), there is exactly one place to edit. This is the CMS-readiness seam — if a CMS is added later, only this file changes, not components.
- **`lib/types.ts`:** Separate types file keeps constants.ts clean and makes types reusable across components without circular imports.
- **No `src/` wrapper confusion:** The `src/` prefix is optional in Next.js 15. Use it — it cleanly separates app code from config files at the root.

---

## Architectural Patterns

### Pattern 1: Server-First, Client-Islands

**What:** All components are React Server Components (RSC) by default. Only components that need browser APIs (scroll events, hover state) become Client Components with `"use client"`.

**When to use:** Always. This is the App Router default and the right call for a static informational site.

**Trade-offs:** Maximum performance (less JS shipped), but "use client" components cannot directly use async/await for server-side data. For this project that is irrelevant since all data is hardcoded constants.

**For this project:**
- RSC: All sections, Footer, SectionWrapper, StatCard
- Client: `Navbar.tsx` (scroll listener), `FranceMap.tsx` (hover interactions on markers)

```typescript
// components/Navbar.tsx
"use client"

import { useState, useEffect } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll() // check initial state
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${scrolled ? "bg-padel-blue/95 shadow-md backdrop-blur-sm py-3" : "bg-transparent py-5"}`}
    >
      {/* nav content */}
    </header>
  )
}
```

### Pattern 2: Constants as the Data Layer

**What:** All content data lives in `lib/constants.ts` as typed TypeScript arrays/objects. Components import and render it. No props drilling deep chains — each component imports what it needs directly.

**When to use:** When the MVP has no CMS and no dynamic data. Hardcoded constants are the fastest path to launch and the cleanest upgrade path to a headless CMS later.

**Trade-offs:** Cannot edit content without a code deploy. Acceptable for a charity event site with a small team and a fixed event schedule.

**CMS-readiness:** When a CMS is added (Phase 2+), extract constants into a data-fetching layer (e.g., `lib/data.ts` with `getStations()`) that returns the same types. Components never change — only the data source.

```typescript
// lib/types.ts
export interface Station {
  id: string
  city: string
  date: string
  club: string
  coordinates: { lat: number; lng: number }
  svgX: number  // pre-computed SVG viewport position
  svgY: number
}

export interface Partner {
  name: string
  logo: string   // path in public/images/partners/
  tier: "main" | "partner"
  url?: string   // placeholder href — empty string in v1
}

// lib/constants.ts
import type { Station, Partner } from "./types"

export const STATIONS: Station[] = [
  { id: "nantes", city: "Nantes", date: "6 mars", club: "...", coordinates: { lat: 47.21, lng: -1.55 }, svgX: 142, svgY: 210 },
  // ... 8 more stations
]

export const TOUR_STATS = {
  distance: "7\u00A0000 km",
  cities: "9 villes",
  shape: "1 rein",
} as const
```

### Pattern 3: Inline SVG Map with Pre-computed Positions

**What:** The France map is rendered as a hardcoded inline SVG component containing: (1) the France outline path, (2) a custom kidney-shaped route path drawn over it, (3) circular marker dots at station positions. No third-party map library.

**When to use:** When the map is decorative/illustrative, the route is fixed and known at build time, and bundle size matters. Avoids loading Leaflet (~40kb), D3 (~70kb), or react-simple-maps.

**Trade-offs:** The SVG France path data must be sourced and simplified (use SVGO). Station positions are pre-computed in viewport coordinates (svgX, svgY in constants.ts) — not derived from lat/lng at runtime. This is acceptable because the route never changes.

**Implementation approach:**
- Get simplified France SVG outline from a public domain source (Natural Earth / Wikimedia)
- Run through SVGO to reduce path complexity
- Embed as `<path d="..." />` in FranceMap.tsx
- Draw kidney route as a separate `<path>` with stroke animation (CSS `stroke-dashoffset`)
- Station markers as `<circle>` elements using svgX/svgY from constants
- Hover tooltip via CSS `:hover` on a `<g>` wrapper — avoid JS state for each marker

```typescript
// components/map/FranceMap.tsx
"use client"

import { STATIONS } from "@/lib/constants"

export function FranceMap() {
  return (
    <svg viewBox="0 0 500 550" className="w-full max-w-lg mx-auto">
      {/* France outline */}
      <path d="M..." className="fill-slate-100 stroke-slate-300 stroke-[1.5]" />

      {/* Kidney-shaped route — animated draw on mount */}
      <path
        d="M..." /* kidney curve approximation */
        className="fill-none stroke-kidney-red stroke-[2.5] animate-draw-route"
      />

      {/* Station markers */}
      {STATIONS.map((station) => (
        <g key={station.id} className="group cursor-pointer">
          <circle cx={station.svgX} cy={station.svgY} r={6} className="fill-padel-blue" />
          {/* Tooltip via CSS group-hover — no JS state needed */}
          <foreignObject x={station.svgX + 8} y={station.svgY - 20} width={120} height={50}
            className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-white rounded shadow px-2 py-1 text-xs">
              <strong>{station.city}</strong><br />{station.date}
            </div>
          </foreignObject>
        </g>
      ))}
    </svg>
  )
}
```

### Pattern 4: Font Loading with CSS Variables (next/font + Tailwind v4)

**What:** Load fonts via `next/font/google` in `app/layout.tsx` using the `variable` option to expose them as CSS custom properties. Reference those variables in `globals.css` using Tailwind v4's `@theme inline` block. This means Tailwind utility classes like `font-sans` and `font-display` resolve to the actual loaded fonts.

**Why:** This is the official next/font + Tailwind v4 integration pattern (confirmed in Next.js docs v16.1.6, updated 2026-02-20). It eliminates external Google Fonts requests, prevents CLS (layout shift), and keeps font references in one place.

```typescript
// app/layout.tsx
import { Montserrat, Open_Sans } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* app/globals.css */
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-body);
  --font-display: var(--font-display);
  --color-padel-blue: #1a3a6b;
  --color-kidney-red: #c0392b;
  --color-ball-yellow: #d4e157;
}
```

### Pattern 5: Static Metadata for SEO

**What:** Export a `metadata` object from `app/layout.tsx` and `app/page.tsx`. This is a Server Component feature — no client code needed. Covers title, description, Open Graph, Twitter cards, and canonical URL.

**When to use:** All Next.js 15 App Router projects. Metadata exports in layout apply to all child routes.

```typescript
// app/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rein Padel Tour 2026 — 7\u00A0000 km pour les reins",
  description: "Un tour de France de padel dont le tracé dessine un rein, pour sensibiliser à la maladie de Berger.",
  openGraph: {
    title: "Rein Padel Tour 2026",
    description: "...",
    url: "https://reinpadeltour.fr",
    siteName: "Rein Padel Tour",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
}
```

### Pattern 6: Anchor Navigation with Native `<a>` Tags

**What:** For same-page scroll navigation in a one-pager, use native `<a href="#section-id">` tags — not Next.js `<Link>`. The Next.js Link component suppresses the browser's native scroll-to-anchor behavior (confirmed open issue #51721 in the Next.js repo).

**When to use:** Any same-page anchor navigation in Next.js App Router.

```typescript
// In Navbar — use native <a>, not <Link>
<a href="#mission" className="hover:text-ball-yellow transition-colors">
  Notre mission
</a>

// In each section — give the section its id
<section id="mission" className="py-20 ...">
```

---

## Data Flow

### Request Flow (static site — no server round-trips)

```
User visits /
     ↓
Next.js builds page at deploy time (static generation)
     ↓
app/layout.tsx (RSC)
  → Loads fonts via next/font (build-time, self-hosted)
  → Exports metadata (injected into <head>)
  → Renders <Navbar> (Client Component, hydrated)
     ↓
app/page.tsx (RSC)
  → Imports and renders sections in order
  → Each section imports directly from lib/constants.ts
  → No prop drilling — sections are self-contained
     ↓
Browser receives HTML (fully rendered, no loading states)
  → Navbar hydrates (scroll listener attaches)
  → FranceMap hydrates (hover handlers attach)
  → All other sections are static HTML — no hydration needed
```

### Data Flow (constants → components)

```
lib/constants.ts (STATIONS, PARTNERS, TOUR_STATS, NAV_ITEMS)
     │
     ├─→ Navbar.tsx        (NAV_ITEMS for anchor links)
     ├─→ HeroSection.tsx   (TOUR_STATS for date badge)
     ├─→ MissionSection.tsx (TOUR_STATS for key facts)
     ├─→ DiseaseSection.tsx (DISEASE_STATS for impact numbers)
     ├─→ FranceMap.tsx     (STATIONS for markers)
     ├─→ PartnersSection.tsx (PARTNERS for logo grid)
     └─→ Footer.tsx        (NAV_ITEMS for footer links)
```

No state management library needed. No context needed. Data flows only downward (RSC imports constants directly). The two Client Components (Navbar, FranceMap) hold only UI state (scroll position, hover) — no data state.

### Key Data Flows

1. **Scroll event → Navbar style:** `window.scrollY > 60` triggers a state toggle in Navbar's `useEffect`. Tailwind classes swap `bg-transparent` for `bg-padel-blue/95 + shadow`. No global state involved.
2. **Constants → Section content:** Sections import typed constants at module level. TypeScript ensures shape correctness at build time. Changing a station name in `constants.ts` propagates everywhere.
3. **SEO metadata → `<head>`:** Next.js reads the `metadata` export from layout/page and generates `<meta>` tags server-side. No runtime JS involved.

---

## Suggested Build Order

Build in dependency order — components that other components depend on first.

```
Phase 1 — Foundation (nothing depends on nothing)
  1. lib/types.ts              — Define Station, Partner, NavItem interfaces
  2. lib/constants.ts          — Fill in all tour data (stations, partners, stats)
  3. app/globals.css           — Tailwind v4 @theme, brand colors, base styles
  4. app/layout.tsx            — Fonts, metadata, html shell (no Navbar yet)
  5. components/ui/SectionWrapper.tsx — Reused by every section

Phase 2 — Core sections (depend on foundation)
  6. components/sections/HeroSection.tsx         — Top of page, highest impact
  7. components/sections/MissionSection.tsx
  8. components/sections/DiseaseSection.tsx
  9. components/sections/ParticipationSection.tsx
  10. components/sections/PartnersSection.tsx
  11. components/ui/Footer.tsx
  12. app/page.tsx              — Wire all sections together

Phase 3 — Interactive components (depend on sections being stable)
  13. components/Navbar.tsx    — Scroll behavior, anchor links
  14. components/map/FranceMap.tsx + RouteSection.tsx — Most complex component last

Phase 4 — Pages and SEO
  15. app/mentions-legales/page.tsx  — Legal page
  16. Metadata polish (OG image, sitemap, robots.txt)
```

**Rationale for this order:**
- Types and constants first — everything else depends on them
- SectionWrapper before sections — prevents copy-pasted padding logic
- Hero first — validates visual identity early, shows momentum
- Map last — the most complex piece; other sections don't depend on it
- Navbar after sections — can be tested in isolation once sections have section IDs

---

## Anti-Patterns

### Anti-Pattern 1: Using Next.js `<Link>` for Anchor Navigation

**What people do:** `<Link href="#mission">Mission</Link>` in the Navbar
**Why it's wrong:** Next.js Link suppresses browser-native scroll-to-anchor. The URL updates but the page does not scroll. This is a confirmed Next.js issue (#51721, #13134).
**Do this instead:** Use native `<a href="#mission">` for same-page anchor links. Reserve `<Link>` for actual route changes (`/mentions-legales`).

### Anti-Pattern 2: Making Every Section a Client Component

**What people do:** Add `"use client"` to sections that need CSS animations or simple hover styles
**Why it's wrong:** Sending unnecessary JavaScript to the browser. Tailwind CSS handles hover (`hover:`) and transitions (`transition-all`) without any JavaScript. Only scroll events and browser API access require `"use client"`.
**Do this instead:** Keep sections as RSC. Use Tailwind's hover/focus/transition utilities. Only Navbar and FranceMap need `"use client"`.

### Anti-Pattern 3: Prop-Drilling Constants Through page.tsx

**What people do:** Pass constants as props from `page.tsx` down to each section
**Why it's wrong:** Unnecessary indirection. RSC components can import from `lib/constants.ts` directly. Prop-drilling means changing a data shape requires updating the prop signature in every intermediate component.
**Do this instead:** Each section imports exactly the slice of constants it needs from `lib/constants.ts` directly.

### Anti-Pattern 4: Using a Map Library for a Fixed Decorative Route

**What people do:** Install `react-simple-maps` or `leaflet` for the France map because it "seems right"
**Why it's wrong:** Adds 40-70kb of JS bundle for a map that shows 9 fixed dots and a static path. Kills the Lighthouse ≥ 95 performance target. The route never changes — it is not interactive beyond station tooltips.
**Do this instead:** Inline SVG with pre-computed station positions. The SVG France outline + kidney path is a one-time design task, not a runtime computation.

### Anti-Pattern 5: Skipping the `html lang="fr"` Attribute

**What people do:** Leave the default `lang="en"` on the root `<html>` element
**Why it's wrong:** The site is entirely in French. Screen readers use `lang` to select the correct pronunciation engine. Affects accessibility scores (WCAG 3.1.1) and is a Lighthouse accessibility flag.
**Do this instead:** `<html lang="fr">` in `app/layout.tsx`. Also use `\u00A0` (non-breaking space) before `:`, `?`, `!`, `;` in all French text content (standard French typography rule).

---

## Scalability Considerations

This is a static one-pager on Vercel. Scalability is not a concern for v1. The CDN handles all traffic.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100k visitors (v1) | Static export via Vercel CDN — no changes needed |
| Phase 2: Blog | Add `app/blog/` route group, add markdown/MDX or headless CMS. Constants layer becomes a data fetching layer (`lib/data.ts`). Components unchanged. |
| Phase 2+: Donations | Add `app/api/` route handlers for Stripe/HelloAsso webhooks. No impact on existing sections. |
| Phase 3: Live GPS tracking | Add a WebSocket or Server-Sent Events endpoint. Create a new `LiveTracker` Client Component. The FranceMap SVG structure is already designed to accept dynamic marker positions. |

**The key extensibility decision already baked in:** `lib/constants.ts` is the seam. All future dynamic data replaces the constants with async fetches returning the same TypeScript types. Zero component rewrites required.

---

## Integration Points

### External Services (v1: None)

| Service | Phase | Integration Pattern |
|---------|-------|---------------------|
| Vercel (hosting) | v1 | Push to main → auto-deploy. Zero config needed beyond `next.config.ts`. |
| Plausible Analytics | v1 | Add `<Script>` in layout.tsx, defer loading. Cookieless — no banner needed. |
| HelloAsso / Stripe | v2 | Server Action or API route handler. New `app/donate/` page. No impact on existing sections. |
| Sanity / Contentful | v2+ | Replace `lib/constants.ts` with `lib/data.ts` wrapping CMS client. Types stay identical. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `lib/constants.ts` ↔ all components | Direct TypeScript import | No abstraction layer needed for v1 |
| `Navbar.tsx` ↔ page sections | HTML anchor href/id | Decoupled — Navbar only knows anchor IDs as strings |
| `FranceMap.tsx` ↔ `RouteSection.tsx` | Parent wraps child; passes no props (FranceMap reads constants directly) | Clean boundary |
| `app/layout.tsx` ↔ `app/page.tsx` | Next.js layout composition | Standard App Router pattern |

---

## Sources

- [Next.js App Router Project Structure (official, v16.1.6, 2026-02-20)](https://nextjs.org/docs/app/getting-started/project-structure) — HIGH confidence
- [Next.js Font Optimization with CSS Variables (official, v16.1.6, 2026-02-20)](https://nextjs.org/docs/app/api-reference/components/font#css-variables) — HIGH confidence
- [Tailwind CSS v4 + next/font integration pattern](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) — MEDIUM confidence (multiple sources agree, consistent with official font docs)
- [Scroll-triggered Navbar in Next.js 15 + Tailwind](https://www.geekboots.com/nextjs/how-to-create-scrolling-transition-on-header-using-nextjs-15-and-tailwind-css) — MEDIUM confidence (standard useEffect scroll pattern, verified against React docs)
- [Next.js Link anchor scroll bug (#51721)](https://github.com/vercel/next.js/issues/51721) — HIGH confidence (open GitHub issue)
- [React SVG inline embedding performance](https://refine.dev/blog/react-svg/) — MEDIUM confidence
- [yogijs.tech — Next.js 2026 architecture patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — LOW confidence (single source, but consistent with official docs)

---
*Architecture research for: Rein Padel Tour 2026 — one-pager charity event website*
*Researched: 2026-02-23*
