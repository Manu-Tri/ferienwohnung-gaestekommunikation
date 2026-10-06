/**
 * Erzeugt die Postkarte für Weingüter als druckfertiges PDF (A6 quer, 2 mm Beschnitt rundum).
 * Texte: inhalte/postkarte-weingut.yaml, Kontakt und Preise: inhalte/site.yaml.
 *
 *   npm run postkarte
 *     -> vorlagen/postkarte-weingut.pdf    (Seite 1 vorne, Seite 2 hinten)
 *     -> vorlagen/postkarte-weingut-vorne.png / -hinten.png  (Vorschau)
 *
 * Braucht Google Chrome (wird headless zum Drucken benutzt).
 */
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { load } from "js-yaml";
import QRCode from "qrcode";

const wurzel = process.cwd();
const site = load(readFileSync(join(wurzel, "inhalte/site.yaml"), "utf8"));
const k = load(readFileSync(join(wurzel, "inhalte/postkarte-weingut.yaml"), "utf8"));

const werte = {
  preis: site.preise.pro_buchung,
  test_tage: site.preise.test_tage,
  start: site.service.start_uhr,
  ende: site.service.ende_uhr,
  antwortzeit: site.service.antwortzeit_minuten,
  check_stunden: site.lead_magnet.check_stunden,
  verbesserungen: site.lead_magnet.verbesserungen,
  email: site.marke.email,
  telefon: site.marke.telefon,
  ort: site.marke.ort,
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const t = (s) => esc(String(s).replace(/\{(\w+)\}/g, (_, n) => werte[n] ?? `{${n}}`));

const checkUrl = `${site.marke.domain}/inserats-check?quelle=${k.quelle}`;
const qr = await QRCode.toString(checkUrl, { type: "svg", margin: 0, color: { dark: "#18261c", light: "#00000000" } });
const urlKurz = `${site.marke.domain.replace(/^https?:\/\//, "")}/inserats-check`;

const font = (paket, datei) => pathToFileURL(join(wurzel, "node_modules", paket, "files", datei)).href;
const logo = (blase = "#2f7a4a", haken = "#fff") =>
  `<svg viewBox="0 0 32 32" class="logo"><path d="M9 1h14a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H3a2 2 0 0 1-2-2V9a8 8 0 0 1 8-8z" fill="${blase}"/><path d="M7.6 16.6l3.7 3.7 7.9-8.5M15.4 19.3l1 1 7.9-8.5" fill="none" stroke="${haken}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Abendlicher Weinberg: Hügel mit Rebzeilen, Mond
const weinberg = `
<svg class="weinberg" viewBox="0 0 600 220" preserveAspectRatio="xMidYMax slice">
  <circle cx="500" cy="52" r="20" fill="#f7d79a"/>
  <circle cx="509" cy="46" r="18" fill="#18261c"/>
  <path d="M0 150 C120 70 230 60 340 110 C430 150 520 120 600 95 L600 220 L0 220 Z" fill="#20372a"/>
  <path d="M0 185 C140 120 260 125 380 160 C470 185 540 170 600 155 L600 220 L0 220 Z" fill="#2f7a4a" opacity=".55"/>
  <g stroke="#8fd3a5" stroke-width="2" stroke-linecap="round" opacity=".45" fill="none">
    ${Array.from({ length: 14 }, (_, i) => {
      const x = 20 + i * 24;
      return `<path d="M${x} ${150 - Math.sin(i / 3) * 30 + 35} l${18 + i} -${50 - i * 2}" />`;
    }).join("")}
  </g>
</svg>`;

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>
@font-face { font-family: "Bricolage"; font-weight: 800; src: url(${font("@fontsource/bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff2")}); }
@font-face { font-family: "Figtree"; font-weight: 400; src: url(${font("@fontsource/figtree", "figtree-latin-400-normal.woff2")}); }
@font-face { font-family: "Figtree"; font-weight: 600; src: url(${font("@fontsource/figtree", "figtree-latin-600-normal.woff2")}); }
@font-face { font-family: "Figtree"; font-weight: 700; src: url(${font("@fontsource/figtree", "figtree-latin-700-normal.woff2")}); }
@font-face { font-family: "Caveat"; font-weight: 600; src: url(${font("@fontsource/caveat", "caveat-latin-600-normal.woff2")}); }
@page { size: 152mm 109mm; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Figtree", sans-serif; color: #18261c; }
/* Seite = Endformat 148 x 105 mm plus 2 mm Beschnitt; Inhalt hält 6 mm Abstand zum Schnitt */
.seite { width: 152mm; height: 109mm; position: relative; overflow: hidden; page-break-after: always; }
.innen { position: absolute; inset: 8mm; }
.logo { width: 5.2mm; height: 5.2mm; flex: none; }
.marke { display: flex; align-items: center; gap: 1.6mm; font-family: "Bricolage"; font-size: 11pt; letter-spacing: -.01em; }

/* Vorderseite */
.vorne { background: #18261c; color: #f3ede1; }
.weinberg { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: 52mm; }
.vorne .innen { display: grid; grid-template-columns: 1fr 58mm; gap: 6mm; }
.vorne .links { display: flex; flex-direction: column; }
.ziel { margin-top: 5mm; font-size: 7.5pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #8fd3a5; }
h1 { margin-top: 2mm; font-family: "Bricolage"; font-weight: 800; font-size: 19.5pt; line-height: 1.04; letter-spacing: -.02em; }
.chat { align-self: center; display: flex; flex-direction: column; gap: 2mm; margin-top: 2mm; }
.uhr { font-family: "Caveat"; font-size: 13pt; color: #f7d79a; transform: rotate(-3deg); margin-bottom: .5mm; }
.blase { font-size: 7.6pt; line-height: 1.32; padding: 2.4mm 3mm; border-radius: 3.2mm; }
.gast { background: #f3ede1; color: #18261c; border-bottom-left-radius: .8mm; margin-right: 6mm; }
.wir { background: #2f7a4a; color: #fff; border-bottom-right-radius: .8mm; margin-left: 6mm; }
.wir small { display: flex; align-items: center; justify-content: flex-end; gap: 1mm; margin-top: 1mm; font-size: 6pt; color: #dcebdc; }
.wir small svg { width: 3mm; height: 3mm; }

/* Rückseite */
.hinten { background: #f3ede1; }
.hinten .innen { display: grid; grid-template-columns: 1fr 52mm; gap: 0; }
.text { padding-right: 5mm; border-right: .3mm solid #c9bda4; display: flex; flex-direction: column; font-size: 7.4pt; line-height: 1.38; }
.text p + p { margin-top: 1.6mm; }
.anrede { margin-bottom: 1.2mm; }
.angebot { margin-top: 2.6mm; padding: 2.2mm 2.6mm; background: #fff; border-radius: 2mm; display: grid; grid-template-columns: 1fr 15mm; gap: 2.4mm; align-items: center; }
.angebot b { display: block; color: #24633b; }
.angebot .qr svg { width: 15mm; height: 15mm; display: block; }
.angebot .url { font-size: 6pt; color: #3f4a42; margin-top: .8mm; }
.fakten { margin-top: 2.2mm; font-size: 6.6pt; font-weight: 600; color: #24633b; }
.gruss { margin-top: auto; display: flex; align-items: flex-end; justify-content: space-between; }
.unterschrift { font-family: "Caveat"; font-size: 13pt; line-height: 1; color: #18261c; }
.unterschrift span { display: block; font-size: 11pt; color: #3f4a42; }
.adresse { padding-left: 5mm; display: flex; flex-direction: column; }
.marke-box { display: flex; justify-content: space-between; align-items: flex-start; }
.briefmarke { width: 19mm; height: 23mm; border: .3mm dashed #9a8e74; border-radius: 1mm; display: grid; place-items: center; text-align: center; font-size: 5.5pt; color: #3f4a42; padding: 1mm; }
.kontakt { font-size: 6.4pt; line-height: 1.45; color: #3f4a42; margin-top: 1.6mm; }
.zeilen { margin-top: auto; }
.zeilen div { height: 7.5mm; border-bottom: .3mm solid #9a8e74; }
</style></head><body>

<section class="seite vorne">
  ${weinberg}
  <div class="innen">
    <div class="links">
      <div class="marke">${logo()}anytime</div>
      <p class="ziel">${t(k.vorne.zielgruppe)}</p>
      <h1>${t(k.vorne.titel)}</h1>
    </div>
    <div class="chat">
      <p class="uhr">${t(k.vorne.uhrzeit)}</p>
      <p class="blase gast">${t(k.vorne.gast)}</p>
      <p class="blase wir">${t(k.vorne.antwort)}<small>${logo("#dcebdc", "#2f7a4a")}anytime, 18:53</small></p>
    </div>
  </div>
</section>

<section class="seite hinten">
  <div class="innen">
    <div class="text">
      <p class="anrede">${t(k.hinten.anrede)}</p>
      ${k.hinten.text.map((p) => `<p>${t(p)}</p>`).join("")}
      <div class="angebot">
        <div><b>${t(k.hinten.angebot_titel)}</b>${t(k.hinten.angebot)}<div class="url">${esc(urlKurz)}</div></div>
        <div class="qr">${qr}</div>
      </div>
      <p class="fakten">${t(k.hinten.fakten)}</p>
      <div class="gruss">
        <p class="unterschrift"><span>${t(k.hinten.gruss)}</span>${t(k.hinten.name)}</p>
      </div>
    </div>
    <div class="adresse">
      <div class="marke-box">
        <div>
          <div class="marke">${logo()}anytime</div>
          <p class="kontakt">${t(werte.telefon)}<br>${t(werte.email)}<br>${t(werte.ort)}</p>
        </div>
        <div class="briefmarke">${t(k.hinten.briefmarke)}</div>
      </div>
      <div class="zeilen"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</section>
</body></html>`;

const chrome = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const tmp = mkdtempSync(join(tmpdir(), "postkarte-"));
const htmlDatei = join(tmp, "postkarte.html");
writeFileSync(htmlDatei, html);
const ziel = resolve(wurzel, "vorlagen/postkarte-weingut.pdf");
const chromeArgs = ["--headless=new", "--disable-gpu", "--no-first-run", "--allow-file-access-from-files", `--user-data-dir=${join(tmp, "profil")}`];

/** Chrome beendet sich headless nicht immer von selbst: warten, bis die Datei fertig ist, dann schließen. */
async function chromeBis(datei, args) {
  rmSync(datei, { force: true });
  const p = spawn(chrome, [...chromeArgs, ...args], { stdio: "ignore" });
  for (let i = 0; i < 300; i++) {
    await new Promise((r) => setTimeout(r, 100));
    if (existsSync(datei) && statSync(datei).size > 0) {
      await new Promise((r) => setTimeout(r, 500));
      break;
    }
  }
  p.kill();
  if (!existsSync(datei)) throw new Error(`Chrome hat ${datei} nicht erzeugt`);
}

await chromeBis(ziel, ["--no-pdf-header-footer", `--print-to-pdf=${ziel}`, pathToFileURL(htmlDatei).href]);

// Vorschaubilder: jede Seite einzeln rendern (152 x 109 mm bei 150 dpi)
for (const [i, name] of ["vorne", "hinten"].entries()) {
  const einzeln = join(tmp, `${name}.html`);
  writeFileSync(einzeln, html.replace("<body>", `<body><style>.seite:nth-of-type(${2 - i}){display:none}</style>`));
  const bild = resolve(wurzel, `vorlagen/postkarte-weingut-${name}.png`);
  await chromeBis(bild, ["--hide-scrollbars", "--force-device-scale-factor=1.5625", "--window-size=575,412", `--screenshot=${bild}`, pathToFileURL(einzeln).href]);
}
await new Promise((r) => setTimeout(r, 300));
try { rmSync(tmp, { recursive: true, force: true, maxRetries: 5 }); } catch {}
console.log(`Postkarte erzeugt: ${ziel}\nQR-Code führt zu: ${checkUrl}`);
