import { Component, createSignal } from "solid-js";
import { MoonStarsIcon, SunIcon } from "../../Icons";
import cn from "clsx";

export interface ThemeToggleProps {
  styleName?: string;
}

const ThemeToggle: Component<ThemeToggleProps> = ({ styleName }) => {
  const [isDark, setIsDark] = createSignal(true);

  const sendMessageToGiscus = (message) => {
    const iframe = document.querySelector(
      "iframe.giscus-frame"
    ) as HTMLIFrameElement;
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  };

  const toggleTheme = () => {
    // Discus solution from:
    // https://github.com/giscus/giscus/issues/336#issuecomment-1007922777

    const html = document.querySelector("html");
    if (isDark()) {
      html.classList.remove("dark");
      sendMessageToGiscus({
        setConfig: {
          theme: "light",
        },
      });
      setIsDark(false);
    } else {
      html.classList.add("dark");
      sendMessageToGiscus({
        setConfig: {
          theme: "dark",
        },
      });
      setIsDark(true);
    }
  };

  return (
    <button className={cn("flex p-2", styleName)} onClick={() => toggleTheme()}>
      {isDark() ? (
        <SunIcon styleName="w-5 h-5 fill-sd-black dark:fill-sd-white" />
      ) : (
        <MoonStarsIcon styleName="w-5 h-5 fill-sd-black dark:fill-sd-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
