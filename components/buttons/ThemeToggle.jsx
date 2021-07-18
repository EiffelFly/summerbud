import React from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import MoonStarsFillIcon from "../icons/MoonStarsFillIcon";
import SunFillIcon from "../icons/SunFillIcon";

const ThemeToggle = () => {
  const [ theme, setTheme ] = React.useContext(ThemeContext);

  return (
    <div
      className="rounded-full p-2 flex "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark"
        ? <SunFillIcon size={5} />
        : <MoonStarsFillIcon size={5} />
      }
    </div>
  );
};

export default ThemeToggle;
