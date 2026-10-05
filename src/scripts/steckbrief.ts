/**
 * Wohnungs-Steckbrief senden.
 * Ohne JavaScript ist es ein normales Formular. Mit JavaScript werden Name und E-Mail
 * geprüft und das Formular im Hintergrund gesendet, danach geht es zur Danke-Seite.
 */

const form = document.querySelector<HTMLFormElement>("form.steckbrief");

if (form) {
  const absenden = form.querySelector<HTMLButtonElement>("[data-absenden]")!;
  const sendeFehler = form.querySelector<HTMLElement>("[data-sende-fehler]")!;
  const pflichtfelder = Array.from(form.querySelectorAll<HTMLInputElement>("input[required]"));

  const pruefen = (feld: HTMLInputElement) => {
    const box = form.querySelector<HTMLElement>(`#${feld.id}-fehler`);
    const ok = feld.checkValidity() && feld.value.trim() !== "";
    feld.toggleAttribute("aria-invalid", !ok);
    if (box) box.textContent = ok ? "" : (feld.dataset.fehler ?? "");
    return ok;
  };
  pflichtfelder.forEach((feld) => feld.addEventListener("blur", () => feld.hasAttribute("aria-invalid") && pruefen(feld)));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ungueltig = pflichtfelder.filter((feld) => !pruefen(feld));
    if (ungueltig.length) {
      ungueltig[0].focus();
      return;
    }

    const ziel = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/danke?anliegen=steckbrief`;
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
}
