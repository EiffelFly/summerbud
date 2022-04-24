import { Component, createSignal } from "solid-js";
import { MoonStarsIcon, SunIcon } from "../../Icons";
import cn from "clsx";

export interface ThemeToggleProps {
  styleName?: string;
}

const ThemeToggle: Component<ThemeToggleProps> = ({ styleName }) => {
  const [isDark, setIsDark] = createSignal(true);

  const toggleTheme = () => {
    console.log("hi");
    const html = document.querySelector("html");
    if (isDark()) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
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
