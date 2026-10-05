// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { load } from "js-yaml";

const inhalte = /** @type {any} */ (load(readFileSync("./inhalte/site.yaml", "utf8")));

// Vorschau auf GitHub Pages: läuft unter https://<nutzer>.github.io/<repo>/
const vorschau = process.env.PUBLIC_VORSCHAU === "true";

export default defineConfig({
  site: vorschau ? process.env.VORSCHAU_SITE : inhalte.marke.domain,
  base: vorschau ? process.env.VORSCHAU_BASE : undefined,
  output: "static",
  devToolbar: { enabled: false },
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [
    sitemap({
      filter: (seite) => !seite.includes("/danke") && !seite.includes("/steckbrief"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
