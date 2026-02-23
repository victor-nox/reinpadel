# Pitfalls Research

**Domain:** Next.js 15 static one-pager, charity event landing page, French content
**Researched:** 2026-02-23
**Confidence:** HIGH (most claims verified against official docs or multiple sources)

---

## Critical Pitfalls

### Pitfall 1: Tailwind v4 — Configuration Paradigm Shift

**What goes wrong:**
Developers carry over the v3 mental model: they create a `tailwind.config.js`, use `@tailwind base/components/utilities` directives, and expect plugins like DaisyUI to "just work." None of these survive a fresh v4 project. The build compiles silently with broken or missing styles.

**Why it happens:**
Tailwind v4 replaced JavaScript configuration entirely with a CSS-first `@theme {}` approach. The entry point changed from three `@tailwind` directives to a single `@import "tailwindcss"`. The PostCSS plugin changed from `tailwindcss` to `@tailwindcss/postcss`. All three changes happen simultaneously, making it easy to miss one.

**How to avoid:**
- Use `@import "tailwindcss";` at the top of `globals.css` — no directives.
- Define custom tokens inside `@theme { }` in `globals.css`, not in a JS config file.
- Use `@tailwindcss/postcss` in `postcss.config.mjs`, not the old `tailwindcss` plugin.
- Wire `next/font` CSS variables into Tailwind via `@theme inline { --font-sans: var(--font-inter); }`.
- Run `npx @tailwindcss/upgrade` if converting any v3 code; review output manually.

**Warning signs:**
- Utility classes like `bg-blue-600` render with no style applied.
- Build succeeds but browser shows unstyled content.
- TypeScript or ESLint errors about missing `tailwind.config` file.
- Gradient classes like `bg-gradient-to-r` produce no output (renamed to `bg-linear-to-r` in v4).

**Phase to address:** Project setup / Day 1 scaffold — get globals.css correct before writing any component.

---

### Pitfall 2: Hero Image Not Treated as LCP — Lighthouse Score Collapses

**What goes wrong:**
The affiche or hero poster image (`affiche-rtp.png`) loads lazily by default. Lighthouse reports LCP > 4 s. Mobile visitors from Instagram see a blank hero for 2–3 seconds before the image appears, which causes bounces before the mission is even read.

**Why it happens:**
`next/image` defaults to `loading="lazy"`. The `priority` prop was deprecated in Next.js 16 in favour of the `preload` prop. Developers copy old tutorials that use `priority` — the new API requires `preload={true}` (or `loading="eager"` + `fetchPriority="high"`).

**How to avoid:**
- On the single hero image: set `preload={true}` (Next.js 16+). Do NOT also set `loading` or `fetchPriority` together with `preload` — they conflict.
- For the background colour sections (no image), set `loading="lazy"` everywhere else.
- Provide explicit `width` and `height` (or use a static import) so the browser can reserve space and avoid CLS.
- Never use more than one `preload={true}` image per page.

**Warning signs:**
- Lighthouse LCP > 2.5 s on mobile throttled test.
- Hero section visible empty for > 1 s on slow connection.
- DevTools Network tab shows the hero image fetched late in waterfall.

**Phase to address:** Hero section build — set `preload` correctly the first time rather than optimising after.

---

### Pitfall 3: Open Graph Image Uses Relative URL — Social Previews Break

**What goes wrong:**
When shared on Instagram or Facebook, the link preview shows no image or a broken thumbnail. The cause: `og:image` resolves to `localhost:3000/og-image.png` or a Vercel deploy-preview URL instead of the production domain.

**Why it happens:**
Next.js App Router metadata resolves relative paths against `metadataBase`. If `metadataBase` is not set, Next.js falls back to `localhost:3000` during build — which is exactly what gets baked into the HTML served by Vercel. Social crawlers (Facebook, WhatsApp, Telegram) fetch that URL and get nothing.

**How to avoid:**
```ts
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://reinpadeltour.fr'
  ),
  openGraph: {
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}
```
- Set `NEXT_PUBLIC_SITE_URL=https://reinpadeltour.fr` in Vercel dashboard > Environment Variables > Production.
- OG image dimensions: exactly 1200 × 630 px (Facebook/Instagram standard).
- Format: JPEG or PNG — not WebP (poor support in OG crawlers).
- File size: under 8 MB; under 1 MB preferred.

**Warning signs:**
- Pasting URL into https://opengraph.xyz or Facebook Sharing Debugger shows blank or localhost image.
- Next.js build logs emit: `metadata.metadataBase is not set for resolving social open graph or twitter images`.

**Phase to address:** SEO & metadata phase (before launch), verified with Sharing Debugger.

---

### Pitfall 4: French Typography — Non-Breaking Spaces Silently Missing

**What goes wrong:**
Headings and body text display broken punctuation: `Pourquoi ?` breaks across a line as `Pourquoi` on one line and `?` on the next. Colons and semi-colons appear glued to the preceding word in some browsers. This signals unprofessional French content to native readers and makes the charity look careless.

**Why it happens:**
French typography requires a non-breaking space before `:`, `;`, `?`, `!`, and inside guillemets (`« »`). JSX renders plain string content where a space character is a regular breakable space. The correct Unicode character (`\u00A0` for NBSP, `\u202F` for narrow NBSP) must be used explicitly.

**How to avoid:**
Use a typed constant rather than remembering the escape:
```ts
// lib/typography.ts
export const NBSP = '\u00A0';     // non-breaking space (standard)
export const NNBSP = '\u202F';   // narrow non-breaking space (typographically correct before : ? ! ;)
```
Apply in JSX:
```tsx
<p>Pourquoi{NNBSP}? Parce que...</p>
<p>Résultat{NNBSP}: 7{NBSP}000 km</p>
```
Prefer `NNBSP` (`\u202F`) before high punctuation (`:`, `;`, `?`, `!`) per French professional typography standards; `NBSP` for number grouping (e.g. `7\u00A0000 km`).

**Warning signs:**
- Punctuation appears at the start of a new line.
- Colons or question marks directly follow a word with zero space.
- Text passes a spell-check but fails a native-French editorial review.

**Phase to address:** Content scaffolding — add constants to `lib/typography.ts` before writing any French copy.

---

### Pitfall 5: SVG Map Animation Causes Mobile Jank

**What goes wrong:**
The kidney-shaped France route SVG, when animated with `stroke-dashoffset` or fill transitions, causes dropped frames on mid-range Android phones arriving from Instagram. The animation is smooth in Chrome DevTools device emulation but jerky on real hardware.

**Why it happens:**
Animating `stroke`, `fill`, or `stroke-dashoffset` directly triggers layout/paint — these are not compositor-friendly properties. Mobile GPUs only accelerate `transform` and `opacity`. A complex SVG path with many anchor points and a filter (e.g. drop shadow) compounds the problem.

**How to avoid:**
- Animate only `stroke-dashoffset` (not `stroke-dasharray` width) — this is the least expensive path-drawing technique.
- Avoid simultaneous `filter: drop-shadow` on animated SVG elements — apply shadow via a static sibling layer.
- Use CSS `@keyframes` over JavaScript animation libraries (no GSAP needed for this use case).
- Wrap the SVG in a container with `will-change: transform` only if the element actually transforms.
- Keep the route SVG path complexity low: simplify the kidney path to < 200 anchor points.
- Use `prefers-reduced-motion` media query to disable animations for users who request it:
```css
@media (prefers-reduced-motion: reduce) {
  .route-path { animation: none; }
}
```
- Test on a real mid-range Android device or use Chrome DevTools CPU throttling at 4x slowdown before shipping.

**Warning signs:**
- Chrome Performance panel shows paint activity during animation (green bars instead of compositor-only).
- `will-change: filter` on any animated element (very expensive).
- FPS drops below 60 in Chrome DevTools > Performance > Frames.

**Phase to address:** Route map section build. Validate on throttled CPU before considering the section done.

---

### Pitfall 6: Accessibility — White Text on Padel-Court Blue Fails Contrast

**What goes wrong:**
The brand palette (Padel-Court blue, kidney red, ball yellow-green) looks vivid on designer screens but some combinations fail WCAG AA contrast requirements. Specifically, white text on mid-range blue, or yellow-green text on blue, can fall below the 4.5:1 ratio required for body text. This is both an accessibility issue and a Lighthouse Accessibility score issue.

**Why it happens:**
Designers pick colours for visual impact; developers implement without checking contrast ratios. Tailwind v4 uses OKLCH colour values which may appear slightly different from the original Figma/poster hex values, widening the gap between designer intent and rendered output.

**How to avoid:**
- Verify every text-on-background combination with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) before implementation.
- Targets: normal text ≥ 4.5:1 (AA), large text ≥ 3:1 (AA), aim for 7:1 (AAA) on primary hero.
- White (`#FFFFFF`) on the brand blue needs to be dark enough — a blue darker than approximately `#0066CC` achieves AA; `#0059B3` or darker achieves AAA.
- Yellow-green (`#CCFF00` style ball colour) on white passes, but on blue often fails — test explicitly.
- Add `aria-label` to all icon-only buttons and SVG icons.
- Set `lang="fr"` on the `<html>` element (French content, screen reader pronunciation).

**Warning signs:**
- Lighthouse Accessibility score < 90.
- Axe browser extension reports colour contrast violations.
- Any text element using Tailwind colour utilities that weren't manually verified.

**Phase to address:** Design system tokens (globals.css `@theme`) — validate palette before it is used across all sections.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcode all French text in JSX | No i18n infra needed | Painful to add EN/DE later; find-replace required | Acceptable for v1 MVP — architecture note in constants.ts |
| `<img>` instead of `<Image>` for partner logos | Simpler code | Missing lazy load, no format optimization, potential CLS | Never — use `<Image unoptimized>` for SVG logos at minimum |
| Inline styles for one-off spacing | Fast to write | Tailwind inconsistency, harder to maintain | Acceptable for truly unique cases (route map SVG wrapper) |
| Skip `alt` text on purely decorative icons | Saves time | Fails Lighthouse Accessibility, screen reader noise | Use `alt=""` explicitly for decorative images (not omitting the attribute) |
| Copy-paste lorem ipsum placeholder for legal page | Moves fast | Legal exposure — mentions légales must be real content before launch | Never — French law requires real content before going live |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Vercel + Next.js OG images | Relative `/og-image.png` URL in metadata | Set `metadataBase` + `NEXT_PUBLIC_SITE_URL` env var in Vercel dashboard |
| Vercel + environment variables | Forgetting `NEXT_PUBLIC_` prefix for client-visible vars | Client-accessible vars must be prefixed; server-only vars (no prefix) are not exposed to browser |
| `next/font` + Tailwind v4 | Applying font class directly via `inter.className` without registering CSS variable | Use `variable: '--font-inter'` option, then wire into `@theme inline { --font-sans: var(--font-inter); }` in globals.css |
| Static asset paths in Vercel | Relative `src="./logo.svg"` in `<img>` | Use absolute path from `public/`: `src="/logo.svg"` |
| Plausible analytics (cookieless) | Adding `<Script>` with wrong strategy — blocks LCP | Use `strategy="afterInteractive"` or `strategy="lazyOnload"` |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Multiple fonts imported without variable font | Large FOUT on first load, CLS | Use a single variable font (e.g. Inter variable) covering all weights | Every page load |
| Partner logo grid using `<img>` without dimensions | CLS spike when logos load | Use `<Image>` with explicit `width`/`height` or fixed container | On slow connections (mobile) |
| Hero section with `loading="lazy"` on LCP image | LCP > 2.5 s, Lighthouse score < 90 | `preload={true}` on hero image only | All traffic, worse on 3G |
| Animating SVG `fill` or `stroke` colour | Paint storms, mobile jank | Animate only `stroke-dashoffset` and/or `opacity` | Any device under CPU pressure |
| Open Graph image > 8 MB | Social crawler fails to fetch, no preview | Compress poster image; serve JPEG not PNG for OG | All social shares |
| Sticky navbar repainting on scroll | Scroll jank, especially on iPhone | Use `transform: translateZ(0)` or `will-change: transform` on navbar; keep it compositor-friendly | All scrolling users |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Skipping `lang="fr"` on `<html>` | Not a security issue but a legal/accessibility issue — CNIL accessibility requirements | Always set `<html lang="fr">` |
| Missing `mentions légales` content before launch | French law: fines up to €75,000 for individuals | Real legal content (operator identity, host name, SIRET if applicable) must be live before public launch |
| RGPD without cookie banner when adding analytics | If Plausible (cookieless) is used, no banner needed; adding any cookie-based tool later requires consent | Keep analytics cookieless (Plausible script tag) for v1; document this decision |
| External partner logo URLs fetched at runtime | If a partner CDN is down, images 404 — no security risk but reputational | Download and self-host all partner logos in `/public/partners/` |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Hero CTA buttons with placeholder `href="#"` invisible on mobile | Tappable area is fine but tapping loops back to top — confusing | Use `href="#participation"` to scroll to relevant section, not empty hash |
| France map SVG not keyboard-navigable | Screen reader / keyboard users get no map context | Add `role="img"` and `aria-label` describing the route on the SVG container |
| Sticky navbar covers section headings on anchor scroll | Clicking nav link hides the heading under navbar | Add `scroll-margin-top: 80px` (or navbar height) to all section anchor targets |
| Small tap targets on mobile for social icons | Missed taps, frustrated mobile users (70%+ of traffic) | Minimum tap target: 44 × 44 px (WCAG 2.5.5); use padding rather than making icons bigger |
| Partner logos displayed at inconsistent heights | Looks unprofessional, perceived as low-effort | Fix container height (e.g. `h-12`) and use `object-fit: contain` via `objectFit="contain"` on `<Image>` |
| No `<meta name="viewport">` | Page does not scale on mobile — catastrophic for social traffic | Next.js App Router adds this automatically, but verify it is not removed by custom `<head>` manipulations |

---

## "Looks Done But Isn't" Checklist

- [ ] **Open Graph preview:** Paste URL into [opengraph.xyz](https://opengraph.xyz) — verify image, title, description appear correctly.
- [ ] **French typography:** Grep for `?` and `:` preceded by a regular space — should be preceded by `\u202F`.
- [ ] **Lighthouse mobile score:** Run Lighthouse on mobile preset (not desktop) — target ≥ 95 across all four categories.
- [ ] **Mentions légales page:** Confirm real legal content (not placeholder) with host details, operator identity.
- [ ] **Font loading:** Confirm no FOUT by throttling network to Fast 3G and watching first load.
- [ ] **Hero image LCP:** Verify LCP element in Lighthouse is the hero image/poster and LCP time < 2.5 s.
- [ ] **Contrast ratios:** Run Axe browser extension — zero colour contrast violations.
- [ ] **`lang` attribute:** Confirm `<html lang="fr">` in page source.
- [ ] **Sticky navbar scroll-margin:** Click each nav link — section heading not obscured by navbar.
- [ ] **Social share test:** Share URL in a private Facebook/WhatsApp message — verify preview image and title.
- [ ] **`prefers-reduced-motion`:** SVG route animation stops when OS accessibility setting is enabled.
- [ ] **`sizes` prop on all responsive images:** No image without `sizes` when used in a responsive layout.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Wrong Tailwind v4 setup discovered after styling 3 sections | MEDIUM | Fix `globals.css` and `postcss.config.mjs`; run `npx @tailwindcss/upgrade`; spot-check class names for renames (e.g. `bg-gradient-*` → `bg-linear-*`) |
| OG images resolve to localhost after deployment | LOW | Add `metadataBase` to layout.tsx; set `NEXT_PUBLIC_SITE_URL` in Vercel; redeploy |
| Hero LCP > 4 s discovered from Lighthouse | LOW | Add `preload={true}` to hero `<Image>`; redeploy; confirm with Lighthouse re-run |
| French typography errors found in content review | LOW | Create `lib/typography.ts` constants; global find-replace across all string literals |
| Accessibility failures on blue sections | MEDIUM | Adjust Tailwind colour tokens in `@theme`; re-verify all text-on-background combos; update brand colours slightly |
| Mentions légales contains placeholder text at launch | HIGH | Block launch until real legal content is written; French law fines apply from first public access |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Tailwind v4 config paradigm | Scaffold / Day 1 setup | `globals.css` reviewed, build succeeds, one utility class visually confirmed |
| Hero image LCP (`preload`) | Hero section build | Lighthouse mobile LCP < 2.5 s |
| OG image absolute URL | SEO & metadata phase | opengraph.xyz shows correct image and title |
| French typography NBSP | Content scaffolding (before copy pasted in) | Grep for ` ?` / ` :` / ` !` — zero matches |
| SVG animation mobile jank | Route map section build | Chrome Performance panel shows no paint during animation; test on CPU-throttled mobile |
| Contrast on blue backgrounds | Design tokens (globals.css @theme) | Axe extension: zero contrast violations |
| Mentions légales completeness | Legal page phase | All required French law fields present (host, operator, SIRET/SIREN if applicable) |
| Sticky navbar anchor scroll | Navbar + layout build | All nav links scroll to correct section without heading hidden |
| Social share preview | Pre-launch checklist | Facebook Sharing Debugger shows correct OG image for production URL |

---

## Sources

- [Tailwind CSS v4.0 blog post — official announcement](https://tailwindcss.com/blog/tailwindcss-v4) — HIGH confidence
- [Tailwind CSS upgrade guide](https://tailwindcss.com/docs/upgrade-guide) — HIGH confidence
- [Next.js Font API Reference (docs version 16.1.6, 2026-02-20)](https://nextjs.org/docs/app/api-reference/components/font) — HIGH confidence
- [Next.js Image Component API Reference (docs version 16.1.6, 2026-02-20)](https://nextjs.org/docs/app/api-reference/components/image) — HIGH confidence
- [GitHub Discussion: metadata.metadataBase not set for OG images](https://github.com/vercel/next.js/discussions/57251) — MEDIUM confidence
- [WebAIM: Contrast and Color Accessibility](https://webaim.org/articles/contrast/) — HIGH confidence
- [MDN: CSS and JavaScript animation performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/CSS_JavaScript_animation_performance) — HIGH confidence
- [Leif Gehrmann: French punctuation and spaces](https://i18n.leifgehrmann.com/french-punctuation/) — MEDIUM confidence
- [Vercel: Environment Variables documentation](https://vercel.com/docs/environment-variables) — HIGH confidence
- [SVG Animation Encyclopedia 2025 (svgai.org)](https://www.svgai.org/blog/research/svg-animation-encyclopedia-complete-guide) — MEDIUM confidence
- [ICLG: Data Protection Laws France 2025-2026](https://iclg.com/practice-areas/data-protection-laws-and-regulations/france) — MEDIUM confidence
- [GitHub: Upgrading to Tailwind v4 — Missing Defaults discussion #16517](https://github.com/tailwindlabs/tailwindcss/discussions/16517) — MEDIUM confidence

---
*Pitfalls research for: Next.js 15 charity event one-pager (Rein Padel Tour 2026)*
*Researched: 2026-02-23*
