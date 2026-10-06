import { site } from "./laden";
import { hatPlatzhalter, nurFertig, ohnePlatzhalter } from "./platzhalter";

const domain = site.marke.domain;

export function anbieter() {
  const i = site.impressum;
  return {
    "@type": "Organization",
    "@id": `${domain}/#organisation`,
    name: site.marke.name,
    url: domain,
    email: nurFertig(site.marke.email) || undefined,
    telephone: nurFertig(site.marke.telefon) || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: nurFertig(i.strasse) || undefined,
      addressLocality: nurFertig(i.plz_ort) || undefined,
      addressCountry: "DE",
    },
  };
}

export function service(gebiete: string[], beschreibung: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gästekommunikation für Ferienwohnungen",
    serviceType: "Remote-Gästekommunikation für Ferienwohnungen auf Airbnb und Booking.com",
    description: beschreibung,
    url,
    provider: anbieter(),
    areaServed: gebiete.filter((name) => !hatPlatzhalter(name)).map((name) => ({ "@type": "Place", name })),
    availableLanguage: "de",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: site.preise.pro_buchung,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: site.preise.pro_buchung,
        priceCurrency: "EUR",
        unitText: "pro Buchung",
        valueAddedTaxIncluded: false,
      },
      description: `${site.preise.test_tage} Tage kostenlos testen. Keine Grundgebühr, monatlich kündbar. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.`,
    },
  };
}

export function faqSeite(fragen: { frage: string; antwort: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragen
      .map((f) => ({ frage: f.frage, antwort: ohnePlatzhalter(f.antwort) }))
      .filter((f) => f.antwort)
      .map((f) => ({
        "@type": "Question",
        name: f.frage,
        acceptedAnswer: { "@type": "Answer", text: f.antwort },
      })),
  };
}
