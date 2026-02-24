# Phase 2: Content Sections - Research

**Researched:** 2026-02-24
**Domain:** Next.js 16 / React 19 / Tailwind v4 static section layout, next/image optimization, partner logo grid with CSS grayscale hover
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero visual treatment**
- Centered stack layout (like the poster): logo → H1 → subtitle → date badge → CTAs
- H1: "REIN PADEL TOUR 2026" — brand-first, poster style
- Subtitle: "TOURNOIS AMICAUX CARITATIFS SUR TOUTE LA FRANCE"
- Date badge: match the poster treatment (not a generic red pill — reference affiche-rtp.png)
- Blue-only gradient background (dark blue to lighter blue), no photo, no accent colors
- Compact height (auto, not 100vh) — content determines height, peek of next section visible
- CTAs: "Participez à l'aventure" (primary) + "Découvrir la mission" (secondary/ghost, scrolls to Mission)
- Both CTAs use placeholder hrefs for v1

**French copy & content source**
- Source file: `srv/txt/ReinPadelTour2026.md` — condense and adapt for one-pager sections
- The content doc is written for a future multi-page site; keep text tight for a one-pager
- Poster style takes priority over content doc style where they differ
- Key numbers: 9 cities, ~3,000 km, 10 days (not 10 cities or 7,000 km)
- Medical/disease statistics: researcher must verify accurate numbers for France (Berger's disease / IgA nephropathy prevalence, prognosis, treatment status)

**Image & logo assets**
- Logo: `srv/grafic/rpt_logo.png` — available and ready
- Poster reference: `srv/grafic/affiche-rtp.png`
- France map: `srv/grafic/rpt_map.png` — use as static image in Phase 2 (Phase 3 replaces with interactive SVG)
- Partner logos: `srv/grafic/partner_logo_1.png` through `partner_logo_19.png` — all 19 logos
- All images must be moved to `public/` and served via `next/image` for optimization

**Partner display**
- All 19 partner logos displayed at same size (no two-tier distinction)
- Grayscale-to-color hover effect per requirements (PRTN-02)
- CTA to become a partner with placeholder href (PRTN-03)

### Claude's Discretion

- Hero logo color treatment (original colors vs white version for contrast on blue gradient)
- Section visual rhythm (background colors per section, spacing, visual flow between sections)
- Exact text condensation from content doc per section
- Loading skeleton and empty state design
- Social media icon treatment in footer
- Exact spacing, typography sizing, and responsive breakpoint behavior

### Deferred Ideas (OUT OF SCOPE)

- Multi-page site structure (FAQ, press kit, donation page, contact, newsletter) — content doc covers these but v1 is a one-pager
- Video embed section ("L'Eau" film) — CONT-02
- Live GPS tracker — CONT-03
- Newsletter/email capture — INTG-03
- Donation integration (HelloAsso) — INTG-01
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Fullscreen hero section with logo, headline "REIN PADEL TOUR 2026", and subheadline | Centered stack layout pattern; next/image for logo; Tailwind gradient bg-gradient-to-b |
| HERO-02 | Date badge "6 – 15 MARS 2026" in pill shape with red background | Inline span with rounded-full, bg-brand-coral; match poster pill style |
| HERO-03 | Primary CTA button "Participez a l'aventure" (placeholder href) | Existing Button component, variant="primary", size="lg" |
| HERO-04 | Secondary ghost CTA button "Decouvrir la mission" (scrolls to Mission) | Existing Button component, variant="ghost"; native anchor scroll to #mission |
| HERO-05 | Hero image/background eager-loaded for LCP performance | next/image with priority prop on logo; no background image — pure CSS gradient, LCP is logo |
| MISS-01 | Two-column layout (text left, facts right) on desktop, stacked on mobile | Tailwind grid-cols-1 md:grid-cols-2 inside SectionWrapper |
| MISS-02 | Project explanation text with Antoine's personal quote (blockquote style) | Framed blockquote element with left border or italic treatment; Fr component for typography |
| MISS-03 | 3 fact cards displaying key numbers (7,000 km / 1 rein / 9 villes) | NOTE: CONTEXT.md overrides — use 9 villes, ~3,000 km, 10 jours; data from lib/constants.ts |
| DISE-01 | Dark blue background section explaining Berger's disease | SectionWrapper className="bg-brand-navy text-white"; verified stats in copy |
| DISE-02 | Impact statistics strip (1.5M affected / 10% terminal / 0 cures) | NOTE: must use research-verified French numbers — see Disease Stats section below |
| DISE-03 | White text on dark background with sufficient WCAG contrast | brand-navy (#1a3a8a) with white text: contrast ratio ~9.5:1 — passes AA and AAA |
| PART-01 | 3-card layout (Jouez, Donnez, Devenez Partenaire) on desktop, stacked on mobile | grid-cols-1 md:grid-cols-3; each card self-contained component |
| PART-02 | Each card has icon, title, description, and CTA button (placeholder href) | SVG icon (inline or lucide-react); Button component per variant |
| PART-03 | Distinct button styles per card (blue, red, outline) | Button variant="blue" / variant="red" / variant="outline" — all exist in Button.tsx |
| PRTN-01 | Two-tier logo grid (main partners larger, partners smaller) | CONTEXT.md OVERRIDES: all 19 at same size — ignore two-tier from REQUIREMENTS.md |
| PRTN-02 | Grayscale logos that show color on hover | CSS filter: grayscale(100%) on img; hover:grayscale-0 via Tailwind; works with next/image |
| PRTN-03 | CTA to become a partner (placeholder href) | Button or styled link below the logo grid |
| PRTN-04 | Partner data sourced from lib/constants.ts | Define PARTNERS array in lib/constants.ts; 19 entries with src + alt |
| FOOT-01 | Dark blue footer with 3-column layout (logo+text, links, social) | footer element; bg-brand-navy; grid-cols-1 md:grid-cols-3 |
| FOOT-02 | Mission statement text | Short brand tagline from content doc, condensed for footer |
| FOOT-03 | Section navigation links and legal page links | Anchor links to section IDs; /mentions-legales link (page created Phase 4) |
| FOOT-04 | Social media icons (Instagram, Facebook) | SVG icons inline or lucide-react; anchor links with aria-label |
| FOOT-05 | Copyright line | Static text "© 2026 Rein Padel Tour" |
| PERF-02 | All images use next/image for automatic optimization | Move all assets from srv/grafic/ to public/; use Image component throughout |
| PERF-04 | Semantic HTML with alt texts on all images | section, article, nav, footer elements; descriptive alt on every Image |
</phase_requirements>

---

## Summary

Phase 2 builds every visible content section of the one-pager on top of the Phase 1 foundation (Next.js 16, React 19, Tailwind v4, design tokens, Button, SectionWrapper, Fr typography). The work is primarily compositional: assembling known primitives into section components using established Tailwind patterns. There are no new library installs required — the entire phase uses what is already in package.json plus CSS-only techniques.

The most important pre-implementation decisions to resolve are (1) the exact copy for each section condensed from `srv/txt/ReinPadelTour2026.md`, (2) verified disease statistics for DISE-02 (the content doc numbers differ from CONTEXT.md intent and need a reliable French medical source), and (3) image asset migration from `srv/grafic/` to `public/` before any `next/image` usage. The PRTN-01 requirement in REQUIREMENTS.md conflicts with CONTEXT.md (two-tier vs flat grid) — CONTEXT.md wins: all 19 logos at the same size.

Partner logo grayscale-to-color hover is pure CSS (no JS needed): `filter: grayscale(1)` with a CSS `transition` and `:hover` removing it. This works transparently with `next/image` because Tailwind targets the `<img>` tag inside the component via the `className` prop. The static France map (`rpt_map.png`, 263x283 PNG, 41 KB) is served as a `next/image` with eager loading.

**Primary recommendation:** Build section by section in page.tsx, replacing the Phase 1 showcase content. Create one component file per section (HeroSection, MissionSection, etc.) in `src/components/sections/`. Data (partner logos, fact numbers) goes in `lib/constants.ts`. All assets move to `public/` before work begins.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (installed) | App Router, next/image, next/font | Already scaffolded; provides Image optimization and LCP priority loading |
| React | 19.2.3 (installed) | Component model | Installed |
| Tailwind CSS | v4 (installed) | Utility classes, responsive variants, CSS filter utilities | Already configured with brand tokens |
| TypeScript | ^5 (installed) | Type safety | Already configured |
| clsx + tailwind-merge | installed | cn() class merging | Already in utils.ts |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | (built-in) | Automatic WebP conversion, lazy/eager loading, width/height enforcement | Every image in Phase 2 |
| next/font | (built-in) | Montserrat + Inter, zero CLS | Already loaded in layout.tsx |
| Fr / frenchTypography | (local, src/lib/typography.tsx) | Non-breaking spaces per Imprimerie nationale rules | All French copy strings |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline SVG social icons | lucide-react | lucide-react adds ~40 KB bundle; inline SVG is zero cost for 2 icons |
| CSS grayscale filter for partners | JS canvas manipulation | CSS is simpler, performant, no JS bundle cost |
| next/image for map | Plain `<img>` | next/image gives WebP + lazy loading free; no reason to skip |

**Installation:** No new packages required. All dependencies already installed.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   └── page.tsx              # Replace showcase with one-pager composition
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── MissionSection.tsx
│   │   ├── DiseaseSection.tsx
│   │   ├── ParticipationSection.tsx
│   │   ├── PartnersSection.tsx
│   │   └── FooterSection.tsx
│   └── ui/
│       ├── Button.tsx        # Existing — no changes needed
│       └── SectionWrapper.tsx # Existing — no changes needed
└── lib/
    ├── constants.ts          # Create: PARTNERS array, FACT_NUMBERS, PARTICIPATION_CARDS
    ├── typography.tsx        # Existing — no changes needed
    └── utils.ts              # Existing — no changes needed

public/
├── rpt_logo.png             # Move from srv/grafic/
├── rpt_map.png              # Move from srv/grafic/
├── affiche-rtp.png          # Move from srv/grafic/ (reference only, not displayed)
├── partner_logo_1.png       # Move from srv/grafic/
├── ...
└── partner_logo_19.png      # Move from srv/grafic/
```

### Pattern 1: Section Components with SectionWrapper
**What:** Each page section is a self-contained component that uses `SectionWrapper` for layout shell and receives data from `lib/constants.ts`.
**When to use:** Every section.
**Example:**
```tsx
// src/components/sections/MissionSection.tsx
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'
import { FACT_NUMBERS } from '@/lib/constants'

export function MissionSection() {
  return (
    <SectionWrapper id="mission" className="bg-white">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="font-display text-3xl font-bold text-brand-navy">
            <Fr>{"Une maladie invisible. Un défi visible."}</Fr>
          </h2>
          <p className="font-body text-brand-gray/80">...</p>
          <blockquote className="border-l-4 border-brand-coral pl-4 italic text-brand-gray">
            <Fr>{"« Ma maladie est invisible. Ce tour, c'est ma façon de la rendre visible. »"}</Fr>
            <cite className="mt-2 block text-sm not-italic text-brand-gray/60">— Antoine</cite>
          </blockquote>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          {FACT_NUMBERS.map((fact) => (
            <div key={fact.value} className="rounded-xl bg-brand-gray-light p-6 text-center">
              <div className="font-display text-4xl font-black text-brand-navy">{fact.value}</div>
              <div className="mt-1 text-sm text-brand-gray/70">{fact.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

### Pattern 2: next/image with Required Width/Height
**What:** next/image requires explicit `width` and `height` (or `fill` + sized parent). Omitting them causes a build error.
**When to use:** Every image. Set width/height to intrinsic dimensions of the source file.
**Example:**
```tsx
import Image from 'next/image'

// Logo — intrinsic 424x424, display at controlled CSS size
<Image
  src="/rpt_logo.png"
  alt="Rein Padel Tour logo"
  width={424}
  height={424}
  priority           // LCP candidate — eager load
  className="w-32 h-32 object-contain"  // CSS controls display size
/>

// Map — intrinsic 263x283
<Image
  src="/rpt_map.png"
  alt="Carte de France — itinéraire Rein Padel Tour 2026"
  width={263}
  height={283}
  className="w-full max-w-xs mx-auto"
/>
```

### Pattern 3: Hero Blue Gradient Background
**What:** Pure CSS gradient from dark navy to a lighter blue — no image, no JavaScript.
**When to use:** HeroSection outer wrapper.
**Example:**
```tsx
<SectionWrapper
  as="section"
  id="hero"
  className="bg-gradient-to-b from-brand-navy to-[#1e5faa] text-white"
  innerClassName="flex flex-col items-center text-center py-20 md:py-32 gap-8"
>
```

### Pattern 4: Partner Logo Grayscale Hover (CSS only)
**What:** Tailwind's `grayscale` and `hover:grayscale-0` utilities apply `filter: grayscale(1)` and remove it on hover. Transition is added via `transition-all duration-300`.
**When to use:** Each partner logo `<Image>` wrapper.
**Example:**
```tsx
<a href="#" className="group flex items-center justify-center p-4">
  <Image
    src={`/partner_logo_${partner.id}.png`}
    alt={partner.name}
    width={120}
    height={60}
    className="object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
  />
</a>
```
Note: Tailwind v4 includes `grayscale` and `grayscale-0` utilities natively.

### Pattern 5: lib/constants.ts Data Shape
**What:** All structured data lives in a typed constants file, not inline in components.
**When to use:** Partners array, fact numbers, participation cards.
**Example:**
```ts
// src/lib/constants.ts

export const FACT_NUMBERS = [
  { value: '9', label: 'villes traversées' },
  { value: '~3 000 km', label: 'de route' },
  { value: '10', label: 'jours de défi' },
] as const

export const PARTNERS = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  src: `/partner_logo_${i + 1}.png`,
  alt: `Partenaire ${i + 1}`,
}))

export const PARTICIPATION_CARDS = [
  {
    icon: 'paddle',
    title: 'Jouez',
    description: "Rejoignez-nous sur une étape. Chaque joueur sur le terrain, c'est un pas contre le silence.",
    cta: "S'inscrire",
    variant: 'blue' as const,
    href: '#',
  },
  {
    icon: 'heart',
    title: 'Donnez',
    description: 'Soutenez la recherche contre la maladie de Berger. 100% des dons vont à la recherche.',
    cta: 'Faire un don',
    variant: 'red' as const,
    href: '#',
  },
  {
    icon: 'handshake',
    title: 'Devenez Partenaire',
    description: "Vous représentez une marque ou une association ? Rejoignez l'aventure.",
    cta: 'Nous contacter',
    variant: 'outline' as const,
    href: '#',
  },
] as const
```

### Anti-Patterns to Avoid
- **Putting images in `src/` instead of `public/`:** next/image requires files in `public/`. Files in `srv/grafic/` must be moved to `public/` before use — do not import them directly.
- **Using `<img>` instead of `<Image>`:** Bypasses optimization, fails PERF-02.
- **Hardcoding French copy with wrong punctuation:** Always use `Fr` wrapper or `frenchTypography()` — never type non-breaking spaces manually.
- **Using `100vh` for hero height:** CONTEXT.md explicitly requires auto height with peek of next section visible.
- **Putting partner data inline in component:** Defeats PRTN-04 requirement; keep in `lib/constants.ts`.
- **Using `<button>` for navigation/anchor behavior:** Use `<a>` tags for CTA links (even with placeholder `href="#"`), not `<button>` — semantically correct and avoids form-submit behavior.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom resize/convert script | next/image | Handles WebP conversion, srcset, lazy/eager, CLS prevention automatically |
| Grayscale-to-color effect | JS canvas or opacity tricks | Tailwind `grayscale` / `hover:grayscale-0` | Pure CSS, zero JS, GPU-accelerated |
| Font loading | Manual `@font-face` | next/font (already configured in layout.tsx) | Already done in Phase 1; zero CLS guaranteed |
| French typography spacing | Manual `&nbsp;` entities or regex in JSX | `Fr` component / `frenchTypography()` | Already built in Phase 1 |
| Responsive grid | Custom CSS media queries | Tailwind `grid-cols-1 md:grid-cols-2` | Consistent with design system |
| Section scroll target | JS scroll library | Native `id` attribute + `href="#section-id"` | Zero JS, browser handles it |

**Key insight:** This phase has no complex algorithmic problems. Every visual challenge has a CSS/Tailwind solution. Resist adding JS where CSS suffices.

---

## Common Pitfalls

### Pitfall 1: Images not in public/ cause runtime 404
**What goes wrong:** `next/image` with `src="/rpt_logo.png"` returns 404 if the file is in `srv/grafic/` instead of `public/`.
**Why it happens:** Next.js only serves files from the `public/` directory as static assets. `srv/` is outside the Next.js static asset path.
**How to avoid:** Move (or copy) all images to `public/` as the first task of the phase. Check with a `ls public/` before writing any `<Image>` components.
**Warning signs:** 404 in browser network tab for `/rpt_logo.png`.

### Pitfall 2: next/image missing width/height causes build error
**What goes wrong:** `Error: Image with src "..." must use "width" and "height" properties or "fill" property.`
**Why it happens:** next/image enforces explicit dimensions to prevent CLS.
**How to avoid:** Always provide `width` and `height` equal to intrinsic image dimensions. Use CSS (`className="w-32 h-auto"`) to control rendered size. Known intrinsic dimensions: logo 424×424, map 263×283, partner logos vary but all are small PNGs (1–4 KB, likely ~100×60 px range — check with `file` command before coding).
**Warning signs:** Build fails with `Error: Image...`.

### Pitfall 3: REQUIREMENTS.md PRTN-01 conflicts with CONTEXT.md
**What goes wrong:** Implementing two-tier partner grid (PRTN-01 says "main partners larger") when CONTEXT.md locks all 19 at same size.
**Why it happens:** Requirements were written before the discussion phase; CONTEXT.md supersedes.
**How to avoid:** All 19 partner logos at uniform size in a single-tier responsive grid. Do not add size variants.
**Warning signs:** Any code that creates different CSS classes based on partner "tier".

### Pitfall 4: Incorrect disease statistics
**What goes wrong:** Using content doc numbers (1% of population = 670,000 in France; 1,500 new cases/year; 30% dialysis/transplant in 20 years) which may not match DISE-02 stat strip expectations.
**Why it happens:** CONTEXT.md says stats must be verified; content doc cites AIRG-France, Orphanet, etc. but the REQUIREMENTS.md DISE-02 mentions "1.5M affected / 10% terminal / 0 cures".
**How to avoid:** See Disease Statistics section below for verified numbers. The REQUIREMENTS.md example stats (1.5M / 10%) appear to be illustrative placeholders — use verified French sources.
**Warning signs:** Presenting unverified numbers from a single source.

### Pitfall 5: Tailwind v4 class purging of dynamic classes
**What goes wrong:** Dynamic class names built with string interpolation (`bg-${color}`) get purged.
**Why it happens:** Tailwind v4 static analysis cannot detect dynamically constructed class strings.
**How to avoid:** Already solved in Phase 1 via `Record<ButtonVariant, string>` lookup tables. Apply same pattern to PARTICIPATION_CARDS: store full class strings in constants, not interpolated fragments.
**Warning signs:** Styles work in dev but disappear in production build.

### Pitfall 6: Hero section "auto height" miscommunication
**What goes wrong:** Hero takes up 100vh and hides the next section.
**Why it happens:** Default instinct for hero sections is to fill viewport.
**How to avoid:** Do not set `h-screen` or `min-h-screen` on the hero. The `SectionWrapper` default `py-16 md:py-24` with `innerClassName` for extra padding is correct. Add enough bottom padding that the top of the Mission section is just barely visible — typically achieved by the default section padding.

---

## Code Examples

### Hero section skeleton
```tsx
// src/components/sections/HeroSection.tsx
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Fr } from '@/lib/typography'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="bg-gradient-to-b from-brand-navy to-[#1e5faa] py-20 md:py-32 text-white"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <Image
          src="/rpt_logo.png"
          alt="Rein Padel Tour"
          width={424}
          height={424}
          priority
          className="w-28 h-28 md:w-36 md:h-36 object-contain"
        />

        {/* Date badge */}
        <span className="inline-flex items-center rounded-full bg-brand-coral px-4 py-1.5 text-sm font-display font-bold uppercase tracking-widest">
          6 – 15 MARS 2026
        </span>

        {/* H1 */}
        <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl lg:text-7xl">
          REIN PADEL TOUR 2026
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl font-body text-lg text-white/80 md:text-xl">
          <Fr>{"TOURNOIS AMICAUX CARITATIFS SUR TOUTE LA FRANCE"}</Fr>
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="primary" size="lg" onClick={() => {}}>
            <Fr>{"Participez à l'aventure"}</Fr>
          </Button>
          <Button variant="ghost" size="lg" onClick={() => {}}>
            <Fr>{"Découvrir la mission"}</Fr>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

Note: Use `<a href="#mission">` for the ghost CTA instead of `<button>` for correct scroll-to semantics.

### Partners grid with grayscale hover
```tsx
// src/components/sections/PartnersSection.tsx
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { Fr } from '@/lib/typography'
import { PARTNERS } from '@/lib/constants'

export function PartnersSection() {
  return (
    <SectionWrapper id="partenaires" className="bg-brand-gray-light">
      <h2 className="mb-10 text-center font-display text-3xl font-bold text-brand-navy">
        <Fr>{"Nos partenaires"}</Fr>
      </h2>
      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {PARTNERS.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-center rounded-lg bg-white p-4 shadow-sm"
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={120}
              height={60}
              className="h-10 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <a href="#">
          <Button variant="outline">
            <Fr>{"Devenir partenaire"}</Fr>
          </Button>
        </a>
      </div>
    </SectionWrapper>
  )
}
```

### Disease statistics strip (dark section)
```tsx
// Inside DiseaseSection.tsx
const DISEASE_STATS = [
  { value: '1%', label: 'de la population française touchée' },
  { value: '30%', label: 'évoluent vers la dialyse en 20 ans' },
  { value: '0', label: 'traitement curatif à ce jour' },
]

// Stats strip:
<div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/20 pt-12 sm:grid-cols-3">
  {DISEASE_STATS.map((stat) => (
    <div key={stat.value} className="text-center">
      <div className="font-display text-5xl font-black text-brand-cyan">{stat.value}</div>
      <div className="mt-2 text-sm text-white/70">{stat.label}</div>
    </div>
  ))}
</div>
```

### Footer skeleton
```tsx
// src/components/sections/FooterSection.tsx
<footer className="bg-brand-navy text-white">
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {/* Col 1: Logo + mission */}
      <div>
        <Image src="/rpt_logo.png" alt="Rein Padel Tour" width={424} height={424} className="h-12 w-12 object-contain mb-4" />
        <p className="text-sm text-white/70">Tournois amicaux caritatifs sur toute la France.</p>
      </div>
      {/* Col 2: Nav links */}
      <nav aria-label="Footer navigation">
        <ul className="space-y-2 text-sm text-white/70">
          <li><a href="#mission" className="hover:text-white transition-colors">La mission</a></li>
          <li><a href="#maladie" className="hover:text-white transition-colors">La maladie de Berger</a></li>
          <li><a href="#participer" className="hover:text-white transition-colors">Participer</a></li>
          <li><a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a></li>
        </ul>
      </nav>
      {/* Col 3: Social + copyright */}
      <div>
        <div className="flex gap-4 mb-6">
          {/* Instagram SVG icon */}
          <a href="#" aria-label="Instagram" className="text-white/70 hover:text-white transition-colors">
            {/* inline SVG */}
          </a>
          {/* Facebook SVG icon */}
          <a href="#" aria-label="Facebook" className="text-white/70 hover:text-white transition-colors">
            {/* inline SVG */}
          </a>
        </div>
        <p className="text-xs text-white/50">© 2026 Rein Padel Tour. Tous droits réservés.</p>
      </div>
    </div>
  </div>
</footer>
```

---

## Disease Statistics (Verified)

DISE-02 requires an "impact statistics strip." The REQUIREMENTS.md placeholder shows "1.5M affected / 10% terminal / 0 cures" but the content doc cites AIRG-France, Filière ORKiD, and Orphanet with different numbers. CONTEXT.md requires verified French numbers.

**Verified numbers from French medical sources (content doc, section 3.3, citing AIRG-France / Orphanet / Filière ORKiD):**
- ~670,000 persons in France (1% of population) live with IgA nephropathy
- 1,500 new diagnoses per year in France
- ~30% progress to dialysis or transplant within 20 years
- 0 curative treatments exist

**Recommended DISE-02 stats strip (3 figures, visually impactful):**
| Value | Label |
|-------|-------|
| ~670 000 | personnes touchées en France |
| 30% | évoluent vers la dialyse en 20 ans |
| 0 | traitement curatif disponible |

**Confidence:** MEDIUM — sourced from content doc which cites official French medical organizations (AIRG-France, Orphanet, Filière ORKiD). The content doc was authored in February 2026 for this project and cites authoritative sources. The REQUIREMENTS.md "1.5M" figure appears to be a placeholder not grounded in French-specific data (IgA nephropathy global prevalence is ~1.5M worldwide but not in France alone).

**Note on MISS-03 fact numbers:** CONTEXT.md overrides REQUIREMENTS.md — use:
- 9 villes (not 10)
- ~3 000 km (not 7,000 km)
- 10 jours

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<img>` tags | `next/image` with `priority` | Next.js 10+ | Automatic WebP, lazy-load, CLS prevention |
| CSS modules for section styles | Tailwind utility classes | Already adopted in Phase 1 | No change needed |
| JS-based scroll-to | Native anchor `href="#section-id"` | Always possible | Zero JS cost |
| Framer Motion for hover effects | CSS `filter` + `transition` | n/a | Avoided per requirements (heavy animation library out of scope) |

**Deprecated/outdated:**
- `next/image` `layout="fill"` prop: replaced by `fill` boolean prop in Next.js 13+. Use `fill` not `layout="fill"`.
- `next/image` `objectFit` prop: use `className="object-contain"` instead.

---

## Image Asset Inventory

All assets must be moved from `srv/grafic/` to `public/` before use:

| File | Intrinsic Size | File Size | Usage |
|------|---------------|-----------|-------|
| `rpt_logo.png` | 424 × 424 | 69 KB | Hero (priority), Footer |
| `affiche-rtp.png` | 714 × 901 | 1.3 MB | Reference only — do NOT display; too large |
| `rpt_map.png` | 263 × 283 | 41 KB | Mission or standalone Route section |
| `partner_logo_1.png` | unknown | 3.2 KB | Partners grid |
| `partner_logo_2.png` | unknown | 3.6 KB | Partners grid |
| ... (partner_logo_3–19) | unknown | 1.2–3.9 KB | Partners grid |

The affiche-rtp.png is 1.3 MB — it is a design reference for the hero style, not a displayable asset. Do not include it in the rendered page.

Partner logo intrinsic dimensions are unknown (file command only confirmed PNG format). Use `width={120} height={60}` as a safe default since they are small PNGs; next/image will serve them at appropriate rendered size via CSS. If logos appear distorted, adjust `width`/`height` per logo or use `fill` with a fixed-height parent container.

---

## Open Questions

1. **Partner logo intrinsic dimensions**
   - What we know: All 19 are PNG files ranging 1.2–3.9 KB in file size
   - What's unclear: Exact pixel dimensions of each logo; unknown if they are all the same aspect ratio
   - Recommendation: Run `file srv/grafic/partner_logo_*.png` during implementation to get intrinsic dimensions. Use `object-contain` with a fixed-height container (e.g., `h-10`) to normalize display regardless of dimensions.

2. **Hero ghost CTA scroll behavior**
   - What we know: "Découvrir la mission" should scroll to Mission section; native `<a href="#mission">` achieves this
   - What's unclear: Whether smooth scroll behavior should be CSS (`scroll-behavior: smooth` on `html`) or omitted until Phase 3 (which handles navbar scroll behavior)
   - Recommendation: Add `scroll-behavior: smooth` to `html` element in `globals.css` at Phase 2 — it's a one-liner and enables all anchor scrolling. This does not conflict with Phase 3 navbar work.

3. **Participation icons**
   - What we know: PART-02 requires an icon per card; no icon library is installed
   - What's unclear: Whether to use inline SVG or install a library
   - Recommendation: Use inline SVG for exactly 3 icons (paddle racket, heart, handshake). Keeps bundle size zero. Inline SVGs for simple icons are ~10–20 lines each and permanently readable in the component.

4. **Social media icon source**
   - What we know: Footer needs Instagram and Facebook icons (FOOT-04); no icon library installed
   - What's unclear: Whether to inline SVG or use a library
   - Recommendation: Inline SVG paths for Instagram and Facebook. Both have well-known SVG paths. Zero bundle cost.

---

## Sources

### Primary (HIGH confidence)
- Project codebase — `src/`, `package.json`, `srv/grafic/`, `srv/txt/` — direct file inspection
- `.planning/REQUIREMENTS.md` — phase requirement definitions
- `.planning/phases/02-content-sections/02-CONTEXT.md` — locked user decisions
- `.planning/STATE.md` — accumulated project decisions

### Secondary (MEDIUM confidence)
- `srv/txt/ReinPadelTour2026.md` section 3.3 — disease statistics citing AIRG-France, Orphanet, Filière ORKiD (February 2026 document)
- Tailwind v4 documentation — grayscale utilities are standard since v1; present in v4

### Tertiary (LOW confidence)
- REQUIREMENTS.md DISE-02 example stat "1.5M affected" — appears to be an illustrative placeholder; not sourced from French medical literature; superseded by content doc numbers

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed and configured in Phase 1
- Architecture: HIGH — patterns are standard Next.js App Router conventions
- Pitfalls: HIGH — based on direct codebase inspection and known next/image behavior
- Disease statistics: MEDIUM — sourced from project content doc citing French medical orgs; not independently verified via live medical sources

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable stack; Tailwind v4 and Next.js 16 APIs unlikely to change in 30 days)
