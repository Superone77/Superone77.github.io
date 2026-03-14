import { defineConfig } from "astro/config";

const site = process.env.SITE_URL ?? "https://example.github.io";

export default defineConfig({
  output: "static",
  site,
  trailingSlash: "always"
});
