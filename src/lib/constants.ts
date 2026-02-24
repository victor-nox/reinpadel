/**
 * Structured data constants for Phase 2 section components.
 *
 * All French text is stored as plain strings. Components are responsible
 * for applying French typography rules (Fr component / frenchTypography())
 * at render time — do NOT add non-breaking spaces or guillemet spacing here.
 */

// ---------------------------------------------------------------------------
// MissionSection — key figures for the tour
// Source: CONTEXT.md overrides REQUIREMENTS.md; uses 9 villes, ~3 000 km, 10 jours
// ---------------------------------------------------------------------------

export const FACT_NUMBERS = [
  { value: '9', label: 'villes traversees' },
  { value: '10', label: 'jours de defi' },
  { value: '~3 000', label: 'km de route' },
] as const

// ---------------------------------------------------------------------------
// TourSection — schedule of all 10 stops (9 cities + 1 rest day)
// Source: srv/txt/ReinPadelTour2026.md section 5.3
// ---------------------------------------------------------------------------

export const TOUR_STOPS = [
  { day: 1, date: '6 mars', city: 'Nancy', club: 'Vidapadel', tag: 'Depart' },
  { day: 2, date: '7 mars', city: 'Reims', club: 'Padel Shot', tag: null },
  { day: 3, date: '8 mars', city: 'Lille', club: '4Padel Lille Seclin', tag: null },
  { day: 4, date: '9 mars', city: 'Angers', club: 'Playground Angers', tag: null },
  { day: 5, date: '10 mars', city: 'Bordeaux', club: '4Padel Bordeaux', tag: null },
  { day: 6, date: '11 mars', city: 'Montpellier', club: 'Tennis Padel Club Castries', tag: null },
  { day: 7, date: '12 mars', city: null, club: null, tag: 'Repos' },
  { day: 8, date: '13 mars', city: 'Aix-en-Provence', club: 'WinWin Padel', tag: null },
  { day: 9, date: '14 mars', city: 'Lyon', club: 'Padel Shot St Genis', tag: null },
  { day: 10, date: '15 mars', city: 'Paris', club: '4Padel Boulogne', tag: 'Arrivee' },
] as const

// ---------------------------------------------------------------------------
// DiseaseSection — verified French medical statistics (IgA nephropathy)
// Source: content doc section 3.3, citing AIRG-France / Orphanet / Filiere ORKiD
// ---------------------------------------------------------------------------

export const DISEASE_STATS = [
  { value: '~670 000', label: 'personnes touchees en France' },
  { value: '30%', label: 'evoluent vers la dialyse en 20 ans' },
  { value: '0', label: 'traitement curatif disponible' },
] as const

// ---------------------------------------------------------------------------
// ParticipationSection — 3 call-to-action cards
// Source: srv/txt/ReinPadelTour2026.md sections 8.2 and 8.3, condensed
// ---------------------------------------------------------------------------

export const PARTICIPATION_CARDS = [
  {
    icon: 'paddle' as const,
    title: 'Jouez',
    description:
      "Rejoignez-nous sur une etape. Chaque joueur sur le terrain, c'est un pas contre le silence.",
    cta: "S'inscrire",
    variant: 'blue' as const,
    href: '#',
  },
  {
    icon: 'heart' as const,
    title: 'Donnez',
    description:
      'Soutenez la recherche contre la maladie de Berger. 100% des dons vont a la recherche.',
    cta: 'Faire un don',
    variant: 'red' as const,
    href: '#',
  },
  {
    icon: 'handshake' as const,
    title: 'Devenez Partenaire',
    description:
      "Vous representez une marque ou une association ? Rejoignez l'aventure.",
    cta: 'Nous contacter',
    variant: 'outline' as const,
    href: '#',
  },
] as const

// ---------------------------------------------------------------------------
// PartnersSection — 19 partner logos from public/
// PRTN-04: data sourced from constants, not inline in component
// ---------------------------------------------------------------------------

export const PARTNERS = Array.from({ length: 19 }, (_, i) => ({
  id: i + 1,
  src: `/partner_logo_${i + 1}.png`,
  alt: `Partenaire ${i + 1}`,
}))

// ---------------------------------------------------------------------------
// Section IDs — single source of truth for anchor hrefs and id attributes
// ---------------------------------------------------------------------------

export const SECTION_IDS = {
  hero: 'hero',
  mission: 'mission',
  etapes: 'etapes',
  maladie: 'maladie',
  participer: 'participer',
  partenaires: 'partenaires',
} as const
