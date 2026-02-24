/**
 * French typography utilities.
 *
 * French punctuation rules require specific non-breaking space characters
 * before certain punctuation marks to prevent line breaks at those points
 * and conform to Imprimerie nationale typographic standards.
 *
 *   \u202F  (NARROW NO-BREAK SPACE / espace fine insecable) — before ? ! ;
 *   \u00A0  (NO-BREAK SPACE) — before : and inside guillemets « »
 */

/**
 * Applies French punctuation spacing rules to a plain-text string.
 *
 * Handles both cases:
 *   - Existing normal space before punctuation → replaced with correct NBSP
 *   - No space before punctuation → correct NBSP inserted
 *
 * Rules applied (in order):
 *   1. \s*([?!;])  → \u202F$1   (narrow NBSP before ? ! ;)
 *   2. \s*(:)      → \u00A0$1   (regular NBSP before :)
 *   3. «\s*        → «\u00A0    (regular NBSP after opening guillemet)
 *   4. \s*»        → \u00A0»    (regular NBSP before closing guillemet)
 */
export function frenchTypography(text: string): string {
  return text
    .replace(/\s*([?!;])/g, '\u202F$1')
    .replace(/\s*(:)/g, '\u00A0$1')
    .replace(/«\s*/g, '«\u00A0')
    .replace(/\s*»/g, '\u00A0»')
}

/**
 * Thin JSX wrapper that applies French typography to a string child.
 *
 * Usage:
 *   <Fr>{"Bonjour : comment allez-vous ?"}</Fr>
 *
 * Keeps JSX templates clean — no need to call frenchTypography() explicitly.
 */
export function Fr({ children }: { children: string }) {
  return <>{frenchTypography(children)}</>
}
