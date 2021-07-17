import SummerbudAvatar from "./SummerbudAvatar";
import AboutButton from "./buttons/AboutButton";
import SeriesButton from "./buttons/SeriesButton"
import ThemeToggle from "./buttons/ThemeToggle";
import SunFillIcon from "./icons/SunFillIcon";

const Header = () => {
  return (
    <header className="flex flex-row py-8">
      <div className="flex flex-row items-center mr-auto">
        <SummerbudAvatar size="45" />
      </div>
      <div className="flex flex-row items-center ml-auto gap-x-8">
        <AboutButton />
        <SeriesButton />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
