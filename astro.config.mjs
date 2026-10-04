// @ts-check
import { readFileSync } from "node:fs";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { load } from "js-yaml";

const inhalte = /** @type {any} */ (load(readFileSync("./inhalte/site.yaml", "utf8")));

export default defineConfig({
  site: inhalte.marke.domain,
  output: "static",
  devToolbar: { enabled: false },
  trailingSlash: "ignore",
  build: { format: "directory" },
  integrations: [
    sitemap({
      filter: (seite) => !seite.includes("/danke"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
