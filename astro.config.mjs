import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    solid(),
    tailwind({
      config: { path: "./tailwind.config.cjs" },
    }),
  ],
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: "prism",
  },
});
