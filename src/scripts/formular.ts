/**
 * Mehrstufiges Anfrageformular.
 * Ohne JavaScript bleibt es ein normales Formular mit allen Feldern untereinander.
 */

type Feld = HTMLInputElement | HTMLTextAreaElement;

function einrichten(form: HTMLFormElement) {
  const schritte = Array.from(form.querySelectorAll<HTMLElement>("[data-schritt]"));
  const fortschrittText = form.querySelector<HTMLElement>("[data-fortschritt-text]");
  const balken = form.querySelector<HTMLElement>("[data-fortschritt-balken]");
  const weiter = form.querySelector<HTMLButtonElement>("[data-weiter]")!;
  const zurueck = form.querySelector<HTMLButtonElement>("[data-zurueck]")!;
  const absenden = form.querySelector<HTMLButtonElement>("[data-absenden]")!;
  const sendeFehler = form.querySelector<HTMLElement>("[data-sende-fehler]")!;
  const vorlage = form.dataset.schrittText ?? "Schritt {nr} von {gesamt}";
  let aktuell = 0;
  let zeigerGenutzt = false;

  form.dataset.js = "";
  form.noValidate = true;

  const anzeigen = (index: number, fokus: boolean) => {
    aktuell = Math.max(0, Math.min(schritte.length - 1, index));
    schritte.forEach((s, i) => s.toggleAttribute("data-aktiv", i === aktuell));
    if (fortschrittText) fortschrittText.textContent = vorlage.replace("{nr}", String(aktuell + 1));
    if (balken) balken.style.width = `${((aktuell + 1) / schritte.length) * 100}%`;
    zurueck.hidden = aktuell === 0;
    weiter.hidden = aktuell === schritte.length - 1;
    if (fokus) {
      const oben = form.getBoundingClientRect().top;
      if (oben < 0) form.scrollIntoView({ block: "start" });
      schritte[aktuell].querySelector<HTMLElement>("input:not([type=hidden]), textarea")?.focus({ preventScroll: true });
    }
  };

  const fehlerSetzen = (feld: Feld, meldung: string) => {
    const box = feld.id ? form.querySelector<HTMLElement>(`#${feld.id}-fehler`) : null;
    if (box) box.textContent = meldung;
    if (meldung) feld.setAttribute("aria-invalid", "true");
    else feld.removeAttribute("aria-invalid");
  };

  /** Prüft einen Schritt, zeigt Meldungen an und gibt zurück, ob er gültig ist. */
  const pruefen = (index: number): boolean => {
    const schritt = schritte[index];
    const box = schritt.querySelector<HTMLElement>("[data-fehler-box]");
    let gueltig = true;
    let gruppenMeldung = "";
    let erstesUngueltiges: HTMLElement | null = null;

    // Pflicht-Auswahl (Radio-Gruppen)
    const radios = schritt.querySelectorAll<HTMLInputElement>("input[type=radio][required]");
    if (radios.length && !Array.from(radios).some((r) => r.checked)) {
      gueltig = false;
      gruppenMeldung = radios[0].dataset.fehler ?? "";
      erstesUngueltiges = radios[0];
    }
    // Mindestens eine Checkbox
    schritt.querySelectorAll<HTMLElement>("[data-mindestens-eins]").forEach((gruppe) => {
      const boxen = gruppe.querySelectorAll<HTMLInputElement>("input[type=checkbox]");
      if (!Array.from(boxen).some((b) => b.checked)) {
        gueltig = false;
        gruppenMeldung = gruppe.dataset.mindestensEins ?? "";
        erstesUngueltiges ??= boxen[0];
      }
    });
    if (box) box.textContent = gruppenMeldung;

    // Textfelder
    schritt.querySelectorAll<Feld>("input[data-fehler]:not([type=radio]), textarea[data-fehler]").forEach((feld) => {
      feld.value = feld.value.trim();
      const ok = feld.checkValidity();
      fehlerSetzen(feld, ok ? "" : (feld.dataset.fehler ?? ""));
      if (!ok) {
        gueltig = false;
        erstesUngueltiges ??= feld;
      }
    });

    if (!gueltig) (erstesUngueltiges as HTMLElement | null)?.focus();
    return gueltig;
  };

  const vor = () => {
    if (pruefen(aktuell)) anzeigen(aktuell + 1, true);
  };

  weiter.addEventListener("click", vor);
  zurueck.addEventListener("click", () => anzeigen(aktuell - 1, true));

  // Bei Auswahl per Maus oder Finger automatisch weiter, bei Tastatur nicht
  form.addEventListener("pointerdown", () => (zeigerGenutzt = true));
  form.addEventListener("keydown", (e) => {
    zeigerGenutzt = false;
    const ziel = e.target as HTMLElement;
    if (e.key === "Enter" && ziel instanceof HTMLInputElement && aktuell < schritte.length - 1) {
      e.preventDefault();
      vor();
    }
  });
  form.querySelectorAll<HTMLElement>("[data-auto-weiter]").forEach((gruppe) => {
    gruppe.addEventListener("change", () => {
      const box = gruppe.closest("[data-schritt]")?.querySelector<HTMLElement>("[data-fehler-box]");
      if (box) box.textContent = "";
      if (zeigerGenutzt) window.setTimeout(vor, 220);
    });
  });
  form.querySelectorAll<HTMLElement>("[data-mindestens-eins]").forEach((gruppe) => {
    gruppe.addEventListener("change", () => {
      const box = gruppe.closest("[data-schritt]")?.querySelector<HTMLElement>("[data-fehler-box]");
      if (box) box.textContent = "";
    });
  });

  // Hinweis zum Inserats-Link nur beim Inserats-Check
  const hinweisCheck = form.querySelector<HTMLElement>("[data-nur-check]");
  const anliegen = () =>
    form.querySelector<HTMLInputElement>("input[name=anliegen]:checked, input[type=hidden][name=anliegen]")?.value ?? "test";
  const anliegenAktualisieren = () => {
    if (hinweisCheck) hinweisCheck.hidden = anliegen() !== "check";
  };
  form.querySelectorAll("input[name=anliegen]").forEach((r) => r.addEventListener("change", anliegenAktualisieren));
  anliegenAktualisieren();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    for (let i = 0; i < schritte.length; i++) {
      if (!pruefen(i)) {
        anzeigen(i, false);
        pruefen(i);
        return;
      }
    }
    const ziel = `/danke?anliegen=${encodeURIComponent(anliegen())}`;
    const daten = new FormData(form);
    // Honeypot ausgefüllt: so tun, als wäre alles gut
    if (String(daten.get("firma_website") ?? "") !== "") {
      window.location.href = ziel;
      return;
    }

    const knopfText = absenden.textContent;
    absenden.disabled = true;
    absenden.textContent = form.dataset.sendenLaeuft ?? knopfText;
    sendeFehler.textContent = "";

    try {
      const antwort =
        form.dataset.anbieter === "netlify"
          ? await fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams(daten as unknown as Record<string, string>).toString(),
            })
          : await fetch(form.action, { method: "POST", headers: { Accept: "application/json" }, body: daten });
      if (!antwort.ok) throw new Error(String(antwort.status));
      window.location.href = ziel;
    } catch {
      sendeFehler.textContent = form.dataset.fehlerSenden ?? "Fehler beim Senden.";
      absenden.disabled = false;
      absenden.textContent = knopfText;
    }
  });

  anzeigen(0, false);
}

/** Wählt das Anliegen im Formular aus (über Knöpfe mit data-anliegen oder ?anliegen= in der Adresse). */
function anliegenWaehlen(wert: string | null) {
  if (!wert) return;
  const radio = document.querySelector<HTMLInputElement>(`form.anfrage input[name=anliegen][value="${CSS.escape(wert)}"]`);
  if (radio && !radio.checked) {
    radio.checked = true;
    radio.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

document.querySelectorAll<HTMLFormElement>("form.anfrage").forEach(einrichten);
anliegenWaehlen(new URLSearchParams(window.location.search).get("anliegen"));
document.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement).closest<HTMLElement>("[data-anliegen]");
  if (link) anliegenWaehlen(link.dataset.anliegen ?? null);
});
