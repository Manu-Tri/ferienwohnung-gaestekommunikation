# Landingpage anytime

Statische Lead-Seite für Remote-Gästekommunikation (Airbnb, Booking.com).
Astro 7, Tailwind CSS 4, keine Cookies, kein Tracking, Schrift (Figtree) lokal. Helles Farbschema: Sonnengelb und Tintenschwarz.

## Seiten

| Adresse | Zweck |
|---|---|
| `/` | Startseite mit Funnel, Rechner, Preisen, Formular |
| `/inserats-check` | Fokusseite ohne Navigation für Briefe, Partner, Anzeigen |
| `/mosel` | Beispiel einer Regionsseite (Vorlage) |
| `/danke` | Nach dem Absenden, nicht in Suchmaschinen |
| `/impressum`, `/datenschutz` | Rechtliches |

## Starten und bauen

Voraussetzung: Node.js 22.12 oder neuer.

```bash
npm install
npm run dev        # Entwicklung: http://localhost:4321
npm run build      # fertige Seite in dist/
npm run preview    # gebaute Seite lokal ansehen
npm run check      # Typprüfung
```

Hilfsbefehle:

```bash
npm run platzhalter       # listet alle offenen [PLATZHALTER]
npm run pruefen:striche   # findet Gedankenstriche in den Texten
npm run og                # Vorschaubild public/og.png neu erzeugen
```

## Inhalte ändern (ohne Code)

**Alles steht in `inhalte/site.yaml`**: Texte, Preise, Zeiten, Links, FAQ, Plätze-Zähler, Kundenstimmen.

- Preis ändern: `preise.pro_buchung`. Alle Texte mit `{preis}` ändern sich automatisch.
- Plätze-Zähler: `preise.gruenderpreis.plaetze_frei: 7` eintragen. Leer lassen = kein Zähler. Der Wert ändert sich nie von selbst.
- Ergebnisse und Kundenstimmen: unter `ergebnisse` eintragen. Solange beide Listen leer sind, ist der Abschnitt unsichtbar. Nur echte Zahlen und Zitate mit Einwilligung.
- Terminlink: `links.buchungslink` mit `https://` eintragen, dann erscheint auf der Danke-Seite ein Knopf.
- Analytics: `analytics.plausible: true` schaltet Plausible ein, der Absatz in der Datenschutzerklärung erscheint automatisch.

Ist die Datei fehlerhaft (z. B. falsche Einrückung, Text statt Zahl), bricht der Build mit einer Meldung ab, die Feld und Fehler nennt. Die alte Seite bleibt dann online.

Nach Änderung von Markenname oder Antwortzeit: `npm run og` ausführen, damit das Vorschaubild passt.

Die Rechtstexte selbst stehen in `src/pages/impressum.astro` und `src/pages/datenschutz.astro`, die Angaben dazu (Name, Anschrift, Aufsichtsbehörde) in `site.yaml` unter `impressum` und `datenschutz`.

## Neue Regionsseite

1. `inhalte/regionen/mosel.yaml` kopieren, z. B. als `inhalte/regionen/eifel.yaml`.
2. Texte anpassen (Name, `im_satz`, Einleitung, Partner, Orte).
3. Build. Die Seite ist unter `/eifel` erreichbar und automatisch in der Sitemap.

## Leadquelle mitsenden

Jeder Link mit `?quelle=...` füllt das versteckte Formularfeld `quelle`, z. B.

- `https://ihre-domain.de/inserats-check?quelle=brief`
- `https://ihre-domain.de/inserats-check?quelle=partner-mueller`

Ersatzweise wird `utm_source` genommen. Es wird nichts im Browser gespeichert, der Wert wird nur an interne Links angehängt. Zusätzlich wird `seite` (die Seite des Formulars) und `anliegen` (test, check, agentur) übertragen. Mit `?anliegen=check` lässt sich das Anliegen im Formular vorwählen.

## Deployment auf Netlify

1. Projekt in ein Git-Repository (GitHub, GitLab) legen.
2. In Netlify „Add new site“ und „Import an existing project“ wählen. Build-Befehl und Ordner stehen in `netlify.toml`.
3. **Forms aktivieren:** Site configuration, Forms, „Enable form detection“. Danach einmal neu deployen. Das Formular heißt `anfrage`.
4. **Benachrichtigung einrichten:** Forms, Form notifications, E-Mail an Ihre Adresse.
5. Domain verbinden, HTTPS ist automatisch.
6. In `site.yaml` `marke.domain` auf die echte Domain setzen.

Anderer Formulardienst (z. B. EU-gehostet): `formular.anbieter: "extern"` und `formular.endpunkt` setzen. Der Dienst muss POST mit FormData annehmen und mit Status 200 antworten. Abschnitt 4 der Datenschutzerklärung anpassen.

Lokal (`npm run dev`, `npm run preview`) schlägt das Absenden fehl, weil Netlify Forms nur auf Netlify läuft. Das Formular zeigt dann die Fehlermeldung an. Das ist erwartet.

## Technik

- `inhalte/site.yaml` wird beim Build gelesen und per Zod-Schema geprüft (`src/config/schema.ts`, `src/config/laden.ts`).
- Kein Framework im Browser. Kleine Skripte: Rechner, Mehrschritt-Formular, Sticky-Leiste, Scroll-Einblendung, Leadquelle.
- Ohne JavaScript funktioniert das Formular als normales Formular mit allen Feldern untereinander.
- Bewusst nur ein helles Farbschema (Farben in src/styles/global.css). Animationen sind bei „Bewegung reduzieren“ aus.
- Strukturierte Daten: `Service` mit `areaServed` und `FAQPage`.
- Lighthouse mobil (lokal gemessen): 100 in allen vier Kategorien auf `/`, `/inserats-check`, `/mosel`.

## Vorschau auf GitHub Pages

Bei jedem Push auf `main` baut GitHub automatisch eine Vorschau:
https://manu-tri.github.io/ferienwohnung-gaestekommunikation/

Die Vorschau ist für Suchmaschinen gesperrt, und das Formular sendet dort nichts (GitHub Pages hat kein Formular-Backend). Für echte Anfragen auf Netlify veröffentlichen.
