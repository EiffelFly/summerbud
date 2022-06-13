import { Component, createEffect } from "solid-js";

const Giscus: Component = () => {
  createEffect(() => {
    let theme: "light" | "dark";

    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      theme = localStorage.getItem("theme") as "light" | "dark";
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    } else {
      theme = "light";
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "EiffelFly/summerbud");
    script.setAttribute("data-repo-id", "MDEwOlJlcG9zaXRvcnkzODY1MzEyODM=");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOFwn_084COzH3");
    script.setAttribute("data-mapping", "title");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("data-reactions-enabled", "1");
    script.crossOrigin = "anonymous";
    script.async = true;

    const target = document.querySelector(".discus");

    if (!target) return;

    if (theme === "light") {
      script.setAttribute("data-theme", "light");
      target.appendChild(script);
    } else {
      script.setAttribute("data-theme", "dark");
      target.appendChild(script);
    }
  });

  return <div class="discus mx-auto w-full max-w-4xl lg:max-w-5xl"></div>;
};

export default Giscus;
