---
title: "How to solve: TailwindCSS intelligence can't pick up custom utility classname"
slug: "tailwindcss-intelligence-custom-utility-classname"
tags: ["Blog", "TailwindCSS", "IDE"]
publishedAt: "2022-06-16T18:00:00"
lastModified: "2022-06-16T18:00:00"
description: "In this article you will learn how to let TailwindCSS intelligence pick up your custom style"
featureImg: "/1565-pieter-bruegel-the-elder-the-harvester.jpeg"
featureImgAlt: "The Harvester, 1565, Pieter Bruegel the Elder"
featureImgSource: "https://www.metmuseum.org/art/collection/search/435809?searchField=All&amp;sortBy=Relevance&amp;what=Oil+paint&amp;high=on&amp;ao=on&amp;ft=*&amp;offset=40&amp;rpp=40&amp;pos=73"
---

Recently, I finally solved a big issue with the TailwindCSS that bother me for a long period of time. That is TailwindCSS intelligence won't pick up the custom utility classnames using the @layer directive.

When you are building the app with TailwindCSS, at some point you need to add a custom style. You could add custom style within `tailwind.config.js` file. In this way, TailwindCSS intelligence can correctly pick it up for you. 

```js
// tailwind.config.js 

module.exports = {
  theme: {
    extend: {
      colors: {
        primary_colour_light_blue: "#40A8F5",
	  }
	}
  }
}
```

But if we want a much more complicated style? The next step comes naturally with the help of a custom utility class using the @layer directive at the CSS file we just injected into the app root.[^1] 

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
	".text-header1": {
		@apply font-sans text-[32px] font-medium leading-[42px];
	}
	".custom-shadow": {
		boxShadow: "0px 0px 0px 3px rgba(64, 168, 245, 0.2)",
	}
}
```

And here comes the problem, although this can work, TailwindCSS will not purge this class name and correctly digest it as CSS, the TailwindCSS intelligence can't pick up this class. So when you hover the class itself `text-header1` on your IDE, there won't be any style information popping up(issue) [^2] The reason is quite simple, TailwindCSS intelligence doesn't read through your file and find the injection file, it only read the `tailwind.config.js` at the root of the project.

So how can I add a custom style that can be picked up by TailwindCSS intelligence? Here comes Tailwind plugin for rescue.

## Tailwind CSS plugin

You can use the TailwindCSS plugin to add any custom style you want and intelligence will pick it up for you. The way to add a custom utility class is quite simple.

```js
module.exports = {
	plugins: [
		({addUtilities, addComponents}) => {
			addUtilities({
				".custom-shadow": {
					boxShadow: "0px 0px 0px 3px rgba(64, 168, 245, 0.2)",
				}
			})
		}
	]
}
```

You could also add the `@apply` directive in plugin[^3]

```js
module.exports = {
	plugins: [
		({addUtilities, addComponents}) => {
			addUtilities({
				".test-color-red": {
					"@apply text-red-900": {}
				}
			})
		}
	]
}

```

After setting up your plugin, the intelligence can now correctly pick up the custom style, but this is not an ideal solution but only a comfy workaround. I am looking forward to one day, the TaiwlindCSS have native support for this issue.


[^1]: [TailwindCSS installation example - Next.js](https://tailwindcss.com/docs/guides/nextjs)
[^2]: [Tailwind IntelliSense does not list my custom class in @layer Utilities #227](https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227)
[^3]: [JS API for using `@apply` in Plugins](https://github.com/tailwindlabs/tailwindcss/discussions/2049)

