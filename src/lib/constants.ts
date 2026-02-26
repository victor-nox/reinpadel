/**
 * Structured data constants for Phase 2 section components.
 *
 * All French text is stored as plain strings. Components are responsible
 * for applying French typography rules (Fr component / frenchTypography())
 * at render time — do NOT add non-breaking spaces or guillemet spacing here.
 */

// ---------------------------------------------------------------------------
// TourSection — schedule of all 10 stops (9 cities + 1 rest day)
// Source: srv/txt/ReinPadelTour2026.md section 5.3
// ---------------------------------------------------------------------------

export const TOUR_STOPS = [
  { day: 1, date: '6 mars', city: 'Nancy', club: 'Vidapadel', tag: 'Depart', instagram: 'https://www.instagram.com/vidapadel_/?hl=fr' },
  { day: 2, date: '7 mars', city: 'Reims', club: 'Padel Shot', tag: null, instagram: 'https://www.instagram.com/padel_shot_reims/?hl=fr' },
  { day: 3, date: '8 mars', city: 'Lille', club: '4Padel Lille Seclin', tag: null, instagram: 'https://www.instagram.com/4padel_lilleseclin/?hl=fr' },
  { day: 4, date: '9 mars', city: 'Angers', club: 'Playground Angers', tag: null, instagram: 'https://www.instagram.com/playground_angers/?hl=fr' },
  { day: 5, date: '10 mars', city: 'Bordeaux', club: '4Padel Bordeaux', tag: null, instagram: 'https://www.instagram.com/4padel_bordeaux/?hl=fr' },
  { day: 6, date: '11 mars', city: 'Montpellier', club: 'Tennis Padel Club Castries', tag: null, instagram: 'https://www.instagram.com/tennis_padel_club_castries/?hl=fr' },
  { day: 7, date: '12 mars', city: null, club: null, tag: 'Repos', instagram: null },
  { day: 8, date: '13 mars', city: 'Aix-en-Provence', club: 'WinWin Padel', tag: null, instagram: 'https://www.instagram.com/win.win.padel/?hl=fr' },
  { day: 9, date: '14 mars', city: 'Lyon', club: 'Padel Shot St Genis', tag: null, instagram: 'https://www.instagram.com/padelshot_saint_genis_laval/?hl=fr' },
  { day: 10, date: '15 mars', city: 'Paris', club: '4Padel Boulogne', tag: 'Arrivee', instagram: 'https://www.instagram.com/4padel_boulogne/?hl=fr' },
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
  etapes: 'etapes',
  partenaires: 'partenaires',
} as const
