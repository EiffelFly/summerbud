import SummerbudAvatar from "./SummerbudAvatar";
import AboutButton from "./buttons/AboutButton";

const Header = () => {
  return (
    <header className="flex flex-row py-10">
      <div className="flex flex-row items-center mr-auto">
        <SummerbudAvatar size="60" />
      </div>
      <div className="flex flex-row items-center ml-auto">
        <AboutButton />
      </div>
    </header>
  );
};

export default Header;
