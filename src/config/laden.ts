import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { load } from "js-yaml";
import { z } from "zod";
import { regionSchema, siteSchema, type Region, type Site } from "./schema";

const ORDNER = join(process.cwd(), "inhalte");
const RESERVIERT = new Set(["inserats-check", "danke", "impressum", "datenschutz", "404", "robots.txt"]);

function lesen(datei: string): unknown {
  try {
    return load(readFileSync(datei, "utf8"));
  } catch (fehler) {
    throw new Error(`Die Datei ${datei} ist kein gültiges YAML:\n${(fehler as Error).message}`);
  }
}

function pruefen<T>(schema: z.ZodType<T>, daten: unknown, datei: string): T {
  const ergebnis = schema.safeParse(daten);
  if (!ergebnis.success) {
    const zeilen = ergebnis.error.issues.map((i) => `  • ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Fehler in ${datei}:\n${zeilen}`);
  }
  return ergebnis.data;
}

/** Ersetzt {variablen} in allen Texten und setzt ein geschütztes Leerzeichen vor €. */
function ersetzen<T>(wert: T, werte: Record<string, string | number>): T {
  if (typeof wert === "string") {
    return wert
      .replace(/\{(\w+)\}/g, (treffer, name: string) => (name in werte ? String(werte[name]) : treffer))
      .replace(/(\d) €/g, "$1 €") as T;
  }
  if (Array.isArray(wert)) return wert.map((w) => ersetzen(w, werte)) as T;
  if (wert && typeof wert === "object") {
    return Object.fromEntries(Object.entries(wert).map(([k, v]) => [k, ersetzen(v, werte)])) as T;
  }
  return wert;
}

function variablen(roh: Site): Record<string, string | number> {
  const gp = roh.preise.gruenderpreis;
  return {
    marke: roh.marke.name,
    preis: roh.preise.pro_buchung,
    start: roh.service.start_uhr,
    ende: roh.service.ende_uhr,
    antwortzeit: roh.service.antwortzeit_minuten,
    antwort_frist: roh.service.antwort_frist,
    test_tage: roh.preise.test_tage,
    gp_preis: gp.pro_buchung,
    gp_monate: gp.monate,
    gp_plaetze: gp.plaetze_gesamt,
    erinnerung: gp.erinnerung_vorher,
    check_stunden: roh.lead_magnet.check_stunden,
    verbesserungen: roh.lead_magnet.verbesserungen,
    region: roh.marke.region,
    email: roh.marke.email,
    anbieter: roh.links.buchungsanbieter,
  };
}

const roh = pruefen(siteSchema, lesen(join(ORDNER, "site.yaml")), "inhalte/site.yaml");
const werte = variablen(roh);

export const site: Site = ersetzen(roh, werte);

export const regionen: Region[] = readdirSync(join(ORDNER, "regionen"))
  .filter((datei) => /\.ya?ml$/.test(datei))
  .map((datei) => {
    const slug = datei.replace(/\.ya?ml$/, "");
    if (!/^[a-z0-9-]+$/.test(slug)) {
      throw new Error(`Dateiname inhalte/regionen/${datei}: bitte nur Kleinbuchstaben, Zahlen und Bindestriche.`);
    }
    if (RESERVIERT.has(slug)) throw new Error(`Der Name "${slug}" ist bereits eine feste Seite.`);
    const region = pruefen(regionSchema, lesen(join(ORDNER, "regionen", datei)), `inhalte/regionen/${datei}`);
    const regionWerte = { ...werte, region: region.name, im_satz: region.im_satz };
    return { ...ersetzen(region, regionWerte), slug };
  });

/** Euro-Betrag ohne Nachkommastellen, wenn ganzzahlig. */
export function euro(betrag: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: Number.isInteger(betrag) ? 0 : 2,
  }).format(betrag);
}
