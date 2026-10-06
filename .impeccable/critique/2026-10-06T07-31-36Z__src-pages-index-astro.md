---
target: Startseite
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 4
target_identity: "file:/Users/manuelnilles/Ideen/B&B/src/pages/index.astro"
target_fingerprint: "sha256:15d442c2676cfaa25aa9d89d474798c4c02a88e65ee03081098cd1905a2f0e57"
target_path: /Users/manuelnilles/Ideen/B&B/src/pages/index.astro
timestamp: 2026-10-06T07-31-36Z
slug: src-pages-index-astro
---
# Critique: src/pages/index.astro (Moselabend)
Method: dual-agent (A: a370721827ebea6c5, B: adb734ec1eedcd4a1) + technical audit (a596427aae7cc2ea6, 13/20)

## Heuristics (22/32, n/a: 7, 10)
1 Status 3 | 2 Real world 3 | 3 Control 3 | 4 Consistency 2 | 5 Error prevention 3 | 6 Recognition 3 | 7 n/a | 8 Minimalism 2 | 9 Recovery 3 | 10 n/a

## Specificity
Hero specific (width-axis headline, 21:42 chat, valley with lit window). Below fold: uniform kicker + H2 + 3-7 columns rhythm ~10x; Mosel/evening never returns; Abschluss without valley.
Detector: 1 CLI (bounce-easing Vergleich.astro:84, real). Browser desktop 9 (8 line-length FAQ.astro:26/Abschluss.astro:17/Kopf.astro:26 real; 1 layout-transition Anfrageformular.astro:90 real). Mobile 5 text-occlusion false positives (closed details menu).

## Priority issues
- [P0] Invented testimonials live (site.yaml:281-300), also drive nav "Ergebnisse". Fix: stimmen: []. harden
- [P1] Visible placeholders ([VORNAME], mailto:[E-MAIL-ADRESSE], [PREIS WHITE LABEL], [ZU KLÄREN] in FAQ) + JSON-LD + canonical example.de. Fix: gate rendering, platzhalter check in prod build. harden
- [P1] "Menschen prüfen die KI" missing above the fold; Laufband "Immer erreichbar" contradicts 7-23 Uhr. clarify
- [P1] Mobile hero: phone starts ~650/812px and renders mostly empty during animation (ChatDemo.astro:141-144). adapt
- [P1] Page too long/redundant: 13 sections, ~16 mobile screens, Gästereise/Leistungen/Wunschpaket overlap, 2 calculators, 4 price figures. distill
- [P2] Visual language stops after hero; flat ending. bolder/delight

## Persona red flags
Gisela 62: [VORNAME] + empty photo, KI note ~6 sections down, 12-14px secondary text, no phone. Jordan: "testen" -> "Anfrage", unclear next step ([24 Stunden]). Riley: contradictions, form lost on refresh, hash stripped (Basis.astro:56-68). Casey: two identical CTAs, fiddly sliders, check card hidden in swipe row.

## Minor
Gold on green 4.06:1 (Ablauf.astro:27, Preise kicker); marquee/chat without pause; step errors not announced; nav wraps at 1024px; ~14 hard-coded colors; h1 "Gästen.Sie" missing space; stars read aloud; README stale; unused font deps.

## Questions
Human face in the chat? Fewer numbers/configurators? Rename CTA to what happens / concrete callback promise? Whole page as one evening, window goes dark at the end?
