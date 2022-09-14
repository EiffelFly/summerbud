import { Component, createEffect, createSignal } from "solid-js";
import cn from "clsx";

export interface ThemeToggleProps {
  styleName?: string;
}

// We change toggle icon color instead of changing hidden property, it turns out
// the former is mcuh faster than later. If we use hidden property the transition will
// be very weird.

const ThemeToggle: Component<ThemeToggleProps> = ({ styleName }) => {
  const [theme, setTheme] = createSignal<string>("dark");

  const sendMessageToGiscus = (message: Record<string, any>) => {
    const iframe = document.querySelector(
      "iframe.giscus-frame"
    ) as HTMLIFrameElement;

    // We may already injected the iframe, but it is still not visible, if we call
    // it right now, it will cause browser complaint about the origin is not the target
    // It's style will be null before initiation, we leverage this to prvent error

    if (!iframe || !iframe.getAttribute("style") || !iframe.contentWindow)
      return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  };

  createEffect(() => {
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
  });

  const toggleTheme = () => {
    // Discus solution from:
    // https://github.com/giscus/giscus/issues/336#issuecomment-1007922777

    const html = document.querySelector("html");

    if (!html) return;

    if (theme() === "dark") {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      sendMessageToGiscus({
        setConfig: {
          theme: "light",
        },
      });
      setTheme("light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      sendMessageToGiscus({
        setConfig: {
          theme: "dark",
        },
      });
      setTheme("dark");
    }
  };

  return (
    <button
      class={cn("flex gap-x-3 p-2", styleName)}
      onClick={() => toggleTheme()}
    >
      <svg
        class={cn(
          "theme-toggle-moon m-auto h-4 w-4 fill-sd-brblue transition-colors",
          theme() === "light" ? " dark:fill-sd-brgreen" : "dark:fill-sd-yellow"
        )}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
      </svg>

      <svg
        class={cn(
          "theme-toggle-sun m-auto h-5 w-5 fill-sd-brblue transition-colors dark:fill-sd-brgreen",
          theme() === "light"
            ? "fill-sd-yellow"
            : "fill-sd-brblue dark:fill-sd-brgreen"
        )}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
      </svg>
    </button>
  );
};

export default ThemeToggle;
