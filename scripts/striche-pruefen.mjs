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
      let imCode = false;
      let frontmatter = 0;
      readFileSync(voll, "utf8")
        .split("\n")
        .forEach((zeile, i) => {
          // Frontmatter, <script> und <style> sind Code, keine Texte
          if (name.endsWith(".astro")) {
            if (/^---\s*$/.test(zeile) && frontmatter < 2) {
              frontmatter++;
              return;
            }
            if (frontmatter === 1) return;
            if (/<(script|style)\b/.test(zeile) && !/<\/(script|style)>/.test(zeile)) imCode = true;
            if (/<\/(script|style)>/.test(zeile)) {
              imCode = false;
              return;
            }
            if (imCode) return;
          }
          // Kommentare, Code-Ausdrücke in geschweiften Klammern und Vergleiche ignorieren
          if (/===|=>|\.length/.test(zeile)) return;
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
