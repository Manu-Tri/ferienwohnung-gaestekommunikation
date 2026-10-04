import type { APIRoute } from "astro";
import { istVorschau, pfad } from "../config/pfad";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL(pfad("/sitemap-index.xml"), site).href;
  // Vorschau (GitHub Pages): nicht in Suchmaschinen aufnehmen
  const regel = istVorschau ? "Disallow: /" : "Allow: /";
  return new Response(`User-agent: *\n${regel}\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
