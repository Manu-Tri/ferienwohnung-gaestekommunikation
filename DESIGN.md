---
name: anytime – Moselabend
description: Landingpage für die Gästekommunikation von Ferienwohnungen; Schieferabend über kalkhellem Tag, Weinlaubgrün für die Handlung.
colors:
  tinte: "#22303d"
  tinte-tief: "#1a2531"
  tinte-hover: "#34465a"
  auf-tinte: "#eef0ea"
  auf-tinte-leise: "#c3ccd3"
  akzent: "#2e6b3f"
  akzent-stark: "#265a34"
  auf-akzent: "#ffffff"
  akzent-hell: "#dbe9d9"
  akzent-text: "#255a33"
  mint: "#a3d89b"
  mint-hover: "#b8e3b1"
  mint-hell: "#e2f1df"
  gold: "#f4c95d"
  flaeche: "#eef0ea"
  sand: "#dfe4da"
  karte: "#ffffff"
  karte-2: "#e5e9e1"
  text: "#1d2833"
  text-leise: "#45505b"
  linie: "#b4bdb6"
  rahmen: "#d2d8d0"
  eingabe-rand: "#7c8790"
  fehler: "#b42318"
  fokus: "#1d2833"
  tal-fern: "#2c3c4b"
  tal-fluss: "#3a5266"
  haus: "#101820"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 7.6vw, 6.4rem)"
    fontWeight: 850
    lineHeight: 0.92
    letterSpacing: "0"
    fontVariation: "'wdth' 64"
  display-weit:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.74em"
    fontWeight: 300
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 72"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 750
    lineHeight: 1.05
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 78"
  lead:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.5vw, 1.19rem)"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 600
    lineHeight: 1.4
  hand:
    fontFamily: "Caveat, Comic Sans MS, cursive"
    fontSize: "clamp(1.5rem, 2vw, 1.65rem)"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  knopf: "0.5rem"
  klein: "0.5rem"
  karte: "0.75rem"
  blase: "14px"
  telefon: "2rem"
  pille: "999px"
spacing:
  rand: "clamp(1.25rem, 5vw, 4rem)"
  abschnitt: "clamp(3.5rem, 8vw, 7rem)"
  kopf-abstand: "clamp(1.75rem, 4vw, 3.5rem)"
  karte-innen: "clamp(1.375rem, 2.6vw, 2rem)"
  raster: "clamp(0.75rem, 1.6vw, 1.25rem)"
  behaelter-max: "80rem"
components:
  button-primary:
    backgroundColor: "{colors.akzent}"
    textColor: "{colors.auf-akzent}"
    typography: "{typography.label}"
    rounded: "{rounded.knopf}"
    padding: "0.875rem 1.6rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.akzent-stark}"
    textColor: "{colors.auf-akzent}"
  button-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.tinte-tief}"
    rounded: "{rounded.knopf}"
    padding: "0.875rem 1.6rem"
    height: "3rem"
  button-mint-hover:
    backgroundColor: "{colors.mint-hover}"
    textColor: "{colors.tinte-tief}"
  button-dunkel:
    backgroundColor: "{colors.tinte}"
    textColor: "{colors.auf-tinte}"
    rounded: "{rounded.knopf}"
    padding: "0.875rem 1.6rem"
  button-dunkel-hover:
    backgroundColor: "{colors.tinte-hover}"
  button-hell:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.tinte}"
    rounded: "{rounded.knopf}"
    padding: "0.875rem 1.6rem"
  button-hell-hover:
    backgroundColor: "{colors.karte}"
  button-klein:
    padding: "0.6rem 1rem"
    height: "2.75rem"
  button-gross:
    padding: "1.05rem 2rem"
  karte:
    backgroundColor: "{colors.karte}"
    textColor: "{colors.text}"
    rounded: "{rounded.karte}"
    padding: "{spacing.karte-innen}"
  karte-schiefer:
    backgroundColor: "{colors.tinte}"
    textColor: "{colors.auf-tinte}"
    rounded: "{rounded.karte}"
    padding: "{spacing.karte-innen}"
  eingabe:
    backgroundColor: "{colors.karte}"
    textColor: "{colors.text}"
    rounded: "{rounded.karte}"
    padding: "0.75rem 0.875rem"
  etikett:
    backgroundColor: "{colors.sand}"
    textColor: "{colors.text}"
    rounded: "{rounded.pille}"
    padding: "0.25rem 0.75rem"
  blase-gast:
    backgroundColor: "{colors.flaeche}"
    textColor: "{colors.text}"
    rounded: "{rounded.blase}"
    padding: "0.55rem 0.8rem"
  blase-wir:
    backgroundColor: "{colors.akzent}"
    textColor: "{colors.auf-akzent}"
    rounded: "{rounded.blase}"
    padding: "0.55rem 0.8rem"
---

# Design System: anytime – Moselabend

## Overview

**Creative North Star: "Moselabend"**

Die Seite erzählt einen Feierabend an der Mosel. Oben und unten ist Abend: schieferblaue Flächen tragen Kopfzeile, Hero und Abschluss, darunter liegt das gezeichnete Moseltal mit Weinberghängen, Fluss und einem Haus, in dessen Fenster Lampenlicht brennt. Dazwischen ist Tag: kalkhelles, leicht grünliches Grau, weiße Karten, ruhige Listen. Grün aus dem Weinlaub ist die Farbe der Handlung, Gold ist das Licht der Lampe und kommt nur im Abend vor.

Die Typografie trägt die Idee des Angebots. Eine einzige Schrift, Archivo, deren Breitenachse Bedeutung hat: Der erste Satz einer großen Überschrift ist schmal und schwer gesetzt (die Arbeit), der zweite breit und leicht (der freie Abend). Handschrift kommt nur in wenigen persönlichen Notizen vor und macht die Seite menschlich, ohne sie zu verspielen.

Die Seite ist mobil zuerst gebaut, dicht und ruhig, mit kleinen Rundungen und flachen Flächen. Tiefe entsteht durch den Wechsel von Abend und Tag, nicht durch Schatten. Bewegung ist sparsam, endet von selbst und respektiert reduzierte Bewegung vollständig.

**Key Characteristics:**
- Schieferabend (Kopf, Hero, Abschluss) rahmt kalkhellen Tag (alle Inhaltsabschnitte).
- Eine Schrift, Archivo Variable; die Breite (64 % bis 125 %) erzählt Arbeit und Feierabend.
- Weinlaubgrün mit weißer Schrift für Handlungen im Tag, helles Laubgrün mit dunkler Schrift im Abend.
- Lampengelb als einziges warmes Licht, nur auf Schiefer.
- Gezeichnete Zeichen (SVG, Masken) statt Schriftzeichen; das Doppelhäkchen ist das Markenmotiv.
- Kleine Rundungen (Knöpfe 0,5 rem, Karten 0,75 rem), flach, ohne dekorative Schatten.

## Colors

Kühler Schiefer und kalkhelles Grau als Bühne, Weinlaubgrün als einzige Handlungsfarbe, ein warmer Lampenton als Licht.

### Primary
- **Weinlaubgrün** (akzent): Hauptknöpfe auf hellen Flächen, unsere Chatblasen, der grüne Preisabschnitt, die letzte Ablaufkarte, Laufband. Immer mit weißer Schrift (auf-akzent, 6,4:1).
- **Tiefes Weinlaub** (akzent-stark): Hover der Hauptknöpfe.
- **Laubgrün als Schrift** (akzent-text): Häkchen in Listen, Handschrift auf hellen Karten, Link-Hover, das gezeichnete Plus in den Fragen (7:1 auf flaeche).
- **Blasses Laub** (akzent-hell): Ausgewählte Optionen im Formular und Steckbrief.

### Secondary
- **Helles Laubgrün** (mint): Knöpfe im Abend (Kopfzeile, Hero, Abschluss) mit dunkler Schrift (tinte-tief, 9,5:1), Häkchen und Hover-Links auf Schiefer, Rebzeilen im Tal, Fokusrahmen auf Schiefer. Hover: mint-hover.
- **Laubhauch** (mint-hell): Nebentext und Handschrift auf grünen Flächen (5,4:1 auf akzent).

### Tertiary
- **Lampengelb** (gold): das Licht im Fenster und seine Spiegelung im Fluss, die handschriftliche Notiz neben der Uhrzeit im Chat. Nur auf Schiefer (8,6:1). Einzige Ausnahme im Bestand ist der Fokusrahmen im grünen Preisabschnitt (4,1:1, für einen Rahmen ausreichend).

### Neutral
- **Schiefer** (tinte): Abendflächen für Kopfzeile, Hero, Abschluss, Fußzeile, dunkle Karten; auch theme-color des Browsers. Hover dunkler Knöpfe: tinte-hover.
- **Tiefer Schiefer** (tinte-tief): Handyrahmen der Chat-Demo, Weinberghänge im Tal, Schrift auf Mint-Knöpfen.
- **Kalkhell** (flaeche): Grundfläche des Tages, Gast-Chatblase, helle Knöpfe auf Schiefer; zugleich Schrift auf Schiefer (auf-tinte).
- **Schieferhell** (auf-tinte-leise): Nebentext auf Schiefer (8,3:1).
- **Sand** (sand): Abschnitt „Persönlich“, Etiketten, Hinweisfelder, Fußleiste des Wunschpakets. karte-2 nur auf Rechtstexten und der Dankeseite.
- **Weiß** (karte): Karten, Formular, Eingabefelder, mobiles Menü.
- **Nachttinte** (text) für Fließtext und Fokusrahmen im Tag (13:1), **Grauschiefer** (text-leise) für Nebentext (7,2:1).
- **Linien**: linie für Trennlinien in Listen, rahmen für feine Trennungen auf Karten, eingabe-rand für Ränder von Eingabefeldern und Schaltern (3:1 auf Weiß).
- **Fehlerrot** (fehler): nur für Fehlerzustände im Formular.
- **Talfarben** (tal-fern, tal-fluss, haus): nur im gezeichneten Moseltal.

### Named Rules
**The Lampenlicht Rule.** Gold ist Licht, kein Akzent. Es erscheint nur auf Schiefer; auf kalkhellen Flächen (1,4:1) und als Schrift auf Grün ist es verboten.

**The Zwei-Grün Rule.** Im Tag ist der Knopf Weinlaubgrün mit weißer Schrift, im Abend helles Laubgrün mit dunkler Schrift. Nie Weinlaubgrün auf Schiefer, nie Mint auf kalkhell.

**The Eine-Quelle Rule.** Jede Farbe lebt als Variable in `:root` und `@theme inline` von `src/styles/global.css`. Keine Hexwerte in Komponenten.

## Typography

**Display Font:** Archivo Variable mit Breitenachse (lokal über @fontsource, Rückfall ui-sans-serif, system-ui)
**Body Font:** Archivo Variable
**Handschrift:** Caveat 600 (Rückfall cursive)

**Character:** Eine Grotesk, die durch ihre Breite spricht: schmal, schwer und eng für Überschriften, normal breit und luftig im Text, sehr breit und leicht für den Moment des Aufatmens. Caveat ist die Hand eines Menschen, der eine kurze Notiz an den Rand schreibt.

### Hierarchy
- **Display** (850, clamp 2,9 bis 6,4 rem, Zeilenhöhe 0,92, Breite 64 %): erster Satz der Hero-Überschrift und der Abschlussüberschrift. Lange Titel auf Regionsseiten werden kleiner (clamp 2,3 bis 4,4 rem).
- **Display weit** (300, 0,74 em des Displays, Breite 125 %): zweiter Satz derselben Überschrift. Wird automatisch am ersten „. “ getrennt.
- **Headline** (800, clamp 2,1 bis 3,75 rem, Zeilenhöhe 0,96, Breite 72 %): Abschnittsüberschriften. Kennzahlen im Abschnitt „Problem“ noch schmaler (Breite 62 %).
- **Title** (750, 1,25 bis 1,5 rem, Zeilenhöhe 1,05, Breite 78 %): Karten- und Phasentitel, Fragen der FAQ (bold, Normalbreite).
- **Lead** (400, clamp 1 bis 1,19 rem, Zeilenhöhe 1,625, max. 36 rem): Einleitung unter Überschriften, in text-leise.
- **Body** (400, 1,0625 rem, Zeilenhöhe 1,55): Fließtext; Wurzelgröße 16 px, Eingabefelder mindestens 16 px.
- **Label** (500 bis 700, 0,94 rem): Vertrauenspunkte, Navigation, Etiketten, Kleingedrucktes. Nichts unter 0,875 rem.
- **Hand** (Caveat 600, ca. 1,5 bis 1,7 rem, Zeilenhöhe 1,1): Notiz neben der Uhrzeit im Chat, Hinweise in den Ablaufkarten, Gruß neben dem Formular, Zeitangabe im Steckbrief.

### Named Rules
**The Arbeit-und-Abend Rule.** Zweisätzige Großüberschriften setzen Satz 1 schmal und schwer (64 %, 850), Satz 2 breit und leicht (125 %, 300). Die Breite trägt Bedeutung und wird nicht als Dekor auf andere Texte übertragen.

**The Eine-Schrift Rule.** Archivo ist die einzige Satzschrift. Keine zweite Display- oder Systemschrift.

**The Randnotiz Rule.** Caveat nur für kurze persönliche Notizen, höchstens eine pro Abschnitt, nie für Überschriften, Knöpfe oder Beschriftungen.

## Layout

Ein zentrierter Behälter (max. 80 rem) mit fließendem Seitenrand (clamp 1,25 bis 4 rem) und großzügigem Abschnittsabstand (clamp 3,5 bis 7 rem). Abschnittsköpfe stehen linksbündig mit max. 51 rem Breite; zwischen Kopf und Inhalt liegt clamp 1,75 bis 3,5 rem.

Mobil zuerst: Alles ist einspaltig, Karten reihen sich mit fließendem Rasterabstand (clamp 0,75 bis 1,25 rem). Ab 640 px Chat in voller Länge, ab 768 px verschwindet die klebende Knopfleiste, ab 1024 px steht der Hero zweispaltig (Text links, Chat rechts, 20 bis 23 rem), ab 1280 px zeigt die Kopfzeile die volle Navigation. Formular und Steckbrief nutzen ein asymmetrisches Zweispaltenraster mit klebender Erklärspalte links.

Im Hero stehen Überschrift, Knopf und Vertrauenspunkte vor dem Chat, damit „30 Tage kostenlos testen“ auf dem Handy ohne Scrollen sichtbar ist. Unter Hero und Abschluss reserviert ein unterer Innenabstand Platz für das Tal (Höhe clamp 7 bis 15 rem).

**The Abend-Rahmen Rule.** Schiefer öffnet und schließt die Seite; dazwischen wechseln nur kalkhell, Sand und ein grüner Abschnitt (Preise).

## Elevation & Depth

Das System ist flach. Tiefe entsteht aus dem Wechsel der Flächen (Schiefer, kalkhell, Sand, Weiß, Grün) und aus dem Tal-Bild. Weiche Umgebungsschatten gibt es nur für Dinge, die wirklich über der Seite schweben: den Handyrahmen der Chat-Demo, das Anfrageformular und das aufgeklappte mobile Menü. Karten im Fluss der Seite haben keinen Schatten.

### Shadow Vocabulary
- **Handy** (`0 0 0 6px rgb(238 240 234 / 0.04), 0 30px 60px -20px rgb(0 0 0 / 0.5)`): nur der Chat-Rahmen auf Schiefer.
- **Formular** (`0 20px 50px rgb(29 40 51 / 0.08)`): die Formularkarte im Tag.
- **Menü** (`0 20px 50px -20px rgb(29 40 51 / 0.35)`): ausgeklapptes mobiles Menü.

### Named Rules
**The Flach-im-Fluss Rule.** Was im Lesefluss liegt, ist flach. Schatten nur für schwebende Objekte, immer weich und diffus.

## Shapes

Kleine, freundliche Rundungen: Knöpfe und kleine Felder 0,5 rem, Karten, Formular und Eingabefelder 0,75 rem (Auswahlkarten 0,875 rem), Etiketten und Schalter als Pille. Chatblasen haben 14 px mit einer spitzen 4-px-Ecke zur Seite des Absenders, der Handyrahmen 2 rem. Das Personenfoto ist oben rund wie ein Türbogen. Das Logo ist eine quadratische Sprechblase mit spitzer Ecke unten links und Doppelhäkchen.

Listen und Phasen werden durch kräftige Oberlinien gegliedert (2 bis 3 px in text oder tinte), nicht durch Kästen.

**The Gezeichnet Rule.** Häkchen, Plus, Menü und Pause sind gezeichnete SVG-Pfade oder Masken mit runden Enden (Strich 2 bis 2,4). Keine Unicode-Zeichen oder Emoji als Symbole.

## Components

### Buttons
Fest und deutlich, ein klarer Hauptknopf pro Blick.
- **Shape:** sanft gerundet (0,5 rem), mindestens 3 rem hoch, Schrift 700.
- **Primär (Tag):** Weinlaubgrün, weiße Schrift, Innenabstand 0,875 × 1,6 rem. Hover tiefes Weinlaub.
- **Mint (Abend):** helles Laubgrün, Schrift tiefer Schiefer; einziger Knopf in Kopfzeile, Hero und Abschluss. Hover mint-hover.
- **Dunkel / Hell:** Schiefer auf hellen Preiskarten, kalkhell auf dunklen Preiskarten.
- **Größen:** klein (2,75 rem, 0,94 rem Schrift) für die Kopfzeile, groß (1,05 × 2 rem, 1,1 rem Schrift) für Hero und Abschluss.
- **Zustände:** Übergänge 0,15 s; beim Drücken 2 px nach unten. Fokus: 3 px Rahmen mit 3 px Abstand in der Fokusfarbe des Abschnitts (text im Tag, mint auf Schiefer, gold im grünen Preisabschnitt).
- **Zweite Handlung:** unterstrichener Textlink (700, Unterstrich 2 px, Abstand 5 px) neben dem Hauptknopf, nie ein zweiter gleichrangiger Knopf.

### Chips
- **Etiketten:** Pille, 0,875 rem bold, sand im Tag, akzent mit weißer Schrift für „empfohlen“, halbtransparentes Kalk auf Schiefer.
- **Vorzüge im Preisabschnitt:** Pille mit 1,5-px-Rand in weiß/40 %.

### Cards / Containers
- **Corner Style:** 0,75 rem.
- **Background:** Weiß im Tag; Schiefer oder Weinlaubgrün für hervorgehobene Karten; kalkhell auf grünem Grund.
- **Shadow Strategy:** keine (siehe Elevation).
- **Border:** keine; Gliederung durch Fläche.
- **Internal Padding:** clamp 1,375 bis 2 rem.
- **Mobil:** Kartenreihen dürfen seitlich wischbar sein, die nächste Karte schaut am Rand hervor.

### Inputs / Fields
- **Style:** Weiß, 2 px Rand in eingabe-rand, 0,75 rem Rundung, mindestens 16 px Schrift.
- **Auswahlkarten:** 0,875 rem Rundung, min. 3,5 rem hoch; Hover und Auswahl färben den Rand weinlaubgrün, ausgewählt mit akzent-hell.
- **Schalter:** Pille 3,25 × 1,9 rem, aus in eingabe-rand, an in Weinlaubgrün.
- **Error:** Rand in fehler über `aria-invalid`.

### Navigation
- **Kopfzeile:** klebend, Schiefer, 4,25 rem (ab 768 px 5 rem). Links in auf-tinte-leise (500), Hover mint. Rechts der kleine Mint-Knopf.
- **Mobil:** Menüknopf 44 px mit gezeichneten Strichen, öffnet eine weiße Karte; schließt bei Klick, Tippen daneben und Escape. Solange die klebende Knopfleiste unten sichtbar ist, verschwindet der Kopfknopf.
- **Fußzeile:** Schiefer, Links in auf-tinte-leise mit 11 px Tippfläche nach oben und unten.

### Chat-Demo (Signatur)
Ein Gespräch im gezeichneten Handyrahmen: große Uhrzeit (Display 800) mit goldener Handnotiz darüber, Gastblasen kalkhell links, unsere Blasen weinlaubgrün rechts, darunter das Doppelhäkchen „geprüft“ in Mint. Die Höhe steht fest, neue Nachrichten erscheinen unten und schieben ältere nach oben, vor jeder Antwort laufen drei Tipp-Punkte. Der Ablauf hält an, solange der Chat nicht im Bild ist, und endet nach drei Durchläufen. Ohne JavaScript oder bei reduzierter Bewegung steht das ganze Gespräch sofort da. Am Handy nur bis zur ersten Antwort.

### Moseltal (Signatur)
Linienbild am unteren Rand von Hero und Abschluss: ferne Hügel, Fluss mit goldener Lichtspiegelung, zwei Weinberghänge mit Rebzeilen in Mint, ein Haus mit erleuchtetem Fenster. Im Hero ist Abend. Im Abschluss ist Nacht mit Sternen; sobald das Tal im Bild ist, geht das Licht einmal aus (1,4 s, weich auslaufend). Ohne JavaScript bleibt es an.

### Häkchen-Liste
Listenpunkte mit gezeichnetem Häkchen als Maske (1 rem), Farbe über `--haken-farbe` (akzent-text im Tag, mint auf Schiefer).

### Laufband
Grünes Band mit Leistungen in Headline-Breite (72 %, bold) und mint Doppelhäkchen; läuft linear (ca. 55 s), hält bei Zeiger und Fokus, hat einen eigenen Pausenknopf und steht bei reduzierter Bewegung still.

### Klebende Knopfleiste
Nur unter 768 px: kalkhelle Leiste mit Weichzeichner und Primärknopf ohne Kante, erscheint erst nach dem Hero und verschwindet über Formular und Abschluss.

## Do's and Don'ts

### Do:
- **Do** Abend (tinte) für Kopfzeile, Hero, Abschluss und Fußzeile, Tag (flaeche, karte, sand) für alles dazwischen.
- **Do** Weinlaubgrün (akzent) mit weißer Schrift für Hauptknöpfe im Tag, Mint mit tinte-tief für Knöpfe auf Schiefer.
- **Do** zweisätzige Großüberschriften am ersten Punkt teilen: Satz 1 bei 64 % Breite und 850, Satz 2 bei 125 % und 300.
- **Do** Abschnittsüberschriften mit `.h2` (800, 72 %) direkt und ohne Vorzeile beginnen.
- **Do** Symbole als SVG-Pfad oder Maske zeichnen, runde Enden, Strich 2 bis 2,4.
- **Do** jede Bewegung bei `prefers-reduced-motion` abschalten und ohne JavaScript den Endzustand zeigen; wiederholte Animationen enden von selbst oder lassen sich anhalten.
- **Do** alle Texte in `inhalte/site.yaml` pflegen; Platzhalter in [ECKIGEN KLAMMERN] blendet `src/config/platzhalter.ts` aus, und der Produktions-Build bricht ab, solange welche offen sind.

### Don't:
- **Don't** Gold auf hellen oder grünen Flächen als Schrift oder Fläche einsetzen.
- **Don't** Vorzeilen oder Kicker über Abschnittsüberschriften setzen; sie wurden bewusst entfernt.
- **Don't** Unicode-Häkchen, Pfeile, Plus-Zeichen oder Emoji als Symbole verwenden.
- **Don't** eine zweite Satzschrift oder eine Systemschrift als Display-Stimme einführen.
- **Don't** Caveat für Überschriften, Knöpfe oder mehr als eine Notiz pro Abschnitt verwenden.
- **Don't** Karten im Lesefluss mit Schatten oder Rahmen versehen; Rundungen über 0,75 rem nur für Pillen, Blasen und den Handyrahmen.
- **Don't** Texte fest in Komponenten schreiben oder Platzhalter mit erfundenen Werten füllen.
