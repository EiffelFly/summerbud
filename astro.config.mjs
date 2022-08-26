import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import remarkDirective from "remark-directive";
import { remarkYoutube } from "./src/lib/markdown/remark-youtube.mjs";
import { remarkTwitter } from "./src/lib/markdown/remark-twitter.mjs";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: "https://www.summerbud.org",
  integrations: [solid(), tailwind({
    config: {
      path: "./tailwind.config.cjs"
    }
  }), sitemap(), prefetch(), image()],
  markdown: {
    //syntaxHighlight: "prism",
    remarkPlugins: [remarkGfm, remarkDirective, [remarkYoutube, {
      validateYoutubeLink: true
    }], remarkTwitter, remarkRehype]
  }
});