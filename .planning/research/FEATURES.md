# Feature Research

**Domain:** Charity sports event one-pager website (padel tour, disease awareness, France)
**Researched:** 2026-02-23
**Confidence:** HIGH — informed by charity website studies, nonprofit design best practices, French legal requirements (LCEN/CNIL), and project-specific constraints from PROJECT.md

---

## Context: What This Site Is

Rein Padel Tour 2026 is a charity padel tour where the driven route draws a kidney shape across France to raise awareness for Berger's disease (IgA nephropathy). The site is a **one-pager**: a single scroll experience serving three audiences simultaneously — potential players, donors, and corporate partners. 70%+ of traffic will arrive from Instagram/Facebook links on mobile devices.

This is not a donation platform. It is a **discovery and awareness page**. V1 has no working external links. The conversion goal is emotional: make visitors understand the project in under 30 seconds and feel compelled to share it.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that users assume exist on any event or charity site. Missing any of these causes visitors to leave or distrust the project.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hero section** — logo, headline, date, event tagline, primary CTAs | Every event site leads with an above-the-fold hook. Without it visitors don't know what the site is about within 3 seconds. | LOW | Must include logo asset, headline (emotion-first), date badge "6–15 Mars 2026", and 2–3 CTA buttons (Jouer, Donner, Devenir Partenaire) |
| **Mission section** — explain the project with key stats | Charity visitors need to immediately understand "what" and "why". Missing = no context, no trust. | LOW | Key facts: 7,000 km, 9 villes, 1 rein, 15 jours. Stats displayed as large-format numbers (not buried in paragraphs) |
| **Disease/cause section** — what is Berger's disease | Disease-awareness events must explain the cause or the charitable link feels hollow. | LOW | Berger's disease (néphropathie à IgA): what it is, how many people affected, why this tour raises awareness. Personal story of Antoine is the emotional core |
| **Route/map section** — where the tour goes | Event participants and press need to see the geographic scope. Maps are expected on any multi-city tour. | MEDIUM | The kidney-shaped route on a France SVG map is the defining visual metaphor — it IS the project's signature feature, not decorative |
| **Participation section** — how to get involved | Without "how do I join?" the site has no conversion path, even for an informational v1. | LOW | Three participation modes: Jouer (play), Donner (donate), Devenir Partenaire (sponsor). Cards format, each with short description and CTA button (placeholder href in v1) |
| **Partners/sponsors section** — logo grid | Partners expect recognition. Visitors use partner logos as social proof of legitimacy. | LOW | Two tiers: "Partenaires Principaux" and "Partenaires". Logos must be accessible (alt text with partner name) and sized consistently |
| **Footer** — identity, navigation, social links, legal | Expected on every website globally. Missing footer signals unprofessionalism or an unfinished project. | LOW | Mission tagline, anchor nav links, social icons (Instagram, Facebook, LinkedIn), legal links (Mentions Légales, Politique de confidentialité) |
| **Sticky navbar** — transparent → solid on scroll | Standard on modern one-pagers. Visitors from mobile need persistent navigation access while scrolling. | LOW | Transparent on hero → solid Padel-Court blue on scroll. Anchor links to each section. Mobile hamburger menu. |
| **Mentions Légales page** — legally required in France | French law (LCEN 2004, Article 6) mandates this for any public-facing website. Fines up to €75,000 / 1 year imprisonment for non-compliance. | LOW | Separate `/mentions-legales` route. Required fields: nom/prénom ou raison sociale de l'éditeur, directeur de la publication, hébergeur (nom, adresse, téléphone), numéro SIRET ou numéro RNA associatif. See Legal Compliance section below. |
| **Mobile-first responsive design** | 70%+ of traffic arrives from Instagram/Facebook on phones. Non-responsive = bounce immediately. | MEDIUM | All sections must work at 375px. Padel court background, route map SVG, partner logo grid all need mobile-specific layouts. |
| **SEO metadata + Open Graph** | Visitors share links on social media. Without OG tags the share preview is blank or broken — social virality is the primary distribution channel. | LOW | `<title>`, `<meta description>`, `og:title`, `og:description`, `og:image` (the poster), `og:url`, Twitter Card meta. Use Next.js 15 `metadata` export in `app/layout.tsx`. |
| **High performance (Lighthouse ≥ 95)** | Google de-ranks slow sites. Mobile visitors from social won't wait > 3s. Nonprofit sites typically score poorly — being fast is expected on a modern site. | MEDIUM | Images via `next/image`, fonts via `next/font`, no client-side JS beyond navbar scroll listener. Hero image must use `fetchPriority="high"` to avoid LCP penalty. |
| **Accessible semantic HTML** | Expected by screen readers, assistive tech users, and Google's crawler. Missing = accessibility failures and SEO penalties. | LOW | Proper `<h1>–<h6>` hierarchy, alt texts on all images including partner logos, sufficient colour contrast (white on Padel-Court blue must pass WCAG AA), keyboard navigability. |
| **French-language content** | Site serves French audience. English text would signal cultural mismatch and reduce trust for French media/donors. | LOW | All visible content in French. French typography rules: non-breaking space (`\u00A0`) before `:`, `?`, `!`, `;`. |

---

### Differentiators (Competitive Advantage)

Features that make Rein Padel Tour 2026 stand out versus a generic charity event site. Not universally expected, but high value for this specific project.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Kidney-shaped route SVG** — the route drawn as a kidney on a France map | This IS the project's signature concept. No other charity tour does this. It instantly communicates both the sport (a tour) and the cause (kidney disease) visually. | MEDIUM | Use a France outline SVG with a custom kidney-shaped `<path>` animated via CSS `stroke-dashoffset` draw-on animation. 9 station dots with city names and dates. This is the one section that must be visually memorable. |
| **Personal founder story** — Antoine's own diagnosis as the "why" | Donors give to people, not causes. An authentic first-person story outperforms generic mission statements. Charity: Water, Make-A-Wish, and others demonstrate this consistently. | LOW | A dedicated sentence/paragraph with Antoine's story integrated into the Mission or Disease section. Photo optional. This is copy-level, not a separate component. |
| **Key stats as bold hero numbers** — 7,000 km / 9 villes / 1 rein / 15 jours | Large-format stats in the hero/mission area dramatically increase visual impact and memorability. Feeding America (data visualization) and charity.water (impact numbers) use this to make scale feel real. | LOW | Use `<dl>` or stat-card layout. Numbers should be large (4–6rem), value-first, unit second. Consider subtle count-up animation on scroll-into-view (pure CSS or minimal JS). |
| **Station timeline** — 9 cities with dates and padel club names | Specific, real data builds credibility instantly. A generic "we'll tour France" vs "March 6, Bordeaux, Club Padel Bordeaux" is the difference between vague and real. | LOW | Station list rendered from `lib/constants.ts`. Displayed in a horizontal scroll timeline on desktop, vertical accordion on mobile. Data already exists in project spec. |
| **Poster / visual identity integration** — the `affiche-rtp.png` as a hero background element | The existing poster defines the visual identity (Padel-Court blue, kidney red, ball yellow-green). Using it directly gives the site cohesion with offline materials shared on social. | LOW | The poster is already in the repository. Can be used as a background or inset image. Maintain the palette throughout all sections. |
| **Three-audience participation cards** — Play / Donate / Become a Partner in one section | Most charity sites focus on one audience. Serving three simultaneously with distinct, scannable cards reduces friction for each segment. | LOW | Three equal-weight cards with sport icon, headline, 2-line description, and CTA button. CTAs are placeholder hrefs in v1 but architecture makes them easy to wire in v2. |
| **Cookieless analytics (Plausible)** — no cookie banner needed | Charity sites that add GDPR banners on first load create friction right at the moment of engagement. Plausible is GDPR-compliant without cookies, so no banner is needed — cleaner UX. | LOW | Plausible script added to `app/layout.tsx`. No `<CookieBanner>` component needed. No privacy policy additions needed for analytics. Confirmed: Plausible does not set cookies, does not collect personal data. |

---

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem valuable but would harm the project given its constraints (time to launch, no backend, mobile-first, informational-only v1).

| Anti-Feature | Why Requested | Why Problematic | Alternative |
|--------------|---------------|-----------------|-------------|
| **Working donation links / Stripe integration** | Everyone wants to donate immediately | Requires HelloAsso or Stripe setup, legal payment verification, paiement en ligne compliance, association bank account integration. Scope expansion kills the March 6 deadline. | Placeholder CTA button "Faire un don" with `href="#"` in v1. Wire to HelloAsso in v2 after launch. |
| **Live GPS tracking** | Exciting during the tour itself | Requires real-time backend (WebSocket or polling), GPS device integration, route data streaming. None of this exists in v1's static architecture. | Static station data in `constants.ts` with dates. Live tracking is phase 3+ during March 6–15 tour week. |
| **Newsletter signup / email capture form** | "Let's build an audience" | Requires form submission handler (API route or external service), GDPR consent, double opt-in, email provider integration. None of this is in scope or architecture for v1. | Social media follow CTAs in footer (Instagram, Facebook) serve the same audience-building goal without backend infrastructure. |
| **Video background in hero** | Cinematic, emotionally engaging | Auto-playing video is a mobile performance killer. A 10MB video destroys Lighthouse scores and burns mobile data for users on 4G from Instagram. | High-quality poster image (`affiche-rtp.png`) or still photograph with CSS overlay. Same emotional impact, fraction of the payload. |
| **Cookie consent banner** | "We need GDPR compliance" | With Plausible (cookieless analytics) and no other tracking scripts, no personal data is collected, so no consent banner is legally required per CNIL guidance. A banner adds friction on first load — exactly when emotional engagement is critical. | Plausible analytics (cookieless). No banner. Mention Plausible in Politique de confidentialité page if needed. |
| **Blog / actualités section** | "We'll want to post updates" | Requires CMS, content management workflow, additional routing, and ongoing editorial commitment. On a static site this means hardcoded updates or a full CMS migration. | Deferred to phase 2. Link to Instagram directly for real-time updates in v1. |
| **Multilingual toggle (FR/DE/EN)** | "International reach" | Adds i18n complexity to Next.js routing (locale subpaths), doubles content maintenance, requires translation work. Primary audience is French. | Architecture should allow `next-intl` addition later. V1 French only. Mention in footer only if explicitly needed. |
| **Real-time ace counter / fundraising progress bar** | "Show momentum / gamification" | Requires a live data source (API or database) to be meaningful. A static hardcoded number is worse than no counter — it looks stale and dishonest. | Show a static "goal" figure if amounts are confirmed. Otherwise omit entirely in v1. |
| **Social media feed embed (Instagram widget)** | "Show live activity" | Instagram embed widgets require third-party JS (Meta SDK), set cookies, and are privacy-invasive. They also become stale immediately and are difficult to style. | Link out to Instagram with a "Suivez-nous" CTA. Clean, fast, no JS dependency. |
| **Animated page transitions / parallax hero scroll** | "Makes it feel premium" | GSAP and heavy scroll libraries are the primary source of Lighthouse score collapse on charity sites. CSS-only animations (scroll-driven animation API) are sufficient and avoid client JS bundles. | CSS `@keyframes` and `animation-timeline: scroll()` for scroll-reveal. No animation library in v1. |

---

## Feature Dependencies

```
[Sticky Navbar with anchor links]
    └──requires──> [All sections have matching id attributes]
                       └──requires──> [Section IDs defined in lib/constants.ts]

[Route Map SVG]
    └──requires──> [Station data in lib/constants.ts]
                       (9 cities: coordinates, dates, club names)

[Partners Section — logo grid]
    └──requires──> [Partner logo image assets in /public]
                       └──requires──> [Assets already in repo (confirmed in PROJECT.md)]

[SEO / Open Graph]
    └──requires──> [og:image → poster asset in /public]
    └──enhances──> [Social sharing from Instagram/Facebook links]

[Mentions Légales page]
    └──requires──> [/app/mentions-legales/ route]
    └──requires──> [Éditeur identity info — name, address, association RNA number]
    └──requires──> [Hébergeur info — Vercel's legal details]

[Cookieless analytics (Plausible)]
    └──conflicts──> [Cookie consent banner] (no banner needed without cookies)
    └──eliminates──> [Politique de confidentialité for analytics]

[Participation CTAs — Play / Donate / Partner]
    └──enhances──> [v2 external link integration] (HelloAsso, registration form)
    (v1 uses placeholder hrefs — no dependency on backend)

[Mobile-first responsive design]
    └──required by──> [All section components]
    └──most critical for──> [Route Map SVG] (complex to scale down from desktop)
    └──most critical for──> [Partner logo grid] (logo clouds frequently break on mobile)
```

### Dependency Notes

- **Station data drives both Route Map and Station Timeline:** `lib/constants.ts` is the single source of truth. The map SVG renders dots from station coordinates; the timeline renders city names and dates from the same data. Both break if this data is inconsistent.
- **Hero image is the LCP element:** The `affiche-rtp.png` or hero photo must use `fetchPriority="high"` on `next/image`. Missing this collapses Lighthouse performance from ~95 to ~60. See PITFALLS.md.
- **Mentions Légales requires real identity data:** The page cannot be written without knowing the association's legal name, RNA number (or SIRET), registered address, and directeur de publication. This is a content dependency, not a code dependency.
- **All section `id` attributes must match the Navbar anchor links:** If a section's `id` changes, the navbar breaks silently. Define all section IDs in `constants.ts` as the single source of truth.

---

## Legal Compliance: Mentions Légales Requirements

**Confidence: MEDIUM** — sourced from LCEN text, service-public.gouv.fr, and legal aggregators. Verify with a French lawyer for final content.

French law (LCEN 2004, Article 6) requires the following on any public-facing website. Penalties for omission: up to €75,000 fine and 1 year imprisonment for natural persons; up to €375,000 for legal entities.

**Required fields for the `/mentions-legales` page:**

| Field | Required For | Notes |
|-------|-------------|-------|
| Nom et prénom ou raison sociale de l'éditeur | All sites | The individual or association responsible for the site |
| Adresse (siège social ou domicile) | All sites | Physical address of the publisher |
| Numéro de téléphone | All sites | Contact phone number |
| Adresse email | All sites | Contact email |
| Directeur de la publication | All professional/association sites | The named individual with editorial responsibility (Antoine or the association president) |
| Numéro SIRET ou RNA | Associations / companies | RNA (Répertoire National des Associations) number for a loi 1901 association; SIRET for a commercial entity |
| Nom de l'hébergeur | All sites | "Vercel Inc." |
| Adresse de l'hébergeur | All sites | Vercel's registered address |
| Téléphone de l'hébergeur | All sites | Vercel's contact number |
| Mention LCEN reference | Best practice | "Conformément à la loi n°2004-575 du 21 juin 2004..." |

**What is NOT required in this specific case:**
- Cookie consent banner (no cookies — Plausible is cookieless; confirmed by Plausible's own data policy)
- Separate Politique de Confidentialité (no personal data collected with Plausible; contact form is deferred to v2)
- CGV (Conditions Générales de Vente) — no e-commerce, no paid services in v1

---

## MVP Definition

### Launch With (v1) — Required for March 6 deadline

Everything below is already in the PROJECT.md requirements. All are table stakes.

- [ ] **Hero section** — logo, headline, date, 3 CTAs — establishes what the project is in 3 seconds
- [ ] **Mission section** — key stats (7,000 km / 9 villes / 1 rein) — makes the scope visceral
- [ ] **Disease section** — Berger's disease explanation with Antoine's personal story — emotional core
- [ ] **Route section** — France SVG with kidney-shaped tour route and 9 station dots — signature visual
- [ ] **Participation section** — 3 cards (Jouer / Donner / Devenir Partenaire) — conversion path
- [ ] **Partners section** — logo grid with tier separation — social proof and partner recognition
- [ ] **Footer** — social links, nav, legal links — completeness signal
- [ ] **Sticky navbar** — transparent-to-solid scroll behavior — navigation accessibility
- [ ] **Mentions Légales page** — `/mentions-legales` route — legally mandatory
- [ ] **Mobile-first responsive** — 375px to 1440px — primary traffic channel
- [ ] **SEO + Open Graph metadata** — share preview cards — social virality
- [ ] **Lighthouse ≥ 95** — performance budget maintained — SEO and UX

### Add After Validation (v1.x) — Post-launch, before tour week

- [ ] **Working CTAs — Jouer / Donner** — wire Play and Donate buttons to actual registration/donation form (HelloAsso) — trigger: when forms exist
- [ ] **Newsletter / email capture** — add Mailchimp or Brevo signup — trigger: when list strategy is defined
- [ ] **Politique de Confidentialité page** — add if contact form or email tracking is introduced — trigger: when personal data is collected

### Future Consideration (v2+) — Phase 2 and beyond

- [ ] **Live GPS tracking** — real-time tour route display during March 6–15 — complex backend, phase 3
- [ ] **Blog / actualités** — post-tour content, press coverage — requires CMS strategy
- [ ] **Photo/video gallery** — race recaps, athlete photos — phase 2 after tour completes
- [ ] **Real-time ace counter / fundraising progress** — only meaningful with live data source
- [ ] **Multilingual (FR/EN/DE)** — requires i18n routing and translation — phase 3 if justified by traffic data

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero section | HIGH | LOW | P1 |
| Mission section (stats) | HIGH | LOW | P1 |
| Disease section (cause + story) | HIGH | LOW | P1 |
| Route map SVG (kidney shape) | HIGH | MEDIUM | P1 |
| Participation cards | HIGH | LOW | P1 |
| Partner logo grid | MEDIUM | LOW | P1 |
| Footer | MEDIUM | LOW | P1 |
| Sticky navbar | HIGH | LOW | P1 |
| Mentions Légales page | HIGH | LOW | P1 — legal obligation |
| Mobile responsiveness | HIGH | MEDIUM | P1 |
| SEO + Open Graph | HIGH | LOW | P1 |
| Lighthouse ≥ 95 | HIGH | MEDIUM | P1 |
| Station timeline (dates + clubs) | MEDIUM | LOW | P1 — data already exists |
| Cookieless analytics (Plausible) | MEDIUM | LOW | P2 |
| Live GPS tracking | HIGH (during tour week) | HIGH | P3 — phase 3 |
| Blog / actualités | LOW | HIGH | P3 — phase 2+ |
| Working donation integration | HIGH | HIGH | P2 — post-launch |

---

## Competitor Feature Analysis

No direct competitors found for a padel-specific charity event with a route-as-anatomy concept. Analysis based on analogous charity sports event sites.

| Feature | Paris-Roubaix Étape (cycling challenge) | HellOf charity runs | Our Approach |
|---------|----------------------------------------|---------------------|--------------|
| Hero | Full-bleed race photo, date prominent, CTA to register | Bold typography, color-coded CTAs | Poster image + typography, CTAs as pills |
| Route map | Interactive Mapbox/Leaflet map with elevation | Static SVG with station pins | Static SVG with animated kidney-shaped path — more unique, less JS |
| Stats | Distance, elevation gain, max gradient | Total raised, runners count | Stage count, km, cities — pre-event so no live totals |
| Partner logos | Grid with tier labels | Scrolling logo carousel | Static grid, two tiers, no JavaScript carousel (performance) |
| Social proof | Press logos, testimonials from past editions | Testimonials from beneficiaries | Foundation story (Antoine) + partner logos — no past editions exist |
| Legal | Standard mentions légales footer link | Standard mentions légales footer link | Dedicated page, footer link — same pattern, legally required |
| Cookie banner | Yes (Matomo/GA) | Yes (GA) | No — Plausible removes this entirely |

---

## Sources

- French government legal requirements: [Mentions obligatoires — Entreprendre Service Public](https://entreprendre.service-public.gouv.fr/vosdroits/F31228) (MEDIUM confidence — focused on sole traders; association requirements confirmed via LCEN Article 6)
- LCEN overview: [Mentions légales — Service Public P10025](https://www.service-public.gouv.fr/P10025)
- Plausible GDPR compliance: [Plausible Data Policy](https://plausible.io/data-policy) (HIGH confidence — official Plausible documentation confirms no cookies, no consent banner required)
- Nonprofit event landing page patterns: [Wired Impact — Event Landing Pages](https://wiredimpact.com/blog/event-landing-page-nonprofits-website/) (MEDIUM confidence)
- Best nonprofit website features: [ImageX Media — Best Nonprofit Websites 2026](https://imagexmedia.com/blog/best-nonprofit-website-designs-drive-impact) (MEDIUM confidence)
- Charity website best practices: [GiveSmart — How to Organize Charity Sports Event](https://www.givesmart.com/blog/how-to-organize-a-charity-sports-event/) (MEDIUM confidence)
- Mobile nonprofit performance: [RKD Group — 2025 Nonprofit Website Performance Report](https://info.rkdgroup.com/2025-nonprofit-website-performance-report) (MEDIUM confidence — "67% of nonprofit sites rated poor on mobile")
- SVG map implementation: [SimpleMaps France SVG](https://simplemaps.com/resources/svg-fr), [FreeCodeCamp SVG Map Tutorial](https://www.freecodecamp.org/news/how-to-make-clickable-svg-map-html-css/) (MEDIUM confidence)
- Sponsor logo best practices: [Mod Lab — Logo Grid Best Practices](https://mod-lab.com/resources/make-sure-your-website-sponsor-supporter-logo-grid-looks-good) (LOW confidence — single source, but consistent with general web design standards)

---

*Feature research for: charity sports event one-pager website (Rein Padel Tour 2026)*
*Researched: 2026-02-23*
