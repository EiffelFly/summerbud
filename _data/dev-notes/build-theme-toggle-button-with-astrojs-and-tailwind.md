---
title: "Build the theme toggle button with Astrojs and tailwindCSS"
slug: "build-theme-toggle-button-with-astrojs-and-tailwind-css"
tags: ["Blog", "Astro.js", "TailwindCSS"]
publishedAt: "2022-06-13T18:00:00"
lastModified: "2022-06-13T18:00:00"
description: "In this article you will learn how to toggle your blog's theme with Astrojs Partial Hydration philosophy and TailwindCSS"
featureImg: "/1917-christopher-richard-wynne-nevinson-dawn-at-southwark.jpg"
featureImgAlt: "Dawn At Southwark, 1917, Christopher Richard Wynne Nevinson"
featureImgSource: "https://www.britishmuseum.org/collection/object/P_1949-0411-2141"
locale: "en-us"
---

What Astro had brought to us is a world without Javascript as default. They use this philosophy to reduce bundle size and speed up the first paint of the browser, but it also brings lots of new challenges to the developer, such as toggling the dark theme button on the blog.

## With Next.js

I wrote a ThemeContext to toggle dark mode in my blog built on top of Next.js. The ThemeContext will add `class="dark"` to the root HTML upon mounting the app. In this way, TailwindCSS can recognize what is the current theme.[^1]

```ts
// The code I am using in my blog built with Next.js
import { useEffect, useState, createContext } from "react";

const defaultState = {
  theme: "light",
  toggleDark: () => {},
};

export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState("light");

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement;
    const isDark = rawTheme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(rawTheme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  React.useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={[ theme, setTheme ]}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

## With Astro.js

But If we want to remain the usage of Context API, we may need to write something like the below.


```js
// mainPage.astro
---
import ContextWrapperedComponent from "./ContextWrapperedComponent"
---

<ContextWrapperedComponent client:load />


// ContextWrapperedComponent

export const ContextWrapperedComponent = () => {
  // logic for context and components

  return (
    <div>
       // bunch of components that rely on context
    </div>
  )
}
```

Based on the idea of Astro.js - Partial Hydration[^2], we need to label the whole `ContextWrapperedComponent` as `client:load` or `client:only` to make it hydrated and inject it to HTML as Javascript. But in this way, there are lots of not necessary scripts that got injected and increase the overall bundle size which is not what we want.

So I decided to switch my storage of dark mode state from Context to localStorage. 

- Upon the first-time mounting, I will access the key's(blog-theme) value under localStorage and determine the page's theme according to this value.
- Once the user toggles the theme I will reset the theme of the page and update the value under localStorage.

At the first glance, this implementation looks straightforward, but it still has lots of caveats.

---

## Caveat 1 - Blinking pages

The rendering process of Astro is first sending the HTML and CSS to the client, mounting the hydrated template string, and listening to the event to inject the script. This behavior may lead to some unwanted results. 

```ts
// This code will update the page's theme upon the finsish 
// of the first time painting, but that is not what we want.

useEffect(() => {
  let theme: "light" | "dark";

  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme") as "light" | "dark";
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  } else {
    theme = "light";
  }

  if (theme === "light") {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}, []);
```

For example, if your default theme is the dark mode but what is stored in localStorage is the light mode. The HTML will first display dark mode, once the client-side is mounted, the event triggers hydrated script injection, your page will be updated as the light mode and this process will keep operating every time the user change pages. As the result, your pages will keep blinking.

To solve the blinking issue, we have to update the theme before the first painting of the browser.

Thankfully, Astro.js have already looked after our back, in their API you could make a script sent to the client with HTML and CSS as-is with the special attribute `is:inline`[^3]. Astro won't hydrate this script and practice any kind of optimization. To seriously put, this is not welcome under the philosophy of Astro but it is necessary for our application. Besides that, Astro.js's official document has also adopted this approach.[^4]

```js
// With this code, we can update the page's theme 
// before the finish of the first-time painting.

<script is:inline>
  const html = document.querySelector("html");
  const theme = (() => {
    if (
      typeof localStorage !== "undefined" && localStorage.getItem("theme")
    ) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
      return "light";
    })();

  if (theme === "light") {
    html.classList.remove("dark");
  } else {
	html.classList.add("dark");
  }
</script>
```

---

## Caveat 2 - Transition of the toggle them button

Originally, my toggle dark mode button is under dark mode it will display the sun icon and display the moon icon under the light mode. The issue of this design is close to caveat 1, it will have the blinking issue. At my first thought, I think I can update the icon just like I did with the above solution, but later on, I discovered this didn't work and the reason is quite straightforward.

Because we need the toggle button to be interactive, it needs to prefix with `client:load` to indicate Astro.js hydrate this script. But upon the first painting, the hydrated script is not injected yet, so the `is:inline` script can't find the target button to update the icon. The button will only show up once the first painting is finished.

To solve this problem, I need to alter the design of the toggle button. It now displays the sun and the moon icon at the same time but has a glimmer transition to indicate which one is the current theme.
 
## Conclusion

Coding with Astro.js is a fresh journey, it has lots of potential to be discovered, I will keep updating what I found during the exploration.

[^1]: [TailwindCSS - dark mode](https://tailwindcss.com/docs/dark-mode)
[^2]: [Astro - Partial Hydration](https://docs.astro.build/en/core-concepts/partial-hydration/)
[^3]: [Astro - is:inline](https://docs.astro.build/en/reference/directives-reference/#isinline)
[^4]: [withAstro - docs - GItHub](https://github.com/withastro/docs/blob/b268cae6af9887060f01d31b213c312fe1ce2c3c/src/layouts/MainLayout.astro#L114)