// Erzeugt public/og.png (1200 × 630) für Vorschauen in sozialen Netzwerken und Messengern.
// Nach Änderung des Markennamens oder der Hero-Texte neu ausführen: npm run og
import { readFileSync } from "node:fs";
import { load } from "js-yaml";
import sharp from "sharp";

const s = load(readFileSync("inhalte/site.yaml", "utf8"));
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const marke = esc(s.marke.name);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fffaf3"/>
  <rect x="0" y="0" width="16" height="630" fill="#c2410c"/>
  <g font-family="Figtree, Helvetica, Arial, sans-serif" fill="#2a1f17">
    <rect x="88" y="84" width="56" height="56" rx="15" fill="#c2410c"/>
    <path d="M103 104a5 5 0 0 1 5-5h14a5 5 0 0 1 5 5v9a5 5 0 0 1-5 5h-8l-6 6v-6a5 5 0 0 1-5-5z" fill="#fff"/>
    <text x="164" y="123" font-size="32" font-weight="600">${marke}</text>
    <text x="88" y="270" font-size="66" font-weight="700" letter-spacing="-1.5">Ihre Gäste bekommen</text>
    <text x="88" y="350" font-size="66" font-weight="700" letter-spacing="-1.5">immer eine Antwort.</text>
    <text x="88" y="440" font-size="34" fill="#67533f">Gästekommunikation für Ferienwohnungen,</text>
    <text x="88" y="488" font-size="34" fill="#67533f">von ${s.service.start_uhr} bis ${s.service.ende_uhr} Uhr. ${s.preise.test_tage} Tage kostenlos testen.</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("public/og.png erstellt");
