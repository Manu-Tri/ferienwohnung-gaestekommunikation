/**
 * Erzeugt die Infomappe als PDF (Leistungen, Ablauf, Preis und ausfüllbarer Wohnungs-Steckbrief)
 * sowie die passende E-Mail-Vorlage. Alle Texte kommen aus inhalte/site.yaml.
 *
 *   npm run infomappe
 *     -> public/<infomappe.datei>          (auch auf der Website abrufbar)
 *     -> vorlagen/email-infomappe.txt      (Betreff und Text zum Kopieren)
 *
 * Läuft auch automatisch vor jedem Build, damit PDF und Website immer zusammenpassen.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFArray, PDFDocument, PDFFont, PDFName, PDFPage, PDFString, StandardFonts, rgb, type RGB } from "pdf-lib";
import QRCode from "qrcode";
import { decompress } from "wawoff2";
import { site } from "../src/config/laden";

// ---------------------------------------------------------------------------
// Farben wie in src/styles/global.css
const hex = (h: string): RGB => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const F = {
  flaeche: hex("#f3ede1"),
  sand: hex("#e2d6bf"),
  tinte: hex("#18261c"),
  aufTinte: hex("#f3ede1"),
  aufTinteLeise: hex("#d9d2c3"),
  leise: hex("#3f4a42"),
  akzent: hex("#2f7a4a"),
  akzentText: hex("#24633b"),
  mint: hex("#8fd3a5"),
  gold: hex("#f7d79a"),
  rand: hex("#9a8e74"),
  rahmen: hex("#d9cfbb"),
  weiss: rgb(1, 1, 1),
};

// A4 in Punkt
const B = 595.28;
const H = 841.89;
const RAND = 48;
const INNEN = B - 2 * RAND;

// ---------------------------------------------------------------------------
async function schrift(pdf: PDFDocument, paket: string, datei: string): Promise<PDFFont> {
  const woff2 = readFileSync(join(process.cwd(), "node_modules", paket, "files", datei));
  return pdf.embedFont(await decompress(woff2), { subset: true });
}

/** Text in Zeilen umbrechen, die in die angegebene Breite passen. */
function umbrechen(text: string, font: PDFFont, groesse: number, breite: number): string[] {
  const zeilen: string[] = [];
  for (const absatz of text.split("\n")) {
    let zeile = "";
    for (const wort of absatz.split(/\s+/).filter(Boolean)) {
      const probe = zeile ? `${zeile} ${wort}` : wort;
      if (font.widthOfTextAtSize(probe, groesse) <= breite || !zeile) zeile = probe;
      else {
        zeilen.push(zeile);
        zeile = wort;
      }
    }
    zeilen.push(zeile);
  }
  return zeilen;
}

/** Klickbarer Link über einem Rechteck */
function link(page: PDFPage, url: string, x: number, y: number, w: number, h: number) {
  const ctx = page.doc.context;
  const annot = ctx.register(
    ctx.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [x, y, x + w, y + h],
      Border: [0, 0, 0],
      A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
    }),
  );
  let annots = page.node.lookup(PDFName.of("Annots"));
  if (!(annots instanceof PDFArray)) {
    annots = ctx.obj([]);
    page.node.set(PDFName.of("Annots"), annots);
  }
  (annots as PDFArray).push(annot);
}

/** Häkchen als Vektor (die Schriften enthalten kein ✓). y ist die Oberkante. */
function haken(page: PDFPage, x: number, y: number, s: number, farbe: RGB, dicke = 1.6) {
  page.drawSvgPath(`M0 ${s * 0.5} L${s * 0.38} ${s * 0.88} L${s} ${s * 0.12}`, {
    x,
    y,
    borderColor: farbe,
    borderWidth: dicke,
    borderLineCap: 1,
  });
}

/** Bildmarke: Sprechblase mit Doppelhäkchen, wie LogoZeichen.astro */
function logo(page: PDFPage, x: number, y: number, s: number) {
  const k = s / 32;
  page.drawSvgPath("M9 1h14a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8H3a2 2 0 0 1-2-2V9a8 8 0 0 1 8-8z", { x, y: y + s, scale: k, color: F.akzent });
  page.drawSvgPath("M7.6 16.6l3.7 3.7 7.9-8.5M15.4 19.3l1 1 7.9-8.5", {
    x,
    y: y + s,
    scale: k,
    borderColor: F.weiss,
    borderWidth: 2.5,
    borderLineCap: 1,
  });
}

// ---------------------------------------------------------------------------
async function erzeugen() {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`${site.marke.name}: ${site.infomappe.untertitel}`);
  pdf.setAuthor(site.marke.name);
  pdf.setLanguage("de-DE");
  pdf.setCreator(site.marke.name);

  const text = await schrift(pdf, "@fontsource/figtree", "figtree-latin-400-normal.woff2");
  const fett = await schrift(pdf, "@fontsource/figtree", "figtree-latin-700-normal.woff2");
  const titel = await schrift(pdf, "@fontsource/bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff2");
  const titel7 = await schrift(pdf, "@fontsource/bricolage-grotesque", "bricolage-grotesque-latin-700-normal.woff2");
  const hand = await schrift(pdf, "@fontsource/caveat", "caveat-latin-600-normal.woff2");
  // Für Formularfelder eine Standardschrift: Eingaben der Leser enthalten beliebige Zeichen
  const feldschrift = await pdf.embedFont(StandardFonts.Helvetica);

  const m = site.infomappe;
  const steckbriefUrl = `${site.marke.domain}/steckbrief`;
  const qr = await pdf.embedPng(
    await QRCode.toBuffer(steckbriefUrl, { type: "png", margin: 1, width: 300, color: { dark: "#18261cff", light: "#ffffffff" } }),
  );

  let page = pdf.addPage([B, H]);
  let y = H;

  /** Absatz schreiben; gibt die neue y-Position zurück */
  const absatz = (
    p: PDFPage,
    inhalt: string,
    opt: { x?: number; y: number; breite?: number; font?: PDFFont; groesse?: number; farbe?: RGB; zeilenhoehe?: number },
  ) => {
    const font = opt.font ?? text;
    const groesse = opt.groesse ?? 10.5;
    const zh = opt.zeilenhoehe ?? groesse * 1.45;
    let yy = opt.y;
    for (const zeile of umbrechen(inhalt, font, groesse, opt.breite ?? INNEN)) {
      yy -= zh;
      p.drawText(zeile, { x: opt.x ?? RAND, y: yy + (zh - groesse) / 2, size: groesse, font, color: opt.farbe ?? F.tinte });
    }
    return yy;
  };

  /** Überschrift mit grün hervorgehobenem zweiten Satz */
  const ueberschrift = (p: PDFPage, inhalt: string, yy: number, groesse: number, farbe = F.tinte, betont = F.akzent) => {
    const trenner = inhalt.indexOf(". ");
    const teile = trenner > 0 ? [inhalt.slice(0, trenner + 1), inhalt.slice(trenner + 2)] : [inhalt];
    teile.forEach((teil, i) => {
      yy = absatz(p, teil, { y: yy, font: titel, groesse, farbe: i === 1 ? betont : farbe, zeilenhoehe: groesse * 1.02 });
    });
    return yy;
  };

  const hintergrund = (p: PDFPage) => p.drawRectangle({ x: 0, y: 0, width: B, height: H, color: F.flaeche });

  const fusszeile = (p: PDFPage, nr: number) => {
    p.drawText(`${site.marke.name.toLowerCase()} · ${site.marke.email} · ${site.marke.telefon}`, {
      x: RAND,
      y: 24,
      size: 8,
      font: text,
      color: F.leise,
    });
    const seite = `Seite ${nr}`;
    p.drawText(seite, { x: B - RAND - text.widthOfTextAtSize(seite, 8), y: 24, size: 8, font: text, color: F.leise });
  };

  // ===========================================================================
  // Seite 1: Titel, Einleitung, Gästereise, Preis
  hintergrund(page);
  logo(page, RAND, H - 74, 26);
  page.drawText(site.marke.name.toLowerCase(), { x: RAND + 34, y: H - 66, size: 19, font: titel, color: F.tinte });

  y = H - 104;
  y = ueberschrift(page, m.titel, y, 34);
  y = absatz(page, m.untertitel, { y: y - 10, font: fett, groesse: 13, farbe: F.akzentText });
  y = absatz(page, m.einleitung, { y: y - 8, groesse: 11.5, farbe: F.leise, breite: INNEN - 40 });

  // Gästereise in drei Spalten
  const g = site.gaestereise;
  y -= 30;
  page.drawText(m.leistungen_titel, { x: RAND, y, size: 17, font: titel7, color: F.tinte });
  y -= 18;
  const spalte = (INNEN - 2 * 16) / 3;
  let tiefste = y;
  g.phasen.forEach((phase, i) => {
    const x = RAND + i * (spalte + 16);
    page.drawRectangle({ x, y: y - 3, width: spalte, height: 2.5, color: F.tinte });
    page.drawText(String(i + 1), { x, y: y - 36, size: 30, font: titel, color: F.akzent });
    let yy = absatz(page, phase.titel, { x: x + 26, y: y - 10, breite: spalte - 26, font: titel7, groesse: 12.5, zeilenhoehe: 15 });
    yy = Math.min(yy, y - 42) - 6;
    for (const punkt of phase.punkte) {
      haken(page, x, yy - 3.5, 7, F.akzentText);
      yy = absatz(page, punkt, { x: x + 12, y: yy, breite: spalte - 12, groesse: 9.5, farbe: F.leise, zeilenhoehe: 13 }) - 4;
    }
    tiefste = Math.min(tiefste, yy);
  });

  // Wie wir arbeiten (mit offenem Hinweis auf den KI-Einsatz, wie auf der Website)
  y = tiefste - 18;
  const p2 = site.persoenlich;
  if (p2.kicker) page.drawText(p2.kicker, { x: RAND, y: y - 4, size: 17, font: hand, color: F.akzentText });
  y = ueberschrift(page, p2.titel, y - 8, 20);
  y = absatz(page, p2.einleitung, { y: y - 6, groesse: 10.5, farbe: F.leise });
  // Themen, die persönlich bearbeitet werden
  y -= 12;
  let tx = RAND;
  for (const thema of p2.themen) {
    const w = fett.widthOfTextAtSize(thema, 10) + 22;
    page.drawRectangle({ x: tx, y: y - 22, width: w, height: 22, color: F.sand });
    page.drawText(thema, { x: tx + 11, y: y - 15, size: 10, font: fett, color: F.tinte });
    tx += w + 8;
  }
  y -= 22;
  if (p2.themen_hinweis) y = absatz(page, p2.themen_hinweis, { y: y - 2, groesse: 9.5, font: fett, farbe: F.leise });


  // Preisband unten
  const band = 122;
  if (y < band + 16) throw new Error(`Seite 1 ist zu voll (${Math.round(band + 16 - y)} pt zu viel). Texte in infomappe oder persoenlich kürzen.`);
  page.drawRectangle({ x: 0, y: 0, width: B, height: band, color: F.akzent });
  page.drawText(m.preis_titel, { x: RAND, y: band - 30, size: 16, font: hand, color: F.gold });
  const preis = `${site.preise.pro_buchung} €`;
  page.drawText(preis, { x: RAND, y: band - 76, size: 46, font: titel, color: F.weiss });
  absatz(page, m.preis_zeile, {
    x: RAND + titel.widthOfTextAtSize(preis, 46) + 18,
    y: band - 42,
    breite: INNEN - titel.widthOfTextAtSize(preis, 46) - 18,
    font: fett,
    groesse: 12.5,
    farbe: F.weiss,
  });
  page.drawText(site.preise_abschnitt.steuer, { x: RAND, y: 20, size: 8, font: text, color: hex("#e3f2e7") });

  // ===========================================================================
  // Seite 2: Wie wir arbeiten, Leistungen, Ablauf, Kontakt
  page = pdf.addPage([B, H]);
  hintergrund(page);
  y = H - 40;
  // Leistungen als Karten in zwei Spalten
  page.drawText(site.leistungen.titel, { x: RAND, y, size: 17, font: titel7, color: F.tinte });
  y -= 12;
  const kb = (INNEN - 12) / 2;
  const karten = site.leistungen.karten;
  for (let i = 0; i < karten.length; i += 2) {
    const paar = karten.slice(i, i + 2);
    const hoehen = paar.map(
      (k) => 14 + umbrechen(k.titel, titel7, 11, kb - 24).length * 14 + umbrechen(k.text, text, 9, kb - 24).length * 12.5 + 14,
    );
    const hk = Math.max(...hoehen);
    paar.forEach((k, j) => {
      const x = RAND + j * (kb + 12);
      page.drawRectangle({ x, y: y - hk, width: kb, height: hk, color: F.weiss });
      let yy = absatz(page, k.titel, { x: x + 12, y: y - 10, breite: kb - 24, font: titel7, groesse: 11, zeilenhoehe: 14 });
      absatz(page, k.text, { x: x + 12, y: yy - 2, breite: kb - 24, groesse: 9, farbe: F.leise, zeilenhoehe: 12.5 });
    });
    y -= hk + 10;
  }

  // Ablauf in drei Schritten
  y -= 12;
  page.drawText(m.ablauf_titel, { x: RAND, y, size: 17, font: titel7, color: F.tinte });
  y -= 14;
  const sb = (INNEN - 2 * 10) / 3;
  const schritte = site.ablauf.schritte;
  const sh =
    Math.max(...schritte.map((s) => umbrechen(s.titel, titel7, 11, sb - 24).length * 14 + umbrechen(s.text, text, 8.8, sb - 24).length * 12)) + 52;
  schritte.forEach((s, i) => {
    const x = RAND + i * (sb + 10);
    const letzter = i === schritte.length - 1;
    page.drawRectangle({ x, y: y - sh, width: sb, height: sh, color: letzter ? F.akzent : F.weiss });
    page.drawCircle({ x: x + 22, y: y - 22, size: 11, color: letzter ? F.flaeche : F.tinte });
    const nr = String(i + 1);
    page.drawText(nr, { x: x + 22 - titel.widthOfTextAtSize(nr, 11) / 2, y: y - 26, size: 11, font: titel, color: letzter ? F.tinte : F.aufTinte });
    const yy = absatz(page, s.titel, { x: x + 12, y: y - 40, breite: sb - 24, font: titel7, groesse: 11, zeilenhoehe: 14, farbe: letzter ? F.weiss : F.tinte });
    absatz(page, s.text, { x: x + 12, y: yy - 2, breite: sb - 24, groesse: 8.8, zeilenhoehe: 12, farbe: letzter ? hex("#e3f2e7") : F.leise });
  });
  y -= sh;

  // Kontakt
  y -= 26;
  page.drawText(m.kontakt_titel, { x: RAND, y, size: 14, font: titel7, color: F.tinte });
  y = absatz(page, `${site.marke.email} · ${site.marke.telefon}`, { y: y - 4, groesse: 10.5, font: fett, farbe: F.akzentText });
  fusszeile(page, 2);

  // ===========================================================================
  // Seiten 3 und folgende: ausfüllbarer Steckbrief
  const form = pdf.getForm();
  const s = site.steckbrief;
  let seitenNr = 2;

  const neueSeite = () => {
    page = pdf.addPage([B, H]);
    hintergrund(page);
    seitenNr += 1;
    fusszeile(page, seitenNr);
    y = H - RAND;
  };
  const platz = (benoetigt: number) => {
    if (y - benoetigt < 46) neueSeite();
  };

  neueSeite();
  y = ueberschrift(page, m.steckbrief_titel, y, 28);
  y = absatz(page, m.steckbrief_einleitung, { y: y - 6, groesse: 10.5, farbe: F.leise });
  // Sicherheitshinweis
  const hinweisZeilen = umbrechen(s.sicherheit, fett, 9.5, INNEN - 24);
  const hh = hinweisZeilen.length * 13 + 16;
  page.drawRectangle({ x: RAND, y: y - 8 - hh, width: INNEN, height: hh, color: F.sand });
  absatz(page, s.sicherheit, { x: RAND + 12, y: y - 16, breite: INNEN - 24, font: fett, groesse: 9.5, zeilenhoehe: 13 });
  y -= hh + 14;

  // Rückweg: E-Mail oder online
  const kasten = 118;
  page.drawRectangle({ x: RAND, y: y - kasten, width: INNEN, height: kasten, color: F.tinte });
  page.drawText(m.online_titel, { x: RAND + 18, y: y - 30, size: 18, font: hand, color: F.gold });
  let ky = absatz(page, m.online_text, { x: RAND + 18, y: y - 36, breite: INNEN - 150, groesse: 10.5, farbe: F.aufTinte });
  const anzeigeUrl = steckbriefUrl.replace(/^https?:\/\//, "");
  page.drawText(anzeigeUrl, { x: RAND + 18, y: ky - 16, size: 12, font: fett, color: F.mint });
  link(page, steckbriefUrl, RAND + 18, ky - 20, fett.widthOfTextAtSize(anzeigeUrl, 12), 16);
  ky = absatz(page, m.rueckweg_text, { x: RAND + 18, y: ky - 26, breite: INNEN - 150, groesse: 9.5, farbe: F.aufTinteLeise });
  page.drawRectangle({ x: B - RAND - 106, y: y - kasten + 12, width: 94, height: 94, color: F.weiss });
  page.drawImage(qr, { x: B - RAND - 102, y: y - kasten + 16, width: 86, height: 86 });
  link(page, steckbriefUrl, B - RAND - 106, y - kasten + 12, 94, 94);
  y -= kasten + 6;


  const feldRahmen = { borderColor: F.rand, borderWidth: 1, backgroundColor: F.weiss };

  s.abschnitte.forEach((abschnitt, ai) => {
    // Überschrift nie allein am Seitenende: Platz für Überschrift und mindestens zwei Felder
    platz(130);
    y -= 8;
    page.drawCircle({ x: RAND + 10, y: y - 8, size: 10, color: F.tinte });
    const nr = String(ai + 1);
    page.drawText(nr, { x: RAND + 10 - titel.widthOfTextAtSize(nr, 10) / 2, y: y - 11.5, size: 10, font: titel, color: F.aufTinte });
    page.drawText(abschnitt.titel, { x: RAND + 28, y: y - 13, size: 14, font: titel7, color: F.tinte });
    y -= 26;

    for (const feld of abschnitt.felder) {
      const label = feld.pflicht ? `${feld.label} *` : feld.label;
      const labelZeilen = umbrechen(label, fett, 9.5, INNEN);
      const optionen = feld.optionen ?? [];
      const spalten = feld.typ === "auswahl" || feld.typ === "mehrfach" ? (optionen.every((o) => o.length <= 22) ? 3 : 2) : 1;
      const feldHoehe =
        feld.typ === "textarea" ? 40 : feld.typ === "auswahl" || feld.typ === "mehrfach" ? Math.ceil(optionen.length / spalten) * 16 : 19;
      platz(labelZeilen.length * 13 + feldHoehe + 14);

      y = absatz(page, label, { y, font: fett, groesse: 9.5, zeilenhoehe: 13 });
      y -= 4;

      if (feld.typ === "auswahl" || feld.typ === "mehrfach") {
        const ow = INNEN / spalten;
        const gruppe = feld.typ === "auswahl" ? form.createRadioGroup(feld.name) : null;
        optionen.forEach((option, oi) => {
          const x = RAND + (oi % spalten) * ow;
          const oy = y - Math.floor(oi / spalten) * 16 - 12;
          if (gruppe) {
            gruppe.addOptionToPage(option, page, { x, y: oy, width: 11, height: 11, ...feldRahmen });
          } else {
            const box = form.createCheckBox(`${feld.name}.${oi + 1}`);
            box.addToPage(page, { x, y: oy, width: 11, height: 11, ...feldRahmen });
          }
          page.drawText(option, { x: x + 17, y: oy + 2, size: 9.5, font: text, color: F.tinte });
        });
        y -= feldHoehe + 6;
      } else {
        const feldObj = form.createTextField(feld.name);
        if (feld.typ === "textarea") feldObj.enableMultiline();
        feldObj.addToPage(page, { x: RAND, y: y - feldHoehe, width: INNEN, height: feldHoehe, font: feldschrift, ...feldRahmen });
        feldObj.setFontSize(feld.typ === "textarea" ? 9.5 : 10);
        if (feld.platzhalter) {
          // Hinweis unter dem Feld (PDF-Formulare kennen keine Platzhalter)
          page.drawText(feld.platzhalter, { x: RAND, y: y - feldHoehe - 9, size: 7.5, font: text, color: F.leise });
          y -= 9;
        }
        y -= feldHoehe + 8;
      }
    }
  });
  form.updateFieldAppearances(feldschrift);

  // Abschluss: wohin mit dem ausgefüllten Steckbrief
  platz(50);
  y -= 14;
  page.drawRectangle({ x: RAND, y: y - 2, width: INNEN, height: 2, color: F.tinte });
  y = absatz(page, m.abschluss_text, { y: y - 8, font: fett, groesse: 10.5 });

  // ---------------------------------------------------------------------------
  const ziel = join(process.cwd(), "public", m.datei);
  writeFileSync(ziel, await pdf.save());

  mkdirSync(join(process.cwd(), "vorlagen"), { recursive: true });
  const email = `Betreff: ${m.email_betreff}\nAnhang: ${m.datei}\n\n${m.email_text.trim()}\n`;
  writeFileSync(join(process.cwd(), "vorlagen", "email-infomappe.txt"), email);

  console.log(`Infomappe erzeugt: public/${m.datei} (${pdf.getPageCount()} Seiten, ${form.getFields().length} Formularfelder)`);
  console.log("E-Mail-Vorlage erzeugt: vorlagen/email-infomappe.txt");
}

erzeugen().catch((fehler) => {
  console.error(fehler);
  process.exit(1);
});
