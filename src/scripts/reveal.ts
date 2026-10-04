/** Dezentes Einblenden beim Scrollen. Aus, wenn reduzierte Bewegung gewünscht ist. */
const html = document.documentElement;
if (html.classList.contains("reveal-an")) {
  const beobachter = new IntersectionObserver(
    (eintraege) => {
      for (const e of eintraege) {
        if (e.isIntersecting) {
          e.target.classList.add("sichtbar");
          beobachter.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  document.querySelectorAll(".reveal").forEach((el) => beobachter.observe(el));
}
