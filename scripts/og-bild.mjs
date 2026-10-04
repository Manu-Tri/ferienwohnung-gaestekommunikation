// Erzeugt public/og.png (1200 × 630) für Vorschauen in sozialen Netzwerken und Messengern.
// Nach Änderung des Markennamens oder der Hero-Texte neu ausführen: npm run og
import { readFileSync } from "node:fs";
import { load } from "js-yaml";
import sharp from "sharp";

const s = load(readFileSync("inhalte/site.yaml", "utf8"));
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const marke = esc(s.marke.name);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="schein" cx="0.92" cy="0" r="0.75">
      <stop offset="0" stop-color="#c8efd2"/>
      <stop offset="1" stop-color="#fffdf7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#fbfdf9"/>
  <rect width="1200" height="630" fill="url(#schein)"/>
  <g font-family="Figtree, Helvetica, Arial, sans-serif" fill="#17201b">
    <svg x="88" y="78" width="64" height="64" viewBox="0 0 32 32">
      <path fill="#109c4c" d="M10 2.5h12A8 8 0 0 1 30 10.5v6a8 8 0 0 1-8 8h-8.6l-6.1 4.9c-.8.6-1.8.1-1.8-.9v-4.6A8 8 0 0 1 2 16.5v-6a8 8 0 0 1 8-8z"/>
      <path d="M9.3 13.9l2 2 4.4-4.8M16.3 13.9l2 2 4.4-4.8" fill="none" stroke="#ffffff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <text x="166" y="126" font-size="44" font-weight="800" letter-spacing="-2">${marke.toLowerCase()}</text>
    <text x="88" y="285" font-size="70" font-weight="800" letter-spacing="-2">Ihre Gäste bekommen</text>
    <text x="88" y="370" font-size="70" font-weight="800" letter-spacing="-2">immer eine Antwort.</text>
    <rect x="88" y="420" width="120" height="8" rx="4" fill="#1fc45f"/>
    <text x="88" y="495" font-size="34" fill="#55605a">Gästekommunikation für Ferienwohnungen. ${s.preise.test_tage} Tage kostenlos testen.</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("public/og.png erstellt");
