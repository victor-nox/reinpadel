# Stack Research

**Domain:** Charity sports event one-pager website
**Researched:** 2026-02-23
**Confidence:** HIGH (core stack verified against official Next.js and Tailwind docs, both dated 2026-02-20 and 2026-02-23 respectively)

---

## Version Pinning Note

The project constraint specifies "Next.js 15." As of this research date (2026-02-23), Next.js 16 is stable (v16.1.6, released 2026-01-28) and Next.js 15 is still maintained at v15.5.12. Since the constraint is explicit and non-negotiable, this stack targets **Next.js 15.5.x**. The upgrade path to Next.js 16 is straightforward when the project is ready — the breaking changes (async params, proxy.ts, etc.) do not affect a static one-pager.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 15.5.x | Full framework — routing, rendering, image/font optimization | Project constraint; App Router with RSC gives static-fast rendering + Vercel Image Optimization out of the box. Managed Vercel deployment (not static export) keeps `next/image` optimization working. |
| React | 19.x (bundled with Next 15) | UI component model | Ships with Next.js 15; RSC by default means zero client JS for purely presentational sections. |
| TypeScript | 5.9.x | Type safety | Project constraint; Next.js 15 requires TypeScript 5+. v5.9 is current stable. |
| Tailwind CSS | 4.2.x | Utility-first CSS | Project constraint. v4 ships CSS-first config (`@theme`), PostCSS plugin (`@tailwindcss/postcss`), zero JS config file needed, 70% smaller output vs v3, 100x faster incremental builds. |
| `@tailwindcss/postcss` | 4.2.x | PostCSS integration for Tailwind v4 | Required by Tailwind v4 to integrate with Next.js PostCSS pipeline. Replaces the old `tailwindcss` PostCSS plugin from v3. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/font` (built-in) | bundled | Zero-CLS font loading with self-hosting | All fonts. Import from `next/font/google` for Google Fonts or `next/font/local` for custom files. Never use a `<link>` tag for fonts — `next/font` eliminates layout shift and removes requests to Google's CDN. |
| `next/image` (built-in) | bundled | Responsive image optimization (WebP/AVIF, lazy loading, CLS prevention) | Every `<img>` that is a real content image (logo, poster, partner logos). Skip for decorative CSS backgrounds. |
| `next/script` (built-in) | bundled | Third-party script loading with strategy control | Plausible Analytics script injection. Use `strategy="afterInteractive"` to keep Lighthouse score high. |
| `react-intersection-observer` | ^9.x | Thin wrapper around Intersection Observer API | Scroll-triggered reveal animations. Use instead of a raw `useEffect` + `IntersectionObserver` — it handles SSR-safe refs, cleanup, and threshold options cleanly. ~2KB gzipped. |
| `clsx` | ^2.x | Conditional class merging | Whenever class names are conditionally applied (e.g., nav transparent→solid on scroll, animated element visible/hidden states). Avoids string template bugs. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint + `eslint-config-next` | Code quality linting | Ships with `create-next-app`. In Next.js 16 `next lint` was removed but for v15 it still runs via `next lint`. |
| Prettier | Code formatting | Add `prettier-plugin-tailwindcss` to auto-sort Tailwind classes. Prevents class-order drift. |
| `prettier-plugin-tailwindcss` | Tailwind class sorting | Must be configured: sorts classes in the canonical Tailwind order. Catches bugs where order matters. |
| TypeScript strict mode | Enhanced type checking | Set `"strict": true` in `tsconfig.json`. Catches null-reference bugs at compile time. |
| Turbopack (Next.js dev) | Fast dev server bundling | Enabled by default in Next.js 15.3+. Use `next dev --turbopack` or rely on Next.js defaults. Do NOT use `next build --turbopack` in v15 (still alpha for builds; use webpack for production builds in v15). |

---

## Installation

```bash
# Bootstrap (recommended — sets up all defaults correctly)
npx create-next-app@15 rein-padel-web \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Note: create-next-app with --tailwind on Next.js 15.2+ installs Tailwind v4 automatically.
# Verify with: cat postcss.config.mjs — should show @tailwindcss/postcss, not tailwindcss.

# Supporting libraries
npm install react-intersection-observer clsx

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Key Configuration Patterns

### Tailwind v4: CSS-first config (globals.css)

```css
/* app/globals.css */
@import "tailwindcss";

/* Custom design tokens — no tailwind.config.js needed */
@theme {
  --color-padel-blue: #1a3a5c;
  --color-kidney-red: #c0392b;
  --color-ball-yellow: #c8e600;
  --font-sans: var(--font-inter);  /* Set by next/font below */
}
```

### next/font + Tailwind v4 CSS variable integration

```tsx
// app/layout.tsx
import { Inter, Montserrat } from 'next/font/google'

// Variable fonts — no weight array needed
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',   // Exposes as CSS var
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Then in `globals.css`:
```css
@theme {
  --font-sans: var(--font-inter);
  --font-heading: var(--font-montserrat);
}
```

Now `font-sans` and `font-heading` work as Tailwind utility classes.

### next/image: Local images (correct pattern)

```tsx
// Import directly — Next.js auto-resolves width, height, blurDataURL
import Image from 'next/image'
import logo from '@/assets/logo-rein-padel.png'

<Image
  src={logo}
  alt="Rein Padel Tour logo"
  priority         // Add for above-the-fold images only (hero logo)
  className="h-16 w-auto"
/>
```

For partner logos (below fold):
```tsx
<Image
  src={partnerLogo}
  alt="Partner name"
  // No priority — default lazy loading is correct
/>
```

### SVG France map: Inline SVG component

```tsx
// components/RouteMap.tsx — no library needed
'use client'  // Only if you need interactive state; otherwise Server Component

export function RouteMap() {
  return (
    <svg
      viewBox="0 0 600 700"
      aria-label="Carte de France montrant l'itinéraire Rein Padel Tour"
      role="img"
      className="w-full max-w-2xl mx-auto"
    >
      {/* France outline path */}
      <path d="..." className="fill-padel-blue/10 stroke-padel-blue stroke-2" />
      {/* Kidney route path */}
      <path
        d="..."
        className="fill-none stroke-kidney-red stroke-[3] [stroke-dasharray:2000] [stroke-dashoffset:2000] animate-draw-route"
      />
      {/* Station dots */}
      {STATIONS.map((station) => (
        <circle
          key={station.id}
          cx={station.x}
          cy={station.y}
          r="8"
          className="fill-kidney-red"
        />
      ))}
    </svg>
  )
}
```

CSS animation in `globals.css`:
```css
@keyframes draw-route {
  to { stroke-dashoffset: 0; }
}

.animate-draw-route {
  animation: draw-route 3s ease-in-out forwards;
}
```

Or register it in `@theme` for Tailwind utility use.

### Scroll animations: react-intersection-observer pattern

```tsx
// components/FadeInSection.tsx
'use client'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'

export function FadeInSection({ children, className }: Props) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,  // Fire once — do not re-hide on scroll up
  })

  return (
    <div
      ref={ref}
      className={clsx(
        'transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Sticky navbar: CSS-only with scroll class toggle

```tsx
// components/Navbar.tsx
'use client'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-padel-blue shadow-lg' : 'bg-transparent'
    )}>
      {/* ... */}
    </nav>
  )
}
```

### SEO Metadata (App Router pattern)

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://reinpadeltour.fr'),
  title: 'Rein Padel Tour 2026 — Conscientiser pour Berger',
  description: 'Un tour de padel caritatif à travers la France du 6 au 15 mars 2026...',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}
```

### Vercel deployment: next.config.ts

```ts
// next.config.ts — do NOT set output: 'export'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // No output: 'export' — Vercel managed Node.js keeps next/image optimization
  images: {
    // Only needed if loading images from external domains (partner logos via URL)
    // Local images in /public or statically imported don't need this
  },
}

export default nextConfig
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js 15 (Vercel managed) | Static export (`output: 'export'`) | If deploying to GitHub Pages or S3 — but then `next/image` optimization breaks. Not applicable here. |
| Tailwind CSS v4 | Tailwind CSS v3 | If targeting IE11 or very old mobile browsers (Safari < 16.4). Not applicable — 2026 event targeting modern French mobile users. |
| `react-intersection-observer` | Raw `useEffect` + `IntersectionObserver` | For a single observer in one component. For a reusable pattern across 5+ sections, the library is worth the 2KB. |
| `react-intersection-observer` | Framer Motion | If you need complex enter/exit animations, drag, or layout animations. This project needs simple fade-in reveals — Framer Motion adds ~40KB and client JS overhead that hurts Lighthouse. |
| `next/font/google` | `@font-face` in CSS | Never — `next/font` self-hosts at build time, eliminating render-blocking and third-party font requests. |
| Inline SVG component | `react-svg-map` library | If France map needs interactive click-per-region with complex state. This project only needs route display + station dots — library is overkill (~12KB). |
| `clsx` | `classnames` | They are functionally equivalent; `clsx` is smaller (239B vs 768B gzipped) and faster. Either is fine; pick `clsx` for new projects. |
| `next-plausible` | Direct `<Script>` tag | If you need custom event tracking. For basic pageview-only analytics, a direct `<Script>` in the root layout is sufficient and avoids a dependency. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Framer Motion | ~40KB gzipped; client JS overhead undermines Lighthouse ≥ 95 goal. Simple fade/slide reveals don't need it. | `react-intersection-observer` + CSS transitions |
| `react-svg-map` | Adds unnecessary complexity and bundle for a static route display. No click interactions needed. | Inline SVG React component |
| `output: 'export'` in next.config | Disables `next/image` server-side optimization. Vercel's image CDN is free and handles optimization — use it. | Default Vercel managed deployment |
| `@font-face` CSS rules | Creates render-blocking font requests; no build-time subset optimization. | `next/font/google` or `next/font/local` |
| `tailwind.config.js` | Not needed in Tailwind v4 — CSS-first config via `@theme` replaces it. Keeping it causes confusion. | `@theme` block in `globals.css` |
| CSS-in-JS libraries (styled-components, emotion) | Incompatible with RSC by default; adds runtime overhead; conflicts with Tailwind v4's CSS-native approach. | Tailwind utility classes + CSS modules for exceptions |
| `useState` for scroll position at high frequency | Can cause excessive re-renders on scroll. | `passive: true` event listener + single boolean state toggle (as shown above) |
| `npm install framesync` or `popmotion` | Animation primitives that aren't needed for this project's simple reveals. | CSS `transition` + `opacity`/`transform` |

---

## Stack Patterns by Variant

**For images stored in `/public` (logo, poster):**
- Use statically imported images: `import logo from '@/assets/logo.png'`
- Next.js auto-provides width/height and blurDataURL
- No `remotePatterns` config needed

**For partner logos loaded from external URLs (if any in future phases):**
- Add `remotePatterns` to `next.config.ts`
- Define exact hostname patterns — avoid wildcards

**For the SVG route animation:**
- If animation must trigger on scroll into view: wrap SVG in a `'use client'` component using `useInView` from `react-intersection-observer`, apply CSS animation class on `inView === true`
- If animation plays on page load regardless: use pure CSS `@keyframes` with no client JS, applies in Server Component

**For French typography (non-breaking spaces):**
- Hardcode `\u00A0` in JSX string literals before `:`, `?`, `!`, `;`
- Do NOT use a library — a lint rule is sufficient for enforcement

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `next@15.5.x` | `react@19.x`, `react-dom@19.x` | Next 15 ships React 19. Do not downgrade to React 18. |
| `tailwindcss@4.2.x` | `@tailwindcss/postcss@4.2.x` | Must match major+minor. The PostCSS plugin and framework version must stay in sync. |
| `next@15.5.x` | `typescript@5.9.x` | Next 15 requires TypeScript 5+. |
| `tailwindcss@4.2.x` | Safari 16.4+, Chrome 111+, Firefox 128+ | v4 uses `@property` and `color-mix()`. Verified: 2026 French mobile users are well above these thresholds. |
| `react-intersection-observer@9.x` | `react@19.x` | Compatible. Uses peer dependency on React 16.8+ hooks. |

---

## Sources

- [Next.js CSS docs (official, 2026-02-20)](https://nextjs.org/docs/app/getting-started/css) — Tailwind v4 PostCSS setup confirmed (`@tailwindcss/postcss`, `@import 'tailwindcss'`)
- [Next.js Font Optimization docs (official, 2026-02-20)](https://nextjs.org/docs/app/getting-started/fonts) — `next/font/google`, `next/font/local`, variable font patterns, CSS variable integration
- [Next.js Image Optimization docs (official, 2026-02-20)](https://nextjs.org/docs/app/getting-started/images) — Static import auto-resolves dimensions, `priority` prop, remote patterns config
- [Next.js Deploying docs (official, 2026-02-20)](https://nextjs.org/docs/app/getting-started/deploying) — Static export limitations (Image Optimization disabled); Vercel managed recommended
- [Tailwind CSS v4.2.1 release (GitHub, 2026-02-23)](https://github.com/tailwindlabs/tailwindcss/releases) — Current stable version confirmed
- [Next.js 15.5.12 / 16.1.6 versions (releasebot.io, 2026-02-04)](https://releasebot.io/updates/vercel/next-js) — Version pinning note
- [Next.js 16 release blog (nextjs.org, 2025-10-21)](https://nextjs.org/blog/next-16) — v16 stable confirmed; v15 constraint is intentional lock
- [next/font + Tailwind v4 CSS variable pattern (buildwithmatija.com, 2025)](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) — MEDIUM confidence (community source, pattern verified against official docs)
- [react-intersection-observer npm](https://www.npmjs.com/package/react-intersection-observer) — Verified maintained (v9.x, weekly downloads ~5M)
- [TypeScript 5.9 stable (devblogs.microsoft.com)](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/) — Current stable confirmed
- [Plausible Analytics Next.js integration docs](https://plausible.io/docs/nextjs-integration) — Official Plausible docs for Next.js script setup

---

*Stack research for: Charity sports event one-pager website (Rein Padel Tour 2026)*
*Researched: 2026-02-23*
