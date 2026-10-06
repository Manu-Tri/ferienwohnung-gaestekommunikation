# Design-Brief: Neues Design für die anytime-Landingpage

Du gestaltest das visuelle Design dieser Landingpage neu. Lies diesen Brief vollständig, dann `README.md`, `inhalte/site.yaml`, `src/styles/global.css` und die Komponenten in `src/components/`, bevor du etwas änderst.

## Das Wichtigste in einem Satz

Ein Besucher muss in **5 Sekunden** verstehen: *„Das ist ein Service, der für mich als Vermieter einer Ferienwohnung alle Gästenachrichten auf Airbnb und Booking.com beantwortet, damit ich meine Abende und Wochenenden zurückbekomme.“*

Wenn das Design diesen 5-Sekunden-Test nicht besteht, ist es nicht fertig, egal wie schön es ist.

## Das Angebot

- **anytime** übernimmt die Gästekommunikation für Ferienwohnungen: Anfragen, Check-in-Infos, Fragen während des Aufenthalts, Notfälle an Partner vor Ort, Dank und Bitte um Bewertung nach der Abreise, Antworten auf Bewertungen.
- Erreichbar von 7 bis 23 Uhr, auch am Wochenende. Antwort in ca. 15 Minuten.
- Eine KI schreibt Entwürfe, alles Wichtige (Geld, Stornierung, Beschwerden, Notfälle) prüft ein Mensch. **Das Menschliche ist ein zentrales Verkaufsargument, kein Nebensatz.**
- Preis: 9 € pro Buchung, keine Grundgebühr, monatlich kündbar, 30 Tage kostenlos testen.
- Zweites Angebot (Einstieg mit wenig Hürde): kostenloser Inserats-Check mit 5 konkreten Verbesserungen in 48 Stunden.
- Nebenzielgruppe: Agenturen und Co-Hosts (White Label).

## Zielgruppe

- **Private Vermieter von 1 bis 10 Ferienwohnungen** in Deutschland, Startregion Mosel. Oft 40 bis 65 Jahre alt, vermieten nebenbei oder als Familienbetrieb.
- Keine Tech-Menschen. Sie misstrauen „KI-Startups“ und anonymen Callcentern. Sie wollen das Gefühl: *Da kümmert sich jemand Verlässliches um meine Gäste, als wären es seine eigenen.*
- Der Schmerz: Das Handy vibriert beim Abendessen, am Sonntag, im Urlaub. Gäste stehen vor dem Schlüsselsafe. Langsame Antworten kosten Buchungen und Sterne.
- Viele kommen über das Handy (Link aus Brief, Facebook-Gruppe, Empfehlung). **Mobile zuerst gestalten.**

## Gewünschte Wirkung

- **Modern und auffällig**, damit die Seite im Gedächtnis bleibt und sich klar von Baukasten-Seiten abhebt. Mutig in Typografie, Komposition und Farbe.
- Gleichzeitig **warm, vertrauenswürdig und ruhig**. Kein kühler SaaS-Look, kein Neon-Tech, keine Stockfoto-Ästhetik, kein Bento-Grid nur um des Trends willen.
- Gefühl: *Feierabend. Durchatmen. Jemand hat das im Griff.*
- Ferienwohnung muss visuell erkennbar sein (z. B. Haus, Schlüssel, Tür, Abendstimmung, Mosel-Weinberg), ohne kitschig zu werden.

## Der Hero ist das Herzstück

Im ersten Bildschirm, auf Handy und Desktop, ohne Scrollen sichtbar:

1. **Zielgruppe:** „Für Vermieter von Ferienwohnungen“ (oder gleichwertig klar).
2. **Nutzen-Überschrift:** aktuell „Ihre Ferienwohnung ist gut betreut. Ihre Freizeit gehört wieder Ihnen.“ Du darfst bessere Varianten vorschlagen, schreibe sie dann in `inhalte/site.yaml`.
3. **Beweis, wie es aussieht:** die Chat-Demo (`ChatDemo.astro`), ein Gast schreibt abends, anytime antwortet sofort und herzlich. Sie ist der stärkste visuelle Anker und soll prominent bleiben, darf aber neu inszeniert werden (z. B. im Handy-Rahmen, mit Uhrzeit-Kontrast „21:47, Sie sind beim Essen“).
4. **Primärer Knopf:** „30 Tage kostenlos testen“. Sekundär: „Kostenlosen Inserats-Check anfordern“.
5. **Vertrauenspunkte:** Keine Grundgebühr, monatlich kündbar, DSGVO-konform, Menschen kontrollieren die KI.

Idee zum Ausprobieren: ein klarer Kontrast „Sie“ (entspannt, Feierabend) gegenüber „Ihre Gäste“ (bekommen trotzdem sofort Antwort).

## Was bleiben muss (technische Leitplanken)

- **Stack:** Astro 7, Tailwind CSS 4, statisch, keine neuen Frameworks (kein React/Vue). Kleine Skripte in Vanilla-TS wie bisher.
- **Alle Texte bleiben in `inhalte/site.yaml`.** Keine Texte fest in Komponenten schreiben. Neue Felder dürfen ergänzt werden, dann auch im Schema `src/config/schema.ts`.
- **Keine Gedankenstriche** (– —) in Texten. Prüfen mit `npm run pruefen:striche`.
- **Farben als Variablen** in `src/styles/global.css` (`:root` und `@theme inline`). Ein Farbwechsel muss an einer Stelle möglich sein.
- **Schriften lokal** über `@fontsource`, keine Google-Fonts-Links, keine Cookies, kein Tracking, keine externen Bilder.
- **Leistung und Zugänglichkeit:** Lighthouse soll bei 95 bis 100 bleiben (Berichte liegen in `lighthouse/`). Kontrast mindestens WCAG AA, Tastaturbedienung, `prefers-reduced-motion` respektieren, ohne JavaScript muss alles lesbar sein.
- **SEO nicht verschlechtern:** eine `h1` pro Seite, Titel, Beschreibung, JSON-LD und Sitemap bleiben wie in `src/layouts/Basis.astro`.
- **Ehrlichkeit:** keine erfundenen Kundenstimmen, Zahlen, Logos oder „bekannt aus“. Der Abschnitt `ergebnisse` bleibt leer, bis es echte Daten gibt. Platzhalter in eckigen Klammern nicht mit Fantasiewerten füllen.
- **Funktionen erhalten:** mehrstufiges Anfrageformular (Netlify Forms), Wunschpaket-Auswahl (`Vergleich.astro`), die das Formular vorbelegt, Rechner, FAQ, Sticky-CTA auf dem Handy, Regionsseite `/mosel`, Fokusseite `/inserats-check`.

## Seitenaufbau heute (Reihenfolge darf überdacht werden)

Hero, Problem („Kennen Sie das?“), Gästereise (vor, während, nach dem Aufenthalt), Persönlich (wer dahinter steht), Ablauf in 3 Schritten, Leistungen, Wunschpaket, Ergebnisse (ausgeblendet), Preise, Für Agenturen, Anfrageformular, FAQ, Abschluss.

Wenn ein Abschnitt den Weg zum Knopf eher bremst, schlage Kürzen oder Zusammenlegen vor, statt ihn nur neu einzufärben.

## Erhaltenswert aus dem aktuellen Design

- Die Chat-Demo mit nacheinander einlaufenden Nachrichten und Tipp-Animation.
- Handschriftliche Akzente (Schrift Caveat), sparsam eingesetzt, machen die Seite menschlich.
- Freundliches Grün als Markenfarbe (Logo ist eine grüne Sprechblase mit Häkchen). Ein neuer Farbton ist erlaubt, wenn er besser wirkt, das Logo muss dann mitziehen (`Logo.astro`, `LogoZeichen.astro`, `npm run og` für das Vorschaubild).

## Vorgehen

1. Bestand lesen und die Seite lokal ansehen (`npm run dev`, Port 4321), auf 375 px und 1280 px Breite.
2. **Zwei bis drei klar unterschiedliche Design-Richtungen** kurz beschreiben (Stimmung, Farben, Schrift, Hero-Skizze) und mich wählen lassen, bevor du alles umbaust.
3. Gewählte Richtung zuerst im Hero umsetzen, Screenshots auf Handy und Desktop zeigen, Feedback abwarten.
4. Danach die restlichen Abschnitte im selben System, Abschnitt für Abschnitt.
5. Am Ende: `npm run check`, `npm run build`, `npm run pruefen:striche`, Lighthouse für Startseite und `/inserats-check`.
6. Nichts committen oder pushen, ohne dass ich es sage.

## Erfolgskriterien

- 5-Sekunden-Test: Ein Fremder sagt nach einem Blick auf den ersten Bildschirm richtig, für wen das ist und was es tut.
- Der Knopf „30 Tage kostenlos testen“ ist auf dem Handy ohne Scrollen sichtbar.
- Die Seite wirkt modern und eigenständig, aber eine 60-jährige Vermieterin an der Mosel fühlt sich angesprochen und nicht fehl am Platz.
- Lighthouse, Zugänglichkeit und alle Funktionen sind mindestens so gut wie vorher.
