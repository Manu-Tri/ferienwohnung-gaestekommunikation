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

// Beispiel-Domain zählt auch als offener Platzhalter
const domain = readFileSync("inhalte/site.yaml", "utf8").match(/^\s*domain:\s*"([^"]*)"/m)?.[1] ?? "";
if (/example\.(de|com|org)/.test(domain)) gefunden.set(`domain: ${domain}`, ["inhalte/site.yaml"]);

// "--pruefen" läuft vor jedem Build: Auf Netlify-Produktion (CONTEXT=production) bricht der Build ab,
// solange Platzhalter offen sind. Bewusst trotzdem veröffentlichen: Umgebungsvariable PLATZHALTER_ERLAUBT=true.
if (process.argv.includes("--pruefen")) {
  if (gefunden.size === 0) process.exit(0);
  const streng = process.env.CONTEXT === "production" && process.env.PLATZHALTER_ERLAUBT !== "true";
  if (streng) {
    for (const [platzhalter, orte] of gefunden) console.error(`${platzhalter}\n    ${orte.join("\n    ")}`);
    console.error(`\nBuild abgebrochen: ${gefunden.size} Platzhalter sind noch offen (Liste oben).`);
    console.error("Bitte ausfüllen oder auf Netlify PLATZHALTER_ERLAUBT=true setzen, um trotzdem zu veröffentlichen.");
    process.exit(1);
  }
  console.warn(`Hinweis: ${gefunden.size} Platzhalter offen. Liste: npm run platzhalter`);
  process.exit(0);
}

for (const [platzhalter, orte] of gefunden) console.log(`${platzhalter}\n    ${orte.join("\n    ")}`);
console.log(`\n${gefunden.size} verschiedene Platzhalter offen.`);
