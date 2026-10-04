/**
 * Leadquelle aus ?quelle=brief oder ?quelle=partner-name (ersatzweise utm_source)
 * in das versteckte Formularfeld schreiben. Kein Cookie, kein Speicher im Browser:
 * Der Wert wird nur an interne Links angehängt, damit er beim Seitenwechsel erhalten bleibt.
 */
const parameter = new URLSearchParams(window.location.search);
const roh = parameter.get("quelle") ?? parameter.get("utm_source");
const quelle = roh ? roh.toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 60) : "";

if (quelle) {
  document.querySelectorAll<HTMLInputElement>("input[data-quelle]").forEach((feld) => (feld.value = quelle));
  document.querySelectorAll<HTMLAnchorElement>("a[href^='/']").forEach((link) => {
    const url = new URL(link.href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    url.searchParams.set("quelle", quelle);
    link.href = url.pathname + url.search + url.hash;
  });
}
