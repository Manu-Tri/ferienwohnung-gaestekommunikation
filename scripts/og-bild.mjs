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
    <svg x="88" y="84" width="56" height="56" viewBox="0 0 32 32">
      <path fill="#c2410c" fill-rule="evenodd" d="M2 13c0-2.2 1.5-3.2 3-4l8.6-4.1q2.4-1.1 4.8 0L27 9c1.5.8 3 1.8 3 4v4a7 7 0 0 1-7 7h-7c-2.5 0-6 3.6-11 6.8q-.7.3-.4-.4C7.6 28 9 26.2 9 24a7 7 0 0 1-7-7zM9.5 15a2 2 0 0 1 4 0v6.5h-4zM18 12h3v3h-3zM22 12h3v3h-3zM18 16h3v3h-3zM22 16h3v3h-3z"/>
    </svg>
    <text x="164" y="123" font-size="32" font-weight="600">${marke}</text>
    <text x="88" y="270" font-size="66" font-weight="700" letter-spacing="-1.5">Ihre Gäste bekommen</text>
    <text x="88" y="350" font-size="66" font-weight="700" letter-spacing="-1.5">immer eine Antwort.</text>
    <text x="88" y="440" font-size="34" fill="#67533f">Gästekommunikation für Ferienwohnungen,</text>
    <text x="88" y="488" font-size="34" fill="#67533f">von ${s.service.start_uhr} bis ${s.service.ende_uhr} Uhr. ${s.preise.test_tage} Tage kostenlos testen.</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("public/og.png erstellt");
