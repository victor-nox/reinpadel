---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/VideoSection.tsx
  - src/components/sections/PartnersSection.tsx
  - src/app/page.tsx
autonomous: true
requirements: [VIDEO-EMBED, DONATION-LINK]

must_haves:
  truths:
    - "YouTube video is visible between Hero and Tour sections"
    - "Video plays when user clicks it"
    - "Faire un don button is visible next to email contact in Partners section"
    - "Faire un don button opens PayAsso donation page in new tab"
  artifacts:
    - path: "src/components/sections/VideoSection.tsx"
      provides: "YouTube embed section with responsive 16:9 iframe"
      min_lines: 15
    - path: "src/components/sections/PartnersSection.tsx"
      provides: "Updated partners section with donation button"
      contains: "payasso.fr"
    - path: "src/app/page.tsx"
      provides: "Page composition with VideoSection between Hero and Tour"
      contains: "VideoSection"
  key_links:
    - from: "src/app/page.tsx"
      to: "src/components/sections/VideoSection.tsx"
      via: "named import and JSX render"
      pattern: "import.*VideoSection"
    - from: "src/components/sections/PartnersSection.tsx"
      to: "https://www.payasso.fr/rein-padel-tour/don"
      via: "anchor tag href"
      pattern: "payasso\\.fr/rein-padel-tour/don"
---

<objective>
Add a YouTube video embed section and a donation link button to the Rein Padel Tour website.

Purpose: Give visitors an engaging video introduction to the tour and a direct way to donate.
Output: New VideoSection component, updated PartnersSection with donation button, updated page composition.
</objective>

<execution_context>
@/Users/dominikgrob/.claude/get-shit-done/workflows/execute-plan.md
@/Users/dominikgrob/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/page.tsx
@src/components/sections/PartnersSection.tsx
@src/components/ui/SectionWrapper.tsx
@src/lib/typography.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create VideoSection component and add donation button to PartnersSection</name>
  <files>src/components/sections/VideoSection.tsx, src/components/sections/PartnersSection.tsx</files>
  <action>
Create `src/components/sections/VideoSection.tsx` as a Server Component (no 'use client'):
- Named export `VideoSection`
- JSDoc comment describing purpose, layout, and type
- Use `SectionWrapper` with `id="video"` and `className="bg-white"`
- Centered heading: `<h2>` with classes `mb-10 text-center font-display text-3xl font-bold text-brand-navy md:text-4xl` — text "Decouvrez le Rein Padel Tour" wrapped in `<Fr>` component
- Below heading: responsive 16:9 YouTube embed container using `aspect-video` Tailwind class on a wrapper div with `mx-auto max-w-3xl`
- iframe src: `https://www.youtube.com/embed/8Yl50pd5FhI` (embed URL format, NOT watch URL)
- iframe attributes: `title="Decouvrez le Rein Padel Tour"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`, `allowFullScreen`, `className="h-full w-full rounded-xl"`
- Import `SectionWrapper` from `@/components/ui/SectionWrapper` and `Fr` from `@/lib/typography`

Update `src/components/sections/PartnersSection.tsx`:
- Change the CTA div at bottom from single centered button to a flex row: `className="mt-10 flex flex-wrap items-center justify-center gap-4"`
- Keep the existing email anchor tag as-is
- Add a new anchor tag BEFORE the email link for the donation button:
  - `href="https://www.payasso.fr/rein-padel-tour/don"`
  - `target="_blank"` and `rel="noopener noreferrer"`
  - Classes: `rounded-full bg-brand-coral px-5 py-2 text-sm font-display font-semibold text-white transition-colors hover:bg-brand-coral/85`
  - Text content wrapped in Fr: "Faire un don"
  </action>
  <verify>
    <automated>cd /Users/dominikgrob/Desktop/Prv/z_Prv_Public/ReinPadel_web && npm run build 2>&1 | tail -5</automated>
    <manual>Check VideoSection.tsx exists with SectionWrapper, Fr import, YouTube iframe. Check PartnersSection.tsx has donation link with coral styling and payasso URL.</manual>
  </verify>
  <done>VideoSection component renders a responsive YouTube embed. PartnersSection has a coral "Faire un don" button linking to PayAsso alongside the existing email contact button.</done>
</task>

<task type="auto">
  <name>Task 2: Add VideoSection to page composition between Hero and Tour</name>
  <files>src/app/page.tsx</files>
  <action>
Update `src/app/page.tsx`:
- Add import: `import { VideoSection } from '@/components/sections/VideoSection'`
- Insert `<VideoSection />` between `<HeroSection />` and `<TourSection />` inside the `<main>` element

Final section order in main: HeroSection, VideoSection, TourSection, PartnersSection.
  </action>
  <verify>
    <automated>cd /Users/dominikgrob/Desktop/Prv/z_Prv_Public/ReinPadel_web && npm run build 2>&1 | tail -5</automated>
    <manual>Run `npm run dev` and verify VideoSection appears between Hero and Tour at localhost:3000</manual>
  </verify>
  <done>Page renders sections in order: Hero, Video, Tour, Partners, Footer. Build succeeds with no errors.</done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- `npm run lint` passes
- VideoSection.tsx exists with YouTube iframe embed (embed URL format)
- PartnersSection.tsx contains PayAsso donation link with target="_blank"
- page.tsx imports and renders VideoSection between Hero and Tour
</verification>

<success_criteria>
- YouTube video embed visible between Hero and Tour sections with responsive 16:9 aspect ratio
- "Faire un don" coral pill button visible next to email contact in Partners section, linking to PayAsso in new tab
- Production build succeeds
</success_criteria>

<output>
After completion, create `.planning/quick/1-youtube-video-embed-donation-link/1-SUMMARY.md`
</output>
