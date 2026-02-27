# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Charity marketing website for **Rein Padel Tour 2026** — a 10-day padel tournament across France raising awareness for Berger's disease (IgA nephropathy). All content in French.

## Commands

```bash
npm run dev      # Dev server on localhost:3000
npm run build    # Production build (static export to out/)
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

### Routing

Two-route structure with a pre-launch gate:

- `/` (`src/app/page.tsx`) — **Coming Soon** page with passcode input. Entering the correct passcode redirects to `/site`. This is a `'use client'` component.
- `/site` (`src/app/site/page.tsx`) — **Full website** composing section components in order: Hero → Tour → Partners → Footer. Three additional sections (Mission, Disease, Participation) exist in `src/components/sections/` but are currently disabled (`@ts-nocheck`) and not rendered — their required constants were removed from `constants.ts` when scope was reduced.

### Deployment

Static export via `output: 'export'` in `next.config.ts`:
- `trailingSlash: true` for Vercel static routing
- `images: { unoptimized: true }` — no Next.js image optimization (use `<Image>` for lazy loading/sizing only)
- No API routes or server-side features available

### Key Files

- `src/lib/constants.ts` — All data (tour stops, stats, partners, section IDs). Single source of truth for content.
- `src/lib/typography.tsx` — `<Fr>` component and `frenchTypography()` for French punctuation spacing (NBSP before `:`, `?`, `!`, `;`, guillemets)
- `src/lib/utils.ts` — `cn()` helper (`clsx` + `tailwind-merge`)
- `src/components/ui/SectionWrapper.tsx` — Consistent section layout (padding, max-width container). Most sections use this.
- `src/components/ui/Button.tsx` — Pill button with 5 variants (`primary`, `ghost`, `blue`, `red`, `outline`) and 3 sizes
- `src/app/globals.css` — Tailwind v4 `@theme` block defining brand colors and font families
- `srv/` — Design assets, specs, and source text (not deployed). `srv/spec/rpt-website-spec.md` contains the full website specification; `srv/txt/` has source copy; `srv/grafic/` has logos and images

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`), custom theme in `globals.css`
- **Fonts:** Montserrat (`font-display`), Inter (`font-body`) via `next/font/google`

## Conventions

### Components
- **Named exports** for all components (default exports only for `page.tsx`/`layout.tsx`)
- **Server Components by default** — only use `'use client'` when truly needed
- **JSDoc comments** above components describing purpose, layout, and type
- **PascalCase** filenames matching component names

### Styling
- Brand colors use `brand-` prefix: `brand-navy`, `brand-cyan`, `brand-coral`, `brand-yellow-green`, `brand-gray`, `brand-gray-light`
- Font classes: `font-display` (Montserrat), `font-body` (Inter)
- Mobile-first responsive design (sm → md → lg breakpoints)

### Data
- All content constants in `src/lib/constants.ts` (SCREAMING_SNAKE_CASE)
- French text — use `<Fr>` component for proper punctuation spacing

### Imports
- Always use path alias: `@/components/...`, `@/lib/...` (never relative `../../`)
