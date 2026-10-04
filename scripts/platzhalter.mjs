// Listet alle offenen Platzhalter in eckigen Klammern auf, z. B. [MARKENNAME].
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ordner = ["inhalte", "src/pages"];
const muster = /\[(?![\d.]+(?:rem|px|em|%|fr_)[^\]]*\])[A-ZÄÖÜ0-9][^\]\n]{2,}\]/g;
const gefunden = new Map();

function durchsuchen(pfad) {
  for (const name of readdirSync(pfad)) {
    const voll = join(pfad, name);
    if (statSync(voll).isDirectory()) durchsuchen(voll);
    else if (/\.(ya?ml|astro)$/.test(name)) {
      readFileSync(voll, "utf8")
        .split("\n")
        .forEach((zeile, i) => {
          if (/^\s*#/.test(zeile)) return;
          for (const t of zeile.matchAll(muster)) {
            if (/^\[(region|\.\.\.)\]/.test(t[0])) continue;
            const liste = gefunden.get(t[0]) ?? [];
            liste.push(`${voll}:${i + 1}`);
            gefunden.set(t[0], liste);
          }
        });
    }
  }
}
ordner.forEach(durchsuchen);
for (const [platzhalter, orte] of gefunden) console.log(`${platzhalter}\n    ${orte.join("\n    ")}`);
console.log(`\n${gefunden.size} verschiedene Platzhalter offen.`);
