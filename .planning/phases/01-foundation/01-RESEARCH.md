# Phase 1: Foundation - Research

**Researched:** 2026-02-24
**Domain:** Next.js 15 App Router / Tailwind CSS v4 / next/font / French typography / UI primitives
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Color palette
- Extract exact hex values from the poster image (`srv/grafic/affiche-rtp.png`) and logo (`srv/grafic/rpt_logo.png`)
- Two separate blue tokens: navy/dark blue (headings, dark backgrounds) and cyan/bright blue (accents, highlights) — both are core brand colors
- Coral/salmon red for kidney theme and CTAs
- Yellow-green for ball accent and "2026" highlights
- Brand-tinted neutral grays (slight navy tint) for body text, borders, subtle backgrounds
- No full shade scales — use poster colors as-is; Claude generates any needed tints/shades during implementation

#### Button variants
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

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUN-01 | Project scaffolded with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 | create-next-app with `--yes` flag covers all; PostCSS plugin `@tailwindcss/postcss` required |
| FOUN-02 | Custom design tokens defined (colors, fonts, spacing) matching poster identity | Tailwind v4 `@theme` directive in globals.css; poster/logo analyzed — color analysis section covers this |
| FOUN-03 | Montserrat and Inter fonts loaded via next/font with zero CLS | `next/font/google` with `variable` option + `@theme inline` in globals.css; `adjustFontFallback: true` (default) handles zero CLS |
| FOUN-04 | French typography utility with non-breaking spaces before `: ? ! ;` | Pure TypeScript/TSX utility — regex replace pattern; `\u00A0` for colon, `\u202F` (narrow NBSP) for `? ! ;` |
| FOUN-05 | Shared UI primitives (SectionWrapper, Button) established | `cn()` helper + clsx + tailwind-merge; Button uses pill shape via `rounded-full`; SectionWrapper is a layout wrapper component |
</phase_requirements>

---

## Summary

Phase 1 establishes the non-negotiable technical foundation: scaffolded Next.js 15 project, Tailwind CSS v4 design tokens matching the poster identity, zero-CLS Google Fonts, a French typography helper, and two shared UI primitives. Every subsequent phase builds directly on these outputs, so correctness here prevents expensive rework later.

The stack is well-validated and documented. Tailwind v4 (released January 2025) introduces a CSS-first configuration model that eliminates `tailwind.config.js` in favor of an `@theme` directive inside `globals.css`. This changes how design tokens, custom colors, and font variables are wired together — the planner must follow the v4 patterns, not v3 patterns. The key integration gotcha is that `next/font` injects CSS variables at the `:root` level, and Tailwind v4's scanner cannot pick these up unless they are re-referenced via `@theme inline` in `globals.css`.

Color extraction from the poster (`srv/grafic/affiche-rtp.png`) and logo (`srv/grafic/rpt_logo.png`) has been visually analyzed. The poster was read directly: the primary background is a vivid padel-court cyan-blue; the logo confirms two distinct blues (navy for "REIN" wordmark, cyan for "PADEL TOUR"), coral-salmon for the kidney icon, and yellow-green for the ball. Clean hex approximations are recommended over extracting OKLCH values from the images. French typography requires inserting `\u00A0` (regular non-breaking space) before `:` and `\u202F` (narrow non-breaking space) before `? ! ;` — this is a one-file utility function requiring no library.

**Primary recommendation:** Scaffold with `npx create-next-app@latest --yes`, then replace Tailwind v3 config patterns (if any) with a single `globals.css` containing `@import "tailwindcss"` and an `@theme inline` block for all brand tokens and font references.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.x (latest) | React framework, App Router, SSR/SSG | Official, required |
| react | 19.x | UI runtime | Bundled with Next.js 15 |
| typescript | 5.x | Type safety | Default in create-next-app |
| tailwindcss | 4.x | Utility CSS framework | Locked decision |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Required — replaces old `tailwindcss` PostCSS plugin |
| postcss | latest | Build transform | Required by @tailwindcss/postcss |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | latest | Conditional className assembly | Always — prevents messy template literals |
| tailwind-merge | latest | Merge conflicting Tailwind classes without duplication | Always with clsx in `cn()` helper |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| clsx + tailwind-merge | class-variance-authority (CVA) | CVA is excellent for variant-heavy components but adds complexity for only 2 primitives; OOTB clsx+twMerge is simpler |
| next/font/google (self-hosted) | Local .woff2 files via next/font/local | Both achieve zero CLS; Google fonts approach is simpler, no manual file management, privacy still preserved (no external requests) |
| Custom French util | i18n library (next-intl, react-i18next) | Libraries are for multi-language apps; a 10-line utility function is all that is needed |

**Installation:**
```bash
# Scaffold (covers next, react, typescript, tailwind, eslint, turbopack)
npx create-next-app@latest rein-padel-web --yes

# Additional dependencies
npm install clsx tailwind-merge
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout — fonts, html lang="fr", body className
│   ├── page.tsx          # Home page (blank for now)
│   └── globals.css       # @import "tailwindcss" + @theme inline block
├── components/
│   └── ui/
│       ├── Button.tsx    # Pill-shaped button primitive
│       └── SectionWrapper.tsx  # Layout wrapper primitive
└── lib/
    ├── utils.ts          # cn() helper (clsx + tailwind-merge)
    └── typography.ts     # French non-breaking space utility
```

### Pattern 1: Tailwind v4 Design Tokens via @theme

**What:** All brand colors, font families, and custom spacing are declared as CSS variables inside an `@theme inline` block in `globals.css`. Tailwind auto-generates utility classes (`bg-brand-navy`, `text-brand-cyan`, etc.) from these variables.

**When to use:** Any custom design token — do not use `:root` for tokens intended to generate utility classes.

**Example:**
```css
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme inline {
  /* Brand colors — extracted from poster/logo */
  --color-brand-navy: #1a2a5e;        /* Dark navy blue — headings, dark backgrounds */
  --color-brand-cyan: #00b4d8;        /* Vivid cyan blue — accents, primary CTA */
  --color-brand-coral: #e8614e;       /* Coral/salmon — kidney theme, secondary CTA */
  --color-brand-yellow-green: #c5e03a; /* Ball yellow-green — accent, "2026" highlights */
  --color-brand-gray: #2d3a5e;        /* Navy-tinted dark gray — body text */
  --color-brand-gray-light: #e8ecf4;  /* Navy-tinted light — borders, subtle backgrounds */

  /* Font families — reference next/font CSS variables */
  --font-display: var(--font-montserrat);
  --font-body: var(--font-inter);
}
```

This generates: `bg-brand-navy`, `text-brand-cyan`, `border-brand-coral`, `font-display`, `font-body`, etc.

**Critical:** Use `@theme inline` (not plain `@theme`) when the variable VALUE references another CSS variable (like `--font-montserrat` from next/font). With plain `@theme`, Tailwind embeds the variable name as a global CSS variable itself; with `@theme inline`, it inlines the referenced value into each utility class, which is correct for next/font variables.

### Pattern 2: next/font with CSS Variable Mode

**What:** Fonts are loaded with `variable` option to expose as a CSS custom property on the HTML element. The CSS variable is then referenced in `@theme inline`.

**When to use:** When you need to reference the font in Tailwind utilities AND apply it globally via `@layer base`.

**Example:**
```tsx
// Source: https://nextjs.org/docs/app/getting-started/fonts
// src/app/layout.tsx
import { Montserrat, Inter } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
```

Key points:
- `variable` option exposes `--font-montserrat` / `--font-inter` as CSS properties on the `<html>` element
- `display: 'swap'` ensures text is visible during font load (contributes to zero CLS)
- `adjustFontFallback` defaults to `true` — this is what actually achieves zero CLS by generating a precise metric-matched fallback font
- Both variables must be on `<html>` (not `<body>`) so `@theme inline` can resolve them
- `lang="fr"` is semantically correct for this project

### Pattern 3: `cn()` Helper

**What:** Combines `clsx` (conditional classes) and `tailwind-merge` (conflict resolution) into a single utility.

**When to use:** Every component that accepts a `className` prop or has conditional styling.

**Example:**
```typescript
// Source: community pattern, verified against clsx and tailwind-merge docs
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Pattern 4: Button Primitive

**What:** A typed React component accepting `variant` and `size` props, rendered as `<button>` or composable as a link wrapper. Pill shape via `rounded-full`.

**Example:**
```tsx
// src/components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'blue' | 'red' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-cyan text-white hover:bg-brand-cyan/90',
  ghost: 'bg-transparent border border-white text-white hover:bg-white/10',
  blue: 'bg-brand-navy text-white hover:bg-brand-navy/90',
  red: 'bg-brand-coral text-white hover:bg-brand-coral/90',
  outline: 'bg-transparent border border-brand-navy text-brand-navy hover:bg-brand-navy/10',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-display font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Pattern 5: SectionWrapper Primitive

**What:** A layout wrapper that enforces consistent horizontal padding, max-width, and vertical spacing across all page sections.

**Example:**
```tsx
// src/components/ui/SectionWrapper.tsx
import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article'
  innerClassName?: string
}

export function SectionWrapper({
  as: Tag = 'section',
  className,
  innerClassName,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <Tag className={cn('w-full py-16 md:py-24', className)} {...props}>
      <div className={cn('mx-auto max-w-6xl px-4 sm:px-6 lg:px-8', innerClassName)}>
        {children}
      </div>
    </Tag>
  )
}
```

### Pattern 6: French Typography Utility

**What:** A pure TypeScript function that inserts the correct Unicode non-breaking space before French double punctuation marks. Applied to text content at the string level before rendering.

**French rules (authoritative):**
- Before `:` → regular non-breaking space `\u00A0`
- Before `?`, `!`, `;` → narrow non-breaking space `\u202F` (espace fine insécable)
- Inside guillemets `«` after and `»` before → `\u00A0` (regular)

**Example:**
```typescript
// Source: French typography rules verified against Canada.ca Writing Tips Plus
// https://www.noslangues-ourlanguages.gc.ca/en/writing-tips-plus/punctuation-standard-spacing-in-english-and-french
// src/lib/typography.ts

/**
 * Applies French typography rules by inserting non-breaking spaces
 * before double punctuation marks (:, ?, !, ;) and inside guillemets.
 *
 * - U+00A0 (regular non-breaking space) before :
 * - U+202F (narrow non-breaking space) before ? ! ;
 * - U+00A0 after « and before »
 */
export function frenchTypography(text: string): string {
  return text
    // Narrow non-breaking space before ? ! ;
    // Replaces any existing space (or no space) before these marks
    .replace(/\s*([?!;])/g, '\u202F$1')
    // Regular non-breaking space before :
    .replace(/\s*(:)/g, '\u00A0$1')
    // Regular non-breaking space after « and before »
    .replace(/«\s*/g, '«\u00A0')
    .replace(/\s*»/g, '\u00A0»')
}
```

**Usage in JSX:**
```tsx
import { frenchTypography } from '@/lib/typography'

// Option A: Apply to string before rendering
<p>{frenchTypography('Participez à l\'aventure : découvrez la mission !')}</p>

// Option B: Wrap in a thin component for convenience
export function Fr({ children }: { children: string }) {
  return <>{frenchTypography(children)}</>
}
// <Fr>Participez à l'aventure : découvrez la mission !</Fr>
```

### Anti-Patterns to Avoid

- **Using `tailwind.config.js` for color/token definitions:** In Tailwind v4 this file is no longer used (or has minimal use). All tokens go in `globals.css` via `@theme`.
- **`@import "tailwindcss/base"` etc.:** The v3 three-layer import pattern (`@tailwind base/components/utilities`) is replaced by a single `@import "tailwindcss"`.
- **Dynamic class construction via template literals:** `bg-${color}-500` will not be detected by Tailwind's scanner. Always use complete class names or a lookup object.
- **Plain `@theme` for font variables:** When referencing next/font CSS variables, `@theme` (without `inline`) generates a global CSS variable that may not resolve correctly because Tailwind evaluates the reference at build time, not runtime. Use `@theme inline`.
- **Applying font className to `<body>` instead of `<html>`:** The font CSS variables must be on `<html>` for them to be in scope when `@theme inline` resolves them.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Conditional Tailwind classes | String concatenation / ternary soup | `clsx` + `cn()` helper | clsx handles objects, arrays, falsy values safely |
| Merging overriding Tailwind classes | String concat | `tailwind-merge` (via `cn()`) | Without twMerge, conflicting utilities both stay in the class string |
| Font loading with zero CLS | Manual @font-face | `next/font/google` | Automatic fallback font metric-matching; self-hosted; no external requests |
| PostCSS for Tailwind v4 | Custom PostCSS config | `@tailwindcss/postcss` | Official plugin handles Lightning CSS engine, source maps, incremental builds |

**Key insight:** The `cn()` = `clsx` + `tailwind-merge` pairing is the single most important helper in a Tailwind project. Every component needs it.

---

## Common Pitfalls

### Pitfall 1: Using Tailwind v3 Import Pattern with v4

**What goes wrong:** Globals.css has `@tailwind base; @tailwind components; @tailwind utilities;` — this is v3 syntax and breaks with v4's new engine.

**Why it happens:** create-next-app may scaffold with v3 if an older cached template is used; dev guides mix v3 and v4 syntax.

**How to avoid:** After scaffolding, ensure globals.css starts with `@import "tailwindcss";` (one line). Verify `postcss.config.mjs` uses `"@tailwindcss/postcss"` not `"tailwindcss"`.

**Warning signs:** Build errors mentioning unknown at-rules, or styles not applying at all.

### Pitfall 2: next/font Variable Not Resolving in Tailwind

**What goes wrong:** Font defined in `next/font` with `variable: '--font-montserrat'` appears in DevTools on `<html>`, but `font-display` Tailwind utility has no effect.

**Why it happens:** Using `@theme` instead of `@theme inline` causes Tailwind to generate its own `--font-display` CSS variable (which shadows the one from next/font) rather than inlining the value.

**How to avoid:** Always use `@theme inline` when the token VALUE is a CSS variable reference:
```css
/* WRONG */
@theme {
  --font-display: var(--font-montserrat);
}

/* CORRECT */
@theme inline {
  --font-display: var(--font-montserrat);
}
```

**Warning signs:** Font utilities apply in isolation but font doesn't change visually; DevTools shows the right class but computed font-family is still the browser default.

### Pitfall 3: CLS from Font Loading

**What goes wrong:** Fonts cause layout shift (CLS > 0) as pages load.

**Why it happens:** Missing `display: 'swap'` or disabling `adjustFontFallback` (default true).

**How to avoid:** Keep `adjustFontFallback` at its default (`true`). This generates a metric-matched fallback font that prevents layout shift. Also specify `subsets: ['latin']` and avoid loading unnecessary weights.

**Warning signs:** CLS > 0 in Lighthouse; visible text reflow on slow connections.

### Pitfall 4: Dynamically Constructed Tailwind Class Names

**What goes wrong:** A class like `bg-brand-${colorName}` never gets applied.

**Why it happens:** Tailwind's source scanner finds class names via static string analysis. Template literals are not evaluated.

**How to avoid:** Use a lookup object mapping variant names to complete class strings (as shown in Button pattern above). Never construct partial class names.

**Warning signs:** Component renders with correct DOM structure but wrong color; class appears in HTML but generates no CSS rule.

### Pitfall 5: Wrong French Non-Breaking Space Character

**What goes wrong:** Using `&nbsp;` (which is `\u00A0`) before `?`, `!`, `;` when the correct character is `\u202F` (narrow non-breaking space).

**Why it happens:** `&nbsp;` is the well-known entity, so it's the first instinct. But typographically, the narrow variant (`\u202F`) is the correct one for double punctuation other than `:`.

**How to avoid:** The regex pattern in the typography utility handles this automatically. Manual text should embed `\u202F` directly or use the utility.

**Warning signs:** French text displays a visible space gap before `?` or `!` that is too wide; visual comparison against native French layouts reveals the difference.

### Pitfall 6: Color Hex Values Slightly Off From Poster

**What goes wrong:** Extracted colors look slightly different from the poster in the browser.

**Why it happens:** PNG images have gamma correction, display color profiles, and compression artifacts. The poster may also use CMYK-derived colors.

**How to avoid:** Use clean, "round" hex values that are visually close to the poster. The CONTEXT.md explicitly states Claude should pick the closest clean values, not pixel-perfect extraction.

**Recommended starting values** (from visual analysis of `srv/grafic/affiche-rtp.png` and `srv/grafic/rpt_logo.png`):
```
Navy blue (REIN wordmark, dark backgrounds):  #1e3a8a  (or similar deep navy)
Cyan blue (court bg, PADEL TOUR, primary CTA): #0ea5e9  (or #00b4d8)
Coral/salmon (kidney icon, red CTA):           #f4614f  (or #e8614e)
Yellow-green (ball, 2026 accent):              #a8d12a  (or #c5e03a)
```
Adjust after seeing them rendered on screen against the poster reference.

---

## Code Examples

Verified patterns from official sources:

### Full globals.css

```css
/* Source: https://tailwindcss.com/docs/guides/nextjs + https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme inline {
  /* Brand colors */
  --color-brand-navy: #1e3a8a;
  --color-brand-cyan: #0ea5e9;
  --color-brand-coral: #f4614f;
  --color-brand-yellow-green: #a8d12a;
  --color-brand-gray: #1e293b;
  --color-brand-gray-light: #e8ecf4;

  /* Font families (reference next/font CSS variables) */
  --font-display: var(--font-montserrat);
  --font-body: var(--font-inter);
}

@layer base {
  body {
    @apply font-body text-brand-gray antialiased;
  }
}
```

### Full layout.tsx

```tsx
/* Source: https://nextjs.org/docs/app/getting-started/fonts */
import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rein Padel Tour 2026',
  description: 'Tournoi de padel sur toute la France',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### postcss.config.mjs

```javascript
/* Source: https://tailwindcss.com/docs/guides/nextjs */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `theme.extend.colors` | `@theme` in `globals.css` | Tailwind v4 (Jan 2025) | No JS config file needed |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (Jan 2025) | Single import line |
| `tailwindcss` PostCSS plugin | `@tailwindcss/postcss` | Tailwind v4 (Jan 2025) | Different package, must install separately |
| `content: [paths]` array | Automatic content detection | Tailwind v4 (Jan 2025) | No manual path configuration |
| `next/font` with `className` only | `next/font` with `variable` + `@theme inline` | Tailwind v4 adoption | Font accessible as Tailwind utility class |
| Turbopack opt-in (`--turbo` flag) | Turbopack is the default bundler | Next.js 15 | Faster dev builds by default |

**Deprecated/outdated:**
- `tailwind.config.js` color definitions: Replaced by `@theme` CSS blocks
- `@tailwind` directive syntax: Replaced by `@import "tailwindcss"`
- `tailwindcss` as PostCSS plugin: Replaced by `@tailwindcss/postcss`

---

## Open Questions

1. **Exact brand hex values**
   - What we know: Visual analysis of poster and logo gives approximate colors (navy blue, vivid cyan, coral, yellow-green)
   - What's unclear: Pixel-perfect hex values; the PNG images have display rendering; actual design files (if any exist in Figma/Illustrator) would give exact values
   - Recommendation: Start with clean approximations listed in Pitfall 6, then refine visually during development by comparing against the poster in the browser

2. **Montserrat weight selection**
   - What we know: Montserrat is the display font; the poster uses bold weights
   - What's unclear: Exact weights needed (600? 700? 800?) and whether variable font subset covers all needed weights
   - Recommendation: Load `weight: ['600', '700', '800']` for Montserrat as a variable font; Inter as variable font (no explicit weights needed)

3. **SectionWrapper exact padding values**
   - What we know: A typical landing page pattern uses `py-16 md:py-24` vertical, `max-w-6xl` container, `px-4 sm:px-6 lg:px-8` horizontal
   - What's unclear: Project-specific visual rhythm — may need adjustment after Hero section is built in Phase 2
   - Recommendation: Implement with sensible defaults; it's a primitive so values are easily adjusted in one place

---

## Sources

### Primary (HIGH confidence)
- `https://nextjs.org/docs/app/getting-started/installation` (Next.js 15 official docs, last updated 2026-02-20) — scaffolding, project structure, TypeScript setup
- `https://nextjs.org/docs/app/getting-started/fonts` (Next.js 15 official docs, last updated 2026-02-20) — next/font/google API, variable option, zero CLS mechanism
- `https://tailwindcss.com/docs/guides/nextjs` (Tailwind CSS official docs) — PostCSS setup, `@import "tailwindcss"`, integration steps
- `https://tailwindcss.com/docs/theme` (Tailwind CSS official docs) — `@theme` directive syntax, `@theme inline` semantics, CSS variable generation
- Visual analysis of `srv/grafic/affiche-rtp.png` and `srv/grafic/rpt_logo.png` (direct image read) — color identity

### Secondary (MEDIUM confidence)
- `https://www.owolf.com/blog/how-to-use-custom-fonts-in-a-nextjs-15-tailwind-4-app` — next/font variable + `@theme inline` integration pattern, verified against official docs
- `https://github.com/tailwindlabs/tailwindcss/discussions/13410` — `[v4] NextJS font variable not applying inside tailwind` — confirmed `@theme inline` as the fix
- `https://github.com/tailwindlabs/tailwindcss/discussions/17826` — `@theme` vs `@theme inline` semantics, confirmed inline behavior
- `https://www.noslangues-ourlanguages.gc.ca/en/writing-tips-plus/punctuation-standard-spacing-in-english-and-french` — authoritative Canadian government source on French punctuation spacing rules

### Tertiary (LOW confidence)
- WebSearch results on community patterns for SectionWrapper, Button variants — consistent across multiple sources but not from a single authoritative doc

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — official Next.js and Tailwind docs confirmed, versions current as of 2026-02-24
- Architecture: HIGH — all patterns verified against official docs and known working community patterns
- Color tokens: MEDIUM — visual analysis is approximate; exact hex values require on-screen refinement
- French typography: HIGH — Unicode character codes verified, rules from authoritative Canadian government source
- Pitfalls: HIGH — Tailwind v4 breaking changes confirmed via official docs and tracked GitHub discussions

**Research date:** 2026-02-24
**Valid until:** 2026-08-24 (stable stack — 6 months)
