export interface Eingaben {
  objekte: number;
  buchungenProMonat: number;
  buchungswert: number;
  anteilProzent: number;
  preisProBuchung: number;
}

export interface Ergebnis {
  verloreneBuchungenJahr: number;
  verlorenerUmsatzJahr: number;
  kostenJahr: number;
  differenzJahr: number;
  verlorenerUmsatzProObjekt: number;
  kostenProObjekt: number;
}

const sicher = (zahl: number, min = 0) => (Number.isFinite(zahl) ? Math.max(min, zahl) : min);

/** Beispielrechnung, siehe Erklärung "So rechnen wir" auf der Seite. */
export function rechnen(e: Eingaben): Ergebnis {
  const objekte = Math.max(1, Math.round(sicher(e.objekte, 1)));
  const buchungenJahr = sicher(e.buchungenProMonat) * 12;
  const anteil = Math.min(100, sicher(e.anteilProzent)) / 100;
  const verloreneBuchungenJahr = buchungenJahr * anteil;
  const verlorenerUmsatzJahr = verloreneBuchungenJahr * sicher(e.buchungswert);
  const kostenJahr = (buchungenJahr + verloreneBuchungenJahr) * sicher(e.preisProBuchung);
  return {
    verloreneBuchungenJahr,
    verlorenerUmsatzJahr,
    kostenJahr,
    differenzJahr: verlorenerUmsatzJahr - kostenJahr,
    verlorenerUmsatzProObjekt: verlorenerUmsatzJahr / objekte,
    kostenProObjekt: kostenJahr / objekte,
  };
}

const euroFormat = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const zahlFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
export const euro = (betrag: number) => euroFormat.format(Math.round(betrag));
export const zahl = (wert: number) => zahlFormat.format(wert);
