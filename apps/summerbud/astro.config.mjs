import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
	integrations: [mdx(), tailwind(), prefetch(), solidJs(), sitemap(), image()],
	site: "https://www.summerbud.org",
});
