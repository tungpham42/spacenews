const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  deg: "°",
  times: "×",
};

// Characters that look like spaces but stop the browser from wrapping lines.
const NON_BREAKING_SPACES = /[   ⁠﻿]/g;

function decodeEntities(input: string): string {
  return input.replace(
    /&(?:#(\d+)|#x([0-9a-f]+)|([a-z][a-z0-9]*));/gi,
    (match, dec?: string, hex?: string, name?: string) => {
      if (dec || hex) {
        const code = dec ? parseInt(dec, 10) : parseInt(hex as string, 16);
        try {
          return String.fromCodePoint(code);
        } catch {
          return match;
        }
      }
      return NAMED_ENTITIES[(name as string).toLowerCase()] ?? match;
    },
  );
}

/**
 * Cleans text from the API so it wraps normally:
 * - decodes HTML entities such as `&nbsp;` and `&amp;` (twice, for double-encoded text)
 * - turns non-breaking and invisible spaces into regular spaces
 * - collapses repeated whitespace and trims the ends
 */
export function cleanText(input: string | null | undefined): string {
  if (!input) return "";
  let text = input;
  for (let pass = 0; pass < 2; pass++) {
    const decoded = decodeEntities(text);
    if (decoded === text) break;
    text = decoded;
  }
  return text.replace(NON_BREAKING_SPACES, " ").replace(/\s+/g, " ").trim();
}
