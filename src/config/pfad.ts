/** Interner Link mit Basis-Pfad (nötig für die Vorschau auf GitHub Pages unter /repo-name/). */
const basis = import.meta.env.BASE_URL.replace(/\/$/, "");
export const pfad = (ziel: string) => `${basis}${ziel}`;
/** Pfad der aktuellen Seite ohne Basis, z. B. "/" oder "/mosel/" */
export const ohneBasis = (pathname: string) => pathname.slice(basis.length) || "/";
export const istVorschau = import.meta.env.PUBLIC_VORSCHAU === "true";
