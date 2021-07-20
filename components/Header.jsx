import SummerbudAvatar from "./SummerbudAvatar";
import AboutButton from "./buttons/AboutButton";
import SeriesButton from "./buttons/SeriesButton"
import ThemeToggle from "./buttons/ThemeToggle";

const Header = () => {

  const title = "{ summerbud }"

  return (
    <header className="flex flex-row py-8">
      <div className="flex flex-row items-center mr-auto gap-x-6">
        <SummerbudAvatar size="45" />
        <div
          className="font-sans font-semibold text-sd-brgreen dark:text-sd-brcyan text-xl"
        >
          {title}
        </div>
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
