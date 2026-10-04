// Sucht Gedankenstriche (–, —) und " - " als Satzzeichen in Inhalten und Vorlagen.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ordner = ["inhalte", "src/components", "src/pages", "src/layouts"];
const muster = /[–—]|(?<=\S) - (?=\S)/;
let treffer = 0;

function durchsuchen(pfad) {
  for (const name of readdirSync(pfad)) {
    const voll = join(pfad, name);
    if (statSync(voll).isDirectory()) durchsuchen(voll);
    else if (/\.(ya?ml|astro|md)$/.test(name)) {
      readFileSync(voll, "utf8")
        .split("\n")
        .forEach((zeile, i) => {
          // Kommentare und Code-Ausdrücke wie "a - b" in geschweiften Klammern ignorieren
          const text = zeile.replace(/^\s*#.*$/, "").replace(/\{[^}]*\}/g, "");
          if (muster.test(text)) {
            treffer++;
            console.log(`${voll}:${i + 1}: ${zeile.trim()}`);
          }
        });
    }
  }
}
ordner.forEach(durchsuchen);
console.log(treffer ? `\n${treffer} Stelle(n) gefunden.` : "Keine Gedankenstriche gefunden.");
process.exit(treffer ? 1 : 0);
