/** Offene Platzhalter in eckigen Klammern, z. B. [VORNAME] oder [ZU KLÄREN: ...]. */
const MUSTER = /\[[A-ZÄÖÜ0-9][^\]\n]{2,}\]/;

export const hatPlatzhalter = (text?: string | null): boolean => !!text && MUSTER.test(text);

/** Text ohne Platzhalter, z. B. für FAQ-Antworten, in denen nur ein Zusatz noch offen ist. */
export const ohnePlatzhalter = (text: string): string =>
  text
    .replace(new RegExp(`\\s*${MUSTER.source}`, "g"), "")
    .replace(/\s+([.,:;!?])/g, "$1")
    .replace(/:\s*$/, "")
    .trim();

/** Text nur, wenn er vollständig ist, sonst leer (damit nichts Halbes auf der Seite steht). */
export const nurFertig = (text?: string | null): string => (text && !hatPlatzhalter(text) ? text : "");
