import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  site: "https://www.summerbud.org",
  integrations: [solid(), tailwind({
    config: {
      path: "./tailwind.config.cjs"
    }
  }), sitemap(), prefetch()],
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: "prism"
  }
});